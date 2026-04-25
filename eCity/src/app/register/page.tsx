"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { signUpWithProfile } from "@/lib/supabase";

export default function Register() {
  const router = useRouter();
  
  const [username, setUsername] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validate inputs
    if (!username.trim()) {
      setError("Username is required.");
      setLoading(false);
      return;
    }

    if (!mobile.trim()) {
      setError("Mobile number is required.");
      setLoading(false);
      return;
    }

    if (!password) {
      setError("Password is required.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      // Create Supabase user with email (username-based email if not provided)
      const signupEmail = email || `${username.toLowerCase().replace(/\s+/g, '.')}@ecity.local`;
      
      const { data, error: signUpError } = await signUpWithProfile(
        signupEmail,
        password,
        username.trim(),
        mobile.trim()
      );
      
      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }

      if (data?.user) {
        // Save to local storage for immediate access
        const usersStr = localStorage.getItem("ecity_users");
        const users = usersStr ? JSON.parse(usersStr) : [];
        
        const existingUserIndex = users.findIndex((u: any) => u.email === signupEmail);
        if (existingUserIndex >= 0) {
          users[existingUserIndex] = {
            id: data.user.id,
            username: username.trim(),
            mobile: mobile.trim(),
            email: signupEmail,
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString()
          };
        } else {
          users.push({
            id: data.user.id,
            username: username.trim(),
            mobile: mobile.trim(),
            email: signupEmail,
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString()
          });
        }
        
        localStorage.setItem("ecity_users", JSON.stringify(users));
        localStorage.setItem("ecity_active_user", JSON.stringify({ 
          id: data.user.id,
          username: username.trim(),
          email: signupEmail 
        }));
        localStorage.setItem("ecity_verified", "true");
        
        setSuccessMessage("Account created successfully! Redirecting...");
        
        // Auto-login and redirect to home
        setTimeout(() => {
          router.push("/");
        }, 1500);
      }
    } catch (err) {
      setError("Failed to create account. Please try again.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#fbfbfd] flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center pt-32 pb-20 px-4 relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#ff9500]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#0066cc]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="apple-glass rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-black/5 w-full max-w-md relative z-10" style={{ padding: "48px" }}>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-[#ff9500]/10 text-[#ff9500] border border-[#ff9500]/20 rounded-full px-4 py-1.5 mb-6 shadow-sm font-medium text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff9500] animate-pulse" />
              Join eCity
            </div>
            <h1 className="text-3xl font-bold text-[#1d1d1f] mb-2 tracking-tight">
              Create Account
            </h1>
            <p className="text-[#1d1d1f]/60 font-medium">
              Enter your details to get started
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

          <form onSubmit={handleSignupSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-[#1d1d1f]/80 mb-2">Username *</label>
              <input 
                type="text"
                required 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white border border-black/5 rounded-xl px-4 py-3.5 text-[#1d1d1f] text-lg font-medium focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] transition-all shadow-sm"
                placeholder="Enter your username"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1d1d1f]/80 mb-2">Mobile Number *</label>
              <input 
                type="tel"
                required 
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full bg-white border border-black/5 rounded-xl px-4 py-3.5 text-[#1d1d1f] text-lg font-medium focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] transition-all shadow-sm"
                placeholder="Enter your mobile number"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1d1d1f]/60 mb-2">Email (optional)</label>
              <input 
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border border-black/5 rounded-xl px-4 py-3.5 text-[#1d1d1f] text-lg font-medium focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] transition-all shadow-sm"
                placeholder="you@example.com (optional)"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1d1d1f]/80 mb-2">Password *</label>
              <input 
                type="password"
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white border border-black/5 rounded-xl px-4 py-3.5 text-[#1d1d1f] text-lg font-medium focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] transition-all shadow-sm"
                placeholder="At least 6 characters"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1d1d1f]/80 mb-2">Confirm Password *</label>
              <input 
                type="password"
                required 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-white border border-black/5 rounded-xl px-4 py-3.5 text-[#1d1d1f] text-lg font-medium focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] transition-all shadow-sm"
                placeholder="Confirm your password"
                disabled={loading}
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full btn-primary py-4 text-lg justify-center shadow-[0_10px_20px_rgba(0,102,204,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Sign Up"}
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
