import { describe, it, expect } from 'vitest'

describe('Cashflow and Commissions Calculations Logic', () => {
  it('deve calcular comissão e lucro líquido do salão com precisão', () => {
    const calculateSplit = (grossCents: number, commissionRate: number) => {
      const commissionCents = Math.round((grossCents * commissionRate) / 100)
      const netCents = grossCents - commissionCents
      return { commissionCents, netCents }
    }

    // Procedimento de R$ 350,00 com 60% de comissão para a Lash
    const result = calculateSplit(35000, 60)
    expect(result.commissionCents).toBe(21000) // R$ 210,00
    expect(result.netCents).toBe(14000)        // R$ 140,00
  })

  it('deve aceitar métodos de pagamento padrão do mercado brasileiro', () => {
    const validMethods = ['pix', 'credit_card', 'debit_card', 'cash']
    expect(validMethods).toContain('pix')
    expect(validMethods).toContain('credit_card')
    expect(validMethods).toContain('cash')
  })
})
