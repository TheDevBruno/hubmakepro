-- ==============================================================================
-- DOMÍNIO DE BELEZA & ESTÉTICA: CLIENTES & AGENDAMENTOS (MIGRATION 004)
-- ==============================================================================

-- 1. Cadastro de Clientes & Ficha de Anamnese (clients)
CREATE TABLE IF NOT EXISTS public.clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    birth_date DATE,
    notes TEXT,
    anamnesis_data JSONB NOT NULL DEFAULT '{}'::JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Tabela de Agendamentos (appointments)
CREATE TABLE IF NOT EXISTS public.appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
    specialist_id UUID NOT NULL REFERENCES public.specialists(id) ON DELETE RESTRICT,
    service_id UUID NOT NULL REFERENCES public.services(id) ON DELETE RESTRICT,
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    status TEXT NOT NULL DEFAULT 'confirmed' CHECK (status IN ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled')),
    price_cents INT NOT NULL CHECK (price_cents >= 0),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. HABILITAR ROW LEVEL SECURITY (RLS)
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- 4. POLICIES DE RLS

-- Clients
CREATE POLICY "Membros podem gerenciar clientes da sua organização"
ON public.clients FOR ALL
USING (public.is_org_member(organization_id))
WITH CHECK (public.is_org_member(organization_id));

-- Appointments
CREATE POLICY "Membros podem gerenciar agendamentos da sua organização"
ON public.appointments FOR ALL
USING (public.is_org_member(organization_id))
WITH CHECK (public.is_org_member(organization_id));

CREATE POLICY "Público pode criar agendamentos pelo link online"
ON public.appointments FOR INSERT
TO anon
WITH CHECK (true);
