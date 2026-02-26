# SEO Implementation Guide

This document outlines the Search Engine Optimization (SEO) strategies implemented in this project to ensure high visibility and broad reach.

## 1. Metadata Configuration

We use Next.js 15's Metadata API for dynamic and static metadata generation.

### Global Metadata (`app/layout.tsx`)
- **Base URL**: Set to the production domain.
- **Title Template**: `%s | Ari Hyuk - Software Engineer` ensures consistent branding.
- **Description**: A comprehensive description including key skills (Full Stack, Next.js, React).
- **Keywords**: Targeted keywords for discoverability.
- **Authors & Creator**: Attribution to Ari Awaludin.
- **OpenGraph**: Standardized OG tags for social sharing (Title, Description, URL, Site Name, Locale, Type).
- **Twitter**: Twitter Card configuration for rich previews.
- **Robots**: Directives for crawlers (`index: true`, `follow: true`).

## 2. Dynamic Metadata

For dynamic pages (like Blog posts or Project details), use the `generateMetadata` function:

```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  const project = await getProject(params.slug);
  return {
    title: project.title,
    description: project.excerpt,
    openGraph: {
      images: [project.image],
    },
  };
}
```

## 3. Sitemap & Robots.txt

- **sitemap.ts**: Automatically generates `sitemap.xml` listing all static and dynamic routes.
- **robots.ts**: Configures `robots.txt` to guide search engine crawlers, allowing access to all pages except admin routes (`/admin/`).

## 4. JSON-LD Structured Data

We inject JSON-LD structured data to help search engines understand the content context (e.g., "Person" schema for the portfolio owner).

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Ari Awaludin',
      url: 'https://ariawaludin.my.id',
      sameAs: [
        'https://github.com/arihyuk',
        'https://linkedin.com/in/arihyuk',
      ],
      jobTitle: 'Software Engineer',
      worksFor: {
        '@type': 'Organization',
        name: 'Freelance',
      },
    }),
  }}
/>
```

## 5. Technical SEO & Core Web Vitals (Performance)
 
 Google considers **Page Experience** as a ranking factor. We have implemented advanced optimizations to achieve **100% Lighthouse Scores**:
 
 ### A. Core Web Vitals
 - **LCP (Largest Contentful Paint)**:
    - **Optimization**: Profile image uses `fetchPriority="high"` and `sizes` attribute.
    - **Result**: Main content loads immediately (< 2.5s).
 - **CLS (Cumulative Layout Shift)**:
    - **Optimization**: All images have explicit width/height ratios. Fonts are preloaded.
    - **Result**: Visual stability (score < 0.1).
 - **INP (Interaction to Next Paint)**:
    - **Optimization**: Heavy JS (like `MeshBackground`) is lazy-loaded to free up the main thread.
 
 ### B. Advanced Performance Tuning
 1. **Image Optimization**:
    - Enabled **AVIF** and **WebP** formats in `next.config.ts` (20-30% smaller than JPEG).
    - Implemented `deviceSizes` for responsive image delivery (building only what's needed).
 
 2. **Eliminating Render-Blocking Resources**:
    - **Code Splitting**: Interactive components (`ProjectModal`, `MobileMenu`) are loaded via `next/dynamic` only when needed.
    - **Tree Shaking**: `package.json` targets `ES2022` to avoid shipping unused legacy polyfills to modern browsers.
 
 3. **DOM Size Optimization**:
    - **Virtualization**: `content-visibility: auto` is used on long lists (`SkillsTab`) to skip rendering off-screen content.
    - **Structure**: Minimized nesting depth in `SkillIcon` and `AboutSection` to reduce memory usage and style calculation time.

## 6. Image Optimization

- **Alt Tags**: Mandatory for all images for accessibility and SEO.
- **Next/Image**: Automatic resizing and webp conversion.
- **OpenGraph Images**: Custom generated images for social sharing previews.
