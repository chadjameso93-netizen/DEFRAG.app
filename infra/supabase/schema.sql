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
  trial_days integer default 7,
  created_at timestamp with time zone default now(),
  expires_at timestamp with time zone
);

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
