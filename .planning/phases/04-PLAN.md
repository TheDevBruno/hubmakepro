# PLAN: Phase 4 — Business Type Architecture

## Objetivo da Fase
Modelar a arquitetura formal e taxonomia de **Tipos de Negócio (Business Types)** do ecossistema de beleza e estética do **Lab Beauty SaaS v2.0**, provendo:
1. **Catálogo de Tipos de Negócio Tipado:** Suporte aos nichos fundamentais:
   - `beauty_salon` (Salão Completo / Multidisciplinar)
   - `lash_designer` (Extensão de Cílios & Lash Lifting)
   - `makeup_artist` (Maquiagem Social, Noivas & Eventos)
   - `nail_designer` (Unhas de Fibra, Gel & Manicure)
   - `esthetics_clinic` (Clínica de Estética & Sobrancelhas)
   - `barbershop` (Barbearia & Cuidados Masculinos)
2. **Definição de Metadados de Nicho:** Vocabulário contextual, ícones sugeridos, terminologia da cliente/paciente e categorização operacional.
3. **Persistência de Business Type na Organização:** Extensão do schema do banco (`business_type` em `organizations` ou `organization_settings`) com migration versionada Supabase e RLS.
4. **Helpers de Consulta & Validação:** Utilitários server e client-side para consultar características do nicho do tenant e preparar terreno para a Phase 5 (Business Templates Engine).

---

## 1. Escopo & Entregáveis

### 1.1 Domínio de Business Types (`src/lib/business-types/`)
- **`types.ts` (`src/lib/business-types/types.ts`):**
  - Definição do enum/union `BusinessType`:
    `'beauty_salon' | 'lash_designer' | 'makeup_artist' | 'nail_designer' | 'esthetics_clinic' | 'barbershop'`
  - Interface `BusinessTypeDefinition`:
    - `id: BusinessType`
    - `name: string` (ex: "Lash Designer & Cílios")
    - `description: string`
    - `iconName: string`
    - `badgeColor: string`
    - `clientTerminology: { singular: string; plural: string }` (ex: "Cliente", "Paciente")
    - `defaultCategories: string[]` (ex: `['lash_extension', 'lash_lifting', 'brow_lamination']`)
    - `suggestedBufferMinutes: number`
- **`catalog.ts` (`src/lib/business-types/catalog.ts`):**
  - Dicionário exaustivo `BUSINESS_TYPE_CATALOG: Record<BusinessType, BusinessTypeDefinition>`.
  - Helper `getBusinessType(type: string | undefined | null): BusinessTypeDefinition`.
  - Helper `listBusinessTypes(): BusinessTypeDefinition[]`.
  - Helper `isValidBusinessType(type: string): type is BusinessType`.
- **`index.ts` (`src/lib/business-types/index.ts`):** Barrel export unificado.

### 1.2 Persistência no Banco de Dados (Supabase Migration)
- **Migration `20260920000000_business_type_architecture.sql`:**
  - Adicionar coluna `business_type TEXT NOT NULL DEFAULT 'beauty_salon'` na tabela `organizations` (ou `organization_settings`).
  - Adicionar check constraint: `CHECK (business_type IN ('beauty_salon', 'lash_designer', 'makeup_artist', 'nail_designer', 'esthetics_clinic', 'barbershop'))`.
  - Criar índice para performance em queries por nicho.

### 1.3 Integração Server-Side & Server Actions
- Atualizar `createOrganization` em `src/app/actions/organizations.ts` para receber `businessType` opcional/obrigatório com fallback para `'beauty_salon'`.
- Atualizar `getActiveOrganizationContext` em `src/lib/tenant.ts` para retornar `businessType: BusinessType` junto com os metadados do tenant.

---

## 2. Dependências & Arquitetura
- **Depende de:** Phase 1 (Design System), Phase 2 (Application Shell), Phase 3 (Multi-Tenant & RBAC).
- **Consumido por:** Phase 5 (Business Templates Engine), Phase 6 (Feature Flags), Phase 8 (Themes), Phase 9 (Onboarding Wizard), Phase 10 (Dashboard Driven).
- **Sem Quebra:** Tenants existentes assumem `'beauty_salon'` por default, preservando compatibilidade retroativa integral.

---

## 3. Plano de Testes & Validação (Quality Gate)
- Criar suíte de testes unitários em `tests/unit/business-types.test.ts` validando:
  - Validação de todos os 6 nichos do catálogo.
  - Integridade de metadados, terminologias e categorias padrão.
  - Fallback gracioso para tipos desconhecidos ou inválidos.
  - Resolução de `businessType` no contexto do tenant.
- Executar `npx vitest run` e validar 100% de aprovação (mínimo de 50+ testes passando no total).

---

## 4. Rastreabilidade de Requisitos
- Atende ao requisito: `BIZ-TMPL-01` especificado em `.planning/REQUIREMENTS.md`.
