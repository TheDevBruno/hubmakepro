import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { logout } from '@/app/actions/auth'
import { OrganizationSwitcher, OrgOption } from '@/components/organization-switcher'
import { DashboardSidebar } from '@/components/dashboard-sidebar'

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

  // Busca organizações
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
        role: m.role,
      }
    })

  const cookieStore = await cookies()
  const currentOrgId = cookieStore.get('current_org_id')?.value || orgOptions[0]?.id
  const activeOrg = orgOptions.find((o) => o.id === currentOrgId)

  return (
    <div className="flex h-screen bg-[#090d16] text-slate-100 overflow-hidden">
      {/* Sidebar Lateral */}
      <DashboardSidebar currentOrgName={activeOrg?.name} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header */}
        <header className="border-b border-slate-800 bg-[#0f172a]/90 backdrop-blur px-6 py-3.5 flex items-center justify-between shrink-0 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <OrganizationSwitcher organizations={orgOptions} currentOrgId={currentOrgId} />
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block border-r border-slate-800 pr-4">
              <p className="text-xs font-semibold text-slate-200">{profile?.full_name || user.email}</p>
              <p className="text-[11px] text-slate-400">{user.email}</p>
            </div>

            <form action={logout}>
              <button
                type="submit"
                className="rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white transition"
              >
                Sair
              </button>
            </form>
          </div>
        </header>

        {/* Page Children */}
        <main className="flex-1 p-6 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  )
}
