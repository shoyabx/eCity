"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface HeroLoggedInProps {
  userEmail: string | undefined;
}

export default function HeroLoggedIn({ userEmail }: HeroLoggedInProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [greeting, setGreeting] = useState("");
  const [stats] = useState({
    savingsThisMonth: 12450,
    activeDeals: 8,
    neighborsHelped: 12
  });

  // Set greeting based on time of day
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 17) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

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

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.4 + 0.1,
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
        ctx.fillStyle = `rgba(52, 199, 89, ${p.opacity})`;
        ctx.fill();

        particles.slice(i + 1).forEach((p2) => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(52, 199, 89, ${0.06 * (1 - dist / 100)})`;
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

  const userName = userEmail ? userEmail.split('@')[0] : "Friend";

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-[#f0fdf4] to-[#fbfbfd] pt-[72px]">
      {/* Animated background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.5 }}
      />

      {/* Gradient overlays */}
      <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-[#34c759]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-[400px] h-[400px] bg-[#0066cc]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-main relative z-10 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Personalized greeting badge */}
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-[#34c759]/20 rounded-full px-5 py-2 mb-8 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-[#34c759] animate-pulse" />
            <span className="text-sm font-semibold text-[#34c759]">
              {greeting}, {userName}! 👋
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#1d1d1f] mb-6 tracking-tight leading-tight">
            Welcome back to your
            <span className="block text-[#34c759]">Neighborhood</span>
          </h1>

          <p className="text-xl md:text-2xl text-[#1d1d1f]/60 font-medium mb-12 max-w-2xl mx-auto">
            You've saved <span className="text-[#34c759] font-bold">₹{stats.savingsThisMonth.toLocaleString()}</span> this month alone. 
            Continue connecting with trusted locals in Delhi NCR.
          </p>

          {/* Quick stats */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl px-8 py-5 border border-black/5 shadow-lg">
              <div className="text-3xl font-bold text-[#0066cc]">{stats.activeDeals}</div>
              <div className="text-sm font-medium text-[#1d1d1f]/60">Active Deals</div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl px-8 py-5 border border-black/5 shadow-lg">
              <div className="text-3xl font-bold text-[#34c759]">{stats.neighborsHelped}</div>
              <div className="text-sm font-medium text-[#1d1d1f]/60">Neighbors Helped</div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl px-8 py-5 border border-black/5 shadow-lg">
              <div className="text-3xl font-bold text-[#ff9500]">₹{stats.savingsThisMonth.toLocaleString()}</div>
              <div className="text-sm font-medium text-[#1d1d1f]/60">Total Saved</div>
            </div>
          </div>

          {/* Quick actions for logged-in users */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/explore" 
              className="inline-flex items-center justify-center gap-2 bg-[#34c759] text-white font-bold py-4 px-8 rounded-full text-lg shadow-[0_10px_30px_rgba(52,199,89,0.3)] hover:shadow-[0_15px_40px_rgba(52,199,89,0.4)] transition-all duration-300 hover:scale-105"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Browse Local Deals
            </Link>
            <Link 
              href="/post-need" 
              className="inline-flex items-center justify-center gap-2 bg-white text-[#1d1d1f] font-bold py-4 px-8 rounded-full text-lg border-2 border-black/10 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Post a Need
            </Link>
          </div>

          {/* Recent activity hint */}
          <div className="mt-16 pt-8 border-t border-black/5">
            <p className="text-sm font-medium text-[#1d1d1f]/40 mb-4">Recently in your area</p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { label: "Groceries @ 20% off", location: "Sector 49" },
                { label: "Plumber available", location: "DLF Phase 3" },
                { label: "Cab to Airport", location: "Golf Course Rd" }
              ].map((item, i) => (
                <div key={i} className="bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 border border-black/5 text-sm font-medium text-[#1d1d1f]/70">
                  {item.label} • {item.location}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}