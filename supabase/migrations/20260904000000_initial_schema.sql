-- ==============================================================================
-- SCHEMA INICIAL: HUB MAKEPRO SAAS (MIGRATION 001)
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

-- 3. Tabela de Organizações / Tenants (organizations)
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

-- 5. HABILITAR ROW LEVEL SECURITY (RLS) MANDATÓRIO
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organization_members ENABLE ROW LEVEL SECURITY;

-- 6. POLICIES DE SEGURANÇA (RLS)

-- Profiles
CREATE POLICY "Usuários podem visualizar seus próprios perfis" 
ON public.profiles FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Usuários podem atualizar seus próprios perfis" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id);

-- Organizations (Membros podem visualizar organizações das quais fazem parte)
CREATE POLICY "Membros podem visualizar suas organizações" 
ON public.organizations FOR SELECT 
USING (
    id IN (
        SELECT organization_id FROM public.organization_members 
        WHERE user_id = auth.uid()
    )
);

-- Organization Members
CREATE POLICY "Membros podem visualizar outros membros de suas organizações" 
ON public.organization_members FOR SELECT 
USING (
    organization_id IN (
        SELECT organization_id FROM public.organization_members 
        WHERE user_id = auth.uid()
    )
);

-- 7. Trigger para sincronizar criação de usuário do Auth com profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, avatar_url)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
        NEW.raw_user_meta_data->>'avatar_url'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
