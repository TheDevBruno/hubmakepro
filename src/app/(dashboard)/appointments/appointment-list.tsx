'use client'

import { useState } from 'react'
import { Calendar, Clock, User, Sparkles, Phone, MessageCircle, Edit3, X, Check, CheckCircle2, AlertCircle } from 'lucide-react'
import { updateAppointmentRecord } from '@/app/actions/appointments'

interface ClientData {
  id: string
  name: string
  phone: string
}

interface SpecialistData {
  id: string
  name: string
}

interface ServiceData {
  id: string
  name: string
  duration_minutes: number
  price_cents: number
}

interface AppointmentItem {
  id: string
  start_time: string
  end_time: string
  status: string
  price_cents: number
  notes?: string | null
  clients: ClientData | ClientData[] | null
  specialists: SpecialistData | SpecialistData[] | null
  services: ServiceData | ServiceData[] | null
}

interface AppointmentListProps {
  initialAppointments: AppointmentItem[]
  clients: ClientData[]
  specialists: SpecialistData[]
  services: ServiceData[]
}

const statusBadges: Record<string, { label: string; color: string; border: string }> = {
  pending: { label: 'Pendente', color: 'text-amber-400 bg-amber-500/10', border: 'border-amber-500/20' },
  confirmed: { label: 'Confirmado', color: 'text-blue-400 bg-blue-500/10', border: 'border-blue-500/20' },
  in_progress: { label: 'Em Atendimento', color: 'text-purple-400 bg-purple-500/10', border: 'border-purple-500/20' },
  completed: { label: 'Concluído', color: 'text-emerald-400 bg-emerald-500/10', border: 'border-emerald-500/20' },
  cancelled: { label: 'Cancelado', color: 'text-red-400 bg-red-500/10', border: 'border-red-500/20' },
}

export function AppointmentList({
  initialAppointments,
  clients,
  specialists,
  services,
}: AppointmentListProps) {
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentItem | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const handleEditClick = (apt: AppointmentItem) => {
    setSelectedAppointment(apt)
    setIsEditing(true)
    setFeedback(null)
  }

  const handleCloseModal = () => {
    setIsEditing(false)
    setSelectedAppointment(null)
    setFeedback(null)
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSaving(true)
    setFeedback(null)

    const formData = new FormData(e.currentTarget)
    const result = await updateAppointmentRecord(formData)

    setIsSaving(false)
    if (result.success) {
      setFeedback({ type: 'success', message: result.message })
      setTimeout(() => {
        setIsEditing(false)
        setSelectedAppointment(null)
      }, 1200)
    } else {
      setFeedback({ type: 'error', message: result.message })
    }
  }

  const getClient = (apt: AppointmentItem) => (Array.isArray(apt.clients) ? apt.clients[0] : apt.clients)
  const getSpecialist = (apt: AppointmentItem) => (Array.isArray(apt.specialists) ? apt.specialists[0] : apt.specialists)
  const getService = (apt: AppointmentItem) => (Array.isArray(apt.services) ? apt.services[0] : apt.services)

  // Formata ISO para input datetime-local em fuso horário local
  const formatDateTimeForInput = (isoStr: string) => {
    const d = new Date(isoStr)
    const pad = (n: number) => String(n).padStart(2, '0')
    const year = d.getFullYear()
    const month = pad(d.getMonth() + 1)
    const day = pad(d.getDate())
    const hours = pad(d.getHours())
    const minutes = pad(d.getMinutes())
    return `${year}-${month}-${day}T${hours}:${minutes}`
  }

  return (
    <div className="space-y-3">
      {initialAppointments && initialAppointments.length > 0 ? (
        initialAppointments.map((apt) => {
          const client = getClient(apt)
          const specialist = getSpecialist(apt)
          const service = getService(apt)
          const badge = statusBadges[apt.status] || statusBadges.confirmed

          const startDate = new Date(apt.start_time)
          const endDate = new Date(apt.end_time)

          const cleanPhone = client?.phone?.replace(/\D/g, '') || ''
          const waMessage = encodeURIComponent(
            `Olá, ${client?.name}! Confirmamos seu agendamento de *${service?.name}* com *${specialist?.name}* para ${startDate.toLocaleDateString('pt-BR')} às ${startDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} no Hub MakePro.`
          )
          const waLink = `https://wa.me/55${cleanPhone}?text=${waMessage}`

          return (
            <div
              key={apt.id}
              onClick={() => handleEditClick(apt)}
              className="rounded-xl border border-slate-800 bg-[#0f172a] p-4 space-y-3 hover:border-purple-500/50 hover:bg-[#131d36] transition cursor-pointer group shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white group-hover:text-purple-300 transition">
                      {service?.name}
                    </span>
                    <Edit3 className="h-3.5 w-3.5 text-slate-500 group-hover:text-purple-400 opacity-0 group-hover:opacity-100 transition" />
                  </div>
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
                  <span className="flex items-center gap-1 text-slate-300 font-medium">
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
                    onClick={(e) => e.stopPropagation()}
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

      {/* Modal de Reagendamento / Edição do Card */}
      {isEditing && selectedAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-2xl border border-slate-800 bg-[#0f172a] p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-purple-400" />
                <h3 className="text-base font-bold text-white">Editar / Reagendar Horário</h3>
              </div>
              <button
                onClick={handleCloseModal}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {feedback && (
              <div
                className={`p-3 rounded-xl text-xs font-medium flex items-center gap-2 ${
                  feedback.type === 'success'
                    ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                    : 'bg-red-500/10 border border-red-500/20 text-red-400'
                }`}
              >
                {feedback.type === 'success' ? (
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                ) : (
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                )}
                <span>{feedback.message}</span>
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              <input type="hidden" name="id" value={selectedAppointment.id} />

              <div className="rounded-lg bg-slate-900/60 border border-slate-800 p-3">
                <span className="text-[11px] text-slate-400 block font-semibold mb-0.5">Cliente</span>
                <span className="text-xs font-bold text-white">
                  {getClient(selectedAppointment)?.name} ({getClient(selectedAppointment)?.phone})
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Serviço / Procedimento</label>
                  <select
                    name="serviceId"
                    defaultValue={getService(selectedAppointment)?.id}
                    required
                    className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                  >
                    {services.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.duration_minutes} min - R$ {(s.price_cents / 100).toFixed(2)})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Profissional / Especialista</label>
                  <select
                    name="specialistId"
                    defaultValue={getSpecialist(selectedAppointment)?.id}
                    required
                    className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                  >
                    {specialists.map((sp) => (
                      <option key={sp.id} value={sp.id}>
                        {sp.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Data & Horário de Início</label>
                  <input
                    type="datetime-local"
                    name="startTime"
                    defaultValue={formatDateTimeForInput(selectedAppointment.start_time)}
                    required
                    className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                  >
                  </input>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Status do Atendimento</label>
                  <select
                    name="status"
                    defaultValue={selectedAppointment.status}
                    required
                    className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="pending">Pendente</option>
                    <option value="confirmed">Confirmado</option>
                    <option value="in_progress">Em Atendimento</option>
                    <option value="completed">Concluído</option>
                    <option value="cancelled">Cancelado</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Observações / Detalhes</label>
                <textarea
                  name="notes"
                  rows={2}
                  defaultValue={selectedAppointment.notes || ''}
                  placeholder="Ex: Alinhamento de preferência de tom / reagendado a pedido..."
                  className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 transition font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex items-center gap-2 px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-semibold transition shadow-lg shadow-purple-600/20 disabled:opacity-50"
                >
                  <Check className="h-4 w-4" />
                  {isSaving ? 'Salvando...' : 'Salvar Alterações'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
