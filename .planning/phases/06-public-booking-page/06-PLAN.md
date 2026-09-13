# Plan 06-01: Página Pública de Agendamento Online (/book/[slug])

**Phase:** 06-public-booking-page  
**Sprint:** SPRINT-006  
**Requirements:** `BEAUTY-06`  
**Status:** Ready to Execute  

---

## Task 1: Server Actions para Agendamento Público
- **Arquivo:** `src/app/actions/public-booking.ts`
- **Ações:**
  1. `createPublicBooking`: Recebe dados do formulário público (slug, cliente, serviço, especialista, data/hora).
  2. Localiza ou cria o registro em `clients` vinculado à organização.
  3. Insere o registro em `appointments` e retorna o link de WhatsApp para o cliente notificar o salão.

## Task 2: Página Pública de Agendamento (/book/[slug])
- **Arquivos:**
  - `src/app/book/[slug]/page.tsx`: Interface completa de agendamento online com layout clean, seleção de procedimentos com preços em R$, seleção de especialista, seleção de horário e formulário de contato.
  - `src/app/book/[slug]/booking-form.tsx`: Componente interativo client-side com feedback em tempo real e botão de disparo para WhatsApp.

## Task 3: Integração no Dashboard
- **Arquivos:**
  - `src/components/dashboard/quick-actions.tsx`: Adicionar botão para copiar link da página pública de agendamento.
  - Atualização do `src/components/dashboard-sidebar.tsx` ativando o menu "Agendamento Online".

## Task 4: Testes Unitários de Agendamento Público
- **Arquivo:** `tests/unit/public-booking.test.ts`
- **Ações:**
  1. Testes de validação de slug e formatação da mensagem do WhatsApp do cliente para o salão.
  2. Testes de cálculo de término em agendamentos anônimos.

---

## Critérios de Aceite
- [ ] Qualquer pessoa consegue acessar `/book/[slug]` sem estar logada.
- [ ] O cliente pode escolher o serviço, profissional e horário.
- [ ] O agendamento é registrado no banco de dados do respectivo tenant.
- [ ] O cliente recebe link pronto para enviar mensagem de confirmação ao WhatsApp do salão.
- [ ] 100% dos testes passam com sucesso.
