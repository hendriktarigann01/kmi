import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import ProductShowcase from "@/components/sections/ProductShowcase";
import ValueProps from "@/components/sections/ValueProps";
import WhyKMI from "@/components/sections/WhyKMI";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <ProductShowcase />
      <ValueProps />
      <WhyKMI />
      <CTA />
      <Footer />
    </main>
  );
}
