"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { resetPassword } from "@/lib/supabase";

export default function ResetPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email.trim()) {
      setError("Email is required.");
      setLoading(false);
      return;
    }

    try {
      const { error: resetError } = await resetPassword(email);
      
      if (resetError) {
        setError(resetError.message);
        setLoading(false);
        return;
      }

      setSuccessMessage("Password reset link sent to your email! Check your inbox.");
      setEmail("");
      setLoading(false);
      
      // Auto redirect after 5 seconds
      setTimeout(() => {
        router.push("/login");
      }, 5000);
    } catch (err) {
      setError("Failed to send reset email. Please try again.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#fbfbfd] flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center pt-24 pb-12 px-4 relative">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0066cc]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#34c759]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="apple-glass rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-black/5 w-full max-w-md relative z-10 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,102,204,0.08)]" style={{ padding: "48px" }}>
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-[#1d1d1f] mb-2 tracking-tight">
              Reset Password
            </h1>
            <p className="text-[#1d1d1f]/60 font-medium">
              Enter your email to receive a reset link
            </p>
          </div>

          {error && (
            <div className="bg-[#ff3b30]/10 text-[#ff3b30] border border-[#ff3b30]/20 rounded-xl p-3 text-sm font-medium mb-6 text-center">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="bg-[#34c759]/10 text-[#34c759] border border-[#34c759]/20 rounded-xl p-3 text-sm font-medium mb-6 text-center">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleResetSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-[#1d1d1f]/80 mb-2">Email Address</label>
              <input 
                type="email"
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border border-black/5 rounded-xl px-4 py-3.5 text-[#1d1d1f] focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] transition-all shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
                placeholder="Enter your email"
                disabled={loading}
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full btn-primary py-3.5 text-lg justify-center shadow-[0_10px_20px_rgba(0,102,204,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Sending Reset Link..." : "Send Reset Link"}
            </button>

            <div className="text-center mt-6">
              <Link href="/login" className="text-[#0066cc] text-sm font-semibold hover:underline">
                ← Back to Login
              </Link>
            </div>
          </form>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
