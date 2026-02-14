# 🗺️ DEVELOPMENT ROADMAP

Portfolio v2 - Next.js 15 with Supabase & Docker

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

### Backend Layer
- [x] Server Actions: `getProjects()` (Read Only)
- [x] Server Actions: `getProjectBySlug()` (Detail Page)

### Frontend Layer
- [x] Component: `ProjectCard` (Porting style dari repo lama)
- [x] Component: `ProjectList` (Grid layout wrapper)
- [ ] Page: Landing Page (Hero, Navbar, Footer)
  - [ ] Hero Section (CTA, animations)
  - [ ] Navbar (Desktop & Mobile responsive)
  - [ ] Footer (Social links, copyright)
- [x] Page: `/projects` (Projects showcase page)
- [x] Page: `/projects/[slug]` (Project detail page)

### Design Reference
- **Source:** Old portfolio repository (React version)
- **Style Guide:** Maintain color scheme, typography, and component aesthetics
- **Responsive:** Mobile-first approach

**Status:** 🚧 **IN PROGRESS** (v0.3.0 - Showcase & Detail Complete)

---

## ⏳ Phase 3: Admin Dashboard (The CMS)

**Goal:** Halaman login untuk manajemen konten tanpa coding.

### Authentication
- [ ] Setup Supabase Auth (Email/Password)
- [ ] Create Login Page (`/admin/login`)
- [ ] Implement logout functionality
- [ ] Session management & refresh tokens

### Security & Middleware
- [ ] Next.js Middleware (Protect `/admin/*` routes)
- [ ] RLS Policies for admin operations (INSERT, UPDATE, DELETE)
- [ ] Role-based access control (admin role check)

### Admin Dashboard UI
- [ ] Dashboard Layout (Sidebar, Header, Content)
- [ ] Dashboard Home (`/admin`)
  - [ ] Stats overview (Total projects, messages)
  - [ ] Recent activity feed
- [ ] Projects Management (`/admin/projects`)
  - [ ] List all projects (Table view with search/filter)
  - [ ] Create new project form
  - [ ] Edit existing project form
  - [ ] Delete project (with confirmation)
  - [ ] Image upload (Supabase Storage integration)
  - [ ] Rich text editor for description
  - [ ] Slug auto-generation from title
- [ ] Contact Messages (`/admin/messages`)
  - [ ] Inbox viewer (List all contact form submissions)
  - [ ] Mark as read/unread
  - [ ] Delete messages

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
- [ ] Configure Cloud Run deployment ($5 budget)
- [ ] Set environment variables (Supabase keys)
- [ ] Verify Docker image optimization
- [ ] Configure custom domain (optional)

### CI/CD
- [ ] Setup GitHub Actions for auto-deploy (optional)
- [ ] Automated testing before deploy

### Monitoring & Optimization
- [ ] Setup basic logging (Cloud Logging)
- [ ] Monitor resource usage (stay under budget)
- [ ] Performance optimization (Lighthouse score)
- [ ] SSL certificate verification

**Status:** ⏳ **PLANNED**

---

## 📊 Progress Tracker

| Phase | Progress | Status |
|-------|----------|--------|
| Phase 1: Infrastructure | ✅ 100% | v0.1.0 |
| Phase 2: Public Interface | 🚧 85% | v0.3.0 (Detail Page Done) |
| Phase 3: Admin Dashboard | ⏳ 0% | Planned |
| Phase 4: Deployment | ⏳ 0% | Planned |

---

## 📝 Notes

- **Design Philosophy:** Port UI/UX from old portfolio (React) to Next.js 15
- **Admin-First:** CMS untuk manage konten tanpa perlu coding/deploy ulang
- **Vertical Slice:** Setiap phase menyelesaikan fitur end-to-end
- **Budget Constraint:** Deployment harus tetap dalam budget $5 (Google Cloud Free Tier)
- **Auto-Update:** File ini akan di-update otomatis setiap kali sub-task selesai

---

**Last Updated:** 2026-02-14 | **Current Version:** v0.3.0
