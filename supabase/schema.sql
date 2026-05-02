-- eCity schema + RLS

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  mobile text unique not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
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
  user_id uuid not null references auth.users(id) on delete cascade,
  last_read_at timestamp with time zone default now(),
  primary key (chat_id, user_id)
);

create table if not exists public.deals (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references public.posts(id) on delete set null,
  helper_user_id uuid not null references auth.users(id) on delete cascade,
  requester_user_id uuid not null references auth.users(id) on delete cascade,
  amount_saved numeric default 0,
  status text default 'open',
  closed_at timestamp with time zone,
  created_at timestamp with time zone default now()
);

alter table public.profiles enable row level security;
alter table public.posts enable row level security;
alter table public.chat_participants enable row level security;
alter table public.deals enable row level security;

-- profiles: user can only see/manage own profile
create policy if not exists "profiles_select_own" on public.profiles
for select using (auth.uid() = id);

create policy if not exists "profiles_insert_own" on public.profiles
for insert with check (auth.uid() = id);

create policy if not exists "profiles_update_own" on public.profiles
for update using (auth.uid() = id) with check (auth.uid() = id);

-- posts: user owns own posts; all authenticated can read open posts
create policy if not exists "posts_select_all_auth" on public.posts
for select using (auth.role() = 'authenticated');

create policy if not exists "posts_insert_own" on public.posts
for insert with check (auth.uid() = user_id);

create policy if not exists "posts_update_own" on public.posts
for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- chat participants & deals scoped to participant users
create policy if not exists "chat_participants_select_own" on public.chat_participants
for select using (auth.uid() = user_id);

create policy if not exists "deals_select_party" on public.deals
for select using (auth.uid() = helper_user_id or auth.uid() = requester_user_id);

create policy if not exists "deals_insert_party" on public.deals
for insert with check (auth.uid() = helper_user_id or auth.uid() = requester_user_id);
