"use client";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HeroLoggedIn from "@/components/HeroLoggedIn";
import HowItWorks from "@/components/HowItWorks";
import LiveValueExamples from "@/components/LiveValueExamples";
import WhyECity from "@/components/WhyECity";
import DualMarketplace from "@/components/DualMarketplace";
import Categories from "@/components/Categories";
import TrustSafety from "@/components/TrustSafety";
import Testimonials from "@/components/Testimonials";
import CityCoverage from "@/components/CityCoverage";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  const { user, loading } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Show personalized hero for logged-in users */}
        {loading ? (
          // Loading skeleton
          <div className="pt-[72px]">
            <div className="h-[600px] bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] animate-pulse" />
          </div>
        ) : user ? (
          // Logged in - personalized content
          <>
            <HeroLoggedIn userEmail={user.email} />
            <HowItWorks />
            <LiveValueExamples />
            <DualMarketplace />
            <Categories />
            <TrustSafety />
            <Testimonials />
            <CityCoverage />
          </>
        ) : (
          // Not logged in - original content
          <>
            <Hero />
            <HowItWorks />
            <LiveValueExamples />
            <WhyECity />
            <DualMarketplace />
            <Categories />
            <TrustSafety />
            <Testimonials />
            <CityCoverage />
            <FinalCTA />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}