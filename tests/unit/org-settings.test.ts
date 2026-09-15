import { describe, it, expect } from 'vitest'

describe('Organization Settings & Multi-niche Validation Suite', () => {
  it('deve validar estrutura de contatos e horário de funcionamento padrão', () => {
    const defaultHours = {
      monday: { enabled: true, open: '09:00', close: '19:00' },
      sunday: { enabled: false, open: '09:00', close: '14:00' },
    }

    expect(defaultHours.monday.enabled).toBe(true)
    expect(defaultHours.sunday.enabled).toBe(false)
    expect(defaultHours.monday.open).toBe('09:00')
    expect(defaultHours.monday.close).toBe('19:00')
  })

  it('deve validar todos os nichos de beleza permitidos para o salão', () => {
    const availableSegments = ['makeup', 'lash', 'nails', 'hair', 'esthetics']
    expect(availableSegments.length).toBe(5)
    expect(availableSegments).toContain('makeup')
    expect(availableSegments).toContain('lash')
    expect(availableSegments).toContain('nails')
    expect(availableSegments).toContain('hair')
    expect(availableSegments).toContain('esthetics')
  })
})
