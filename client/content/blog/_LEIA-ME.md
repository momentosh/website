# Como publicar no blog

Cada post é um arquivo `.md` nesta pasta. O nome do arquivo vira a URL:
`como-escolher-um-mentor.md` → `/blog/como-escolher-um-mentor`. Use só minúsculas, números e
hífen.

Arquivos que começam com `_` são ignorados (este aqui, por exemplo).

## Formato

```markdown
---
title: Título que aparece no card e no topo do post
description: Um parágrafo curto, usado no card, na listagem e no resultado do Google.
date: 2026-11-03
author: Equipe Momento
---

O texto começa aqui. Use `##` para seções — o `#` é o título do frontmatter.
```

- `title`, `description` e `date` são obrigatórios; o build falha sem eles, de propósito.
- `date` no formato `YYYY-MM-DD`. A listagem ordena do mais recente para o mais antigo.
- `author` é opcional; sem ele aparece "Momento".

## O que o texto aceita

Markdown comum: parágrafos, listas, **negrito**, `código`, citações (`>`), links e imagens.
A tipografia vem do componente `Texto` (`src/components/Texto.tsx`), então não escreva
HTML nem classes no markdown.

Imagens ficam em `public/assets/` e entram como `/assets/nome.png`.

## Idioma

O corpo dos posts é em português, como os documentos legais. A moldura (data, autor,
"voltar", navegação) é traduzida automaticamente pelo seletor de idioma do site.
