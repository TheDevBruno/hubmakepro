# Phase 2: Gestão Multi-tenant, Organizações e Perfis — Context

**Phase:** 02-multi-tenant-orgs  
**Sprint:** SPRINT-002  
**Created:** 2026-09-13  

---

## 1. Visão Geral e Fronteiras do Escopo

A Fase 2 consolida a arquitetura multi-tenant B2B do SaaS Hub MakePro. O objetivo é permitir que cada usuário possa:
- Possuir seu perfil autônomo atualizável.
- Pertencer a uma ou mais organizações/tenants.
- Criar novas organizações com geração automática de slug seguro.
- Alternar a organização ativa diretamente pela interface de navegação.
- Convidar e gerenciar outros membros com controle RBAC (`owner`, `admin`, `member`).
- Garantir que as políticas RLS no PostgreSQL impeçam vazamento de dados entre diferentes organizações.

---

## 2. Decisões Arquiteturais

1. **Identificação da Organização Ativa:** Cookie seguro `current_org_id` manipulado no Server Action e lido no Server Component/Middleware. Caso o usuário não tenha cookie, seleciona a primeira organização da qual ele é membro.
2. **PostgreSQL RLS Policies:**
   - Migration `20260913000000_multi_tenant_policies.sql` refinando permissões de INSERT/UPDATE em `organizations` e `organization_members`.
   - Owners/Admins podem adicionar e alterar membros.
   - Qualquer usuário autenticado pode criar uma organização (tornando-se `owner` via trigger/action transacional).
3. **Padrão de Código:** Next.js 15 Server Actions com validação de tipagem, feedback em `pt-BR` e revalidação de caminhos (`revalidatePath`).
