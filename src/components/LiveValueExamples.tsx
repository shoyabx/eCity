"use client";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf, faCar, faSnowflake } from "@fortawesome/free-solid-svg-icons";

const examples = [
  {
    category: "Grocery Savings",
    icon: <FontAwesomeIcon icon={faLeaf} className="text-4xl mb-4" />,
    color: "from-emerald/10 to-emerald/5",
    borderColor: "border-emerald/20",
    accentColor: "text-emerald",
    normalLabel: "Society Store",
    normalPrice: "₹60/kg",
    eCityLabel: "Through eCity",
    eCityPrice: "₹45/kg",
    savings: "Save ₹15/kg",
  },
  {
    category: "Car Service",
    icon: <FontAwesomeIcon icon={faCar} className="text-4xl mb-4" />,
    color: "from-blue-primary/10 to-blue-primary/5",
    borderColor: "border-blue-primary/20",
    accentColor: "text-blue-primary",
    normalLabel: "Dealership",
    normalPrice: "₹8,000",
    eCityLabel: "Through eCity",
    eCityPrice: "₹5,500",
    savings: "Save ₹2,500",
  },
  {
    category: "AC Repair",
    icon: <FontAwesomeIcon icon={faSnowflake} className="text-4xl mb-4" />,
    color: "from-orange/10 to-orange/5",
    borderColor: "border-orange/20",
    accentColor: "text-orange",
    normalLabel: "App Quote",
    normalPrice: "₹2,500",
    eCityLabel: "Through eCity",
    eCityPrice: "₹1,400",
    savings: "Save ₹1,100",
  },
];

export default function LiveValueExamples() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-[#f5f5f7] relative overflow-hidden border-t border-black/5">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-40 mix-blend-multiply" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.05) 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />

      <div className="container-main relative z-10">
        <div className={`text-center mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="section-badge bg-[#34c759]/10 text-[#34c759] mb-4 mx-auto w-fit border border-[#34c759]/20">
            <span className="w-2 h-2 rounded-full bg-[#34c759] animate-pulse" />
            Live Savings Examples
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1d1d1f] tracking-tight text-center w-full">
            Real Savings, <span className="text-[#0066cc]">Real Numbers</span>
          </h2>
          <p className="text-lg md:text-xl text-[#1d1d1f]/70 leading-relaxed" style={{ textAlign: 'center', width: '100%', marginTop: '24px', marginBottom: '32px' }}>
            See how much Delhi NCR residents save every day through eCity connections.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto relative">
          {examples.map((item, i) => (
            <div
              key={item.category}
              className={`relative group border border-transparent rounded-2xl p-6 lg:p-10 card-hover transition-all duration-700 apple-glass ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
              style={{ transitionDelay: `${i * 150 + 200}ms` }}
            >
              {/* Icon */}
              <div className="text-4xl mb-6 opacity-80">{item.icon}</div>

              {/* Category */}
              <h3 className="text-xl font-bold text-[#1d1d1f] mb-6">{item.category}</h3>

              {/* Price comparison */}
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-black/5 p-3 rounded-lg">
                  <span className="text-sm text-[#1d1d1f]/60">{item.normalLabel}</span>
                  <span className="text-lg font-semibold text-[#1d1d1f]/40 line-through">{item.normalPrice}</span>
                </div>
                <div className="flex justify-between items-center bg-white p-3 rounded-lg border border-black/5 shadow-sm">
                  <span className="text-sm font-semibold text-[#1d1d1f]/80">{item.eCityLabel}</span>
                  <span className={`text-2xl font-extrabold ${item.accentColor}`}>{item.eCityPrice}</span>
                </div>
              </div>

              {/* Savings badge */}
              <div className={`mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-black/5 ${item.accentColor} text-sm font-bold shadow-[0_2px_10px_rgba(0,0,0,0.05)]`}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                {item.savings}
              </div>

              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
                background: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)'
              }} />
            </div>
          ))}
        </div>

        {/* Monthly savings callout */}
        <div 
          className={`flex justify-center w-full transition-all duration-700 delay-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ marginTop: '80px' }}
        >
          <div className="flex items-center gap-4 bg-white border border-black/5 text-[#1d1d1f] px-10 py-5 rounded-2xl shadow-lg apple-glass">
            <span className="text-3xl animate-bounce">💰</span>
            <span className="text-xl tracking-tight font-medium">Average active user saves <span className="text-[#34c759] font-bold">₹2,000+ monthly</span></span>
          </div>
        </div>
      </div>
    </section>
  );
}
