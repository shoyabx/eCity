"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { normalizePhoneE164, signUpWithPhone, upsertProfile } from "@/lib/supabase";

export default function Register() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setLoading(true);

    if (!username.trim()) return setError("Username is required."), setLoading(false);
    if (!mobile.trim()) return setError("Mobile number is required."), setLoading(false);
    if (!password) return setError("Password is required."), setLoading(false);
    if (password.length < 6) return setError("Password must be at least 6 characters."), setLoading(false);
    if (password !== confirmPassword) return setError("Passwords do not match."), setLoading(false);

    try {
      const phone = normalizePhoneE164(mobile.trim());
      const { data, error: signUpError } = await signUpWithPhone(phone, password, username.trim());

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      if (!data.user) {
        setError("Signup failed. Please try again.");
        return;
      }

      const { error: profileError } = await upsertProfile(data.user.id, username.trim(), phone);
      if (profileError) {
        setError(profileError.message);
        return;
      }

      if (data.session) {
        setSuccessMessage("Account created. Redirecting to dashboard...");
        router.replace("/dashboard");
        return;
      }

      setSuccessMessage("Account created. Verify OTP to continue.");
      router.replace(`/login?phone=${encodeURIComponent(phone)}&verify=1`);
    } catch (err: any) {
      setError(err?.message || "Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#fbfbfd] flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center pt-32 pb-20 px-4 relative">
        <div className="apple-glass rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-black/5 w-full max-w-md relative z-10" style={{ padding: "48px" }}>
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-[#1d1d1f] mb-2 tracking-tight">Create Account</h1>
            <p className="text-[#1d1d1f]/60 font-medium">Username, mobile, and password only.</p>
          </div>

          {error && <div className="bg-[#ff3b30]/10 text-[#ff3b30] border border-[#ff3b30]/20 rounded-xl p-3 text-sm font-medium mb-6 text-center">{error}</div>}
          {successMessage && <div className="bg-[#34c759]/10 text-[#34c759] border border-[#34c759]/20 rounded-xl p-3 text-sm font-medium mb-6 text-center">{successMessage}</div>}

          <form onSubmit={handleSignupSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-[#1d1d1f]/80 mb-2">Username *</label>
              <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-white border border-black/5 rounded-xl px-4 py-3.5" placeholder="Enter your username" disabled={loading} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#1d1d1f]/80 mb-2">Mobile Number *</label>
              <input type="tel" required value={mobile} onChange={(e) => setMobile(e.target.value)} className="w-full bg-white border border-black/5 rounded-xl px-4 py-3.5" placeholder="+91XXXXXXXXXX" disabled={loading} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#1d1d1f]/80 mb-2">Password *</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-white border border-black/5 rounded-xl px-4 py-3.5" placeholder="At least 6 characters" disabled={loading} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#1d1d1f]/80 mb-2">Confirm Password *</label>
              <input type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full bg-white border border-black/5 rounded-xl px-4 py-3.5" placeholder="Confirm password" disabled={loading} />
            </div>
            <button type="submit" disabled={loading} className="w-full btn-primary py-4 text-lg justify-center disabled:opacity-50">{loading ? "Creating Account..." : "Sign Up"}</button>
            <div className="text-center mt-6">
              <span className="text-[#1d1d1f]/60 text-sm font-medium">Already have an account? </span>
              <Link href="/login" className="text-[#0066cc] text-sm font-semibold hover:underline">Sign In</Link>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </main>
  );
}
