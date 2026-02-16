# Portfolio v1.1.0

Portfolio website built with Next.js 15, TypeScript, and Tailwind CSS v4.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Package Manager**: pnpm
- **Database/Auth**: Supabase
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Deployment**: Docker (Multi-stage build)

## Getting Started

### Prerequisites

- Node.js 22+
- pnpm 10+
- Docker (optional, for containerized deployment)

### Development

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the app.

### Build

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

## Docker Deployment

### Using Docker Compose (Recommended)

```bash
# Build and run
docker compose up -d --build

# Stop
docker compose down
```

### Using Docker CLI

```bash
# Build image
docker build -t new-porto .

# Run container
docker run -p 3000:3000 new-porto
```

## Project Structure

```
new-porto/
├── app/                # Next.js App Router
│   ├── projects/       # Projects dynamic routes
│   │   └── [slug]/     # Project detail page
│   ├── actions/        # Server Actions (Supabase interactions)
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── components/         # Reusable UI components
├── lib/                # Utility libraries (Supabase, etc)
├── types/              # TypeScript interfaces
├── utils/              # Helper utilities (animations, etc)
├── supabase/           # Migrations and seed data
├── public/             # Static assets
├── Dockerfile          # Multi-stage Docker build
├── docker-compose.yml  # Docker Compose config
├── next.config.ts      # Next.js configuration
├── tsconfig.json       # TypeScript configuration
└── ROADMAP.md          # Project development roadmap
```

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## Deployment Notes

- **Budget**: Optimized for Google Cloud Free Tier ($5 limit)
- **Region**: `us-central1` (lowest cost)
- **Memory**: 512MiB recommended
- **CPU**: Allocated only during request processing
- **Max Instances**: 1 (to prevent cost overrun)

## License

ISC
