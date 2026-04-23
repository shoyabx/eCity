"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function OfferHelp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    type: "service",
    servicesOffered: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Profile submitted! Verification active. You can start earning once approved.");
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-[#fbfbfd] flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center pt-32 pb-20 px-4 relative">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#34c759]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-[#30d158]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="apple-glass rounded-[2.5rem] shadow-[0_20px_50px_rgba(52,199,89,0.05)] border border-black/5 w-full max-w-2xl relative z-10 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(52,199,89,0.08)]" style={{ padding: '48px' }}>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-[#34c759]/10 text-[#34c759] border border-[#34c759]/20 rounded-full px-4 py-1.5 mb-6 shadow-sm font-medium text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34c759] animate-pulse" />
              Become a Connector
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#1d1d1f] mb-3 tracking-tight">
              Offer Help & Earn
            </h1>
            <p className="text-[#1d1d1f]/60 font-medium max-w-md mx-auto">
              Do you offer local services or products? Register to help neighbors and earn directly.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-[#1d1d1f]/80 mb-2">Provider Name</label>
                <input 
                  type="text" 
                  name="name"
                  required 
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-white border border-black/5 rounded-xl px-4 py-3 text-[#1d1d1f] focus:outline-none focus:ring-2 focus:ring-[#34c759]/30 focus:border-[#34c759] transition-all shadow-sm"
                  placeholder="Your Name or Shop Name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1d1d1f]/80 mb-2">Contact Number</label>
                <input 
                  type="tel" 
                  name="contact"
                  required 
                  value={formData.contact}
                  onChange={handleChange}
                  className="w-full bg-white border border-black/5 rounded-xl px-4 py-3 text-[#1d1d1f] focus:outline-none focus:ring-2 focus:ring-[#34c759]/30 focus:border-[#34c759] transition-all shadow-sm"
                  placeholder="+91 00000 00000"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1d1d1f]/80 mb-2">What do you provide?</label>
              <select 
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full bg-white border border-black/5 rounded-xl px-4 py-3 text-[#1d1d1f] focus:outline-none focus:ring-2 focus:ring-[#34c759]/30 focus:border-[#34c759] transition-all shadow-sm"
              >
                <option value="service">Services (Mechanics, Plumbing, Consulting, etc.)</option>
                <option value="product">Products (Wholesale Groceries, Electronics, etc.)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1d1d1f]/80 mb-2">Describe Your Offerings</label>
              <textarea 
                name="servicesOffered"
                required
                value={formData.servicesOffered}
                onChange={handleChange}
                rows={5}
                className="w-full bg-white border border-black/5 rounded-xl px-4 py-3 text-[#1d1d1f] focus:outline-none focus:ring-2 focus:ring-[#34c759]/30 focus:border-[#34c759] transition-all shadow-sm resize-none"
                placeholder="E.g., I provide wholesale vegetables delivered to society gates. I charge ₹10 margin per kg..."
              />
            </div>

            <div className="bg-[#1d1d1f]/5 border border-black/5 rounded-xl p-4 flex items-start gap-4">
              <input type="checkbox" required className="mt-1 w-4 h-4 text-[#34c759] border-black/10 rounded focus:ring-[#34c759]" />
              <p className="text-sm text-[#1d1d1f]/70 leading-relaxed font-medium">
                I agree to verify my identity and adhere to the community trust guidelines. Offering poor services or committing fraud will lead to permanent ban.
              </p>
            </div>

            <button type="submit" className="w-full btn-primary bg-[#34c759] hover:bg-[#30d158] border-transparent text-white py-4 text-lg justify-center shadow-[0_10px_20px_rgba(52,199,89,0.3)]">
              Submit Connector Application
            </button>
          </form>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
