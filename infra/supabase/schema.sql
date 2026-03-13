create extension if not exists pgcrypto;

create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique not null,
  full_name text,
  birth_date date,
  birth_time text,
  birth_place text,
  created_at timestamp with time zone default now()
);

create table if not exists relationships (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  source_name text not null,
  target_name text not null,
  relationship_type text default 'personal',
  tension_score numeric default 0.2,
  trust_score numeric default 0.5,
  created_at timestamp with time zone default now()
);

create table if not exists system_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  event_type text not null,
  actor text,
  target text,
  severity numeric default 0.5,
  notes text,
  created_at timestamp with time zone default now()
);

create table if not exists subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique not null,
  status text default 'trial',
  trial_ends_at timestamp with time zone,
  stripe_customer_id text,
  stripe_subscription_id text,
  created_at timestamp with time zone default now()
);

create table if not exists invites (
  id uuid primary key default gen_random_uuid(),
  created_by_user_id uuid not null,
  invite_token text unique not null,
  email text,
  phone text,
  trial_days integer default 7,
  status text not null default 'created',
  created_at timestamp with time zone default now(),
  opened_at timestamp with time zone,
  completed_at timestamp with time zone,
  expires_at timestamp with time zone,
  metadata jsonb default '{}'::jsonb
);

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

create table if not exists persons (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  name text not null,
  role text,
  created_at timestamp with time zone default now()
);

create table if not exists relationships_v2 (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  source_person_id uuid not null references persons(id) on delete cascade,
  target_person_id uuid not null references persons(id) on delete cascade,
  relationship_type text default 'personal',
  tension_score numeric default 0.2,
  trust_score numeric default 0.5,
  created_at timestamp with time zone default now()
);

create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  relationship_id uuid references relationships_v2(id) on delete set null,
  event_type text not null,
  severity numeric default 0.5,
  notes text,
  occurred_at timestamp with time zone not null,
  created_at timestamp with time zone default now()
);

create table if not exists event_participants (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references events(id) on delete cascade,
  person_id uuid not null references persons(id) on delete cascade,
  role text,
  created_at timestamp with time zone default now()
);

create table if not exists insights (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  relationship_id uuid references relationships_v2(id) on delete set null,
  summary text not null,
  confidence numeric default 0.5,
  evidence text[] default '{}'::text[],
  alternate_explanations text[] default '{}'::text[],
  created_at timestamp with time zone default now()
);

create table if not exists simulations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  relationship_id uuid references relationships_v2(id) on delete set null,
  action text not null,
  escalation_probability numeric default 0.0,
  repair_probability numeric default 0.0,
  stability_probability numeric default 0.0,
  created_at timestamp with time zone default now()
);
