import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { MetricCards } from '@/components/dashboard/metric-cards'
import { QuickActions } from '@/components/dashboard/quick-actions'
import { ActivityFeed } from '@/components/dashboard/activity-feed'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const cookieStore = await cookies()
  const currentOrgId = cookieStore.get('current_org_id')?.value

  // Busca dados da organização ativa
  const { data: orgData } = currentOrgId
    ? await supabase.from('organizations').select('id, name, slug').eq('id', currentOrgId).maybeSingle()
    : { data: null }

  // Busca contagem de membros
  const { count: memberCount } = currentOrgId
    ? await supabase
        .from('organization_members')
        .select('*', { count: 'exact', head: true })
        .eq('organization_id', currentOrgId)
    : { count: 1 }

  // Busca role do usuário na organização
  const { data: userMembership } = currentOrgId
    ? await supabase
        .from('organization_members')
        .select('role')
        .eq('organization_id', currentOrgId)
        .eq('user_id', user?.id || '')
        .maybeSingle()
    : { data: { role: 'owner' } }

  const orgName = orgData?.name || 'Organização Padrão'
  const userRole = userMembership?.role || 'member'

  return (
    <div className="space-y-6">
      {/* Banner de Boas-vindas */}
      <div className="rounded-2xl border border-slate-800 bg-gradient-to-r from-blue-950/40 via-slate-900 to-[#0f172a] p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <span className="inline-block rounded-full bg-blue-500/10 border border-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-400 mb-2">
              SaaS Development OS v1.0 — MVP Core
            </span>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Visão Operacional: {orgName}
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Plataforma com isolamento multi-tenant garantido por RLS, autenticação SSR com cookies HTTPOnly e governança orientada a Sprints.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Operacional (v1.0)
            </span>
          </div>
        </div>
      </div>

      {/* Grid de Métricas Principais */}
      <MetricCards
        memberCount={memberCount || 1}
        role={userRole}
        orgName={orgName}
      />

      {/* Seção Inferior com Ações Rápidas e Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <QuickActions />
        </div>
        <div>
          <ActivityFeed />
        </div>
      </div>
    </div>
  )
}
