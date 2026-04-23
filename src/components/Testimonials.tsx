"use client";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft, faStar, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

type Review = {
  name: string;
  role: string;
  imageColor: string;
  initials: string;
  quote: string;
  rating: number;
  tag: string;
};

const initialReviews: Review[] = [
  {
    name: "Rohan M.", role: "IT Professional", imageColor: "from-blue-400 to-blue-600", initials: "RM", rating: 5, tag: "Saved Money",
    quote: "Saved ₹3,000 on my car service. The mechanic I found through eCity was completely transparent and didn't try to upsell me.",
  },
  {
    name: "Priya S.", role: "Resident, Noida Ext.", imageColor: "from-emerald-400 to-emerald-600", initials: "PS", rating: 5, tag: "Better Prices",
    quote: "Found weekly vegetables 30% cheaper than my society store. A local connected me directly with a mandi supplier.",
  },
  {
    name: "Amit K.", role: "Local Connector", imageColor: "from-orange-400 to-orange-600", initials: "AK", rating: 5, tag: "Earned Income",
    quote: "Earned a steady side income helping my neighbors source appliances and furniture from Kirti Nagar.",
  }
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);

  const [formName, setFormName] = useState("");
  const [formRole, setFormRole] = useState("");
  const [formQuote, setFormQuote] = useState("");
  const [formRating, setFormRating] = useState(5);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formQuote) return;

    const colors = ["from-blue-400 to-blue-600", "from-purple-400 to-purple-600", "from-rose-400 to-rose-600", "from-emerald-400 to-emerald-600"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const initials = formName.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();

    const newReview: Review = {
      name: formName,
      role: formRole || "Community Member",
      imageColor: randomColor,
      initials: initials,
      quote: formQuote,
      rating: formRating,
      tag: "New Review"
    };

    setReviews([newReview, ...reviews]);
    setFormName("");
    setFormRole("");
    setFormQuote("");
    setFormRating(5);
  };

  return (
    <section ref={sectionRef} className="section-padding bg-[#f5f5f7] relative overflow-hidden border-t border-black/5">
      {/* Background gradients */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#0066cc]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#ff3b30]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-main relative z-10">
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="section-badge bg-[#ff9500]/10 text-[#ff9500] border border-[#ff9500]/20 mb-4 mx-auto w-fit">
            <FontAwesomeIcon icon={faStar} className="mr-2 text-[#ff9500]" />
            Community Reviews
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1d1d1f] mb-4 tracking-tight">
            Hear from our <span className="text-[#0066cc]">Community</span>
          </h2>
          <p className="text-lg text-[#1d1d1f]/60" style={{ textAlign: 'center', margin: '0 auto', width: '100%', maxWidth: '36rem' }}>
            Thousands in Delhi NCR are already using eCity. Share your experience or see what others say!
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 max-w-7xl mx-auto items-start">
          
          {/* Submission Form (Left) */}
          <div className={`lg:col-span-5 apple-glass rounded-3xl transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`} style={{ padding: '32px' }}>
            <h3 className="text-2xl font-bold text-[#1d1d1f] mb-6 tracking-tight">Write a Review</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-[#1d1d1f] mb-1.5">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setFormRating(star)}
                      className="focus:outline-none transition-transform hover:scale-110"
                    >
                      <FontAwesomeIcon icon={faStar} className={`text-2xl ${star <= formRating ? 'text-[#ff9500]' : 'text-black/10'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#1d1d1f] mb-1.5">Name</label>
                  <input required value={formName} onChange={(e) => setFormName(e.target.value)} type="text" placeholder="John D." className="w-full bg-white/80 border border-black/5 shadow-sm rounded-xl px-4 py-3 text-[#1d1d1f] placeholder-[#1d1d1f]/30 focus:outline-none focus:border-[#0066cc] focus:ring-2 focus:ring-[#0066cc]/20 transition-all font-medium" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1d1d1f] mb-1.5">Role / Location</label>
                  <input value={formRole} onChange={(e) => setFormRole(e.target.value)} type="text" placeholder="Resident, Delhi" className="w-full bg-white/80 border border-black/5 shadow-sm rounded-xl px-4 py-3 text-[#1d1d1f] placeholder-[#1d1d1f]/30 focus:outline-none focus:border-[#0066cc] focus:ring-2 focus:ring-[#0066cc]/20 transition-all font-medium" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1d1d1f] mb-1.5">Your Experience</label>
                <textarea required value={formQuote} onChange={(e) => setFormQuote(e.target.value)} rows={4} placeholder="How did eCity help you save money or find someone reliable?" className="w-full bg-white/80 border border-black/5 shadow-sm rounded-xl px-4 py-3 text-[#1d1d1f] placeholder-[#1d1d1f]/30 focus:outline-none focus:border-[#0066cc] focus:ring-2 focus:ring-[#0066cc]/20 transition-all font-medium resize-none" />
              </div>

              <button type="submit" className="w-full btn-primary justify-center">
                <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                Submit Review
              </button>
            </form>
          </div>

          {/* Review List (Right) */}
          <div className={`lg:col-span-7 flex flex-col gap-6 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            {reviews.map((t, i) => (
              <div
                key={i}
                className="apple-glass rounded-3xl hover:bg-white/90 transition-colors relative shadow-sm"
                style={{ animation: "fadeInUp 0.5s ease-out forwards", padding: '24px' }}
              >
                <FontAwesomeIcon icon={faQuoteLeft} className="absolute top-6 right-6 text-4xl text-black/5" />
                
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${t.imageColor} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                    {t.initials}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1d1d1f] tracking-wide">{t.name}</h4>
                    <p className="text-xs text-[#1d1d1f]/50 font-medium">{t.role}</p>
                  </div>
                </div>
                
                <div className="flex gap-1 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <FontAwesomeIcon key={i} icon={faStar} className="text-[#ff9500] text-sm drop-shadow-sm" />
                  ))}
                </div>
                
                <p className="text-[#1d1d1f]/80 font-medium leading-relaxed relative z-10 italic">
                  "{t.quote}"
                </p>

                <div className="mt-4 pt-4 border-t border-black/5 flex items-center justify-between">
                  <span className="inline-block bg-black/5 border border-black/5 text-[#1d1d1f]/60 text-xs font-semibold px-3 py-1 rounded-full">
                    {t.tag}
                  </span>
                  { i === 0 && t.tag === "New Review" && (
                    <span className="text-xs text-[#34c759] font-bold animate-pulse">Just Added!</span>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.02); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,0.2); }
      `}</style>
    </section>
  );
}
