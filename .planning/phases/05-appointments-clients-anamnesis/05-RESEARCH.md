# Phase 5: Agenda Operacional, Marcações & Ficha de Clientes / Anamnese — Research

**Phase:** 05-appointments-clients-anamnesis  
**Sprint:** SPRINT-005  
**Date:** 2026-09-13  

---

## 1. Contexto & Requisitos
- **`BEAUTY-03`**: Calendário de agendamentos com filtros por data, profissional e status (`pending`, `confirmed`, `in_progress`, `completed`, `cancelled`).
- **`BEAUTY-04`**: Criação de agendamentos na recepção/pelo profissional vinculando cliente, serviço, especialista, data/hora de início/fim e observações.
- **`BEAUTY-05`**: Cadastro de clientes (Nome, WhatsApp, E-mail, Data de Nascimento) e histórico com **Ficha de Anamnese por Nicho** (ex: curvatura do cílio/mapping em lash, histórico químico em cabelo, formato e cuticulagem em nails, tipo de pele e alergias em make).

---

## 2. Modelagem do Banco de Dados PostgreSQL (Migration 004)

### Tabelas a Criar:
1. `public.clients`:
   - `id UUID PRIMARY KEY DEFAULT gen_random_uuid()`
   - `organization_id UUID NOT NULL REFERENCES organizations(id)`
   - `name TEXT NOT NULL`
   - `phone TEXT NOT NULL` (WhatsApp)
   - `email TEXT`
   - `birth_date DATE`
   - `notes TEXT`
   - `anamnesis_data JSONB DEFAULT '{}'::JSONB` (campos flexíveis por nicho)
   - `created_at`, `updated_at`

2. `public.appointments`:
   - `id UUID PRIMARY KEY DEFAULT gen_random_uuid()`
   - `organization_id UUID NOT NULL REFERENCES organizations(id)`
   - `client_id UUID NOT NULL REFERENCES clients(id)`
   - `specialist_id UUID NOT NULL REFERENCES specialists(id)`
   - `service_id UUID NOT NULL REFERENCES services(id)`
   - `start_time TIMESTAMPTZ NOT NULL`
   - `end_time TIMESTAMPTZ NOT NULL`
   - `status TEXT NOT NULL DEFAULT 'confirmed' CHECK (status IN ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled'))`
   - `price_cents INT NOT NULL` (preço congelado no momento do agendamento)
   - `notes TEXT`
   - `created_at`, `updated_at`

---

## 3. Server Actions & UI
1. **Server Actions (`src/app/actions/clients.ts`, `src/app/actions/appointments.ts`):**
   - `createClient`, `updateClientAnamnesis`, `searchClients`.
   - `createAppointment`, `updateAppointmentStatus` (com cálculo automático de `end_time` a partir da duração do serviço).
2. **Páginas de Frontend:**
   - `/appointments`: Agenda visual diária com lista de horários, filtros por especialista e modal de novo agendamento com cálculo de horário e link para WhatsApp (`wa.me`).
   - `/clients`: Lista de clientes com ficha técnica/anamnese expansível por nicho.
