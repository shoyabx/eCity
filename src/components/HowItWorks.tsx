"use client";
import { useEffect, useRef, useState } from "react";

const steps = [
  {
    step: "01",
    title: "Post What You Need",
    description: "Describe what you're looking for — cheaper vegetables, a reliable mechanic, a good carpenter. It takes 30 seconds.",
    examples: ["Need cheaper vegetables", "Need mechanic near Sector 49", "Need carpenter for wardrobe"],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    color: "from-[#0066cc] to-[#5ac8fa]",
    bgColor: "bg-[#0066cc]/5",
  },
  {
    step: "02",
    title: "Trusted Locals Respond",
    description: "Verified connectors who know your area will reach out with real options, fair prices, and reliable contacts.",
    examples: ["Verified profiles", "Ratings visible", "Response in minutes"],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    color: "from-[#34c759] to-[#30d158]",
    bgColor: "bg-[#34c759]/5",
  },
  {
    step: "03",
    title: "Chat, Finalize, Save or Earn",
    description: "Negotiate directly through in-app chat. Agree on terms. Save money or earn your commission. It's that simple.",
    examples: ["Secure in-app chat", "No middlemen", "Instant savings"],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: "from-[#ff3b30] to-[#ff69b4]",
    bgColor: "bg-[#ff3b30]/5",
  },
];

export default function HowItWorks() {
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
    <section id="how-it-works" ref={sectionRef} className="section-padding bg-[#fbfbfd] border-t border-black/5 relative overflow-hidden">
      <div className="container-main relative z-10">
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="section-badge bg-[#0066cc]/10 border border-[#0066cc]/20 text-[#0066cc] mb-4 mx-auto w-fit">
            <span className="w-2 h-2 rounded-full bg-[#0066cc] animate-pulse" />
            Simple Process
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1d1d1f] mb-4 tracking-tight text-center w-full">
            How <span className="text-[#0066cc]">eCity</span> Works
          </h2>
          <p className="text-lg text-[#1d1d1f]/60 leading-relaxed" style={{ textAlign: 'center', width: '100%', marginTop: '16px', marginBottom: '40px' }}>
            Three simple steps to smarter spending or extra income.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative" style={{ margin: '0 auto', maxWidth: '1024px', width: '100%' }}>
          {/* Connector lines */}
          <div className="hidden md:block absolute" style={{ top: '72px', left: '16.5%', width: '33.5%', height: '2px', zIndex: 0 }}>
            <div className={`h-full w-full bg-gradient-to-r from-[#0066cc]/50 to-[#34c759]/50 transition-all duration-1000 delay-500`} style={{ transformOrigin: 'left' }} />
            <svg className={`absolute -right-2 -top-2 w-5 h-5 text-[#34c759] transition-all duration-500 delay-[1500ms]`} fill="currentColor" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </div>
          <div className="hidden md:block absolute" style={{ top: '72px', left: '50%', width: '33.5%', height: '2px', zIndex: 0 }}>
            <div className={`h-full w-full bg-gradient-to-r from-[#34c759]/50 to-[#ff3b30]/50 transition-all duration-1000 delay-700`} style={{ transformOrigin: 'left' }} />
            <svg className={`absolute -right-2 -top-2 w-5 h-5 text-[#ff3b30] transition-all duration-500 delay-[1700ms]`} fill="currentColor" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </div>

          {steps.map((s, i) => (
            <div
              key={s.step}
              className={`relative bg-white/60 backdrop-blur-md rounded-2xl p-6 sm:p-8 hover:bg-white transition-all duration-700 flex flex-col items-center text-center hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:-translate-y-2 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${i * 200 + 300}ms`, zIndex: 10, border: '1px solid rgba(0,0,0,0.05)' }}
            >
              {/* Step number */}
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${s.color} text-white mb-6 shadow-lg`}>
                {s.icon}
              </div>

              {/* Step badge */}
              <div className={`text-xs font-bold tracking-widest uppercase bg-black/5 border border-black/5 ${i === 0 ? 'text-[#0056b3]' : i === 1 ? 'text-[#248a3d]' : 'text-[#d70015]'} px-4 py-1.5 rounded-full inline-block mb-4`}>
                Step {s.step}
              </div>

              <h3 className="text-xl font-bold text-[#1d1d1f] mb-3">{s.title}</h3>
              <p className="text-[#1d1d1f]/60 leading-relaxed mb-6">{s.description}</p>

              {/* Example tags */}
              <div className="flex flex-wrap justify-center mt-auto w-full" style={{ rowGap: '12px', columnGap: '8px' }}>
                {s.examples.map((ex) => (
                  <span key={ex} className="text-xs rounded-lg bg-white border border-black/5 text-[#1d1d1f]/80 font-medium shadow-sm transition-all text-center leading-tight whitespace-nowrap" style={{ padding: '6px 12px', display: 'inline-block' }}>
                    {ex}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
