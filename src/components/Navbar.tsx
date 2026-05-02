"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const { user, loading, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    ["ecity_active_user", "ecity_users", "ecity_verified"].forEach((k) => localStorage.removeItem(k));
    router.replace('/login');
  };

  const links = [
    { label: "Home", href: "/" },
    { label: "Explore Deals", href: "/explore" },
    { label: "Post a Need", href: "/post-need" },
    { label: "Offer Help", href: "/offer-help" },
  ];

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? "bg-[rgba(255,255,255,0.8)] saturate-150 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.03)] border-b border-black/5"
          : "bg-transparent border-b border-transparent"
        }`}
    >
      <div className="container-main">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-lg transition-all duration-300 ${scrolled ? "bg-[#1d1d1f] text-white shadow-md" : "bg-white text-black shadow-[0_2px_10px_rgba(0,0,0,0.08)]"
              }`}>
              e
            </div>
            <span className={`text-xl font-bold tracking-tight transition-colors duration-300 ${scrolled ? "text-[#1d1d1f]" : "text-[#1d1d1f]"}`}>
              City
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center bg-black/5 rounded-full px-4 py-2 backdrop-blur-sm border border-black/5" style={{ gap: '16px' }}>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-all duration-300 text-[#1d1d1f]/70 hover:text-[#1d1d1f] hover:bg-white/60 rounded-full hover:shadow-sm`}
                style={{ padding: '6px 16px', display: 'inline-block', whiteSpace: 'nowrap' }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Buttons - Conditional based on auth */}
          <div className="hidden lg:flex items-center bg-white/80 backdrop-blur-md rounded-full px-2 py-1.5 border border-black/5 shadow-sm" style={{ gap: '12px' }}>
            {loading ? (
              // Loading state
              <div className="flex items-center gap-3 px-4">
                <div className="w-8 h-8 rounded-full bg-black/10 animate-pulse" />
              </div>
            ) : user ? (
              // Logged in - Show profile dropdown
              <div className="flex items-center gap-3 px-2">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 rounded-full text-sm font-bold transition-all duration-300 text-[#1d1d1f] hover:bg-white hover:shadow-sm"
                  style={{ padding: '8px 16px', display: 'flex', whiteSpace: 'nowrap' }}
                >
                  <div className="w-7 h-7 rounded-full bg-[#0066cc] text-white flex items-center justify-center text-xs font-bold">
                    {user.email?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span className="max-w-[120px] truncate">{user.email?.split('@')[0]}</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  type="button"
                  className="rounded-full text-sm font-medium transition-all duration-300 text-[#1d1d1f]/60 hover:text-[#ff3b30] hover:bg-red-50"
                  style={{ padding: '8px 16px', display: 'inline-block', whiteSpace: 'nowrap' }}
                >
                  Sign Out
                </button>
              </div>
            ) : (
              // Not logged in - Show Login/Join Free
              <>
                <Link
                  href="/login"
                  className={`rounded-full text-sm font-bold transition-all duration-300 text-[#1d1d1f] hover:bg-white hover:shadow-sm`}
                  style={{ padding: '10px 24px', display: 'inline-block', whiteSpace: 'nowrap', minWidth: '120px', textAlign: 'center' }}
                >
                  Log In
                </Link>
                <Link href="/register" className="rounded-full text-sm font-bold bg-[#1d1d1f] text-white hover:bg-black transition-all duration-300 shadow-md" style={{ padding: '10px 24px', display: 'inline-block', whiteSpace: 'nowrap', minWidth: '120px', textAlign: 'center' }}>
                  Join Free
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 rounded-full transition-all duration-300 bg-[#1d1d1f] ${mobileOpen
                ? `rotate-45 translate-y-2`
                : ""
              }`} />
            <span className={`block w-6 h-0.5 rounded-full transition-all duration-300 bg-[#1d1d1f] ${mobileOpen ? "opacity-0" : ""
              }`} />
            <span className={`block w-6 h-0.5 rounded-full transition-all duration-300 bg-[#1d1d1f] ${mobileOpen
                ? `-rotate-45 -translate-y-2`
                : ""
              }`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ${mobileOpen ? "max-h-[500px] opacity-100 border-b border-black/5" : "max-h-0 opacity-0"
          } bg-[rgba(255,255,255,0.9)] backdrop-blur-2xl`}
      >
        <div className="container-main py-4 flex flex-col gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`px-4 py-3 rounded-xl text-sm font-medium transition-all text-[#1d1d1f]/80 hover:text-[#1d1d1f] hover:bg-black/5`}
            >
              {link.label}
            </Link>
          ))}
          
          <div className="flex gap-3 mt-3 px-4 pb-4">
            {loading ? (
              <div className="flex-1 h-12 bg-black/5 rounded-xl animate-pulse" />
            ) : user ? (
              // Logged in mobile menu
              <>
                <Link 
                  href="/dashboard" 
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 flex items-center justify-center py-3 rounded-xl text-sm font-medium bg-[#0066cc] text-white"
                >
                  Profile
                </Link>
                <button 
                  onClick={() => {
                    handleSignOut();
                    setMobileOpen(false);
                  }}
                  type="button"
                  className="flex-1 flex items-center justify-center py-3 rounded-xl text-sm font-medium text-[#ff3b30] bg-red-50"
                >
                  Sign Out
                </button>
              </>
            ) : (
              // Not logged in mobile menu
              <>
                <Link href="/login" onClick={() => setMobileOpen(false)} className={`flex-1 flex items-center justify-center py-3 rounded-xl text-sm font-medium transition-all text-[#1d1d1f] bg-black/5 hover:bg-black/10`}>
                  Log In
                </Link>
                <Link href="/register" onClick={() => setMobileOpen(false)} className="flex-1 flex items-center justify-center py-3 rounded-xl text-sm font-medium bg-[#1d1d1f] hover:bg-black shadow-[0_4px_14px_rgba(0,0,0,0.15)] text-white">
                  Join Free
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}