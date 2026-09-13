# Plan 05-01: Agenda Operacional, Agendamentos e Ficha de Clientes / Anamnese

**Phase:** 05-appointments-clients-anamnesis  
**Sprint:** SPRINT-005  
**Requirements:** `BEAUTY-03`, `BEAUTY-04`, `BEAUTY-05`  
**Status:** Ready to Execute  

---

## Task 1: Migration de Clientes e Agendamentos (PostgreSQL)
- **Arquivo:** `supabase/migrations/20260913020000_appointments_and_clients.sql`
- **Ações:**
  1. Criar tabelas `clients` (com campo `anamnesis_data JSONB`) e `appointments`.
  2. Habilitar RLS com isolamento rigoroso por `organization_id`.

## Task 2: Server Actions para Clientes e Agendamentos
- **Arquivos:**
  - `src/app/actions/clients.ts`: Cadastro de clientes, atualização de ficha de anamnese e busca por nome/telefone.
  - `src/app/actions/appointments.ts`: Criação de agendamento com cálculo de `end_time`, cancelamento e transição de status.

## Task 3: Telas de Agenda e Clientes
- **Arquivos:**
  - `src/app/(dashboard)/appointments/page.tsx`: Visão de agenda diária/semanal, badges de status, botão de WhatsApp para confirmação e modal de agendamento.
  - `src/app/(dashboard)/clients/page.tsx`: Lista de clientes, histórico de visitas e ficha de anamnese por nicho (Make, Lash, Nails, Cabelo).
  - Atualização do `src/components/dashboard-sidebar.tsx` ativando as rotas `/appointments` e `/clients`.

## Task 4: Testes Unitários de Agendamento e Anamnese
- **Arquivo:** `tests/unit/appointments-clients.test.ts`
- **Ações:**
  1. Testes de cálculo de término de horário baseado na duração do procedimento.
  2. Testes de estrutura JSONB da ficha de anamnese.
  3. Testes de geração de links de WhatsApp para confirmação rápida.

---

## Critérios de Aceite
- [ ] Usuário pode cadastrar clientes com dados de contato e ficha de anamnese especializada.
- [ ] Usuário pode agendar atendimentos vinculando cliente, serviço e especialista.
- [ ] O horário de término é computado automaticamente conforme o tempo do procedimento.
- [ ] Status dos agendamentos pode ser alterado para Confirmado, Em Atendimento, Concluído ou Cancelado.
- [ ] Testes automatizados passam com 100% de cobertura.
