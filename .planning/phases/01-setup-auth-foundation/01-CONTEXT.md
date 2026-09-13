# Phase 1: Setup Operacional, Autenticação e Fundação Arquitetural — Context

**Gathered:** 2026-09-04  
**Status:** Ready for planning / execution  
**Phase:** 01-setup-auth-foundation  
**Sprint Vinculada:** SPRINT-001  

<domain>
## Phase Boundary
Esta fase entrega a fundação técnica completa do Hub MakePro: configuração dos clientes Supabase SSR, proteção de rotas com Middleware Next.js 15, fluxo de autenticação por Email/Senha, schema relacional base no PostgreSQL com Row Level Security (RLS) mandatório, telas em pt-BR e automação de CI/CD.
</domain>

<decisions>
## Implementation Decisions

### 1. Camada de Integração Supabase
- Criar `src/lib/supabase/server.ts` utilizando `@supabase/ssr` (`createServerClient`) para Server Components, Server Actions e Route Handlers.
- Criar `src/lib/supabase/client.ts` utilizando `@supabase/ssr` (`createBrowserClient`) para Client Components.
- Criar `src/lib/supabase/middleware.ts` e `src/middleware.ts` para interceptar requests, atualizar tokens de sessão e redirecionar acessos anônimos para rotas protegidas.

### 2. Schema de Banco de Dados & RLS
- Executar e validar `supabase/migrations/20260904000000_initial_schema.sql`.
- Tabelas base: `profiles`, `organizations`, `organization_members`.
- RLS ativado com policies estritas: usuários só visualizam/editam seus próprios dados e recursos de organizações onde são membros.
- Trigger `on_auth_user_created` sincronizando novos usuários com `profiles`.

### 3. Interface de Autenticação & Dashboard Base
- Rota pública `/login`: formulário moderno de login com feedback em pt-BR.
- Rota pública `/register`: formulário de cadastro com validação client/server.
- Rota privada `/dashboard`: layout inicial protegido com header, exibição do usuário logado e botão de logout seguro.
- Componentes com feedback visual: loading states, tratamento amigável de erros e toasts.

### 4. Testes & Automação de Qualidade
- Testes unitários para utilitários e validações de formulário.
- Testes para middleware de autenticação.
- Script de CI/CD em `.github/workflows/ci.yml` garantindo lint, typecheck, test e build.
</decisions>

<canonical_refs>
## Canonical References
- `SYSTEM_INSTRUCTION.md` — 32 regras operacionais do SaaS Development OS v1.0.
- `docs/architecture/ARCHITECTURE.md` — Arquitetura de camadas do sistema.
- `docs/architecture/DATA_MODEL.md` — Modelo ER e regras de isolamento multi-tenant.
- `docs/security/SECURITY.md` — Diretrizes de segurança e RLS.
- `sprints/sprint-001/PLAN.md` — Plano mestre da Sprint 001.
</canonical_refs>

<threat_model>
## Security & Threat Model (ASVS L1)
- **IDOR / BOLA:** Mitigado via PostgreSQL Row Level Security (RLS) baseado em `auth.uid()`.
- **Exposição de Segredos:** Variável `SUPABASE_SERVICE_ROLE_KEY` restrita ao backend/server actions; jamais exposta com prefixo `NEXT_PUBLIC_`.
- **Hijacking de Sessão:** Cookies de sessão configurados como `httpOnly`, `secure` e `SameSite=Lax`.
- **Injeção de Código:** Schemas de entrada sanitizados e queries parametrizadas via PostgREST/Supabase client.
</threat_model>
