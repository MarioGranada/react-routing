# AGENTS.md — React Routing — Events

Compact guide for future OpenCode sessions. It records only the facts an agent is likely to miss or get wrong.

## Quickstart

| Command | Description |
| --- | --- |
| `cd backend && npm install && npm start` | Run the API on port 8080. |
| `cd frontend && npm install && npm start` | Run the SPA on port 3000. |
| `cd frontend && npm run build` | Verify the production bundle. |

## Requirements

- Node.js 18 or 20 (CRA 5 is legacy; newer versions may need `NODE_OPTIONS=--openssl-legacy-provider`).
- npm (lockfiles are committed for both apps).
- Two terminals: one for the API and one for the frontend.

## Environment

- No environment variables are used. API URLs are hardcoded.
- Never commit real data or credentials.

## Architecture

- `frontend/src/App.js` — route tree and route modules.
- `frontend/src/helpers/eventsLoader.js` — event list loader.
- `frontend/src/pages/EventDetail/loaderHelper.js` — single-event loader.
- `frontend/src/helpers/action.js` — create/update action.
- `frontend/src/components/EventForm.js` — shared form and navigation state.
- `backend/routes/events.js` — API CRUD and validation.

## Commands and build order

- Run both servers; the SPA cannot load or save events without the API.
- `cd frontend && npm run build` is the production gate.
- CRA tests watch by default; use `CI=true npm test` for a single run.

## Conventions and gotchas

- Loaders and actions run outside React render; they cannot use hooks.
- Throwing a plain object from a loader is intentional and is rendered by `errorElement`.
- The detail loader is attached to the parent route; child pages read it with `useRouteLoaderData`.
- Deleting uses the request method from the form, so the delete action must stay on the detail route.
- A static host needs SPA fallback for deep links.

## Memory

- Read `MEMORY.md` first to understand the current status and decisions.
- Before changing behaviour, read `constitution.md` and keep the change aligned with it.
- After a task, update `MEMORY.md` with status, decisions, and mistakes to avoid. Keep it short.
- If a rule becomes permanent, move it into this file instead of leaving it in memory.
- Never store secrets, tokens, or personal data in `MEMORY.md`.
