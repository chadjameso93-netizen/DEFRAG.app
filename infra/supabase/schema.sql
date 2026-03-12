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
