# PLAN: Phase 3 — Organization Domain & Multi-Tenant Foundation

## Objetivo da Fase
Consolidar e reforçar a arquitetura **Multi-Tenant e RBAC** do **Lab Beauty SaaS v2.0**, garantindo isolamento estrito de dados entre organizações no servidor e no banco (zero confiança no cliente), resolução determinística de organização ativa, autorização granular por papéis (`owner`, `admin`, `specialist`, `receptionist`, `financial`), proteção de rotas/ações e filtragem de navegação coerente.

---

## 1. Escopo & Entregáveis

### 1.1 Arquitetura de Autorização & RBAC (`src/lib/auth/` e `src/lib/rbac/`)
- **`roles.ts` / `permissions.ts` (`src/lib/rbac/`):**
  - Definição tipada dos papéis: `owner`, `admin`, `specialist`, `receptionist`, `financial`.
  - Matriz de permissões granulares:
    - `org:manage` (owner, admin)
    - `members:manage` (owner, admin)
    - `services:manage` (owner, admin)
    - `specialists:manage` (owner, admin)
    - `appointments:view` (todos os membros)
    - `appointments:manage` (owner, admin, receptionist, specialist)
    - `clients:view` (todos os membros)
    - `clients:manage` (todos os membros)
    - `financial:view` (owner, admin, financial)
    - `financial:manage` (owner, admin, financial)
- **`authorization.ts` (`src/lib/auth/authorization.ts`):**
  - Helper server-side `requireOrgMembership(supabase, orgId?, requiredPermission?)` que valida:
    1. Usuário autenticado
    2. Organização ativa resolvida e validada contra associação do usuário
    3. Papel do usuário na organização e verificação de permissão necessária
    4. Retorna `{ user, orgId, role, permissions }` ou lança erro / redireciona com segurança.

### 1.2 Multi-Tenant Core & Resolução Segura (`src/lib/tenant.ts`)
- Reforçar `getActiveOrganizationContext(supabase)` retornando não apenas o ID, mas o papel do usuário no tenant atual e o objeto de organização validado.
- Garantir que se um usuário tentar forjar cookie de organização alheia, o sistema faça fallback automático para a organização legítima ou retorne nulo.

### 1.3 Filtragem de Navegação por Papel (`src/lib/design-system/navigation.ts`)
- Implementar `filterNavItemsByRole(items: NavItem[], role: UserRole): NavItem[]`.
- Ocultar rotas administrativas e financeiras (`/financial`, `/settings/organization`, `/specialists`) para papéis sem permissão (`specialist`, `receptionist`), mantendo o drawer e bottom nav alinhados.

### 1.4 Reforço de Server Actions com Autorização Server-Side
- Auditar e atualizar Server Actions sensíveis (`financial.ts`, `services.ts`, `specialists.ts`, `organizations.ts`, `appointments.ts`, `clients.ts`) para usar `requireOrgMembership` com validação estrita de permissões antes de qualquer mutação.
- Eliminar qualquer leitura de `organization_id` cru vindo do client sem validação server-side.

### 1.5 Database & RLS Enforcement (`supabase/migrations/`)
- Criar migration `20260916000000_rbac_extended_roles.sql` para suportar os novos papéis (`specialist`, `receptionist`, `financial`) na constraint da tabela `organization_members` e atualizar as funções SQL `is_org_member` e `is_org_admin` / `has_org_permission`.

---

## 2. Dependências & Arquitetura
- **Depende de:** Phase 1 (Design System) e Phase 2 (Application Shell & Navigation).
- **Consumido por:** Phase 4 (Business Types), Phase 5 (Templates Engine), Phase 6 (Feature Flags / Módulos).
- **Sem Quebra:** Compatibilidade mantida com o `AppShell`, `OrganizationSwitcher` e rotas operacionais existentes.

---

## 3. Plano de Testes & Validação (Quality Gate)
- Criar suite de testes unitários em `tests/unit/rbac-multi-tenant.test.ts` cobrindo:
  - Resolução de organização e proteção contra tenant injection / spoofing de cookie.
  - Matriz de papéis RBAC (`owner`, `admin`, `specialist`, `receptionist`, `financial`) e permissões correspondentes.
  - Comportamento de `filterNavItemsByRole`.
  - Validação de autorização em operações de mutação (Server Actions).
  - Isolamento estrito de dados entre Tenant A e Tenant B.
- Executar `npx vitest run` e validar 100% de aprovação.

---

## 4. Rastreabilidade de Requisitos
- Atende integralmente aos requisitos: `ORG-CORE-01`, `ORG-CORE-02`, `ORG-CORE-03` e `ORG-CORE-04` de `.planning/REQUIREMENTS.md`.
