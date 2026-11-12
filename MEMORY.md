# React Routing — Events — Working Memory

_Last updated: 2026-11-12_

## Current status

- Live on Vercel: https://react-routing-umber.vercel.app (pushes to `master` deploy production).
- One Vercel project with Services: `frontend` (Vite 8 SPA) + `backend` (Express under `/api`).
- Events live in the `react_routing` schema of the shared Supabase Postgres (`portfolio-db`).
- Nightly Vercel Cron (04:00 UTC) calls `/api/cron/reset` to restore the 3 seed events.
- Nested routes, loaders, actions, error handling and event CRUD verified end to end in headless Chrome against production.
- No automated tests.

## Key decisions

- Used React Router data APIs instead of component-level effects to make data flow explicit.
- Shared the single-event loader at the parent route so both detail and edit can reuse it.
- Replaced the `events.json` file store with Postgres (files are not writable or durable on Vercel).
- Same-origin `/api` (Vite proxy locally) instead of a separate API host: no CORS, no URL env var.
- Seed and reset SQL live in `backend/db/sql.js`, not `.sql` files: the Vercel service bundle dropped runtime-read files.
- The old JSON test events were replaced with three tidy seed events.

## Known limitations and follow-ups

- No authentication: the public demo list is editable by anyone until the nightly reset.
- No tests for loaders, actions or the API.

## Mistakes to avoid

- Starting only the frontend leaves the event list in an error state.
- Using hooks inside a loader fails at runtime.
- Mounting backend routes without the `/api` prefix: Vercel forwards the original path.
- Printing `.env.local` values or committing them.

## Next steps

- Add tests for loaders, actions and the API.

---

Keep this file under ~60 lines. Summarise or delete notes that no longer add value.
