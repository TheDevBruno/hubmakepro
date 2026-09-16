'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { requireOrgMembership } from '@/lib/auth/authorization'

export type AppointmentActionResult = {
  success: boolean
  message: string
  appointmentId?: string
}

/**
 * Cria um novo agendamento com cálculo automático de horário de término e validação server-side.
 */
export async function createAppointmentRecord(formData: FormData): Promise<void> {
  const clientId = formData.get('clientId')?.toString()
  const specialistId = formData.get('specialistId')?.toString()
  const serviceId = formData.get('serviceId')?.toString()
  const startTimeRaw = formData.get('startTime')?.toString()
  const notes = formData.get('notes')?.toString().trim() || null

  if (!clientId || !specialistId || !serviceId || !startTimeRaw) {
    return
  }

  const supabase = await createClient()

  // 1. Validação estrita server-side (appointments:manage)
  const { orgId } = await requireOrgMembership(supabase, null, 'appointments:manage')

  // 2. Busca dados do serviço para saber duração e preço garantindo tenant isolado
  const { data: service, error: serviceError } = await supabase
    .from('services')
    .select('duration_minutes, price_cents')
    .eq('id', serviceId)
    .eq('organization_id', orgId)
    .single()

  if (serviceError || !service) {
    return
  }

  const startDate = new Date(startTimeRaw)
  const endDate = new Date(startDate.getTime() + service.duration_minutes * 60000)

  // 3. Insere agendamento
  const { error } = await supabase
    .from('appointments')
    .insert({
      organization_id: orgId,
      client_id: clientId,
      specialist_id: specialistId,
      service_id: serviceId,
      start_time: startDate.toISOString(),
      end_time: endDate.toISOString(),
      status: 'confirmed',
      price_cents: service.price_cents,
      notes,
    })

  if (error) {
    console.error('Erro ao agendar:', error.message)
    return
  }

  revalidatePath('/appointments')
}

/**
 * Atualiza os dados completos de um agendamento existente (Reagendamento/Edição).
 */
export async function updateAppointmentRecord(formData: FormData): Promise<AppointmentActionResult> {
  const id = formData.get('id')?.toString()
  const specialistId = formData.get('specialistId')?.toString()
  const serviceId = formData.get('serviceId')?.toString()
  const startTimeRaw = formData.get('startTime')?.toString()
  const status = formData.get('status')?.toString() as any
  const notes = formData.get('notes')?.toString().trim() || null

  if (!id || !specialistId || !serviceId || !startTimeRaw) {
    return { success: false, message: 'Campos obrigatórios incompletos para atualização.' }
  }

  const supabase = await createClient()

  let orgId: string
  try {
    const authContext = await requireOrgMembership(supabase, null, 'appointments:manage')
    orgId = authContext.orgId
  } catch (err: any) {
    return { success: false, message: err?.message || 'Acesso negado.' }
  }

  // 1. Busca duração e preço atualizado do serviço
  const { data: service, error: serviceError } = await supabase
    .from('services')
    .select('duration_minutes, price_cents')
    .eq('id', serviceId)
    .eq('organization_id', orgId)
    .single()

  if (serviceError || !service) {
    return { success: false, message: 'Serviço não encontrado para cálculo de duração.' }
  }

  const startDate = new Date(startTimeRaw)
  const endDate = new Date(startDate.getTime() + service.duration_minutes * 60000)

  const { error } = await supabase
    .from('appointments')
    .update({
      specialist_id: specialistId,
      service_id: serviceId,
      start_time: startDate.toISOString(),
      end_time: endDate.toISOString(),
      price_cents: service.price_cents,
      status: status || 'confirmed',
      notes,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .eq('organization_id', orgId) // Garante isolamento de tenant

  if (error) {
    return { success: false, message: `Erro ao salvar agendamento: ${error.message}` }
  }

  revalidatePath('/appointments')
  revalidatePath('/dashboard')
  return { success: true, message: 'Agendamento atualizado com sucesso!' }
}
