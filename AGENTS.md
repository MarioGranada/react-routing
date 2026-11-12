# AGENTS.md — React Routing — Events

Compact guide for future OpenCode sessions. It records only the facts an agent is likely to miss or get wrong.

## Quickstart

| Command | Description |
| --- | --- |
| `vercel env pull .env.local` | Pull `POSTGRES_URL` and `CRON_SECRET` into the gitignored root `.env.local`. |
| `npm ci --prefix backend && npm run db:migrate --prefix backend` | Install the API and apply the idempotent schema + seed. |
| `npm run dev --prefix backend` | Run the API on port 8080 (routes under `/api`). |
| `npm ci --prefix frontend && npm run dev --prefix frontend` | Run the SPA on port 3000; Vite proxies `/api`. |
| `npm run build --prefix frontend && npm run lint --prefix frontend` | Verify the production bundle and lint. |

## Requirements

- Node.js 22 LTS (`backend/package.json` pins `22.x` for the Vercel Function).
- npm (lockfiles are committed for both apps).
- Two terminals: one for the API and one for the frontend.

## Environment

- `POSTGRES_URL` (transaction pooler) and `POSTGRES_URL_NON_POOLING` come from the Supabase integration on Vercel. `CRON_SECRET` protects `/api/cron/reset`. All live in the root `.env.local` (gitignored); backend scripts load it with `--env-file-if-exists=../.env.local`.
- `VITE_API_URL` is optional; the SPA defaults to the same-origin `/api`.
- Never commit `.env*` files (except `.env.example`), `.vercel/`, database URLs, or credentials.

## Architecture

- `vercel.json` — Vercel Services: `frontend` (Vite, SPA fallback) and `backend` (Express); `/api/*` → backend; nightly cron.
- `frontend/src/App.jsx` — route tree and route modules.
- `frontend/src/helpers/eventsLoader.js` — event list loader.
- `frontend/src/pages/EventDetail/loaderHelper.js` — single-event loader.
- `frontend/src/helpers/action.js` — create/update action.
- `frontend/src/components/EventForm.jsx` — shared form and navigation state.
- `backend/app.js` — Express app exported for Vercel; `server.js` only listens locally.
- `backend/routes/events.js` — API CRUD and validation; `data/event.js` — SQL.
- `backend/db/sql.js` — schema + seed and reset SQL (in JS so the function bundle includes it); `db/seed.js` applies them.
- `backend/routes/cron.js` — nightly reset, refuses requests without `Bearer $CRON_SECRET`.

## Commands and build order

- Run both servers; the SPA cannot load or save events without the API.
- `npm run build --prefix frontend` and `npm run lint --prefix frontend` are the gates.
- Schema changes go in `backend/db/sql.js`, must stay idempotent, and need `npm run db:migrate --prefix backend` against the shared database.

## Conventions and gotchas

- Loaders and actions run outside React render; they cannot use hooks.
- Throwing a plain object from a loader is intentional and is rendered by `errorElement`.
- The detail loader is attached to the parent route; child pages read it with `useRouteLoaderData`.
- Deleting uses the request method from the form, so the delete action must stay on the detail route.
- Every API route lives under `/api`, because Vercel passes the original path to the backend service.
- Do not read files at runtime in the backend: the Vercel service bundle only includes traced JS.
- The Supabase pooler does not support prepared statements; keep `prepare: false` in `db/index.js`.
- The database is shared with other portfolio apps; only touch the `react_routing` schema.
- Never send database errors to the browser; the error handler returns a generic 500 message.

## Memory

- Read `MEMORY.md` first to understand the current status and decisions.
- Before changing behaviour, read `constitution.md` and keep the change aligned with it.
- After a task, update `MEMORY.md` with status, decisions, and mistakes to avoid. Keep it short.
- If a rule becomes permanent, move it into this file instead of leaving it in memory.
- Never store secrets, tokens, or personal data in `MEMORY.md`.
