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
    <section ref={sectionRef} className="section-padding bg-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.03) 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />

      <div className="container-main relative z-10">
        <div className={`text-center mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="section-badge bg-emerald/10 text-emerald mb-4 mx-auto w-fit">
            <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
            Live Savings Examples
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4">
            Real Savings, <span className="gradient-text">Real Numbers</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            See how much Delhi NCR residents save every day through eCity connections.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {examples.map((item, i) => (
            <div
              key={item.category}
              className={`relative group bg-gradient-to-br ${item.color} border ${item.borderColor} rounded-2xl p-6 lg:p-8 card-hover transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
              style={{ transitionDelay: `${i * 150 + 200}ms` }}
            >
              {/* Icon */}
              <div className="text-4xl mb-4">{item.icon}</div>

              {/* Category */}
              <h3 className="text-lg font-bold text-slate-800 mb-5">{item.category}</h3>

              {/* Price comparison */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-500">{item.normalLabel}</span>
                  <span className="text-lg font-semibold text-slate-400 line-through">{item.normalPrice}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-slate-700">{item.eCityLabel}</span>
                  <span className={`text-2xl font-extrabold ${item.accentColor}`}>{item.eCityPrice}</span>
                </div>
              </div>

              {/* Savings badge */}
              <div className={`mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 ${item.accentColor} text-sm font-bold shadow-sm`}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                {item.savings}
              </div>

              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
                background: 'radial-gradient(circle at center, rgba(255,255,255,0.5) 0%, transparent 70%)'
              }} />
            </div>
          ))}
        </div>

        {/* Monthly savings callout */}
        <div className={`mt-12 text-center transition-all duration-700 delay-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-slate-900 to-slate-800 text-white px-8 py-4 rounded-2xl shadow-xl">
            <span className="text-2xl">💰</span>
            <span className="text-lg font-bold">Average savings: <span className="text-orange-bright">₹2,000+ monthly</span></span>
          </div>
        </div>
      </div>
    </section>
  );
}
