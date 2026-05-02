import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  const uid = request.nextUrl.searchParams.get('uid');
  if (!uid) return NextResponse.json({ message: 'Missing uid' }, { status: 400 });

  const [{ data: profile }, { count: activeChats }, { count: neighborsHelped }, { count: staleChats }, { data: deals }] = await Promise.all([
    supabase.from('profiles').select('id,username,mobile').eq('id', uid).single(),
    supabase.from('chat_participants').select('*', { count: 'exact', head: true }).eq('user_id', uid),
    supabase.from('deals').select('*', { count: 'exact', head: true }).eq('helper_user_id', uid).eq('status', 'closed'),
    supabase
      .from('chat_participants')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', uid)
      .lt('last_read_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()),
    supabase.from('deals').select('amount_saved').or(`helper_user_id.eq.${uid},requester_user_id.eq.${uid}`).eq('status', 'closed'),
  ]);

  const totalSaved = (deals || []).reduce((sum: number, d: any) => sum + Number(d.amount_saved || 0), 0);

  return NextResponse.json({
    profile,
    activeChats: activeChats || 0,
    neighborsHelped: neighborsHelped || 0,
    staleChats: staleChats || 0,
    totalSaved,
  });
}
