-- ==============================================================================
-- SCHEMA REFINAMENTO: MULTI-TENANCY & POLICIES RBAC (MIGRATION 002)
-- ==============================================================================

-- 1. Funções Auxiliares de Verificação de Membro e Role
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

-- 2. Policies Expandidas para Organizations
-- Permitir que qualquer usuário autenticado crie uma organização
CREATE POLICY "Usuários autenticados podem criar organizações"
ON public.organizations FOR INSERT
TO authenticated
WITH CHECK (true);

-- Permitir que owners/admins atualizem dados da organização
CREATE POLICY "Admins e Owners podem atualizar suas organizações"
ON public.organizations FOR UPDATE
USING (public.is_org_admin(id))
WITH CHECK (public.is_org_admin(id));

-- 3. Policies Expandidas para Organization Members
-- Permitir inserção de membros por owners/admins ou auto-inclusão de owner na criação
CREATE POLICY "Admins e Owners podem gerenciar membros"
ON public.organization_members FOR INSERT
TO authenticated
WITH CHECK (
    public.is_org_admin(organization_id)
    OR
    (user_id = auth.uid() AND role = 'owner')
);

CREATE POLICY "Admins e Owners podem atualizar papéis de membros"
ON public.organization_members FOR UPDATE
USING (public.is_org_admin(organization_id))
WITH CHECK (public.is_org_admin(organization_id));

CREATE POLICY "Admins e Owners podem remover membros"
ON public.organization_members FOR DELETE
USING (
    public.is_org_admin(organization_id)
    OR
    user_id = auth.uid() -- Usuário pode sair da organização por conta própria
);
