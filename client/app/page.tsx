"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Lightbulb,
  Lock,
  UserCheck,
  Calendar,
  Globe,
  Plus,
  Minus,
} from "lucide-react";
import {
  ExpandableCard,
  ExpandableCardBody,
  ExpandableCardContent,
  ExpandableCardDescription,
  ExpandableCardExpandContainer,
  ExpandableCardImage,
  ExpandableCardTitle,
} from "@/components/ui/expandable-card";

// FAQ Item Component
function FAQItem({
  question,
  answer,
  isOpen,
  onClick,
  hasButton,
  buttonText,
  buttonText2,
  buttonType,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  hasButton?: boolean;
  buttonText?: string;
  buttonText2?: string;
  buttonType?: string;
}) {
  return (
    <div className="bg-white/95 backdrop-blur rounded-3xl overflow-hidden border border-white/20 transition-all duration-300 hover:border-white/40">
      <button
        onClick={onClick}
        className="w-full px-8 py-6 flex items-center justify-between text-left"
      >
        <span className="text-lg font-semibold text-foreground pr-4">
          {question}
        </span>
        <div className="shrink-0">
          {isOpen ? (
            <Minus className="text-foreground" size={24} />
          ) : (
            <Plus className="text-foreground" size={24} />
          )}
        </div>
      </button>
      {isOpen && (
        <div className="px-8 pb-6">
          <p
            className={`text-foreground leading-relaxed ${
              hasButton ? "mb-6" : ""
            }`}
          >
            {answer}
          </p>
          {hasButton && buttonType === "outline" && (
            <button className="px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-hover transition">
              {buttonText}
            </button>
          )}
          {hasButton && buttonType === "double" && (
            <div className="flex gap-4 flex-wrap">
              <button className="px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-hover transition">
                {buttonText}
              </button>
              <button className="px-6 py-3 border-2 border-primary text-primary rounded-full font-semibold hover:bg-primary/10 transition">
                {buttonText2}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "O que é o nosso projeto?",
      answer:
        "Nosso projeto surge com o intuito de trazer o mercado de trabalho mais para perto da faculdade, por meio de mentoria, palestras, eventos e projetos. Vamos construir uma base sólida para o setor de tecnologia do nosso país através da conexão entre estudantes e profissionais e pesquisadores experientes.",
      hasButton: false,
    },
    {
      question: "Quem pode participar?",
      answer:
        "Nesse momento inicial, nosso movimento focará em duas universidades Universidade Federal da Paraíba (UFPB) e Universidade Federal de Campina Grande (UFCG). Vamos selecionar 50 alunos dessas duas instituições para fazer parte de nossa primeira turma. Caso sua universidade não esteja inclusa, você pode preencher o form de interesse abaixo! Vamos estar expandindo o programa em breve.",
      hasButton: true,
      buttonText: "Quero na minha universidade",
      buttonType: "outline",
    },
    {
      question: "O que é uma Mentoria?",
      answer:
        "A mentoria é um processo prático de troca de conhecimento, no qual uma pessoa com experiência (Mentor) ajuda outra pessoa (Mentorado) a desenvolver os seus objetivos pessoais e as suas habilidades por meio de conversas e de encontros.",
      hasButton: false,
    },
    {
      question: "Qual é o papel do Mentor?",
      answer:
        "O papel do mentor é participar do processo com o seu mentorado e fornecer orientação e apoio com base em sua experiência pessoal de vida, tanto acadêmica quanto sobre o mercado de trabalho, a fim de ajudar o mentorado a se desenvolver e tomar as melhores decisões.",
      hasButton: false,
    },
    {
      question: "Por que Alumni?",
      answer:
        "O Alumni de um curso é formado por pessoas que já terminaram a graduação e por isso são suspeitas a falar acerca da vida acadêmica e dos caminhos possíveis a serem tomados a partir da graduação. Além disso, o fato de ouvir histórias de sucesso de pessoas que vieram do mesmo curso em que você está inserido é uma incrível forma de motivar os estudantes a buscarem ir ainda mais longe.",
      hasButton: false,
    },
    {
      question: "Como participar?",
      answer:
        "Ficamos muito felizes em saber que você se interessou! Para participar basta estar alinhado a algum dos perfis que estamos buscando e por conta disso precisamos te conhecer um pouco mais...",
      hasButton: true,
      buttonText: "Seja Mentorado",
      buttonText2: "Seja Mentor",
      buttonType: "double",
    },
    {
      question: "Como são feitas as turmas para cada Mentor?",
      answer:
        "Considerando as muitas áreas da tecnologia, buscamos alinhar áreas de interesses dos mentorados com áreas de atuação dos mentores, assim expondo a experiência de quem já vive aquela realidade e pavimentando um eventual caminho para sua inserção.",
      hasButton: false,
    },
    {
      question: "Quais são os critérios para seleção dos Mentorandos?",
      answer:
        "A seleção será baseada no perfil dos candidatos apresentado por meio de suas respostas e experiências compartilhadas. Buscamos pessoas interessadas, dedicadas e protagonistas com suas carreiras, alunos que sempre buscam fazer mais pela sua comunidade.",
      hasButton: false,
    },
    {
      question: "Quanto tempo dura uma turma de Mentoria?",
      answer:
        "Um semestre podendo estender independentemente e a critério dos mentorandos.",
      hasButton: false,
    },
  ];

  return (
    <div className="min-h-screen bg-white text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 bg-white backdrop-blur-md rounded-full my-4 px-6 border border-white/20">
            <div className="flex items-center gap-3">
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
            </div>

            <div className="hidden md:flex gap-8 text-primary font-bold">
              <a
                href="#sobre"
                className="hover:scale-107 transition-transform duration-200"
              >
                Sobre
              </a>
              <a
                href="#depoimentos"
                className="hover:scale-107 transition-transform duration-200"
              >
                Depoimentos
              </a>
              <a
                href="#mentors"
                className="hover:scale-107 transition-transform duration-200"
              >
                Mentores
              </a>
              <a
                href="#faq"
                className="hover:scale-107 transition-transform duration-200"
              >
                FAQ
              </a>
              <a
                href="#universities"
                className="hover:scale-107 transition-transform duration-200"
              >
                Universidades
              </a>
            </div>

            <button className="px-6 py-2 bg-accent text-accent-foreground rounded-full font-semibold hover:scale-107 transition text-sm">
              Participe
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-primary via-primary to-purple-600 overflow-hidden pt-40 pb-40">
        {/* Background patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-accent rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl font-bold mb-4 text-white leading-tight">
              <span className="block">Conectando</span>
              <span className="block">Alunos, Sonhos e Futuro</span>
            </h1>

            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
              Trazemos a experiência e a prática para potencializar alunos do
              ensino superior em cursos de tecnologia
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-white text-primary rounded-full font-bold hover:shadow-2xl transition">
                PARTICIPE
              </button>
              <button className="px-8 py-3 border-2 border-white text-white rounded-full font-bold hover:bg-white/10 transition">
                SAIBA MAIS
              </button>
            </div>
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

      {/* Sobre Section */}
      <section id="sobre" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-primary font-semibold mb-2">Quem somos</p>
              <h2 className="text-4xl font-bold mb-6">Sobre o momento</h2>
              <p className="text-foreground text-lg mb-6 leading-relaxed">
                O <span className="font-semibold text-foreground">Momento</span>{" "}
                é um movimento que conecta estudantes universitários ao mercado
                de trabalho, preparando-os para carreiras de impacto.
              </p>
              <p className="text-foreground text-lg leading-relaxed">
                Ex-alunos e profissionais comprometidos compartilham suas
                experiências, fortalecendo comunidades que colaboram com a
                educação e o futuro do Brasil como protagonista em tecnologia.
              </p>
              <br />
              <p className="text-foreground text-lg leading-relaxed">
                O sucesso do Momento é medido pela prosperidade de novas
                empresas e profissionais que cresceram através desses
                relacionamentos.
              </p>
            </div>

            <div className="relative h-96 rounded-2xl overflow-hidden border-4 border-primary/20">
              <Image
                src="/sobre_photo.jpeg"
                alt="Momento"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Join Section with Mentors */}
      <section id="mentors" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <p className="text-primary font-semibold mb-2">Faça parte</p>
          <h2 className="text-4xl font-bold mb-6">Junte-se ao Momento!</h2>
          <p className="text-foreground text-lg mb-6 leading-relaxed">
            O Momento é formado por alunos e ex-alunos de universidades públicas
            brasileiras. Contamos com o apoio de empresas e de organizações
            alinhadas ao nosso propósito com a educação.Nosso principal meio de
            comunicação é a newsletter, que você pode se inscrever com seu
            e-mail.
          </p>
          <p className="text-foreground text-lg mb-12 leading-relaxed">
            Para esse momento inicial, estamos buscando dois perfis:
          </p>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {/* Mentored Card */}
            <div className="bg-primary border-2 border-primary rounded-3xl p-8">
              <div className="flex items-start gap-4 mb-6">
                <Lightbulb className="text-white shrink-0 mt-1" size={32} />
                <div>
                  <h3 className="font-bold text-xl mb-1 text-white">
                    Mentorado
                  </h3>
                  <p className="text-white/90">
                    Pessoas que desejam aprender e se conectar com profissionais
                    experientes através de palestras e mentorias.
                  </p>
                </div>
              </div>
              <button className="w-full px-6 py-3 border-2 border-white text-white rounded-full font-bold hover:bg-white/10 transition">
                SEJA MENTORADO
              </button>
            </div>

            {/* Mentors Card */}
            <div className="bg-white border-2 border-primary rounded-3xl p-8">
              <div className="flex items-start gap-4 mb-6">
                <Lock className="text-primary shrink-0 mt-1" size={32} />
                <div>
                  <h3 className="font-bold text-xl mb-1 text-foreground">
                    Mentorias
                  </h3>
                  <p className="text-foreground">
                    Pessoas motivadas a ajudar compartilhando experiências ou se
                    envolvendo na organização.
                  </p>
                </div>
              </div>
              <button className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-full font-bold hover:bg-primary-hover transition">
                SEJA MENTOR
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="depoimentos" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <p className="text-primary font-semibold mb-2 text-center">
            Mudança de vida
          </p>
          <h2 className="text-4xl font-bold text-center mb-6">
            Qual o impacto da mentoria na vida das pessoas?
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mt-16">
            {/* Testimonial Card 1 - Itamar */}
            <ExpandableCard>
              <ExpandableCardBody className="border border-gray-200 hover:border-primary transition-colors">
                <div className="relative h-80 w-full overflow-hidden bg-gray-50">
                  <ExpandableCardImage
                    src="/itamar.png"
                    alt="Itamar Rocha Filho"
                    className="w-full h-full object-contain"
                  />
                </div>
                <ExpandableCardTitle className="mt-4">
                  Itamar Rocha Filho
                </ExpandableCardTitle>
                <ExpandableCardDescription>
                  Engenheiro de Software na deco
                </ExpandableCardDescription>
              </ExpandableCardBody>

              <ExpandableCardExpandContainer className="max-w-4xl">
                <div className="flex flex-col md:flex-row gap-0">
                  <div className="relative w-full md:w-60 h-96 shrink-0 overflow-hidden">
                    <ExpandableCardImage
                      src="/itamar.png"
                      alt="Itamar Rocha Filho"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="flex-1 p-8">
                    <ExpandableCardTitle className="!px-0 !mt-0">
                      Itamar Rocha Filho
                    </ExpandableCardTitle>
                    <ExpandableCardDescription className="mb-4 !px-0">
                      Engenheiro de Software na deco | Anteriormente na Google e
                      Meta
                    </ExpandableCardDescription>
                    <ExpandableCardContent className="!p-0">
                      <p className="text-foreground leading-relaxed">
                        Ter a oportunidade de aprender com pessoas mais
                        experientes e ser mentorado por ex-alunos excelentes
                        profissionais de outras universidades foi fundamental
                        para meu crescimento profissional. As mentorias me
                        ajudaram a entender melhor o mercado de trabalho e a
                        traçar um caminho claro para alcançar meus objetivos de
                        carreira.
                      </p>
                    </ExpandableCardContent>
                  </div>
                </div>
              </ExpandableCardExpandContainer>
            </ExpandableCard>

            {/* Testimonial Card 2 - João Pedra */}
            <ExpandableCard>
              <ExpandableCardBody className="border border-gray-200 hover:border-primary transition-colors">
                <div className="relative h-80 w-full overflow-hidden bg-gray-50">
                  <ExpandableCardImage
                    src="/jpvt.png"
                    alt="João Pedra Vasconcelos"
                    className="w-full h-full object-contain"
                  />
                </div>
                <ExpandableCardTitle className="mt-4">
                  João Pedra Vasconcelos
                </ExpandableCardTitle>
                <ExpandableCardDescription>
                  Engenheiro de Software na Microsoft
                </ExpandableCardDescription>
              </ExpandableCardBody>

              <ExpandableCardExpandContainer className="max-w-4xl">
                <div className="flex flex-col md:flex-row gap-0">
                  <div className="relative w-full md:w-60 h-96 shrink-0 overflow-hidden">
                    <ExpandableCardImage
                      src="/jpvt.png"
                      alt="João Pedra Vasconcelos"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="flex-1 p-8">
                    <ExpandableCardTitle className="!px-0 !mt-0">
                      João Pedra Vasconcelos
                    </ExpandableCardTitle>
                    <ExpandableCardDescription className="mb-4 !px-0">
                      Engenheiro de Software na Microsoft | Anteriormente no MIT
                      e Amazon
                    </ExpandableCardDescription>
                    <ExpandableCardContent className="!p-0">
                      <p className="text-foreground leading-relaxed">
                        A partir das mentorias, consegui primeiramente aprender
                        quais são meus objetivos de longo prazo e aprender a
                        traçar planos para atingi-los. O apoio e a orientação
                        que recebi foram essenciais para navegar pelas
                        complexidades da carreira em tecnologia e me ajudaram a
                        tomar decisões mais conscientes sobre meu futuro
                        profissional.
                      </p>
                    </ExpandableCardContent>
                  </div>
                </div>
              </ExpandableCardExpandContainer>
            </ExpandableCard>

            {/* Testimonial Card 3 - Lara */}
            <ExpandableCard>
              <ExpandableCardBody className="border border-gray-200 hover:border-primary transition-colors">
                <div className="relative h-80 w-full overflow-hidden bg-gray-50">
                  <ExpandableCardImage
                    src="/lara.png"
                    alt="Lara di Cavalcanti Pontes"
                    className="w-full h-full object-contain"
                  />
                </div>
                <ExpandableCardTitle className="mt-4">
                  Lara di Cavalcanti Pontes
                </ExpandableCardTitle>
                <ExpandableCardDescription>
                  Researcher @ LOG UFPB
                </ExpandableCardDescription>
              </ExpandableCardBody>

              <ExpandableCardExpandContainer className="max-w-4xl">
                <div className="flex flex-col md:flex-row gap-0">
                  <div className="relative w-full md:w-60 h-96 shrink-0 overflow-hidden">
                    <ExpandableCardImage
                      src="/lara.png"
                      alt="Lara di Cavalcanti Pontes"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="flex-1 p-8">
                    <ExpandableCardTitle className="!px-0 !mt-0">
                      Lara di Cavalcanti Pontes
                    </ExpandableCardTitle>
                    <ExpandableCardDescription className="mb-4 !px-0">
                      Researcher @ LOG UFPB
                    </ExpandableCardDescription>
                    <ExpandableCardContent className="!p-0">
                      <p className="text-foreground leading-relaxed">
                        Conversar com gente que me inspira se mostrou a
                        estratégia mais transformadora para o meu planejamento
                        de carreira. Às vezes, essas pessoas oferecem um passo a
                        passo prático, outras vezes compartilham suas
                        experiências e desafios. Independente da forma, sempre
                        saio dessas conversas com mais clareza sobre onde quero
                        chegar e como fazer para alcançar meus objetivos.
                      </p>
                    </ExpandableCardContent>
                  </div>
                </div>
              </ExpandableCardExpandContainer>
            </ExpandableCard>
          </div>
        </div>
      </section>

      {/* O que fazemos Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-primary via-primary to-purple-600 mx-4 rounded-3xl my-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-accent font-bold mb-4 text-sm tracking-wider">
              O QUE FAZEMOS
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Experiência e aprendizado em um só lugar
            </h2>
            <p className="text-white/90 text-lg max-w-3xl mx-auto">
              Mentorias, eventos exclusivos e uma comunidade que impulsiona seu
              crescimento
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Mentorias Card */}
            <div className="bg-white/95 backdrop-blur rounded-3xl p-8 hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-6">
                <UserCheck className="text-accent" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Mentorias
              </h3>
              <p className="text-foreground leading-relaxed">
                Explore uma comunidade de especialistas que já trilharam o
                caminho para o sucesso. Receba dicas e conselhos de pessoas
                experientes que atingiram seus objetivos e podem te auxiliar a
                alcançar os seus.
              </p>
            </div>

            {/* Eventos Exclusivos Card */}
            <div className="bg-white/95 backdrop-blur rounded-3xl p-8 hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-6">
                <Calendar className="text-accent" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Eventos Exclusivos
              </h3>
              <p className="text-foreground leading-relaxed">
                Conecte-se com empresas renomadas e amplie sua rede de contatos
                profissionais. Que tal fazer networking com algumas das melhores
                do mercado e expandir suas oportunidades de negócios?
              </p>
            </div>

            {/* Comunidade Card */}
            <div className="bg-white/95 backdrop-blur rounded-3xl p-8 hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-6">
                <Globe className="text-accent" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Comunidade
              </h3>
              <p className="text-foreground leading-relaxed">
                Trabalhe em colaboração com outros estudantes e especialistas
                para alcançar seus objetivos juntos. Una forças com seus colegas
                e profissionais para atingir novos patamares e conquistas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Eventos Passados Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-primary font-bold mb-4 text-sm tracking-wider">
              QUEM SOMOS
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Eventos passados
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Placeholder for event cards - você pode adicionar conteúdo depois */}
            <div className="bg-gray-50 border-2 border-gray-200 rounded-3xl p-8 text-center min-h-[300px] flex items-center justify-center">
              <p className="text-muted-foreground">
                Evento 1 - Em breve com mais detalhes
              </p>
            </div>
            <div className="bg-gray-50 border-2 border-gray-200 rounded-3xl p-8 text-center min-h-[300px] flex items-center justify-center">
              <p className="text-muted-foreground">
                Evento 2 - Em breve com mais detalhes
              </p>
            </div>
            <div className="bg-gray-50 border-2 border-gray-200 rounded-3xl p-8 text-center min-h-[300px] flex items-center justify-center">
              <p className="text-muted-foreground">
                Evento 3 - Em breve com mais detalhes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mentores Section */}
      <section id="mentors" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-primary font-bold mb-4 text-sm tracking-wider">
              QUEM SOMOS
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Mentores
            </h2>
            <p className="text-foreground text-lg max-w-3xl mx-auto">
              Conheça alguns dos profissionais que participam do movimento como
              mentores
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Mentor Card 1 - Fanny Vieira */}
            <div className="bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-primary transition-all duration-300 hover:shadow-lg">
              <div className="relative h-80 w-full overflow-hidden bg-gray-100">
                <Image
                  src="/fanny.jpg"
                  alt="Fanny Vieira"
                  fill
                  className="object-cover object-center"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Fanny Vieira
                </h3>
                <p className="text-foreground text-sm leading-relaxed">
                  Senior Software Engineer @ Pokémon
                  <br />
                  Cientista da Computação pela UFCG
                </p>
              </div>
            </div>

            {/* Mentor Card 2 - Daniel Bastos */}
            <div className="bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-primary transition-all duration-300 hover:shadow-lg">
              <div className="relative h-80 w-full overflow-hidden bg-gray-100">
                <Image
                  src="/daniel.jpg"
                  alt="Daniel Bastos"
                  fill
                  className="object-cover object-center"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Daniel Bastos
                </h3>
                <p className="text-foreground text-sm leading-relaxed">
                  Software Engineer @ Meta
                  <br />
                  Cientista da Computação pela UFPE
                </p>
              </div>
            </div>

            {/* Mentor Card 3 - Marcos Candeia */}
            <div className="bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-primary transition-all duration-300 hover:shadow-lg">
              <div className="relative h-80 w-full overflow-hidden bg-gray-100">
                <Image
                  src="/marcos.jpg"
                  alt="Marcos Candeia"
                  fill
                  className="object-cover object-center"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Marcos Candeia
                </h3>
                <p className="text-foreground text-sm leading-relaxed">
                  Senior Software Engineer @ deco.cx
                  <br />
                  Cientista da Computação pela UFCG
                </p>
              </div>
            </div>

            {/* Mentor Card 4 - Mateus Antonio */}
            <div className="bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-primary transition-all duration-300 hover:shadow-lg">
              <div className="relative h-80 w-full overflow-hidden bg-gray-100">
                <Image
                  src="/mateus.jpg"
                  alt="Mateus Antonio"
                  fill
                  className="object-cover object-center"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Mateus Antonio
                </h3>
                <p className="text-foreground text-sm leading-relaxed">
                  Software Analyst @ Eldorado Research
                </p>
              </div>
            </div>

            {/* Mentor Card 5 - Lara Pontes */}
            <div className="bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-primary transition-all duration-300 hover:shadow-lg">
              <div className="relative h-80 w-full overflow-hidden bg-gray-100">
                <Image
                  src="/lara-mentor.jpg"
                  alt="Lara Pontes"
                  fill
                  className="object-cover object-center"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Lara Pontes
                </h3>
                <p className="text-foreground text-sm leading-relaxed">
                  Researcher @ LOG
                </p>
              </div>
            </div>

            {/* Mentor Card 6 - Marianne Monteiro */}
            <div className="bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-primary transition-all duration-300 hover:shadow-lg">
              <div className="relative h-80 w-full overflow-hidden bg-gray-100">
                <Image
                  src="/marianne.jpg"
                  alt="Marianne Monteiro"
                  fill
                  className="object-cover object-center"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Marianne Monteiro
                </h3>
                <p className="text-foreground text-sm leading-relaxed">
                  Research Engineer @ DeepMind
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section
        id="faq"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-primary via-primary to-purple-600 mx-4 rounded-3xl my-8"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-accent font-bold mb-4 text-sm tracking-wider">
              FAQs
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Tem dúvidas?
            </h2>
            <p className="text-white/90 text-lg">
              Frequently Asked Questions | Perguntas frequentes
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFAQ === index}
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                hasButton={faq.hasButton}
                buttonText={faq.buttonText}
                buttonText2={faq.buttonText2}
                buttonType={faq.buttonType}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Mantenedores e Universidades Section */}
      <section
        id="universities"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-200"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-16 items-center relative">
            {/* Universidades */}
            <div className="text-center">
              <h3 className="text-3xl font-bold text-foreground mb-12">
                Onde o momento já chegou
              </h3>
              <div className="flex justify-center items-center gap-8 flex-wrap">
                <div className="w-24">
                  <Image
                    src="/ufpb.png"
                    alt="UFPB"
                    width={96}
                    height={96}
                    className="w-full h-auto"
                  />
                </div>
                <div className="w-24">
                  <Image
                    src="/ufcg.png"
                    alt="UFCG"
                    width={96}
                    height={96}
                    className="w-full h-auto"
                  />
                </div>
                <div className="w-24">
                  <Image
                    src="/uepb.png"
                    alt="UEPB"
                    width={96}
                    height={96}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
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
