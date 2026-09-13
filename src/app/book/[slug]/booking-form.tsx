'use client'

import { useState, useTransition } from 'react'
import { Sparkles, Clock, Calendar, User, Phone, CheckCircle2, MessageCircle } from 'lucide-react'
import { createPublicBooking, PublicBookingResult } from '@/app/actions/public-booking'

interface BookingFormProps {
  orgSlug: string
  orgName: string
  services: Array<{ id: string; name: string; duration_minutes: number; price_cents: number; category: string }>
  specialists: Array<{ id: string; name: string; specialties: string[] }>
}

export function BookingForm({ orgSlug, orgName, services, specialists }: BookingFormProps) {
  const [isPending, startTransition] = useTransition()
  const [result, setResult] = useState<PublicBookingResult | null>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    formData.append('orgSlug', orgSlug)

    startTransition(async () => {
      const res = await createPublicBooking(formData)
      setResult(res)
    })
  }

  if (result?.success) {
    return (
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-6 sm:p-8 text-center space-y-4 max-w-lg mx-auto shadow-2xl">
        <div className="mx-auto w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h2 className="text-xl font-bold text-white">Horário Reservado com Sucesso!</h2>
        <p className="text-xs text-slate-300">
          Seu agendamento em <strong className="text-white">{orgName}</strong> foi registrado no sistema.
        </p>

        {result.waLink && (
          <div className="pt-2">
            <a
              href={result.waLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 px-5 py-3 text-xs font-bold text-white transition shadow-lg shadow-emerald-600/30"
            >
              <MessageCircle className="h-4 w-4" />
              Enviar Confirmação no WhatsApp do Salão
            </a>
          </div>
        )}

        <button
          type="button"
          onClick={() => setResult(null)}
          className="text-xs text-slate-400 hover:text-white underline pt-2 block mx-auto"
        >
          Fazer outro agendamento
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto bg-[#0f172a] p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-2xl">
      {result && !result.success && (
        <div className="rounded-lg bg-red-950/40 border border-red-800/50 p-3 text-xs text-red-300">
          {result.message}
        </div>
      )}

      {/* 1. Escolha do Serviço */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-pink-400 uppercase tracking-wider">
          1. Escolha o Procedimento / Serviço
        </label>
        <select
          name="serviceId"
          required
          className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-pink-500"
        >
          <option value="">Selecione o procedimento...</option>
          {services.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name} ({s.duration_minutes} min — R$ {(s.price_cents / 100).toFixed(2)})
            </option>
          ))}
        </select>
      </div>

      {/* 2. Escolha do Especialista */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-purple-400 uppercase tracking-wider">
          2. Escolha o(a) Profissional
        </label>
        <select
          name="specialistId"
          required
          className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
        >
          <option value="">Selecione o profissional...</option>
          {specialists.map((sp) => (
            <option key={sp.id} value={sp.id}>
              {sp.name}
            </option>
          ))}
        </select>
      </div>

      {/* 3. Escolha da Data e Horário */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-blue-400 uppercase tracking-wider">
          3. Data e Horário Desejado
        </label>
        <input
          name="startTime"
          type="datetime-local"
          required
          className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* 4. Dados de Contato do Cliente */}
      <div className="space-y-3 pt-2 border-t border-slate-800">
        <label className="block text-xs font-bold text-emerald-400 uppercase tracking-wider">
          4. Seus Dados de Contato
        </label>

        <div>
          <input
            name="clientName"
            type="text"
            required
            placeholder="Seu nome completo"
            className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <input
            name="clientPhone"
            type="text"
            required
            placeholder="Seu WhatsApp: (11) 99999-8888"
            className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <textarea
            name="notes"
            rows={2}
            placeholder="Alguma observação ou preferência? (Opcional)"
            className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-xl bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 hover:opacity-90 px-4 py-3.5 text-xs font-bold text-white transition shadow-lg shadow-purple-600/20 disabled:opacity-50"
      >
        {isPending ? 'Confirmando Agendamento...' : 'Confirmar Agendamento Online ✨'}
      </button>
    </form>
  )
}
