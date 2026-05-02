-- eCity schema + RLS (Firebase UID based)

create table if not exists public.profiles (
  id text primary key,
  username text unique not null,
  mobile text unique not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  type text not null check (type in ('need','offer')),
  category text,
  title text,
  details text,
  status text default 'open',
  created_at timestamp with time zone default now()
);

create table if not exists public.chats (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create table if not exists public.chat_participants (
  chat_id uuid not null references public.chats(id) on delete cascade,
  user_id text not null,
  last_read_at timestamp with time zone default now(),
  primary key (chat_id, user_id)
);

create table if not exists public.deals (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references public.posts(id) on delete set null,
  helper_user_id text not null,
  requester_user_id text not null,
  amount_saved numeric default 0,
  status text default 'open',
  closed_at timestamp with time zone,
  created_at timestamp with time zone default now()
);

alter table public.profiles enable row level security;
alter table public.posts enable row level security;
alter table public.chat_participants enable row level security;
alter table public.deals enable row level security;

-- NOTE: With Firebase auth, Supabase auth.uid() is unavailable unless JWT integration is configured.
-- Temporary open-authenticated policies; tighten after Firebase JWT verification is wired in Supabase.

create policy if not exists "profiles_select_all" on public.profiles
for select using (true);

create policy if not exists "profiles_upsert_all" on public.profiles
for insert with check (true);

create policy if not exists "profiles_update_all" on public.profiles
for update using (true) with check (true);

create policy if not exists "posts_select_all" on public.posts
for select using (true);

create policy if not exists "posts_insert_all" on public.posts
for insert with check (true);

create policy if not exists "posts_update_all" on public.posts
for update using (true) with check (true);

create policy if not exists "chat_participants_select_all" on public.chat_participants
for select using (true);

create policy if not exists "deals_select_all" on public.deals
for select using (true);

create policy if not exists "deals_insert_all" on public.deals
for insert with check (true);
