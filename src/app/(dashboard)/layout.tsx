import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getActiveOrganizationId } from '@/lib/tenant'
import { OrgOption } from '@/components/organization-switcher'
import { AppShell } from '@/components/shell'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Busca perfil do usuário
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, avatar_url')
    .eq('id', user.id)
    .single()

  // Busca organizações em que o usuário é membro
  const { data: memberships } = await supabase
    .from('organization_members')
    .select('role, organizations(id, name, slug)')
    .eq('user_id', user.id)

  const orgOptions: OrgOption[] = (memberships || [])
    .filter((m) => m.organizations)
    .map((m) => {
      const org = Array.isArray(m.organizations) ? m.organizations[0] : m.organizations
      return {
        id: org.id,
        name: org.name,
        slug: org.slug,
        role: m.role,
      }
    })

  const currentOrgId = await getActiveOrganizationId(supabase) || orgOptions[0]?.id
  const activeOrg = orgOptions.find((o) => o.id === currentOrgId)

  return (
    <AppShell
      organizations={orgOptions}
      currentOrgId={currentOrgId}
      currentOrgName={activeOrg?.name}
      currentOrgSlug={activeOrg?.slug}
      userEmail={user.email}
      userFullName={profile?.full_name}
    >
      {children}
    </AppShell>
  )
}

