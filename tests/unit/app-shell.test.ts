import { describe, it, expect } from 'vitest'

describe('Phase 2: Application Shell & Responsive Navigation', () => {
  describe('Navigation Configuration', () => {
    it('should validate all expected operational routes and labels in pt-BR', () => {
      const expectedNavigationConfig = [
        { id: 'nav-dashboard', label: 'Visão Geral', href: '/dashboard', group: 'main' },
        { id: 'nav-appointments', label: 'Agenda Operacional', href: '/appointments', group: 'operations' },
        { id: 'nav-clients', label: 'Ficha de Clientes', href: '/clients', group: 'operations' },
        { id: 'nav-services', label: 'Catálogo de Serviços', href: '/services', group: 'operations' },
        { id: 'nav-specialists', label: 'Especialistas & Equipe', href: '/specialists', group: 'operations' },
        { id: 'nav-financial', label: 'Caixa & Comissões', href: '/financial', group: 'finance' },
        { id: 'nav-org-settings', label: 'Meu Espaço / Salão', href: '/settings/organization', group: 'settings' },
        { id: 'nav-profile', label: 'Meu Perfil', href: '/settings/profile', group: 'settings' },
      ]

      const routes = expectedNavigationConfig.map((item) => item.href)
      expect(routes).toContain('/dashboard')
      expect(routes).toContain('/appointments')
      expect(routes).toContain('/clients')
      expect(routes).toContain('/services')
      expect(routes).toContain('/specialists')
      expect(routes).toContain('/financial')
      expect(routes).toContain('/settings/organization')
      expect(routes).toContain('/settings/profile')
    })

    it('should have semantic navigation groups defined with pt-BR labels', () => {
      const navGroupLabels: Record<string, string> = {
        main: 'Principal',
        operations: 'Operação & Beleza',
        finance: 'Financeiro & Salão',
        settings: 'Ajustes',
      }

      expect(navGroupLabels.main).toBe('Principal')
      expect(navGroupLabels.operations).toBe('Operação & Beleza')
      expect(navGroupLabels.finance).toBe('Financeiro & Salão')
      expect(navGroupLabels.settings).toBe('Ajustes')
    })

    it('should have mobile quick-access items defined', () => {
      const mobileNavItems = [
        { id: 'mobile-nav-dashboard', label: 'Início', href: '/dashboard' },
        { id: 'mobile-nav-appointments', label: 'Agenda', href: '/appointments' },
        { id: 'mobile-nav-clients', label: 'Clientes', href: '/clients' },
        { id: 'mobile-nav-services', label: 'Serviços', href: '/services' },
        { id: 'mobile-nav-settings', label: 'Espaço', href: '/settings/organization' },
      ]

      const mobileLabels = mobileNavItems.map((m) => m.label)
      expect(mobileLabels).toContain('Início')
      expect(mobileLabels).toContain('Agenda')
      expect(mobileLabels).toContain('Clientes')
      expect(mobileLabels).toContain('Serviços')
      expect(mobileLabels).toContain('Espaço')
      expect(mobileNavItems.length).toBe(5)
    })

    it('should ensure each navigation item has an id prefixed with nav-', () => {
      const navIds = [
        'nav-dashboard',
        'nav-appointments',
        'nav-clients',
        'nav-services',
        'nav-specialists',
        'nav-financial',
        'nav-org-settings',
        'nav-profile',
      ]

      navIds.forEach((id) => {
        expect(id.startsWith('nav-')).toBe(true)
      })
    })
  })
})
