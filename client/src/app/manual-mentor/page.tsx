import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Manual de Mentoria para Mentores",
  description:
    "Guia do programa de mentorias do Momento: o que esperar das mentorias, como ser um bom mentor e como entrar em contato em caso de dúvidas.",
  alternates: {
    canonical: "/manual-mentor",
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
    title: "Certifique-se de que você está sendo um ouvinte ativo",
    body: (
      <p className="text-[15px] md:text-base text-neutral-600 leading-relaxed">
        Pode ser útil ao orientar tentar seguir a regra &ldquo;80/20&rdquo;. O mentorado deve
        falar cerca de 80% do tempo, enquanto você deve falar cerca de 20% do tempo. Como um
        ouvinte ativo, em vez de dar conselhos, você pode ajudá-lo a desenvolver suas ideias e
        entender melhor seus desafios, para que ele possa encontrar soluções por si mesmo.
      </p>
    ),
  },
  {
    title: "Pergunte ao seu mentorado o que ele gostaria de obter do relacionamento de mentoria",
    body: (
      <p className="text-[15px] md:text-base text-neutral-600 leading-relaxed">
        Os mentorados foram solicitados a pensar um pouco sobre isso, então devem ter uma
        resposta preparada. Isso ajudará a direcionar suas conversas e mantê-las no caminho
        certo — garantindo que sejam benéficas para os mentorados e que eles ganhem o máximo
        possível.
      </p>
    ),
  },
  {
    title: "Identifique problemas específicos com os quais você pode ajudar seu mentorado",
    body: (
      <p className="text-[15px] md:text-base text-neutral-600 leading-relaxed">
        Um bom lugar para começar pode ser perguntar ao seu mentorado se há um certo desafio
        que ele esteja enfrentando em que ele acredita que a mentoria seria útil. Se eles não
        conseguirem pensar em algo para começar, tudo bem — você pode identificar um problema
        específico com o qual pode ajudá-los enquanto conversam. Tente garantir que seu
        mentorado saia de cada conversa com pelo menos uma ação clara e positiva. Pode ser útil
        instigá-los: &ldquo;o que você faria de diferente depois da nossa discussão de hoje? Há
        algo que você gostaria de se comprometer a fazer?&rdquo;
      </p>
    ),
  },
  {
    title: "Forneça feedback construtivo",
    body: (
      <p className="text-[15px] md:text-base text-neutral-600 leading-relaxed">
        Tente ser encorajador e construtivo em vez de crítico. Como você pode ajudá-los a ir de
        bom para ótimo? As sugestões são mais úteis quando são acionáveis e focadas no futuro.
      </p>
    ),
  },
  {
    title: "Lembre-se de que seus mentorados podem ser um pouco tímidos",
    body: (
      <p className="text-[15px] md:text-base text-neutral-600 leading-relaxed">
        A mentoria pode ser uma experiência intimidadora para os alunos, então alguns mentorados
        podem levar um tempo para construir um relacionamento com você. Tire um tempo para se
        apresentar e aprender sobre seu mentorado. Encontrar um ponto em comum é um ótimo
        começo. Faça um esforço para fazê-los se sentirem confortáveis — mostre que você está
        envolvido na conversa, faça perguntas e mova a conversa quando necessário.
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

export default function ManualMentorPage() {
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
            Guia do Mentor
          </span>
          <h1 className="font-display font-medium text-[42px] md:text-[60px] lg:text-[72px] leading-[0.98] tracking-[-0.035em] text-black mb-3">
            Manual de Mentoria
            <br />
            para mentores
          </h1>
        </div>
      </section>

      <section className="bg-white px-[5vw] py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-display font-medium text-[32px] md:text-[42px] leading-[1.05] tracking-[-0.025em] text-black mb-4">
            O que é e qual o objetivo da mentoria?
          </h2>
          <div className="flex flex-col gap-4 text-[17px] text-neutral-600 leading-relaxed mb-10">
            <p>
              A mentoria é um processo de desenvolvimento pessoal e profissional no qual uma
              pessoa mais experiente (o mentor) guia e apoia outra pessoa (o mentorado).
            </p>
            <p>
              Esperamos dos mentores o comprometimento de 6 sessões de 50 minutos de contato com
              os mentorados ao longo de um ciclo de seis meses (agosto a janeiro). As datas e
              horários desses encontros podem ser acertadas entre mentor e mentorado de acordo
              com a disponibilidade de ambos.
            </p>
            <p>
              O benefício da mentoria não é apenas a troca de conhecimento e habilidades, mas
              também oferece socialização profissional e apoio pessoal para enfrentar desafios e
              desenvolver o potencial dos mentorados. Uma boa mentoria faz toda a diferença na
              vida dos alunos! Veja os depoimentos no site do Momento como um exemplo.
            </p>
            <p>
              O objetivo principal da mentoria é promover o crescimento e o aprendizado do
              mentorado, ajudando-o a alcançar seus objetivos e desenvolver seu potencial.
            </p>
          </div>

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
            Como ser um bom mentor?
          </h2>
          <p className="text-[17px] text-neutral-600 leading-relaxed mb-10">
            Isso pode se dar de várias formas a depender das necessidades do mentorado, mas
            sempre:
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
