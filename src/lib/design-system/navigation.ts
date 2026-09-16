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
import { UserRole, Permission, hasPermission, filterNavItemsByRole, navGroupLabels, BaseNavItem } from '@/lib/rbac'

export interface NavItem extends BaseNavItem {
  icon: any
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
    requiredPermission: 'appointments:view',
  },
  {
    id: 'nav-clients',
    label: 'Ficha de Clientes',
    href: '/clients',
    icon: Contact2,
    group: 'operations',
    featureKey: 'clients',
    requiredPermission: 'clients:view',
  },
  {
    id: 'nav-services',
    label: 'Catálogo de Serviços',
    href: '/services',
    icon: Sparkles,
    group: 'operations',
    featureKey: 'services',
    requiredPermission: 'services:manage',
  },
  {
    id: 'nav-specialists',
    label: 'Especialistas & Equipe',
    href: '/specialists',
    icon: Users2,
    group: 'operations',
    featureKey: 'team',
    requiredPermission: 'specialists:manage',
  },
  // 3. Grupo Financeiro & Salão
  {
    id: 'nav-financial',
    label: 'Caixa & Comissões',
    href: '/financial',
    icon: DollarSign,
    group: 'finance',
    featureKey: 'cash_flow',
    requiredPermission: 'financial:view',
  },
  // 4. Grupo Ajustes & Identidade
  {
    id: 'nav-org-settings',
    label: 'Meu Espaço / Salão',
    href: '/settings/organization',
    icon: Building2,
    group: 'settings',
    featureKey: 'settings',
    requiredPermission: 'org:manage',
  },
  {
    id: 'nav-profile',
    label: 'Meu Perfil',
    href: '/settings/profile',
    icon: User,
    group: 'settings',
  },
]

export const mobileNavItems = [
  { id: 'mobile-nav-dashboard', label: 'Início', href: '/dashboard', icon: LayoutDashboard },
  { id: 'mobile-nav-appointments', label: 'Agenda', href: '/appointments', icon: CalendarDays, requiredPermission: 'appointments:view' as Permission },
  { id: 'mobile-nav-clients', label: 'Clientes', href: '/clients', icon: Contact2, requiredPermission: 'clients:view' as Permission },
  { id: 'mobile-nav-services', label: 'Serviços', href: '/services', icon: Sparkles, requiredPermission: 'services:manage' as Permission },
  { id: 'mobile-nav-settings', label: 'Espaço', href: '/settings/organization', icon: Building2, requiredPermission: 'org:manage' as Permission },
]

export { filterNavItemsByRole, navGroupLabels }
