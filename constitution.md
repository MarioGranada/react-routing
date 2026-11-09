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
| Frontend | React 18 (Create React App 5) | The course project is a CRA SPA. |
| Routing | React Router 6.23 data APIs | Loaders, actions, and nested routes are the focus of the project. |
| Backend | Express 4 | A small API provides event CRUD. |
| Persistence | JSON file | No database setup is needed for the course. |
| Styling | CSS Modules | Component-scoped styles. |

**Rule of thumb:** a new dependency must solve a concrete problem that the current stack cannot solve cleanly. Justify it in the change that introduces it.

## Core Premises

### 1. Scope

A course project for React Router data APIs. It is intentionally backend-light and unauthenticated; production concerns such as auth, pagination, and durable storage are out of scope.

### 2. Environment Isolation

- This project has no runtime secrets. Do not introduce `.env` files unless a real secret or environment-specific URL appears.
- If configuration is added, use environment variables and document them in the README.
- Never commit keys, tokens, database URLs, or credentials.

### 3. Architecture

- Routes, loaders, and actions live in `App.js` and `helpers/`; components should not fetch directly.
- The event detail loader is shared by detail and edit pages through `useRouteLoaderData`.
- The Express API stays small and validates every mutation.

### 4. Data and State

- `events.json` on the API is the source of truth.
- Loaders return plain data; actions return redirects or validation responses.
- No client-side cache; navigating re-runs loaders.

### 5. Styling and UX

- CSS Modules live next to components and pages.
- Keep form errors visible above the form.
- Preserve the shared layout and navigation patterns.

### 6. Quality Gates

- `cd frontend && npm run build` is the main gate.
- Manually test list, detail, new, edit, delete, cancel, invalid form input, unknown event id, API down, and direct deep-link navigation.
- Confirm submit buttons disable while an action is running.

### 7. Deployment

- Frontend: static CRA build for GitHub Pages with SPA fallback.
- Backend: a Node host or a Supabase replacement.
- Move API URLs into environment variables before deploying.

## What to Avoid

- Fetching inside components when a loader already exists.
- Using hooks inside loaders or actions.
- Duplicating the event detail request in both detail and edit pages.
- Assuming JSON file storage is durable in production.
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
