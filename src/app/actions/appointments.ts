'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { getActiveOrganizationId } from '@/lib/tenant'

export type AppointmentActionResult = {
  success: boolean
  message: string
  appointmentId?: string
}

/**
 * Cria um novo agendamento com cálculo automático de horário de término.
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
  const currentOrgId = await getActiveOrganizationId(supabase)

  if (!currentOrgId) {
    console.error('Nenhuma organização ativa identificada ao cadastrar agendamento.')
    return
  }

  // 1. Busca dados do serviço para saber duração e preço
  const { data: service, error: serviceError } = await supabase
    .from('services')
    .select('duration_minutes, price_cents')
    .eq('id', serviceId)
    .single()

  if (serviceError || !service) {
    return
  }

  const startDate = new Date(startTimeRaw)
  const endDate = new Date(startDate.getTime() + service.duration_minutes * 60000)

  // 2. Insere agendamento
  const { error } = await supabase
    .from('appointments')
    .insert({
      organization_id: currentOrgId,
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

  // 1. Busca duração e preço atualizado do serviço caso tenha sido alterado
  const { data: service, error: serviceError } = await supabase
    .from('services')
    .select('duration_minutes, price_cents')
    .eq('id', serviceId)
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

  if (error) {
    return { success: false, message: `Erro ao salvar agendamento: ${error.message}` }
  }

  revalidatePath('/appointments')
  revalidatePath('/dashboard')
  return { success: true, message: 'Agendamento atualizado com sucesso!' }
}

