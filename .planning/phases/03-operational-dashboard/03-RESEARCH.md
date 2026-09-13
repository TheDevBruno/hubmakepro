# Phase 3: Dashboard Operacional e Métricas Iniciais — Research

**Phase:** 03-operational-dashboard  
**Sprint:** SPRINT-003  
**Date:** 2026-09-13  

---

## 1. Contexto & Requisitos
- **Requisito Central:** `DASH-01` — Dashboard principal renderizando métricas de status e acesso rápido às funcionalidades centrais em português do Brasil (`pt-BR`).
- **Necessidades da Interface:**
  1. Sidebar de navegação estruturada e responsiva com links para Dashboard, Projetos (Sprint 004 preview), Documentos (Sprint 005 preview), Configurações e Logs.
  2. Métricas operacionais em tempo real da organização ativa (total de membros, status do tenant, atividades recentes, métricas de deploy/pipelines).
  3. Feedbacks visuais e interativos (Empty States, Quick Actions, Skeletons de carregamento).
  4. Header consistente com alternador de organização e menu de perfil.

---

## 2. Decisões Arquiteturais e Componentização
1. **Layout Shell Compartilhado (`src/app/(dashboard)/layout.tsx`):** Unifica Sidebar, Header, Breadcrumbs e estado do tenant ativo para todas as páginas sob `(dashboard)`.
2. **Dashboard Widgets:**
   - `MetricCards`: Total de membros da org, projetos ativos, saúde do sistema, tempo de atividade.
   - `QuickActions`: Acesso rápido para convidar membro, criar novo projeto/pipeline, exportar relatórios.
   - `ActivityFeed`: Lista cronológica simulada/auditada de eventos da organização.
3. **Padrão de Cores e Estilo:** Dark theme moderno com Tailwind CSS (`#090d16`, `#0f172a`, bordas em `slate-800`), glassmorphism sutil e ícones `lucide-react`.

---

## 3. Estratégia de Testes
- Testes unitários para renderização dos cards de métricas e navegação.
- Validação de estados vazios (empty states) quando a organização não possui membros adicionais ou projetos.
