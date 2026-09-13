'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export type AppointmentActionResult = {
  success: boolean
  message: string
  appointmentId?: string
}

/**
 * Cria um novo agendamento com cálculo automático de horário de término.
 */
export async function createAppointmentRecord(formData: FormData): Promise<AppointmentActionResult> {
  const clientId = formData.get('clientId')?.toString()
  const specialistId = formData.get('specialistId')?.toString()
  const serviceId = formData.get('serviceId')?.toString()
  const startTimeRaw = formData.get('startTime')?.toString()
  const notes = formData.get('notes')?.toString().trim() || null

  if (!clientId || !specialistId || !serviceId || !startTimeRaw) {
    return { success: false, message: 'Todos os campos de agendamento são obrigatórios.' }
  }

  const supabase = await createClient()
  const cookieStore = await cookies()
  const currentOrgId = cookieStore.get('current_org_id')?.value

  if (!currentOrgId) {
    return { success: false, message: 'Nenhuma organização ativa selecionada.' }
  }

  // 1. Busca dados do serviço para saber duração e preço
  const { data: service, error: serviceError } = await supabase
    .from('services')
    .select('duration_minutes, price_cents')
    .eq('id', serviceId)
    .single()

  if (serviceError || !service) {
    return { success: false, message: 'Serviço não encontrado.' }
  }

  const startDate = new Date(startTimeRaw)
  const endDate = new Date(startDate.getTime() + service.duration_minutes * 60000)

  // 2. Insere agendamento
  const { data, error } = await supabase
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
    .select('id')
    .single()

  if (error) {
    return { success: false, message: `Erro ao agendar: ${error.message}` }
  }

  revalidatePath('/appointments')
  return { success: true, message: 'Agendamento confirmado com sucesso!', appointmentId: data.id }
}

/**
 * Atualiza o status do agendamento (ex: 'confirmed', 'in_progress', 'completed', 'cancelled').
 */
export async function updateAppointmentStatus(
  appointmentId: string,
  newStatus: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'
): Promise<AppointmentActionResult> {
  const supabase = await createClient()

  const { error } = await supabase
    .from('appointments')
    .update({ status: newStatus, updated_at: new Date().toISOString() })
    .eq('id', appointmentId)

  if (error) {
    return { success: false, message: `Erro ao atualizar status: ${error.message}` }
  }

  revalidatePath('/appointments')
  return { success: true, message: 'Status do agendamento atualizado!' }
}
