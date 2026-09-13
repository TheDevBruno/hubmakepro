# Hub MakePro (Beauty & Esthetics SaaS OS)

## What This Is
**Hub MakePro** é uma plataforma SaaS vertical projetada especificamente para o segmento de beleza, estética e cuidados pessoais — atendendo **Salões de Beleza, Maquiadoras Profissionais, Lash Designers, Nail Designers, Clínicas de Estética e Barbeiros/Profissionais Autônomos**. A plataforma centraliza agendamentos online, controle financeiro, histórico de clientes, comissões de profissionais e catálogo de serviços por tenant.

## Core Value
Transformar a operação de profissionais da beleza e salões através de agendamento simplificado (com página pública por profissional/salão), controle de caixa, cálculo automático de comissões e relacionamento com clientes em uma experiência multi-tenant moderna, fluida e 100% em português (`pt-BR`).

## Target Verticals (Segmentos Atendidos)
1. **Salões de Beleza & Clínicas de Estética** (Multi-profissionais, salas, comissões e gestão central)
2. **Maquiadoras Profissionais** (Agendamentos de noivas/eventos, ficha de anamnese e portfólio)
3. **Lash Designers** (Extensão de cílios, fichas de aplicação, manutenção periódica e alertas)
4. **Nail Designers** (Esmaltação em gel, fibra de vidro, manutenção e pacotes)
5. **Estética Facial e Corporal** (Procedimentos, pacotes de sessões e controle de retornos)

## Requirements (Milestone v1.0 — Beauty SaaS Core)

### Validated (v1.0 Beauty Core Shipped & Audited)
- [x] **AUTH-01..05**: Autenticação com Supabase Auth e suporte SSR seguro com cookies HTTPOnly
- [x] **TENANT-01..04**: Multi-tenancy isolado (Salão/Espaço), alternador de organização e papéis RBAC
- [x] **DB-01..03**: PostgreSQL gerenciado com Migrations versionadas e Row Level Security (RLS)
- [x] **UI-01..03**: Interface moderna em Next.js 15, Tailwind CSS e 100% em `pt-BR`
- [x] **BEAUTY-00**: Especialização por Nicho / Tipo de Espaço (Make, Lash, Nails, Cabelo, Estética)
- [x] **BEAUTY-01**: Gestão de Catálogo de Serviços com durações em minutos e preços em BRL
- [x] **BEAUTY-02**: Cadastro e Gestão de Especialistas com taxas de comissão (%)
- [x] **BEAUTY-03**: Agenda Operacional com filtros por data, profissional e status
- [x] **BEAUTY-04**: Marcação de horários com cálculo automático de término do procedimento
- [x] **BEAUTY-05**: Cadastro de Clientes e Histórico com Ficha de Anamnese especializada
- [x] **BEAUTY-06**: Página Pública de Agendamento Online (`/book/[slug]`) e integração com WhatsApp
- [x] **BEAUTY-07**: Fluxo de Caixa, Comandas e Fechamento de Comissões por Profissional

### Active
(Nenhum no momento — Marco v1.0 Beauty Core 100% Concluído e Auditado)

### Out of Scope (v1.0 Beauty Core)
- Envio de WhatsApp automatizado via API oficial da Meta (integração direta via deep link wa.me na v1.0, planejado para v2.0)
- Módulo de controle de estoque avançado de insumos químicos (Sprint futura)
- Gateway de pagamento online embutido no agendamento público (Pix direto/na recepção na v1.0)

## Context
- **Metodologia:** SaaS Development OS v1.0 (GSD + Governança Estrita).
- **Papéis:** Gemini Pro (Agente Executor no Antigravity) e ChatGPT (Agente Revisor/Orquestrador).
- **Fonte da Verdade:** `docs/PROJECT_STATE.md` e `.planning/STATE.md`.
- **Linguagem Funcional:** `pt-BR` obrigatório em todas as mensagens voltadas ao usuário.

## Constraints
- **Tech Stack**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Supabase (PostgreSQL, Auth, RLS).
- **Security**: Isolamento rigoroso via `organization_id` (cada salão/profissional não visualiza dados de outro).

## Key Decisions
| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Pivot para SaaS de Beleza & Estética | Alto valor de mercado e nicho claro (Maquiadoras, Lash, Nails, Salões) | ✓ Aprovado pelo Usuário |
| Reaproveitamento da Fundação Auth & Multi-tenant | Economia de tempo mantendo infraestrutura já validada e segura | ✓ Ativo |
| Página Pública de Agendamento por Tenant (`/book/[slug]`) | Fundamental para conversão de clientes finais via Instagram/WhatsApp | — Pending |
