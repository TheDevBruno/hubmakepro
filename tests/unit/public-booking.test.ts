import { describe, it, expect } from 'vitest'

describe('Public Online Booking Flow Validation', () => {
  it('deve gerar mensagem completa e estruturada para notificação via WhatsApp', () => {
    const formatBookingWaMessage = (
      serviceName: string,
      specialistName: string,
      dateStr: string,
      timeStr: string,
      clientName: string
    ) => {
      return `Olá! Acabei de agendar pelo site:\n\n✨ *Serviço:* ${serviceName}\n👩‍🎨 *Profissional:* ${specialistName}\n📅 *Data:* ${dateStr} às ${timeStr}\n👤 *Cliente:* ${clientName}\n\nPodem confirmar meu horário? Obrigado(a)!`
    }

    const msg = formatBookingWaMessage(
      'Maquiagem Social Noiva',
      'Camila Make',
      '15/09/2026',
      '16:00',
      'Luciana Rocha'
    )

    expect(msg).toContain('Maquiagem Social Noiva')
    expect(msg).toContain('Camila Make')
    expect(msg).toContain('Luciana Rocha')
    expect(msg).toContain('15/09/2026 às 16:00')
  })

  it('deve sanitizar números de telefone para links wa.me', () => {
    const sanitizePhone = (phone: string) => phone.replace(/\D/g, '')
    expect(sanitizePhone('(11) 98888-7777')).toBe('11988887777')
    expect(sanitizePhone('+55 21 99999-0000')).toBe('5521999990000')
  })
})
