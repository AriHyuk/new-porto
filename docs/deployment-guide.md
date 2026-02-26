# 🚀 Deployment Guide: new-porto → Google Cloud Run

Dokumen ini menjelaskan arsitektur deployment portfolio ke Google Cloud Run dengan pendekatan **automated CI/CD** (sejak v2.1.0) dan manual deploy untuk referensi.

---

## Arsitektur Pipeline (v2.1.0+)

```
git push ke feature branch
        ↓
🤖 GitHub Actions CI (ci.yml)
   ├── ESLint (eslint .)
   ├── Build Next.js
   ├── TypeScript check (tsc --noEmit)
   └── Playwright E2E (Chromium Desktop + Mobile)
        ↓
✅ Semua lolos → bisa merge PR ke main
❌ Ada yang gagal → PR ter-BLOCK otomatis
        ↓
Merge ke main
        ↓
🚀 GitHub Actions Deploy (deploy.yml)
   └── Auth ke GCP (Workload Identity Federation)
        └── Cloud Build (cloudbuild.yaml)
             ├── docker build (COMMIT_SHA tag)
             ├── docker push ke Artifact Registry
             └── gcloud run deploy → Cloud Run
                                        ↓
                               🎉 ariawaludin.my.id
```

> **Mengapa dua workflow?** CI berjalan di semua branch untuk feedback cepat. Deploy hanya di `main` untuk safety.

---

## 1. Persiapan Next.js

### `next.config.ts` — Output Standalone
```ts
const nextConfig: NextConfig = {
  output: "standalone", // key untuk Docker yang ringan
  // ...
};
```

Dengan `output: 'standalone'`, Next.js melakukan tree-shaking pada `node_modules` sehingga folder dari ~500MB menjadi puluhan MB saja.

### `Dockerfile` — Multi-Stage Build
3 stage: `deps` → `builder` → `runner` (Alpine final image ~150MB)

> **Analoginya:** `builder` = dapur lengkap dengan semua alat masak. `runner` = hanya botol jus yang mau dikirim. Alat masak gak perlu ikut. Inilah kenapa image-nya kecil.

---

## 2. Google Cloud Infrastructure

### API yang Perlu Diaktifkan
```bash
gcloud services enable run.googleapis.com \
                       artifactregistry.googleapis.com \
                       cloudbuild.googleapis.com \
                       iam.googleapis.com \
                       secretmanager.googleapis.com
```

### Artifact Registry Repository
```bash
gcloud artifacts repositories create new-porto-repo \
    --repository-format=docker \
    --location=us-central1
```

### Secret Manager (untuk env vars)
```bash
# Simpan env vars ke Secret Manager — JANGAN hardcode di cloudbuild.yaml!
echo -n "https://xxx.supabase.co" | gcloud secrets create NEXT_PUBLIC_SUPABASE_URL --data-file=-
echo -n "your-anon-key" | gcloud secrets create NEXT_PUBLIC_SUPABASE_ANON_KEY --data-file=-
```

---

## 3. Automated Deployment (v2.1.0+, Rekomendasi)

### Workload Identity Federation Setup (1x saja)
```bash
PROJECT_ID="portofolio-487515"
REPO_OWNER="AriHyuk"
REPO_NAME="new-porto"
PROJECT_NUMBER=$(gcloud projects describe ${PROJECT_ID} --format="value(projectNumber)")

# Service Account
SA_EMAIL="github-actions@${PROJECT_ID}.iam.gserviceaccount.com"
gcloud iam service-accounts create "github-actions" --project="${PROJECT_ID}" || true
for role in "roles/cloudbuild.builds.editor" "roles/run.admin" "roles/iam.serviceAccountUser" "roles/secretmanager.secretAccessor"; do
  gcloud projects add-iam-policy-binding "${PROJECT_ID}" --member="serviceAccount:${SA_EMAIL}" --role="${role}"
done

# WIF Pool + Provider
gcloud iam workload-identity-pools create "github-pool" --project="${PROJECT_ID}" --location="global" || true
gcloud iam workload-identity-pools providers create-oidc "github-provider" \
  --workload-identity-pool="github-pool" --location="global" --project="${PROJECT_ID}" \
  --attribute-mapping="google.subject=assertion.sub,attribute.repository=assertion.repository" \
  --issuer-uri="https://token.actions.githubusercontent.com" || true

# Bind
gcloud iam service-accounts add-iam-policy-binding "${SA_EMAIL}" \
  --role="roles/iam.workloadIdentityUser" \
  --member="principalSet://iam.googleapis.com/projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/github-pool/attribute.repository/${REPO_OWNER}/${REPO_NAME}"
```

### GitHub Secrets yang Dikonfigurasi
| Secret | Nilai |
|--------|-------|
| `GCP_PROJECT_ID` | `portofolio-487515` |
| `GCP_SERVICE_ACCOUNT_EMAIL` | `github-actions@portofolio-487515.iam.gserviceaccount.com` |
| `GCP_WORKLOAD_IDENTITY_PROVIDER` | `projects/.../providers/github-provider` |
| `NEXT_PUBLIC_SUPABASE_URL` | dari `.env` lokal |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | dari `.env` lokal |

### `cloudbuild.yaml` — Flow Build
```yaml
steps:
  - name: 'gcr.io/cloud-builders/docker'
    args: ['build', '--tag', 'IMAGE:$COMMIT_SHA', ...]
  - name: 'gcr.io/cloud-builders/docker'
    args: ['push', 'IMAGE:$COMMIT_SHA']
  - name: 'gcr.io/google.com/cloudsdktool/cloud-sdk'
    args: ['gcloud', 'run', 'deploy', 'new-porto', '--image', 'IMAGE:$COMMIT_SHA', ...]
```

> `COMMIT_SHA` sebagai tag = setiap deploy bisa di-rollback ke commit manapun.

---

## 4. Manual Deployment (Referensi / Fallback)

Gunakan jika pipeline tidak tersedia atau untuk debugging.

### Build & Push Manual
```bash
# Konfigurasi auth Docker
gcloud auth configure-docker us-central1-docker.pkg.dev

IMAGE="us-central1-docker.pkg.dev/portofolio-487515/new-porto-repo/app"

# Build
docker build \
  --build-arg NEXT_PUBLIC_SUPABASE_URL=YOUR_URL \
  --build-arg NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_KEY \
  -t $IMAGE:latest .

# Push
docker push $IMAGE:latest
```

### Deploy Manual
```bash
gcloud run deploy new-porto \
  --image $IMAGE:latest \
  --region us-central1 \
  --memory 512Mi \
  --cpu 1 \
  --max-instances 1 \
  --allow-unauthenticated
```

### Rollback
```bash
# List revisions
gcloud run revisions list --service new-porto --region us-central1

# Rollback ke revision tertentu
gcloud run services update-traffic new-porto \
  --region us-central1 \
  --to-revisions REVISION-NAME=100
```

---

## 5. Resource Limits & Budget

| Setting | Value | Alasan |
|---------|-------|--------|
| Max Instances | `1` | Hemat biaya, cukup untuk portfolio |
| CPU Allocation | Request-based | Tidak bayar saat idle |
| Memory | `512Mi` | Naikkan ke 1Gi hanya jika OOMKilled |
| Region | `us-central1` | Region termurah |

> ⚠️ **Pantau billing!** `max-instances 1` + request-based CPU = biaya mendekati $0/bulan untuk traffic rendah.

---

## 6. Custom Domain: ariawaludin.my.id

1. Cloud Run Console → service → **Manage Custom Domains** → **Add Mapping**
2. Verifikasi domain via Google Search Console
3. Update DNS records (tipe `A`/`CNAME`) di panel domain kamu
4. SSL/HTTPS otomatis via Let's Encrypt (15 menit - 24 jam)

---

## 7. Monitoring & Troubleshooting

```bash
# Lihat logs real-time
gcloud run services logs tail new-porto --region us-central1

# Atau via Cloud Console → Cloud Run → Logs
```

**Error umum:**
| Error | Penyebab | Fix |
|-------|----------|-----|
| `OOM` | Memory kurang | Naikkan ke `1Gi` |
| 500 di home | Env var hilang | Cek `gcloud run services describe` |
| Build gagal | Dockerfile error | Cek Cloud Build logs |

---

*Updated v2.1.0 — CI/CD Pipeline automation. Lihat `CHANGELOG.md` untuk riwayat perubahan.*
