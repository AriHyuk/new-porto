# 🗺️ DEVELOPMENT ROADMAP

Portfolio v2.1 (Domain Patch) - Next.js 15 with Supabase & Docker

**Vision:** Modern portfolio with Admin CMS, inspired by old portfolio design.

---

## ✅ Phase 1: Infrastructure (Foundation)

**Goal:** Setup pondasi project yang solid dan production-ready.

- [x] Init Next.js 15 (App Router, TypeScript, Tailwind v4)
- [x] Docker setup (Multi-stage, Node LTS Alpine)
- [x] Git Rules & Commit Standards Setup
- [x] Project documentation (README, .gitignore)

**Status:** ✅ **COMPLETED** (v0.1.0)

---

## 🚧 Phase 2: Public Interface (The Showcase)

**Goal:** Website bisa dilihat publik dengan desain mirip Portfolio lama.

### Database Layer

- [x] Setup Supabase Client & Environment Variables
- [x] Create Table `projects` & RLS Policies
- [x] Seed initial project data
- [x] Migrate static About data (Experience & Skills) to DB

### Backend Layer

- [x] Server Actions: `getProjects()` (Read Only)
- [x] Server Actions: `getProjectBySlug()` (Detail Page)

### Frontend Layer

- [x] Component: `ProjectCard` (Porting style dari repo lama)
- [x] Component: `ProjectList` (Grid layout wrapper)
- [x] Page: Landing Page (Hero, Navbar, Footer)
  - [x] Hero Section (CTA, animations)
  - [x] Navbar (Desktop & Mobile responsive)
  - [x] Footer (Social links, copyright)
- [x] Page: `/projects` (Projects showcase page)
- [x] Page: `/projects/[slug]` (Project detail page)

### Design Reference
- **Source:** Old portfolio repository (React version)
- **Style Guide:** Maintain color scheme, typography, and component aesthetics
- **Responsive:** Mobile-first approach

**Status:** 🚧 **IN PROGRESS** (v0.8.1 - Workspace Sync & Cleanup)

---

## ⏳ Phase 3: Admin Dashboard (The CMS)

**Goal:** Halaman login untuk manajemen konten tanpa coding.

### Authentication

- [x] Setup Supabase Auth (Email/Password)
- [x] Create Login Page (`/admin/login`)
- [x] Implement logout functionality
- [x] Session management & refresh tokens

### Security & Middleware

- [x] Next.js Middleware (Protect `/admin/*` routes)
- [x] RLS Policies for admin operations (INSERT, UPDATE, DELETE)
- [x] Role-based access control (admin role check)

### Admin Dashboard UI

- [x] Dashboard Layout (Sidebar, Header, Content)
- [x] Dashboard Home (`/admin`)
  - [x] Stats overview (Total projects, messages)
  - [x] Recent activity feed
- [x] Projects Management (`/admin/projects`)
  - [x] List all projects (Table view with search/filter)
  - [x] Create new project form
  - [x] Edit existing project form
  - [x] Delete project (with confirmation)
  - [x] Image upload (Supabase Storage integration)
  - [x] Rich text editor for description
  - [x] Slug auto-generation from title
- [x] Contact Messages (`/admin/messages`)
  - [x] Inbox viewer (List all contact form submissions)
  - [x] Mark as read/unread
  - [x] Delete messages

### Additional Features
- [ ] Toast notifications for success/error states
- [ ] Loading states for all async operations
- [ ] Form validation (client & server-side)
- [ ] Image optimization & preview

**Status:** ⏳ **PLANNED**

---

## ⏳ Phase 4: Deployment (The Finale)

**Goal:** Deploy to production dengan budget $5.

### Cloud Run Setup
- [x] Configure Cloud Run deployment ($5 budget)
- [x] Set environment variables (Supabase keys)
- [x] Verify Docker image optimization
- [x] Configure custom domain (`ariawaludin.my.id`)

### CI/CD
- [ ] Setup GitHub Actions for auto-deploy (optional)
- [ ] Automated testing before deploy

### Monitoring & Optimization
- [x] Setup basic logging (Cloud Logging)
- [x] Monitor resource usage (stay under budget)
- [x] Performance optimization (Lighthouse score)
- [x] SSL certificate verification

**Status:** ✅ **COMPLETED** (v1.1.0 - Domain Active)

---

## 📊 Progress Tracker

| Phase | Progress | Status |
|-------|----------|--------|
| Phase 1: Infrastructure | ✅ 100% | v0.1.0 |
| Phase 2: Public Interface | ✅ 100% | v0.8.1 |
| Phase 3: Admin Dashboard | ✅ 100% | v1.0.0 |
| Phase 4: Deployment | ✅ 100% | v1.0.0 (Live) |

---

## 🚀 Release v1.1.2 (UI & Security Refinement)
- [x] Fix: Synchronize "AriHyuk" logo animation across Desktop & Mobile
- [x] Feat: Extracted `BrandLogo` component for code reusability
- [x] Feat: Added Honeypot security to `ContactForm` for spam prevention
- [x] Style: Refined MobileMenu layout and spacing
- [x] Chore: Bump version to v1.1.2

## 🚀 Release v1.1.1 (Domain & Metadata Patch)
- [x] Fix: Update metadataBase and OpenGraph URLs to `ariawaludin.my.id`
- [x] Fix: Update sitemap.ts and robots.ts with the new domain
- [x] Docs: Finalize deployment guide with custom domain instructions
- [x] Docs: Fix linting issues in README and ROADMAP
- [x] Chore: Bump version to v1.1.1

## 🚀 Release v1.1.0 (Stable Release)
- [x] Fix: Turbopack build errors in `layout.tsx`
- [x] Refactor: Restructure public routes and move decorative components to Client Components
- [x] Refactor: Clean up legacy reference files
- [x] Feature: Add Supabase environment variables support in Dockerfile
- [x] UI: Enhance `ServicesTab`, `SkillsTab`, and `ContactForm` aesthetics

## 🚀 Release v1.0.0 (Stable Release)

## 📝 Notes

- **Design Philosophy:** Port UI/UX from old portfolio (React) to Next.js 15
- **Admin-First:** CMS untuk manage konten tanpa perlu coding/deploy ulang
- **Vertical Slice:** Setiap phase menyelesaikan fitur end-to-end
- **Budget Constraint:** Deployment harus tetap dalam budget $5 (Google Cloud Free Tier)
- **Auto-Update:** File ini akan di-update otomatis setiap kali sub-task selesai

---

**Last Updated:** 2026-02-16 | **Current Version:** v1.1.2
