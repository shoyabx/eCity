"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { normalizePhoneE164, signInWithPhone } from "@/lib/supabase";

export default function Login() {
  const router = useRouter();

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const phone = normalizePhoneE164(mobile.trim());
      const { data, error: signInError } = await signInWithPhone(phone, password);

      if (signInError) {
        setError("Invalid mobile or password.");
        return;
      }

      if (data.user) {
        router.replace("/dashboard");
      }
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#fbfbfd] flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center pt-24 pb-12 px-4 relative">
        <div className="apple-glass rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-black/5 w-full max-w-md relative z-10" style={{ padding: '48px' }}>
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-[#1d1d1f] mb-2 tracking-tight">Welcome Back</h1>
            <p className="text-[#1d1d1f]/60 font-medium">Sign in with mobile and password.</p>
          </div>

          {error && <div className="bg-[#ff3b30]/10 text-[#ff3b30] border border-[#ff3b30]/20 rounded-xl p-3 text-sm font-medium mb-6 text-center">{error}</div>}

          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-[#1d1d1f]/80 mb-2">Mobile Number</label>
              <input type="tel" required value={mobile} onChange={(e) => setMobile(e.target.value)} className="w-full bg-white border border-black/5 rounded-xl px-4 py-3.5" placeholder="+91XXXXXXXXXX" disabled={loading} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#1d1d1f]/80 mb-2">Password</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-white border border-black/5 rounded-xl px-4 py-3.5" placeholder="Enter your password" disabled={loading} />
            </div>

            <button type="submit" disabled={loading} className="w-full btn-primary py-3.5 text-lg justify-center disabled:opacity-50">
              {loading ? "Signing in..." : "Sign In"}
            </button>

            <div className="text-center mt-6">
              <span className="text-[#1d1d1f]/60 text-sm font-medium">New to eCity? </span>
              <Link href="/register" className="text-[#0066cc] text-sm font-semibold hover:underline">Join Free</Link>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </main>
  );
}
