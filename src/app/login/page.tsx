"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Login() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1); // 1: credentials, 2: authenticator
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pin, setPin] = useState(["", "", "", "", "", ""]);
  
  const [error, setError] = useState("");

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const usersStr = localStorage.getItem("ecity_users");
    if (!usersStr) {
      setError("No accounts found. Please register first.");
      return;
    }
    
    const users = JSON.parse(usersStr);
    const user = users.find((u: any) => u.email === email && u.password === password);
    
    if (user) {
      setStep(2);
    } else {
      setError("Invalid email or password.");
    }
  };

  const handlePinChange = (index: number, value: string) => {
    if (!/^[0-9]*$/.test(value)) return;
    
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    // Auto-focus next input
    if (value !== "" && index < 5) {
      const nextInput = document.getElementById(`pin-${index + 1}`) as HTMLInputElement;
      if (nextInput) nextInput.focus();
    }
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.join("").length === 6) {
      // Success! Simulate login
      localStorage.setItem("ecity_active_user", JSON.stringify({ email }));
      router.push("/");
    } else {
      setError("Please enter a valid 6-digit PIN.");
    }
  };

  return (
    <main className="min-h-screen bg-[#fbfbfd] flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center pt-24 pb-12 px-4 relative">
        {/* Background blobs for Apple vibe */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0066cc]/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#34c759]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="apple-glass rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-black/5 w-full max-w-md relative z-10 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,102,204,0.08)]" style={{ padding: '48px' }}>
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-[#1d1d1f] mb-2 tracking-tight">
              {step === 1 ? "Welcome Back" : "Authenticator"}
            </h1>
            <p className="text-[#1d1d1f]/60 font-medium">
              {step === 1 ? "Sign in to access your eCity account." : "Enter your 6-digit verification PIN."}
            </p>
          </div>

          {error && (
            <div className="bg-[#ff3b30]/10 text-[#ff3b30] border border-[#ff3b30]/20 rounded-xl p-3 text-sm font-medium mb-6 text-center">
              {error}
            </div>
          )}

          {step === 1 ? (
            <form onSubmit={handleLoginSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-[#1d1d1f]/80 mb-2">Email</label>
                <input 
                  type="email" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-black/5 rounded-xl px-4 py-3.5 text-[#1d1d1f] focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] transition-all shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
                  placeholder="name@example.com"
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-semibold text-[#1d1d1f]/80">Password</label>
                  <a href="#" className="text-xs text-[#0066cc] font-medium hover:underline">Forgot?</a>
                </div>
                <input 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white border border-black/5 rounded-xl px-4 py-3.5 text-[#1d1d1f] focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] transition-all shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
                  placeholder="••••••••"
                />
              </div>

              <button type="submit" className="w-full btn-primary py-3.5 text-lg justify-center shadow-[0_10px_20px_rgba(0,102,204,0.2)]">
                Sign In
              </button>

              <div className="text-center mt-6">
                <span className="text-[#1d1d1f]/60 text-sm font-medium">New to eCity? </span>
                <Link href="/register" className="text-[#0066cc] text-sm font-semibold hover:underline">
                  Join Free
                </Link>
              </div>
            </form>
          ) : (
            <form onSubmit={handleAuthSubmit} className="space-y-8 flex flex-col items-center">
              <div className="flex gap-2 justify-center w-full">
                {pin.map((digit, i) => (
                  <input
                    key={i}
                    id={`pin-${i}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handlePinChange(i, e.target.value)}
                    className="w-12 h-14 text-center text-2xl font-bold bg-white border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#34c759]/30 focus:border-[#34c759] transition-all shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
                  />
                ))}
              </div>
              
              <button type="submit" className="w-full btn-primary bg-[#34c759] py-3.5 text-lg justify-center shadow-[0_10px_20px_rgba(52,199,89,0.2)]">
                Verify & Login
              </button>

              <button 
                type="button" 
                onClick={() => setStep(1)} 
                className="text-sm font-medium text-[#1d1d1f]/50 hover:text-[#1d1d1f]"
              >
                Go Back
              </button>
            </form>
          )}
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
