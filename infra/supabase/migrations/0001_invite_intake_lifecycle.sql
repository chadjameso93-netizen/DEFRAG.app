alter table if exists invites
  add column if not exists phone text,
  add column if not exists status text not null default 'created',
  add column if not exists opened_at timestamp with time zone,
  add column if not exists completed_at timestamp with time zone,
  add column if not exists metadata jsonb default '{}'::jsonb;

create table if not exists intake_submissions (
  id uuid primary key default gen_random_uuid(),
  invite_id uuid not null references invites(id) on delete cascade,
  submitted_by_user_id uuid,
  name text not null,
  birth_date date not null,
  birth_time text not null,
  birth_location text not null,
  payload_json jsonb default '{}'::jsonb,
  completion_state text not null default 'completed',
  submitted_at timestamp with time zone default now()
);

create table if not exists invite_events (
  id uuid primary key default gen_random_uuid(),
  invite_id uuid not null references invites(id) on delete cascade,
  event_type text not null,
  actor_user_id uuid,
  context_json jsonb default '{}'::jsonb,
  occurred_at timestamp with time zone default now()
);
