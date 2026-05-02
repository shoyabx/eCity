import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const normalizePhoneE164 = (input: string) => {
  const digits = input.replace(/\D/g, '');

  // India default; adjust as needed
  if (digits.length === 10) return `+91${digits}`;
  if (digits.length === 12 && digits.startsWith('91')) return `+${digits}`;
  if (input.trim().startsWith('+') && digits.length >= 10) return `+${digits}`;

  throw new Error('Enter a valid mobile number (e.g. +919876543210 or 9876543210).');
};

export const signUpWithPhone = async (phone: string, password: string, username: string) => {
  return supabase.auth.signUp({
    phone,
    password,
    options: {
      data: { username },
    },
  });
};

export const signInWithPhone = async (phone: string, password: string) => {
  return supabase.auth.signInWithPassword({ phone, password });
};

export const signOut = async () => {
  return supabase.auth.signOut();
};

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
};

export const upsertProfile = async (userId: string, username: string, mobile: string) => {
  return supabase
    .from('profiles')
    .upsert({ id: userId, username, mobile }, { onConflict: 'id' });
};

export const getUserProfile = async (userId: string) => {
  return supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
};
