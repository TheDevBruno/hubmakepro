import { Users, Database, Activity, GitBranch } from 'lucide-react'

interface MetricCardsProps {
  memberCount: number
  role: string
  orgName: string
}

export function MetricCards({ memberCount, role, orgName }: MetricCardsProps) {
  const metrics = [
    {
      title: 'Membros do Tenant',
      value: `${memberCount} ${memberCount === 1 ? 'Membro' : 'Membros'}`,
      description: `Papel atual: ${role.toUpperCase()}`,
      icon: Users,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
    },
    {
      title: 'Banco de Dados',
      value: 'PostgreSQL RLS',
      description: 'Isolamento de tenant 100% ativo',
      icon: Database,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20',
    },
    {
      title: 'Pipelines & CI/CD',
      value: 'Operacional',
      description: 'GitHub Actions integrado',
      icon: GitBranch,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20',
    },
    {
      title: 'Saúde do Sistema',
      value: '99.9% Uptime',
      description: 'Monitoramento contínuo',
      icon: Activity,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
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
