alter table if exists events
  add column if not exists actor text,
  add column if not exists target text;
