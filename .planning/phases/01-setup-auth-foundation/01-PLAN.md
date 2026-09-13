# Phase 1: Setup Operacional, Autenticação e Fundação Arquitetural — Plan

**Phase:** 01-setup-auth-foundation  
**Sprint:** SPRINT-001  
**Status:** Ready to Execute  
**Requirements Covered:** `AUTH-01`, `AUTH-02`, `AUTH-03`, `AUTH-04`, `AUTH-05`, `DB-01`, `DB-02`, `UI-01`, `UI-02`, `UI-03`, `QUAL-01`, `QUAL-02`  

---

<threat_model>
### Threat Model (ASVS L1)
- **IDOR / Data Leakage:** Prevenido com Row Level Security (RLS) mandatório no PostgreSQL com policies em `auth.uid()`.
- **Secret Leaks:** `SUPABASE_SERVICE_ROLE_KEY` estritamente server-side.
- **Session Hijacking:** Cookies seguros gerenciados via `@supabase/ssr`.
- **Injection / Malformed Input:** Validação de formulários e queries parametrizadas.
</threat_model>

---

<execution_waves>

### Wave 1: Fundação Supabase SSR & Middleware (Infraestrutura)
**Objetivo:** Estabelecer a comunicação segura com o Supabase e controle de rotas.

- [ ] **Task 1.1:** Criar `src/lib/supabase/client.ts` com `createBrowserClient`.
- [ ] **Task 1.2:** Criar `src/lib/supabase/server.ts` com `createServerClient` compatível com Next.js 15 (`await cookies()`).
- [ ] **Task 1.3:** Criar `src/lib/supabase/middleware.ts` e `src/middleware.ts` com renovação de sessão e proteção de rotas privadas.
- [ ] **Task 1.4:** Criar rota de callback de autenticação em `src/app/api/auth/callback/route.ts`.

### Wave 2: Autenticação, Server Actions & UI (Frontend + Backend)
**Objetivo:** Entregar as telas de Login, Cadastro e Dashboard em português (`pt-BR`).

- [ ] **Task 2.1:** Criar Server Actions de autenticação em `src/app/actions/auth.ts` (Login, Signup, Logout) com tratamento de erros.
- [ ] **Task 2.2:** Criar página e formulário de Login em `src/app/(auth)/login/page.tsx` com loading states e feedback visual.
- [ ] **Task 2.3:** Criar página e formulário de Cadastro em `src/app/(auth)/register/page.tsx`.
- [ ] **Task 2.4:** Criar layout e página do Dashboard em `src/app/(dashboard)/dashboard/page.tsx` exibindo informações do usuário logado e botão de logout.
- [ ] **Task 2.5:** Criar página raiz (`src/app/page.tsx`) com apresentação e redirecionamento para login/dashboard.

### Wave 3: Validação de Qualidade, Testes & CI/CD (Quality Gate)
**Objetivo:** Garantir integridade, tipagem estrita e aprovação de todos os gates.

- [ ] **Task 3.1:** Criar testes unitários para Server Actions e validações em `tests/unit/auth.test.ts`.
- [ ] **Task 3.2:** Validar execução de `npm run lint` e `npm run typecheck`.
- [ ] **Task 3.3:** Executar `npm test` e verificar suite completa.
- [ ] **Task 3.4:** Preencher `sprints/sprint-001/VALIDATION.md`, `QA.md` e atualizar `docs/PROJECT_STATE.md` e `.planning/STATE.md`.

</execution_waves>

---

## Critérios de Aceitação & Verificação
1. O usuário consegue se cadastrar, receber confirmação e logar.
2. Acessar `/dashboard` sem login redireciona automaticamente para `/login`.
3. Todas as mensagens e interfaces estão em português (`pt-BR`).
4. Nenhum erro de build, lint ou typecheck.
