import { cookies } from 'next/headers'
import Link from 'next/link'
import { Calendar, Users2, Sparkles, DollarSign, Globe2, Clock, Contact2, ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { MetricCards } from '@/components/dashboard/metric-cards'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const cookieStore = await cookies()
  const currentOrgId = cookieStore.get('current_org_id')?.value

  // 1. Busca dados da organização ativa
  const { data: orgData } = currentOrgId
    ? await supabase.from('organizations').select('id, name, slug').eq('id', currentOrgId).maybeSingle()
    : { data: null }

  // 2. Busca contagem de atendimentos de hoje/total
  const { count: totalAppointments } = currentOrgId
    ? await supabase
        .from('appointments')
        .select('*', { count: 'exact', head: true })
        .eq('organization_id', currentOrgId)
    : { count: 0 }

  // 3. Busca contagem de clientes
  const { count: totalClients } = currentOrgId
    ? await supabase
        .from('clients')
        .select('*', { count: 'exact', head: true })
        .eq('organization_id', currentOrgId)
    : { count: 0 }

  // 4. Busca faturamento bruto e comissões
  const { data: transactions } = currentOrgId
    ? await supabase
        .from('financial_transactions')
        .select('gross_amount_cents, commission_amount_cents, net_amount_cents')
        .eq('organization_id', currentOrgId)
    : { data: [] }

  const totalGross = (transactions || []).reduce((acc, t) => acc + t.gross_amount_cents, 0)
  const totalNet = (transactions || []).reduce((acc, t) => acc + t.net_amount_cents, 0)

  // 5. Próximos agendamentos
  const { data: upcomingAppointments } = currentOrgId
    ? await supabase
        .from('appointments')
        .select(`
          id, start_time, end_time, status, price_cents,
          clients(name, phone),
          specialists(name),
          services(name)
        `)
        .eq('organization_id', currentOrgId)
        .order('start_time', { ascending: true })
        .limit(5)
    : { data: [] }

  const orgName = orgData?.name || 'Espaço de Beleza'
  const orgSlug = orgData?.slug

  return (
    <div className="space-y-6">
      {/* Banner Operacional do Salão */}
      <div className="rounded-2xl border border-slate-800 bg-gradient-to-r from-pink-950/40 via-purple-950/30 to-[#0f172a] p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <span className="inline-block rounded-full bg-pink-500/10 border border-pink-500/20 px-3 py-1 text-xs font-semibold text-pink-400 mb-2">
              Painel de Gestão de Beleza
            </span>
            <h1 className="text-2xl font-black text-white tracking-tight">
              {orgName}
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Acompanhe seus atendimentos, fluxo de caixa, comissões de especialistas e agendamentos online em tempo real.
            </p>
          </div>

          {orgSlug && (
            <div className="flex items-center gap-2">
              <Link
                href={`/book/${orgSlug}`}
                target="_blank"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-semibold text-xs transition shadow-lg shadow-pink-600/20"
              >
                <Globe2 className="h-4 w-4" />
                Abrir Página de Agendamento
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Cards de Métricas Operacionais */}
      <MetricCards
        totalAppointments={totalAppointments || 0}
        totalClients={totalClients || 0}
        totalGrossCents={totalGross}
        totalNetCents={totalNet}
      />

      {/* Grid: Próximos Atendimentos + Atalhos do Salão */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Próximos Horários Marcados */}
        <div className="lg:col-span-2 rounded-xl border border-slate-800 bg-[#0f172a] p-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Calendar className="h-4 w-4 text-purple-400" />
              Próximos Atendimentos na Agenda
            </h2>
            <Link
              href="/appointments"
              className="text-xs text-purple-400 hover:text-purple-300 font-medium flex items-center gap-1"
            >
              Ver agenda completa <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {upcomingAppointments && upcomingAppointments.length > 0 ? (
            <div className="space-y-3">
              {upcomingAppointments.map((apt: any) => {
                const client = Array.isArray(apt.clients) ? apt.clients[0] : apt.clients
                const specialist = Array.isArray(apt.specialists) ? apt.specialists[0] : apt.specialists
                const service = Array.isArray(apt.services) ? apt.services[0] : apt.services
                const startDate = new Date(apt.start_time)

                return (
                  <div
                    key={apt.id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3.5 rounded-lg border border-slate-800/80 bg-slate-900/50 gap-2"
                  >
                    <div>
                      <p className="text-xs font-bold text-white">{service?.name || 'Procedimento'}</p>
                      <p className="text-[11px] text-slate-400">
                        Cliente: <strong className="text-slate-300">{client?.name}</strong> • Profissional: <strong className="text-slate-300">{specialist?.name}</strong>
                      </p>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-center">
                      <span className="text-xs text-purple-300 flex items-center gap-1 font-medium">
                        <Clock className="h-3 w-3" />
                        {startDate.toLocaleDateString('pt-BR')} às {startDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <span className="text-xs font-bold text-emerald-400">
                        R$ {(apt.price_cents / 100).toFixed(2)}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-xs text-slate-400">Nenhum atendimento agendado para os próximos dias.</p>
              <Link
                href="/appointments"
                className="mt-3 inline-block rounded-lg bg-slate-800 hover:bg-slate-700 px-3 py-1.5 text-xs text-purple-300 font-medium"
              >
                + Marcar Horário na Agenda
              </Link>
            </div>
          )}
        </div>

        {/* Ações Rápidas de Gestão */}
        <div className="rounded-xl border border-slate-800 bg-[#0f172a] p-6 shadow-md space-y-4">
          <h2 className="text-sm font-bold text-white">Ações Rápidas</h2>

          <div className="space-y-2">
            <Link
              href="/appointments"
              className="flex items-center gap-3 p-3 rounded-lg border border-slate-800 bg-slate-900/40 hover:border-purple-500/50 transition group"
            >
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition">
                <Calendar className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Nova Marcação</p>
                <p className="text-[11px] text-slate-400">Agendar horário na grade</p>
              </div>
            </Link>

            <Link
              href="/clients"
              className="flex items-center gap-3 p-3 rounded-lg border border-slate-800 bg-slate-900/40 hover:border-emerald-500/50 transition group"
            >
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition">
                <Contact2 className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Cadastrar Cliente</p>
                <p className="text-[11px] text-slate-400">Ficha técnica e anamnese</p>
              </div>
            </Link>

            <Link
              href="/services"
              className="flex items-center gap-3 p-3 rounded-lg border border-slate-800 bg-slate-900/40 hover:border-pink-500/50 transition group"
            >
              <div className="p-2 rounded-lg bg-pink-500/10 text-pink-400 group-hover:bg-pink-600 group-hover:text-white transition">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Novo Procedimento</p>
                <p className="text-[11px] text-slate-400">Make, Lash, Nails ou Cabelo</p>
              </div>
            </Link>

            <Link
              href="/financial"
              className="flex items-center gap-3 p-3 rounded-lg border border-slate-800 bg-slate-900/40 hover:border-amber-500/50 transition group"
            >
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 group-hover:bg-amber-600 group-hover:text-white transition">
                <DollarSign className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Caixa & Comissões</p>
                <p className="text-[11px] text-slate-400">Extrato financeiro do salão</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

