/**
 * ==============================================================================
 * DESIGN SYSTEM TOKENS — HUB MAKEPRO / LAB BEAUTY SAAS (v2.0)
 * ==============================================================================
 * Centraliza design tokens semânticos em HSL, tipografia, espaçamentos, elevação,
 * raios de borda e transições para a interface moderna.
 */

export const designTokens = {
  colors: {
    // Cores Base & Fundo
    background: 'hsl(222, 47%, 6%)', // #070a12
    surface: 'hsl(222, 47%, 11%)', // #0f172a
    surfaceSubtle: 'hsl(217, 33%, 17%)', // #1e293b
    border: 'hsl(217, 33%, 17%)', // #1e293b
    borderHover: 'hsl(217, 33%, 25%)',

    // Tipografia Semântica
    textPrimary: 'hsl(210, 40%, 98%)', // #f8fafc
    textSecondary: 'hsl(215, 20%, 65%)', // #94a3b8
    textMuted: 'hsl(215, 16%, 47%)', // #64748b

    // Acentos & Identidade da Plataforma (Beauty OS)
    primary: 'hsl(330, 81%, 60%)', // Pink / Rose #ec4899
    primaryHover: 'hsl(330, 81%, 50%)',
    primarySubtle: 'hsla(330, 81%, 60%, 0.12)',

    secondary: 'hsl(262, 83%, 58%)', // Purple / Violet #8b5cf6
    secondaryHover: 'hsl(262, 83%, 48%)',
    secondarySubtle: 'hsla(262, 83%, 58%, 0.12)',

    accent: 'hsl(217, 91%, 60%)', // Blue #3b82f6
    accentHover: 'hsl(217, 91%, 50%)',
    accentSubtle: 'hsla(217, 91%, 60%, 0.12)',

    // Estados de Feedback (5 Estados da Interface)
    success: 'hsl(160, 84%, 39%)', // Emerald #10b981
    successSubtle: 'hsla(160, 84%, 39%, 0.12)',
    successBorder: 'hsla(160, 84%, 39%, 0.25)',

    warning: 'hsl(38, 92%, 50%)', // Amber #f59e0b
    warningSubtle: 'hsla(38, 92%, 50%, 0.12)',
    warningBorder: 'hsla(38, 92%, 50%, 0.25)',

    danger: 'hsl(0, 84%, 60%)', // Red #ef4444
    dangerSubtle: 'hsla(0, 84%, 60%, 0.12)',
    dangerBorder: 'hsla(0, 84%, 60%, 0.25)',

    info: 'hsl(199, 89%, 48%)', // Sky / Cyan #0ea5e9
    infoSubtle: 'hsla(199, 89%, 48%, 0.12)',
    infoBorder: 'hsla(199, 89%, 48%, 0.25)',
  },

  // Nichos de Beleza
  niches: {
    makeup: { label: 'Maquiagem', color: 'hsl(330, 81%, 60%)', bg: 'hsla(330, 81%, 60%, 0.12)', border: 'hsla(330, 81%, 60%, 0.25)' },
    lash: { label: 'Cílios / Lash', color: 'hsl(262, 83%, 58%)', bg: 'hsla(262, 83%, 58%, 0.12)', border: 'hsla(262, 83%, 58%, 0.25)' },
    nails: { label: 'Unhas / Nail', color: 'hsl(160, 84%, 39%)', bg: 'hsla(160, 84%, 39%, 0.12)', border: 'hsla(160, 84%, 39%, 0.25)' },
    hair: { label: 'Cabelo / Hair', color: 'hsl(38, 92%, 50%)', bg: 'hsla(38, 92%, 50%, 0.12)', border: 'hsla(38, 92%, 50%, 0.25)' },
    esthetics: { label: 'Estética', color: 'hsl(217, 91%, 60%)', bg: 'hsla(217, 91%, 60%, 0.12)', border: 'hsla(217, 91%, 60%, 0.25)' },
  },

  // Status de Atendimento Operacional
  statuses: {
    pending: { label: 'Pendente', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
    confirmed: { label: 'Confirmado', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    in_progress: { label: 'Em Atendimento', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
    completed: { label: 'Concluído', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    cancelled: { label: 'Cancelado', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
  },

  // Raios de Borda
  radii: {
    sm: '0.375rem', // rounded-md
    md: '0.5rem', // rounded-lg
    lg: '0.75rem', // rounded-xl
    xl: '1rem', // rounded-2xl
    full: '9999px',
  },

  // Elevação e Sombras
  shadows: {
    card: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -2px rgba(0, 0, 0, 0.3)',
    glowPrimary: '0 0 20px -3px hsla(330, 81%, 60%, 0.25)',
    glowSecondary: '0 0 20px -3px hsla(262, 83%, 58%, 0.25)',
    glowAccent: '0 0 20px -3px hsla(217, 91%, 60%, 0.25)',
  },

  // Transições Padrão
  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    normal: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const

export type DesignTokens = typeof designTokens
