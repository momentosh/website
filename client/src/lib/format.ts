/**
 * Datas do blog no idioma da interface.
 *
 * `Intl` e não uma tabela de meses no dicionário: os dois idiomas do site já
 * existem no runtime, e o formato ("6 de outubro de 2026" / "October 6, 2026")
 * é exatamente o que o navegador sabe fazer. A data viaja em ISO
 * (`YYYY-MM-DD`) e é ancorada ao meio-dia UTC para o fuso não empurrar nenhum
 * post para o dia anterior.
 */
export function formatDate(iso: string, language: "pt" | "en"): string {
  return new Intl.DateTimeFormat(language === "pt" ? "pt-BR" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T12:00:00Z`));
}
