# Plan 03-01: Dashboard Operacional e Métricas Iniciais

**Phase:** 03-operational-dashboard  
**Sprint:** SPRINT-003  
**Requirements:** `DASH-01`  
**Status:** Ready to Execute  

---

## Task 1: Componente Sidebar e Layout Shell do Dashboard
- **Arquivos:**
  - `src/components/dashboard-sidebar.tsx`: Sidebar lateral com navegação por ícones Lucide, indicação de rota ativa e suporte responsivo.
  - `src/app/(dashboard)/layout.tsx`: Layout mestre com Sidebar + Header integrado.

## Task 2: Widgets Operacionais e Visão de Métricas
- **Arquivos:**
  - `src/components/dashboard/metric-cards.tsx`: Componente com cards de métricas (Membros do Tenant, Status RLS, Saúde dos Serviços, Pipelines Ativas).
  - `src/components/dashboard/quick-actions.tsx`: Atalhos para ações comuns no tenant.
  - `src/components/dashboard/activity-feed.tsx`: Linha do tempo de eventos operacionais recentes em `pt-BR`.

## Task 3: Refatoração da Página Principal do Dashboard
- **Arquivo:** `src/app/(dashboard)/dashboard/page.tsx`
- **Ações:** Integrar os novos widgets com queries reais ao Supabase da organização ativa (contagem de membros, roles e dados do tenant).

## Task 4: Testes de Renderização e Componentes
- **Arquivo:** `tests/unit/dashboard.test.ts`
- **Ações:** Testes unitários para a lógica de exibição de métricas e integridade dos links de navegação da sidebar.

---

## Verificação e Critérios de Aceite
- [ ] Sidebar renderiza todas as opções de navegação com design premium escuro.
- [ ] Dashboard exibe métricas calculadas em tempo real com base no tenant ativo.
- [ ] Ações rápidas direcionam corretamente para as áreas de configurações e operações.
- [ ] Testes unitários validam a integridade dos dados do dashboard.
