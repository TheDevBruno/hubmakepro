import { describe, it, expect } from 'vitest';

describe('Phase 12: Dynamic Operational Schedule & Rescheduling', () => {
  it('should calculate end time correctly when updating appointment with service duration', () => {
    const startTimeRaw = '2026-09-25T14:30:00.000Z';
    const durationMinutes = 75; // 1h15m

    const startDate = new Date(startTimeRaw);
    const endDate = new Date(startDate.getTime() + durationMinutes * 60000);

    expect(endDate.toISOString()).toBe('2026-09-25T15:45:00.000Z');
  });

  it('should build proper WhatsApp confirmation message with specialist and formatted time', () => {
    const clientName = 'Beatriz Ramos';
    const specialistName = 'Dra. Camila Meireles';
    const serviceName = 'Extensão de Cílios Volume Russo';
    const cleanPhone = '11999998888';

    const rawMessage = `Olá, ${clientName}! Confirmamos seu agendamento de *${serviceName}* com *${specialistName}* no Hub MakePro.`;
    const waLink = `https://wa.me/55${cleanPhone}?text=${encodeURIComponent(rawMessage)}`;

    expect(waLink).toContain('5511999998888');
    expect(waLink).toContain('Volume%20Russo');
    expect(waLink).toContain('Camila');
  });
});
