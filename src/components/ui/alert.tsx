import React from 'react'
import { AlertCircle, CheckCircle2, Info, AlertTriangle, X } from 'lucide-react'

export type AlertVariant = 'info' | 'success' | 'warning' | 'error'

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant
  title?: string
  onClose?: () => void
}

const alertConfig: Record<
  AlertVariant,
  { bg: string; border: string; text: string; icon: React.ReactNode }
> = {
  info: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    text: 'text-blue-400',
    icon: <Info className="h-4 w-4 shrink-0" aria-hidden="true" />,
  },
  success: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    text: 'text-emerald-400',
    icon: <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />,
  },
  warning: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    text: 'text-amber-400',
    icon: <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden="true" />,
  },
  error: {
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
    text: 'text-red-400',
    icon: <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />,
  },
}

export function Alert({
  variant = 'info',
  title,
  children,
  onClose,
  className = '',
  ...props
}: AlertProps) {
  const config = alertConfig[variant] || alertConfig.info

  return (
    <div
      role="alert"
      className={`rounded-xl border p-4 text-xs font-medium flex items-start justify-between gap-3 ${config.bg} ${config.border} ${config.text} ${className}`}
      {...props}
    >
      <div className="flex items-start gap-2.5">
        <div className="mt-0.5">{config.icon}</div>
        <div className="space-y-0.5">
          {title && <p className="font-bold tracking-tight text-white">{title}</p>}
          <div className="text-slate-300 leading-relaxed">{children}</div>
        </div>
      </div>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar alerta"
          className="rounded-lg p-1 text-slate-400 hover:text-white transition focus:outline-none focus:ring-1 focus:ring-slate-500"
        >
          <X className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      )}
    </div>
  )
}
