create extension if not exists pgcrypto;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'project_status') then
    create type public.project_status as enum ('active', 'completed', 'archived');
  end if;

  if not exists (select 1 from pg_type where typname = 'task_status') then
    create type public.task_status as enum ('todo', 'doing', 'done');
  end if;

  if not exists (select 1 from pg_type where typname = 'task_priority') then
    create type public.task_priority as enum ('low', 'medium', 'high');
  end if;
end $$;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop table if exists public.subtasks cascade;

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users (id) on delete cascade,
  name text not null check (char_length(trim(name)) between 1 and 120),
  description text,
  badge_color text not null default 'blue' check (badge_color in ('slate', 'stone', 'rose', 'orange', 'amber', 'lime', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'pink')),
  status public.project_status not null default 'active',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

alter table if exists public.projects
drop constraint if exists projects_badge_color_check;

alter table if exists public.projects
add constraint projects_badge_color_check
check (badge_color in ('slate', 'stone', 'rose', 'orange', 'amber', 'lime', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'pink'));

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  owner_id uuid not null references auth.users (id) on delete cascade,
  title text not null check (char_length(trim(title)) between 1 and 160),
  description text,
  status public.task_status not null default 'todo',
  priority public.task_priority not null default 'medium',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

alter table if exists public.tasks
drop column if exists due_date;

create index if not exists projects_owner_id_idx on public.projects (owner_id, status, updated_at desc);
create index if not exists tasks_owner_id_idx on public.tasks (owner_id, project_id, status, priority);
create index if not exists tasks_project_id_idx on public.tasks (project_id, created_at desc);

drop trigger if exists set_projects_updated_at on public.projects;
create trigger set_projects_updated_at
before update on public.projects
for each row
execute function public.set_updated_at();

drop trigger if exists set_tasks_updated_at on public.tasks;
create trigger set_tasks_updated_at
before update on public.tasks
for each row
execute function public.set_updated_at();

alter table public.projects enable row level security;
alter table public.tasks enable row level security;

drop policy if exists "Users can view their own projects" on public.projects;
create policy "Users can view their own projects"
on public.projects
for select
using (owner_id = auth.uid());

drop policy if exists "Users can create their own projects" on public.projects;
create policy "Users can create their own projects"
on public.projects
for insert
with check (owner_id = auth.uid());

drop policy if exists "Users can update their own projects" on public.projects;
create policy "Users can update their own projects"
on public.projects
for update
using (owner_id = auth.uid())
with check (owner_id = auth.uid());

drop policy if exists "Users can delete their own projects" on public.projects;
create policy "Users can delete their own projects"
on public.projects
for delete
using (owner_id = auth.uid());

drop policy if exists "Users can view their own tasks" on public.tasks;
create policy "Users can view their own tasks"
on public.tasks
for select
using (
  owner_id = auth.uid()
  and exists (
    select 1
    from public.projects
    where public.projects.id = public.tasks.project_id
      and public.projects.owner_id = auth.uid()
  )
);

drop policy if exists "Users can create their own tasks" on public.tasks;
create policy "Users can create their own tasks"
on public.tasks
for insert
with check (
  owner_id = auth.uid()
  and exists (
    select 1
    from public.projects
    where public.projects.id = public.tasks.project_id
      and public.projects.owner_id = auth.uid()
  )
);

drop policy if exists "Users can update their own tasks" on public.tasks;
create policy "Users can update their own tasks"
on public.tasks
for update
using (
  owner_id = auth.uid()
  and exists (
    select 1
    from public.projects
    where public.projects.id = public.tasks.project_id
      and public.projects.owner_id = auth.uid()
  )
)
with check (
  owner_id = auth.uid()
  and exists (
    select 1
    from public.projects
    where public.projects.id = public.tasks.project_id
      and public.projects.owner_id = auth.uid()
  )
);

drop policy if exists "Users can delete their own tasks" on public.tasks;
create policy "Users can delete their own tasks"
on public.tasks
for delete
using (
  owner_id = auth.uid()
  and exists (
    select 1
    from public.projects
    where public.projects.id = public.tasks.project_id
      and public.projects.owner_id = auth.uid()
  )
);
