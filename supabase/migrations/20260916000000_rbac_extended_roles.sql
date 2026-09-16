-- ==============================================================================
-- SCHEMA REFINAMENTO: RBAC EXTENDIDO & POLICIES MULTI-TENANT (MIGRATION 006)
-- ==============================================================================

-- 1. Atualizar constraint de papéis em organization_members para suportar os 5 papéis do Lab Beauty SaaS
ALTER TABLE public.organization_members 
    DROP CONSTRAINT IF EXISTS organization_members_role_check;

ALTER TABLE public.organization_members
    ADD CONSTRAINT organization_members_role_check 
    CHECK (role IN ('owner', 'admin', 'specialist', 'receptionist', 'financial', 'member'));

-- 2. Reforçar função SQL is_org_admin
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

-- 3. Criar função SQL has_org_permission para autorizações granulares no banco
CREATE OR REPLACE FUNCTION public.has_org_permission(org_id UUID, required_perm TEXT)
RETURNS BOOLEAN AS $$
DECLARE
    user_role TEXT;
BEGIN
    SELECT role INTO user_role
    FROM public.organization_members
    WHERE organization_id = org_id
      AND user_id = auth.uid()
    LIMIT 1;

    IF user_role IS NULL THEN
        RETURN FALSE;
    END IF;

    -- Owners e Admins têm todas as permissões
    IF user_role IN ('owner', 'admin') THEN
        RETURN TRUE;
    END IF;

    -- Financial
    IF user_role = 'financial' AND required_perm IN ('financial:view', 'financial:manage', 'appointments:view', 'clients:view', 'clients:manage') THEN
        RETURN TRUE;
    END IF;

    -- Receptionist e Specialist
    IF user_role IN ('receptionist', 'specialist') AND required_perm IN ('appointments:view', 'appointments:manage', 'clients:view', 'clients:manage') THEN
        RETURN TRUE;
    END IF;

    RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
