import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Manual de Mentoria para Mentorados",
  description:
    "Guia do programa de mentorias do Momento: o que é, seus objetivos e como aproveitar ao máximo cada encontro com o seu mentor.",
  alternates: {
    canonical: "/manual-mentoria",
  },
};

const objectives = [
  {
    title: "Acelerar o desenvolvimento",
    desc: "A mentoria pode acelerar o desenvolvimento do mentorado, fornecendo-lhe insights e orientações que levariam mais tempo para serem adquiridos por conta própria. Ao aprender com quem já passou por desafios parecidos, você evita erros comuns e chega mais rápido a decisões importantes para a sua carreira.",
  },
  {
    title: "Desenvolver habilidades",
    desc: "A mentoria ajuda o mentorado a desenvolver habilidades específicas, tanto técnicas quanto comportamentais, que são importantes para seu sucesso.",
  },
  {
    title: "Expandir o conhecimento",
    desc: "O mentor compartilha seu conhecimento e experiência com o mentorado, ajudando-o a expandir sua compreensão de um determinado campo ou área de atuação.",
  },
  {
    title: "Aumentar a confiança",
    desc: "A mentoria pode aumentar a confiança do mentorado, fornecendo-lhe apoio e incentivo para perseguir seus objetivos.",
  },
  {
    title: "Promover o networking",
    desc: "A mentoria pode abrir portas para novas oportunidades de networking, conectando o mentorado a pessoas e recursos relevantes.",
  },
  {
    title: "Auxiliar na tomada de decisões",
    desc: "A mentoria pode auxiliar o mentorado na tomada de decisões importantes, fornecendo-lhe diferentes perspectivas e insights.",
  },
  {
    title: "Servir de apoio",
    desc: "A mentoria funciona como um apoio para o mentorado, onde ele pode compartilhar suas dificuldades e desafios e obter ajuda do mentor.",
  },
];

const steps = [
  {
    title: "Reflita sobre o que você gostaria de obter do relacionamento de mentoria",
    body: (
      <p className="text-[15px] md:text-base text-neutral-600 leading-relaxed">
        Com o que o seu mentor poderia lhe ajudar? No que você sente que ainda precisa se
        desenvolver? Que perguntas você gostaria de perguntar a alguém que já esteve numa
        situação profissional similar à sua? Você está enfrentando algum desafio que poderia
        utilizar ajuda do mentor?
      </p>
    ),
  },
  {
    title: "Prepare-se para suas mentorias",
    body: (
      <p className="text-[15px] md:text-base text-neutral-600 leading-relaxed">
        Você deve guiar o seu processo de mentoria, trazendo questões e pontos de discussão
        para o seu mentor. Em um primeiro momento, é importante que você e seu mentor se
        conheçam, então dediquem um tempo para apresentações e alinhamento de expectativas na
        primeira mentoria. Relate o que você gostaria de obter do relacionamento de mentoria.
        Dando prosseguimento, vale anotar perguntas e organizar a agenda das sessões com
        antecedência.
      </p>
    ),
  },
  {
    title: "Respeite o tempo das mentorias",
    body: (
      <p className="text-[15px] md:text-base text-neutral-600 leading-relaxed">
        Você deve combinar a frequência e a duração das mentorias com seu mentor. Sugerimos 6
        encontros distribuídos entre agosto e janeiro, com duração de até 50 minutos por
        sessão. Seja pontual, respeite o tempo alocado para as mentorias e foque as interações
        nesse momento.
      </p>
    ),
  },
  {
    title: "Abrace o feedback",
    body: (
      <p className="text-[15px] md:text-base text-neutral-600 leading-relaxed">
        Encare o feedback de forma leve e positiva. Você e seu mentor estão no mesmo time para
        alavancar seu potencial, logo se abra a ouvir feedbacks e coloque em prática as ações
        que fizerem sentido para você, retribuindo com insights do que funcionou ou não.
      </p>
    ),
  },
  {
    title: "Exemplos de atividades que podem ser feitas durante a mentoria",
    body: (
      <ul className="flex flex-col gap-2">
        {[
          "Dicas de currículo e preparação para processos seletivos.",
          "Revisão de código e dicas técnicas sobre uma tecnologia.",
          "Compartilhar experiências (tanto sucessos quanto fracassos).",
          "Treino de inglês.",
          "Discussão de artigos.",
          "Dicas de recursos (livros, cursos, repositórios no GitHub).",
          "Criação de planos de ação.",
        ].map((activity) => (
          <li key={activity} className="flex gap-2 text-[15px] md:text-base text-neutral-600">
            <span className="text-momento-brand">→</span>
            {activity}
          </li>
        ))}
      </ul>
    ),
  },
];

export default function ManualMentoriaPage() {
  return (
    <main className="relative z-[1] min-h-screen">
      <Navbar />

      <section className="px-[5vw] pt-40 pb-16 md:pt-48 md:pb-20">
        <div className="max-w-[1200px] mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-momento-brand transition-colors mb-8"
          >
            ← Voltar para o início
          </Link>

          <span className="text-momento-accent font-bold mb-4 text-base tracking-wider block">
            Guia do Mentorado
          </span>
          <h1 className="font-display font-medium text-[42px] md:text-[60px] lg:text-[72px] leading-[0.98] tracking-[-0.035em] text-black mb-3">
            Manual de Mentoria
            <br />
            para mentorados
          </h1>
        </div>
      </section>

      <section className="bg-white px-[5vw] py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-display font-medium text-[32px] md:text-[42px] leading-[1.05] tracking-[-0.025em] text-black mb-4">
            O que é e qual o objetivo da mentoria?
          </h2>
          <p className="text-[17px] text-neutral-600 leading-relaxed mb-10">
            Em resumo, a mentoria é uma ferramenta poderosa para o desenvolvimento pessoal e
            profissional, que pode beneficiar tanto o mentor quanto o mentorado.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {objectives.map((item, idx) => {
              const isFeature = idx === 0;
              const isWide = idx === 1 || idx === 4;
              return (
                <article
                  key={item.title}
                  className={`rounded-2xl border border-black/[0.08] bg-momento-light/40 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-momento-brand hover:shadow-[0_24px_50px_-20px_rgba(133,92,196,0.45)] ${
                    isFeature ? "md:col-span-2 md:row-span-2 p-8" : "p-6"
                  } ${isWide ? "md:col-span-2" : ""}`}
                >
                  <h3
                    className={`font-display font-medium text-momento-dark mb-2 ${
                      isFeature ? "text-2xl" : "text-lg"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`text-neutral-600 leading-relaxed ${
                      isFeature ? "text-base" : "text-[15px]"
                    }`}
                  >
                    {item.desc}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-[5vw] py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-display font-medium text-[32px] md:text-[42px] leading-[1.05] tracking-[-0.025em] text-black mb-4">
            Como aproveitar a mentoria ao máximo?
          </h2>
          <p className="text-[17px] text-neutral-600 leading-relaxed mb-10">
            O mais importante é sempre ter em mente que a mentoria é um momento para você — é
            sobre como utilizar esse momento com o mentor para crescer, aprender e se
            desenvolver da melhor forma!
          </p>

          <div className="flex flex-col gap-4 mb-10">
            {steps.map((step, idx) => (
              <article
                key={step.title}
                className="rounded-2xl bg-white border border-black/[0.08] shadow-sm p-6 md:p-7 flex gap-5"
              >
                <span className="shrink-0 w-9 h-9 rounded-full bg-momento-brand text-white font-display text-base flex items-center justify-center">
                  {idx + 1}
                </span>
                <div>
                  <h3 className="font-display text-xl md:text-2xl font-medium mb-2">
                    {step.title}
                  </h3>
                  {step.body}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
