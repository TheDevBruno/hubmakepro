import { describe, it, expect } from 'vitest'

describe('Specialists Management & Editing Suite', () => {
  it('deve validar limites de comissão percentual entre 0 e 100', () => {
    const validateCommission = (rate: number) => rate >= 0 && rate <= 100
    expect(validateCommission(50)).toBe(true)
    expect(validateCommission(0)).toBe(true)
    expect(validateCommission(100)).toBe(true)
    expect(validateCommission(-10)).toBe(false)
    expect(validateCommission(105)).toBe(false)
  })

  it('deve formatar especialidades em caixa alta para badges visuais', () => {
    const specs = ['makeup', 'lash', 'nails']
    const formatted = specs.map((s) => s.toUpperCase())

    expect(formatted).toEqual(['MAKEUP', 'LASH', 'NAILS'])
  })
})
