# Requirements: Milestone v1.1 (Deploy, Hospedagem Online & Testes Práticos)

**Defined:** 2026-09-13  
**Milestone:** v1.1 Deploy, Hospedagem & Validação Prática  
**Status:** In Progress  

---

## Requirements

### 1. Versionamento & Repositório Remoto
- [ ] **DEPLOY-01**: Repositório Git local versionado com commit limpo de todas as 7 fases e sincronizado com o GitHub remoto.

### 2. Infraestrutura de Backend (Supabase Cloud)
- [ ] **DEPLOY-02**: Projeto criado no Supabase Cloud, aplicação em lote das 5 migrations SQL (`001_initial_schema`, `002_multi_tenant_policies`, `003_beauty_services_specialists`, `004_appointments_and_clients`, `005_financial_transactions`), e validação de triggers e RLS.

### 3. Hospedagem de Frontend (Vercel Cloud)
- [ ] **DEPLOY-03**: Projeto importado e deployado na Vercel com variáveis de ambiente configuradas e build de produção bem-sucedido com HTTPS.

### 4. Plano de Testes & Validação em Produção
- [ ] **DEPLOY-04**: Execução do Plano de Testes Práticos ponta a ponta:
  - Teste 1: Cadastro de novo salão / maquiadora e login SSR.
  - Teste 2: Cadastro de procedimento e especialista com comissão.
  - Teste 3: Acesso à rota pública `/book/[slug]` e realização de agendamento online.
  - Teste 4: Confirmação e link de WhatsApp.
  - Teste 5: Fechamento de comanda no Caixa e conferência da divisão de comissão.

### 5. Caderno de Anotações & Alterações
- [ ] **DEPLOY-05**: Criação do documento `FEEDBACK_LOG.md` estruturado para registrar bugs identificados, oportunidades de UX e melhorias para a v2.0.

---

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| DEPLOY-01 | Phase 8 (Sprint 008: GitHub & Deploy Infra) | Planned |
| DEPLOY-02 | Phase 8 (Sprint 008: GitHub & Deploy Infra) | Planned |
| DEPLOY-03 | Phase 8 (Sprint 008: GitHub & Deploy Infra) | Planned |
| DEPLOY-04 | Phase 9 (Sprint 009: Testes Práticos & Feedback Log) | Planned |
| DEPLOY-05 | Phase 9 (Sprint 009: Testes Práticos & Feedback Log) | Planned |
