import { createClient } from '@supabase/supabase-js';

// Supabase configuration - keys stored in environment variables for security
// In production, use .env.local file with:
// NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
// NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth helper functions
export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const resetPassword = async (email: string) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
  return { data, error };
};

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
};

export const updateUserProfile = async (userId: string, updates: any) => {
  const { data, error } = await supabase
    .from('profiles')
    .upsert({
      id: userId,
      ...updates,
      updated_at: new Date().toISOString(),
    });
  return { data, error };
};

export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  return { data, error };
};

// New: Sign up with profile details (username, mobile)
export const signUpWithProfile = async (email: string, password: string, username: string, mobile: string) => {
  try {
    // Step 1: Create auth user
    const { data: authData, error: authError } = await signUp(email, password);
    
    if (authError) {
      return { data: null, error: authError };
    }

    if (!authData.user) {
      return { data: null, error: new Error('No user data returned from signup') };
    }

    // Step 2: Create profile
    const { data: profileData, error: profileError } = await updateUserProfile(authData.user.id, {
      username,
      mobile,
      email,
      created_at: new Date().toISOString(),
    });

    if (profileError) {
      console.error('Profile creation error:', profileError);
      // Note: We don't return error here - user is created, profile can be added later
    }

    return { 
      data: { 
        user: authData.user,
        profile: profileData 
      }, 
      error: null 
    };
  } catch (error: any) {
    return { data: null, error };
  }
};
