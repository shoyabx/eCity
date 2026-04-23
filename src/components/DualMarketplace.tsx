"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const saveFeatures = [
  { icon: "💰", text: "Better prices on everything" },
  { icon: "🤝", text: "Trusted referrals from locals" },
  { icon: "⏱️", text: "Save time, skip the search" },
  { icon: "✅", text: "Verified & rated connectors" },
];

const earnFeatures = [
  { icon: "🧠", text: "Use your city knowledge" },
  { icon: "📞", text: "Refer vendors you trust" },
  { icon: "📦", text: "Source products at wholesale" },
  { icon: "💸", text: "Earn commissions easily" },
];

export default function DualMarketplace() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-[#f5f5f7] border-t border-black/5 relative overflow-hidden">
      <div className="container-main relative z-10">
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="section-badge bg-[#ff3b30]/10 border border-[#ff3b30]/20 text-[#ff3b30] mb-4 mx-auto w-fit">
            <span className="w-2 h-2 rounded-full bg-[#ff3b30] animate-pulse" />
            Two-Sided Marketplace
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1d1d1f] mb-4 tracking-tight">
            Save Money <span className="text-[#1d1d1f]/30 mx-2">or</span> <span className="text-[#0066cc]">Earn Money</span>
          </h2>
          <p className="text-lg text-[#1d1d1f]/60" style={{ textAlign: 'center', margin: '0 auto', width: '100%', maxWidth: '36rem', marginBottom: '40px' }}>
            Whether you need help or can offer it — eCity works for you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8" style={{ margin: '0 auto', width: '100%', maxWidth: '1152px' }}>
          {/* Save Money Side */}
          <div
            className={`relative rounded-3xl overflow-hidden transition-all duration-700 apple-glass ${
              visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#0066cc]/5 to-transparent" />
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(0,0,0,0.02) 1px, transparent 0)',
              backgroundSize: '32px 32px'
            }} />
            <div className="relative" style={{ padding: '48px' }}>
              <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-black/5 rounded-full px-5 py-2 mb-8 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
                <span className="text-sm">💎</span>
                <span className="text-xs font-bold text-[#1d1d1f] uppercase tracking-wider">For Professionals</span>
              </div>

              <h3 className="text-3xl font-extrabold text-[#1d1d1f] mb-3">Save Money</h3>
              <p className="text-[#1d1d1f]/60 mb-8 leading-relaxed">
                Stop overpaying for daily needs. Connect with locals who know where the real prices are.
              </p>

              <div className="space-y-4">
                {saveFeatures.map((f) => (
                  <div key={f.text} className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-white border border-black/5 flex items-center justify-center text-lg group-hover:bg-white group-hover:scale-110 group-hover:shadow-md transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                      {f.icon}
                    </div>
                    <span className="text-[#1d1d1f]/80 font-medium group-hover:text-[#0066cc] transition-colors">{f.text}</span>
                  </div>
                ))}
              </div>

              <Link href="/explore" className="btn-primary mt-8">
                Start Saving →
              </Link>
            </div>
          </div>

          {/* Earn Money Side */}
          <div
            className={`relative rounded-3xl overflow-hidden transition-all duration-700 apple-glass ${
              visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
            style={{ transitionDelay: '500ms' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#34c759]/5 to-transparent" />
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(0,0,0,0.02) 1px, transparent 0)',
              backgroundSize: '32px 32px'
            }} />
            <div className="relative" style={{ padding: '48px' }}>
              <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-black/5 rounded-full px-5 py-2 mb-8 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
                <span className="text-sm">⚡</span>
                <span className="text-xs font-bold text-[#1d1d1f] uppercase tracking-wider">For Connectors</span>
              </div>

              <h3 className="text-3xl font-extrabold text-[#1d1d1f] mb-3">Earn Money</h3>
              <p className="text-[#1d1d1f]/60 mb-8 leading-relaxed">
                Turn your local knowledge into income. Help people find better deals and earn for every connection.
              </p>

              <div className="space-y-4">
                {earnFeatures.map((f) => (
                  <div key={f.text} className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-white border border-black/5 flex items-center justify-center text-lg group-hover:bg-white group-hover:scale-110 group-hover:shadow-md transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                      {f.icon}
                    </div>
                    <span className="text-[#1d1d1f]/80 font-medium group-hover:text-[#34c759] transition-colors">{f.text}</span>
                  </div>
                ))}
              </div>

              <Link href="/offer-help" className="btn-primary mt-8 bg-[#34c759] shadow-[0_10px_25px_rgba(52,199,89,0.3)]">
                Start Earning →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
