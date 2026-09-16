'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navigationConfig, navGroupLabels, filterNavItemsByRole } from '@/lib/design-system/navigation'
import { Globe2, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react'
import { UserRole } from '@/lib/rbac'

export interface AppSidebarProps {
  currentOrgName?: string
  currentOrgSlug?: string
  currentRole?: UserRole
  isCollapsed: boolean
  onToggleCollapse: () => void
}

export function AppSidebar({
  currentOrgName,
  currentOrgSlug,
  currentRole = 'owner',
  isCollapsed,
  onToggleCollapse,
}: AppSidebarProps) {
  const pathname = usePathname()

  const groups: Array<'main' | 'operations' | 'finance' | 'settings'> = [
    'main',
    'operations',
    'finance',
    'settings',
  ]

  // Filtra itens de acordo com o papel do usuário na organização ativa
  const allowedNavItems = filterNavItemsByRole(navigationConfig, currentRole)

  return (
    <aside
      id="app-sidebar"
      className={`border-r border-slate-800 bg-[#0c1220] flex flex-col justify-between shrink-0 transition-all duration-300 select-none ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div id="sidebar-top-container" className="p-4 space-y-6">
        {/* Brand / Logo */}
        <div id="sidebar-brand-wrapper" className="flex items-center justify-between gap-3">
          <div id="sidebar-logo-info" className="flex items-center gap-3 overflow-hidden">
            <div
              id="sidebar-logo-icon"
              className="h-9 w-9 rounded-xl bg-gradient-to-tr from-pink-600 via-purple-600 to-blue-600 flex items-center justify-center font-black text-white shadow-lg shadow-pink-500/20 shrink-0"
            >
              H
            </div>
            {!isCollapsed && (
              <div id="sidebar-brand-text" className="truncate leading-tight">
                <span className="text-sm font-bold text-white tracking-wide block">Hub MakePro</span>
                <span className="text-[11px] text-pink-400 block truncate max-w-[140px]">
                  {currentOrgName || 'Espaço de Beleza'}
                </span>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label={isCollapsed ? 'Expandir menu lateral' : 'Recolher menu lateral'}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition focus:outline-none focus:ring-1 focus:ring-pink-500 hidden md:block"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            ) : (
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Agendamento Online Destaque */}
        {currentOrgSlug && (
          <div id="sidebar-booking-cta-wrapper" className="pt-1">
            <Link
              id="sidebar-booking-link"
              href={`/book/${currentOrgSlug}`}
              target="_blank"
              title="Abrir Página de Agendamento Online"
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl bg-gradient-to-r from-pink-600/20 to-purple-600/20 border border-pink-500/30 hover:border-pink-500/60 text-pink-300 font-semibold text-xs transition group ${
                isCollapsed ? 'justify-center' : 'justify-between'
              }`}
            >
              <div id="sidebar-booking-content" className="flex items-center gap-2 truncate">
                <Globe2 className="h-4 w-4 text-pink-400 shrink-0 group-hover:animate-pulse" aria-hidden="true" />
                {!isCollapsed && <span className="truncate">Agendamento Online</span>}
              </div>
              {!isCollapsed && (
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-pink-500/20 text-pink-300 uppercase">
                  Público
                </span>
              )}
            </Link>
          </div>
        )}

        {/* Navigation Sections */}
        <nav id="sidebar-primary-nav" className="space-y-4" aria-label="Navegação Principal">
          {groups.map((group) => {
            const items = allowedNavItems.filter((item) => item.group === group)
            if (items.length === 0) return null

            return (
              <section key={group} id={`sidebar-group-${group}`} className="space-y-1">
                {!isCollapsed && (
                  <div
                    id={`sidebar-heading-${group}`}
                    className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500"
                  >
                    {navGroupLabels[group]}
                  </div>
                )}

                {items.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href

                  return (
                    <Link
                      key={item.id}
                      id={`sidebar-link-${item.id}`}
                      href={item.href}
                      prefetch={true}
                      target={item.target}
                      title={isCollapsed ? item.label : undefined}
                      aria-current={isActive ? 'page' : undefined}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition duration-150 ${
                        isCollapsed ? 'justify-center' : 'justify-between'
                      } ${
                        isActive
                          ? 'bg-pink-600 text-white font-semibold shadow-md shadow-pink-600/20'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                      }`}
                    >
                      <div id={`sidebar-item-inner-${item.id}`} className="flex items-center gap-2.5">
                        <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                        {!isCollapsed && <span>{item.label}</span>}
                      </div>
                    </Link>
                  )
                })}
              </section>
            )
          })}
        </nav>
      </div>

      {/* Footer / System Status */}
      <div id="sidebar-footer-wrapper" className="p-4 border-t border-slate-800/80 bg-slate-900/40">
        <div id="sidebar-footer-status" className="flex items-center gap-2 text-xs text-slate-400">
          <ShieldCheck className="h-4 w-4 text-pink-400 shrink-0" aria-hidden="true" />
          {!isCollapsed && (
            <div id="sidebar-footer-text" className="leading-tight">
              <span className="text-slate-200 font-semibold block text-[11px]">Lab Beauty OS</span>
              <span className="text-[10px] text-pink-400">Make • Lash • Nails</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
