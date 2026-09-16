'use client'

import React, { useState } from 'react'
import { AppSidebar } from './app-sidebar'
import { AppHeader } from './app-header'
import { MobileNav } from './mobile-nav'
import { OrgOption } from '@/components/organization-switcher'

export interface AppShellProps {
  children: React.ReactNode
  organizations: OrgOption[]
  currentOrgId?: string
  currentOrgName?: string
  currentOrgSlug?: string
  userEmail?: string
  userFullName?: string
}

export function AppShell({
  children,
  organizations,
  currentOrgId,
  currentOrgName,
  currentOrgSlug,
  userEmail,
  userFullName,
}: AppShellProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev)
  }

  return (
    <div id="app-shell" className="flex h-screen bg-[#070a12] text-slate-100 overflow-hidden">
      {/* 1. Sidebar Desktop & Tablet */}
      <div id="shell-sidebar-desktop" className="hidden md:flex h-full">
        <AppSidebar
          currentOrgName={currentOrgName}
          currentOrgSlug={currentOrgSlug}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={toggleSidebar}
        />
      </div>

      {/* 2. Drawer Mobile (Quando aberto) */}
      {isMobileDrawerOpen && (
        <div id="shell-mobile-drawer-overlay" className="fixed inset-0 z-50 md:hidden flex">
          <div
            id="shell-drawer-backdrop"
            className="fixed inset-0 bg-black/70 backdrop-blur-sm animate-in fade-in"
            onClick={() => setIsMobileDrawerOpen(false)}
            aria-hidden="true"
          />
          <div
            id="shell-drawer-panel"
            className="relative z-10 w-72 h-full bg-[#0c1220] shadow-2xl animate-in slide-in-from-left duration-200"
          >
            <AppSidebar
              currentOrgName={currentOrgName}
              currentOrgSlug={currentOrgSlug}
              isCollapsed={false}
              onToggleCollapse={() => setIsMobileDrawerOpen(false)}
            />
          </div>
        </div>
      )}

      {/* 3. Main Application Canvas */}
      <div id="shell-main-canvas" className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header */}
        <AppHeader
          organizations={organizations}
          currentOrgId={currentOrgId}
          userEmail={userEmail}
          userFullName={userFullName}
          onOpenMobileMenu={() => setIsMobileDrawerOpen(true)}
        />

        {/* Content Viewport */}
        <main id="shell-main-content" className="flex-1 p-4 sm:p-6 max-w-7xl w-full mx-auto pb-20 md:pb-6">
          {children}
        </main>
      </div>

      {/* 4. Bottom Navigation Mobile */}
      <MobileNav />
    </div>
  )
}
