"use client";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faHandshake } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

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
    <section ref={sectionRef} className="py-24 relative overflow-hidden bg-[#fbfbfd] border-t border-black/5">
      <div className="container-main relative z-10">
        <div className={`relative rounded-[3rem] overflow-hidden transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'} apple-glass shadow-[0_20px_60px_rgba(0,102,204,0.08)]`}>
          {/* Deep Blue Background */}
          <div className="absolute inset-0 bg-white" />
          
          {/* Abstract geometric shapes */}
          <div className="absolute inset-0 opacity-40 pointer-events-none">
            <div className="absolute -top-[50%] -right-[10%] w-[80%] h-[150%] rounded-full bg-[#f2f2f7] blur-[120px] animate-pulse" style={{ animationDuration: '4s' }} />
            <div className="absolute -bottom-[50%] -left-[10%] w-[60%] h-[120%] rounded-full bg-[#e5e5ea] blur-[100px] animate-pulse" style={{ animationDuration: '6s' }} />
          </div>

          <div className="relative z-10 px-6 text-center max-w-4xl" style={{ margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: '64px', paddingBottom: '112px' }}>
            
            <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md border border-black/5 rounded-full px-5 py-2 mb-8 text-[#1d1d1f] shadow-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-[#34c759] animate-ping" />
              Join 100,000+ NCR Residents
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black text-[#1d1d1f] mb-8 leading-[1.1] tracking-tight w-full" style={{ textAlign: 'center' }}>
              Live Smart.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066cc] to-[#5ac8fa]">Spend Less.</span><br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#34c759] to-[#30d158]">Help More.</span>
            </h2>

            <p className="text-xl text-[#1d1d1f]/70 font-medium" style={{ textAlign: 'center', width: '100%', maxWidth: '42rem', margin: '0 auto', marginBottom: '48px' }}>
              Stop paying the convenience tax. Connect with trusted locals today and start saving—or earning—immediately.
            </p>

            <div className="w-full" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
              <Link href="/register" className="btn-primary text-lg shadow-[0_10px_30px_rgba(0,102,204,0.3)] group inline-flex items-center justify-center transition-all" style={{ padding: '20px 40px' }}>
                Join eCity Free
                <FontAwesomeIcon icon={faArrowRight} className="ml-3 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link href="/offer-help" className="btn-secondary text-lg group inline-flex items-center justify-center transition-all" style={{ padding: '20px 40px' }}>
                <FontAwesomeIcon icon={faHandshake} className="mr-3 group-hover:scale-110 transition-transform" />
                Become a Connector
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
