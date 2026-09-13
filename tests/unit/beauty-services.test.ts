import { describe, it, expect } from 'vitest'

describe('Beauty & Esthetics Services and Specialists Logic', () => {
  it('deve converter centavos para formato de moeda brasileira (BRL)', () => {
    const formatPrice = (cents: number) =>
      (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

    expect(formatPrice(15000)).toMatch(/150,00/)
    expect(formatPrice(8550)).toMatch(/85,50/)
    expect(formatPrice(0)).toMatch(/0,00/)
  })

  it('deve calcular comissão percentual corretamente', () => {
    const calculateCommission = (priceCents: number, commissionRate: number) =>
      Math.round((priceCents * commissionRate) / 100)

    // Serviço de R$ 200,00 com 50% de comissão -> R$ 100,00 (10.000 centavos)
    expect(calculateCommission(20000, 50)).toBe(10000)

    // Extensão Lash de R$ 180,00 com 60% de comissão -> R$ 108,00 (10.800 centavos)
    expect(calculateCommission(18000, 60)).toBe(10800)
  })

  it('deve validar nichos permitidos de beleza e estética', () => {
    const validSegments = ['makeup', 'lash', 'nails', 'hair', 'esthetics', 'other']
    expect(validSegments).toContain('makeup')
    expect(validSegments).toContain('lash')
    expect(validSegments).toContain('nails')
    expect(validSegments).toContain('hair')
  })
})
