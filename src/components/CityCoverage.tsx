"use client";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapLocationDot } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const cities = [
  { name: "Delhi", x: "50%", y: "45%", users: "45k+", color: "bg-[#0066cc]" },
  { name: "Gurugram", x: "25%", y: "70%", users: "32k+", color: "bg-[#34c759]" },
  { name: "Noida", x: "75%", y: "60%", users: "28k+", color: "bg-[#ff9500]" },
  { name: "Ghaziabad", x: "85%", y: "35%", users: "15k+", color: "bg-purple-500" },
  { name: "Faridabad", x: "45%", y: "85%", users: "12k+", color: "bg-[#ff3b30]" },
];

export default function CityCoverage() {
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
    <section ref={sectionRef} className="section-padding bg-[#fbfbfd] relative overflow-hidden">
      <div className="container-main relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          
          {/* Content Side */}
          <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="section-badge bg-[#0066cc]/10 text-[#0066cc] border border-[#0066cc]/20 mb-4 w-fit">
              <FontAwesomeIcon icon={faMapLocationDot} className="mr-2" />
              Currently Active In
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1d1d1f] mb-6 tracking-tight">
              Connecting <span className="text-[#0066cc]">Delhi NCR</span>
            </h2>
            <p className="text-lg text-[#1d1d1f]/60 mb-8 leading-relaxed font-medium">
              We're rapidly expanding our network of trusted locals across the National Capital Region. Join thousands of users who are already saving money and earning income in your city.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {cities.map((city, i) => (
                <div key={city.name} className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${city.color} animate-pulse shadow-[0_0_10px_currentColor]`} />
                  <div>
                    <h4 className="font-bold text-[#1d1d1f]/90">{city.name}</h4>
                    <span className="text-sm text-[#1d1d1f]/50 font-medium">{city.users} Users</span>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/explore" className="btn-secondary mt-10 inline-block">
              Check Your Area
            </Link>
          </div>

          {/* Map Side */}
          <div className={`relative h-[400px] lg:h-[500px] w-full rounded-3xl apple-glass shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-black/5 overflow-hidden transition-all duration-1000 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            {/* Abstract Map Background */}
            <div className="absolute inset-0 opacity-10 text-black">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                {/* Abstract NCR shape lines */}
                <path d="M 100 100 Q 200 50 400 150 T 600 300 Q 500 400 300 350 T 100 100" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="10 10" />
              </svg>
            </div>

            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
              {cities.map((city, i) => {
                if (i === 0) return null; // Connect everything to Delhi
                return (
                  <line 
                    key={`line-${city.name}`}
                    x1={cities[0].x} y1={cities[0].y}
                    x2={city.x} y2={city.y}
                    stroke="rgba(0,0,0,0.15)"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    className="opacity-50"
                  />
                );
              })}
            </svg>

            {/* City Nodes */}
            {cities.map((city, i) => (
              <div
                key={city.name}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center group cursor-pointer"
                style={{ left: city.x, top: city.y }}
              >
                {/* Ripple effect */}
                <div className={`absolute w-12 h-12 rounded-full ${city.color} opacity-30 animate-ping`} />
                
                {/* Node */}
                <div className={`relative w-6 h-6 rounded-full ${city.color} border-2 border-white shadow-lg group-hover:scale-125 transition-transform duration-300 shadow-[0_0_15px_currentColor]`} />
                
                {/* Label */}
                <div className="mt-2 bg-white px-3 py-1.5 rounded-lg shadow-xl border border-black/5 text-sm font-bold text-[#1d1d1f] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute top-full">
                  {city.name}
                  <div className="text-xs font-medium text-[#1d1d1f]/50 mt-0.5">{city.users} Active</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
