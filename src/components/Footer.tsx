"use client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="bg-slate-50 pt-20 pb-10 border-t border-slate-200">
      <div className="container-main">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-16">
          
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="inline-block text-3xl font-black text-blue-deep tracking-tight mb-6">
              eCity<span className="text-orange">.</span>
            </Link>
            <p className="text-slate-500 mb-6 max-w-sm">
              The premier peer-to-peer urban exchange platform in Delhi NCR. We connect you with trusted locals to help you save money and live smarter.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-primary hover:border-blue-primary transition-colors shadow-sm">
                <FontAwesomeIcon icon={faFacebook} className="text-lg" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-primary hover:border-blue-primary transition-colors shadow-sm">
                <FontAwesomeIcon icon={faTwitter} className="text-lg" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-orange hover:border-orange transition-colors shadow-sm">
                <FontAwesomeIcon icon={faInstagram} className="text-lg" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-deep hover:border-blue-deep transition-colors shadow-sm">
                <FontAwesomeIcon icon={faLinkedin} className="text-lg" />
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Platform</h4>
            <ul className="space-y-3">
              <li><Link href="#how-it-works" className="text-slate-500 hover:text-orange transition-colors text-sm font-medium">How It Works</Link></li>
              <li><Link href="#categories" className="text-slate-500 hover:text-orange transition-colors text-sm font-medium">Categories</Link></li>
              <li><Link href="#" className="text-slate-500 hover:text-orange transition-colors text-sm font-medium">Pricing</Link></li>
              <li><Link href="#" className="text-slate-500 hover:text-orange transition-colors text-sm font-medium">Trust & Safety</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Company</h4>
            <ul className="space-y-3">
              <li><Link href="#" className="text-slate-500 hover:text-emerald transition-colors text-sm font-medium">About Us</Link></li>
              <li><Link href="#" className="text-slate-500 hover:text-emerald transition-colors text-sm font-medium">Careers</Link></li>
              <li><Link href="#" className="text-slate-500 hover:text-emerald transition-colors text-sm font-medium">Blog</Link></li>
              <li><Link href="#" className="text-slate-500 hover:text-emerald transition-colors text-sm font-medium">Contact</Link></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><Link href="#" className="text-slate-500 hover:text-blue-primary transition-colors text-sm font-medium">Terms of Service</Link></li>
              <li><Link href="#" className="text-slate-500 hover:text-blue-primary transition-colors text-sm font-medium">Privacy Policy</Link></li>
              <li><Link href="#" className="text-slate-500 hover:text-blue-primary transition-colors text-sm font-medium">Cookie Policy</Link></li>
              <li><Link href="#" className="text-slate-500 hover:text-blue-primary transition-colors text-sm font-medium">Community Guidelines</Link></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">
            &copy; {new Date().getFullYear()} eCity Network. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <span>Made with <span className="text-rose-500 animate-pulse">❤️</span> in Delhi NCR</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
