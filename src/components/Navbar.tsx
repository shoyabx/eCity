"use client";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "Home", href: "#home" },
    { label: "How it Works", href: "#how-it-works" },
    { label: "Categories", href: "#categories" },
    { label: "Become Connector", href: "#become-connector" },
    { label: "Safety", href: "#safety" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-[0_2px_30px_rgba(0,0,0,0.08)] border-b border-slate-200/50"
          : "bg-transparent"
        }`}
    >
      <div className="container-main">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-lg transition-all duration-300 ${scrolled ? "bg-gradient-to-br from-blue-primary to-emerald text-white" : "bg-white/20 text-white backdrop-blur-sm"
              }`}>
              e
            </div>
            <span className={`text-xl font-extrabold tracking-tight transition-colors duration-300 ${scrolled ? "text-slate-900" : "text-white"
              }`}>
              City
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${scrolled
                    ? "text-slate-600 hover:text-blue-primary hover:bg-blue-primary/5"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${scrolled
                  ? "text-slate-700 hover:text-blue-primary hover:bg-slate-100"
                  : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
            >
              Login
            </button>
            <button className="px-5 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-orange to-[#ea580c] text-white shadow-lg shadow-orange/25 hover:shadow-orange/40 hover:-translate-y-0.5 transition-all duration-300">
              Join Free
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 rounded-full transition-all duration-300 ${mobileOpen
                ? `rotate-45 translate-y-2 ${scrolled ? "bg-slate-900" : "bg-white"}`
                : scrolled ? "bg-slate-900" : "bg-white"
              }`} />
            <span className={`block w-6 h-0.5 rounded-full transition-all duration-300 ${mobileOpen ? "opacity-0" : scrolled ? "bg-slate-900" : "bg-white"
              }`} />
            <span className={`block w-6 h-0.5 rounded-full transition-all duration-300 ${mobileOpen
                ? `-rotate-45 -translate-y-2 ${scrolled ? "bg-slate-900" : "bg-white"}`
                : scrolled ? "bg-slate-900" : "bg-white"
              }`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ${mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          } ${scrolled ? "bg-white" : "bg-slate-900/95 backdrop-blur-xl"}`}
      >
        <div className="container-main py-4 flex flex-col gap-1">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${scrolled
                  ? "text-slate-700 hover:bg-slate-100"
                  : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
            >
              {link.label}
            </a>
          ))}
          <div className="flex gap-3 mt-3 px-4">
            <button className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all ${scrolled ? "text-slate-700 bg-slate-100" : "text-white bg-white/10"
              }`}>
              Login
            </button>
            <button className="flex-1 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-orange to-[#ea580c] text-white">
              Join Free
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}