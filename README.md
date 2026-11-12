# React Routing — Events

An events manager built to practise React Router’s data APIs. The app uses nested layouts, loaders, actions, dynamic params, and navigation state to fetch and mutate events without putting request logic inside components.

A small Express API exposes list, detail, create, update, and delete endpoints. Events live in a `react_routing` schema of a hosted Supabase Postgres database. The SPA and the API deploy together as one Vercel project.

> **Follow-along project.** This app was built while following **React — The Complete Guide (Academind / Maximilian Schwarzmüller)**. It is included in the portfolio as a learning exercise, not as a production product. The implementation is my own work based on the course material.

## Live demo

| | |
| --- | --- |
| **Live site** | https://react-routing-umber.vercel.app |
| **Repository** | https://github.com/MarioGranada/react-routing |
| **Portfolio summary** | Events manager built on React Router data APIs — nested layouts, loaders, actions and navigation state — with an Express API and Supabase Postgres, deployed as one Vercel project. |

The demo is public: anyone can add, edit, or delete events. The data is reset to three sample events every night (04:00 UTC).

## Features

- Nested routes and shared layouts with `Outlet`.
- Route loaders for event lists and details.
- Route actions for create, edit, and delete.
- `useNavigation` submitting state and disabled buttons.
- Dynamic `:eventId` routes and a shared detail loader.
- Form validation errors returned from the API and shown by the action.
- Custom error page via `errorElement`.
- Programmatic redirects after mutations.

## Tech stack

| Layer | Technology |
| --- | --- |
| Frontend | React 18 + Vite 8 |
| Routing | React Router 6.23 data APIs |
| Backend | Express 4 (Vercel Function in production) |
| Persistence | Supabase Postgres via postgres.js |
| Hosting | Vercel Services (frontend + backend in one project), nightly Vercel Cron |
| Styling | CSS Modules |

## Project structure

```text
react-routing/
├── vercel.json                # Services (frontend, backend), /api routing, nightly cron
├── backend/
│   ├── app.js                 # Express app; every route under /api
│   ├── server.js              # Local dev server (port 8080)
│   ├── routes/events.js       # Event CRUD + validation
│   ├── routes/cron.js         # GET /api/cron/reset (needs CRON_SECRET)
│   ├── data/event.js          # SQL queries
│   ├── db/                    # postgres.js client, schema + seed SQL, reset helper
│   ├── scripts/db.js          # npm run db:migrate | db:reset
│   └── util/                  # validation and errors
└── frontend/
    ├── src/
    │   ├── pages/             # Home, Events, EventDetail, New, Edit, Root, Error
    │   ├── components/        # EventForm, lists, navigation, page content
    │   ├── helpers/           # eventsLoader, action
    │   ├── config.js          # API_URL (defaults to /api)
    │   └── App.jsx            # Router configuration
    └── vite.config.mjs        # Dev proxy: /api -> localhost:8080
```

## Getting started

### Requirements

- Node.js 22 LTS.
- npm (lockfiles are committed for both apps).
- The Vercel CLI, linked to the project, to pull the database URL (`vercel link`, then `vercel env pull .env.local` in the repo root).
- Two terminals: one for the API and one for the frontend.

### 1. Install dependencies

```bash
npm ci --prefix backend
npm ci --prefix frontend
```

### 2. Configure the database

```bash
vercel env pull .env.local        # POSTGRES_URL, POSTGRES_URL_NON_POOLING, CRON_SECRET
npm run db:migrate --prefix backend   # idempotent: creates the schema and seed events
```

`.env.local` is gitignored. Any Postgres works locally: set `POSTGRES_URL` to it instead.

### 3. Run locally

```bash
npm run dev --prefix backend     # API on http://localhost:8080/api
npm run dev --prefix frontend    # SPA on http://localhost:3000
```

Vite proxies `/api` to the backend, so the SPA uses the same relative URLs as in production.

### Available scripts

| Command | Description |
| --- | --- |
| `npm run dev --prefix backend` | API with `--watch` on port 8080. |
| `npm run db:migrate --prefix backend` | Apply the schema and seed (idempotent). |
| `npm run db:reset --prefix backend` | Empty the events table and restore the seed. |
| `npm run dev --prefix frontend` | Vite dev server on port 3000. |
| `npm run build --prefix frontend` | Production build into `frontend/dist`. |
| `npm run lint --prefix frontend` | ESLint. |

## How it works

`frontend/src/App.jsx` defines the router: a root layout, an events layout, an index event list, a dynamic `:eventId` branch with an optional `edit` child, and a `new` route. `errorElement` renders the shared error page.

`helpers/eventsLoader.js` fetches the event list; `pages/EventDetail/loaderHelper.js` fetches one event and is attached to the parent detail route so both the detail and edit pages can read it with `useRouteLoaderData("event-detail")`.

`helpers/action.js` handles both create and edit by checking `request.method`; `pages/EventDetail/action.js` handles deletion. Both throw plain objects with a message and status so the error page can render them.

`EventForm` uses React Router’s `Form`, `useActionData`, `useNavigation`, and `useNavigate` to show validation errors, disable controls while submitting, and cancel back to the parent route.

`backend/app.js` mounts every route under `/api`. `routes/events.js` validates input and persists through `data/event.js`, which queries Postgres. Server errors return a generic message; database errors are only logged on the server.

## Deployment

- **Live:** https://react-routing-umber.vercel.app
- One Vercel project with two [Services](https://vercel.com/docs/services) defined in `vercel.json`: `frontend` (Vite static build with SPA fallback) and `backend` (Express as a Vercel Function). `/api/*` routes to the backend, everything else to the frontend.
- Pushing to `master` deploys production.
- The database comes from the Supabase integration on Vercel, which injects `POSTGRES_URL` into every environment. `CRON_SECRET` protects the reset endpoint.
- A daily Vercel Cron calls `/api/cron/reset` at 04:00 UTC to restore the seed events.

## Notes and limitations

- There is no authentication: every visitor shares and can change the same event list until the nightly reset.
- Image fields take any `http(s)` URL; images are not uploaded or validated.
- There are no automated tests.

---

**Author:** Mario Granada
