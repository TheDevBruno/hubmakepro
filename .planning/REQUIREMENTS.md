# REQUISITOS DO MARCO v1.1 — Refinamento Operacional, Edição Dinâmica & Performance

## Visão Geral do Marco
O Milestone v1.1 tem como objetivo elevar a maturidade operacional do **Hub MakePro** para suportar a rotina real dos salões e profissionais de estética. Foco em edição completa em modais, visão 360° de clientes, horários individuais de equipe, configurações detalhadas do espaço e navegação instantânea com zero atraso percebido.

---

## 1. Configurações Avançadas da Organização (ORG-EXP)
- [ ] **ORG-EXP-01**: Suporte completo a dados de contato do espaço (WhatsApp comercial, telefone fixo, e-mail e Instagram).
- [ ] **ORG-EXP-02**: Grade de horários de funcionamento semanais (segunda a domingo, horário de abertura, fechamento e intervalos).
- [ ] **ORG-EXP-03**: Endereço físico completo com link para rotas (Google Maps) e políticas do espaço (tolerância a atrasos).
- [ ] **ORG-EXP-04**: Ativação granular de nichos de atuação (Make, Lash, Nails, Cabelo, Sobrancelhas, Estética).

---

## 2. Gestão Detalhada de Especialistas & Equipe (SPEC-EXP)
- [ ] **SPEC-EXP-01**: Grade de horários de atendimento individual por profissional (dias da semana e turnos disponíveis).
- [ ] **SPEC-EXP-02**: Vínculo direto e filtro de serviços que cada especialista está apto a realizar.
- [ ] **SPEC-EXP-03**: Modal de edição rápida de especialistas (contato, comissão %, avatar e especialidades).

---

## 3. Prontuário de Clientes & Histórico 360° (CLI-EXP)
- [ ] **CLI-EXP-01**: Ficha cadastral ampliada com dados completos de contato, canal preferido e endereço.
- [ ] **CLI-EXP-02**: Linha do tempo (Timeline 360°) com todos os agendamentos anteriores da cliente, valores, profissional responsável e status.
- [ ] **CLI-EXP-03**: Modal de edição da ficha de anamnese técnica (mapping lash, formato nails, tipo de pele, alergias).

---

## 4. Agenda Dinâmica & Modais de Interação (APT-EXP)
- [ ] **APT-EXP-01**: Abertura de modal completo ao clicar em qualquer card de agendamento na grade.
- [ ] **APT-EXP-02**: Reagendamento de horários (alteração de data e horário de início/término) com recálculo automático.
- [ ] **APT-EXP-03**: Alteração dinâmica do especialista responsável e/ou do serviço selecionado.
- [ ] **APT-EXP-04**: Disparo de mensagem no WhatsApp formatada para avisos de reagendamento/cancelamento.

---

## 5. Performance, Prefetching & UX Instantânea (PERF-UX)
- [ ] **PERF-UX-01**: Implementação de `loading.tsx` com Skeletons modernos no App Router para todas as rotas operacionais (`/appointments`, `/clients`, `/services`, `/specialists`, `/financial`, `/settings/organization`).
- [ ] **PERF-UX-02**: Prefetching inteligente e otimização de Server Components para transição imediata de páginas na Sidebar.
- [ ] **PERF-UX-03**: Feedback visual instantâneo (optimistic updates ou toast/indicators) em todas as ações de formulário.
