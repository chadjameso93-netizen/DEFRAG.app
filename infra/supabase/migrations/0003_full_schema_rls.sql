-- Migration 0003: Full schema with RLS policies per DEFRAG spec
-- Adds missing tables: entitlements, insight_runs, stripe_events
-- Adds missing columns to existing tables
-- Enables RLS on all user-scoped tables with auth.uid() policies

-- ============================================================
-- 1. Extend profiles table with spec fields
-- ============================================================
alter table profiles
  add column if not exists symbolic_profile_json jsonb,
  add column if not exists time_confidence text default 'unknown';

-- ============================================================
-- 2. Extend relationships table with spec fields
-- ============================================================
alter table relationships
  add column if not exists tension_level text default 'low',
  add column if not exists closeness_score numeric default 0.5,
  add column if not exists volatility_score numeric default 0.3;

-- ============================================================
-- 3. Extend system_events with relationship_id
-- ============================================================
alter table system_events
  add column if not exists relationship_id uuid;

-- ============================================================
-- 4. Create entitlements table
-- ============================================================
create table if not exists entitlements (
  user_id uuid primary key,
  plan text not null default 'free' check (plan in ('free', 'solo', 'team')),
  status text not null default 'trialing' check (status in ('trialing', 'active', 'past_due', 'canceled')),
  stripe_customer_id text,
  stripe_subscription_id text,
  trial_ends_at timestamp with time zone,
  current_period_end timestamp with time zone,
  insights_used_this_month integer default 0,
  insights_reset_at timestamp with time zone default now(),
  created_at timestamp with time zone default now()
);

-- ============================================================
-- 5. Create insight_runs table
-- ============================================================
create table if not exists insight_runs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  relationship_id uuid,
  input_json jsonb not null,
  output_text text,
  proof_json jsonb,
  model text default 'gpt-4o-mini',
  tokens_in integer default 0,
  tokens_out integer default 0,
  cost_usd numeric(10,6) default 0,
  created_at timestamp with time zone default now()
);

-- ============================================================
-- 6. Create stripe_events table (for idempotency)
-- ============================================================
create table if not exists stripe_events (
  id text primary key,
  type text not null,
  payload jsonb not null,
  created_at timestamp with time zone default now()
);

-- ============================================================
-- 7. Enable RLS on all user-scoped tables
-- ============================================================
alter table profiles enable row level security;
alter table relationships enable row level security;
alter table system_events enable row level security;
alter table subscriptions enable row level security;
alter table invites enable row level security;
alter table intake_submissions enable row level security;
alter table invite_events enable row level security;
alter table entitlements enable row level security;
alter table insight_runs enable row level security;

-- ============================================================
-- 8. RLS Policies — profiles
-- ============================================================
drop policy if exists "Users can view own profile" on profiles;
create policy "Users can view own profile" on profiles
  for select using (auth.uid() = user_id);

drop policy if exists "Users can insert own profile" on profiles;
create policy "Users can insert own profile" on profiles
  for insert with check (auth.uid() = user_id);

drop policy if exists "Users can update own profile" on profiles;
create policy "Users can update own profile" on profiles
  for update using (auth.uid() = user_id);

-- ============================================================
-- 9. RLS Policies — relationships
-- ============================================================
drop policy if exists "Users can view own relationships" on relationships;
create policy "Users can view own relationships" on relationships
  for select using (auth.uid() = user_id);

drop policy if exists "Users can insert own relationships" on relationships;
create policy "Users can insert own relationships" on relationships
  for insert with check (auth.uid() = user_id);

drop policy if exists "Users can update own relationships" on relationships;
create policy "Users can update own relationships" on relationships
  for update using (auth.uid() = user_id);

drop policy if exists "Users can delete own relationships" on relationships;
create policy "Users can delete own relationships" on relationships
  for delete using (auth.uid() = user_id);

-- ============================================================
-- 10. RLS Policies — system_events
-- ============================================================
drop policy if exists "Users can view own events" on system_events;
create policy "Users can view own events" on system_events
  for select using (auth.uid() = user_id);

drop policy if exists "Users can insert own events" on system_events;
create policy "Users can insert own events" on system_events
  for insert with check (auth.uid() = user_id);

-- ============================================================
-- 11. RLS Policies — entitlements
-- ============================================================
drop policy if exists "Users can view own entitlements" on entitlements;
create policy "Users can view own entitlements" on entitlements
  for select using (auth.uid() = user_id);

-- ============================================================
-- 12. RLS Policies — insight_runs
-- ============================================================
drop policy if exists "Users can view own insight_runs" on insight_runs;
create policy "Users can view own insight_runs" on insight_runs
  for select using (auth.uid() = user_id);

drop policy if exists "Users can insert own insight_runs" on insight_runs;
create policy "Users can insert own insight_runs" on insight_runs
  for insert with check (auth.uid() = user_id);

-- ============================================================
-- 13. RLS Policies — subscriptions
-- ============================================================
drop policy if exists "Users can view own subscription" on subscriptions;
create policy "Users can view own subscription" on subscriptions
  for select using (auth.uid() = user_id);

-- ============================================================
-- 14. RLS Policies — invites
-- ============================================================
drop policy if exists "Users can view own invites" on invites;
create policy "Users can view own invites" on invites
  for select using (auth.uid() = created_by_user_id);

drop policy if exists "Users can insert own invites" on invites;
create policy "Users can insert own invites" on invites
  for insert with check (auth.uid() = created_by_user_id);

-- ============================================================
-- 15. RLS Policies — intake_submissions
-- ============================================================
drop policy if exists "Users can view own intake submissions" on intake_submissions;
create policy "Users can view own intake submissions" on intake_submissions
  for select using (auth.uid() = user_id);

drop policy if exists "Anyone can insert intake submissions" on intake_submissions;
create policy "Anyone can insert intake submissions" on intake_submissions
  for insert with check (true);

-- ============================================================
-- 16. RLS Policies — invite_events
-- ============================================================
drop policy if exists "Users can view own invite events" on invite_events;
create policy "Users can view own invite events" on invite_events
  for select using (auth.uid() = actor_user_id);

drop policy if exists "Anyone can insert invite events" on invite_events;
create policy "Anyone can insert invite events" on invite_events
  for insert with check (true);

-- ============================================================
-- 17. Indexes for performance
-- ============================================================
create index if not exists idx_insight_runs_user_id on insight_runs(user_id);
create index if not exists idx_insight_runs_relationship_id on insight_runs(relationship_id);
create index if not exists idx_system_events_user_id on system_events(user_id);
create index if not exists idx_relationships_user_id on relationships(user_id);
create index if not exists idx_stripe_events_type on stripe_events(type);
