-- ==============================================================================
-- SCHEMA REFINAMENTO: ARQUITETURA DE BUSINESS TYPES (MIGRATION 007)
-- ==============================================================================

-- 1. Adicionar coluna business_type na tabela organizations com valor default de compatibilidade
ALTER TABLE public.organizations
    ADD COLUMN IF NOT EXISTS business_type TEXT NOT NULL DEFAULT 'beauty_salon';

-- 2. Adicionar constraint de integridade para os 6 tipos de negócio do catálogo
ALTER TABLE public.organizations
    DROP CONSTRAINT IF EXISTS organizations_business_type_check;

ALTER TABLE public.organizations
    ADD CONSTRAINT organizations_business_type_check
    CHECK (business_type IN (
        'beauty_salon',
        'lash_designer',
        'makeup_artist',
        'nail_designer',
        'esthetics_clinic',
        'barbershop'
    ));

-- 3. Criar índice para performance em buscas e filtros por nicho
CREATE INDEX IF NOT EXISTS idx_organizations_business_type 
    ON public.organizations(business_type);
