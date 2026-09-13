'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export type PublicBookingResult = {
  success: boolean
  message: string
  appointmentId?: string
  waLink?: string
}

/**
 * Cria um agendamento público a partir da página /book/[slug].
 */
export async function createPublicBooking(formData: FormData): Promise<PublicBookingResult> {
  const orgSlug = formData.get('orgSlug')?.toString()
  const clientName = formData.get('clientName')?.toString().trim()
  const clientPhone = formData.get('clientPhone')?.toString().trim()
  const serviceId = formData.get('serviceId')?.toString()
  const specialistId = formData.get('specialistId')?.toString()
  const startTimeRaw = formData.get('startTime')?.toString()
  const notes = formData.get('notes')?.toString().trim() || null

  if (!orgSlug || !clientName || !clientPhone || !serviceId || !specialistId || !startTimeRaw) {
    return { success: false, message: 'Por favor, preencha todos os campos obrigatórios.' }
  }

  const supabase = await createClient()

  // 1. Localiza a organização pelo slug
  const { data: org, error: orgError } = await supabase
    .from('organizations')
    .select('id, name')
    .eq('slug', orgSlug)
    .single()

  if (orgError || !org) {
    return { success: false, message: 'Espaço / Salão não encontrado.' }
  }

  // 2. Localiza os dados do serviço
  const { data: service, error: serviceError } = await supabase
    .from('services')
    .select('id, name, duration_minutes, price_cents')
    .eq('id', serviceId)
    .single()

  if (serviceError || !service) {
    return { success: false, message: 'Serviço selecionado inválido.' }
  }

  // 3. Localiza os dados do especialista
  const { data: specialist, error: spError } = await supabase
    .from('specialists')
    .select('id, name, phone')
    .eq('id', specialistId)
    .single()

  if (spError || !specialist) {
    return { success: false, message: 'Especialista selecionado inválido.' }
  }

  // 4. Cria ou localiza o cliente
  const cleanPhone = clientPhone.replace(/\D/g, '')
  let clientId: string

  const { data: existingClient } = await supabase
    .from('clients')
    .select('id')
    .eq('organization_id', org.id)
    .eq('phone', clientPhone)
    .maybeSingle()

  if (existingClient) {
    clientId = existingClient.id
  } else {
    const { data: newClient, error: clientError } = await supabase
      .from('clients')
      .insert({
        organization_id: org.id,
        name: clientName,
        phone: clientPhone,
      })
      .select('id')
      .single()

    if (clientError || !newClient) {
      return { success: false, message: `Erro ao registrar cliente: ${clientError?.message}` }
    }
    clientId = newClient.id
  }

  // 5. Calcula horários e insere agendamento
  const startDate = new Date(startTimeRaw)
  const endDate = new Date(startDate.getTime() + service.duration_minutes * 60000)

  const { data: appointment, error: aptError } = await supabase
    .from('appointments')
    .insert({
      organization_id: org.id,
      client_id: clientId,
      specialist_id: specialist.id,
      service_id: service.id,
      start_time: startDate.toISOString(),
      end_time: endDate.toISOString(),
      status: 'confirmed',
      price_cents: service.price_cents,
      notes,
    })
    .select('id')
    .single()

  if (aptError || !appointment) {
    return { success: false, message: `Erro ao salvar agendamento: ${aptError?.message}` }
  }

  // 6. Gera deep link do WhatsApp para o cliente confirmar com o salão
  const orgPhone = specialist.phone?.replace(/\D/g, '') || cleanPhone
  const dateStr = startDate.toLocaleDateString('pt-BR')
  const timeStr = startDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  const message = encodeURIComponent(
    `Olá! Acabei de agendar pelo site:\n\n✨ *Serviço:* ${service.name}\n👩‍🎨 *Profissional:* ${specialist.name}\n📅 *Data:* ${dateStr} às ${timeStr}\n👤 *Cliente:* ${clientName}\n\nPodem confirmar meu horário? Obrigado(a)!`
  )
  const waLink = `https://wa.me/55${orgPhone}?text=${message}`

  revalidatePath('/appointments')
  return {
    success: true,
    message: 'Agendamento realizado com sucesso!',
    appointmentId: appointment.id,
    waLink,
  }
}
