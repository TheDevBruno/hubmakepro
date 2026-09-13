import Link from 'next/link'
import { UserPlus, Settings, FolderPlus, FileUp } from 'lucide-react'

export function QuickActions() {
  const actions = [
    {
      title: 'Gerenciar Membros',
      description: 'Convidar ou alterar funções',
      href: '/settings/organization',
      icon: UserPlus,
      color: 'hover:border-blue-500/50',
    },
    {
      title: 'Configurações do Perfil',
      description: 'Atualizar informações pessoais',
      href: '/settings/profile',
      icon: Settings,
      color: 'hover:border-purple-500/50',
    },
    {
      title: 'Novo Projeto (Sprint 4)',
      description: 'Estruturar pipeline de trabalho',
      href: '/dashboard',
      icon: FolderPlus,
      color: 'hover:border-emerald-500/50',
      badge: 'Em Breve',
    },
    {
      title: 'Envio de Arquivos (Sprint 5)',
      description: 'Upload via Supabase Storage',
      href: '/dashboard',
      icon: FileUp,
      color: 'hover:border-amber-500/50',
      badge: 'Em Breve',
    },
  ]

  return (
    <div className="rounded-xl border border-slate-800 bg-[#0f172a] p-6 shadow-md">
      <h2 className="text-sm font-bold text-white mb-4">Ações Rápidas</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {actions.map((act, idx) => {
          const Icon = act.icon
          return (
            <Link
              key={idx}
              href={act.href}
              className={`flex items-start gap-3 p-3.5 rounded-lg border border-slate-800/80 bg-slate-900/50 ${act.color} transition group`}
            >
              <div className="p-2 rounded-lg bg-slate-800 text-slate-300 group-hover:text-white group-hover:bg-blue-600 transition shrink-0">
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-200 group-hover:text-white transition">
                    {act.title}
                  </span>
                  {act.badge && (
                    <span className="text-[9px] font-semibold bg-slate-800 text-slate-400 border border-slate-700 px-1.5 py-0.2 rounded">
                      {act.badge}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 truncate mt-0.5">{act.description}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
