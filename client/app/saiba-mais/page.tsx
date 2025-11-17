"use client";

import Image from "next/image";
import Link from "next/link";

export default function SaibaMais() {
  return (
    <div className="min-h-screen bg-white text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 bg-white backdrop-blur-md rounded-full my-4 px-6 border border-white/20">
            <Link
              href="/"
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
                <Image
                  src="/momentosh.png"
                  alt="Momento Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-bold text-lg text-primary hidden sm:inline">
                momento.sh
              </span>
            </Link>

            <div className="hidden md:flex gap-8 text-primary font-bold">
              <Link
                href="/#sobre"
                className="hover:scale-107 transition-transform duration-200"
              >
                Sobre
              </Link>
              <Link
                href="/#depoimentos"
                className="hover:scale-107 transition-transform duration-200"
              >
                Depoimentos
              </Link>
              <Link
                href="/#faq"
                className="hover:scale-107 transition-transform duration-200"
              >
                FAQ
              </Link>
              <Link
                href="/#universities"
                className="hover:scale-107 transition-transform duration-200"
              >
                Universidades
              </Link>
            </div>

            <Link
              href="/#mentors"
              className="px-6 py-2 bg-accent text-accent-foreground rounded-full font-semibold hover:scale-107 transition text-sm"
            >
              Participe
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-primary via-primary to-purple-600 overflow-hidden pt-40 pb-32">
        {/* Background patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-accent rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl font-bold mb-6 text-white leading-tight">
              Sobre nós
            </h1>

            <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Conheça a história, propósito e visão por trás do movimento que
              busca transformar a educação em tecnologia no Brasil
            </p>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-20 fill-white drop-shadow-lg"
            style={{ filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))" }}
          >
            <path d="M0,50 Q300,0 600,50 T1200,50 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* Nossa História */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto">
            <p className="text-primary font-semibold mb-2">Nossa história</p>
            <h2 className="text-4xl font-bold mb-8">Como tudo começou</h2>

            <div className="space-y-6 text-lg text-foreground leading-relaxed">
              <p>
                O <span className="font-semibold text-primary">Momento</span>{" "}
                nasceu da observação de uma necessidade latente: a distância
                entre o ambiente acadêmico e o mercado de trabalho em
                tecnologia. Estudantes de universidades públicas brasileiras
                muitas vezes não têm acesso a mentoria de qualidade, networking
                com profissionais experientes e orientação sobre os caminhos
                possíveis após a graduação.
              </p>

              <p>
                Percebemos que ex-alunos que alcançaram sucesso em suas
                carreiras - seja na academia, em grandes empresas de tecnologia
                ou empreendendo - possuem um conhecimento valioso que poderia
                ser compartilhado. Mas faltava uma ponte estruturada para
                conectar essas pessoas com os estudantes atuais.
              </p>

              <p>
                Foi assim que surgiu o Momento, um movimento colaborativo que
                conecta estudantes universitários com ex-alunos (Alumni) de
                sucesso, criando uma rede de apoio, aprendizado e crescimento
                mútuo. Não somos apenas um programa de mentoria - somos uma
                comunidade que acredita no poder da educação e da colaboração
                para transformar vidas e melhorar o futuro da tecnologia no
                Brasil.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Como funcionamos */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-primary via-primary to-purple-600">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-white font-bold mb-4 text-sm tracking-wider">
              NOSSA METODOLOGIA
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Como o Momento funciona
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="bg-white/95 backdrop-blur rounded-3xl p-6 text-center hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                Inscrição
              </h3>
              <p className="text-foreground text-sm leading-relaxed">
                Mentorados e mentores se inscrevem compartilhando seus perfis,
                interesses e objetivos.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white/95 backdrop-blur rounded-3xl p-6 text-center hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                Matchmaking
              </h3>
              <p className="text-foreground text-sm leading-relaxed">
                Nosso algoritmo conecta mentorados com mentores baseado em áreas
                de interesse e objetivos de carreira.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white/95 backdrop-blur rounded-3xl p-6 text-center hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                Mentorias
              </h3>
              <p className="text-foreground text-sm leading-relaxed">
                Sessões regulares de mentoria ao longo de um semestre, com
                flexibilidade para continuar.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-white/95 backdrop-blur rounded-3xl p-6 text-center hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                4
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                Comunidade
              </h3>
              <p className="text-foreground text-sm leading-relaxed">
                Eventos, palestras e networking contínuo para toda a comunidade
                Momento.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Faça parte dessa transformação
          </h2>
          <p className="text-lg text-foreground mb-8 leading-relaxed">
            Seja como mentorado buscando crescimento ou como mentor querendo
            compartilhar conhecimento, o Momento é o lugar para você fazer a
            diferença.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://lnkd.in/dnp9K_2y"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-primary text-white rounded-full font-bold hover:bg-primary-hover transition"
            >
              SEJA MENTORADO
            </a>
            <a
              href="https://lnkd.in/dXD-vnuu"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border-2 border-primary text-primary rounded-full font-bold hover:bg-primary/10 transition"
            >
              SEJA MENTOR
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-60 mb-12">
            <div>
              <h3 className="font-bold mb-4 text-lg">Momento</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Conectando alunos, sonhos e futuro através da educação em
                tecnologia
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Projeto</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Sobre
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Contato
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Social</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="https://www.linkedin.com/company/momentosh/"
                    className="hover:text-primary transition"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/momento.sh/"
                    className="hover:text-primary transition"
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
              <p>© 2025 Momento. Todos os direitos reservados.</p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-primary transition">
                  Privacidade
                </a>
                <a href="#" className="hover:text-primary transition">
                  Termos
                </a>
                <a href="#" className="hover:text-primary transition">
                  Cookies
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
