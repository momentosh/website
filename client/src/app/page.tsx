import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Plataforma from "@/components/Plataforma";
import Testimonial from "@/components/Testimonial";
import Team from "@/components/Team";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Universities from "@/components/Universities";
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
      {/* Depois de Services, que fala do programa: a ferramenta vem quando a
          pessoa já sabe do que ela é ferramenta. Antes do CTA de inscrição,
          porque quem já participa entra, e quem não participa se inscreve. */}
      <Plataforma />
      <CTA />
      <FAQ />
      <Universities />
      <Footer />
    </main>
  );
}
