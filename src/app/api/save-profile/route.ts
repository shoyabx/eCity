import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, username, mobile, email } = body;

    // Validate inputs
    if (!userId || !username || !mobile) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields.' },
        { status: 400 }
      );
    }

    // Save/update profile in Supabase
    const { data, error } = await supabase
      .from('profiles')
      .upsert({
        id: userId,
        username: username,
        mobile: mobile,
        email: email,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'id' });

    if (error) {
      console.error('Profile save error:', error);
      return NextResponse.json(
        { success: false, message: 'Failed to save profile.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Profile saved successfully!'
    });

  } catch (error: any) {
    console.error('[Save Profile Error]:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to save profile. Please try again.' },
      { status: 500 }
    );
  }
}
