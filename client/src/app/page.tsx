import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Testimonial from "@/components/Testimonial";
import Team from "@/components/Team";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Universities from "@/components/Universities";
import Apply from "@/components/Apply";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative z-[1] min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Testimonial />
      <Team />
      <Services />
      <CTA />
      <FAQ />
      <Universities />
      <Apply />
      <Footer />
    </main>
  );
}
