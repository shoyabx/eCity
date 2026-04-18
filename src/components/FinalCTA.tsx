"use client";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faHandshake } from "@fortawesome/free-solid-svg-icons";

export default function FinalCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden bg-white">
      <div className="container-main relative z-10">
        <div className={`relative rounded-[2.5rem] overflow-hidden transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}`}>
          {/* Deep Blue Background */}
          <div className="absolute inset-0 bg-blue-deep" />
          
          {/* Abstract geometric shapes */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute -top-[50%] -right-[10%] w-[80%] h-[150%] rounded-full bg-emerald mix-blend-screen blur-[120px] animate-pulse" style={{ animationDuration: '4s' }} />
            <div className="absolute -bottom-[50%] -left-[10%] w-[60%] h-[120%] rounded-full bg-blue-primary mix-blend-screen blur-[100px] animate-pulse" style={{ animationDuration: '6s' }} />
          </div>

          <div className="relative z-10 px-6 py-20 lg:py-28 text-center max-w-4xl mx-auto flex flex-col items-center">
            
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 mb-8 text-white">
              <span className="w-2 h-2 rounded-full bg-emerald-light animate-ping" />
              Join 100,000+ NCR Residents
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white mb-8 leading-[1.1] tracking-tight">
              Live Smart.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-emerald-500">Spend Less.</span><br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-bright to-orange">Help More.</span>
            </h2>

            <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto font-light">
              Stop paying the convenience tax. Connect with trusted locals today and start saving—or earning—immediately.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto justify-center">
              <button className="btn-primary text-lg px-10 py-5 shadow-2xl shadow-orange/30 group">
                Join eCity Free
                <FontAwesomeIcon icon={faArrowRight} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="btn-secondary text-lg px-10 py-5 bg-white/10 border-white/20 text-white hover:bg-white/20 group">
                <FontAwesomeIcon icon={faHandshake} className="mr-2 group-hover:scale-110 transition-transform" />
                Become a Connector
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
