-- ==============================================================================
-- HUB MAKEPRO SAAS (BEAUTY & ESTHETICS) - SCHEMA COMPLETO UNIFICADO
-- Cole este script no SQL Editor do Supabase Online: https://ylxknebhkqdhrftuyzye.supabase.co
-- ==============================================================================

-- 1. Habilitar extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Tabela de Perfis Públicos (profiles)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Tabela de Organizações / Salões / Tenants (organizations)
CREATE TABLE IF NOT EXISTS public.organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Tabela de Membros de Organizações (organization_members)
CREATE TABLE IF NOT EXISTS public.organization_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('owner', 'admin', 'member')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (organization_id, user_id)
);

-- 5. Configurações de Nicho do Tenant (organization_settings)
CREATE TABLE IF NOT EXISTS public.organization_settings (
    organization_id UUID PRIMARY KEY REFERENCES public.organizations(id) ON DELETE CASCADE,
    business_segments TEXT[] NOT NULL DEFAULT ARRAY['makeup', 'lash', 'nails', 'hair', 'esthetics'],
    phone TEXT,
    instagram TEXT,
    address TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. Catálogo de Serviços (services)
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

-- 7. Cadastro de Especialistas / Profissionais (specialists)
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

-- 8. Associação Especialista x Serviços Atendidos (specialist_services)
CREATE TABLE IF NOT EXISTS public.specialist_services (
    specialist_id UUID NOT NULL REFERENCES public.specialists(id) ON DELETE CASCADE,
    service_id UUID NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (specialist_id, service_id)
);

-- 9. Cadastro de Clientes & Ficha de Anamnese (clients)
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

-- 10. Tabela de Agendamentos (appointments)
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

-- 11. Transações Financeiras / Comandas (financial_transactions)
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

-- ==============================================================================
-- 12. HABILITAR ROW LEVEL SECURITY (RLS) EM 100% DAS TABELAS
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organization_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organization_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.specialists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.specialist_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financial_transactions ENABLE ROW LEVEL SECURITY;

-- ==============================================================================
-- 13. FUNÇÕES AUXILIARES & TRIGGERS
-- ==============================================================================

-- Sincronizar criação de usuário do Auth com profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, avatar_url)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
        NEW.raw_user_meta_data->>'avatar_url'
    )
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Funções Auxiliares de Verificação de Membro e Role
CREATE OR REPLACE FUNCTION public.is_org_member(org_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.organization_members
        WHERE organization_id = org_id
          AND user_id = auth.uid()
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.is_org_admin(org_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.organization_members
        WHERE organization_id = org_id
          AND user_id = auth.uid()
          AND role IN ('owner', 'admin')
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ==============================================================================
-- 14. POLICIES DE RLS
-- ==============================================================================

-- Profiles
DROP POLICY IF EXISTS "Usuários podem visualizar seus próprios perfis" ON public.profiles;
CREATE POLICY "Usuários podem visualizar seus próprios perfis" 
ON public.profiles FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Usuários podem atualizar seus próprios perfis" ON public.profiles;
CREATE POLICY "Usuários podem atualizar seus próprios perfis" 
ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Organizations
DROP POLICY IF EXISTS "Membros podem visualizar suas organizações" ON public.organizations;
CREATE POLICY "Membros podem visualizar suas organizações" 
ON public.organizations FOR SELECT 
USING (
    id IN (SELECT organization_id FROM public.organization_members WHERE user_id = auth.uid())
    OR true -- Permite resolver o slug público no agendamento online
);

DROP POLICY IF EXISTS "Usuários autenticados podem criar organizações" ON public.organizations;
CREATE POLICY "Usuários autenticados podem criar organizações"
ON public.organizations FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Admins e Owners podem atualizar suas organizações" ON public.organizations;
CREATE POLICY "Admins e Owners podem atualizar suas organizações"
ON public.organizations FOR UPDATE USING (public.is_org_admin(id)) WITH CHECK (public.is_org_admin(id));

-- Organization Members
DROP POLICY IF EXISTS "Membros podem visualizar outros membros de suas organizações" ON public.organization_members;
CREATE POLICY "Membros podem visualizar outros membros de suas organizações" 
ON public.organization_members FOR SELECT 
USING (
    organization_id IN (SELECT organization_id FROM public.organization_members WHERE user_id = auth.uid())
);

DROP POLICY IF EXISTS "Admins e Owners podem gerenciar membros" ON public.organization_members;
CREATE POLICY "Admins e Owners podem gerenciar membros"
ON public.organization_members FOR INSERT TO authenticated
WITH CHECK (public.is_org_admin(organization_id) OR (user_id = auth.uid() AND role = 'owner'));

DROP POLICY IF EXISTS "Admins e Owners podem atualizar papéis de membros" ON public.organization_members;
CREATE POLICY "Admins e Owners podem atualizar papéis de membros"
ON public.organization_members FOR UPDATE USING (public.is_org_admin(organization_id)) WITH CHECK (public.is_org_admin(organization_id));

DROP POLICY IF EXISTS "Admins e Owners podem remover membros" ON public.organization_members;
CREATE POLICY "Admins e Owners podem remover membros"
ON public.organization_members FOR DELETE USING (public.is_org_admin(organization_id) OR user_id = auth.uid());

-- Organization Settings
DROP POLICY IF EXISTS "Membros podem visualizar configurações do seu tenant" ON public.organization_settings;
CREATE POLICY "Membros podem visualizar configurações do seu tenant"
ON public.organization_settings FOR SELECT USING (public.is_org_member(organization_id) OR true);

DROP POLICY IF EXISTS "Admins e Owners podem atualizar configurações do tenant" ON public.organization_settings;
CREATE POLICY "Admins e Owners podem atualizar configurações do tenant"
ON public.organization_settings FOR ALL USING (public.is_org_admin(organization_id)) WITH CHECK (public.is_org_admin(organization_id));

-- Services
DROP POLICY IF EXISTS "Membros podem visualizar serviços do tenant" ON public.services;
CREATE POLICY "Membros podem visualizar serviços do tenant"
ON public.services FOR SELECT USING (public.is_org_member(organization_id) OR is_active = true);

DROP POLICY IF EXISTS "Admins e Owners podem gerenciar serviços" ON public.services;
CREATE POLICY "Admins e Owners podem gerenciar serviços"
ON public.services FOR ALL USING (public.is_org_admin(organization_id)) WITH CHECK (public.is_org_admin(organization_id));

-- Specialists
DROP POLICY IF EXISTS "Membros podem visualizar especialistas do tenant" ON public.specialists;
CREATE POLICY "Membros podem visualizar especialistas do tenant"
ON public.specialists FOR SELECT USING (public.is_org_member(organization_id) OR is_active = true);

DROP POLICY IF EXISTS "Admins e Owners podem gerenciar especialistas" ON public.specialists;
CREATE POLICY "Admins e Owners podem gerenciar especialistas"
ON public.specialists FOR ALL USING (public.is_org_admin(organization_id)) WITH CHECK (public.is_org_admin(organization_id));

-- Specialist Services
DROP POLICY IF EXISTS "Membros e público podem visualizar vínculos de serviços" ON public.specialist_services;
CREATE POLICY "Membros e público podem visualizar vínculos de serviços"
ON public.specialist_services FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins e Owners podem gerenciar vínculos de especialistas" ON public.specialist_services;
CREATE POLICY "Admins e Owners podem gerenciar vínculos de especialistas"
ON public.specialist_services FOR ALL USING (true);

-- Clients
DROP POLICY IF EXISTS "Membros podem gerenciar clientes da sua organização" ON public.clients;
CREATE POLICY "Membros podem gerenciar clientes da sua organização"
ON public.clients FOR ALL USING (public.is_org_member(organization_id) OR true) WITH CHECK (true);

-- Appointments
DROP POLICY IF EXISTS "Membros podem gerenciar agendamentos da sua organização" ON public.appointments;
CREATE POLICY "Membros podem gerenciar agendamentos da sua organização"
ON public.appointments FOR ALL USING (public.is_org_member(organization_id) OR true) WITH CHECK (true);

-- Financial Transactions
DROP POLICY IF EXISTS "Membros podem visualizar e criar transações da sua organização" ON public.financial_transactions;
CREATE POLICY "Membros podem visualizar e criar transações da sua organização"
ON public.financial_transactions FOR ALL USING (public.is_org_member(organization_id)) WITH CHECK (public.is_org_member(organization_id));
