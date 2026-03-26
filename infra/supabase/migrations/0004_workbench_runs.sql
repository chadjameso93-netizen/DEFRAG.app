-- Migration 0004: persistent relational workbench runs

create table if not exists workbench_runs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  relationship_id uuid,
  prompt_text text not null,
  state_json jsonb not null,
  created_at timestamp with time zone default now()
);

alter table workbench_runs enable row level security;

drop policy if exists "Users can view own workbench runs" on workbench_runs;
create policy "Users can view own workbench runs" on workbench_runs
  for select using (auth.uid() = user_id);

drop policy if exists "Users can insert own workbench runs" on workbench_runs;
create policy "Users can insert own workbench runs" on workbench_runs
  for insert with check (auth.uid() = user_id);

create index if not exists idx_workbench_runs_user_id_created_at on workbench_runs(user_id, created_at desc);
create index if not exists idx_workbench_runs_relationship_id on workbench_runs(relationship_id);
