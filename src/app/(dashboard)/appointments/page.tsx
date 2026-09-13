import { cookies } from 'next/headers'
import Link from 'next/link'
import { Calendar, Clock, User, Sparkles, Phone, CheckCircle, Play, CheckCheck, Ban, MessageCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { createAppointmentRecord, updateAppointmentStatus } from '@/app/actions/appointments'

const statusBadges: Record<string, { label: string; color: string; border: string }> = {
  pending: { label: 'Pendente', color: 'text-amber-400 bg-amber-500/10', border: 'border-amber-500/20' },
  confirmed: { label: 'Confirmado', color: 'text-blue-400 bg-blue-500/10', border: 'border-blue-500/20' },
  in_progress: { label: 'Em Atendimento', color: 'text-purple-400 bg-purple-500/10', border: 'border-purple-500/20' },
  completed: { label: 'Concluído', color: 'text-emerald-400 bg-emerald-500/10', border: 'border-emerald-500/20' },
  cancelled: { label: 'Cancelado', color: 'text-red-400 bg-red-500/10', border: 'border-red-500/20' },
}

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
          services(id, name, duration_minutes)
        `)
        .eq('organization_id', currentOrgId)
        .order('start_time', { ascending: true })
    : { data: [] }

  // Busca clientes, especialistas e serviços para o modal
  const { data: clients } = currentOrgId
    ? await supabase.from('clients').select('id, name, phone').eq('organization_id', currentOrgId).order('name')
    : { data: [] }

  const { data: specialists } = currentOrgId
    ? await supabase.from('specialists').select('id, name').eq('organization_id', currentOrgId).eq('is_active', true)
    : { data: [] }

  const { data: services } = currentOrgId
    ? await supabase.from('services').select('id, name, duration_minutes, price_cents').eq('organization_id', currentOrgId).eq('is_active', true)
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
                className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
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
                className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
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
                className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
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
                className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
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
                className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
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

        {/* Lista de Atendimentos Agendados */}
        <div className="lg:col-span-2 space-y-3">
          {appointments && appointments.length > 0 ? (
            appointments.map((apt: any) => {
              const client = Array.isArray(apt.clients) ? apt.clients[0] : apt.clients
              const specialist = Array.isArray(apt.specialists) ? apt.specialists[0] : apt.specialists
              const service = Array.isArray(apt.services) ? apt.services[0] : apt.services
              const badge = statusBadges[apt.status] || statusBadges.confirmed

              const startDate = new Date(apt.start_time)
              const endDate = new Date(apt.end_time)

              const cleanPhone = client?.phone?.replace(/\D/g, '') || ''
              const waMessage = encodeURIComponent(
                `Olá, ${client?.name}! Confirmamos seu agendamento de *${service?.name}* para ${startDate.toLocaleDateString('pt-BR')} às ${startDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}. Te esperamos!`
              )
              const waLink = `https://wa.me/55${cleanPhone}?text=${waMessage}`

              return (
                <div
                  key={apt.id}
                  className="rounded-xl border border-slate-800 bg-[#0f172a] p-4 space-y-3 hover:border-slate-700 transition"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <span className="text-sm font-bold text-white block">{service?.name}</span>
                      <span className="text-xs text-slate-400">
                        Cliente: <strong className="text-slate-200">{client?.name}</strong> • Profissional:{' '}
                        <strong className="text-slate-200">{specialist?.name}</strong>
                      </span>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded border self-start sm:self-auto ${badge.color} ${badge.border}`}
                    >
                      {badge.label}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 pt-2 border-t border-slate-800/60">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 text-slate-300">
                        <Clock className="h-3.5 w-3.5 text-purple-400" />
                        {startDate.toLocaleDateString('pt-BR')} das{' '}
                        {startDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} às{' '}
                        {endDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <span className="font-semibold text-emerald-400">
                        R$ {(apt.price_cents / 100).toFixed(2)}
                      </span>
                    </div>

                    {/* WhatsApp Action */}
                    {cleanPhone && (
                      <a
                        href={waLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px] font-semibold transition"
                      >
                        <MessageCircle className="h-3.5 w-3.5" />
                        WhatsApp
                      </a>
                    )}
                  </div>
                </div>
              )
            })
          ) : (
            <div className="rounded-xl border border-slate-800 bg-[#0f172a] p-8 text-center">
              <p className="text-sm text-slate-400">Nenhum agendamento marcado ainda.</p>
              <p className="text-xs text-slate-500 mt-1">
                Agende novos atendimentos pelo painel ao lado ou compartilhe seu link público.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
