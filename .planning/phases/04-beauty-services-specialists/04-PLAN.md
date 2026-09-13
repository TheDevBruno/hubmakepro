# Plan 04-01: Segmentação por Nicho, Catálogo de Serviços e Especialistas

**Phase:** 04-beauty-services-specialists  
**Sprint:** SPRINT-004  
**Requirements:** `BEAUTY-00`, `BEAUTY-01`, `BEAUTY-02`  
**Status:** Ready to Execute  

---

## Task 1: Migration do Domínio de Beleza (Services & Specialists)
- **Arquivo:** `supabase/migrations/20260913010000_beauty_services_specialists.sql`
- **Ações:**
  1. Criar tabelas `organization_settings`, `services`, `specialists`, `specialist_services`.
  2. Habilitar RLS em 100% das novas tabelas com policies de isolamento por `organization_id`.

## Task 2: Server Actions para Serviços e Especialistas
- **Arquivos:**
  - `src/app/actions/services.ts`: Criação, edição, exclusão lógica de serviços e formatação de moeda.
  - `src/app/actions/specialists.ts`: Cadastro e gestão de profissionais, definição de comissão e associação de serviços.
  - `src/app/actions/segments.ts`: Atualização dos nichos de atuação da organização.

## Task 3: Telas e Componentes de Gestão de Beleza
- **Arquivos:**
  - `src/app/(dashboard)/services/page.tsx`: Catálogo visual de serviços com filtros por nicho (`Make`, `Lash`, `Nails`, `Cabelo`, `Estética`), badges de preço/tempo e modal de criação.
  - `src/app/(dashboard)/specialists/page.tsx`: Gestão de equipe/especialistas com comissões e especialidades.
  - Atualização de `src/components/dashboard-sidebar.tsx`: Incluir links para `/services` e `/specialists`.

## Task 4: Testes Unitários do Módulo de Serviços e Comissões
- **Arquivo:** `tests/unit/beauty-services.test.ts`
- **Ações:**
  1. Testes de cálculo de comissão de especialistas.
  2. Testes de conversão de centavos para Real (BRL) e formatação de duração em horas/minutos.
  3. Testes de validação dos nichos aceitos (`makeup`, `lash`, `nails`, `hair`, `esthetics`).

---

## Critérios de Aceite
- [ ] Tenant pode cadastrar e visualizar serviços divididos por nicho (ex: Make, Lash, Unhas).
- [ ] Tenant pode cadastrar profissionais com comissão (%) e vincular aos serviços.
- [ ] Preços e durações exibidos formatados em `R$` e minutos/horas.
- [ ] Isolamento de dados multi-tenant validado por RLS.
- [ ] Testes automatizados passando com 100% de sucesso.
