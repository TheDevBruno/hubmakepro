import { describe, it, expect } from 'vitest'
import {
  BusinessType,
  VALID_BUSINESS_TYPES,
  isValidBusinessType,
} from '../../src/lib/business-types/types'
import {
  BUSINESS_TYPE_CATALOG,
  getBusinessType,
  listBusinessTypes,
} from '../../src/lib/business-types/catalog'

describe('Phase 4: Business Type Architecture', () => {
  describe('1. BusinessType Taxonomy & Validation', () => {
    it('deve conter exatamente os 6 tipos de negócio fundamentais da beleza', () => {
      const expectedTypes: BusinessType[] = [
        'beauty_salon',
        'lash_designer',
        'makeup_artist',
        'nail_designer',
        'esthetics_clinic',
        'barbershop',
      ]

      expect(VALID_BUSINESS_TYPES.length).toBe(6)
      expectedTypes.forEach((type) => {
        expect(isValidBusinessType(type)).toBe(true)
        expect(VALID_BUSINESS_TYPES).toContain(type)
      })
    })

    it('deve rejeitar tipos de negócio desconhecidos, vazios ou arbitrários', () => {
      expect(isValidBusinessType('petshop')).toBe(false)
      expect(isValidBusinessType('gym')).toBe(false)
      expect(isValidBusinessType('generic_business')).toBe(false)
      expect(isValidBusinessType('')).toBe(false)
      expect(isValidBusinessType(null)).toBe(false)
      expect(isValidBusinessType(undefined)).toBe(false)
      expect(isValidBusinessType(123)).toBe(false)
    })
  })

  describe('2. Business Type Catalog Metadata & Integrity', () => {
    it('cada item do catálogo deve possuir metadados completos e válidos', () => {
      const items = listBusinessTypes()
      expect(items.length).toBe(6)

      items.forEach((item) => {
        expect(item.id).toBeDefined()
        expect(item.name).toBeTypeOf('string')
        expect(item.tagline).toBeTypeOf('string')
        expect(item.description).toBeTypeOf('string')
        expect(item.iconName).toBeTypeOf('string')
        expect(item.badgeVariant).toBeDefined()
        expect(item.clientTerminology).toBeDefined()
        expect(item.clientTerminology.singular).toBeTypeOf('string')
        expect(item.clientTerminology.plural).toBeTypeOf('string')
        expect(Array.isArray(item.defaultCategories)).toBe(true)
        expect(item.defaultCategories.length).toBeGreaterThan(0)
        expect(item.suggestedBufferMinutes).toBeGreaterThanOrEqual(10)
      })
    })

    it('deve validar terminologias específicas por nicho (ex: Paciente para Clínica de Estética)', () => {
      const clinic = getBusinessType('esthetics_clinic')
      expect(clinic.clientTerminology.singular).toBe('Paciente')
      expect(clinic.clientTerminology.plural).toBe('Pacientes')

      const salon = getBusinessType('beauty_salon')
      expect(salon.clientTerminology.singular).toBe('Cliente')

      const makeup = getBusinessType('makeup_artist')
      expect(makeup.clientTerminology.singular).toContain('Noiva')
    })
  })

  describe('3. Fallback & Safe Resolution', () => {
    it('deve retornar beauty_salon como fallback seguro quando o tipo for inválido ou não informado', () => {
      const fallbackFromNull = getBusinessType(null)
      expect(fallbackFromNull.id).toBe('beauty_salon')

      const fallbackFromInvalid = getBusinessType('invalid_niche')
      expect(fallbackFromInvalid.id).toBe('beauty_salon')

      const fallbackFromEmpty = getBusinessType('')
      expect(fallbackFromEmpty.id).toBe('beauty_salon')
    })

    it('deve retornar a definição correta quando o tipo for válido', () => {
      const lash = getBusinessType('lash_designer')
      expect(lash.id).toBe('lash_designer')
      expect(lash.name).toBe('Lash Designer & Cílios')
      expect(lash.defaultCategories).toContain('lash_extension')
    })
  })

  describe('4. Server Action Validation Contract', () => {
    it('deve simular o fluxo de validação estrita de createOrganization sem aceitar dados arbitrários', () => {
      const validateInput = (rawType: string | undefined): BusinessType => {
        return isValidBusinessType(rawType) ? rawType : 'beauty_salon'
      }

      // Válidos
      expect(validateInput('nail_designer')).toBe('nail_designer')
      expect(validateInput('barbershop')).toBe('barbershop')

      // Inválidos sofrem fallback seguro
      expect(validateInput('hack_injection')).toBe('beauty_salon')
      expect(validateInput(undefined)).toBe('beauty_salon')
      expect(validateInput('')).toBe('beauty_salon')
    })
  })
})
