import { CheckCircle2, ShieldAlert, Clock } from 'lucide-react'

export function ActivityFeed() {
  const activities = [
    {
      title: 'Políticas de RLS Multi-tenant Ativadas',
      description: 'Isolamento de banco de dados validado com sucesso.',
      timestamp: 'Hoje',
      type: 'security',
    },
    {
      title: 'Organização Conectada',
      description: 'Sessão operacional vinculada ao tenant ativo.',
      timestamp: 'Hoje',
      type: 'tenant',
    },
    {
      title: 'Autenticação SSR Inicializada',
      description: 'Sessão persistida via cookies HTTPOnly.',
      timestamp: 'Hoje',
      type: 'auth',
    },
  ]

  return (
    <div className="rounded-xl border border-slate-800 bg-[#0f172a] p-6 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold text-white">Eventos & Auditoria do Tenant</h2>
        <span className="text-[11px] text-slate-500">Últimas 24h</span>
      </div>

      <div className="space-y-4">
        {activities.map((act, idx) => (
          <div key={idx} className="flex items-start gap-3 text-xs">
            <div className="mt-0.5 p-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <CheckCircle2 className="h-3.5 w-3.5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-slate-200">{act.title}</p>
              <p className="text-[11px] text-slate-400">{act.description}</p>
            </div>
            <span className="text-[10px] text-slate-500 shrink-0">{act.timestamp}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
