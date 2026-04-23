"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const categories = ["All", "Groceries", "Services", "Repairs", "Electronics"];

const deals = [
  { id: 1, title: "Wholesale Vegetables Supply", category: "Groceries", location: "Noida Sector 75", price: "Saves 30%", rating: 4.9, tags: ["Verified", "Hot Deal"] },
  { id: 2, title: "Expert AC Maintenance & Gas Repair", category: "Repairs", location: "Gurugram Phase 3", price: "Starting ₹499", rating: 4.8, tags: ["Fast Response"] },
  { id: 3, title: "Local Carpenter (Furniture Fixes)", category: "Services", location: "Delhi Dwarka", price: "Saves 40%", rating: 4.7, tags: ["Top Rated"] },
  { id: 4, title: "Direct Farm Fresh Fruits", category: "Groceries", location: "Faridabad Sector 15", price: "Saves 25%", rating: 5.0, tags: ["Organic", "Verified"] },
  { id: 5, title: "Laptop Motherboard Repair", category: "Electronics", location: "Nehru Place, Delhi", price: "Fair Pricing", rating: 4.6, tags: ["Expert"] },
  { id: 6, title: "Packers & Movers (Local Shifting)", category: "Services", location: "Greater Noida", price: "Starting ₹2000", rating: 4.8, tags: ["Insured"] },
];

export default function Explore() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredDeals = activeTab === "All" ? deals : deals.filter(d => d.category === activeTab);

  return (
    <main className="min-h-screen bg-[#fbfbfd] flex flex-col">
      <Navbar />
      
      <div className="flex-1 pb-20" style={{ paddingTop: '160px' }}>
        <div className="container-main">
          {/* Header Block */}
          <div className="mb-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between" style={{ gap: '24px' }}>
            <div>
              <h1 className="text-4xl sm:text-5xl font-black text-[#1d1d1f] mb-4 tracking-tight">Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066cc] to-[#5ac8fa]">Local Deals</span></h1>
              <p className="text-[#1d1d1f]/70 text-lg font-medium max-w-xl" style={{ marginBottom: '32px' }}>Find verified community contributors offering better prices for daily necessities and professional services.</p>
            </div>
            <Link href="/post-need" className="btn-primary shadow-[0_10px_20px_rgba(0,102,204,0.2)]">
              Can't find it? Post a Need
            </Link>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center border-b border-black/5" style={{ gap: '16px', paddingBottom: '24px', marginBottom: '48px' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-5 py-2.5 rounded-full font-semibold transition-all shadow-sm ${
                  activeTab === cat 
                  ? "bg-[#1d1d1f] text-white" 
                  : "bg-white text-[#1d1d1f]/70 border border-black/5 hover:bg-black/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Listing Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDeals.map((deal) => (
              <div key={deal.id} className="group apple-glass border border-black/5 rounded-[1.5rem] p-6 hover:shadow-[0_20px_40px_rgba(0,102,204,0.06)] hover:-translate-y-1 transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-[#0066cc]/10 text-[#0066cc] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {deal.category}
                  </div>
                  <div className="flex items-center gap-1 text-[#ff9500] font-bold text-sm bg-[#ff9500]/10 px-2 py-0.5 rounded-md">
                    ★ {deal.rating}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[#1d1d1f] mb-2 leading-tight group-hover:text-[#0066cc] transition-colors">{deal.title}</h3>
                
                <p className="text-[#1d1d1f]/50 text-sm font-medium mb-6 flex items-center gap-2">
                  📍 {deal.location}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                 {deal.tags.map(tag => (
                   <span key={tag} className="bg-black/5 text-[#1d1d1f]/60 text-xs font-semibold px-2.5 py-1 rounded-lg">
                     {tag}
                   </span>
                 ))}
                </div>

                <div className="border-t border-black/5 pt-5 flex items-center justify-between">
                  <div>
                    <span className="block text-xs font-semibold text-[#1d1d1f]/50 mb-0.5">Estimated Value</span>
                    <span className="font-extrabold text-[#34c759] text-lg">{deal.price}</span>
                  </div>
                  <button onClick={() => alert("Connecting to connector via eCity...")} className="btn-secondary px-4 py-2 text-sm bg-white border border-black/10 hover:border-[#0066cc]/50">
                    Connect
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
