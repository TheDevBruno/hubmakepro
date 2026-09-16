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
  Package,
  Settings,
} from 'lucide-react'

export interface NavItem {
  id: string
  label: string
  href: string
  icon: any
  group: 'main' | 'operations' | 'finance' | 'settings'
  featureKey?: string
  target?: string
  isHighlight?: boolean
}

export const navigationConfig: NavItem[] = [
  // 1. Grupo Principal
  {
    id: 'nav-dashboard',
    label: 'Visão Geral',
    href: '/dashboard',
    icon: LayoutDashboard,
    group: 'main',
    featureKey: 'dashboard',
  },
  // 2. Grupo Operação & Beleza
  {
    id: 'nav-appointments',
    label: 'Agenda Operacional',
    href: '/appointments',
    icon: CalendarDays,
    group: 'operations',
    featureKey: 'appointments',
  },
  {
    id: 'nav-clients',
    label: 'Ficha de Clientes',
    href: '/clients',
    icon: Contact2,
    group: 'operations',
    featureKey: 'clients',
  },
  {
    id: 'nav-services',
    label: 'Catálogo de Serviços',
    href: '/services',
    icon: Sparkles,
    group: 'operations',
    featureKey: 'services',
  },
  {
    id: 'nav-specialists',
    label: 'Especialistas & Equipe',
    href: '/specialists',
    icon: Users2,
    group: 'operations',
    featureKey: 'team',
  },
  // 3. Grupo Financeiro & Salão
  {
    id: 'nav-financial',
    label: 'Caixa & Comissões',
    href: '/financial',
    icon: DollarSign,
    group: 'finance',
    featureKey: 'cash_flow',
  },
  // 4. Grupo Ajustes & Identidade
  {
    id: 'nav-org-settings',
    label: 'Meu Espaço / Salão',
    href: '/settings/organization',
    icon: Building2,
    group: 'settings',
    featureKey: 'settings',
  },
  {
    id: 'nav-profile',
    label: 'Meu Perfil',
    href: '/settings/profile',
    icon: User,
    group: 'settings',
  },
]

export const navGroupLabels: Record<string, string> = {
  main: 'Principal',
  operations: 'Operação & Beleza',
  finance: 'Financeiro & Salão',
  settings: 'Ajustes',
}

export const mobileNavItems = [
  { id: 'mobile-nav-dashboard', label: 'Início', href: '/dashboard', icon: LayoutDashboard },
  { id: 'mobile-nav-appointments', label: 'Agenda', href: '/appointments', icon: CalendarDays },
  { id: 'mobile-nav-clients', label: 'Clientes', href: '/clients', icon: Contact2 },
  { id: 'mobile-nav-services', label: 'Serviços', href: '/services', icon: Sparkles },
  { id: 'mobile-nav-settings', label: 'Espaço', href: '/settings/organization', icon: Building2 },
]
