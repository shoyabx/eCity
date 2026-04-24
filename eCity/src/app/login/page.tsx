"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { signIn, resetPassword } from "@/lib/supabase";

export default function Login() {
  const router = useRouter();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!username.trim()) {
      setError("Username is required.");
      setLoading(false);
      return;
    }

    if (!password) {
      setError("Password is required.");
      setLoading(false);
      return;
    }

    try {
      // Try to find user by username in local storage first
      const usersStr = localStorage.getItem("ecity_users");
      const users = usersStr ? JSON.parse(usersStr) : [];
      const userRecord = users.find((u: any) => u.username === username.trim());

      if (!userRecord) {
        setError("Invalid username or password.");
        setLoading(false);
        return;
      }

      // Attempt Supabase login with stored email
      const { data, error: signInError } = await signIn(userRecord.email, password);
      
      if (signInError) {
        setError("Invalid username or password.");
        setLoading(false);
        return;
      }

      if (data.user) {
        // Update last login
        userRecord.lastLogin = new Date().toISOString();
        localStorage.setItem("ecity_users", JSON.stringify(users));
        localStorage.setItem("ecity_active_user", JSON.stringify({ 
          id: data.user.id,
          username: userRecord.username,
          email: userRecord.email 
        }));
        localStorage.setItem("ecity_verified", "true");
        
        setSuccessMessage("Login successful! Redirecting...");
        
        // Redirect to home
        setTimeout(() => {
          router.push("/");
        }, 1000);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Find user by username to get their email
    const usersStr = localStorage.getItem("ecity_users");
    const users = usersStr ? JSON.parse(usersStr) : [];
    const userRecord = users.find((u: any) => u.username === username.trim());

    if (!userRecord) {
      setError("Username not found.");
      setLoading(false);
      return;
    }

    try {
      const { error: resetError } = await resetPassword(userRecord.email);
      
      if (resetError) {
        setError(resetError.message);
      } else {
        setSuccessMessage("Password reset link sent to your email! Check your inbox.");
        setTimeout(() => {
          setError("");
          setSuccessMessage("");
        }, 3000);
      }
    } catch (err) {
      setError("Failed to send reset email. Please try again.");
    } finally {
      setLoading(false);
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
              Welcome Back
            </h1>
            <p className="text-[#1d1d1f]/60 font-medium">
              Sign in to access your eCity account.
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

          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-[#1d1d1f]/80 mb-2">Username</label>
              <input 
                type="text"
                required 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white border border-black/5 rounded-xl px-4 py-3.5 text-[#1d1d1f] focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] transition-all shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
                placeholder="Enter your username"
                disabled={loading}
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-semibold text-[#1d1d1f]/80">Password</label>
                <button 
                  type="button"
                  onClick={() => {
                    if (!username.trim()) {
                      setError("Please enter your username first.");
                      return;
                    }
                    handleForgotPassword({ preventDefault: () => {} } as any);
                  }}
                  className="text-xs text-[#0066cc] font-medium hover:underline bg-transparent border-none cursor-pointer"
                >
                  Forgot?
                </button>
              </div>
              <input 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white border border-black/5 rounded-xl px-4 py-3.5 text-[#1d1d1f] focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] transition-all shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
                placeholder="Enter your password"
                disabled={loading}
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full btn-primary py-3.5 text-lg justify-center shadow-[0_10px_20px_rgba(0,102,204,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            <div className="text-center mt-6">
              <span className="text-[#1d1d1f]/60 text-sm font-medium">New to eCity? </span>
              <Link href="/register" className="text-[#0066cc] text-sm font-semibold hover:underline">
                Join Free
              </Link>
            </div>
          </form>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
