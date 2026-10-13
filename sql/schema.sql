-- Family Hub Demo: compact synthetic schema
-- This is intentionally smaller than the private working application's schema.

create extension if not exists pgcrypto;

create table if not exists public.families (
  id uuid primary key default gen_random_uuid(),
  owner_auth_user_id uuid not null,
  display_name text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.family_members (
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null references public.families(id) on delete cascade,
  display_name text not null,
  role text not null check (role in ('parent', 'child')),
  created_at timestamptz not null default now()
);

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null references public.families(id) on delete cascade,
  title text not null,
  description text not null default '',
  reward_pence integer not null default 0 check (reward_pence >= 0),
  created_by uuid references public.family_members(id),
  created_at timestamptz not null default now()
);

create table if not exists public.task_assignments (
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null references public.families(id) on delete cascade,
  task_id uuid not null references public.tasks(id) on delete cascade,
  child_member_id uuid not null references public.family_members(id) on delete cascade,
  status text not null check (status in ('scheduled','submitted','approved','rejected')),
  submitted_at timestamptz,
  reviewed_at timestamptz
);

create table if not exists public.savings_goals (
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null references public.families(id) on delete cascade,
  child_member_id uuid not null references public.family_members(id) on delete cascade,
  title text not null,
  target_pence integer not null check (target_pence > 0),
  current_pence integer not null default 0 check (current_pence >= 0),
  created_at timestamptz not null default now()
);

create table if not exists public.audit_events (
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null references public.families(id) on delete cascade,
  actor_member_id uuid references public.family_members(id),
  action text not null,
  target_type text not null,
  target_id text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_family_members_family on public.family_members(family_id);
create index if not exists idx_tasks_family on public.tasks(family_id);
create index if not exists idx_assignments_family on public.task_assignments(family_id);
create index if not exists idx_audit_family_created on public.audit_events(family_id, created_at desc);
