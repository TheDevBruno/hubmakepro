import { CalendarDays, Contact2, DollarSign, TrendingUp } from 'lucide-react'

interface MetricCardsProps {
  totalAppointments: number
  totalClients: number
  totalGrossCents: number
  totalNetCents: number
}

export function MetricCards({
  totalAppointments,
  totalClients,
  totalGrossCents,
  totalNetCents,
}: MetricCardsProps) {
  const metrics = [
    {
      title: 'Atendimentos Marcados',
      value: totalAppointments.toString(),
      description: 'Total acumulado na agenda',
      icon: CalendarDays,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
    },
    {
      title: 'Clientes Cadastradas',
      value: totalClients.toString(),
      description: 'Prontuários e fichas ativas',
      icon: Contact2,
      color: 'text-pink-400',
      bgColor: 'bg-pink-500/10',
      borderColor: 'border-pink-500/20',
    },
    {
      title: 'Faturamento Bruto',
      value: (totalGrossCents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      description: 'Receita total dos procedimentos',
      icon: DollarSign,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20',
    },
    {
      title: 'Lucro Líquido do Espaço',
      value: (totalNetCents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      description: 'Após dedução de comissões',
      icon: TrendingUp,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((m, idx) => {
        const Icon = m.icon
        return (
          <div
            key={idx}
            className="rounded-xl border border-slate-800 bg-[#0f172a] p-5 shadow-sm hover:border-slate-700 transition"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                {m.title}
              </span>
              <div className={`p-2 rounded-lg ${m.bgColor} ${m.borderColor} border`}>
                <Icon className={`h-4 w-4 ${m.color}`} />
              </div>
            </div>
            <p className="text-xl font-bold text-white mb-1">{m.value}</p>
            <p className="text-[11px] text-slate-500 truncate">{m.description}</p>
          </div>
        )
      })}
    </div>
  )
}

