'use client'

import { useState } from 'react'
import { Edit2, Phone, X } from 'lucide-react'
import { updateSpecialist } from '@/app/actions/specialists'

export interface SpecialistItem {
  id: string
  name: string
  phone: string | null
  commission_rate: number
  specialties: string[] | null
  is_active: boolean
}

export function SpecialistList({ specialists }: { specialists: SpecialistItem[] }) {
  const [editingSpecialist, setEditingSpecialist] = useState<SpecialistItem | null>(null)

  return (
    <>
      <div className="space-y-3">
        {specialists.map((sp) => (
          <div
            key={sp.id}
            onClick={() => setEditingSpecialist(sp)}
            className="rounded-xl border border-slate-800 bg-[#0f172a] p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:border-blue-500/50 hover:bg-slate-900/60 cursor-pointer transition group"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white group-hover:text-blue-400 transition">
                  {sp.name}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {sp.commission_rate}% Comissão
                </span>
                {!sp.is_active && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                    Inativo
                  </span>
                )}
              </div>
              {sp.phone && (
                <p className="text-xs text-slate-400 flex items-center gap-1">
                  <Phone className="h-3 w-3 text-slate-500" />
                  {sp.phone}
                </p>
              )}
              {sp.specialties && sp.specialties.length > 0 && (
                <div className="flex items-center gap-1.5 pt-1">
                  {sp.specialties.map((spec) => (
                    <span key={spec} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                      {spec.toUpperCase()}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <button
                type="button"
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition text-xs flex items-center gap-1"
              >
                <Edit2 className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Editar</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Edição de Especialista */}
      {editingSpecialist && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-[#0f172a] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Editar Especialista</h3>
              <button
                type="button"
                onClick={() => setEditingSpecialist(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form
              action={async (formData) => {
                await updateSpecialist(formData)
                setEditingSpecialist(null)
              }}
              className="space-y-4"
            >
              <input type="hidden" name="specialistId" value={editingSpecialist.id} />

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Nome do Profissional</label>
                <input
                  name="name"
                  type="text"
                  required
                  defaultValue={editingSpecialist.name}
                  className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">WhatsApp de Contato</label>
                <input
                  name="phone"
                  type="text"
                  defaultValue={editingSpecialist.phone || ''}
                  className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Comissão (%)</label>
                  <input
                    name="commissionRate"
                    type="number"
                    required
                    min={0}
                    max={100}
                    defaultValue={editingSpecialist.commission_rate}
                    className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Status</label>
                  <select
                    name="isActive"
                    defaultValue={editingSpecialist.is_active ? 'true' : 'false'}
                    className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="true">Ativo</option>
                    <option value="false">Inativo</option>
                  </select>
                </div>
              </div>

              <div>
                <span className="block text-xs font-semibold text-slate-300 mb-2">Especialidades</span>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="specialties"
                      value="makeup"
                      defaultChecked={editingSpecialist.specialties?.includes('makeup')}
                      className="rounded bg-slate-800"
                    />
                    Maquiagem
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="specialties"
                      value="lash"
                      defaultChecked={editingSpecialist.specialties?.includes('lash')}
                      className="rounded bg-slate-800"
                    />
                    Cílios (Lash)
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="specialties"
                      value="nails"
                      defaultChecked={editingSpecialist.specialties?.includes('nails')}
                      className="rounded bg-slate-800"
                    />
                    Unhas (Nail)
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="specialties"
                      value="hair"
                      defaultChecked={editingSpecialist.specialties?.includes('hair')}
                      className="rounded bg-slate-800"
                    />
                    Cabelo
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingSpecialist(null)}
                  className="rounded-lg bg-slate-800 hover:bg-slate-700 px-3 py-2 text-xs font-semibold text-slate-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 hover:bg-blue-500 px-4 py-2 text-xs font-bold text-white shadow-md shadow-blue-600/20"
                >
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
