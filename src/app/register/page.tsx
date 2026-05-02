"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase";
import { supabase } from "@/lib/supabase";

declare global {
  interface Window {
    grecaptcha?: {
      enterprise?: {
        ready: (cb: () => void) => void;
        execute: (siteKey: string, options: { action: string }) => Promise<string>;
      };
    };
  }
}

export default function Register() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmation, setConfirmation] = useState<ConfirmationResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const recaptchaRef = useRef<RecaptchaVerifier | null>(null);


  const sendOtp = async () => {
    setError("");
    setLoading(true);
    try {
      if (!username.trim()) throw new Error("Username is required");
      if (!/^\+[1-9]\d{7,14}$/.test(mobile.trim())) {
        throw new Error("Use valid phone in E.164 format, e.g. +919876543210");
      }

      const auth = getFirebaseAuth();
      recaptchaRef.current?.clear();
      recaptchaRef.current = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "normal",
        callback: () => {
          // solved
        },
        "expired-callback": () => {
          setError("reCAPTCHA expired. Please verify again.");
        },
      });
      await recaptchaRef.current.render();

      const result = await signInWithPhoneNumber(auth, mobile.trim(), recaptchaRef.current);
      setConfirmation(result);
    } catch (e: any) {
      if (e?.code === "auth/invalid-app-credential") {
        setError(`Invalid app credential. Ensure Firebase Auth authorized domains include ${window.location.hostname} and API key restrictions allow Identity Toolkit.`);
      } else {
        setError(e?.message || "Failed to send OTP");
      }
    } finally {
      setLoading(false);
    }
  };

  const verifyAndCreate = async () => {
    if (!confirmation) return;
    setLoading(true);
    setError("");
    try {
      const cred = await confirmation.confirm(otp);
      const uid = cred.user.uid;
      const { error: profileError } = await supabase.from("profiles").upsert({ id: uid, username, mobile });
      if (profileError) throw profileError;
      router.replace("/dashboard");
    } catch (e: any) {
      setError(e?.message || "Failed to verify OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#fbfbfd] flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center pt-24 pb-12 px-4">
        <div className="apple-glass rounded-[2rem] border border-black/5 w-full max-w-md" style={{ padding: "48px" }}>
          <h1 className="text-3xl font-bold mb-2">Register</h1>
          {error && <div className="bg-red-50 text-red-600 p-2 rounded mb-4 text-sm">{error}</div>}
          <div className="space-y-4">
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="w-full border rounded-xl px-4 py-3" />
            <input type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="+91XXXXXXXXXX" className="w-full border rounded-xl px-4 py-3" />
            {!confirmation ? (
              <button onClick={sendOtp} disabled={loading} className="w-full btn-primary py-3">{loading ? "Sending..." : "Send OTP"}</button>
            ) : (
              <>
                <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP" className="w-full border rounded-xl px-4 py-3" />
                <button onClick={verifyAndCreate} disabled={loading} className="w-full btn-primary py-3">{loading ? "Verifying..." : "Verify & Create"}</button>
              </>
            )}
            <div id="recaptcha-container" />
          </div>
          <div className="mt-4 text-sm">Already have account? <Link href="/login" className="text-blue-600">Login</Link></div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
