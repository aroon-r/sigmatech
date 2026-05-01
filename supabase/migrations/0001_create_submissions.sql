-- Contact form submissions table.
-- id is a short sha256 hex prefix generated in the route handler (not a UUID)
-- so we match the submissionId returned to the client.

create table if not exists public.submissions (
  id         text        primary key,
  full_name  text        not null,
  email      text        not null,
  services   text[]      not null default '{}',
  budget     text        not null,
  message    text        not null,
  company    text,
  created_at timestamptz not null default now()
);

-- Service-role inserts bypass RLS; client-role selects are blocked by default.
alter table public.submissions enable row level security;

-- Useful for admin queries: filter by email (exact), sort by recency.
create index if not exists submissions_email_idx      on public.submissions (email);
create index if not exists submissions_created_at_idx on public.submissions (created_at desc);
