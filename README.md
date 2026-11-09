# React Routing — Events

An events manager built to practise React Router’s data APIs. The app uses nested layouts, loaders, actions, dynamic params, and navigation state to fetch and mutate events without putting request logic inside components.

A small Express API stores events in a JSON file and exposes list, detail, create, update, and delete endpoints.

> **Follow-along project.** This app was built while following **React — The Complete Guide (Academind / Maximilian Schwarzmüller)**. It is included in the portfolio as a learning exercise, not as a production product. The implementation is my own work based on the course material.

## Features

- Nested routes and shared layouts with `Outlet`.
- Route loaders for event lists and details.
- Route actions for create, edit, and delete.
- `useNavigation` submitting state and disabled buttons.
- Dynamic `:eventId` routes and a shared detail loader.
- Form validation errors returned from actions.
- Custom error page via `errorElement`.
- Programmatic redirects after mutations.

## Tech stack

| Layer | Technology |
| --- | --- |
| Frontend | React 18 (Create React App 5) |
| Routing | React Router 6.23 data APIs |
| Backend | Express 4 |
| Persistence | JSON file |
| Styling | CSS Modules |

## Project structure

```text
react-routing/
├── backend/
│   ├── app.js                 # Express app (port 8080)
│   ├── routes/events.js       # Event CRUD
│   ├── data/event.js          # JSON read/write helpers
│   ├── util/                  # validation and errors
│   └── events.json
├── frontend/
│   ├── src/
│   │   ├── pages/             # Home, Events, EventDetail, New, Edit, Root, Error
│   │   ├── components/        # EventForm, lists, navigation, page content
│   │   ├── helpers/           # eventsLoader, action
│   │   └── App.js             # Router configuration
│   └── package.json
└── how-to-use.txt
```

## Getting started

### Requirements

- Node.js 18 or 20 (CRA 5 is legacy; newer versions may need `NODE_OPTIONS=--openssl-legacy-provider`).
- npm (lockfiles are committed for both apps).
- Two terminals: one for the API and one for the frontend.

### 1. Install dependencies

```bash
# Backend
cd backend && npm install

# Frontend
cd ../frontend && npm install
```

### 2. Run locally

**Start the backend API**

```bash
cd backend && npm start
```

Open http://localhost:8080.

**Start the frontend**

```bash
cd frontend && npm start
```

Open http://localhost:3000.

Both servers must be running; the frontend calls `http://localhost:8080` directly.

### Available scripts

| Command | Description |
| --- | --- |
| `cd backend && npm start` | Start the Express API on port 8080. |
| `cd frontend && npm start` | Start CRA on port 3000. |
| `cd frontend && npm run build` | Create a production frontend build. |
| `cd frontend && npm test` | Run the CRA test runner. |

## How it works

`frontend/src/App.js` defines the router: a root layout, an events layout, an index event list, a dynamic `:eventId` branch with an optional `edit` child, and a `new` route. `errorElement` renders the shared error page.

`helpers/eventsLoader.js` fetches the event list; `pages/EventDetail/loaderHelper.js` fetches one event and is attached to the parent detail route so both the detail and edit pages can read it with `useRouteLoaderData("event-detail")`.

`helpers/action.js` handles both create and edit by checking `request.method`; `pages/EventDetail/action.js` handles deletion. Both throw plain objects with a message and status so the error page can render them.

`EventForm` uses React Router’s `Form`, `useActionData`, `useNavigation`, and `useNavigate` to show validation errors, disable controls while submitting, and cancel back to the parent route.

`backend/app.js` mounts `/events` and a shared error handler. `routes/events.js` validates input and persists to `events.json` through `data/event.js`.

## Deployment

- Target: GitHub Actions can build the CRA frontend and publish `build/` to GitHub Pages.
- The Express API needs a Node host, or replacement with Supabase. JSON files are not durable.
- Replace the hardcoded `http://localhost:8080` URLs with environment-driven configuration before deploying.
- A static host needs SPA fallback so deep links such as `/events/123` serve `index.html`.

## Notes and limitations

- API URLs are hardcoded in the loaders and actions.
- `how-to-use.txt` still refers to old folder names (`backend-api`, `react-frontend`); the actual folders are `backend/` and `frontend/`.
- There is no authentication in this project.
- Events are stored in a JSON file and are shared by every client.
- There are no automated tests beyond the CRA default.

---

**Author:** Mario Granada
