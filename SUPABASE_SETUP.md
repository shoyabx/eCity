# Supabase Setup for eCity Signup Flow

## Current Status
The signup flow has been successfully implemented with the following credentials:
- **Project URL**: https://lcytcvfpzdhqnqkoajzy.supabase.co
- **Anon Key**: eyJhbGci...

## Required Supabase Setup

### 1. Create Profiles Table

The signup flow requires a `profiles` table to store username and mobile data. 
Run this SQL in the Supabase SQL Editor:

```sql
-- Create the profiles table
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  mobile text not null,
  email text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  last_login timestamp with time zone,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable RLS (Row Level Security)
alter table profiles enable row level security;

-- Create policies for authenticated users
create policy "Users can view their own profile" 
  on profiles for select using (auth.uid() = id);

create policy "Users can update their own profile" 
  on profiles for update using (auth.uid() = id);

-- Create index for email lookups
create index idx_profiles_email on profiles(email);

-- Create index for username lookups  
create index idx_profiles_username on profiles(username);
```

### 2. Verify Auth Configuration

In Supabase Dashboard:
- Go to: Authentication → Settings
- Verify Email settings are configured
- Check Rate Limits (free tier: 50 signups/day)

## Test Credentials

- Username: `adil`
- Mobile: `8010876742`
- Email: auto-generated as `adil@ecity.in` (if not provided)
- Password: `Shoyab@8010`

## Implementation Details

The signup flow uses:
1. **Supabase Auth** - Creates authenticated user account
2. **Profiles Table** - Stores username, mobile, email
3. **LocalStorage** - Maintains user session for immediate UI access
4. **Auto-login** - No manual verification required

## Troubleshooting

### Email Rate Limit
If you see "email rate limit exceeded":
- Free tier limits: 50 emails/day
- Wait 24 hours or upgrade Supabase plan
- Test with existing users via login flow

### Profiles Table Missing
If signup fails with profile errors:
- Run the SQL above to create the table
- Ensure RLS policies are enabled

### Testing Without Email
To test signup without hitting rate limits:
1. Use the login flow with existing users
2. Create users via Supabase dashboard SQL
3. Upgrade to higher Supabase tier

