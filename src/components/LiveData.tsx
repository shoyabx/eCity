"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Item = {
  id: string;
  title: string;
  category: string;
  created_at: string;
};

export default function LiveData() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      const { data } = await supabase
        .from("posts")
        .select("id,title,category,created_at")
        .order("created_at", { ascending: false })
        .limit(6);
      setItems((data as Item[]) || []);
      setLoading(false);
    };
    run();
  }, []);

  return (
    <section className="section-padding bg-white border-t border-black/5">
      <div className="container-main">
        <h2 className="text-3xl font-bold text-[#1d1d1f] mb-3">Live Local Activity</h2>
        <p className="text-[#1d1d1f]/60 mb-8">Latest requests and offers from your city.</p>
        {loading ? (
          <p className="text-[#1d1d1f]/60">Loading...</p>
        ) : items.length === 0 ? (
          <p className="text-[#1d1d1f]/60">No live posts yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((it) => (
              <article key={it.id} className="rounded-2xl border border-black/10 p-4">
                <p className="text-xs text-[#0066cc] font-semibold uppercase">{it.category}</p>
                <h3 className="font-semibold text-[#1d1d1f] mt-1">{it.title}</h3>
                <p className="text-xs text-[#1d1d1f]/50 mt-2">{new Date(it.created_at).toLocaleString()}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
