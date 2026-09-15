# Hub MakePro (Lab Beauty SaaS OS)

## What This Is
**Hub MakePro (Lab Beauty SaaS)** é uma plataforma SaaS multi-tenant orientada a organizações (**Organization-Driven**), projetada especificamente para o ecossistema de beleza, estética e bem-estar (Salões de Beleza, Maquiadoras, Lash Designers, Nail Designers, Clínicas de Estética e Barbearias).

A plataforma permite que o usuário crie e personalize sua organização a partir de **Business Types** e **Templates** prontos, configurando dinamicamente módulos/players, regras de negócio operacionais, split financeiro, identidade visual própria e permissões de acesso (RBAC).

## Core Value
Permitir que qualquer profissional ou salão de beleza crie um espaço digital totalmente adaptado ao seu nicho de atuação em menos de 2 minutos, com controle granular de agendamentos, fichas de anamnese inteligentes, catálogo pré-configurado, faturamento e experiência visual de altíssimo padrão.

---

## Estrutura de Milestones

### Milestones Arquivados
- **[Milestone v1.0 — Beauty Core Release](file:///z:/DevOps%20-%20FullStack/Hub%20MakePro/.planning/milestones/v1.0-ROADMAP.md)**: 7 Fases entregues (Auth SSR, Multi-tenant, Catálogo por Nicho, Especialistas & Comissões, Agenda Operacional & Anamnese, Agendamento Online /book/[slug] e Fechamento de Caixa).
- **[Milestone v1.1 — Refinamento Operacional, Edição Dinâmica & Performance](file:///z:/DevOps%20-%20FullStack/Hub%20MakePro/.planning/milestones/v1.1-ROADMAP.md)**: 5 Fases entregues (Skeletons de Performance, Configurações Completas do Salão, Gestão de Horários de Especialistas, Ficha 360° de Clientes e Reagendamento com Modais na Agenda).

---

## Active Milestone: v2.0 — Lab Beauty SaaS: Organization-Driven Architecture & UI/UX Design System

### 1. Contexto & Objetivos
Evoluir a arquitetura atual para um modelo verdadeiramente **Organization-Driven**, onde a aplicação se molda dinamicamente às escolhas da organização:
- **Identidade Própria:** Nome, slug, logotipo, cores de tema.
- **Tipo de Negócio (Business Type):** Salão Completo, Lash Designer, Maquiadora, Nail Designer, Clínica de Estética, Barbearia.
- **Templates:** Injeção automática de serviços padrão, fichas de anamnese do nicho e configurações sugeridas.
- **Módulos / Players:** Ativação/desativação seletiva de recursos (ex: salão pequeno usa apenas Agenda + Clientes; clínica usa Anamnese Avançada + Comandas).
- **Regras Operacionais:** Intervalo entre procedimentos (buffer time), tolerâncias a atrasos, políticas de cancelamento.
- **Redesign UI/UX Incremental:** Design System moderno, consistente, acessível (WCAG 2.1 AA) com os 5 estados obrigatórios em cada componente (`Default`, `Loading`, `Empty`, `Error`, `Success`).

---

### 2. Não-Escopo do Marco v2.0
- Refatoração destrutiva ou remoção de dados existentes no Supabase (manter compatibilidade com tenants ativos).
- Integração direta com gateway bancário de cartão de crédito no agendamento público (permanece Pix/Balcão neste ciclo).
- App nativo mobile (foco total em Progressive Web App / Web Responsivo).

---

### 3. Requisitos Arquiteturais & Segurança
- **Isolamento de Tenant:** 100% das consultas e mutações continuam filtradas por `organization_id` validado estritamente no servidor via `getActiveOrganizationId` e RLS do PostgreSQL.
- **Autorização RBAC:** Validação baseada no vínculo em `organization_members` (`owner`, `admin`, `specialist`, `receptionist`, `financial`).
- **Segurança da Chave Service Role:** Restrita exclusivamente a rotas/scripts administrativos protegidos server-side.
- **Migrations Versionadas:** Todo ajuste de schema será versionado em `supabase/migrations/`.

---

### 4. Estrutura de Fases do Marco v2.0

| Fase | Título | Foco Principal |
| :--- | :--- | :--- |
| **Phase 1** | Design System Foundation | Design Tokens HSL, tipografia, elevação e componentes atômicos com 5 estados |
| **Phase 2** | App Shell & Navigation | Sidebar colapsável, Header dinâmico, Bottom Bar mobile e menu contextual |
| **Phase 3** | Organization Multi-Tenant Core | Matriz de permissões RBAC ampliada e reforço de RLS |
| **Phase 4** | Business Type Architecture | Modelagem de tipos de negócio (Salão, Make, Lash, Nails, Estética, Barba) |
| **Phase 5** | Business Templates Engine | Motor de injeção automática de serviços e anamnese sugeridos |
| **Phase 6** | Modules & Feature Flags | Ativação/desativação granular de módulos da organização |
| **Phase 7** | Business Rules Configuration | Configurações de buffer time, tolerância e políticas operacionais |
| **Phase 8** | Theme & Layout Configuration | Personalização de cores de destaque, logos e visual público |
| **Phase 9** | Onboarding Wizard | Fluxo multi-step guiado para criação e configuração rápida do espaço |
| **Phase 10** | Organization-Driven Dashboard | Painel principal 100% adaptado aos módulos e nicho ativos |
| **Phase 11+**| Progressive Modules Migration | Refatoração incremental das telas operacionais existentes |

---

### 5. Quality Gate Obrigatório
- **Testes Unitários:** Validação contínua com `vitest run` antes de qualquer commit.
- **TypeScript:** Sem `any` implícito e tipagem rigorosa.
- **Linguagem:** 100% das mensagens, labels e modais em português (`pt-BR`).
