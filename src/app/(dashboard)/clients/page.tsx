import { cookies } from 'next/headers'
import { Contact2, Phone, Calendar, Sparkles, FileSpreadsheet } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { createClientRecord } from '@/app/actions/clients'

import { ClientList } from './client-list'

export default async function ClientsPage() {
  const supabase = await createClient()
  const cookieStore = await cookies()
  const currentOrgId = cookieStore.get('current_org_id')?.value

  const { data: clients } = currentOrgId
    ? await supabase
        .from('clients')
        .select(`
          *,
          appointments(
            id, start_time, status, price_cents,
            services(name),
            specialists(name)
          )
        `)
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
            Prontuário com histórico, preferências e anotações técnicas por nicho (Make, Lash, Nails, Cabelo). Clique para editar.
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

        {/* Listagem Interativa de Clientes com Modal 360 */}
        <div className="lg:col-span-2">
          {clients && clients.length > 0 ? (
            <ClientList clients={clients} />
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
