"use client";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldHalved, faStar, faAward, faCommentDots, faFlag, faUsers } from "@fortawesome/free-solid-svg-icons";

const trustFeatures = [
  {
    icon: <FontAwesomeIcon icon={faShieldHalved} className="text-3xl" />,
    title: "OTP Verified Users",
    description: "Every user is verified via mobile OTP ensuring real, accountable profiles.",
    color: "from-emerald-400 to-emerald-600",
    bgLight: "bg-emerald-50",
    textDark: "text-emerald-700"
  },
  {
    icon: <FontAwesomeIcon icon={faStar} className="text-3xl" />,
    title: "Ratings & Reviews",
    description: "Transparent feedback system helps you choose the most reliable local helpers.",
    color: "from-amber-400 to-amber-600",
    bgLight: "bg-amber-50",
    textDark: "text-amber-700"
  },
  {
    icon: <FontAwesomeIcon icon={faCommentDots} className="text-3xl" />,
    title: "Secure In-App Chat",
    description: "Communicate directly without sharing your personal phone number.",
    color: "from-blue-400 to-blue-600",
    bgLight: "bg-blue-50",
    textDark: "text-blue-700"
  },
  {
    icon: <FontAwesomeIcon icon={faAward} className="text-3xl" />,
    title: "Repeat User Badges",
    description: "Easily identify trusted locals who consistently deliver great value.",
    color: "from-purple-400 to-purple-600",
    bgLight: "bg-purple-50",
    textDark: "text-purple-700"
  },
  {
    icon: <FontAwesomeIcon icon={faFlag} className="text-3xl" />,
    title: "Abuse Reporting",
    description: "Strict community guidelines with immediate action on reported misconduct.",
    color: "from-rose-400 to-rose-600",
    bgLight: "bg-rose-50",
    textDark: "text-rose-700"
  },
  {
    icon: <FontAwesomeIcon icon={faUsers} className="text-3xl" />,
    title: "Community Trust Model",
    description: "Built on mutual respect, helping each other save money and live smarter.",
    color: "from-sky-400 to-sky-600",
    bgLight: "bg-sky-50",
    textDark: "text-sky-700"
  }
];

export default function TrustSafety() {
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
    <section ref={sectionRef} className="section-padding bg-slate-900 relative overflow-hidden text-white">
      {/* Background styling */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-primary/10 to-transparent blur-3xl pointer-events-none" />

      <div className="container-main relative z-10">
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="section-badge bg-white/10 text-emerald-300 border border-white/10 mb-4 mx-auto w-fit backdrop-blur-sm">
            <FontAwesomeIcon icon={faShieldHalved} className="mr-2" />
            Trust & Safety First
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
            A Secure Network of <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">Trusted Locals</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            We've built eCity with safety at its core, so you can focus on finding the best deals and making great connections.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {trustFeatures.map((feature, i) => (
            <div
              key={feature.title}
              className={`group bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-2xl p-6 lg:p-8 hover:bg-slate-800 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-${feature.color.split('-')[1]}/10 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${i * 100 + 200}ms` }}
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-gradient-to-br ${feature.color} text-white shadow-lg`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-100 group-hover:text-white transition-colors">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
