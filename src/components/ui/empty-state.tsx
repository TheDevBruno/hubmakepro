import React from 'react'
import { Sparkles } from 'lucide-react'

export interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className = '',
}: EmptyStateProps) {
  return (
    <div
      className={`rounded-2xl border border-dashed border-slate-800 bg-[#0f172a]/60 p-8 sm:p-12 text-center space-y-4 max-w-lg mx-auto ${className}`}
    >
      <div className="mx-auto w-12 h-12 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 shadow-inner">
        {icon || <Sparkles className="h-6 w-6" aria-hidden="true" />}
      </div>

      <div className="space-y-1">
        <h4 className="text-sm font-bold text-white tracking-tight">{title}</h4>
        {description && <p className="text-xs text-slate-400 max-w-sm mx-auto">{description}</p>}
      </div>

      {action && <div className="pt-2">{action}</div>}
    </div>
  )
}
