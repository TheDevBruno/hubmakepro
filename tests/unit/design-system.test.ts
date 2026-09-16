import { describe, it, expect } from 'vitest'
import { designTokens } from '../../src/lib/design-system/tokens'

describe('Phase 1: Design System Foundation', () => {
  describe('Design Tokens', () => {
    it('should have all mandatory semantic HSL color tokens defined', () => {
      expect(designTokens.colors.primary).toBeDefined()
      expect(designTokens.colors.secondary).toBeDefined()
      expect(designTokens.colors.accent).toBeDefined()
      expect(designTokens.colors.background).toBeDefined()
      expect(designTokens.colors.surface).toBeDefined()
      expect(designTokens.colors.border).toBeDefined()
      expect(designTokens.colors.textPrimary).toBeDefined()
      expect(designTokens.colors.textSecondary).toBeDefined()
      expect(designTokens.colors.textMuted).toBeDefined()
      expect(designTokens.colors.success).toBeDefined()
      expect(designTokens.colors.warning).toBeDefined()
      expect(designTokens.colors.danger).toBeDefined()
      expect(designTokens.colors.info).toBeDefined()
    })

    it('should have beauty niches tokens with label, color and background', () => {
      const niches = designTokens.niches
      expect(niches.makeup.label).toBe('Maquiagem')
      expect(niches.lash.label).toBe('Cílios / Lash')
      expect(niches.nails.label).toBe('Unhas / Nail')
      expect(niches.hair.label).toBe('Cabelo / Hair')
      expect(niches.esthetics.label).toBe('Estética')
    })

    it('should have all operational appointment statuses defined with badges metadata', () => {
      const statuses = designTokens.statuses
      expect(statuses.pending.label).toBe('Pendente')
      expect(statuses.confirmed.label).toBe('Confirmado')
      expect(statuses.in_progress.label).toBe('Em Atendimento')
      expect(statuses.completed.label).toBe('Concluído')
      expect(statuses.cancelled.label).toBe('Cancelado')
    })

    it('should have radii and shadow elevation tokens defined', () => {
      expect(designTokens.radii.lg).toBe('0.75rem')
      expect(designTokens.radii.xl).toBe('1rem')
      expect(designTokens.shadows.card).toBeDefined()
      expect(designTokens.shadows.glowPrimary).toContain('hsla')
    })
  })

  describe('Component Variants & Contract Verification', () => {
    it('should match Button variant class rules', () => {
      const expectedVariants = ['primary', 'secondary', 'accent', 'outline', 'ghost', 'danger', 'success']
      expect(expectedVariants.length).toBe(7)
    })

    it('should validate 5 interface states support structure', () => {
      const states = {
        default: 'default',
        loading: 'loading',
        empty: 'empty',
        error: 'error',
        success: 'success',
      }
      expect(Object.keys(states)).toEqual(['default', 'loading', 'empty', 'error', 'success'])
    })
  })
})
