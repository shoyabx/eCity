"use client";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft, faStar } from "@fortawesome/free-solid-svg-icons";

const testimonials = [
  {
    name: "Rohan M.",
    role: "IT Professional, Gurugram",
    imageColor: "bg-blue-500",
    initials: "RM",
    quote: "Saved ₹3,000 on my car service. The mechanic I found through eCity was completely transparent and didn't try to upsell me like the showroom usually does.",
    rating: 5,
    tag: "Saved Money"
  },
  {
    name: "Priya S.",
    role: "Resident, Noida Ext.",
    imageColor: "bg-emerald-500",
    initials: "PS",
    quote: "Found weekly vegetables 30% cheaper than my society store. A local connected me directly with a mandi supplier who delivers fresh to our block.",
    rating: 5,
    tag: "Better Prices"
  },
  {
    name: "Amit K.",
    role: "Local Connector, Delhi",
    imageColor: "bg-orange-500",
    initials: "AK",
    quote: "Earned a steady side income helping my neighbors source appliances and furniture from Kirti Nagar. My local knowledge is finally paying off!",
    rating: 5,
    tag: "Earned Income"
  }
];

export default function Testimonials() {
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
    <section ref={sectionRef} className="section-padding bg-slate-50 relative overflow-hidden">
      <div className="container-main relative z-10">
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="section-badge bg-amber-100 text-amber-700 mb-4 mx-auto w-fit">
            <FontAwesomeIcon icon={faStar} className="mr-2 text-amber-500" />
            Real Stories
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4">
            Hear from our <span className="gradient-text">Community</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            Thousands in Delhi NCR are already using eCity to bypass the convenience tax and help each other.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 relative ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${i * 150 + 200}ms` }}
            >
              <FontAwesomeIcon 
                icon={faQuoteLeft} 
                className="absolute top-8 right-8 text-4xl text-slate-100"
              />
              
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 rounded-full ${t.imageColor} flex items-center justify-center text-white font-bold text-lg shadow-inner`}>
                  {t.initials}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{t.name}</h4>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
              
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <FontAwesomeIcon key={i} icon={faStar} className="text-amber-400 text-sm" />
                ))}
              </div>
              
              <p className="text-slate-600 leading-relaxed relative z-10 italic">
                "{t.quote}"
              </p>

              <div className="mt-6 pt-6 border-t border-slate-100">
                <span className="inline-block bg-slate-100 text-slate-600 text-xs font-semibold px-3 py-1 rounded-full">
                  {t.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
