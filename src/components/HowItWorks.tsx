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
    color: "from-blue-primary to-blue-light",
    bgColor: "bg-blue-primary/5",
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
    color: "from-emerald to-emerald-light",
    bgColor: "bg-emerald/5",
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
    color: "from-orange to-orange-bright",
    bgColor: "bg-orange/5",
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
    <section id="how-it-works" ref={sectionRef} className="section-padding bg-slate-50 relative overflow-hidden">
      <div className="container-main relative z-10">
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="section-badge bg-blue-primary/10 text-blue-primary mb-4 mx-auto w-fit">
            <span className="w-2 h-2 rounded-full bg-blue-primary animate-pulse" />
            Simple Process
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4">
            How <span className="gradient-text">eCity</span> Works
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            Three simple steps to smarter spending or extra income.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
          {/* Connector lines */}
          <div className="hidden md:block absolute top-24 left-[33%] w-[34%] h-px">
            <div className={`h-full bg-gradient-to-r from-blue-primary/30 to-emerald/30 transition-all duration-1000 delay-500 ${visible ? 'scale-x-100' : 'scale-x-0'}`} style={{ transformOrigin: 'left' }} />
            <svg className={`absolute -right-2 -top-1.5 w-4 h-4 text-emerald/50 transition-all duration-500 delay-[1500ms] ${visible ? 'opacity-100' : 'opacity-0'}`} fill="currentColor" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </div>
          <div className="hidden md:block absolute top-24 left-[66%] w-[34%] h-px">
            <div className={`h-full bg-gradient-to-r from-emerald/30 to-orange/30 transition-all duration-1000 delay-700 ${visible ? 'scale-x-100' : 'scale-x-0'}`} style={{ transformOrigin: 'left' }} />
            <svg className={`absolute -right-2 -top-1.5 w-4 h-4 text-orange/50 transition-all duration-500 delay-[1700ms] ${visible ? 'opacity-100' : 'opacity-0'}`} fill="currentColor" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </div>

          {steps.map((s, i) => (
            <div
              key={s.step}
              className={`relative bg-white rounded-2xl p-8 shadow-[0_4px_40px_rgba(0,0,0,0.04)] border border-slate-100 card-hover transition-all duration-700 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${i * 200 + 300}ms` }}
            >
              {/* Step number */}
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${s.color} text-white mb-6 shadow-lg`}>
                {s.icon}
              </div>

              {/* Step badge */}
              <div className={`text-xs font-bold tracking-widest uppercase ${s.bgColor} ${i === 0 ? 'text-blue-primary' : i === 1 ? 'text-emerald' : 'text-orange'} px-3 py-1 rounded-full inline-block mb-3`}>
                Step {s.step}
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3">{s.title}</h3>
              <p className="text-slate-500 leading-relaxed mb-5">{s.description}</p>

              {/* Example tags */}
              <div className="flex flex-wrap gap-2">
                {s.examples.map((ex) => (
                  <span key={ex} className="text-xs px-3 py-1.5 rounded-lg bg-slate-50 text-slate-500 border border-slate-100 font-medium">
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
