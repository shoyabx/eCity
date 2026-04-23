"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    const particles: Array<{
      x: number; y: number; vx: number; vy: number; size: number; opacity: number;
    }> = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.offsetWidth) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.offsetHeight) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(96, 165, 250, ${p.opacity})`;
        ctx.fill();

        particles.slice(i + 1).forEach((p2) => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 102, 204, ${0.08 * (1 - dist / 120)})`;
            ctx.stroke();
          }
        });
      });
      animFrame = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-[#fbfbfd] to-[#f5f5f7]">
      {/* Animated background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.6 }}
      />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-blue-primary/10 blur-[100px] floating" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-emerald/10 blur-[100px] floating" style={{ animationDelay: "3s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-orange/5 blur-[120px]" />

      {/* Grid overlay */}
      <div className="absolute inset-0" style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      <div className="container-main relative z-10 pt-24 pb-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-3 apple-glass border border-black/5 rounded-full px-6 py-3 mb-10 shadow-sm">
            <span className="block w-2.5 h-2.5 rounded-full bg-[#34c759] animate-pulse" />
            <span className="text-sm md:text-base text-[#1d1d1f]/80 font-bold tracking-wide">Now launching in Delhi NCR</span>
          </div>

          {/* Headline */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight text-[#1d1d1f] mb-6"
            style={{ animation: "fadeInUp 0.8s ease-out 0.2s both" }}
          >
            Stop Paying{" "}
            <span className="relative inline-block whitespace-nowrap">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#0066cc] to-[#5ac8fa]">
                Convenience&nbsp;Tax.
              </span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                <path d="M2 8C50 2 100 2 150 6C200 10 250 4 298 8" stroke="#0066cc" strokeWidth="4" strokeLinecap="round" strokeDasharray="300" strokeDashoffset="300" style={{ animation: "draw-line 1.5s ease-out 1s forwards" }} />
              </svg>
            </span>
          </h1>

          {/* Subheadline */}
          <p
            className="text-lg sm:text-xl text-[#1d1d1f]/70 max-w-2xl mx-auto mb-10 leading-relaxed font-light"
            style={{ animation: "fadeInUp 0.8s ease-out 0.4s both" }}
          >
            Find trusted locals who know smarter prices for groceries, repairs, mechanics,
            home services, and daily city needs.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-6"
            style={{ animation: "fadeInUp 0.8s ease-out 0.6s both" }}
          >
            <Link href="/post-need" className="btn-primary text-lg px-8 py-4 shadow-lg w-full sm:w-auto text-center justify-center">
              <svg className="w-5 h-5 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              Post a Need
            </Link>
            <Link href="/offer-help" className="btn-secondary text-lg px-8 py-4 w-full sm:w-auto text-center justify-center">
              <svg className="w-5 h-5 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21H8.5a2 2 0 01-2-2v-7a2 2 0 01.586-1.414l4.828-4.828A2 2 0 0113.5 5.5V3" /></svg>
              Offer Help
            </Link>
            <Link href="/explore" className="btn-secondary text-lg px-8 py-4 w-full sm:w-auto text-center justify-center">
              <svg className="w-5 h-5 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              Explore Deals
            </Link>
          </div>

          {/* Trust indicators */}
          <div
            className="flex flex-row flex-wrap justify-center items-center gap-6 lg:gap-10 mt-20 px-4"
            style={{ animation: "fadeInUp 0.8s ease-out 0.8s both" }}
          >
            {[
              { icon: "🛡️", text: "OTP Verified Users" },
              { icon: "⭐", text: "Rated & Trusted" },
              { icon: "💬", text: "In-App Chat" },
            ].map((item) => (
              <div key={item.text} className="flex items-center space-x-2.5 whitespace-nowrap">
                <span className="text-xl block">{item.icon}</span>
                <span className="text-[#1d1d1f]/70 font-semibold text-sm tracking-wide block">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* City Skyline Illustration */}
        <div className="mt-16 max-w-5xl mx-auto relative opacity-40 mix-blend-multiply" style={{ animation: "fadeInUp 1s ease-out 1s both" }}>
          <div className="relative">
            {/* Same SVG structure, replacing whites/brights with darker shades and blues for light theme */}
            <svg viewBox="0 0 1200 250" className="w-full" fill="none">
              {/* Buildings - Left cluster */}
              <rect x="50" y="80" width="60" height="170" rx="4" fill="rgba(0,102,204,0.06)" stroke="rgba(0,102,204,0.1)" strokeWidth="1" />
              <rect x="55" y="90" width="12" height="16" rx="2" fill="rgba(0,102,204,0.3)" />
              <rect x="75" y="90" width="12" height="16" rx="2" fill="rgba(0,102,204,0.2)" />
              <rect x="55" y="115" width="12" height="16" rx="2" fill="rgba(0,102,204,0.4)" />
              <rect x="75" y="115" width="12" height="16" rx="2" fill="rgba(0,102,204,0.15)" />
              <rect x="55" y="140" width="12" height="16" rx="2" fill="rgba(0,102,204,0.25)" />
              <rect x="75" y="140" width="12" height="16" rx="2" fill="rgba(0,102,204,0.35)" />

              <rect x="125" y="50" width="70" height="200" rx="4" fill="rgba(0,102,204,0.05)" stroke="rgba(0,102,204,0.08)" strokeWidth="1" />
              <rect x="132" y="60" width="14" height="18" rx="2" fill="rgba(0,102,204,0.25)" />
              <rect x="155" y="60" width="14" height="18" rx="2" fill="rgba(0,102,204,0.35)" />
              <rect x="132" y="88" width="14" height="18" rx="2" fill="rgba(0,102,204,0.15)" />
              <rect x="155" y="88" width="14" height="18" rx="2" fill="rgba(0,102,204,0.4)" />
              <rect x="132" y="116" width="14" height="18" rx="2" fill="rgba(0,102,204,0.3)" />
              <rect x="155" y="116" width="14" height="18" rx="2" fill="rgba(0,102,204,0.2)" />

              {/* Center tower */}
              <rect x="530" y="20" width="80" height="230" rx="6" fill="rgba(0,102,204,0.07)" stroke="rgba(0,102,204,0.12)" strokeWidth="1" />
              <rect x="540" y="35" width="15" height="20" rx="2" fill="rgba(255,59,48,0.3)" />
              <rect x="565" y="35" width="15" height="20" rx="2" fill="rgba(255,59,48,0.4)" />
              <rect x="540" y="65" width="15" height="20" rx="2" fill="rgba(0,102,204,0.35)" />
              <rect x="565" y="65" width="15" height="20" rx="2" fill="rgba(0,102,204,0.25)" />
              <rect x="540" y="95" width="15" height="20" rx="2" fill="rgba(255,59,48,0.25)" />
              <rect x="565" y="95" width="15" height="20" rx="2" fill="rgba(0,102,204,0.4)" />
              <rect x="540" y="125" width="15" height="20" rx="2" fill="rgba(0,102,204,0.3)" />
              <rect x="565" y="125" width="15" height="20" rx="2" fill="rgba(255,59,48,0.35)" />

              {/* Right cluster */}
              <rect x="950" y="70" width="65" height="180" rx="4" fill="rgba(0,102,204,0.06)" stroke="rgba(0,102,204,0.1)" strokeWidth="1" />
              <rect x="957" y="80" width="12" height="16" rx="2" fill="rgba(52,199,89,0.3)" />
              <rect x="978" y="80" width="12" height="16" rx="2" fill="rgba(52,199,89,0.2)" />
              <rect x="957" y="106" width="12" height="16" rx="2" fill="rgba(52,199,89,0.4)" />
              <rect x="978" y="106" width="12" height="16" rx="2" fill="rgba(52,199,89,0.15)" />

              <rect x="1030" y="90" width="55" height="160" rx="4" fill="rgba(0,102,204,0.05)" stroke="rgba(0,102,204,0.08)" strokeWidth="1" />
              <rect x="1037" y="100" width="11" height="14" rx="2" fill="rgba(52,199,89,0.25)" />
              <rect x="1055" y="100" width="11" height="14" rx="2" fill="rgba(52,199,89,0.35)" />

              {/* Market buildings */}
              <rect x="350" y="160" width="50" height="90" rx="3" fill="rgba(52,199,89,0.08)" stroke="rgba(52,199,89,0.15)" strokeWidth="1" />
              <rect x="356" y="170" width="38" height="14" rx="2" fill="rgba(52,199,89,0.2)" />
              <rect x="780" y="140" width="55" height="110" rx="3" fill="rgba(52,199,89,0.08)" stroke="rgba(52,199,89,0.15)" strokeWidth="1" />
              <rect x="787" y="150" width="40" height="14" rx="2" fill="rgba(52,199,89,0.2)" />

              {/* Connection lines */}
              <path d="M195 120 Q370 60 530 100" stroke="rgba(255,59,48,0.3)" strokeWidth="2" strokeDasharray="8 4" className="floating" style={{ animationDuration: '4s' }} />
              <path d="M610 100 Q780 60 950 110" stroke="rgba(52,199,89,0.3)" strokeWidth="2" strokeDasharray="8 4" className="floating" style={{ animationDuration: '5s', animationDelay: '1s' }} />
              <path d="M400 180 Q470 140 530 160" stroke="rgba(0,102,204,0.3)" strokeWidth="2" strokeDasharray="6 4" className="floating" style={{ animationDuration: '3s', animationDelay: '2s' }} />
              <path d="M610 160 Q700 140 780 170" stroke="rgba(0,102,204,0.3)" strokeWidth="2" strokeDasharray="6 4" className="floating" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }} />

              {/* Connection dots */}
              <circle cx="370" cy="85" r="5" fill="#ff3b30" opacity="0.6" className="floating" style={{ animationDuration: '3s' }} />
              <circle cx="780" cy="80" r="5" fill="#34c759" opacity="0.6" className="floating" style={{ animationDuration: '4s', animationDelay: '1s' }} />
              <circle cx="570" cy="15" r="4" fill="#0066cc" opacity="0.5" className="floating" style={{ animationDuration: '3.5s', animationDelay: '2s' }} />

              {/* Ground line */}
              <line x1="0" y1="250" x2="1200" y2="250" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
            </svg>

            {/* Floating labels */}
            <div className="absolute top-4 left-[8%] apple-glass rounded-lg px-3 py-1.5 floating shadow-sm" style={{ animationDelay: '1s' }}>
              <span className="text-xs text-[#1d1d1f]/70 font-medium tracking-wide">🏢 Apartments</span>
            </div>
            <div className="absolute bottom-12 left-[28%] apple-glass rounded-lg px-3 py-1.5 floating shadow-sm" style={{ animationDelay: '2s' }}>
              <span className="text-xs text-[#34c759] font-semibold tracking-wide">🏪 Local Markets</span>
            </div>
            <div className="absolute top-2 right-[15%] apple-glass rounded-lg px-3 py-1.5 floating shadow-sm" style={{ animationDelay: '0.5s' }}>
              <span className="text-xs text-[#1d1d1f]/70 font-medium tracking-wide">🏠 Societies</span>
            </div>
            <div className="absolute bottom-8 right-[30%] apple-glass rounded-lg px-3 py-1.5 floating shadow-sm" style={{ animationDelay: '3s' }}>
              <span className="text-xs text-[#0066cc] font-semibold tracking-wide">🔗 Smart Links</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Remove dark gradient overlay bottom edge */}
    </section>
  );
}
