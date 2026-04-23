"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Register() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    password: ""
  });
  
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Minimal validation
    if (!formData.firstName || !formData.email || !formData.password || !formData.phone) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      const existingUsersStr = localStorage.getItem("ecity_users");
      const users = existingUsersStr ? JSON.parse(existingUsersStr) : [];
      
      // Check if email exists
      if (users.find((u: any) => u.email === formData.email)) {
        setError("Email is already registered.");
        return;
      }
      
      users.push(formData);
      localStorage.setItem("ecity_users", JSON.stringify(users));
      
      alert("Registration successful! Please login.");
      router.push("/login");

    } catch (err) {
      setError("An error occurred preserving your data.");
    }
  };

  return (
    <main className="min-h-screen bg-[#fbfbfd] flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center pt-32 pb-20 px-4 relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#ff9500]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#0066cc]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="apple-glass rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-black/5 w-full max-w-xl relative z-10" style={{ padding: '48px' }}>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-[#ff9500]/10 text-[#ff9500] border border-[#ff9500]/20 rounded-full px-4 py-1.5 mb-6 shadow-sm font-medium text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff9500] animate-pulse" />
              Join the Community
            </div>
            <h1 className="text-3xl font-bold text-[#1d1d1f] mb-2 tracking-tight">
              Create Your Account
            </h1>
            <p className="text-[#1d1d1f]/60 font-medium">
              Start saving and earning with trusted locals in Delhi NCR.
            </p>
          </div>

          {error && (
            <div className="bg-[#ff3b30]/10 text-[#ff3b30] border border-[#ff3b30]/20 rounded-xl p-3 text-sm font-medium mb-6 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#1d1d1f]/80 mb-2">First Name *</label>
                <input 
                  type="text" 
                  name="firstName"
                  required 
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full bg-white border border-black/5 rounded-xl px-4 py-3 text-[#1d1d1f] focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] transition-all shadow-sm"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#1d1d1f]/80 mb-2">Last Name</label>
                <input 
                  type="text" 
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full bg-white border border-black/5 rounded-xl px-4 py-3 text-[#1d1d1f] focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] transition-all shadow-sm"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#1d1d1f]/80 mb-2">Email *</label>
                <input 
                  type="email" 
                  name="email"
                  required 
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white border border-black/5 rounded-xl px-4 py-3 text-[#1d1d1f] focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] transition-all shadow-sm"
                  placeholder="name@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#1d1d1f]/80 mb-2">Phone Number *</label>
                <input 
                  type="tel" 
                  name="phone"
                  required 
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-white border border-black/5 rounded-xl px-4 py-3 text-[#1d1d1f] focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] transition-all shadow-sm"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1d1d1f]/80 mb-2">Address / Society</label>
              <textarea 
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={2}
                className="w-full bg-white border border-black/5 rounded-xl px-4 py-3 text-[#1d1d1f] focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] transition-all shadow-sm resize-none"
                placeholder="Sector 49, Gurugram"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1d1d1f]/80 mb-2">Password *</label>
              <input 
                type="password" 
                name="password"
                required 
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-white border border-black/5 rounded-xl px-4 py-3 text-[#1d1d1f] focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] transition-all shadow-sm"
                placeholder="Create a strong password"
              />
            </div>

            <button type="submit" className="w-full btn-primary py-4 text-lg justify-center shadow-[0_10px_20px_rgba(0,102,204,0.2)]">
              Register Account
            </button>

            <div className="text-center mt-6">
              <span className="text-[#1d1d1f]/60 text-sm font-medium">Already have an account? </span>
              <Link href="/login" className="text-[#0066cc] text-sm font-semibold hover:underline">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
