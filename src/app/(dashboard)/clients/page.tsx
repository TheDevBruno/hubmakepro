import { cookies } from 'next/headers'
import { Contact2, Phone, Calendar, Sparkles, FileSpreadsheet } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { createClientRecord } from '@/app/actions/clients'

export default async function ClientsPage() {
  const supabase = await createClient()
  const cookieStore = await cookies()
  const currentOrgId = cookieStore.get('current_org_id')?.value

  const { data: clients } = currentOrgId
    ? await supabase
        .from('clients')
        .select('*')
        .eq('organization_id', currentOrgId)
        .order('name', { ascending: true })
    : { data: [] }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Contact2 className="h-5 w-5 text-emerald-400" />
            Clientes & Ficha de Anamnese
          </h1>
          <p className="text-xs text-slate-400">
            Prontuário com histórico, preferências e anotações técnicas por nicho (Make, Lash, Nails, Cabelo)
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formulário de Cadastro de Cliente com Anamnese */}
        <div className="rounded-xl border border-slate-800 bg-[#0f172a] p-6 shadow-md h-fit">
          <h2 className="text-sm font-bold text-white mb-4">Novo Cliente</h2>
          <form action={createClientRecord} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-xs font-semibold text-slate-300 mb-1">
                Nome Completo
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Ex: Mariana Silva"
                className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="phone" className="block text-xs font-semibold text-slate-300 mb-1">
                  WhatsApp
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  required
                  placeholder="(11) 99999-8888"
                  className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="birthDate" className="block text-xs font-semibold text-slate-300 mb-1">
                  Aniversário
                </label>
                <input
                  id="birthDate"
                  name="birthDate"
                  type="date"
                  className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Campos de Anamnese Especializada */}
            <div className="border-t border-slate-800 pt-3 space-y-3">
              <span className="block text-xs font-bold text-pink-400">
                Ficha Técnica / Anamnese (Opcional)
              </span>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="lashMapping" className="block text-[11px] text-slate-400 mb-1">
                    Mapping / Curvatura Lash
                  </label>
                  <input
                    id="lashMapping"
                    name="lashMapping"
                    type="text"
                    placeholder="Ex: Boneca 8 a 13 D"
                    className="w-full rounded-lg bg-slate-900 border border-slate-700 px-2.5 py-1.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-pink-500"
                  />
                </div>

                <div>
                  <label htmlFor="nailTechnique" className="block text-[11px] text-slate-400 mb-1">
                    Técnica / Formato Unha
                  </label>
                  <input
                    id="nailTechnique"
                    name="nailTechnique"
                    type="text"
                    placeholder="Ex: Fibra / Amendolada"
                    className="w-full rounded-lg bg-slate-900 border border-slate-700 px-2.5 py-1.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-pink-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="skinType" className="block text-[11px] text-slate-400 mb-1">
                  Tipo de Pele & Alergias (Make/Estética)
                </label>
                <input
                  id="skinType"
                  name="skinType"
                  type="text"
                  placeholder="Ex: Pele oleosa / alergia a látex"
                  className="w-full rounded-lg bg-slate-900 border border-slate-700 px-2.5 py-1.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-pink-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-emerald-600 hover:bg-emerald-500 px-4 py-2 text-xs font-semibold text-white transition shadow-md shadow-emerald-600/20"
            >
              + Salvar Cliente
            </button>
          </form>
        </div>

        {/* Listagem de Clientes */}
        <div className="lg:col-span-2 space-y-3">
          {clients && clients.length > 0 ? (
            clients.map((c: any) => {
              const anamnesis = c.anamnesis_data || {}
              return (
                <div
                  key={c.id}
                  className="rounded-xl border border-slate-800 bg-[#0f172a] p-4 space-y-2 hover:border-slate-700 transition"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <span className="text-sm font-bold text-white block">{c.name}</span>
                      <span className="text-xs text-slate-400 flex items-center gap-2">
                        <Phone className="h-3 w-3 text-emerald-400" />
                        {c.phone}
                      </span>
                    </div>

                    {c.birth_date && (
                      <span className="text-[11px] text-slate-500">
                        Nascimento: {new Date(c.birth_date).toLocaleDateString('pt-BR')}
                      </span>
                    )}
                  </div>

                  {/* Badges de Anamnese */}
                  {Object.keys(anamnesis).length > 0 && (
                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/60">
                      {anamnesis.lashMapping && (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                          Lash: {anamnesis.lashMapping}
                        </span>
                      )}
                      {anamnesis.nailTechnique && (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                          Nail: {anamnesis.nailTechnique}
                        </span>
                      )}
                      {anamnesis.skinType && (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-pink-500/10 text-pink-300 border border-pink-500/20">
                          Make/Pele: {anamnesis.skinType}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              )
            })
          ) : (
            <div className="rounded-xl border border-slate-800 bg-[#0f172a] p-8 text-center">
              <p className="text-sm text-slate-400">Nenhum cliente cadastrado ainda.</p>
              <p className="text-xs text-slate-500 mt-1">
                Cadastre clientes para registrar preferências, aniversários e histórico de procedimentos.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
