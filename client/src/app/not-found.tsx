import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NotFoundMessage from "@/components/NotFoundMessage";

/**
 * 404 do site — qualquer endereço que não casa com uma rota, incluindo
 * `/blog/<slug>` de um post que não existe.
 *
 * Componente de servidor: o Next só usa este arquivo como 404 global se ele não
 * for de cliente. A parte que precisa do idioma é filha, um componente de
 * cliente.
 */
export default function NotFound() {
  return (
    <main className="relative z-[1] min-h-screen">
      <Navbar />

      <section className="px-[5vw] pt-32 pb-24 md:pt-36 flex flex-col items-center text-center">
        <NotFoundMessage />
      </section>

      <Footer />
    </main>
  );
}
