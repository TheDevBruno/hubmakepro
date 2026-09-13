import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function OrganizationSettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const cookieStore = await cookies()
  const currentOrgId = cookieStore.get('current_org_id')?.value

  // Busca dados da organização ativa e membros
  const { data: currentOrg } = currentOrgId
    ? await supabase.from('organizations').select('*').eq('id', currentOrgId).maybeSingle()
    : { data: null }

  const { data: members } = currentOrgId
    ? await supabase
        .from('organization_members')
        .select('id, role, created_at, profiles(id, full_name)')
        .eq('organization_id', currentOrgId)
    : { data: [] }

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h1 className="text-xl font-bold text-white">Configurações da Organização</h1>
            <p className="text-xs text-slate-400">Gerencie detalhes do tenant, membros e permissões</p>
          </div>
          <Link
            href="/dashboard"
            className="rounded-lg bg-slate-800 hover:bg-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-300"
          >
            ← Voltar ao Dashboard
          </Link>
        </div>

        {currentOrg ? (
          <div className="space-y-6">
            {/* Detalhes da Org */}
            <div className="rounded-xl border border-slate-800 bg-[#0f172a] p-6 shadow-md">
              <h2 className="text-sm font-bold text-white mb-4">Informações do Tenant</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="block text-[11px] font-semibold text-slate-400">Nome</span>
                  <p className="text-sm font-medium text-white">{currentOrg.name}</p>
                </div>
                <div>
                  <span className="block text-[11px] font-semibold text-slate-400">Identificador (Slug)</span>
                  <p className="text-sm font-mono text-slate-300">{currentOrg.slug}</p>
                </div>
              </div>
            </div>

            {/* Gestão de Membros */}
            <div className="rounded-xl border border-slate-800 bg-[#0f172a] p-6 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-sm font-bold text-white">Membros da Organização</h2>
                  <p className="text-xs text-slate-400">Controle de acesso baseado em papéis (RBAC)</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="border-b border-slate-800 text-slate-400 font-semibold">
                    <tr>
                      <th className="py-2.5 px-3">Membro</th>
                      <th className="py-2.5 px-3">Função (Role)</th>
                      <th className="py-2.5 px-3">Data de Entrada</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {(members || []).map((m: any) => {
                      const profile = Array.isArray(m.profiles) ? m.profiles[0] : m.profiles
                      return (
                        <tr key={m.id} className="hover:bg-slate-800/30">
                          <td className="py-2.5 px-3 font-medium text-white">
                            {profile?.full_name || 'Usuário'}
                          </td>
                          <td className="py-2.5 px-3">
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                                m.role === 'owner'
                                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                  : m.role === 'admin'
                                  ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                  : 'bg-slate-700/50 text-slate-300'
                              }`}
                            >
                              {m.role.toUpperCase()}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-slate-400">
                            {new Date(m.created_at).toLocaleDateString('pt-BR')}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-slate-800 bg-[#0f172a] p-8 text-center">
            <p className="text-sm text-slate-400">Nenhuma organização selecionada no momento.</p>
            <Link
              href="/dashboard"
              className="mt-4 inline-block rounded-lg bg-blue-600 hover:bg-blue-500 px-4 py-2 text-xs font-semibold text-white"
            >
              Ir para o Dashboard e Criar Organização
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
