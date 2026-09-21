import type { UserRole } from './roles'
import type { Permission } from './permissions'
import { hasPermission } from './permissions'

export interface BaseNavItem {
  id: string
  label: string
  href: string
  group?: 'main' | 'operations' | 'finance' | 'settings'
  featureKey?: string
  target?: string
  isHighlight?: boolean
  requiredPermission?: Permission
}

export const navGroupLabels: Record<string, string> = {
  main: 'Principal',
  operations: 'Operação & Beleza',
  finance: 'Financeiro & Salão',
  settings: 'Ajustes',
}

/**
 * Filtra itens de navegação baseado no papel (role) do usuário logado na organização ativa.
 * Observação: Utilizado para aprimoramento de UX. A proteção definitiva ocorre server-side e no banco (RLS).
 */
export function filterNavItemsByRole<T extends { requiredPermission?: Permission }>(
  items: T[],
  role: UserRole | string | undefined | null
): T[] {
  if (!role) return []
  return items.filter((item) => {
    if (!item.requiredPermission) return true
    return hasPermission(role, item.requiredPermission)
  })
}
