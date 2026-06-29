# CSVs do export do LinkedIn

Coloque aqui os arquivos do ZIP oficial do LinkedIn:

> LinkedIn → **Eu** → **Configurações e privacidade** → **Privacidade de dados** → **Obter uma cópia dos seus dados** → selecionar "Want something in particular?" e marcar Profile, Positions, Education, Courses, Certifications, Skills, Languages, Projects, Honors.

## Arquivos consumidos

| Arquivo                      | Conteúdo                                |
| ---------------------------- | --------------------------------------- |
| `Profile.csv`                | Cabeçalho, resumo, localização, websites |
| `Positions.csv`              | Experiência profissional                 |
| `Education.csv`              | Formação acadêmica                       |
| `Courses.csv`                | Cursos acadêmicos (raro em perfis novos) |
| `Learning.csv`               | LinkedIn Learning (fallback de `Courses.csv`, filtrado pra `Content Type = Course` concluídos) |
| `Certifications.csv`         | Certificações                            |
| `Skills.csv`                 | Habilidades                              |
| `Languages.csv`              | Idiomas                                  |
| `Projects.csv`               | Projetos                                 |
| `Honors.csv`                 | Prêmios e honrarias                      |

Qualquer arquivo ausente faz o respectivo bloco do CV ficar vazio (sem erro).
Se nenhum CSV estiver presente, o site usa o mock em `../mock.ts`.

Outros CSVs do export (mensagens, conexões, endossos, etc.) podem ser deletados
— não são lidos.
