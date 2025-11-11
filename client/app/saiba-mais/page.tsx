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
                  src="/logo-momento.png"
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
                conecta alumni de sucesso com estudantes universitários, criando
                uma rede de apoio, aprendizado e crescimento mútuo. Não somos
                apenas um programa de mentoria - somos uma comunidade que
                acredita no poder da educação e da colaboração para transformar
                vidas e construir o futuro da tecnologia no Brasil.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Nossa Missão */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Missão */}
            <div className="bg-white rounded-3xl p-8 border-2 border-primary/20 hover:border-primary/40 transition-all">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-8 h-8 text-primary"
                >
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Nossa Missão
              </h3>
              <p className="text-foreground leading-relaxed">
                Conectar estudantes universitários com profissionais experientes
                através de mentorias, eventos e projetos, preparando-os para
                carreiras de impacto e contribuindo para a formação de
                profissionais de excelência.
              </p>
            </div>

            {/* Visão */}
            <div className="bg-white rounded-3xl p-8 border-2 border-primary/20 hover:border-primary/40 transition-all">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-8 h-8 text-primary"
                >
                  <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                  <path
                    fillRule="evenodd"
                    d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Nossa Visão
              </h3>
              <p className="text-foreground leading-relaxed">
                Ser referência nacional em desenvolvimento de talentos em
                tecnologia, construindo uma rede forte de profissionais que
                colaboram para tornar o Brasil protagonista no cenário
                tecnológico mundial.
              </p>
            </div>

            {/* Valores */}
            <div className="bg-white rounded-3xl p-8 border-2 border-primary/20 hover:border-primary/40 transition-all">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-8 h-8 text-primary"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Nossos Valores
              </h3>
              <p className="text-foreground leading-relaxed">
                Colaboração, excelência, comunidade e impacto. Acreditamos no
                poder da educação compartilhada e no fortalecimento de laços
                entre gerações para criar um futuro melhor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* O que nos move */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto">
            <p className="text-primary font-semibold mb-2">Nosso propósito</p>
            <h2 className="text-4xl font-bold mb-8">O que nos move</h2>

            <div className="bg-primary rounded-3xl p-8 md:p-12 text-white">
              <div className="space-y-6 text-lg leading-relaxed">
                <p>
                  Acreditamos que o Brasil tem um potencial imenso em
                  tecnologia. Nossas universidades públicas formam profissionais
                  de altíssima qualidade, mas muitos desses talentos não têm
                  acesso às oportunidades e orientações necessárias para atingir
                  seu potencial máximo.
                </p>

                <p className="font-semibold text-xl text-accent">
                  Nossa meta é simples: democratizar o acesso à mentoria de
                  qualidade.
                </p>

                <p>
                  Queremos que todo estudante, independente de sua origem ou
                  universidade, tenha a chance de aprender com quem já trilhou o
                  caminho, de fazer networking com profissionais de excelência e
                  de ter clareza sobre as possibilidades de carreira que existem
                  - seja na academia, em grandes empresas, startups ou
                  empreendendo.
                </p>

                <p>
                  O Momento é sobre criar pontes. Pontes entre gerações, entre
                  universidades e mercado, entre sonhos e realização. É sobre
                  construir uma comunidade forte que se apoia mutuamente e que
                  trabalha junta para fazer do Brasil uma referência global em
                  tecnologia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Como funcionamos */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-primary via-primary to-purple-600">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-accent font-bold mb-4 text-sm tracking-wider">
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
