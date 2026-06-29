# TRCX Soluções

Template base para novos projetos web, com design system pronto e styleguide navegável.

## Stack

- **Next.js 16** (App Router + Turbopack + React 19 + React Compiler)
- **Tailwind CSS v4** (tokens via `@theme inline` — sem `tailwind.config`)
- **shadcn v4** preset `base-nova` (primitivas `@base-ui/react`, **não** Radix)
- **TypeScript 5**
- **Inter** (sans) + **Geist Mono** (mono) via `next/font/google`

## O que vem incluído

- Escala completa de cores (`primary-50..900`, `neutral-50..900`)
- Tokens semânticos (`success`, `warning`, `info`, `destructive`) + `-foreground`
- Modo escuro pronto (toggle na sidebar do styleguide)
- **Seletor de paletas** com 8 temas pré-configurados (azul, laranja, teal, verde, roxo, magenta, vermelho, amarelo) — persistido em `localStorage`
- Styleguide completo em `/styleguide` com todos os tokens, tipografia, botões, cards, badges, alerts e radio groups
- Componentes shadcn pré-instalados: `button`, `card`, `badge`, `alert`, `radio-group`, `select`

## Como usar este template

1. Clique em **Use this template** no GitHub (ou faça fork e limpe os commits)
2. Clone seu novo repositório
3. Rode o script de rename pra ajustar nome e metadata:

   ```bash
   npm run rename meu-projeto --title "Meu Projeto" --description "Descrição curta"
   ```

   O script atualiza:
   - `package.json` → `name`
   - `src/app/layout.tsx` → `metadata.title` e `metadata.description`
   - `src/app/styleguide/layout.tsx` → título na sidebar
   - `README.md` → primeiro heading

4. Instale dependências e rode:

   ```bash
   npm install
   npm run dev
   ```

   Abra [http://localhost:3000/styleguide](http://localhost:3000/styleguide).

## Variáveis de ambiente

| Variável                         | Descrição                                                                   | Padrão  |
| -------------------------------- | --------------------------------------------------------------------------- | ------- |
| `NEXT_PUBLIC_ENABLE_STYLEGUIDE`  | Habilita `/styleguide` em produção. Em desenvolvimento sempre fica ligado.  | `false` |

Em produção o styleguide retorna 404 por padrão. Pra exibir em produção, defina `NEXT_PUBLIC_ENABLE_STYLEGUIDE=true` no ambiente.

## Estrutura

```
src/
├── app/
│   ├── globals.css              # tokens + paletas + @theme inline
│   ├── layout.tsx               # root layout (metadata, fontes)
│   ├── page.tsx                 # home (vazia — substitua pelo seu app)
│   └── styleguide/
│       ├── layout.tsx           # sidebar + gating por env
│       ├── navigation.ts        # config da nav (edite ao adicionar páginas)
│       ├── page.tsx             # tokens + amostras de componentes
│       └── components/
│           ├── theme-toggle.tsx
│           └── palette-selector.tsx
├── components/
│   └── ui/                      # componentes shadcn
└── lib/
    └── utils.ts                 # helper cn()
scripts/
└── rename.mjs                   # script de rename do template
```

## Convenções

- **Tokens**: sempre use CSS variables (`var(--primary)`) ou classes utilitárias (`bg-primary`, `text-muted-foreground`). Não hardcode cores.
- **Novos tokens**: adicione em `src/app/globals.css` no bloco `:root` + `.dark` e exponha em `@theme inline` como `--color-*` pra virar utility do Tailwind.
- **Nova paleta**: adicione um bloco `html[data-theme="..."]` em `globals.css` com os 5 swatches nos stops 100/300/500/700/900, e registre em `palette-selector.tsx`.
- **Novos componentes**: use `npx shadcn@latest add <component>` e adicione a rota em `src/app/styleguide/navigation.ts`.

## Comandos

```bash
npm run dev       # dev server (turbopack)
npm run build     # build de produção
npm run start     # server de produção
npm run lint      # eslint
npm run rename    # rename do template (ver acima)
```
