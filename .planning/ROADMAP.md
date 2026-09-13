# ROADMAP: Hub MakePro (Beauty & Esthetics SaaS)

## Milestones Arquivados
- [x] **[Milestone v1.0 — Beauty Core Release](file:///z:/DevOps%20-%20FullStack/Hub%20MakePro/.planning/milestones/v1.0-ROADMAP.md)** (Concluído em 2026-09-13) — 7 Fases entregues (Auth SSR, Multi-tenant, Catálogo por Nicho, Especialistas & Comissões, Agenda Operacional & Anamnese, Agendamento Online /book/[slug] e Fechamento de Caixa).

---

## Active Milestone: v1.1 — Refinamento Operacional, Edição Dinâmica & Performance

### Phase 8: Performance, Skeletons & Navegação Instantânea
- [ ] **Goal:** Eliminar lentidão na troca de páginas implementando `loading.tsx` com skeletons modernos e prefetching em todas as rotas do dashboard.
- [ ] **Deliverables:** `loading.tsx` nas rotas principais, otimização de `Link` na sidebar e feedback visual imediato em formulários.

### Phase 9: Configurações Completas do Salão / Organização
- [ ] **Goal:** Expandir a página `/settings/organization` com dados de contato comercial, horários semanais de funcionamento, endereço e segmentação detalhada de nichos.
- [ ] **Deliverables:** Schema de horários e contatos em `organization_settings`, formulários com validação e atualização em tempo real.

### Phase 10: Gestão Avançada de Especialistas & Horários Individuais
- [ ] **Goal:** Permitir personalização da grade de disponibilidade por profissional, vínculo granular de serviços que cada um executa e modal de edição rápida.
- [ ] **Deliverables:** Tabela/JSON de horários individuais por especialista, modal de edição e filtro de serviços no agendamento.

### Phase 11: Ficha de Clientes com Histórico 360° & Anamnese Viva
- [ ] **Goal:** Transformar a tela de clientes em um prontuário 360° exibindo linha do tempo de atendimentos passados, valores pagos e modal para atualizar a ficha técnica.
- [ ] **Deliverables:** Visualizador de histórico de agendamentos por cliente, modal de edição cadastral e atualização dinâmica de anamnese.

### Phase 12: Agenda Operacional Dinâmica (Reagendamento & Modais nos Cards)
- [ ] **Goal:** Tornar todos os cards de agendamento clicáveis com abertura de modal completo para reagendar horário, alterar profissional/serviço e notificar no WhatsApp.
- [ ] **Deliverables:** Modal interativo de agendamento, Server Action de reagendamento/edição (`updateAppointmentRecord`) e disparo de WhatsApp de alteração.
