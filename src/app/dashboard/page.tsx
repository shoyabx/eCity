"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";
import { getFirebaseAuth } from "@/lib/firebase";

type Summary = {
  profile: { username: string; mobile: string } | null;
  activeChats: number;
  neighborsHelped: number;
  staleChats: number;
  totalSaved: number;
};

export default function DashboardPage() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [deals, setDeals] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const uid = getFirebaseAuth().currentUser?.uid;
      if (!uid) return;

      const res = await fetch(`/api/dashboard/summary?uid=${uid}`);
      if (res.ok) setSummary(await res.json());

      const [{ data: myPosts }, { data: myDeals }] = await Promise.all([
        supabase.from('posts').select('*').eq('user_id', uid).order('created_at', { ascending: false }).limit(10),
        supabase.from('deals').select('*').or(`helper_user_id.eq.${uid},requester_user_id.eq.${uid}`).order('closed_at', { ascending: false }).limit(10),
      ]);

      setPosts(myPosts || []);
      setDeals(myDeals || []);
    };
    load();
  }, []);

  return (
    <main className="min-h-screen bg-[#fbfbfd] flex flex-col">
      <Navbar />
      <div className="flex-1 container-main pt-28 pb-12">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        <section className="grid md:grid-cols-5 gap-4 mb-8">
          <Card title="Personal Info" value={summary?.profile ? `${summary.profile.username} • ${summary.profile.mobile}` : "-"} />
          <Card title="Active Chats" value={String(summary?.activeChats ?? 0)} />
          <Card title="Neighbors Helped" value={String(summary?.neighborsHelped ?? 0)} />
          <Card title="Stale Chats (>7 days)" value={String(summary?.staleChats ?? 0)} />
          <Card title="Total Money Saved" value={`₹${Number(summary?.totalSaved || 0).toLocaleString()}`} />
        </section>

        <section className="grid md:grid-cols-2 gap-6">
          <List title="My Posts" items={posts.map(p => `${p.type || 'post'}: ${p.title || p.details || p.id}`)} />
          <List title="My Deals" items={deals.map(d => `${d.status || 'open'} • ₹${d.amount_saved || 0}`)} />
        </section>
      </div>
      <Footer />
    </main>
  );
}

function Card({ title, value }: { title: string; value: string }) {
  return <div className="rounded-xl border border-black/10 p-4 bg-white"><p className="text-xs text-[#1d1d1f]/50">{title}</p><p className="font-semibold mt-1">{value}</p></div>;
}

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-xl border border-black/10 p-4 bg-white">
      <h2 className="font-semibold mb-3">{title}</h2>
      {items.length === 0 ? <p className="text-sm text-[#1d1d1f]/60">No data yet.</p> : (
        <ul className="space-y-2 text-sm">{items.map((x, i) => <li key={i} className="border-b border-black/5 pb-2">{x}</li>)}</ul>
      )}
    </div>
  );
}
