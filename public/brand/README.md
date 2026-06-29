# Assets de marca da TRCX Soluções

Coloque aqui os arquivos de marca. O site lê os caminhos a partir de
`src/content/brand.ts` — se trocar nome/extensão, atualize lá também.

## Arquivos esperados

| Arquivo                | Uso                                                  | Recomendação                             |
| ---------------------- | ---------------------------------------------------- | ----------------------------------------- |
| `logo.svg`             | Header e footer (versão completa, fundo claro)       | SVG vetorial, altura ~32px                |
| `logo-mark.svg`        | Favicon, OG fallback, ícones pequenos                | SVG quadrado, ~64×64                      |
| `logo-dark.svg`        | (opcional) versão pra fundos escuros do hero         | SVG, mesma proporção do `logo.svg`        |
| `hero-bg.jpg`          | (opcional) imagem de fundo decorativa do hero        | JPG ~1920×1080, focado, será com overlay  |
| `wesley.jpg`           | (opcional) foto pessoal pra seção "sobre"            | JPG quadrado, mínimo 600×600              |
| `og.png`               | Open Graph (compartilhamento em redes sociais)       | PNG 1200×630, com logo + tagline          |

## Cores da marca

Depois que o `logo.svg` for adicionado, me passe (ou eu extraio) os 1-2
hexadecimais principais para atualizar `--primary` em `src/app/globals.css`.

A paleta atual é um placeholder (azul oklch 265).
