-- Corrige a recursão infinita nas policies de organization_members
CREATE OR REPLACE FUNCTION public.is_org_member(org_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.organization_members
        WHERE organization_id = org_id
          AND user_id = auth.uid()
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

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
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP POLICY IF EXISTS "Membros podem visualizar outros membros de suas organizações" ON public.organization_members;
CREATE POLICY "Membros podem visualizar outros membros de suas organizações" 
ON public.organization_members FOR SELECT 
USING (
    user_id = auth.uid() 
    OR public.is_org_member(organization_id)
);

DROP POLICY IF EXISTS "Admins e Owners podem gerenciar membros" ON public.organization_members;
CREATE POLICY "Admins e Owners podem gerenciar membros"
ON public.organization_members FOR INSERT TO authenticated
WITH CHECK (
    (user_id = auth.uid() AND role = 'owner')
    OR public.is_org_admin(organization_id)
);
