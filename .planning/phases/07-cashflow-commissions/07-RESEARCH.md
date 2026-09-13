# Phase 7: Comandas, Fechamento de Caixa & Comissões — Research

**Phase:** 07-cashflow-commissions  
**Sprint:** SPRINT-007  
**Date:** 2026-09-13  

---

## 1. Contexto & Requisitos
- **Requisito Central:** `BEAUTY-07` — Registro de recebimentos por comanda (Dinheiro, Pix, Cartão de Débito/Crédito) e relatório resumido de faturamento e comissões a pagar por profissional.
- **Fluxo Financeiro do Salão / Profissional:**
  1. Fechamento de Atendimento (Comanda): Quando um agendamento é concluído, gera-se uma transação financeira com método de pagamento (`pix`, `credit_card`, `debit_card`, `cash`).
  2. Cálculo de Comissão Automático: Com base no `commission_rate` do especialista (ex: 50% de R$ 200,00 = R$ 100,00 para o especialista e R$ 100,00 para a casa).
  3. Painel Financeiro do Tenant: Faturamento bruto do período, total líquido do salão, total de comissões a pagar por profissional e extrato de transações.

---

## 2. Modelagem do Banco de Dados PostgreSQL (Migration 005)

### Tabelas a Criar:
1. `public.financial_transactions`:
   - `id UUID PRIMARY KEY DEFAULT gen_random_uuid()`
   - `organization_id UUID NOT NULL REFERENCES organizations(id)`
   - `appointment_id UUID REFERENCES appointments(id) ON DELETE SET NULL`
   - `specialist_id UUID REFERENCES specialists(id) ON DELETE SET NULL`
   - `service_id UUID REFERENCES services(id) ON DELETE SET NULL`
   - `client_id UUID REFERENCES clients(id) ON DELETE SET NULL`
   - `gross_amount_cents INT NOT NULL` (Total Cobrado)
   - `commission_amount_cents INT NOT NULL DEFAULT 0` (Parte do Profissional)
   - `net_amount_cents INT NOT NULL DEFAULT 0` (Parte do Salão/Casa)
   - `payment_method TEXT NOT NULL CHECK (payment_method IN ('pix', 'credit_card', 'debit_card', 'cash'))`
   - `status TEXT NOT NULL DEFAULT 'paid' CHECK (status IN ('paid', 'pending', 'refunded'))`
   - `notes TEXT`
   - `created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()`

2. **RLS Policies:** Apenas membros e administradores da organização podem visualizar e criar transações financeiras.

---

## 3. Server Actions & UI
1. **Server Actions (`src/app/actions/financial.ts`):**
   - `closeAppointmentAndPay`: Conclui agendamento, calcula comissão e gera transação.
   - `createManualTransaction`: Registro de outras entradas ou saídas de caixa.
2. **Páginas de Frontend:**
   - `/financial`: Painel de controle financeiro com cards de Faturamento Total, Comissões a Pagar, Lucro do Salão, divisão por método de pagamento e tabela de comissões por profissional.
