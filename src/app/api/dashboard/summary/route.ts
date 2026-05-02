import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const userId = userData.user.id;

  const [{ data: profile }, { count: activeChats }, { count: neighborsHelped }, { count: staleChats }, { data: deals }] = await Promise.all([
    supabase.from('profiles').select('id,username,mobile').eq('id', userId).single(),
    supabase.from('chat_participants').select('*', { count: 'exact', head: true }).eq('user_id', userId),
    supabase.from('deals').select('*', { count: 'exact', head: true }).eq('helper_user_id', userId).eq('status', 'closed'),
    supabase
      .from('chat_participants')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .lt('last_read_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()),
    supabase.from('deals').select('amount_saved').or(`helper_user_id.eq.${userId},requester_user_id.eq.${userId}`).eq('status', 'closed'),
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
