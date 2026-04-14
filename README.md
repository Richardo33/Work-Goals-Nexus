# WGN

A clean, deployment-ready MVP for project-based task management built with Next.js App Router, TypeScript, Tailwind CSS, and Supabase.

## Features

- Supabase Auth with sign up, sign in, and sign out
- Project CRUD with status and color badges
- Task CRUD with status, priority, and kanban layout
- Dashboard metrics for active projects, tasks, and recent projects
- Project-level filtering by status, priority, and task title
- Supabase SQL schema and Row Level Security policies included
- Production-friendly structure for easy deployment to Vercel

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase Auth + Postgres

## Project Structure

```text
.
|-- .env.example
|-- README.md
|-- supabase/
|   `-- schema.sql
|-- src/
|   |-- app/
|   |   |-- actions/
|   |   |   |-- auth.ts
|   |   |   |-- projects.ts
|   |   |   `-- tasks.ts
|   |   |-- dashboard/page.tsx
|   |   |-- login/page.tsx
|   |   |-- projects/
|   |   |   |-- [id]/page.tsx
|   |   |   `-- page.tsx
|   |   |-- globals.css
|   |   |-- layout.tsx
|   |   `-- page.tsx
|   |-- components/
|   |   |-- auth/
|   |   |-- dashboard/
|   |   |-- forms/
|   |   |-- layout/
|   |   |-- projects/
|   |   |-- tasks/
|   |   `-- ui/
|   |-- lib/
|   |   |-- supabase/
|   |   |-- auth.ts
|   |   |-- constants.ts
|   |   |-- data.ts
|   |   |-- types.ts
|   |   `-- utils.ts
|   `-- proxy.ts
|-- next.config.ts
|-- package.json
`-- tsconfig.json
```

## Environment Variables

Create `.env.local` from `.env.example`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Supabase Setup

1. Create a new Supabase project.
2. In the Supabase SQL editor, run [`supabase/schema.sql`](./supabase/schema.sql).
3. In Supabase Auth, set the local site URL to `http://localhost:3000`.
4. Optionally disable email confirmation if you want immediate sign-in after sign-up during MVP testing.
5. Copy the project URL and anon key into `.env.local`.

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open `http://localhost:3000`.

## Deployment To Vercel

1. Push this project to GitHub.
2. Import the repository into Vercel.
3. Add these environment variables in Vercel:
   `NEXT_PUBLIC_SUPABASE_URL`
   `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. In Supabase Auth settings:
   Add your Vercel production URL as the site URL.
   Add your Vercel preview and production URLs to the allowed redirect URLs if you later expand auth flows.
5. Deploy.

## Notes On Architecture

- Supabase browser, server, and proxy-session clients are split under [`src/lib/supabase`](./src/lib/supabase).
- Route protection is enforced in the Next.js proxy layer and backed up by server-side auth checks.
- All database access is protected with Row Level Security.
- CRUD uses server actions to keep the app simple and production-friendly.
- The anon key is safe for the browser because security depends on Supabase Auth and RLS policies, not on hiding the key.
