"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ResetPasswordPage() {
  return (
    <main className="min-h-screen bg-[#fbfbfd] flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center pt-24 pb-12 px-4">
        <div className="max-w-md w-full bg-white border border-black/10 rounded-2xl p-8 text-center">
          <h1 className="text-2xl font-bold mb-3">Password Reset</h1>
          <p className="text-[#1d1d1f]/60">Password reset via mobile OTP will be enabled in the next release.</p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
