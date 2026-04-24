-- Run this in Supabase SQL Editor to create the adil user for testing
-- Navigate to: https://supabase.com/dashboard/project/lcytcvfpzdhqnqkoajzy/sql

-- Step 1: Create the profiles table
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  mobile text not null,
  email text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  last_login timestamp with time zone,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

alter table profiles enable row level security;

create policy "Users can view their own profile" 
  on profiles for select using (auth.uid() = id);

create policy "Users can update their own profile" 
  on profiles for update using (auth.uid() = id);

create index if not exists idx_profiles_email on profiles(email);
create index if not exists idx_profiles_username on profiles(username);

-- Step 2: Create the adil user
insert into auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta,
  raw_user_meta_data,
  aud,
  role
) values (
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000000',
  'adil@ecity.local',
  crypt('Shoyab@8010', gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  'authenticated',
  'authenticated'
);

-- Step 3: Create the profile record
with new_user as (
  select id from auth.users where email = 'adil@ecity.local'
)
insert into profiles (id, username, mobile, email, created_at)
select id, 'adil', '8010876742', 'adil@ecity.local', now()
from new_user;

-- Step 4: Verify
select * from profiles where username = 'adil';
select email from auth.users where email = 'adil@ecity.local';

-- Cleanup if needed:
-- delete from profiles where username = 'adil';
-- delete from auth.users where email = 'adil@ecity.local';
