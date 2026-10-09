# Ari Awaludin Portfolio v3.0.0

🚀 **Live Site**: [https://ariawaludin.my.id](https://ariawaludin.my.id)

Modern portfolio website built with **Next.js 16**, **TypeScript**, and **Tailwind CSS v4**. Dirancang untuk performa tinggi, desain premium, dan kemudahan manajemen konten melalui dashboard Admin.

## Key Features

- **🚀 Next.js 16 (App Router)**: Memanfaatkan fitur terbaru untuk rendering yang cepat.
- **🎨 Tailwind CSS v4 + Neobrutalism**: Desain premium dengan estetika neobrutalist — hard shadows, bold borders.
- **⚡ Framer Motion**: Animasi yang smooth dan interaktif, termasuk animated number counter.
- **📄 Fully Static Site**: Semua data (projects, certificates, experiences) dikelola via static data files — tanpa CMS/Admin panel.
- **🖼️ Multi-Image Gallery**: Dukungan galeri foto (carousel) per project.
- **🌓 Adaptive Theme**: Responsif terhadap Light & Dark mode.
- **📱 Responsive Design**: Tampilan optimal di semua perangkat (Desktop, Tablet, Mobile).
- **🐳 Dockerized**: Siap dideploy menggunakan Docker Container.

## Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Design System**: Neobrutalism (hard shadows, bold borders)
- **Animations**: Framer Motion
- **Data**: Static data files (TypeScript)
- **Form Handling**: React Hook Form + Zod
- **Icons**: React Icons, Lucide React
- **Deployment**: Local Docker / Google Cloud Run

## Getting Started

### Prerequisites

- Node.js 22+
- pnpm 10+
- Docker (Opsional)

### Development

```bash
# Install dependencies
pnpm install

# Setup Environment Variables
cp .env.example .env.local

# Run development server
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the app.

## Project Structure

```text
src/
├── app/                # Next.js App Router
│   ├── (public)/       # Landing page sections
│   ├── actions/        # Server Actions (contact form, etc.)
│   ├── api/            # API Route handlers
│   └── globals.css     # Tailwind v4 configuration
├── components/         # Reusable UI components
│   ├── About/          # About section components (Stats, Tabs, etc.)
│   ├── Hero/           # Hero section components
│   ├── Projects/       # Projects section & modal
│   ├── Certificates/   # Certificates section
│   ├── Contact/        # Contact form
│   ├── Navbar/         # Navigation components
│   ├── Footer/         # Footer components
│   └── UI/             # Base UI elements
├── data/               # Static data files (projects, certs, experiences)
├── lib/                # Shared logic & Supabase client (contact form)
├── types/              # TypeScript definitions
├── utils/              # Helper functions, animations & hooks
└── public/             # Static assets (Images, SVGs)
```

## 🚀 Deployment & CI/CD

Projek ini sudah menggunakan **Fully Automated CI/CD Pipeline** untuk deployment ke Google Cloud Run, menjamin zero-downtime dan proses rilis yang aman.

### Alur CI/CD:

1. **GitHub Actions (CI)**: Menjalankan ESLint, Type Checking, dan **Playwright E2E Testing** di setiap PR/Push ke `main`.
2. **Google Cloud Build (CD)**: Mem-build Docker Image dan mem-pushnya ke Artifact Registry.
3. **Google Cloud Run**: Otomatis mendeploy image terbaru jika semua test passing.
4. **Keamanan**: Menggunakan **Workload Identity Federation** (WIF) untuk autentikasi tanpa _Service Account Key_ (Keyless).

Untuk panduan deployment lengkap, monitoring, dan seting resource budget ($0-$1/bulan), silakan baca:
👉 **[Deployment Guide](docs/deployment-guide.md)**
👉 **[CI/CD Troubleshooting & Setup Guide](.agent/workflows/setup-cicd.md)**

---

### Manual Docker Build (Local)

Jika ingin menjalankan production build di lokal:

```bash
# Build & Run with Docker Compose
docker compose up -d --build
```

## License

ISC © 2026 Ari Awaludin
