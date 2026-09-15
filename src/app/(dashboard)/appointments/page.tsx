import { cookies } from 'next/headers'
import Link from 'next/link'
import { Calendar, Clock, User, Sparkles } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { createAppointmentRecord } from '@/app/actions/appointments'
import { AppointmentList } from './appointment-list'

export default async function AppointmentsPage() {
  const supabase = await createClient()
  const cookieStore = await cookies()
  const currentOrgId = cookieStore.get('current_org_id')?.value

  // Busca agendamentos com joins
  const { data: appointments } = currentOrgId
    ? await supabase
        .from('appointments')
        .select(`
          id, start_time, end_time, status, price_cents, notes,
          clients(id, name, phone),
          specialists(id, name),
          services(id, name, duration_minutes, price_cents)
        `)
        .eq('organization_id', currentOrgId)
        .order('start_time', { ascending: true })
    : { data: [] }

  // Busca clientes, especialistas e serviços para o formulário e modal
  const { data: clients } = currentOrgId
    ? await supabase.from('clients').select('id, name, phone').eq('organization_id', currentOrgId).order('name')
    : { data: [] }

  const { data: specialists } = currentOrgId
    ? await supabase.from('specialists').select('id, name').eq('organization_id', currentOrgId).eq('is_active', true).order('name')
    : { data: [] }

  const { data: services } = currentOrgId
    ? await supabase.from('services').select('id, name, duration_minutes, price_cents').eq('organization_id', currentOrgId).eq('is_active', true).order('name')
    : { data: [] }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Calendar className="h-5 w-5 text-purple-400" />
            Agenda Operacional de Atendimentos
          </h1>
          <p className="text-xs text-slate-400">
            Controle de horários marcados, confirmações via WhatsApp e fluxo de atendimento
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formulário de Novo Agendamento */}
        <div className="rounded-xl border border-slate-800 bg-[#0f172a] p-6 shadow-md h-fit">
          <h2 className="text-sm font-bold text-white mb-4">Novo Agendamento</h2>
          <form action={createAppointmentRecord} className="space-y-4">
            <div>
              <label htmlFor="clientId" className="block text-xs font-semibold text-slate-300 mb-1">
                Cliente
              </label>
              <select
                id="clientId"
                name="clientId"
                required
                className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              >
                <option value="">Selecione a cliente...</option>
                {(clients || []).map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.phone})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="serviceId" className="block text-xs font-semibold text-slate-300 mb-1">
                Procedimento / Serviço
              </label>
              <select
                id="serviceId"
                name="serviceId"
                required
                className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              >
                <option value="">Selecione o serviço...</option>
                {(services || []).map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.duration_minutes} min - R$ {(s.price_cents / 100).toFixed(2)})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="specialistId" className="block text-xs font-semibold text-slate-300 mb-1">
                Profissional / Especialista
              </label>
              <select
                id="specialistId"
                name="specialistId"
                required
                className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              >
                <option value="">Selecione o especialista...</option>
                {(specialists || []).map((sp) => (
                  <option key={sp.id} value={sp.id}>
                    {sp.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="startTime" className="block text-xs font-semibold text-slate-300 mb-1">
                Data e Horário de Início
              </label>
              <input
                id="startTime"
                name="startTime"
                type="datetime-local"
                required
                className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label htmlFor="notes" className="block text-xs font-semibold text-slate-300 mb-1">
                Observações do Atendimento
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={2}
                placeholder="Ex: Cliente tem festa às 19h / manutenção..."
                className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-purple-600 hover:bg-purple-500 px-4 py-2 text-xs font-semibold text-white transition shadow-md shadow-purple-600/20"
            >
              + Confirmar Horário
            </button>
          </form>
        </div>

        {/* Lista Interativa de Atendimentos Agendados com Modal de Reagendamento */}
        <div className="lg:col-span-2">
          <AppointmentList
            initialAppointments={appointments as any || []}
            clients={clients || []}
            specialists={specialists || []}
            services={services || []}
          />
        </div>
      </div>
    </div>
  )
}

