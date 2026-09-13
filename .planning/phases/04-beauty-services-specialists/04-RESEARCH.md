# Phase 4: Segmentação por Nicho, Serviços & Especialistas — Research

**Phase:** 04-beauty-services-specialists  
**Sprint:** SPRINT-004  
**Date:** 2026-09-13  

---

## 1. Contexto & Requisitos da Fase 4
- **`BEAUTY-00`**: Configuração de segmentos no tenant (`makeup`, `lash`, `nails`, `hair`, `esthetics`) com campos dinâmicos e predefinições.
- **`BEAUTY-01`**: Catálogo de Serviços (`services`): nome, categoria/nicho, preço em centavos/reais, duração em minutos, descrição e status ativo.
- **`BEAUTY-02`**: Cadastro de Especialistas (`specialists`): vínculo com `organization_id`, serviços que o profissional realiza, dias/horários de expediente e comissão padrão (%).

---

## 2. Modelagem do Banco de Dados PostgreSQL (Migration 003)

### Tabelas a Criar:
1. `public.organization_settings`:
   - `organization_id UUID PRIMARY KEY REFERENCES organizations(id)`
   - `business_segments TEXT[]` (ex: `ARRAY['makeup', 'lash', 'nails']`)
   - `custom_anamnesis_schema JSONB`
   - `created_at`, `updated_at`

2. `public.services`:
   - `id UUID PRIMARY KEY DEFAULT gen_random_uuid()`
   - `organization_id UUID NOT NULL REFERENCES organizations(id)`
   - `name TEXT NOT NULL`
   - `category TEXT NOT NULL` (ex: `makeup`, `lash`, `nails`, `hair`, `esthetics`)
   - `duration_minutes INT NOT NULL DEFAULT 60`
   - `price_cents INT NOT NULL DEFAULT 0`
   - `is_active BOOLEAN NOT NULL DEFAULT true`
   - `created_at`, `updated_at`

3. `public.specialists`:
   - `id UUID PRIMARY KEY DEFAULT gen_random_uuid()`
   - `organization_id UUID NOT NULL REFERENCES organizations(id)`
   - `profile_id UUID REFERENCES profiles(id)` (opcional, caso tenha login no sistema)
   - `name TEXT NOT NULL`
   - `phone TEXT`
   - `commission_rate INT NOT NULL DEFAULT 50` (50%)
   - `specialties TEXT[]` (ex: `['lash', 'makeup']`)
   - `is_active BOOLEAN NOT NULL DEFAULT true`
   - `created_at`, `updated_at`

4. `public.specialist_services`:
   - `specialist_id UUID REFERENCES specialists(id) ON DELETE CASCADE`
   - `service_id UUID REFERENCES services(id) ON DELETE CASCADE`
   - `PRIMARY KEY (specialist_id, service_id)`

---

## 3. Server Actions & UI
1. **Server Actions (`src/app/actions/beauty-services.ts`, `src/app/actions/specialists.ts`):**
   - CRUD de serviços com categorização por nicho.
   - CRUD de especialistas com definição de comissão e vínculo de serviços.
   - Atualização de segmentos do salão/espaço.
2. **Páginas de Frontend:**
   - `/services`: Catálogo de serviços com filtros por nicho (`Make`, `Lash`, `Unhas`, `Cabelo`), badges de duração/preço e modal de cadastro.
   - `/specialists`: Gestão de profissionais, comissão e seleção de especialidades.
   - Atualização da Sidebar para incluir os novos menus operacionais de Beleza.
