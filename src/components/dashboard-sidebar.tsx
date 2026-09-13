'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  CalendarDays,
  Sparkles,
  Users2,
  Contact2,
  Globe2,
  DollarSign,
  Building2, 
  User, 
  ShieldCheck
} from 'lucide-react'

interface DashboardSidebarProps {
  currentOrgName?: string
  currentOrgSlug?: string
}

export function DashboardSidebar({ currentOrgName, currentOrgSlug }: DashboardSidebarProps) {
  const pathname = usePathname()

  const navItems = [
    { label: 'Visão Geral', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Agenda Operacional', href: '/appointments', icon: CalendarDays },
    { label: 'Ficha de Clientes', href: '/clients', icon: Contact2 },
    { label: 'Catálogo de Serviços', href: '/services', icon: Sparkles },
    { label: 'Especialistas & Equipe', href: '/specialists', icon: Users2 },
    { 
      label: 'Agendamento Online', 
      href: currentOrgSlug ? `/book/${currentOrgSlug}` : '/dashboard', 
      icon: Globe2,
      target: '_blank'
    },
    { label: 'Caixa & Comissões', href: '/financial', icon: DollarSign },
    { label: 'Meu Espaço / Salão', href: '/settings/organization', icon: Building2 },
    { label: 'Meu Perfil', href: '/settings/profile', icon: User },
  ]

  return (
    <aside className="w-64 border-r border-slate-800 bg-[#0c1220] flex flex-col justify-between shrink-0 hidden md:flex">
      <div className="p-5 space-y-6">
        {/* Logo / Brand */}
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-pink-600 to-purple-600 flex items-center justify-center font-black text-white shadow-lg shadow-pink-500/20">
            H
          </div>
          <div>
            <span className="text-sm font-bold text-white tracking-wide block">Hub MakePro</span>
            <span className="text-[11px] text-pink-400 block truncate max-w-[140px]">
              {currentOrgName || 'Espaço de Beleza'}
            </span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Gestão do Espaço
          </div>
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.label}
                href={item.href}
                target={item.target}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition ${
                  isActive
                    ? 'bg-pink-600/90 text-white font-semibold shadow-sm shadow-pink-500/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{item.label}</span>
                </div>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Footer / System Status */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-900/40">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <ShieldCheck className="h-4 w-4 text-pink-400 shrink-0" />
          <div className="leading-tight">
            <span className="text-slate-200 font-semibold block text-[11px]">Beauty SaaS OS</span>
            <span className="text-[10px] text-pink-400">Make • Lash • Nails</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
