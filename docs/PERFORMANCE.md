# Performance Documentation v1.8.0

This document outlines the performance optimization strategies implemented in v1.8.0 to achieve sub-1s load times.

## 🚀 Key Optimizations

### 1. Incremental Static Regeneration (ISR)

The homepage (`/`) has been converted from a dynamic route to an ISR route.

- **Strategy**: Revalidate every 3600 seconds (1 hour).
- **Benefit**: The page is served instantly from the edge cache, bypassing database queries and server-side rendering on every request.

### 2. Middleware & Proxy Optimization

The `proxy.ts` middleware was identified as a significant source of latency (TTFB).

- **Optimization**: Added a bypass for public landing pages (`/`, `/projects`).
- **Technical Detail**: The `supabase.auth.getUser()` call is now skipped for these routes, saving ~200ms+ of API round-trip time to Supabase Auth.

### 3. Data Layer Caching

A multi-layered caching strategy using Next.js `unstable_cache`.

- **Cached Actions**:
  - `getProjects`
  - `getSkills`
  - `getExperiences`
  - `getCertificates`

- **Static Client**: Implemented `createStaticClient()` in `lib/supabase/server.ts` to allow data fetching inside cached scopes without triggering "Dynamic source" errors caused by `cookies()`.

### 4. Turbopack Configuration

Reduced build/dev startup warnings by explicitly setting the workspace root.

- **Config**: `experimental.turbopack.root: '.'` added to `next.config.ts`.

## 📊 Results

- **Page Load (Local Dev)**: Reduced from ~5.5s to sub-1s.
- **Build Output**: Route `/` is now marked as `○ (Static)` or `● (SSG/ISR)`.
- **TTFB**: Significantly improved by reducing middleware overhead.
