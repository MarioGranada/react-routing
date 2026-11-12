// Schema + seed SQL, kept in JS so the Vercel function bundle always includes it
// (no runtime file reads). Both statements are idempotent.

// Idempotent schema + seed. Safe to run repeatedly.
exports.migration = `
-- react-routing: idempotent schema + seed. Safe to run repeatedly.
create schema if not exists react_routing;

create table if not exists react_routing.events (
  id          text primary key default gen_random_uuid()::text,
  title       text not null,
  description text not null,
  date        text not null,
  image       text not null,
  created_at  timestamptz not null default now()
);

-- Only the server (postgres role) talks to this schema; keep the Data API out.
alter table react_routing.events enable row level security;

insert into react_routing.events (id, title, description, date, image, created_at) values
  ('6f1c2a7e-3b1d-4c55-9a0e-1d2f3a4b5c61', 'Frontend Architecture Meetup',
   'An evening of lightning talks on structuring large React apps: routing, data loading and state boundaries.',
   '2027-03-18', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
   '2026-01-03T10:00:00Z'),
  ('8a2d3b8f-4c2e-4d66-8b1f-2e3f4a5b6c72', 'React Router Data APIs Workshop',
   'Hands-on session building loaders, actions and nested layouts, with time for questions and pair programming.',
   '2027-02-10', 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80',
   '2026-01-02T10:00:00Z'),
  ('9b3e4c90-5d3f-4e77-9c20-3f4a5b6c7d83', 'Open Source Saturday',
   'Bring a laptop and contribute to open-source JavaScript projects alongside friendly maintainers.',
   '2027-01-23', 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
   '2026-01-01T10:00:00Z')
on conflict (id) do nothing;
`;

// Empties the demo tables; running `migration` afterwards restores the seed.
exports.reset = `
-- Empties the demo tables; migration.sql then re-inserts the seed.
truncate react_routing.events;
`;
