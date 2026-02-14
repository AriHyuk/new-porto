# 🗺️ DEVELOPMENT ROADMAP

Portfolio v2 - Next.js 15 with Supabase & Docker

---

## ✅ Phase 1: Infrastructure (Foundation)

**Goal:** Setup pondasi project yang solid dan production-ready.

- [x] Init Next.js 15 (App Router, TypeScript, Tailwind v4)
- [x] Docker setup (Multi-stage, Node LTS Alpine)
- [x] Git Rules & Commit Standards Setup
- [x] Project documentation (README, .gitignore)

**Status:** ✅ **COMPLETED**

---

## 🚧 Phase 2: Feature "Project Showcase" (Vertical Slice)

**Goal:** Halaman `/projects` yang menampilkan data real dari database.

### Database Layer
- [x] Setup Supabase Client & Environment Variables
- [x] Create Table `projects` & RLS Policies
- [x] Seed initial project data

### Backend Layer
- [x] Server Actions: `getProjects()`
- [ ] Server Actions: `addProject()`
- [ ] Server Actions: `updateProject()`

### Frontend Layer
- [ ] Component: `ProjectCard` (Migrasi dari React)
- [ ] Component: `ProjectGrid` (Layout wrapper)
- [ ] Page: `/projects` (Integration)

### Integration
- [ ] Connect UI `ProjectPage` to Server Actions
- [ ] Add loading states & error handling
- [ ] Verify responsive design (mobile/desktop)

**Status:** 🚧 **IN PROGRESS**

---

## ⏳ Phase 3: Feature "Landing Page" (UI Slice)

**Goal:** Halaman Home yang menarik dan profesional.

### Hero Section
- [ ] Hero component (Migrasi & Polish)
- [ ] CTA buttons & animations
- [ ] Responsive layout

### Navigation
- [ ] Navbar component (Desktop & Mobile)
- [ ] Footer component
- [ ] Smooth scroll navigation

### Content Sections
- [ ] About Me section
- [ ] Skills/Tech Stack showcase
- [ ] Contact section

**Status:** ⏳ **PLANNED**

---

## ⏳ Phase 4: Deployment (The Finale)

**Goal:** Deploy to production dengan budget $5.

### Cloud Run Setup
- [ ] Configure Cloud Run deployment ($5 budget)
- [ ] Set environment variables (Supabase keys)
- [ ] Verify Docker image optimization

### CI/CD & Domain
- [ ] Setup GitHub Actions (optional)
- [ ] Domain setup / DNS configuration
- [ ] SSL certificate verification

### Monitoring
- [ ] Setup basic logging
- [ ] Monitor resource usage (stay under budget)

**Status:** ⏳ **PLANNED**

---

## 📊 Progress Tracker

| Phase | Progress | ETA |
|-------|----------|-----|
| Phase 1: Infrastructure | ✅ 100% | Completed |
| Phase 2: Project Showcase | 🚧 0% | TBD |
| Phase 3: Landing Page | ⏳ 0% | TBD |
| Phase 4: Deployment | ⏳ 0% | TBD |

---

## 📝 Notes

- **Vertical Slice Approach:** Setiap phase menyelesaikan satu fitur end-to-end (database → backend → frontend → integration)
- **Auto-Update:** File ini akan di-update otomatis setiap kali sub-task selesai
- **Budget Constraint:** Deployment harus tetap dalam budget $5 (Google Cloud Free Tier)

---

**Last Updated:** 2026-02-14
