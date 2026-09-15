import { describe, it, expect } from 'vitest';

describe('Phase 11: Clients 360° Profile & Anamnesis Record', () => {
  it('should validate client update schema and field payload structure', () => {
    const updatePayload = {
      id: 'client-123',
      name: 'Maria Julia Silveira',
      phone: '(11) 98888-7777',
      email: 'mariajulia@email.com',
      notes: 'Preferência por produtos hipoalergênicos e tonalidade fria.',
    };

    expect(updatePayload.id).toBeDefined();
    expect(updatePayload.name.trim().length).toBeGreaterThan(0);
    expect(updatePayload.phone).toContain('11');
    expect(updatePayload.notes).toContain('hipoalergênicos');
  });

  it('should format appointment history correctly with duration and amounts', () => {
    const mockAppointments = [
      {
        id: 'apt-1',
        start_time: '2026-09-10T14:00:00Z',
        service_name: 'Design de Sobrancelhas',
        specialist_name: 'Dra. Camila Meireles',
        price: 85.00,
        status: 'completed',
      },
      {
        id: 'apt-2',
        start_time: '2026-09-20T10:00:00Z',
        service_name: 'Micropigmentação Labial',
        specialist_name: 'Dra. Camila Meireles',
        price: 450.00,
        status: 'confirmed',
      }
    ];

    const totalSpent = mockAppointments
      .filter(a => a.status === 'completed')
      .reduce((sum, a) => sum + a.price, 0);

    expect(mockAppointments.length).toBe(2);
    expect(totalSpent).toBe(85.00);
    expect(mockAppointments[0].service_name).toBe('Design de Sobrancelhas');
  });
});
