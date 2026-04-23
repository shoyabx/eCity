"use client";
import { useEffect, useRef, useState } from "react";

const features = [
  {
    title: "Human Intelligence > Apps",
    description: "Algorithms can't know which mechanic is honest or which vendor gives real weight. People can. eCity connects you with real human intelligence.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    gradient: "from-orange to-orange-bright",
    bgGlow: "bg-orange/10",
  },
  {
    title: "Local Knowledge = Real Savings",
    description: "A Noida local knows Atta Market. A Gurugram resident knows Sadar Bazaar. This neighbourhood knowledge is your unfair advantage.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    gradient: "from-emerald to-emerald-light",
    bgGlow: "bg-emerald/10",
  },
  {
    title: "Trust + Ratings",
    description: "Every connector is OTP-verified and community-rated. Repeat deal badges build trust. No anonymous, faceless transactions.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    gradient: "from-blue-primary to-blue-light",
    bgGlow: "bg-blue-primary/10",
  },
  {
    title: "Side Income Engine",
    description: "Know a good plumber? A cheap grocery store? A reliable mover? Turn your contacts and knowledge into recurring side income.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    gradient: "from-violet-500 to-purple-400",
    bgGlow: "bg-violet-500/10",
  },
];

export default function WhyECity() {
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
          <div className="section-badge bg-violet-500/10 text-violet-600 mb-4 mx-auto w-fit">
            <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
            Our Edge
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4">
            Why <span className="gradient-text">eCity</span> Wins
          </h2>
          <p className="text-lg text-slate-500" style={{ textAlign: 'center', margin: '0 auto', width: '100%', maxWidth: '36rem', marginBottom: '40px' }}>
            Not another app. A people-powered savings network.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8" style={{ margin: '0 auto', width: '100%', maxWidth: '1024px' }}>
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`group relative bg-white rounded-2xl border border-slate-100 hover:border-slate-200 card-hover transition-all duration-700 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${i * 150 + 200}ms`, padding: '32px' }}
            >
              {/* Glow on hover */}
              <div className={`absolute -inset-px rounded-2xl ${f.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`} />

              <div className="relative z-10">
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${f.gradient} text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {f.icon}
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3">{f.title}</h3>
                <p className="text-slate-500 leading-relaxed">{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
