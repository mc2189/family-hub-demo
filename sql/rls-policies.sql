-- Family Hub Demo: representative Row Level Security policies
-- Intended to demonstrate family-scoped authorization patterns.

alter table public.families enable row level security;
alter table public.family_members enable row level security;
alter table public.tasks enable row level security;
alter table public.task_assignments enable row level security;
alter table public.savings_goals enable row level security;
alter table public.audit_events enable row level security;

create or replace function public.current_user_family_ids()
returns setof uuid
language sql
stable
security definer
set search_path = public
as $$
  select id
  from public.families
  where owner_auth_user_id = auth.uid();
$$;

create policy "owner reads own family"
  on public.families for select to authenticated
  using (owner_auth_user_id = auth.uid());

create policy "owner creates own family"
  on public.families for insert to authenticated
  with check (owner_auth_user_id = auth.uid());

create policy "owner updates own family"
  on public.families for update to authenticated
  using (owner_auth_user_id = auth.uid())
  with check (owner_auth_user_id = auth.uid());

create policy "owner manages family members"
  on public.family_members for all to authenticated
  using (family_id in (select public.current_user_family_ids()))
  with check (family_id in (select public.current_user_family_ids()));

create policy "owner manages tasks"
  on public.tasks for all to authenticated
  using (family_id in (select public.current_user_family_ids()))
  with check (family_id in (select public.current_user_family_ids()));

create policy "owner manages assignments"
  on public.task_assignments for all to authenticated
  using (family_id in (select public.current_user_family_ids()))
  with check (family_id in (select public.current_user_family_ids()));

create policy "owner manages savings goals"
  on public.savings_goals for all to authenticated
  using (family_id in (select public.current_user_family_ids()))
  with check (family_id in (select public.current_user_family_ids()));

-- Audit records are readable and appendable by the family owner but not editable/deletable.
create policy "owner reads audit"
  on public.audit_events for select to authenticated
  using (family_id in (select public.current_user_family_ids()));

create policy "owner appends audit"
  on public.audit_events for insert to authenticated
  with check (family_id in (select public.current_user_family_ids()));

-- Service-role credentials bypass RLS in Supabase and must never be shipped to the browser.
