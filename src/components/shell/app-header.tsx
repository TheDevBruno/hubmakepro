'use client'

import React from 'react'
import { OrganizationSwitcher, OrgOption } from '@/components/organization-switcher'
import { logout } from '@/app/actions/auth'
import { LogOut, User, Menu } from 'lucide-react'

export interface AppHeaderProps {
  organizations: OrgOption[]
  currentOrgId?: string
  userEmail?: string
  userFullName?: string
  onOpenMobileMenu?: () => void
}

export function AppHeader({
  organizations,
  currentOrgId,
  userEmail,
  userFullName,
  onOpenMobileMenu,
}: AppHeaderProps) {
  return (
    <header
      id="app-header"
      className="border-b border-slate-800 bg-[#0f172a]/95 backdrop-blur px-4 sm:px-6 py-3 flex items-center justify-between shrink-0 sticky top-0 z-30 select-none"
    >
      {/* Esquerda: Menu Hamburguer Mobile + Seletor de Organização */}
      <div id="header-left-actions" className="flex items-center gap-3">
        {onOpenMobileMenu && (
          <button
            type="button"
            id="header-mobile-menu-btn"
            onClick={onOpenMobileMenu}
            aria-label="Abrir menu de navegação"
            className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition focus:outline-none focus:ring-1 focus:ring-pink-500"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        )}

        <div id="header-org-switcher-wrapper" className="flex items-center">
          <OrganizationSwitcher organizations={organizations} currentOrgId={currentOrgId} />
        </div>
      </div>

      {/* Direita: Perfil do Usuário & Logout */}
      <div id="header-right-actions" className="flex items-center gap-4">
        <div id="header-user-profile-info" className="text-right hidden sm:block border-r border-slate-800 pr-4">
          <p id="header-user-name" className="text-xs font-bold text-slate-200 truncate max-w-[180px]">
            {userFullName || 'Profissional'}
          </p>
          <p id="header-user-email" className="text-[11px] text-slate-400 truncate max-w-[180px]">
            {userEmail}
          </p>
        </div>

        <form action={logout} id="header-logout-form">
          <button
            type="submit"
            id="header-logout-btn"
            aria-label="Encerrar sessão"
            className="flex items-center gap-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/80 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-pink-500/40"
          >
            <LogOut className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
            <span className="hidden sm:inline">Sair</span>
          </button>
        </form>
      </div>
    </header>
  )
}
