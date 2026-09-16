# PLAN: Phase 2 — Application Shell & Responsive Navigation

## Objetivo da Fase
Construir a nova casca responsiva (**Application Shell**) do **Lab Beauty SaaS**, integrando o Design System da Phase 1, com suporte a:
1. **Sidebar Moderna & Colapsável** para Desktop / Tablet com hierarquia semântica de seções.
2. **Top Header Dinâmico** com Seletor de Organização Contextual, Perfil do Usuário e Notificações/Ações.
3. **Bottom Navigation Bar para Dispositivos Móveis (Mobile-First)** com os atalhos operacionais mais usados (Agenda, Clientes, Início, Serviços, Menu).
4. **Menu Dinâmico Adaptativo** preparado para renderizar itens de navegação baseados nos módulos ativos da organização.
5. **Transições de Rota Fluidas** com feedback visual de carregamento e acessibilidade (ARIA).

---

## 1. Escopo & Entregáveis

### 1.1 Shell Component Family (`src/components/shell/`)
- **`AppShell`** (`src/components/shell/app-shell.tsx`): Contêiner mestre com controle de estado responsivo (sidebar expandida/colapsada no desktop e drawer/bottom bar no mobile).
- **`AppSidebar`** (`src/components/shell/app-sidebar.tsx`): Sidebar com agrupamento semântico (`Principal`, `Operação & Beleza`, `Financeiro & Salão`, `Ajustes`), badge de módulos ativos e link de agendamento online destacado.
- **`AppHeader`** (`src/components/shell/app-header.tsx`): Header superior com OrganizationSwitcher refinado com o novo Design System, atalhos rápidos e perfil do usuário autenticado.
- **`MobileNav`** (`src/components/shell/mobile-nav.tsx`): Barra inferior fixa para navegação rápida com toque fácil em telas pequenas (`<= 768px`).
- **`NavigationConfig`** (`src/lib/design-system/navigation.ts`): Estrutura tipada de itens de navegação com ícones Lucide, rotas e identificador de módulo (`featureKey`).

### 1.2 Atualização do Layout Base (`src/app/(dashboard)/layout.tsx`)
- Integrar os novos componentes de Shell no App Router sem quebrar as rotas e páginas atuais.
- Preservar a resolução dinâmica de organização via `getActiveOrganizationId`.

---

## 2. Dependências & Arquitetura
- **Depende de:** Phase 1 (Design Tokens, `Button`, `Badge`, `Card`, `Modal`).
- **Compatibilidade:** Suporta Server Components (dados de sessão/org) e Client Components (interações de navegação e drawer).
- **Sem Quebra:** Todas as páginas existentes continuarão sendo renderizadas dentro do slot `{children}` do novo Shell.

---

## 3. Plano de Testes & Validação (Quality Gate)
- Criar suíte de testes unitários em `tests/unit/app-shell.test.ts` validando:
  - Estrutura e integridade da lista de itens de navegação.
  - Agrupamentos semânticos (Principal, Operação, Gestão).
  - Resolução de rotas ativas e atributos de acessibilidade (ARIA).
- Executar `npx vitest run` e validar aprovação de 100% dos testes.

---

## 4. Rastreabilidade de Requisitos
- Atende aos requisitos: `SHELL-01`, `SHELL-02`, `SHELL-03` especificados em `.planning/REQUIREMENTS.md`.
