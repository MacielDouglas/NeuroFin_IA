readme = r"""<div align="center">

# 🎼 OrquestraAI

**Plataforma inteligente de gerenciamento de projetos com IA integrada.**

Organize equipes em boards Kanban, automatize análises com inteligência artificial e entregue projetos com mais previsibilidade — construída com a stack moderna do ecossistema JavaScript.

[![Deploy](https://img.shields.io/badge/Deploy-Vercel-000000?style=flat-square&logo=vercel)](https://orquestra-ai.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](./LICENSE)
[![E2E Tests](https://img.shields.io/badge/E2E-63%20passing-22c55e?style=flat-square&logo=playwright)](./tests/e2e)
[![Unit Tests](https://img.shields.io/badge/Unit-50%20passing-22c55e?style=flat-square&logo=vitest)](./tests/unit)
[![Accessibility](https://img.shields.io/badge/a11y-WCAG%20AA-6366f1?style=flat-square)](https://www.w3.org/WAI/WCAG21/quickref)

<br />

[**🚀 Ver Demo**](https://orquestra-ai.vercel.app) · [**📖 Documentação**](#-rodando-localmente) · [**🐛 Reportar Bug**](https://github.com/MacielDouglas/OrquestraAI/issues) · [**💡 Sugerir Feature**](https://github.com/MacielDouglas/OrquestraAI/issues)

</div>

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Stack Técnica](#-stack-técnica)
- [Arquitetura](#-arquitetura)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Rodando Localmente](#-rodando-localmente)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Testes](#-testes)
- [Deploy](#-deploy)
- [Segurança](#-segurança)
- [Decisões Técnicas](#-decisões-técnicas)
- [Roadmap](#-roadmap)
- [Licença](#-licença)
- [Autor](#-autor)

---

## 🎯 Sobre o Projeto

O **OrquestraAI** nasceu da necessidade de uma ferramenta de gerenciamento de projetos que fosse além do simples rastreamento de tarefas. A proposta é integrar inteligência artificial diretamente no fluxo de trabalho — sem abas extras, sem ferramentas externas.

**O problema que resolve:**
- Times perdem tempo identificando manualmente quais tarefas estão bloqueando o projeto
- Reuniões de status consomem horas para gerar informações que a IA pode sintetizar em segundos
- Estimativas de prazo são frequentemente imprecisas por falta de análise histórica

**A solução:**
Um board Kanban completo onde a IA atua como um membro sênior do time — analisando o estado do projeto, sugerindo subtarefas, detectando gargalos e gerando resumos executivos sob demanda.

---

## ✨ Funcionalidades

### 📋 Gerenciamento de Projetos
- Criação e organização de projetos com status (`Ativo`, `Arquivado`, `Concluído`)
- Sistema de membros com controle de acesso por roles (`Owner`, `Admin`, `Member`, `Viewer`)
- Board Kanban com colunas configuráveis (`Backlog → To Do → In Progress → In Review → Done`)
- Drag-and-drop para reordenação e movimentação de tarefas entre colunas

### 🃏 Gestão de Tarefas
- Criação rápida inline no board sem abrir modais
- Modal de detalhes com descrição rica, prioridade, responsável e prazo
- Subtarefas com progresso individual
- Histórico de alterações por tarefa
- Comentários por tarefa com rastreamento de autor
- Prioridades: `Urgente`, `Alta`, `Média`, `Baixa`

### 🤖 Inteligência Artificial
- **Geração de Subtarefas** — sugere subtarefas relevantes a partir do título e descrição
- **Resumo Executivo** — sintetiza o estado do projeto em linguagem natural
- **Detecção de Gargalos** — identifica tarefas bloqueadas, atrasadas ou sobrecarregadas
- Rate limiting por usuário para controle de custos de API
- Logging estruturado de todas as inferências (modelo, latência, input/output)

### 👤 Experiência do Usuário
- Autenticação com email e senha (sem OAuth externo)
- Página de configurações com edição de perfil, troca de senha e exclusão de conta
- Dashboard com métricas reais: projetos ativos, tarefas pendentes e gargalos detectados
- Navegação responsiva: sidebar no desktop, bottom tab bar no mobile
- Dark mode com preferência do sistema e toggle manual
- Feedback visual com toasts (Sonner) em todas as ações

### ♿ Acessibilidade
- Conformidade WCAG AA verificada com axe-core em CI
- Navegação completa por teclado
- Hierarquia semântica de headings em todas as páginas
- Contrastes validados em light e dark mode
- Atributos ARIA corretos em todos os componentes interativos

---

## 🛠️ Stack Técnica

### Frontend
| Tecnologia | Versão | Uso |
|---|---|---|
| [Next.js](https://nextjs.org) | 16.2 | Framework fullstack — App Router, Server Components, Server Actions |
| [React](https://react.dev) | 19 | UI com `useActionState`, `useOptimistic`, Suspense |
| [TypeScript](https://typescriptlang.org) | 5.9 | Tipagem estrita end-to-end |
| [Tailwind CSS](https://tailwindcss.com) | 4.2 | Utility-first com design tokens customizados |
| [shadcn/ui](https://ui.shadcn.com) | 4.4 | Componentes acessíveis baseados em Radix UI |
| [Framer Motion](https://framer.com/motion) | 12 | Animações de transição e layout |
| [Lucide React](https://lucide.dev) | 1.8 | Ícones consistentes e acessíveis |
| [Sonner](https://sonner.emilkowal.ski) | 2.0 | Toast notifications |
| [next-themes](https://github.com/pacocoursey/next-themes) | 0.4 | Dark/light mode |

### Backend & Banco de Dados
| Tecnologia | Versão | Uso |
|---|---|---|
| [Next.js API Routes](https://nextjs.org/docs/app/api-routes) | 16.2 | Handlers serverless |
| [Better Auth](https://better-auth.com) | 1.6 | Autenticação com email/senha, sessão por cookie |
| [Prisma ORM](https://prisma.io) | 7.7 | Type-safe database client com migrations |
| [PostgreSQL](https://postgresql.org) | 15 | Banco relacional via Neon (serverless) |
| [Groq SDK](https://groq.com) | 1.1 | LLM inference para features de IA |
| [Zod](https://zod.dev) | 4.3 | Validação de schemas no servidor e cliente |
| [Pino](https://getpino.io) | 10.3 | Logging estruturado em produção |
| [@prisma/adapter-pg](https://prisma.io) | 7.7 | Adapter para connection pooling com pg |

### Infraestrutura & DevOps
| Tecnologia | Uso |
|---|---|
| [Vercel](https://vercel.com) | Hosting com deploy automático via GitHub |
| [Neon](https://neon.tech) | PostgreSQL serverless com branching |
| [Bun](https://bun.sh) | Runtime e package manager (substitui Node/npm) |
| [GitHub Actions](https://github.com/features/actions) | CI/CD pipeline |

### Qualidade & Testes
| Ferramenta | Versão | Uso |
|---|---|---|
| [Vitest](https://vitest.dev) | 4.1 | Testes unitários e de integração |
| [Playwright](https://playwright.dev) | 1.59 | Testes E2E (Chromium + Mobile) |
| [Testing Library](https://testing-library.com) | 16 | Render de componentes em testes unitários |
| [axe-core](https://github.com/dequelabs/axe-core) | 4.11 | Auditoria de acessibilidade automatizada |
| [MSW](https://mswjs.io) | 2.13 | Mock de API em testes unitários |
| [ESLint](https://eslint.org) | 9.39 | Linting com regras TypeScript e Next.js |
| [Prettier](https://prettier.io) | 3.8 | Formatação de código |

---

## 🏗️ Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                        Cliente (Browser)                    │
│  React 19 · Tailwind CSS · shadcn/ui · Framer Motion       │
└────────────────────────────┬────────────────────────────────┘
                             │ HTTP / RSC / Server Actions
┌────────────────────────────▼────────────────────────────────┐
│                   Next.js 16 (Vercel Edge)                  │
│                                                             │
│  ┌─────────────────┐  ┌──────────────┐  ┌───────────────┐  │
│  │  App Router     │  │   API Routes │  │ Server Actions│  │
│  │  (RSC + SSR)    │  │  /api/auth   │  │  (mutations)  │  │
│  └────────┬────────┘  └──────┬───────┘  └───────┬───────┘  │
│           │                  │                  │           │
│  ┌────────▼──────────────────▼──────────────────▼───────┐  │
│  │              Services Layer (Business Logic)          │  │
│  │  ProjectService · TaskService · DashboardService      │  │
│  │  AiService · AuthService                              │  │
│  └────────┬──────────────────────────────────────────────┘  │
│           │                                                  │
│  ┌────────▼───────────────────┐  ┌─────────────────────┐   │
│  │     Prisma ORM             │  │    Groq API (LLM)    │   │
│  │  (type-safe queries)       │  │   llama3 · mixtral   │   │
│  └────────┬───────────────────┘  └─────────────────────┘   │
└───────────┼─────────────────────────────────────────────────┘
            │
┌───────────▼─────────────────────────────────────────────────┐
│              PostgreSQL (Neon Serverless)                    │
│  Users · Sessions · Projects · Tasks · Subtasks             │
│  Comments · History · AiSuggestions · ProjectMembers        │
└─────────────────────────────────────────────────────────────┘
```

### Padrões Adotados

- **Server-first**: dados são buscados no servidor via RSC sempre que possível
- **Server Actions**: mutações via `"use server"` com validação Zod antes de qualquer I/O
- **Page Object Model**: abstração das páginas nos testes E2E para manutenibilidade
- **Feature-based structure**: código organizado por domínio, não por tipo de arquivo
- **Result pattern**: `{ data, error }` retornado pelas Server Actions para tratamento no cliente

---

## 📁 Estrutura do Projeto

```
orquestra-ai/
├── .github/
│   └── workflows/              # GitHub Actions CI/CD
├── prisma/
│   ├── schema.prisma           # Schema do banco — fonte de verdade
│   └── migrations/             # Histórico de migrations
├── public/                     # Assets estáticos
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout (fontes, providers)
│   │   ├── (protected)/        # Grupo de rotas autenticadas
│   │   │   ├── layout.tsx      # Layout com Sidebar + Header
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   ├── projects/
│   │   │   │   ├── page.tsx    # Listagem de projetos
│   │   │   │   └── [id]/
│   │   │   │       ├── page.tsx        # Board Kanban
│   │   │   │       └── ai-panel/
│   │   │   │           └── page.tsx    # Painel de IA
│   │   │   ├── tasks/
│   │   │   │   └── page.tsx    # Visão geral de tarefas
│   │   │   ├── team/
│   │   │   │   └── page.tsx
│   │   │   └── settings/
│   │   │       └── page.tsx    # Perfil, senha, danger zone
│   │   ├── (public)/           # Grupo de rotas públicas
│   │   │   ├── layout.tsx
│   │   │   ├── sign-in/
│   │   │   │   └── page.tsx
│   │   │   └── sign-up/
│   │   │       └── page.tsx
│   │   └── api/
│   │       └── auth/
│   │           └── [...all]/
│   │               └── route.ts  # Better Auth handler
│   ├── components/
│   │   ├── ui/                 # shadcn/ui base components
│   │   ├── layout/
│   │   │   ├── sidebar.tsx     # Sidebar (desktop) + BottomNav (mobile)
│   │   │   └── header.tsx      # Header com dark mode toggle e avatar
│   │   └── features/           # Componentes específicos de domínio
│   │       ├── project-card.tsx
│   │       ├── task-card.tsx
│   │       └── board-column.tsx
│   ├── features/               # Feature modules (UI de cada domínio)
│   │   ├── auth/
│   │   │   ├── sign-in-form.tsx
│   │   │   └── sign-up-form.tsx
│   │   ├── projects/
│   │   ├── tasks/
│   │   └── settings/
│   │       ├── profile-form.tsx
│   │       ├── password-form.tsx
│   │       └── delete-account.tsx
│   ├── server/
│   │   ├── actions/            # Server Actions (mutations)
│   │   │   ├── project.actions.ts
│   │   │   ├── task.actions.ts
│   │   │   ├── ai.actions.ts
│   │   │   └── settings.actions.ts
│   │   ├── services/           # Business logic (queries)
│   │   │   ├── project.service.ts
│   │   │   ├── task.service.ts
│   │   │   └── dashboard.service.ts
│   │   └── ai/                 # IA: schemas, services, rate limiter
│   │       ├── schemas.ts
│   │       ├── ai.logger.ts
│   │       ├── ai-limiter.ts
│   │       └── services/
│   │           ├── generate-subtasks.ts
│   │           ├── summarize-project.ts
│   │           └── detect-bottlenecks.ts
│   ├── lib/
│   │   ├── auth/
│   │   │   ├── auth.ts         # Better Auth server config
│   │   │   ├── auth-client.ts  # Better Auth client
│   │   │   ├── authorize.ts    # requireSession() helper
│   │   │   └── session.ts      # getServerSession() helper
│   │   ├── prisma/
│   │   │   └── client.ts       # Prisma singleton com PgAdapter
│   │   ├── utils/
│   │   │   ├── cn.ts           # clsx + tailwind-merge
│   │   │   └── task.ts         # Helpers de tarefa
│   │   ├── errors/
│   │   │   └── action-result.ts
│   │   └── validations/        # Zod schemas compartilhados
│   │       ├── project.ts
│   │       └── task.ts
│   └── generated/
│       └── prisma/             # Gerado por `prisma generate` (gitignored)
├── tests/
│   ├── unit/                   # Vitest — 50 testes
│   │   ├── lib/
│   │   ├── server/ai/
│   │   ├── ui/
│   │   └── components/
│   └── e2e/                    # Playwright — 63 testes
│       ├── pages/              # Page Object Model
│       │   ├── projects.page.ts
│       │   └── tasks.page.ts
│       ├── global.setup.ts     # Autenticação global
│       ├── accessibility.spec.ts
│       ├── auth.spec.ts
│       ├── projects.spec.ts
│       ├── tasks.spec.ts
│       ├── ai-panel.spec.ts
│       ├── navigation.spec.ts
│       └── home.spec.ts
├── .env.example                # Template de variáveis
├── .gitignore
├── next.config.ts
├── playwright.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── LICENSE
└── README.md
```

---

## 🚀 Rodando Localmente

### Pré-requisitos

| Ferramenta | Versão mínima | Instalação |
|---|---|---|
| [Bun](https://bun.sh) | 1.0+ | `curl -fsSL https://bun.sh/install \| bash` |
| [Node.js](https://nodejs.org) | 20+ | via [nvm](https://github.com/nvm-sh/nvm) |
| PostgreSQL | 14+ | [Neon](https://neon.tech) (recomendado — free tier) |

### Passo a passo

**1. Clone o repositório**

```bash
git clone https://github.com/MacielDouglas/OrquestraAI.git
cd OrquestraAI
```

**2. Instale as dependências**

```bash
bun install
```

**3. Configure as variáveis de ambiente**

```bash
cp .env.example .env.local
```

Preencha `.env.local` com seus valores (veja a seção [Variáveis de Ambiente](#-variáveis-de-ambiente)).

**4. Configure o banco de dados**

```bash
# Gera o Prisma Client
bunx prisma generate

# Aplica as migrations no banco
bunx prisma migrate deploy

# (Opcional) Popula com dados iniciais
bunx prisma db seed

# (Opcional) Abre o Prisma Studio para inspecionar os dados
bunx prisma studio
```

**5. Inicie o servidor de desenvolvimento**

```bash
bun run dev
```

Acesse **[http://localhost:3000](http://localhost:3000)**

---

## 🔑 Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# ─── Banco de dados ───────────────────────────────────────────
# Use a connection string do Neon (ou PostgreSQL local)
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"

# URL direta — necessária para migrations e Prisma Studio
DIRECT_URL="postgresql://user:password@host/database?sslmode=require"

# ─── Better Auth ──────────────────────────────────────────────
# Gere com: openssl rand -base64 32
BETTER_AUTH_SECRET="sua_chave_secreta_com_32_bytes"

# URL da aplicação — sem barra no final
BETTER_AUTH_URL="http://localhost:3000"

# ─── App ──────────────────────────────────────────────────────
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# ─── IA (Groq) ────────────────────────────────────────────────
# Obtenha em: https://console.groq.com
GROQ_API_KEY="gsk_..."
```

> ⚠️ **Nunca** commite `.env.local` ou qualquer arquivo com credenciais reais. O `.gitignore` já exclui todos os arquivos `.env*`.

---

## 📦 Scripts Disponíveis

```bash
# Desenvolvimento
bun run dev           # Servidor com Turbopack (hot reload)
bun run build         # Build de produção
bun run start         # Servidor de produção (após build)

# Qualidade de código
bun run check         # Executa typecheck + lint + testes unitários
bun run typecheck     # TypeScript sem emissão (tsc --noEmit)
bun run lint          # ESLint em todo o projeto
bun run format        # Prettier — formata todos os arquivos

# Testes
bun run test          # Vitest — testes unitários (modo run)
bun run test:watch    # Vitest — modo watch (desenvolvimento)
bun run test:e2e      # Playwright — todos os testes E2E
bun run test:e2e:ui   # Playwright — interface visual

# Banco de dados
bunx prisma generate        # Gera o Prisma Client
bunx prisma migrate dev     # Cria e aplica nova migration
bunx prisma migrate deploy  # Aplica migrations pendentes (produção)
bunx prisma studio          # Abre o Prisma Studio (GUI do banco)
```

---

## 🧪 Testes

A estratégia de testes cobre três camadas independentes:

### Testes Unitários — Vitest

```bash
bun run test
```

| Arquivo | Testes | O que valida |
|---|---|---|
| `lib/errors/action-result` | 3 | Result pattern das Server Actions |
| `lib/auth/authorize` | 2 | `requireSession()` e redirecionamentos |
| `lib/utils/task` | 5 | Helpers de status e prioridade |
| `lib/validations/project` | 7 | Schemas Zod de projeto |
| `lib/validations/task` | 9 | Schemas Zod de tarefa |
| `server/ai/ai-limiter` | 3 | Rate limiting por usuário |
| `server/ai/schemas` | 5 | Schemas de input/output da IA |
| `server/ai/generate-subtasks` | 4 | Geração de subtarefas (MSW mock) |
| `ui/badge` | 3 | Renderização e variants |
| `ui/button` | 3 | Renderização e estados |
| `components/project-card` | 5 | Renderização do card de projeto |
| `cn` | 1 | Utilitário de className |
| **Total** | **50** | |

### Testes E2E — Playwright

```bash
bun run test:e2e
```

Testado em **Chromium** e **Mobile** (375px) simultaneamente:

| Spec | Testes | Cobertura |
|---|---|---|
| `global.setup` | 1 | Autenticação global (storage state) |
| `accessibility` | 6 | axe-core em dashboard, projetos, tarefas |
| `auth` | 3 | Login, logout, redirecionamentos |
| `auth-guard` | 3 | Proteção de rotas autenticadas |
| `home` | 1 | Landing page |
| `navigation` | 5 | Sidebar, rotas, dark mode, 404 |
| `projects` | 4 | CRUD, listagem, badges de status |
| `tasks` | 5 | Criação, modal, status, fechar |
| `ai-panel` | 6 | Painel de IA, cards, botões |
| **Total** | **63** | |

### Padrões de Teste

- **Page Object Model (POM)** nos testes E2E para reutilização de seletores
- **Storage state** compartilhado para evitar login repetido entre specs
- **Seletores semânticos** — `getByRole`, `getByLabel`, nunca classes CSS
- **Fixtures** de autenticação via `global.setup.ts`

---

## 🌐 Deploy

### Vercel (Recomendado)

O projeto está configurado para deploy contínuo:

**1. Conecte o repositório na Vercel**

```bash
# Via CLI
bunx vercel --prod
```

Ou conecte diretamente pelo painel em [vercel.com/new](https://vercel.com/new).

**2. Configure as variáveis de ambiente**

No painel: **Settings → Environment Variables** — adicione todas as variáveis do `.env.example` com os valores de produção.

**3. Deploy automático**

Todo `push` na branch `main` dispara um novo deploy. Pull Requests geram previews automáticos.

### Notas importantes

O `postinstall` no `package.json` garante que o Prisma Client é gerado durante o build na Vercel:

```json
"postinstall": "prisma generate"
```

O `src/generated/prisma/` está no `.gitignore` — o client é sempre gerado fresh no servidor.

---

## 🔒 Segurança

| Medida | Implementação |
|---|---|
| **Autenticação** | Better Auth com sessão por cookie HttpOnly |
| **Autorização** | `requireSession()` em toda rota protegida + verificação de ownership |
| **Validação** | Zod em 100% das Server Actions antes de qualquer I/O |
| **Senhas** | Hash bcrypt via Better Auth (nunca armazenadas em plain text) |
| **Headers HTTP** | `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` |
| **CSRF** | Protegido pelo modelo de Server Actions do Next.js |
| **SQL Injection** | Impossível — Prisma usa prepared statements exclusivamente |
| **Rate Limiting** | Implementado nas endpoints de IA por `userId` |
| **Secrets** | Variáveis sensíveis nunca expostas ao cliente (`NEXT_PUBLIC_` prefix obrigatório para variáveis públicas) |

---

## 🧠 Decisões Técnicas

### Por que Bun?
Bun é significativamente mais rápido que Node.js + npm para instalação de dependências e execução de scripts. O ecosistema é compatível com Node.js e o ganho de produtividade no desenvolvimento é imediato.

### Por que Better Auth em vez de NextAuth?
Better Auth oferece tipagem TypeScript superior, API mais simples e integração nativa com Prisma sem adapter externo frágil. O NextAuth v5 ainda estava em beta no início do projeto.

### Por que Server Actions em vez de API Routes para mutações?
Server Actions eliminam a camada de fetch no cliente, reduzem boilerplate e permitem revalidação de cache granular com `revalidatePath`. A tipagem é end-to-end sem necessidade de contratos de API explícitos.

### Por que Groq em vez de OpenAI?
Groq oferece inferência significativamente mais rápida (tokens/segundo) para modelos como llama3, com free tier generoso para desenvolvimento. A API é compatível com o padrão OpenAI, facilitando migração futura.

### Por que Zod 4?
Zod 4 trouxe melhoria expressiva de performance e a API mudou levemente (`.issues` em vez de `.errors`). Vale o custo de migração dado o ganho em projetos de longa duração.

---

## 🗺️ Roadmap

- [ ] **Filtros no board** — por prioridade, responsável e prazo
- [ ] **Animações Framer Motion** — transições suaves no board
- [ ] **Notificações em tempo real** — via Server-Sent Events ou WebSocket
- [ ] **Estimativa de prazo por IA** — análise de histórico para sugerir deadlines
- [ ] **Exportação de relatórios** — PDF e CSV do estado do projeto
- [ ] **Integração com GitHub** — vincular commits e PRs a tarefas
- [ ] **OAuth** — login com Google e GitHub
- [ ] **Mobile app** — React Native com Expo (compartilhando types)

---

## 📄 Licença

Distribuído sob a licença **MIT**. Veja o arquivo [LICENSE](./LICENSE) para mais informações.

```
MIT License — Copyright (c) 2026 Douglas Maciel
```

---

## 👤 Autor

<div align="center">

**Douglas Maciel**

Desenvolvedor Full-Stack com foco em TypeScript, Next.js e arquitetura de aplicações modernas.

[![GitHub](https://img.shields.io/badge/GitHub-MacielDouglas-181717?style=flat-square&logo=github)](https://github.com/MacielDouglas)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Douglas%20Maciel-0A66C2?style=flat-square&logo=linkedin)](https://linkedin.com/in/douglas-maciel)

</div>

---

<div align="center">
  <sub>Feito com ☕, TypeScript e muita atenção aos detalhes.</sub>
</div>
"""

with open('/home/user/output/README.md', 'w', encoding='utf-8') as f:
    f.write(readme)

print(f"README.md gerado: {len(readme)} caracteres / {len(readme.splitlines())} linhas")