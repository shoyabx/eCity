import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
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
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
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
      </main>

      <Footer />
    </div>
  );
}
