# Estima Odontologia — site institucional

React + Vite + TypeScript + Tailwind, com Framer Motion (parallax e reveals), Lenis (smooth scroll) e Supabase (formulário).

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # gera sitemap.xml + dist/
npm run images     # reprocessa fotos de src/assets/src-img → public/img (AVIF/WebP responsivos)
```

## Onde editar

| O quê | Arquivo |
| --- | --- |
| Contatos, endereço, horários, redes, CRO, CNPJ | `src/lib/site.ts` |
| Conteúdo dos 6 tratamentos (textos, etapas, FAQ) | `src/data/treatments.ts` |
| Números, tecnologia, diferenciais, casos, depoimentos, manifesto | `src/data/content.ts` |
| Hero estático do primeiro carregamento (espelho do hero React) | `index.html` (`#boot-hero`) |
| Schema.org `Dentist` | `index.html` |

## Pendências [PREENCHER]

- Hex de destaque: usado o dourado do logo (`#C8A161`); confirmar.
- Horários, razão social, CNPJ, URL da nova página do Facebook (`src/lib/site.ts`).
- Números reais: anos de clínica etc. (`stats` em `src/data/content.ts`; itens com `value: null` ficam ocultos).
- Detalhes reais de esterilização/biossegurança, história, formação do Dr. Fernando e equipe (busque por `[PREENCHER]`).
- Depoimentos reais (ex.: Google) com autorização. Lista vazia oculta a seção em produção.
- Fotos profissionais: tratamentos e tecnologia usam placeholders ilustrativos (`<Placeholder />`). As fotos atuais da clínica têm até 960px.

## Antes e depois (Res. CFO 196/2019)

Em `cases` (`src/data/content.ts`): somente casos do próprio profissional, com **TCLE assinado** (`tcleOk: true` — casos sem TCLE nunca aparecem), apenas fotos de diagnóstico e conclusão, sem filtros. Nome e CRO são exibidos em cada caso. Coloque as fotos em `public/img/casos/` e preencha `before`/`after`; remova o caso `placeholder`.

## Formulário (Supabase + Resend)

1. Crie o projeto no Supabase e aplique `supabase/migrations/*_leads.sql` (tabela `leads` com RLS, sem acesso público).
2. Faça deploy da função: `supabase functions deploy submit-lead`.
3. Secrets: `supabase secrets set RESEND_API_KEY=... LEAD_FROM_EMAIL="Site Estima <site@estimaodonto.com.br>" ALLOWED_ORIGIN=https://estimaodonto.com.br` (destino padrão: estimaodonto20@gmail.com; altere com `LEAD_TO_EMAIL`).
4. No front, defina `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` (veja `.env.example`). Sem essas variáveis o envio é apenas simulado.

Anti-spam: honeypot (`website`) validado no front e na função.

## Rastreamento

`VITE_GA4_ID` e `VITE_META_PIXEL_ID`. Os scripts só carregam após o visitante aceitar cookies. Eventos: `page_view`, `whatsapp_click`, `phone_click`, `generate_lead`.

## Motion e performance

- Preloader e revelação do hero são CSS no `index.html`, rodando em paralelo ao download do JS; o React monta por baixo no estado final e remove as camadas (`src/App.tsx`).
- `prefers-reduced-motion`: parallax, scroll horizontal e reveals com transform são desativados (só fades). No mobile o parallax tem metade da intensidade e o cursor customizado é desligado.
- Lighthouse mobile (build local): home 94–96, tratamento 91, contato 93, sobre 92.

## Deploy

SPA: `public/_redirects` (Netlify) e `vercel.json` já fazem o fallback para `index.html`. `VITE_SITE_URL` define canonical/OG.
