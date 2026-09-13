'use client'

import { useTransition, useState } from 'react'
import { switchOrganization, createOrganization } from '@/app/actions/organizations'

export interface OrgOption {
  id: string
  name: string
  slug?: string
  role: string
}

interface OrgSwitcherProps {
  organizations: OrgOption[]
  currentOrgId?: string
}

export function OrganizationSwitcher({ organizations, currentOrgId }: OrgSwitcherProps) {
  const [isPending, startTransition] = useTransition()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [feedback, setFeedback] = useState<string | null>(null)

  const activeOrg = organizations.find((o) => o.id === currentOrgId) || organizations[0]

  const handleSwitch = (orgId: string) => {
    if (orgId === currentOrgId) return
    startTransition(async () => {
      await switchOrganization(orgId)
    })
  }

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      const res = await createOrganization(formData)
      if (res.success) {
        setIsModalOpen(false)
      } else {
        setFeedback(res.message)
      }
    })
  }

  return (
    <div className="relative inline-flex items-center gap-2">
      {organizations.length > 0 ? (
        <select
          aria-label="Selecionar Organização Ativa"
          disabled={isPending}
          value={activeOrg?.id || ''}
          onChange={(e) => handleSwitch(e.target.value)}
          className="rounded-lg bg-slate-800 border border-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:border-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer disabled:opacity-50"
        >
          {organizations.map((org) => (
            <option key={org.id} value={org.id}>
              {org.name} ({org.role})
            </option>
          ))}
        </select>
      ) : (
        <span className="text-xs text-slate-400">Nenhuma organização</span>
      )}

      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="rounded-lg bg-blue-600 hover:bg-blue-500 text-white px-2.5 py-1.5 text-xs font-medium transition shadow-sm"
        title="Criar nova organização"
      >
        + Nova Org
      </button>

      {/* Modal Simples de Criação */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-xl border border-slate-800 bg-[#0f172a] p-6 shadow-2xl">
            <h3 className="text-base font-bold text-white mb-2">Criar Nova Organização</h3>
            <p className="text-xs text-slate-400 mb-4">
              Defina o nome do seu novo tenant. Você será atribuído como proprietário (owner).
            </p>

            {feedback && (
              <div className="mb-4 rounded-lg bg-red-950/40 border border-red-800/50 p-2.5 text-xs text-red-300">
                {feedback}
              </div>
            )}

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-xs font-semibold text-slate-300 mb-1">
                  Nome da Organização
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Ex: Acme Corp"
                  className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false)
                    setFeedback(null)
                  }}
                  className="rounded-lg bg-slate-800 hover:bg-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="rounded-lg bg-blue-600 hover:bg-blue-500 px-4 py-1.5 text-xs font-semibold text-white disabled:opacity-50"
                >
                  {isPending ? 'Criando...' : 'Criar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
