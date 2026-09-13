# Plan 02-01: Gestão Multi-tenant, Organizações e Perfis

**Phase:** 02-multi-tenant-orgs  
**Sprint:** SPRINT-002  
**Requirements:** `TENANT-01`, `TENANT-02`, `TENANT-03`, `TENANT-04`, `DB-03`  
**Status:** Ready to Execute  

---

## Task 1: Migration de Refinamento de RLS e Funções Multi-tenant
- **Arquivo:** `supabase/migrations/20260913000000_multi_tenant_policies.sql`
- **Ações:**
  1. Adicionar policies de INSERT, UPDATE e DELETE para `organizations` e `organization_members`.
  2. Criar função auxiliar PostgreSQL `public.is_org_admin(org_id UUID)` e `public.is_org_member(org_id UUID)` para simplificar checagens RLS.
  3. Adicionar trigger ou transaction-safe policy para permitir criação de organizações por usuários logados e vinculação automática como `owner`.

## Task 2: Server Actions para Multi-tenancy e Perfis
- **Arquivo:** `src/app/actions/organizations.ts` e `src/app/actions/profile.ts`
- **Ações:**
  1. `createOrganizationAction`: Criação de org + vínculo `owner` do criador.
  2. `switchOrganizationAction`: Define o cookie `current_org_id`.
  3. `inviteMemberAction` / `removeMemberAction`: Gestão de membros com checagem de permissão RBAC.
  4. `updateProfileAction`: Atualização do nome completo do usuário.

## Task 3: Componentes de Interface Multi-tenant
- **Arquivos:**
  - `src/components/organization-switcher.tsx`: Dropdown no header para alternar organização ou criar nova.
  - `src/app/(dashboard)/settings/organization/page.tsx`: Gestão de membros e detalhes da organização ativa.
  - `src/app/(dashboard)/settings/profile/page.tsx`: Edição do perfil do usuário.
  - Atualização do `src/app/(dashboard)/dashboard/page.tsx` para integrar o switcher e exibir a organização ativa.

## Task 4: Testes Automatizados de Isolamento Multi-tenant e RBAC
- **Arquivo:** `tests/unit/multi-tenant.test.ts`
- **Ações:**
  1. Testes unitários para regras de permissão (RBAC: owner vs admin vs member).
  2. Testes de validação de slug e nomes de organização.
  3. Testes de integridade do cookie de organização e mensagens em `pt-BR`.

---

## Verificação e Critérios de Aceite
- [ ] Usuário pode criar nova organização e torna-se `owner` automaticamente.
- [ ] Usuário pode alternar entre organizações e a UI reflete a organização ativa.
- [ ] Usuário com papel `owner`/`admin` pode gerenciar membros da organização.
- [ ] Usuário pode atualizar suas informações de perfil (`full_name`).
- [ ] 100% dos testes unitários passam sem erros.
