import { cookies } from 'next/headers'
import Link from 'next/link'
import { Plus, Sparkles, Clock, DollarSign, Tag, CheckCircle2, XCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { getActiveOrganizationId } from '@/lib/tenant'
import { createService, toggleServiceStatus } from '@/app/actions/services'

const categoryLabels: Record<string, { label: string; color: string; border: string }> = {
  makeup: { label: 'Maquiagem', color: 'text-pink-400 bg-pink-500/10', border: 'border-pink-500/20' },
  lash: { label: 'Cílios / Lash', color: 'text-purple-400 bg-purple-500/10', border: 'border-purple-500/20' },
  nails: { label: 'Unhas / Nail', color: 'text-emerald-400 bg-emerald-500/10', border: 'border-emerald-500/20' },
  hair: { label: 'Cabelo / Hair', color: 'text-amber-400 bg-amber-500/10', border: 'border-amber-500/20' },
  esthetics: { label: 'Estética / Sobrancelhas', color: 'text-blue-400 bg-blue-500/10', border: 'border-blue-500/20' },
  other: { label: 'Outros', color: 'text-slate-400 bg-slate-500/10', border: 'border-slate-500/20' },
}

export default async function ServicesPage() {
  const supabase = await createClient()
  const currentOrgId = await getActiveOrganizationId(supabase)

  const { data: services } = currentOrgId
    ? await supabase
        .from('services')
        .select('*')
        .eq('organization_id', currentOrgId)
        .order('category', { ascending: true })
    : { data: [] }

  return (
    <div className="space-y-6">
      {/* Header da Página */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-pink-400" />
            Catálogo de Serviços
          </h1>
          <p className="text-xs text-slate-400">
            Gerencie procedimentos, durações e preços por nicho (Make, Lash, Nails, Cabelo)
          </p>
        </div>
      </div>

      {/* Grid: Formulário de Cadastro + Listagem */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formulário de Cadastro Rápido */}
        <div className="rounded-xl border border-slate-800 bg-[#0f172a] p-6 shadow-md h-fit">
          <h2 className="text-sm font-bold text-white mb-4">Novo Serviço</h2>
          <form action={createService} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-xs font-semibold text-slate-300 mb-1">
                Nome do Procedimento / Serviço
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Ex: Extensão Volume Russo / Make Noiva"
                className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-xs font-semibold text-slate-300 mb-1">
                Nicho / Categoria
              </label>
              <select
                id="category"
                name="category"
                className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
              >
                <option value="makeup">Maquiagem (Make)</option>
                <option value="lash">Cílios (Lash Designer)</option>
                <option value="nails">Unhas (Nail Designer)</option>
                <option value="hair">Cabelo (Hair / Salão)</option>
                <option value="esthetics">Estética & Sobrancelhas</option>
                <option value="other">Outros Serviços</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="durationMinutes" className="block text-xs font-semibold text-slate-300 mb-1">
                  Duração (min)
                </label>
                <input
                  id="durationMinutes"
                  name="durationMinutes"
                  type="number"
                  required
                  defaultValue={60}
                  step={15}
                  min={15}
                  className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="price" className="block text-xs font-semibold text-slate-300 mb-1">
                  Valor (R$)
                </label>
                <input
                  id="price"
                  name="price"
                  type="text"
                  required
                  placeholder="150,00"
                  className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-xs font-semibold text-slate-300 mb-1">
                Descrição / Recomendações (Opcional)
              </label>
              <textarea
                id="description"
                name="description"
                rows={2}
                placeholder="Ex: Requer teste de alergia / vir sem rímel..."
                className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-pink-600 hover:bg-pink-500 px-4 py-2 text-xs font-semibold text-white transition shadow-md shadow-pink-600/20"
            >
              + Salvar Serviço
            </button>
          </form>
        </div>

        {/* Lista de Serviços Cadastrados */}
        <div className="lg:col-span-2 space-y-3">
          {services && services.length > 0 ? (
            services.map((s: any) => {
              const cat = categoryLabels[s.category] || categoryLabels.other
              const priceFormatted = (s.price_cents / 100).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })

              return (
                <div
                  key={s.id}
                  className="rounded-xl border border-slate-800 bg-[#0f172a] p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:border-slate-700 transition"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{s.name}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded border ${cat.color} ${cat.border}`}
                      >
                        {cat.label}
                      </span>
                    </div>
                    {s.description && <p className="text-xs text-slate-400">{s.description}</p>}
                    <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-slate-500" />
                        {s.duration_minutes} min
                      </span>
                      <span className="flex items-center gap-1 font-semibold text-emerald-400">
                        {priceFormatted}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <span
                      className={`text-[10px] font-semibold px-2 py-1 rounded flex items-center gap-1 ${
                        s.is_active ? 'text-emerald-400 bg-emerald-500/10' : 'text-slate-500 bg-slate-800'
                      }`}
                    >
                      {s.is_active ? (
                        <>
                          <CheckCircle2 className="h-3 w-3" /> Ativo
                        </>
                      ) : (
                        <>
                          <XCircle className="h-3 w-3" /> Inativo
                        </>
                      )}
                    </span>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="rounded-xl border border-slate-800 bg-[#0f172a] p-8 text-center">
              <p className="text-sm text-slate-400">Nenhum serviço cadastrado ainda.</p>
              <p className="text-xs text-slate-500 mt-1">
                Utilize o formulário ao lado para cadastrar seus procedimentos de make, lash, unhas ou cabelo.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
