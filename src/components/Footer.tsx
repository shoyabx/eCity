"use client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  const muted = "text-[#1d1d1f]/40 text-sm";

  return (
    <footer className="bg-[#f5f5f7] pt-20 pb-10 border-t border-black/5">
      <div className="container-main">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-16">
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="inline-block text-3xl font-black text-[#1d1d1f] tracking-tight mb-6">eCity<span className="text-[#0066cc]">.</span></Link>
            <p className="text-[#1d1d1f]/60 font-medium mb-6 max-w-sm">Trusted local exchange in Delhi NCR.</p>
            <div className="flex gap-4">
              {[faFacebook, faTwitter, faInstagram, faLinkedin].map((icon, i) => (
                <span key={i} className="w-10 h-10 rounded-full bg-white border border-black/5 flex items-center justify-center text-[#1d1d1f]/30" title="Coming soon">
                  <FontAwesomeIcon icon={icon} className="text-lg" />
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-[#1d1d1f] mb-4">Platform</h4>
            <ul className="space-y-3">
              <li><Link href="#how-it-works" className="text-[#1d1d1f]/60 hover:text-[#0066cc] text-sm font-medium">How It Works</Link></li>
              <li><Link href="/explore" className="text-[#1d1d1f]/60 hover:text-[#0066cc] text-sm font-medium">Explore</Link></li>
              <li><span className={muted}>Pricing (soon)</span></li>
              <li><span className={muted}>Trust & Safety</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[#1d1d1f] mb-4">Company</h4>
            <ul className="space-y-3">
              <li><span className={muted}>About</span></li>
              <li><span className={muted}>Careers</span></li>
              <li><span className={muted}>Blog</span></li>
              <li><span className={muted}>Contact</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[#1d1d1f] mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><span className={muted}>Terms</span></li>
              <li><span className={muted}>Privacy</span></li>
              <li><span className={muted}>Cookies</span></li>
              <li><span className={muted}>Guidelines</span></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#1d1d1f]/40 font-medium text-sm">© {new Date().getFullYear()} eCity Network.</p>
          <p className="text-[#1d1d1f]/40 font-medium text-sm">Made in Delhi NCR</p>
        </div>
      </div>
    </footer>
  );
}
