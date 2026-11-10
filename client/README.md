# Momento

Landing page do Momento — plataforma que conecta estudantes universitários ao mercado de trabalho através de mentoria e comunidade.

## Stack

- Next.js 16 (App Router) + React 19
- Tailwind CSS v4
- TypeScript

## Desenvolvimento

```bash
npm install
npm run dev
```

Abrir http://localhost:3000.

## Blog

Os posts ficam em `content/blog/*.md` (um arquivo por post, sem CMS). O formato do
frontmatter e as convenções estão em `content/blog/_LEIA-ME.md`. A listagem é `/blog` e
cada post vive em `/blog/<slug>`; ambos são gerados no build.

## Build de produção

```bash
npm run build
npm run start
```

## Deploy

Auto-deploy via Vercel a partir da branch `main`.
