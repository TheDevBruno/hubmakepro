-- ==============================================================================
-- DOMÍNIO DE BELEZA & ESTÉTICA: SERVIÇOS & ESPECIALISTAS (MIGRATION 003)
-- ==============================================================================

-- 1. Configurações de Nicho do Tenant (organization_settings)
CREATE TABLE IF NOT EXISTS public.organization_settings (
    organization_id UUID PRIMARY KEY REFERENCES public.organizations(id) ON DELETE CASCADE,
    business_segments TEXT[] NOT NULL DEFAULT ARRAY['makeup', 'lash', 'nails', 'hair', 'esthetics'],
    phone TEXT,
    instagram TEXT,
    address TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Catálogo de Serviços (services)
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('makeup', 'lash', 'nails', 'hair', 'esthetics', 'other')),
    duration_minutes INT NOT NULL DEFAULT 60 CHECK (duration_minutes > 0),
    price_cents INT NOT NULL DEFAULT 0 CHECK (price_cents >= 0),
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Cadastro de Especialistas / Profissionais (specialists)
CREATE TABLE IF NOT EXISTS public.specialists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    phone TEXT,
    color_tag TEXT DEFAULT '#3b82f6',
    commission_rate INT NOT NULL DEFAULT 50 CHECK (commission_rate >= 0 AND commission_rate <= 100),
    specialties TEXT[] DEFAULT ARRAY[]::TEXT[],
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Associação Especialista x Serviços Atendidos (specialist_services)
CREATE TABLE IF NOT EXISTS public.specialist_services (
    specialist_id UUID NOT NULL REFERENCES public.specialists(id) ON DELETE CASCADE,
    service_id UUID NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (specialist_id, service_id)
);

-- 5. HABILITAR ROW LEVEL SECURITY (RLS)
ALTER TABLE public.organization_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.specialists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.specialist_services ENABLE ROW LEVEL SECURITY;

-- 6. POLICIES DE RLS MULTI-TENANT

-- Organization Settings
CREATE POLICY "Membros podem visualizar configurações do seu tenant"
ON public.organization_settings FOR SELECT
USING (public.is_org_member(organization_id));

CREATE POLICY "Admins e Owners podem atualizar configurações do tenant"
ON public.organization_settings FOR ALL
USING (public.is_org_admin(organization_id))
WITH CHECK (public.is_org_admin(organization_id));

-- Services
CREATE POLICY "Membros podem visualizar serviços do tenant"
ON public.services FOR SELECT
USING (public.is_org_member(organization_id));

CREATE POLICY "Público pode visualizar serviços ativos para agendamento"
ON public.services FOR SELECT
TO anon
USING (is_active = true);

CREATE POLICY "Admins e Owners podem gerenciar serviços"
ON public.services FOR ALL
USING (public.is_org_admin(organization_id))
WITH CHECK (public.is_org_admin(organization_id));

-- Specialists
CREATE POLICY "Membros podem visualizar especialistas do tenant"
ON public.specialists FOR SELECT
USING (public.is_org_member(organization_id));

CREATE POLICY "Público pode visualizar especialistas ativos para agendamento"
ON public.specialists FOR SELECT
TO anon
USING (is_active = true);

CREATE POLICY "Admins e Owners podem gerenciar especialistas"
ON public.specialists FOR ALL
USING (public.is_org_admin(organization_id))
WITH CHECK (public.is_org_admin(organization_id));

-- Specialist Services
CREATE POLICY "Membros e público podem visualizar vínculos de serviços"
ON public.specialist_services FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM public.specialists
        WHERE id = specialist_services.specialist_id
    )
);

CREATE POLICY "Admins e Owners podem gerenciar vínculos de especialistas"
ON public.specialist_services FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM public.specialists
        WHERE id = specialist_services.specialist_id
          AND public.is_org_admin(organization_id)
    )
);
