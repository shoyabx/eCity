"use client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="bg-[#f5f5f7] pt-20 pb-10 border-t border-black/5">
      <div className="container-main">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-16">
          
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="inline-block text-3xl font-black text-[#1d1d1f] tracking-tight mb-6">
              eCity<span className="text-[#0066cc]">.</span>
            </Link>
            <p className="text-[#1d1d1f]/60 font-medium mb-6 max-w-sm">
              The premier peer-to-peer urban exchange platform in Delhi NCR. We connect you with trusted locals to help you save money and live smarter.
            </p>
            <div className="flex gap-4">
              <a href="#!" onClick={(e) => { e.preventDefault(); alert("Feature coming soon!"); }} className="w-10 h-10 rounded-full bg-white border border-black/5 flex items-center justify-center text-[#1d1d1f]/50 hover:text-[#0066cc] hover:bg-white transition-all shadow-sm">
                <FontAwesomeIcon icon={faFacebook} className="text-lg" />
              </a>
              <a href="#!" onClick={(e) => { e.preventDefault(); alert("Feature coming soon!"); }} className="w-10 h-10 rounded-full bg-white border border-black/5 flex items-center justify-center text-[#1d1d1f]/50 hover:text-[#0066cc] hover:bg-white transition-all shadow-sm">
                <FontAwesomeIcon icon={faTwitter} className="text-lg" />
              </a>
              <a href="#!" onClick={(e) => { e.preventDefault(); alert("Feature coming soon!"); }} className="w-10 h-10 rounded-full bg-white border border-black/5 flex items-center justify-center text-[#1d1d1f]/50 hover:text-[#ff3b30] hover:bg-white transition-all shadow-sm">
                <FontAwesomeIcon icon={faInstagram} className="text-lg" />
              </a>
              <a href="#!" onClick={(e) => { e.preventDefault(); alert("Feature coming soon!"); }} className="w-10 h-10 rounded-full bg-white border border-black/5 flex items-center justify-center text-[#1d1d1f]/50 hover:text-[#0066cc] hover:bg-white transition-all shadow-sm">
                <FontAwesomeIcon icon={faLinkedin} className="text-lg" />
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-bold text-[#1d1d1f] mb-4">Platform</h4>
            <ul className="space-y-3">
              <li><Link href="#how-it-works" className="text-[#1d1d1f]/60 hover:text-[#0066cc] transition-colors text-sm font-medium">How It Works</Link></li>
              <li><Link href="#categories" className="text-[#1d1d1f]/60 hover:text-[#0066cc] transition-colors text-sm font-medium">Categories</Link></li>
              <li><a href="#!" onClick={(e) => { e.preventDefault(); alert("Feature coming soon!"); }} className="text-[#1d1d1f]/60 hover:text-[#0066cc] transition-colors text-sm font-medium">Pricing</a></li>
              <li><a href="#!" onClick={(e) => { e.preventDefault(); alert("Feature coming soon!"); }} className="text-[#1d1d1f]/60 hover:text-[#0066cc] transition-colors text-sm font-medium">Trust & Safety</a></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-bold text-[#1d1d1f] mb-4">Company</h4>
            <ul className="space-y-3">
              <li><a href="#!" onClick={(e) => { e.preventDefault(); alert("Feature coming soon!"); }} className="text-[#1d1d1f]/60 hover:text-[#34c759] transition-colors text-sm font-medium">About Us</a></li>
              <li><a href="#!" onClick={(e) => { e.preventDefault(); alert("Feature coming soon!"); }} className="text-[#1d1d1f]/60 hover:text-[#34c759] transition-colors text-sm font-medium">Careers</a></li>
              <li><a href="#!" onClick={(e) => { e.preventDefault(); alert("Feature coming soon!"); }} className="text-[#1d1d1f]/60 hover:text-[#34c759] transition-colors text-sm font-medium">Blog</a></li>
              <li><a href="#!" onClick={(e) => { e.preventDefault(); alert("Feature coming soon!"); }} className="text-[#1d1d1f]/60 hover:text-[#34c759] transition-colors text-sm font-medium">Contact</a></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-bold text-[#1d1d1f] mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><a href="#!" onClick={(e) => { e.preventDefault(); alert("Feature coming soon!"); }} className="text-[#1d1d1f]/60 hover:text-[#0066cc] transition-colors text-sm font-medium">Terms of Service</a></li>
              <li><a href="#!" onClick={(e) => { e.preventDefault(); alert("Feature coming soon!"); }} className="text-[#1d1d1f]/60 hover:text-[#0066cc] transition-colors text-sm font-medium">Privacy Policy</a></li>
              <li><a href="#!" onClick={(e) => { e.preventDefault(); alert("Feature coming soon!"); }} className="text-[#1d1d1f]/60 hover:text-[#0066cc] transition-colors text-sm font-medium">Cookie Policy</a></li>
              <li><a href="#!" onClick={(e) => { e.preventDefault(); alert("Feature coming soon!"); }} className="text-[#1d1d1f]/60 hover:text-[#0066cc] transition-colors text-sm font-medium">Community Guidelines</a></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#1d1d1f]/40 font-medium text-sm">
            &copy; {new Date().getFullYear()} eCity Network. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-[#1d1d1f]/40 font-medium text-sm">
            <span>Made with <span className="text-[#ff3b30] animate-pulse">❤️</span> in Delhi NCR</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
