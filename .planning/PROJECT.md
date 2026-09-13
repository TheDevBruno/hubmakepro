# Hub MakePro (Beauty & Esthetics SaaS)

## What This Is
**Hub MakePro** é uma plataforma SaaS profissional para Salões de Beleza, Maquiadoras, Lash Designers, Nail Designers, Cabeleireiras e Clínicas de Estética.

## Core Value
Garantir operação, agendamento online 24h sem fricção, prontuário de clientes/anamnese, controle de caixa e apuração de comissões em ambiente em nuvem seguro, rápido e auditável.

## Milestone Ativo: **v1.1 Deploy, Hospedagem Online & Validação Prática em Produção**

### Objetivos do Marco v1.1
1. **GitHub Versioning & CI/CD:** Sincronização completa do repositório no GitHub com GitHub Actions configurado para typecheck, lint e build.
2. **Supabase Cloud (Backend Online):** Provisionamento do banco PostgreSQL em nuvem, execução das 5 migrations, configuração do Supabase Auth e políticas RLS em produção.
3. **Vercel Cloud (Frontend Online):** Deploy do Next.js 15 na Vercel com injeção segura das variáveis de ambiente (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
4. **Plano de Testes & Validação Prática:** Execução de suíte de testes de ponta a ponta (E2E) simulando o fluxo real: Cadastro do Salão → Cadastro de Serviços/Especialistas → Agendamento Público (`/book/[slug]`) → Notificação no WhatsApp → Fechamento de Caixa & Comissões.
5. **Caderno de Auditoria & Feedback Operacional:** Registro de observações, ajustes de usabilidade e débitos técnicos para os próximos ciclos.

---

## Requirements (Milestone v1.1 — Deploy & Prática)

### Active
- [ ] **DEPLOY-01**: **Versionamento e GitHub:** Configuração de repositório remoto, git commit limpo e branch `main`.
- [ ] **DEPLOY-02**: **Supabase Cloud Backend:** Configuração do projeto online no Supabase e aplicação das migrations (`001` a `005`).
- [ ] **DEPLOY-03**: **Vercel Cloud Frontend:** Deploy e configuração de domínio/HTTPS na Vercel com conexão segura ao Supabase.
- [ ] **DEPLOY-04**: **Plano de Testes & Validação E2E:** Roteiro estruturado de testes cobrindo toda a jornada do usuário e cliente final no ambiente online.
- [ ] **DEPLOY-05**: **Registro de Ajustes & Refinamentos:** Documento `FEEDBACK_LOG.md` para melhorias identificadas durante os testes práticos.

---

## Key Decisions
| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Vercel + Supabase Cloud | Parceria de stack oficial para Next.js 15 SSR e PostgreSQL com RLS | ✓ Aprovado |
| Roteiro de Testes em Produção | Garante validação real antes da entrada dos primeiros clientes | — Pending |
