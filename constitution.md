# Project Constitution — React Routing — Events

This document defines the non-negotiable foundations for this repository. Read it before adding or changing features.

## Guiding Principles

- **Simplicity first** — prefer the smallest solution that solves the problem. If a change needs a long explanation, it is probably over-engineered.
- **No hardcoded secrets or endpoints** — configuration belongs in environment variables; visual design tokens belong in styles, not in `.env` files.
- **Traceability** — every value, dependency, and route should make its origin and purpose obvious.
- **Debuggability** — fail loudly and visibly; avoid silent fallbacks that hide broken data.
- **Official patterns** — use the documented API of each framework and library before inventing a workaround.
- **Portfolio clarity** — this repository is part of a public portfolio. Code should read as clean, intentional, and easy for a reviewer to follow. As a follow-along project, its purpose is to demonstrate the concepts practised in the course, not to imitate production scale.

## Technology Stack Foundations

| Layer | Choice | Rationale |
| --- | --- | --- |
| Frontend | React 18 + Vite 8 | Migrated from CRA; static SPA build. |
| Routing | React Router 6.23 data APIs | Loaders, actions, and nested routes are the focus of the project. |
| Backend | Express 4 | A small API provides event CRUD; runs as a Vercel Function. |
| Persistence | Supabase Postgres (postgres.js) | Durable storage on serverless hosting; one schema (`react_routing`) in the shared portfolio database. |
| Hosting | Vercel Services + Cron | SPA and API ship together on one origin; nightly demo reset. |
| Styling | CSS Modules | Component-scoped styles. |

**Rule of thumb:** a new dependency must solve a concrete problem that the current stack cannot solve cleanly. Justify it in the change that introduces it.

## Core Premises

### 1. Scope

A course project for React Router data APIs. It is intentionally backend-light and unauthenticated; production concerns such as auth and pagination are out of scope. The public demo is kept clean by a nightly reset, not by moderation.

### 2. Environment Isolation

- Runtime configuration comes from environment variables: `POSTGRES_URL` / `POSTGRES_URL_NON_POOLING` (Supabase integration) and `CRON_SECRET`. Locally they live in the gitignored root `.env.local` (`vercel env pull .env.local`).
- Document every variable in the README and `AGENTS.md`.
- Never commit keys, tokens, database URLs, or credentials, and never log them or send database errors to the browser.

### 3. Architecture

- Routes, loaders, and actions live in `App.js` and `helpers/`; components should not fetch directly.
- The event detail loader is shared by detail and edit pages through `useRouteLoaderData`.
- The Express API stays small and validates every mutation (type, length, URL and date checks).
- Every API route lives under `/api`; the frontend calls the same origin.
- The backend never reads files at runtime; SQL lives in `backend/db/sql.js`.
- The reset endpoint refuses any request without `Authorization: Bearer $CRON_SECRET`.

### 4. Data and State

- The `react_routing.events` table is the source of truth. Schema and seed changes stay idempotent (`npm run db:migrate --prefix backend`).
- Only touch the `react_routing` schema; the database is shared with other portfolio apps.
- Loaders return plain data; actions return redirects or validation responses.
- No client-side cache; navigating re-runs loaders.

### 5. Styling and UX

- CSS Modules live next to components and pages.
- Keep form errors visible above the form.
- Preserve the shared layout and navigation patterns.

### 6. Quality Gates

- `npm run build --prefix frontend` and `npm run lint --prefix frontend` are the main gates.
- Manually test list, detail, new, edit, delete, cancel, invalid form input, unknown event id, API down, and direct deep-link navigation.
- Confirm submit buttons disable while an action is running.

### 7. Deployment

- One Vercel project (Services in `vercel.json`): `frontend` serves the Vite build with SPA fallback, `backend` runs Express. Pushing to `master` deploys production.
- The nightly cron `/api/cron/reset` restores the seed data.
- Delete any test data written to production after verifying.

## What to Avoid

- Fetching inside components when a loader already exists.
- Using hooks inside loaders or actions.
- Duplicating the event detail request in both detail and edit pages.
- Writing to local files from the API (not durable or writable on Vercel).
- Adding authentication without a clear requirement for this routing exercise.

## Checklist Before Adding Anything New

- Does this solve a real problem for this project, or am I adding scope for its own sake?
- Is every new value configuration-driven rather than hardcoded?
- Does the change follow the existing folder and naming patterns?
- Is there a clear failure path when data, the network, or the environment is unavailable?
- Have I run the available lint/build/test command and fixed what it reports?
- Did I update `README.md` and `MEMORY.md` if behaviour or setup changed?

## Philosophy Statement

This repository exists to show thoughtful front-end engineering: clear structure, readable code, and deliberate trade-offs. The goal is not to use every tool available, but to make every file explain itself. Simplicity is the feature.
