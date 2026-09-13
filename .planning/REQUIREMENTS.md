# Requirements: Hub MakePro (Beauty & Esthetics SaaS)

**Defined:** 2026-09-13  
**Milestone:** v1.0 Beauty Core Release  
**Core Value:** Gestão completa e agendamento para Salões, Maquiadoras, Lash e Nail Designers.

---

## v1 Requirements (Beleza & Estética)

### 0. Segmentação & Especialização por Tipo de Espaço
- [x] **BEAUTY-00**: Tenant pode definir seus segmentos de atuação (`Cabelo/Cabeleireira`, `Maquiagem/Make`, `Cílios/Lash`, `Unhas/Nail`, `Estética/Sobrancelhas`, `Salão Completo`), habilitando dinamicamente:
  - Fichas de anamnese personalizadas (ex: teste de mecha e colorimetria para cabelo, curvatura/mapeamento para lash, estilo e alergias para make, formato e cuticulagem para nails).
  - Categorias pré-configuradas e vocabulário contextual da interface.

### 1. Catálogo de Serviços & Categorias
- [x] **BEAUTY-01**: Salão/Profissional pode cadastrar, editar e desativar serviços com nome, duração (minutos), preço (R$) e categoria (`Maquiagem`, `Cílios / Lash`, `Unhas / Nail`, `Cabelo`, `Estética / Sobrancelhas`).

### 2. Gestão de Especialistas & Horários de Trabalho
- [x] **BEAUTY-02**: Cadastro de profissionais vinculados à organização, definindo quais serviços realizam, dias e horários de atendimento e percentual de comissão (%).

### 3. Agenda Operacional & Agendamentos
- [x] **BEAUTY-03**: Calendário de agendamentos com filtros por data, profissional e status (`Pendente`, `Confirmado`, `Em Atendimento`, `Concluído`, `Cancelado`).
- [x] **BEAUTY-04**: Criação manual de agendamento na recepção/pelo profissional com seleção de cliente, serviço, profissional, data/hora e observações.

### 4. Gestão de Clientes & Ficha Técnica
- [x] **BEAUTY-05**: Cadastro de clientes (Nome, WhatsApp, Data de Nascimento) com histórico completo de atendimentos anteriores e anotações técnicas (ex: curvatura do cílio, tonalidade da base, formato da unha).

### 5. Página Pública de Agendamento Online
- [x] **BEAUTY-06**: Página pública em `/book/[slug]` onde os clientes podem escolher serviço, profissional e horário livre sem precisar de login, gerando link direto para confirmação no WhatsApp.

### 6. Financeiro & Comissões
- [x] **BEAUTY-07**: Registro de recebimentos por comanda (Dinheiro, Pix, Cartão de Débito/Crédito) e relatório resumido de faturamento e comissões a pagar por profissional.

---

## Traceability

| Requirement | Phase / Sprint | Status |
|-------------|----------------|--------|
| BEAUTY-00 | Phase 4 (Sprint 004: Segmentação, Serviços & Especialistas) | Completed |
| BEAUTY-01 | Phase 4 (Sprint 004: Segmentação, Serviços & Especialistas) | Completed |
| BEAUTY-02 | Phase 4 (Sprint 004: Segmentação, Serviços & Especialistas) | Completed |
| BEAUTY-03 | Phase 5 (Sprint 005: Agenda, Ficha de Anamnese & Clientes) | Completed |
| BEAUTY-04 | Phase 5 (Sprint 005: Agenda, Ficha de Anamnese & Clientes) | Completed |
| BEAUTY-05 | Phase 5 (Sprint 005: Agenda, Ficha de Anamnese & Clientes) | Completed |
| BEAUTY-06 | Phase 6 (Sprint 006: Agendamento Público Online) | Completed |
| BEAUTY-07 | Phase 7 (Sprint 007: Caixa & Comissões) | Completed |
