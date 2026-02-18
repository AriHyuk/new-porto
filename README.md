# Ari Hyuk Portfolio v2.0.2

🚀 **Live Site**: [https://ariawaludin.my.id](https://ariawaludin.my.id)

Modern portfolio website built with **Next.js 16**, **TypeScript**, and **Tailwind CSS v4**. Dirancang untuk performa tinggi, desain premium, dan kemudahan manajemen konten melalui dashboard Admin.

## Key Features

- **🚀 Next.js 16 (App Router)**: Memanfaatkan fitur terbaru untuk rendering yang cepat.
- **🎨 Tailwind CSS v4**: Styling modern dengan performa optimal.
- **⚡ Framer Motion**: Animasi yang smooth dan interaktif.
- **🔐 Admin Dashboard**: Fitur manajemen project, pengalaman, dan sertifikat secara langsung.
- **📡 Supabase Integration**: Database real-time dan autentikasi yang aman.
- **📱 Responsive Design**: Tampilan optimal di semua perangkat (Desktop, Tablet, Mobile).
- **🐳 Dockerized**: Siap dideploy menggunakan Docker Container.

## Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Database/Auth**: Supabase (PostgreSQL)
- **Form Handling**: React Hook Form + Zod
- **Icons**: React Icons & HugeIcons
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
├── app/                # Next.js App Router & Server Actions
│   ├── (public)/       # Landing page sections
│   ├── admin/          # Dashboard Admin routes
│   ├── actions/        # Server Actions (CRUD Operations)
│   ├── api/            # API Route handlers
│   └── globals.css     # Tailwind v4 configuration
├── components/         # Reusable UI components
│   ├── UI/             # Base UI elements
│   ├── Navbar/         # Navigation components
│   └── Footer/         # Footer components
├── lib/                # Shared logic & Supabase client
├── types/              # TypeScript definitions
├── utils/              # Helper functions & animations
└── public/             # Static assets (Images, SVGs)
```

## Deployment

Projek ini sudah dikonfigurasi untuk deployment menggunakan Docker.

```bash
# Build & Run with Docker Compose
docker compose up -d --build
```

## License

ISC © 2026 Ari Hyuk

