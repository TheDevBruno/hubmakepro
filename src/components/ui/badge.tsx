import React from 'react'

export type BadgeVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'success'
  | 'warning'
  | 'danger'
  | 'pending'
  | 'confirmed'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'makeup'
  | 'lash'
  | 'nails'
  | 'hair'
  | 'esthetics'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  size?: 'sm' | 'md'
  icon?: React.ReactNode
}

const badgeVariants: Record<BadgeVariant, { label?: string; styles: string }> = {
  default: { styles: 'bg-slate-800 text-slate-300 border-slate-700' },
  primary: { styles: 'bg-pink-500/10 text-pink-400 border-pink-500/20' },
  secondary: { styles: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
  accent: { styles: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  success: { styles: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  warning: { styles: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
  danger: { styles: 'bg-red-500/10 text-red-400 border-red-500/20' },

  // Status de Atendimentos
  pending: { label: 'Pendente', styles: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
  confirmed: { label: 'Confirmado', styles: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  in_progress: { label: 'Em Atendimento', styles: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
  completed: { label: 'Concluído', styles: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  cancelled: { label: 'Cancelado', styles: 'bg-red-500/10 text-red-400 border-red-500/20' },

  // Nichos de Beleza
  makeup: { label: 'Maquiagem', styles: 'bg-pink-500/10 text-pink-400 border-pink-500/20' },
  lash: { label: 'Cílios / Lash', styles: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
  nails: { label: 'Unhas / Nail', styles: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  hair: { label: 'Cabelo / Hair', styles: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
  esthetics: { label: 'Estética', styles: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
}

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  icon,
  className = '',
  ...props
}: BadgeProps) {
  const config = badgeVariants[variant] || badgeVariants.default
  const sizeClass = size === 'sm' ? 'text-[9px] px-1.5 py-0.5' : 'text-[10px] px-2 py-0.5'

  return (
    <span
      className={`inline-flex items-center gap-1 font-bold rounded border uppercase tracking-wider select-none ${config.styles} ${sizeClass} ${className}`}
      {...props}
    >
      {icon && <span className="shrink-0" aria-hidden="true">{icon}</span>}
      <span>{children || config.label}</span>
    </span>
  )
}
