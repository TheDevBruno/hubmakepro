'use client'

import { useState } from 'react'
import { Phone, Edit2, Calendar, Clock, X, Sparkles, User } from 'lucide-react'
import { updateClientRecord } from '@/app/actions/clients'

export interface ClientWithAppointments {
  id: string
  name: string
  phone: string
  email: string | null
  birth_date: string | null
  notes: string | null
  anamnesis_data: any
  appointments?: Array<{
    id: string
    start_time: string
    status: string
    price_cents: number
    services: { name: string } | Array<{ name: string }> | null
    specialists: { name: string } | Array<{ name: string }> | null
  }>
}

export function ClientList({ clients }: { clients: ClientWithAppointments[] }) {
  const [selectedClient, setSelectedClient] = useState<ClientWithAppointments | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  return (
    <>
      <div className="space-y-3">
        {clients.map((c) => {
          const anamnesis = c.anamnesis_data || {}
          return (
            <div
              key={c.id}
              onClick={() => {
                setSelectedClient(c)
                setIsEditing(false)
              }}
              className="rounded-xl border border-slate-800 bg-[#0f172a] p-4 space-y-2 hover:border-emerald-500/50 hover:bg-slate-900/60 cursor-pointer transition group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <span className="text-sm font-bold text-white block group-hover:text-emerald-400 transition">
                    {c.name}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-2">
                    <Phone className="h-3 w-3 text-emerald-400" />
                    {c.phone}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {c.birth_date && (
                    <span className="text-[11px] text-slate-500">
                      Nascimento: {new Date(c.birth_date).toLocaleDateString('pt-BR')}
                    </span>
                  )}
                  <button
                    type="button"
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition text-xs flex items-center gap-1"
                  >
                    <Edit2 className="h-3 w-3" />
                    <span className="hidden sm:inline">Ver / Editar</span>
                  </button>
                </div>
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
        })}
      </div>

      {/* Modal 360° do Cliente e Edição */}
      {selectedClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-800 bg-[#0f172a] p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <User className="h-4 w-4 text-emerald-400" />
                  Prontuário & Ficha: {selectedClient.name}
                </h3>
                <p className="text-xs text-slate-400">Histórico de atendimentos e ficha técnica</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedClient(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Formulário de Edição */}
            <form
              action={async (formData) => {
                await updateClientRecord(formData)
                setSelectedClient(null)
              }}
              className="space-y-4"
            >
              <input type="hidden" name="clientId" value={selectedClient.id} />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Nome Completo</label>
                  <input
                    name="name"
                    type="text"
                    required
                    defaultValue={selectedClient.name}
                    className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">WhatsApp</label>
                  <input
                    name="phone"
                    type="text"
                    required
                    defaultValue={selectedClient.phone}
                    className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">E-mail</label>
                  <input
                    name="email"
                    type="email"
                    defaultValue={selectedClient.email || ''}
                    className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Aniversário</label>
                  <input
                    name="birthDate"
                    type="date"
                    defaultValue={selectedClient.birth_date || ''}
                    className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Anamnese */}
              <div className="border-t border-slate-800 pt-3 space-y-3">
                <span className="block text-xs font-bold text-pink-400">
                  Ficha Técnica / Anamnese
                </span>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Mapping / Curvatura Lash</label>
                    <input
                      name="lashMapping"
                      type="text"
                      defaultValue={selectedClient.anamnesis_data?.lashMapping || ''}
                      className="w-full rounded-lg bg-slate-900 border border-slate-700 px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-pink-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Técnica / Formato Unha</label>
                    <input
                      name="nailTechnique"
                      type="text"
                      defaultValue={selectedClient.anamnesis_data?.nailTechnique || ''}
                      className="w-full rounded-lg bg-slate-900 border border-slate-700 px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-pink-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Tipo de Pele / Alergias</label>
                  <input
                    name="skinType"
                    type="text"
                    defaultValue={selectedClient.anamnesis_data?.skinType || ''}
                    className="w-full rounded-lg bg-slate-900 border border-slate-700 px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-pink-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedClient(null)}
                  className="rounded-lg bg-slate-800 hover:bg-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-300"
                >
                  Fechar
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-emerald-600 hover:bg-emerald-500 px-4 py-1.5 text-xs font-bold text-white shadow-md shadow-emerald-600/20"
                >
                  Salvar Ficha Técnica
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
