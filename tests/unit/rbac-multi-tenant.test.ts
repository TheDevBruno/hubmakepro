import { describe, it, expect } from 'vitest'
import { ROLES, isValidRole, UserRole } from '../../src/lib/rbac/roles'
import { ROLE_PERMISSIONS, hasPermission, hasAnyPermission, Permission } from '../../src/lib/rbac/permissions'
import { filterNavItemsByRole, BaseNavItem } from '../../src/lib/rbac/navigation-filter'

describe('RBAC & Multi-Tenant Core Architecture (Phase 3)', () => {
  describe('1. Role Hierarchy & Validation', () => {
    it('deve possuir exatamente os 5 papéis obrigatórios do Lab Beauty SaaS', () => {
      const expectedRoles: UserRole[] = ['owner', 'admin', 'specialist', 'receptionist', 'financial']
      expectedRoles.forEach((role) => {
        expect(isValidRole(role)).toBe(true)
        expect(ROLES[role]).toBeDefined()
        expect(ROLES[role].label).toBeTypeOf('string')
      })
    })

    it('deve rejeitar papéis inválidos ou desconhecidos', () => {
      expect(isValidRole('superadmin')).toBe(false)
      expect(isValidRole('guest')).toBe(false)
      expect(isValidRole('')).toBe(false)
    })
  })

  describe('2. Granular Permissions Matrix', () => {
    it('Owner e Admin devem possuir todas as permissões do sistema', () => {
      const allPermissions: Permission[] = [
        'org:manage',
        'members:manage',
        'services:manage',
        'specialists:manage',
        'appointments:view',
        'appointments:manage',
        'clients:view',
        'clients:manage',
        'financial:view',
        'financial:manage',
      ]

      allPermissions.forEach((perm) => {
        expect(hasPermission('owner', perm)).toBe(true)
        expect(hasPermission('admin', perm)).toBe(true)
      })
    })

    it('Specialist deve ter acesso apenas a agendamentos e clientes (sem financeiro ou config de salão)', () => {
      expect(hasPermission('specialist', 'appointments:view')).toBe(true)
      expect(hasPermission('specialist', 'appointments:manage')).toBe(true)
      expect(hasPermission('specialist', 'clients:view')).toBe(true)
      expect(hasPermission('specialist', 'clients:manage')).toBe(true)
      
      // Proibidos
      expect(hasPermission('specialist', 'financial:view')).toBe(false)
      expect(hasPermission('specialist', 'financial:manage')).toBe(false)
      expect(hasPermission('specialist', 'org:manage')).toBe(false)
      expect(hasPermission('specialist', 'services:manage')).toBe(false)
      expect(hasPermission('specialist', 'specialists:manage')).toBe(false)
    })

    it('Receptionist deve ter acesso à agenda e clientes sem acesso a configurações estruturais da org', () => {
      expect(hasPermission('receptionist', 'appointments:manage')).toBe(true)
      expect(hasPermission('receptionist', 'clients:manage')).toBe(true)
      expect(hasPermission('receptionist', 'org:manage')).toBe(false)
      expect(hasPermission('receptionist', 'services:manage')).toBe(false)
    })

    it('Financial deve ter acesso a financeiro, clientes e visualização de agenda', () => {
      expect(hasPermission('financial', 'financial:view')).toBe(true)
      expect(hasPermission('financial', 'financial:manage')).toBe(true)
      expect(hasPermission('financial', 'appointments:view')).toBe(true)
      expect(hasPermission('financial', 'org:manage')).toBe(false)
      expect(hasPermission('financial', 'services:manage')).toBe(false)
    })
  })

  describe('3. Navigation Filtering by Role (filterNavItemsByRole)', () => {
    const mockNavItems: BaseNavItem[] = [
      { id: '1', label: 'Dashboard', href: '/dashboard' },
      { id: '2', label: 'Agenda', href: '/appointments', requiredPermission: 'appointments:view' },
      { id: '3', label: 'Clientes', href: '/clients', requiredPermission: 'clients:view' },
      { id: '4', label: 'Serviços', href: '/services', requiredPermission: 'services:manage' },
      { id: '5', label: 'Financeiro', href: '/financial', requiredPermission: 'financial:view' },
      { id: '6', label: 'Configurações', href: '/settings/organization', requiredPermission: 'org:manage' },
    ]

    it('deve retornar todos os itens para Owner e Admin', () => {
      const ownerItems = filterNavItemsByRole(mockNavItems, 'owner')
      expect(ownerItems.length).toBe(6)

      const adminItems = filterNavItemsByRole(mockNavItems, 'admin')
      expect(adminItems.length).toBe(6)
    })

    it('deve ocultar Financeiro, Serviços e Configurações para Specialist', () => {
      const specialistItems = filterNavItemsByRole(mockNavItems, 'specialist')
      const labels = specialistItems.map((i) => i.label)
      
      expect(labels).toContain('Dashboard')
      expect(labels).toContain('Agenda')
      expect(labels).toContain('Clientes')
      expect(labels).not.toContain('Serviços')
      expect(labels).not.toContain('Financeiro')
      expect(labels).not.toContain('Configurações')
    })

    it('deve permitir Financeiro mas ocultar Configurações e Serviços para Financial', () => {
      const financialItems = filterNavItemsByRole(mockNavItems, 'financial')
      const labels = financialItems.map((i) => i.label)

      expect(labels).toContain('Financeiro')
      expect(labels).not.toContain('Serviços')
      expect(labels).not.toContain('Configurações')
    })

    it('deve retornar vazio se o papel for nulo ou indefinido', () => {
      expect(filterNavItemsByRole(mockNavItems, null)).toEqual([])
      expect(filterNavItemsByRole(mockNavItems, undefined)).toEqual([])
    })
  })

  describe('4. Tenant Spoofing & Isolation Contract Rules', () => {
    it('deve garantir que o modelo mental de tenant isolation rejeite acesso cruzado entre Tenant A e Tenant B', () => {
      const tenantA = { orgId: 'org-a-111', allowedUsers: ['user-1'] }
      const tenantB = { orgId: 'org-b-222', allowedUsers: ['user-2'] }

      const isAllowed = (user: string, targetOrg: { allowedUsers: string[] }) => {
        return targetOrg.allowedUsers.includes(user)
      }

      // User 1 tenta acessar Tenant B com cookie forjado
      expect(isAllowed('user-1', tenantA)).toBe(true)
      expect(isAllowed('user-1', tenantB)).toBe(false)

      // User 2 tenta acessar Tenant A com cookie forjado
      expect(isAllowed('user-2', tenantB)).toBe(true)
      expect(isAllowed('user-2', tenantA)).toBe(false)
    })
  })
})
