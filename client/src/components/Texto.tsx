import Markdown from "react-markdown";

/**
 * Markdown com a tipografia da landing.
 *
 * A política de privacidade e os termos são documento, não componente: texto que
 * a equipe do Momento edita por decisão de programa — e às vezes por exigência de
 * revisor do Google —, e mexer nele não deve exigir React.
 *
 * A plataforma tem um componente irmão deste, e de propósito os dois não
 * compartilham código: lá as classes saem do design system do app (`text-body`,
 * `font-display`, tokens), aqui saem da escala desta landing, que é outra. O que
 * as duas compartilham é o markdown, e esse mora num arquivo só desde que os
 * documentos vieram para cá.
 *
 * `react-markdown` entrega HTML nu e o projeto não tem plugin de tipografia;
 * cada tag ganha as classes aqui, e nenhum valor solto fica no markdown.
 */
export function Texto({ children }: { children: string }) {
  return <Markdown components={estilos}>{children}</Markdown>;
}

const estilos = {
  h1: (props: React.ComponentProps<"h1">) => (
    <h1
      className="font-display font-medium text-[42px] md:text-[56px] leading-[1] tracking-[-0.03em] text-black mb-4"
      {...props}
    />
  ),
  h2: (props: React.ComponentProps<"h2">) => (
    <h2
      className="font-display font-medium text-[26px] md:text-[32px] leading-[1.15] tracking-[-0.02em] text-black mt-12 mb-4"
      {...props}
    />
  ),
  h3: (props: React.ComponentProps<"h3">) => (
    <h3 className="font-display font-medium text-[20px] text-black mt-8 mb-3" {...props} />
  ),
  p: (props: React.ComponentProps<"p">) => (
    <p className="text-[17px] leading-relaxed text-neutral-600 mb-4" {...props} />
  ),
  ul: (props: React.ComponentProps<"ul">) => (
    <ul className="flex flex-col gap-2 mb-4 pl-5 list-disc marker:text-momento-accent" {...props} />
  ),
  ol: (props: React.ComponentProps<"ol">) => (
    <ol
      className="flex flex-col gap-2 mb-4 pl-5 list-decimal marker:text-momento-accent"
      {...props}
    />
  ),
  li: (props: React.ComponentProps<"li">) => (
    <li className="text-[17px] leading-relaxed text-neutral-600" {...props} />
  ),
  strong: (props: React.ComponentProps<"strong">) => (
    <strong className="font-semibold text-black" {...props} />
  ),
  /**
   * Aparece uma vez, e vale o estilo por causa de onde: é o `calendar.events`
   * da política, o escopo que o revisor do Google compara com o que o app pede.
   * Sem fundo ele se perde no meio do parágrafo como se fosse texto comum.
   */
  code: (props: React.ComponentProps<"code">) => (
    <code
      className="rounded bg-momento-light/50 px-1.5 py-0.5 text-[15px] text-momento-dark"
      {...props}
    />
  ),
  /**
   * `target="_blank"` em tudo: o único link que estes documentos trazem é para
   * fora (a Política de Dados do Usuário do Google, que o revisor procura), e
   * tirar a pessoa da política no meio da leitura não ajuda ninguém.
   */
  a: (props: React.ComponentProps<"a">) => (
    <a
      className="text-momento-brand underline underline-offset-4 hover:text-momento-accent transition-colors"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  hr: () => <hr className="my-10 border-black/10" />,
};
