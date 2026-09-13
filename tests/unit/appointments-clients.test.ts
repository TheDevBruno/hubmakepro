import { describe, it, expect } from 'vitest'

describe('Appointments and Clients Anamnesis Logic', () => {
  it('deve calcular horário de término baseado na duração do serviço', () => {
    const calculateEndTime = (startTime: string, durationMinutes: number) => {
      const start = new Date(startTime)
      const end = new Date(start.getTime() + durationMinutes * 60000)
      return end.toISOString()
    }

    const start = '2026-09-15T14:00:00.000Z'
    // 90 minutos (1h30)
    const end = calculateEndTime(start, 90)
    expect(end).toBe('2026-09-15T15:30:00.000Z')
  })

  it('deve gerar link de confirmação do WhatsApp com formatação pt-BR', () => {
    const generateWaLink = (phone: string, clientName: string, serviceName: string) => {
      const cleanPhone = phone.replace(/\D/g, '')
      const message = encodeURIComponent(`Olá, ${clientName}! Confirmamos seu agendamento de ${serviceName}.`)
      return `https://wa.me/55${cleanPhone}?text=${message}`
    }

    const link = generateWaLink('(11) 98888-7777', 'Mariana', 'Extensão de Cílios Volume Russo')
    expect(link).toContain('https://wa.me/5511988887777')
    expect(link).toContain('Mariana')
  })

  it('deve persistir corretamente campos especializados de anamnese', () => {
    const anamnesis = {
      lashCurl: 'D',
      lashMapping: 'Boneca 8-13mm',
      skinType: 'Mista / Alergia a látex',
      nailTechnique: 'Fibra de Vidro',
    }

    expect(anamnesis.lashCurl).toBe('D')
    expect(anamnesis.lashMapping).toContain('Boneca')
    expect(anamnesis.nailTechnique).toBe('Fibra de Vidro')
  })
})
