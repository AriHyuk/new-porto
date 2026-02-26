# Changelog

All notable changes to this project will be documented in this file.
Format: [Semantic Versioning](https://semver.org/) — `MAJOR.MINOR.PATCH`

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
