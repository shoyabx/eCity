"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PostNeed() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    type: "service",
    category: "",
    details: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Need posted successfully! Verified connectors will contact you soon.");
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-[#fbfbfd] flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center pt-32 pb-20 px-4 relative">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#0066cc]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-[#5ac8fa]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="apple-glass rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,102,204,0.05)] border border-black/5 w-full max-w-2xl relative z-10 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,102,204,0.08)]" style={{ padding: '48px' }}>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-[#0066cc]/10 text-[#0066cc] border border-[#0066cc]/20 rounded-full px-4 py-1.5 mb-6 shadow-sm font-medium text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0066cc] animate-pulse" />
              Post a Requirement
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#1d1d1f] mb-3 tracking-tight">
              What do you need help with?
            </h1>
            <p className="text-[#1d1d1f]/60 font-medium max-w-md mx-auto">
              Describe your requirement and get connected with trusted locals offering the best prices.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-[#1d1d1f]/80 mb-2">Your Name</label>
                <input 
                  type="text" 
                  name="name"
                  required 
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-white border border-black/5 rounded-xl px-4 py-3 text-[#1d1d1f] focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] transition-all shadow-sm"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1d1d1f]/80 mb-2">I am looking for a...</label>
                <select 
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full bg-white border border-black/5 rounded-xl px-4 py-3 text-[#1d1d1f] focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] transition-all shadow-sm"
                >
                  <option value="service">Service (Repair, Cleaning, etc.)</option>
                  <option value="product">Product (Groceries, Electronics, etc.)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1d1d1f]/80 mb-2">Category</label>
              <select 
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-white border border-black/5 rounded-xl px-4 py-3 text-[#1d1d1f] focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] transition-all shadow-sm"
              >
                <option value="">Select a category</option>
                {formData.type === "service" ? (
                  <>
                    <option value="ac-repair">AC / Appliance Repair</option>
                    <option value="plumber">Plumber / Electrician</option>
                    <option value="car-repair">Car / Bike Mechanic</option>
                    <option value="carpenter">Carpenter / Furniture</option>
                  </>
                ) : (
                  <>
                    <option value="groceries">Groceries & Vegetables</option>
                    <option value="electronics">Electronics</option>
                    <option value="furniture">Furniture & Decor</option>
                    <option value="other">Other Supplies</option>
                  </>
                )}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1d1d1f]/80 mb-2">Requirement Details</label>
              <textarea 
                name="details"
                required
                value={formData.details}
                onChange={handleChange}
                rows={4}
                className="w-full bg-white border border-black/5 rounded-xl px-4 py-3 text-[#1d1d1f] focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] transition-all shadow-sm resize-none"
                placeholder="E.g., Need someone to fix my LG washing machine, water is not draining..."
              />
            </div>

            <div className="p-4 border border-dashed border-[#0066cc]/30 rounded-xl bg-[#0066cc]/5 text-center cursor-pointer hover:bg-[#0066cc]/10 transition-colors">
              <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                <svg className="w-8 h-8 text-[#0066cc] mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm font-semibold text-[#0066cc]">Click to upload a photo (Optional)</span>
                <span className="text-xs text-[#1d1d1f]/50 mt-1">If something is broken, a photo helps!</span>
                <input id="file-upload" type="file" className="hidden" />
              </label>
            </div>

            <button type="submit" className="w-full btn-primary py-4 text-lg justify-center shadow-[0_10px_20px_rgba(0,102,204,0.2)]">
              Post My Requirement
            </button>
          </form>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
