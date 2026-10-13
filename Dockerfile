# ============================================================
# Stage 1: Dependencies
# ============================================================
FROM node:22-alpine AS deps

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy lockfile and manifests
COPY package.json pnpm-lock.yaml ./

# Install deps (production + devDeps needed for build)
RUN pnpm install --frozen-lockfile

# ============================================================
# Stage 2: Builder
# ============================================================
FROM node:22-alpine AS builder

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy installed deps from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy the rest of the source
COPY . .

ENV NODE_ENV=production
ARG NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
ENV NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=$NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY

# Build Next.js static export
RUN pnpm build

# ============================================================
# Stage 3: Runner (Nginx Web Server for Static Export)
# ============================================================
FROM nginx:alpine AS runner

# Cloud Run dynamic PORT support via envsubst template
COPY nginx.conf /etc/nginx/templates/default.conf.template

# Copy static export files
COPY --from=builder /app/out /usr/share/nginx/html

ENV PORT=8080

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
