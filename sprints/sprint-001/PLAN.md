# SPRINT 001: SETUP OPERACIONAL E FUNDAÇÃO ARQUITETURAL

## Metadados
- **Nome:** Setup Operacional e Fundação Arquitetural
- **Status:** `IN DEVELOPMENT`
- **Versão Alvo:** `v0.1.0`

## Objetivo
Implementar a base operacional do **SaaS Development OS v1.0**, configurar o ambiente Next.js 15 com App Router, clientes do Supabase (SSR/Browser), esquema base de banco de dados, fluxo de autenticação e suíte inicial de testes e validações.

---

## 1. ESCOPO

### Incluído
- [ ] Estruturação completa do SaaS Development OS (.agents, .skills, docs, sprints, changes)
- [ ] Configuração de clientes Supabase (`src/lib/supabase/server.ts`, `client.ts`, `middleware.ts`)
- [ ] Criação da migration inicial (`supabase/migrations/`) com tabelas de perfis e organizações
- [ ] Configuração do Middleware de autenticação e proteção de rotas
- [ ] Telas de Login, Cadastro e Dashboard inicial em `pt-BR`
- [ ] Suíte de testes unitários e validação de build

### Fora de Escopo
- Módulo de cobrança/Stripe (Sprint 007)
- Gestão avançada de projetos e integrações complexas (Sprint 004)
- Uploads massivos de arquivos (Sprint 005)

---

## 2. DEPENDÊNCIAS
- **Sprint anterior:** N/A (Sprint 000 concluída com arquitetura)
- **Serviço:** Supabase Project (PostgreSQL + Auth)
- **Database:** Supabase Migrations
- **Integração:** Vercel Hosting

---

## 3. TAREFAS
- **TASK-001:** Setup da estrutura e governança SaaS OS (Agente Architect/Planner)
- **TASK-002:** Configuração dos clientes Supabase SSR e Middleware (Agente Developer)
- **TASK-003:** Criação do Schema inicial de banco e RLS policies (Agente Database)
- **TASK-004:** Implementação da UI de Auth e Dashboard base (Agente Developer/UX)
- **TASK-005:** Criação e execução dos testes automatizados (Agente Tester)
- **TASK-006:** Validação do gate, QA e relatório final da Sprint (Agente QA/Reviewer)

---

## 4. ACCEPTANCE CRITERIA
- **AC-001:** O sistema possui todos os documentos e agentes do SaaS Development OS operacionais.
- **AC-002:** O usuário consegue se cadastrar, fazer login e acessar o dashboard protegido.
- **AC-003:** O banco de dados possui RLS habilitado e testado com isolamento de dados.
- **AC-004:** Toda a interface e mensagens estão 100% em português brasileiro (`pt-BR`).
- **AC-005:** Lint, Typecheck, Testes e Build executam com sucesso.

---

## 5. MATRIZ DE RISCOS
| ID | Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|---|
| R-001 | Inconsistência de sessão entre SSR e Client | Média | Alto | Utilizar rigorosamente `@supabase/ssr` com middleware configurado |
| R-002 | Vazamento de dados em queries sem RLS | Baixa | Crítico | Auditoria de 100% das tabelas criadas no banco com RLS ativo |

---

## 6. DATABASE
- **Alterações previstas:** Migration inicial com `profiles`, `organizations`, `organization_members`.
- **RLS:** Ativo e obrigatório em todas as tabelas.

---

## 7. SECURITY
- Validação de tokens JWT via Supabase Auth
- Sanitização de inputs nos formulários
- Proteção contra IDOR via RLS no PostgreSQL

---

## 8. TESTES
- Testes unitários para utilitários e validações
- Teste de middleware de autenticação
- Teste de schema e constraints de banco

---

## 9. DEPLOYMENT
- **Ambiente:** Development → Preview (Vercel) → Production

---

## 10. DEFINITION OF DONE (DoD)
- [ ] Implementação de código concluída
- [ ] Testes executados com sucesso
- [ ] Validation Gate preenchido e aprovado
- [ ] QA Report aprovado
- [ ] Preview Vercel testado (Smoke Test)
- [ ] Documentação e `PROJECT_STATE.md` atualizados
