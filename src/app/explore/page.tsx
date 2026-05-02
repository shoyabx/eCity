"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

type Deal = { id: string; title: string; category: string; details: string; created_at: string };

export default function Explore() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      const { data } = await supabase
        .from('posts')
        .select('id,title,category,details,created_at')
        .eq('type', 'offer')
        .order('created_at', { ascending: false })
        .limit(20);
      setDeals((data as Deal[]) || []);
      setLoading(false);
    };
    run();
  }, []);

  return (
    <main className="min-h-screen bg-[#fbfbfd] flex flex-col">
      <Navbar />
      <div className="flex-1 pb-20" style={{ paddingTop: '160px' }}>
        <div className="container-main">
          <div className="mb-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between" style={{ gap: '24px' }}>
            <div>
              <h1 className="text-4xl sm:text-5xl font-black text-[#1d1d1f] mb-4 tracking-tight">Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066cc] to-[#5ac8fa]">Local Deals</span></h1>
              <p className="text-[#1d1d1f]/70 text-lg font-medium max-w-xl">Live offers from verified local users.</p>
            </div>
            <Link href="/post-need" className="btn-primary">Can't find it? Post a Need</Link>
          </div>

          {loading ? <p>Loading...</p> : deals.length === 0 ? <p>No offers yet.</p> : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {deals.map((deal) => (
                <div key={deal.id} className="group apple-glass border border-black/5 rounded-[1.5rem] p-6">
                  <div className="bg-[#0066cc]/10 text-[#0066cc] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-3">{deal.category || 'offer'}</div>
                  <h3 className="text-xl font-bold text-[#1d1d1f] mb-2 leading-tight">{deal.title || 'Untitled offer'}</h3>
                  <p className="text-[#1d1d1f]/60 text-sm mb-4 line-clamp-3">{deal.details || 'No details'}</p>
                  <p className="text-xs text-[#1d1d1f]/50">{new Date(deal.created_at).toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
