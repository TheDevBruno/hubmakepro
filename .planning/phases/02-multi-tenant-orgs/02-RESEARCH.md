# Phase 2: Gestão Multi-tenant, Organizações e Perfis — Research

**Phase:** 02-multi-tenant-orgs  
**Sprint:** SPRINT-002  
**Date:** 2026-09-13  

---

## 1. Contexto Arquitetural e Estado do Código

- O schema base já possui `profiles`, `organizations` e `organization_members` na migration `20260904000000_initial_schema.sql`.
- Faltam policies completas de INSERT/UPDATE/DELETE para organizações e membros, além de views/helpers para identificar a organização ativa e verificar permissões (RBAC).
- Precisamos de Server Actions dedicadas para:
  1. `createOrganization(name: string, slug?: string)`
  2. `switchOrganization(organizationId: string)` (via cookie seguro `x-current-org-id` ou query param)
  3. `inviteMember(orgId: string, email: string, role: 'admin' | 'member')`
  4. `updateMemberRole(orgId: string, memberId: string, role: 'owner' | 'admin' | 'member')`
  5. `removeMember(orgId: string, memberId: string)`
  6. `updateProfile(fullName: string, avatarUrl?: string)`

---

## 2. Requisitos a Atender

- **`TENANT-01`**: Perfil criado automaticamente via trigger no signup (já existente no DB, validar e enriquecer com edição no perfil).
- **`TENANT-02`**: Usuário pode criar e gerenciar Organizações (`organizations`).
- **`TENANT-03`**: Gestão de membros com controle RBAC (`owner`, `admin`, `member`) via `organization_members`.
- **`TENANT-04`**: Alternância rápida de organização ativa no dashboard com sincronização de contexto.
- **`DB-03`**: Isolamento multi-tenant garantido no PostgreSQL por RLS policies testadas.

---

## 3. Componentes e UI

1. **Organization Switcher (Seletor de Tenant):** Componente no Header/Sidebar permitindo selecionar a organização ativa e botão "Criar Nova Organização".
2. **Página de Gestão da Organização (`/settings/organization` ou `/orgs`):** Listagem de membros, alteração de nome da org, convite de novos membros e alteração de papéis.
3. **Página de Perfil do Usuário (`/settings/profile`):** Edição de nome completo e visualização de dados de conta.

---

## 4. Estratégia de Testes

- Testes unitários para validação de slug e roles.
- Testes de isolamento multi-tenant garantindo que membros de Org A não acessem recursos de Org B.
