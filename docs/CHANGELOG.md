# Changelog

All notable changes to this project will be documented in this file.
Format: [Semantic Versioning](https://semver.org/) — `MAJOR.MINOR.PATCH`

---

## [v3.0.0] - 2026-10-09

### ⚡ Breaking Changes
- **perf(arch):** Migrasi ke **full static site** — Admin Panel & Supabase CMS dihapus sepenuhnya. Semua data (projects, certificates, experiences) kini dikelola via static data files.

### 🎨 Design — Neobrutalist Redesign
- **style(hero):** Redesign Hero section dengan estetika neobrutalism — hard shadows, bold borders, panel-based layout
- **style(navbar):** Redesign Navbar dengan gaya neobrutalist yang konsisten
- **style(about):** Brutalist redesign untuk semua komponen About (stats, tabs, experience, skills)
- **style(projects):** Brutalist redesign untuk Projects section
- **style(ui):** Remove overly animated visual effects, restore clean tech pills

### 🐛 Fix — Hero Section
- **fix(hero):** Improve cross-browser and device adaptability
- **fix(hero):** Use elastic panel backgrounds for perfect mobile text & CTA contrast
- **fix(hero):** Restore top padding for desktop view to prevent navbar overlap
- **fix(hero):** Make hero section fully responsive & adaptive
- **fix(hero):** Prevent Fullstack text from wrapping on small screens
- **fix(hero):** Prevent text clipping at the bottom of hero headlines

### ✨ Features
- **feat(about):** Add animated number counter to stats (`useCountUp` hook) — numeric values animate on viewport entry, non-numeric values (e.g. "S.Kom") are skipped
- **feat:** Update education stats — GPA `3.53/4.0`, Degree `S.Kom`
- **feat:** Add GDGOC class completion & recognition certificates
- **feat:** Update images, add new project & certificate, rename brand for SEO
- **feat:** Hide blog link from navbar & mobile menu

### 🏗️ Infra
- **infra:** Add Dockerfile and fix `cloudbuild.yaml` env var injection

### 🔧 Fix — Misc
- **fix:** Replace duplicate Google Cloud certificate image with correct premium mockup
- **fix:** Resolve Tailwind CSS icon mapping issues, remove AWS certificate
- **fix:** Update certificate path and remove caching on certificate action
- **fix:** Update project metadata (LabShare), remove query cache, improve modal layout

### 📦 Chore
- **chore:** Migrate to static data and prepare for deployment
- **docs:** Update CV

---

## [v2.1.0] - 2026-02-26

### CI/CD Pipeline (Full Automation)
- **feat(ci):** Setup GitHub Actions CI workflow (`ci.yml`) — berjalan di semua branch + PR ke `main`
  - ESLint (`eslint .`) — native flat config, tanpa FlatCompat
  - Next.js build
  - TypeScript type check (`tsc --noEmit`)
  - Playwright E2E (Chromium Desktop + Mobile Chrome)
- **feat(deploy):** Setup GitHub Actions Deploy workflow (`deploy.yml`) — hanya saat push ke `main`
  - Autentikasi via Workload Identity Federation (tanpa JSON key)
  - Trigger Cloud Build → build Docker → deploy Cloud Run
- **feat(infra):** Buat `cloudbuild.yaml` — gantikan `deploy.sh` / `deploy.ps1`
  - COMMIT_SHA sebagai Docker tag (bisa rollback per commit)
  - Env vars dari GCP Secret Manager
- **feat(test):** Setup Playwright E2E testing
  - `playwright.config.ts` — Chromium, Mobile Chrome
  - `tests/e2e/homepage.spec.ts` — 10 skenario test
- **fix(eslint):** Ganti `eslint.config.mjs` dari FlatCompat ke native flat config
  - Install `@next/eslint-plugin-next`, `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`
  - Fix kompatibilitas ESLint 9/10 dengan Next.js v16
- **fix(scripts):** Update `package.json` script `lint` dari `next lint` → `eslint .`
  - `next lint` dihapus dari CLI Next.js v16
- **chore:** Setup GCP Workload Identity Federation + Service Account `github-actions`
- **chore:** Konfigurasi 5 GitHub Secrets untuk pipeline

---

## [v2.0.1] - 2026-02-17

### Style
- **Contact:** Polished "Scalable Systems" card animation to match "Performance" card (synchronized floating effect).
- **Contact:** Adjusted positioning of "Scalable Systems" card for better visual balance (`bottom-4`).

### Fix
- **ProjectCard:** Added missing `SiLaravel` icon mapping to display the correct Laravel logo in project cards.

### Chore
- **Versioning:** Bumped version to `v2.0.1`.
