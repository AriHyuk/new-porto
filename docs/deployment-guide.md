# 🚀 Deployment Guide: Next.js 15 to Google Cloud Run

Dokumen ini menjelaskan langkah-langkah teknis yang saya ambil untuk men-deploy portfolio kamu ke Google Cloud Run dengan strategi **$0-$1 budget**.

---

## 1. Persiapan Next.js (Optimization)

Agar image Docker kecil dan efisien, kita menggunakan fitur **Standalone Output** dari Next.js.

### `next.config.ts`
Pastikan `output: 'standalone'` aktif. Fitur ini akan mem-bundle hanya file yang benar-benar dibutuhkan untuk menjalankan server, menghapus `node_modules` raksasa dan file dev.

**Update v1.0.1 (Image Optimization & Code Splitting):**
1. **Image Optimization:** Konfigurasi `images` untuk format modern (AVIF/WebP) dan strict sizing.
2. **Code Splitting (Lazy Loading):** Komponen berat seperti `MeshBackground` (Animasi) dan `ProjectModal` (Interaksi) sekarang di-load menggunakan `next/dynamic`. Ini membuang "Unused JavaScript" dari main bundle dan mempercepat TTI (Time to Interactive).
3. **Legacy JS Removed:** Build target diubah ke `ES2022` dan `browserslist` di-update. Browser modern tidak perlu polyfill jadul yang memberatkan.
4. **DOM Size Optimized:** `SkillsTab` dan `SkillIcon` di-refactor. Menghapus wrapper div yang tidak perlu dan menggunakan pseudo-elements (`::before`/`::after`) untuk dekorasi. Mengaktifkan `content-visibility: auto` agar browser skip rendering elemen di luar viewport.

### `Dockerfile` (Multi-stage)
Kita menggunakan 3 stage:
1. **deps**: Install semua dependencies.
2. **builder**: Build aplikasi (menghasilkan folder `.next/standalone`).
3. **runner**: Stage akhir yang sangat ringan ( Alpine Node image) yang hanya berisi file hasil build.

---

## 2. Infrastruktur Google Cloud (GCP)

Langkah-langkah di terminal menggunakan perintah `gcloud`:

### Aktivasi API
```bash
gcloud services enable run.googleapis.com \
                       artifactregistry.googleapis.com \
                       cloudbuild.googleapis.com
```

### Setup Repository (Artifact Registry)
```bash
gcloud artifacts repositories create new-porto-repo \
    --repository-format=docker \
    --location=us-central1 \
    --description="Docker repository for Portfolio v2"
```

---

## 3. Proses Build & Push

### Build Local & Tag
```bash
docker build \
  --build-arg NEXT_PUBLIC_SUPABASE_URL=YOUR_URL \
  --build-arg NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_KEY \
  -t us-central1-docker.pkg.dev/PROJECT_ID/new-porto-repo/app:latest .
```

### Push ke Google
```bash
docker push us-central1-docker.pkg.dev/PROJECT_ID/new-porto-repo/app:latest
```

---

## 4. Deploy ke Cloud Run

```bash
gcloud run deploy new-porto-service \
  --image us-central1-docker.pkg.dev/PROJECT_ID/new-porto-repo/app:latest \
  --region us-central1 \
  --platform managed \
  --allow-unauthenticated \
  --memory 512Mi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 1 \
  --set-env-vars NEXT_PUBLIC_SUPABASE_URL=YOUR_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_KEY
```

---

## 🛠️ Deep Dive: Kenapa Image Bisa Optimal?

Banyak developer pemula bikin Docker image yang ukurannya 1GB - 2GB. Kenapa punya kita cuma **~150MB**? Ini rahasianya:

### 1. Multi-Stage Build (Teknik "Kupas Kulit")
Perhatikan di `Dockerfile` kita pakai `FROM` berkali-kali (`base`, `deps`, `builder`, `runner`). 
- Di stage `builder`, kita install semua `devDependencies`, build tool, dan source code asli. Ini berat banget.
- Di stage `runner` (stage terakhir), kita **TIDAK** copy semuanya. Kita cuma copy folder `.next/standalone`.
- **Analogi**: Bayangkan kamu mau kirim jus jeruk ke teman. `builder` itu dapurnya (ada kulit jeruk, blender, pisau). `runner` itu cuma botol jusnya. Kamu gak perlu kirim blenternya ke teman kamu kan? Itulah Multi-stage build.

### 2. Next.js Standalone Mode (The MVP)
Secara default, `node_modules` Next.js isinya ribuan file. Dengan `output: 'standalone'`, Next.js melakukan **Tree Shaking** pada level server.
- Dia mendeteksi hanya package yang benar-benar dipanggil di `import`.
- Dia bikin satu file `server.js` mandiri.
- Hasilnya? Folder `node_modules` yang tadinya 500MB+ dipangkas jadi cuma puluhan MB yang isinya file-file penting saja.

### 3. Alpine Linux (Base Image Super Ringan)
Kita pakai `node:lts-alpine`. 
- Image Node biasa basisnya Debian/Ubuntu (~600MB).
- `alpine` itu OS Linux yang sangat minimalis (~5MB).
- Hasilnya image kita jauh lebih "diet".

### 4. Layer Caching (Urutan Command)
Perhatikan kenapa saya tulis `COPY package.json ...` **SEBELUM** `COPY . .`?
- Docker membagi file jadi "layers". Kalau `package.json` gak berubah, Docker gak akan download ulang library (dia pakai cache).
- Kalau kamu tulis `COPY . .` di awal, setiap kali kamu ganti satu baris kode CSS saja, Docker akan terpaksa `pnpm install` ulang dari nol. Itu buang-buang waktu.

---

## 💡 Tips & Trick Senior Engineer (Pro Tips)

1. **`.dockerignore` itu Wajib!**
   Jangan pernah lupa file ini. Pastikan `.git`, `node_modules`, dan `.next` lokal gak ikut ke-copy ke Docker context. Kalau ke-copy, build-nya bakal lemot banget dan image jadi kotor.

2. **Gunakan `pnpm --frozen-lockfile`**
   Di Docker, selalu pakai flag ini. Ini menjamin versi library yang di-install di server **SAMA PERSIS** dengan yang ada di laptop kamu (berdasarkan `pnpm-lock.yaml`).

3. **Rahasia `/tmp` di Cloud Run**
   Cloud Run itu *stateless*. Kalau user upload file, jangan simpan di folder lokal server karena bakal hilang tiap kali server restart. Gunakan Supabase Storage atau S3. Folder `/tmp` di Cloud Run itu pakai RAM, jadi kalau file-nya gede, server bisa crash.

4. **Monitoring Log via Console**
   Kalau web kamu mati (500 error), jangan panik. Buka Google Cloud Console > Cloud Run > Logs. Biasanya ada pesan error Node.js yang jelas di sana kenapa servernya mati.

5. **Resource Limits**
   Set `cpu` dan `memory` serendah mungkin tapi aplikasi tetap jalan. Start dengan `512Mi` RAM. Kalau sering kena `OOM (Out Of Memory)` baru naikkan ke `1Gi`. Ini kunci hemat billing!

---

## ⚡ Automation Scripts (The Pro Way)

Untuk mempermudah update berkala, gunakan script otomatis yang sudah saya buatkan:

### Windows (PowerShell)
Jalankan perintah ini di PowerShell:
```powershell
./deploy.ps1
```

### Linux / Mac / Git Bash
Jalankan perintah ini:
```bash
chmod +x deploy.sh
./deploy.sh
```

---

## 🌐 Custom Domain & Branding (Premium URL)

URL bawaan Google Cloud (`.a.run.app`) kurang profesional untuk portfolio. Berikut cara mengubahnya menjadi `nama-kamu.com`:

### 1. Hubungkan Domain di GCP
1. Buka [Google Cloud Console](https://console.cloud.google.com/run).
2. Pilih service `new-porto-service`.
3. Klik **Manage Custom Domains** di bar atas.
4. Klik **Add Mapping**.
5. Pilih domain yang sudah kamu beli (kamu mungkin perlu verifikasi kepemilikan via Google Search Console).

### 2. Update DNS Records
Setelah mapping ditambahkan, Google akan memberikan **DNS Records** (Tipe `A` atau `CNAME`).
- Masuk ke panel dashboard tempat kamu beli domain (Niagahoster, Namecheap, dll).
- Tambahkan record yang diberikan Google.

### 3. HTTPS Otomatis
- Google akan mengurus sertifikat SSL (HTTPS) secara otomatis melalui Let's Encrypt.
- Proses propagasi DNS dan SSL biasanya memakan waktu **15 menit - 24 jam**.

---
*Dibuat dengan 🔥 oleh Antigravity untuk Ari Awaludin.*
