alter table invites
  add column if not exists name text,
  add column if not exists relationship text default 'personal',
  add column if not exists delivery_method text default 'email',
  add column if not exists phone text,
  add column if not exists status text default 'sent',
  add column if not exists opened_at timestamp with time zone,
  add column if not exists completed_at timestamp with time zone;

create table if not exists intake_submissions (
  id uuid primary key default gen_random_uuid(),
  invite_id uuid not null references invites(id) on delete cascade,
  user_id uuid,
  payload_json jsonb not null,
  completion_state text default 'completed',
  version integer default 1,
  submitted_at timestamp with time zone default now()
);

create table if not exists invite_events (
  id uuid primary key default gen_random_uuid(),
  invite_id uuid not null references invites(id) on delete cascade,
  actor_user_id uuid,
  event_type text not null,
  context_json jsonb default '{}'::jsonb,
  occurred_at timestamp with time zone default now()
);

create index if not exists idx_invites_status on invites(status);
create index if not exists idx_intake_submissions_invite_id on intake_submissions(invite_id);
create index if not exists idx_invite_events_invite_id on invite_events(invite_id);
