-- ==============================================================================
-- DOMÍNIO DE BELEZA & ESTÉTICA: FINANCEIRO & COMISSÕES (MIGRATION 005)
-- ==============================================================================

-- 1. Transações Financeiras / Comandas (financial_transactions)
CREATE TABLE IF NOT EXISTS public.financial_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    appointment_id UUID REFERENCES public.appointments(id) ON DELETE SET NULL,
    specialist_id UUID REFERENCES public.specialists(id) ON DELETE SET NULL,
    service_id UUID REFERENCES public.services(id) ON DELETE SET NULL,
    client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
    gross_amount_cents INT NOT NULL CHECK (gross_amount_cents >= 0),
    commission_amount_cents INT NOT NULL DEFAULT 0 CHECK (commission_amount_cents >= 0),
    net_amount_cents INT NOT NULL DEFAULT 0 CHECK (net_amount_cents >= 0),
    payment_method TEXT NOT NULL CHECK (payment_method IN ('pix', 'credit_card', 'debit_card', 'cash')),
    status TEXT NOT NULL DEFAULT 'paid' CHECK (status IN ('paid', 'pending', 'refunded')),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. HABILITAR ROW LEVEL SECURITY (RLS)
ALTER TABLE public.financial_transactions ENABLE ROW LEVEL SECURITY;

-- 3. POLICIES DE RLS

CREATE POLICY "Membros podem visualizar e criar transações da sua organização"
ON public.financial_transactions FOR ALL
USING (public.is_org_member(organization_id))
WITH CHECK (public.is_org_member(organization_id));
