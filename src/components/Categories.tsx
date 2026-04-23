"use client";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf, faCartShopping, faCar, faMotorcycle, faBolt, faWrench, faHammer, faBox, faStore, faPlug, faChair, faTag } from "@fortawesome/free-solid-svg-icons";

const categories = [
  { name: "Vegetables & Fruits", icon: <FontAwesomeIcon icon={faLeaf} className="text-4xl mb-4" />, color: "from-green-400/10 to-green-500/5", hoverBorder: "hover:border-green-400/40" },
  { name: "Grocery", icon: <FontAwesomeIcon icon={faCartShopping} className="text-4xl mb-4" />, color: "from-amber-400/10 to-amber-500/5", hoverBorder: "hover:border-amber-400/40" },
  { name: "Car Repair", icon: <FontAwesomeIcon icon={faCar} className="text-4xl mb-4" />, color: "from-blue-400/10 to-blue-500/5", hoverBorder: "hover:border-blue-400/40" },
  { name: "Bike Repair", icon: <FontAwesomeIcon icon={faMotorcycle} className="text-4xl mb-4" />, color: "from-red-400/10 to-red-500/5", hoverBorder: "hover:border-red-400/40" },
  { name: "Electrician", icon: <FontAwesomeIcon icon={faBolt} className="text-4xl mb-4" />, color: "from-yellow-400/10 to-yellow-500/5", hoverBorder: "hover:border-yellow-400/40" },
  { name: "Plumber", icon: <FontAwesomeIcon icon={faWrench} className="text-4xl mb-4" />, color: "from-cyan-400/10 to-cyan-500/5", hoverBorder: "hover:border-cyan-400/40" },
  { name: "Carpenter", icon: <FontAwesomeIcon icon={faHammer} className="text-4xl mb-4" />, color: "from-orange-400/10 to-orange-500/5", hoverBorder: "hover:border-orange-400/40" },
  { name: "Movers & Packers", icon: <FontAwesomeIcon icon={faBox} className="text-4xl mb-4" />, color: "from-violet-400/10 to-violet-500/5", hoverBorder: "hover:border-violet-400/40" },
  { name: "Wholesale Market", icon: <FontAwesomeIcon icon={faStore} className="text-4xl mb-4" />, color: "from-emerald-400/10 to-emerald-500/5", hoverBorder: "hover:border-emerald-400/40" },
  { name: "Appliance Repair", icon: <FontAwesomeIcon icon={faPlug} className="text-4xl mb-4" />, color: "from-sky-400/10 to-sky-500/5", hoverBorder: "hover:border-sky-400/40" },
  { name: "Furniture", icon: <FontAwesomeIcon icon={faChair} className="text-4xl mb-4" />, color: "from-amber-600/10 to-amber-700/5", hoverBorder: "hover:border-amber-600/40" },
  { name: "Local Deals", icon: <FontAwesomeIcon icon={faTag} className="text-4xl mb-4" />, color: "from-pink-400/10 to-pink-500/5", hoverBorder: "hover:border-pink-400/40" },
];

export default function Categories() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="categories" ref={sectionRef} className="section-padding bg-[#fbfbfd] relative overflow-hidden">
      <div className="container-main relative z-10">
        <div className={`text-center mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="section-badge bg-[#0066cc]/10 text-[#0066cc] border border-[#0066cc]/20 mb-4 mx-auto w-fit">
            <span className="w-2 h-2 rounded-full bg-[#0066cc] animate-pulse" />
            Browse Categories
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1d1d1f] mb-4 tracking-tight">
            Popular <span className="text-[#0066cc]">Categories</span>
          </h2>
          <p className="text-lg text-[#1d1d1f]/60" style={{ textAlign: 'center', margin: '0 auto', width: '100%', maxWidth: '36rem', marginBottom: '40px' }}>
            Find help across every daily need — from groceries to home repairs.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6" style={{ margin: '0 auto', width: '100%', maxWidth: '1152px' }}>
          {categories.map((cat, i) => (
            <div
              key={cat.name}
              className={`group relative apple-glass rounded-2xl cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,102,204,0.1)] hover:border-black/10 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 60 + 200}ms`, padding: '24px' }}
            >
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10 text-center">
                <div className="text-4xl mb-4 group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-300 drop-shadow-sm text-[#1d1d1f]/80">
                  {cat.icon}
                </div>
                <span className="text-sm font-semibold text-[#1d1d1f]/60 group-hover:text-[#1d1d1f] transition-colors">
                  {cat.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
