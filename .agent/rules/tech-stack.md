# 🏗️ PORTFOLIO PROJECT ARCHITECTURE & CONSTRAINTS

This workspace is strictly for the **Next.js Portfolio Upgrade** project.
Adhere to the following technical constraints to ensure performance, SEO, and budget efficiency.

## 1. Tech Stack (Strict) 💻
- **Framework:** Next.js 15+ (App Router). **DO NOT** use the `pages/` directory.
- **Styling:** Tailwind CSS v4. Use CSS variables for theming.
- **Language:** TypeScript. Use strict typing (`interface` over `type` for objects).
- **State Management:** React Context (for global UI state only). Use Server Actions for data mutations.
- **Icons:** Lucide React.

## 2. Next.js Architecture 🏛️
- **Server Components:** Default to Server Components. Use `'use client'` ONLY when interactivity (hooks, event listeners) is required.
- **Data Fetching:** Fetch data directly in Server Components using `await`. Do not use `useEffect` for data fetching unless absolutely necessary.
- **SEO:** Every page MUST have a generated `metadata` object.
- **Images:** Always use `next/image` component with explicit width/height or `fill`.

## 3. Infrastructure & Budget ($5 Limit) 💸
**CRITICAL:** This project runs on a strictly limited budget (Google Cloud Free Tier / $5 credit).
- **Docker:**
  - Use `node:alpine` or `distroless` images to minimize size.
  - Implement **Multi-Stage Build** to exclude `node_modules` and build tools from the final image.
- **Cloud Run Deployment:**
  - Region: `us-central1` (Lowest cost tier).
  - Max Instances: `1` (To prevent cost overrun).
  - CPU Allocation: `CPU only allocated during request processing` (No "Always on" CPU).
  - Memory: `512MiB` is preferred if sufficient.

## 4. Database Interactions (Supabase) 🗄️
- Use **Supabase** via MCP or direct client.
- Database logic should reside in `lib/supabase` or Server Actions.
- **Security:** Enable Row Level Security (RLS) policies on all tables immediately upon creation.

## 5. Testing & Verification 🧪
- Before marking a task as complete, ask the Browser Subagent to:
  - Verify mobile responsiveness (320px width).
  - Verify strict mode hydration errors in the console.

## 6. Antigravity Workflow Protocol 🤖
- **Task List:** ALWAYS maintain a live `Task List` artifact. Update the status (checkboxes) as you progress.
- **Implementation Plan:** NEVER execute complex commands (like Docker build or Cloud Run deploy) without first presenting an `Implementation Plan` for review.
- **Context First:** Before asking the user for code context, check available **MCP Tools** (e.g., GitHub User Repo) to see if the information is already there.