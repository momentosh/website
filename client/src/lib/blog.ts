import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

/**
 * Os posts do blog, lidos de content/blog/*.md em tempo de build.
 *
 * Sem CMS e sem dependência nova: o blog nasce com a mesma escolha dos
 * documentos legais — markdown em `content/`, editável sem React. O que ele
 * acrescenta é o frontmatter (título, resumo, data, autor), que o
 * `react-markdown` não lê, então o parser mínimo está aqui embaixo. Ele aceita
 * só `chave: valor`, que é tudo o que os posts usam; nada de listas ou aninhamento.
 *
 * Este módulo usa `node:fs` e só pode ser importado por componente de servidor
 * (as páginas de `app/blog`). Os componentes de UI recebem os dados por prop e
 * importam apenas os tipos — `import type` some no build e não puxa o `fs` para
 * o cliente.
 *
 * Arquivos começando com `_` são ignorados: é assim que o `_LEIA-ME.md` que
 * explica o formato fica na mesma pasta sem virar post.
 */

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type BlogPostMeta = {
  /** Vem do nome do arquivo, sem o `.md`. É a URL: /blog/<slug>. */
  slug: string;
  title: string;
  description: string;
  /** Data de publicação, ISO `YYYY-MM-DD`. Ordena a listagem. */
  date: string;
  author: string;
  /** Estimativa para exibir no card e no topo do post. */
  readingMinutes: number;
};

export type BlogPost = BlogPostMeta & {
  /** O corpo em markdown, sem o frontmatter. */
  content: string;
};

/** Campos que o frontmatter precisa ter. `author` é opcional no arquivo. */
const REQUIRED = ["title", "description", "date"] as const;

export async function getAllPosts(): Promise<BlogPostMeta[]> {
  const files = await postFiles();

  const posts = await Promise.all(
    files.map(async ({ slug, file }) => toMeta(await readPost(slug, file))),
  );

  // Mais recente primeiro; o título decide o empate para a ordem não depender
  // da ordem em que o sistema de arquivos devolve os nomes.
  return posts.sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  // O slug vem da URL, então não vira caminho direto: procurar na listagem
  // impede que `../../` alcance arquivo fora de content/blog.
  const match = (await postFiles()).find((post) => post.slug === slug);
  if (!match) return null;

  return readPost(match.slug, match.file);
}

async function postFiles(): Promise<{ slug: string; file: string }[]> {
  let entries: string[];
  try {
    entries = await readdir(BLOG_DIR);
  } catch {
    // Pasta ausente é blog vazio, não erro de build.
    return [];
  }

  return entries
    .filter((name) => name.endsWith(".md") && !name.startsWith("_"))
    .map((name) => ({ slug: name.slice(0, -".md".length), file: name }));
}

async function readPost(slug: string, file: string): Promise<BlogPost> {
  const raw = await readFile(path.join(BLOG_DIR, file), "utf8");
  const { data, body } = parseFrontmatter(raw, file);

  for (const field of REQUIRED) {
    if (!data[field]) {
      throw new Error(`content/blog/${file}: frontmatter sem \`${field}\`.`);
    }
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date) || Number.isNaN(Date.parse(data.date))) {
    throw new Error(`content/blog/${file}: \`date\` deve ser YYYY-MM-DD (recebido: ${data.date}).`);
  }

  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    author: data.author || "Momento",
    readingMinutes: readingMinutes(body),
    content: body,
  };
}

function toMeta(post: BlogPost): BlogPostMeta {
  return {
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.date,
    author: post.author,
    readingMinutes: post.readingMinutes,
  };
}

/** `---` na primeira linha, `---` sozinho fechando; o resto é corpo. */
function parseFrontmatter(raw: string, file: string): { data: Record<string, string>; body: string } {
  const lines = raw.replace(/\r\n/g, "\n").split("\n");

  if (lines[0].trim() !== "---") {
    // Post sem frontmatter não tem título nem data — falhar cedo, no build.
    throw new Error(`content/blog/${file}: comece o arquivo com um bloco \`---\` de frontmatter.`);
  }

  const closing = lines.findIndex((line, index) => index > 0 && line.trim() === "---");
  if (closing === -1) {
    throw new Error(`content/blog/${file}: frontmatter aberto e não fechado com \`---\`.`);
  }

  const data: Record<string, string> = {};
  for (const line of lines.slice(1, closing)) {
    if (!line.trim() || line.trimStart().startsWith("#")) continue;

    const match = /^([a-zA-Z][\w-]*):\s*(.*)$/.exec(line);
    if (!match) {
      throw new Error(
        `content/blog/${file}: linha de frontmatter não entendida (${line.trim()}). Use \`chave: valor\`.`,
      );
    }

    data[match[1]] = match[2].trim().replace(/^["'](.*)["']$/, "$1");
  }

  return { data, body: lines.slice(closing + 1).join("\n").trim() };
}

/** ~200 palavras por minuto, o arredondamento comum; 1 é o piso. */
function readingMinutes(body: string): number {
  const words = body.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
