"use client";
import { useEffect, useRef, useState } from "react";

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
    <section ref={sectionRef} className="section-padding bg-white relative overflow-hidden">
      <div className="container-main relative z-10">
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="section-badge bg-orange/10 text-orange mb-4 mx-auto w-fit">
            <span className="w-2 h-2 rounded-full bg-orange animate-pulse" />
            Two-Sided Marketplace
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4">
            Save Money <span className="text-slate-300 mx-2">or</span> <span className="gradient-text">Earn Money</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            Whether you need help or can offer it — eCity works for you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Save Money Side */}
          <div
            className={`relative rounded-3xl overflow-hidden transition-all duration-700 ${
              visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-deep to-[#1a365d]" />
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.03) 1px, transparent 0)',
              backgroundSize: '32px 32px'
            }} />
            <div className="relative p-8 lg:p-10">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 mb-6">
                <span className="text-sm">💎</span>
                <span className="text-xs font-semibold text-white/80 uppercase tracking-wider">For Professionals</span>
              </div>

              <h3 className="text-3xl font-extrabold text-white mb-3">Save Money</h3>
              <p className="text-white/60 mb-8 leading-relaxed">
                Stop overpaying for daily needs. Connect with locals who know where the real prices are.
              </p>

              <div className="space-y-4">
                {saveFeatures.map((f) => (
                  <div key={f.text} className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-lg group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
                      {f.icon}
                    </div>
                    <span className="text-white/80 font-medium group-hover:text-white transition-colors">{f.text}</span>
                  </div>
                ))}
              </div>

              <button className="btn-primary mt-8">
                Start Saving →
              </button>
            </div>
          </div>

          {/* Earn Money Side */}
          <div
            className={`relative rounded-3xl overflow-hidden transition-all duration-700 ${
              visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
            style={{ transitionDelay: '500ms' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#064e3b] to-[#065f46]" />
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.03) 1px, transparent 0)',
              backgroundSize: '32px 32px'
            }} />
            <div className="relative p-8 lg:p-10">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 mb-6">
                <span className="text-sm">⚡</span>
                <span className="text-xs font-semibold text-white/80 uppercase tracking-wider">For Connectors</span>
              </div>

              <h3 className="text-3xl font-extrabold text-white mb-3">Earn Money</h3>
              <p className="text-white/60 mb-8 leading-relaxed">
                Turn your local knowledge into income. Help people find better deals and earn for every connection.
              </p>

              <div className="space-y-4">
                {earnFeatures.map((f) => (
                  <div key={f.text} className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-lg group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
                      {f.icon}
                    </div>
                    <span className="text-white/80 font-medium group-hover:text-white transition-colors">{f.text}</span>
                  </div>
                ))}
              </div>

              <button className="btn-primary mt-8 bg-gradient-to-r from-emerald to-[#047857]">
                Start Earning →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
