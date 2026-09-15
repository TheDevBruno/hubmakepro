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

  const { data: orgSettings } = currentOrgId
    ? await supabase.from('organization_settings').select('*').eq('organization_id', currentOrgId).maybeSingle()
    : { data: null }

  const { data: members } = currentOrgId
    ? await supabase
        .from('organization_members')
        .select('id, role, created_at, profiles(id, full_name)')
        .eq('organization_id', currentOrgId)
    : { data: [] }

  const activeSegments: string[] = orgSettings?.business_segments || ['makeup', 'lash', 'nails', 'hair', 'esthetics']

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h1 className="text-xl font-bold text-white">Meu Espaço & Configurações</h1>
            <p className="text-xs text-slate-400">Gerencie informações comerciais, contatos, endereço e membros da equipe</p>
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
            {/* Formulário de Configurações do Salão */}
            <div className="rounded-xl border border-slate-800 bg-[#0f172a] p-6 shadow-md">
              <h2 className="text-sm font-bold text-white mb-4">Informações do Estabelecimento</h2>
              <form action={updateOrganizationDetails} className="space-y-4">
                <input type="hidden" name="orgId" value={currentOrg.id} />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-slate-300 mb-1">
                      Nome do Salão / Espaço
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      defaultValue={currentOrg.name}
                      className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-pink-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">
                      Link de Agendamento Online (Slug)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        disabled
                        value={`/book/${currentOrg.slug}`}
                        className="w-full rounded-lg bg-slate-900/60 border border-slate-800 px-3 py-2 text-xs text-pink-400 font-mono"
                      />
                      <Link
                        href={`/book/${currentOrg.slug}`}
                        target="_blank"
                        className="shrink-0 px-3 py-2 rounded-lg bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold transition"
                      >
                        Abrir
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Contatos */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div>
                    <label htmlFor="phone" className="block text-xs font-semibold text-slate-300 mb-1">
                      WhatsApp Principal
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="text"
                      defaultValue={orgSettings?.phone || ''}
                      placeholder="(11) 98888-7777"
                      className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-pink-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="secondaryPhone" className="block text-xs font-semibold text-slate-300 mb-1">
                      Telefone Fixo / 2º Contato
                    </label>
                    <input
                      id="secondaryPhone"
                      name="secondaryPhone"
                      type="text"
                      defaultValue={orgSettings?.secondary_phone || ''}
                      placeholder="(11) 3333-4444"
                      className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-pink-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="instagram" className="block text-xs font-semibold text-slate-300 mb-1">
                      Instagram (@seu.espaco)
                    </label>
                    <input
                      id="instagram"
                      name="instagram"
                      type="text"
                      defaultValue={orgSettings?.instagram || ''}
                      placeholder="@studiobella"
                      className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-pink-500"
                    />
                  </div>
                </div>

                {/* Endereço & Localização */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label htmlFor="address" className="block text-xs font-semibold text-slate-300 mb-1">
                      Endereço Completo
                    </label>
                    <input
                      id="address"
                      name="address"
                      type="text"
                      defaultValue={orgSettings?.address || ''}
                      placeholder="Av. Paulista, 1000 - Sala 42, São Paulo - SP"
                      className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-pink-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="mapsUrl" className="block text-xs font-semibold text-slate-300 mb-1">
                      Link do Google Maps
                    </label>
                    <input
                      id="mapsUrl"
                      name="mapsUrl"
                      type="url"
                      defaultValue={orgSettings?.maps_url || ''}
                      placeholder="https://maps.app.goo.gl/..."
                      className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-pink-500"
                    />
                  </div>
                </div>

                {/* Regras e Tolerância */}
                <div>
                  <label htmlFor="cancellationPolicy" className="block text-xs font-semibold text-slate-300 mb-1">
                    Política de Atendimento & Cancelamento
                  </label>
                  <textarea
                    id="cancellationPolicy"
                    name="cancellationPolicy"
                    rows={2}
                    defaultValue={orgSettings?.cancellation_policy || 'Cancelamentos com no mínimo 2h de antecedência. Tolerância de 15 minutos de atraso.'}
                    className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-pink-500"
                  />
                </div>

                {/* Nichos Atendidos */}
                <div className="pt-2">
                  <span className="block text-xs font-semibold text-slate-300 mb-2">
                    Segmentos de Procedimentos Atendidos no Espaço
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-300">
                    <label className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                      <input type="checkbox" name="segments" value="makeup" defaultChecked={activeSegments.includes('makeup')} className="rounded bg-slate-800" />
                      Maquiagem
                    </label>
                    <label className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                      <input type="checkbox" name="segments" value="lash" defaultChecked={activeSegments.includes('lash')} className="rounded bg-slate-800" />
                      Cílios (Lash)
                    </label>
                    <label className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                      <input type="checkbox" name="segments" value="nails" defaultChecked={activeSegments.includes('nails')} className="rounded bg-slate-800" />
                      Unhas (Nails)
                    </label>
                    <label className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                      <input type="checkbox" name="segments" value="hair" defaultChecked={activeSegments.includes('hair')} className="rounded bg-slate-800" />
                      Cabelo / Salão
                    </label>
                    <label className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                      <input type="checkbox" name="segments" value="esthetics" defaultChecked={activeSegments.includes('esthetics')} className="rounded bg-slate-800" />
                      Estética & Sobrancelhas
                    </label>
                  </div>
                </div>

                <div className="pt-3 flex justify-end">
                  <button
                    type="submit"
                    className="rounded-lg bg-pink-600 hover:bg-pink-500 px-5 py-2.5 text-xs font-bold text-white transition shadow-lg shadow-pink-600/20"
                  >
                    Salvar Informações do Salão
                  </button>
                </div>
              </form>
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
