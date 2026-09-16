'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { mobileNavItems } from '@/lib/design-system/navigation'

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav
      id="mobile-navigation"
      aria-label="Navegação Rápida Mobile"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0c1220]/95 backdrop-blur-md border-t border-slate-800 px-2 py-1.5 flex items-center justify-around shadow-2xl safe-area-bottom select-none"
    >
      {mobileNavItems.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href

        return (
          <Link
            key={item.id}
            id={`mobile-nav-link-${item.id}`}
            href={item.href}
            prefetch={true}
            aria-current={isActive ? 'page' : undefined}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition duration-150 min-w-[56px] ${
              isActive
                ? 'text-pink-400 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <div
              id={`mobile-nav-icon-box-${item.id}`}
              className={`p-1 rounded-lg transition ${
                isActive ? 'bg-pink-500/10' : ''
              }`}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
            </div>
            <span id={`mobile-nav-label-${item.id}`} className="text-[10px] mt-0.5 tracking-tight">
              {item.label}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
