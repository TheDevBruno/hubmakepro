# Phase 1: Setup Operacional, Autenticação e Fundação Arquitetural — Research

**Date:** 2026-09-04  
**Status:** Completed  
**Domain:** Next.js 15 (App Router) + Supabase SSR (@supabase/ssr) + PostgreSQL RLS  

---

## 1. Padrões Técnicos Recomendados

### Integração Next.js 15 & Supabase SSR
- A biblioteca oficial `@supabase/ssr` substitui o antigo `@supabase/auth-helpers-nextjs`.
- O cliente de servidor (`createServerClient`) deve encapsular o acesso a cookies assíncronos (`cookies()` do `next/headers`).
- No Next.js 15, `cookies()` retorna uma Promise: `const cookieStore = await cookies()`.
- O Middleware do Next.js deve renovar tokens de autenticação expirados chamando `supabase.auth.getUser()` em vez de `supabase.auth.getSession()` para garantir validação criptográfica no servidor de autenticação do Supabase.

### Schema de Banco & Row Level Security (RLS)
- O trigger PostgreSQL `on_auth_user_created` automatiza o preenchimento de `public.profiles` a partir de `auth.users`.
- Policies RLS devem usar `auth.uid()` para validação em nível de linha com zero tolerância a leaks.

---

## 2. Riscos Mapeados & Gotchas

1. **Gotcha do Cookies no Next.js 15:**
   - Em Server Actions / Route Handlers, a manipulação de cookies deve ser tratada através de funções `get` e `set` injetadas no `createServerClient`.
2. **Exposição de Variáveis Privadas:**
   - Apenas `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` podem ter prefixo `NEXT_PUBLIC_`. A chave `SUPABASE_SERVICE_ROLE_KEY` deve permanecer restrita.
3. **Loop de Redirecionamento no Middleware:**
   - As rotas públicas (`/login`, `/register`, `/api/auth/callback`, `/_next`, `/favicon.ico`) devem ser ignoradas ou explicitamente tratadas para evitar loops infinitos de redirecionamento.

---

## 3. Arquitetura de Validação
- **Unitária:** Validação de schemas Zod (email/senha) e utilitários de formatação.
- **Middleware:** Teste unitário/mock para validar redirecionamento de usuários deslogados.
- **Build / Lint:** `npm run lint` e `npm run typecheck` devem passar sem erros.
