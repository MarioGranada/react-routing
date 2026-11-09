# React Routing — Events — Working Memory

_Last updated: 2026-11-02_

## Current status

- Nested routes, loaders, actions, error handling, and event CRUD are implemented.
- Create, edit, delete, and cancel flows work against the local API.
- No tests or deployment workflow yet.

## Key decisions

- Used React Router data APIs instead of component-level effects to make data flow explicit.
- Shared the single-event loader at the parent route so both detail and edit can reuse it.

## Known limitations and follow-ups

- API URLs are hardcoded.
- No authentication or per-user data.
- JSON persistence is local to the API machine.
- `how-to-use.txt` is outdated.

## Mistakes to avoid

- Starting only the frontend leaves the event list in an error state.
- Using hooks inside a loader fails at runtime.
- Forgetting SPA fallback breaks deep links on static hosting.
- The old folder names in `how-to-use.txt` do not match the repository.

## Next steps

- Move API URLs into environment variables.
- Update or remove `how-to-use.txt`.
- Add a deployment workflow and SPA fallback.
- Add tests for loaders and actions.

---

Keep this file under ~60 lines. Summarise or delete notes that no longer add value.
