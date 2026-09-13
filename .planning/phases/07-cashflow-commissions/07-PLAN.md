# Plan 07-01: Comandas, Fechamento de Caixa e Comissões

**Phase:** 07-cashflow-commissions  
**Sprint:** SPRINT-007  
**Requirements:** `BEAUTY-07`  
**Status:** Ready to Execute  

---

## Task 1: Migration do Módulo Financeiro (PostgreSQL)
- **Arquivo:** `supabase/migrations/20260913030000_financial_transactions.sql`
- **Ações:**
  1. Criar tabela `financial_transactions` com campos para valor bruto, valor de comissão, valor líquido e método de pagamento.
  2. Habilitar RLS com políticas de acesso exclusivas para membros e administradores da organização.

## Task 2: Server Actions Financeiras
- **Arquivo:** `src/app/actions/financial.ts`
- **Ações:**
  1. `closeAppointmentAndPay`: Conclui agendamento, apura comissão com base no percentual do especialista e registra a transação.
  2. `createDirectTransaction`: Registro manual de receita avulsa no caixa.

## Task 3: Painel Financeiro e Fechamento de Atendimento
- **Arquivos:**
  - `src/app/(dashboard)/financial/page.tsx`: Painel de controle financeiro com cards de Faturamento, Repasses de Comissão, Lucro Líquido, gráficos de métodos de pagamento e lista de transações.
  - Atualização do `src/app/(dashboard)/appointments/page.tsx`: Botão "Fechar Comanda / Concluir Pagamento" em cada agendamento.
  - Atualização do `src/components/dashboard-sidebar.tsx`: Ativar link "Caixa & Comissões" para `/financial`.

## Task 4: Testes Unitários de Apuração Financeira
- **Arquivo:** `tests/unit/financial-commissions.test.ts`
- **Ações:**
  1. Testes de cálculo de comissão e valor líquido retido pela casa.
  2. Testes de soma de faturamento e agrupamento por forma de pagamento (Pix, Cartão, Dinheiro).

---

## Critérios de Aceite
- [ ] Agendamentos podem ser concluídos com registro da forma de pagamento.
- [ ] Comissões são calculadas automaticamente com base no especialista.
- [ ] Painel financeiro renderiza faturamento total, comissões a pagar e lucro líquido.
- [ ] 100% dos testes passam com sucesso.
