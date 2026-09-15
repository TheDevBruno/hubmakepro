import { cookies } from 'next/headers'
import { Users2, Percent, Phone, Sparkles } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { getActiveOrganizationId } from '@/lib/tenant'
import { createSpecialist } from '@/app/actions/specialists'

import { SpecialistList } from './specialist-list'

export default async function SpecialistsPage() {
  const supabase = await createClient()
  const currentOrgId = await getActiveOrganizationId(supabase)

  const { data: specialists } = currentOrgId
    ? await supabase
        .from('specialists')
        .select('*')
        .eq('organization_id', currentOrgId)
        .order('name', { ascending: true })
    : { data: [] }

  return (
    <div className="space-y-6">
      {/* Header da Página */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Users2 className="h-5 w-5 text-blue-400" />
            Especialistas & Profissionais
          </h1>
          <p className="text-xs text-slate-400">
            Gerencie sua equipe, comissões percentuais e especialidades (Lash, Make, Nails, Hair). Clique no card para editar.
          </p>
        </div>
      </div>

      {/* Grid: Cadastro + Listagem */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formulário de Cadastro de Profissional */}
        <div className="rounded-xl border border-slate-800 bg-[#0f172a] p-6 shadow-md h-fit">
          <h2 className="text-sm font-bold text-white mb-4">Novo Especialista</h2>
          <form action={createSpecialist} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-xs font-semibold text-slate-300 mb-1">
                Nome do Profissional
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Ex: Beatriz Lash / Dra. Camila"
                className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-xs font-semibold text-slate-300 mb-1">
                WhatsApp de Contato
              </label>
              <input
                id="phone"
                name="phone"
                type="text"
                placeholder="(11) 98888-7777"
                className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="commissionRate" className="block text-xs font-semibold text-slate-300 mb-1">
                Comissão Padrão (%)
              </label>
              <input
                id="commissionRate"
                name="commissionRate"
                type="number"
                required
                defaultValue={50}
                min={0}
                max={100}
                className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
              />
              <span className="text-[11px] text-slate-500">Porcentagem repassada nos atendimentos concluídos.</span>
            </div>

            <div>
              <span className="block text-xs font-semibold text-slate-300 mb-2">Especialidades Atendidas</span>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="specialties" value="makeup" className="rounded bg-slate-800" />
                  Maquiagem
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="specialties" value="lash" className="rounded bg-slate-800" />
                  Cílios (Lash)
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="specialties" value="nails" className="rounded bg-slate-800" />
                  Unhas (Nail)
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="specialties" value="hair" className="rounded bg-slate-800" />
                  Cabelo
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 hover:bg-blue-500 px-4 py-2 text-xs font-semibold text-white transition shadow-md shadow-blue-600/20"
            >
              + Salvar Especialista
            </button>
          </form>
        </div>

        {/* Lista de Especialistas Interativa */}
        <div className="lg:col-span-2">
          {specialists && specialists.length > 0 ? (
            <SpecialistList specialists={specialists} />
          ) : (
            <div className="rounded-xl border border-slate-800 bg-[#0f172a] p-8 text-center">
              <p className="text-sm text-slate-400">Nenhum especialista cadastrado ainda.</p>
              <p className="text-xs text-slate-500 mt-1">
                Cadastre os profissionais e maquiadoras/lash do seu espaço para vincular agendamentos e comissões.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
