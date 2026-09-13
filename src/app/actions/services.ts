'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export type ServiceActionResult = {
  success: boolean
  message: string
  serviceId?: string
}

export type BeautyCategory = 'makeup' | 'lash' | 'nails' | 'hair' | 'esthetics' | 'other'

/**
 * Cria um novo serviço associado à organização ativa.
 */
export async function createService(formData: FormData): Promise<ServiceActionResult> {
  const name = formData.get('name')?.toString().trim()
  const category = (formData.get('category')?.toString() || 'makeup') as BeautyCategory
  const durationMinutes = parseInt(formData.get('durationMinutes')?.toString() || '60', 10)
  const priceInput = formData.get('price')?.toString().replace(',', '.') || '0'
  const priceCents = Math.round(parseFloat(priceInput) * 100)
  const description = formData.get('description')?.toString().trim() || null

  if (!name || name.length < 2) {
    return { success: false, message: 'O nome do serviço deve ter no mínimo 2 caracteres.' }
  }

  if (isNaN(durationMinutes) || durationMinutes <= 0) {
    return { success: false, message: 'A duração deve ser superior a 0 minutos.' }
  }

  if (isNaN(priceCents) || priceCents < 0) {
    return { success: false, message: 'Preço inválido.' }
  }

  const supabase = await createClient()
  const cookieStore = await cookies()
  const currentOrgId = cookieStore.get('current_org_id')?.value

  if (!currentOrgId) {
    return { success: false, message: 'Nenhuma organização ativa selecionada.' }
  }

  const { data, error } = await supabase
    .from('services')
    .insert({
      organization_id: currentOrgId,
      name,
      category,
      duration_minutes: durationMinutes,
      price_cents: priceCents,
      description,
      is_active: true,
    })
    .select('id')
    .single()

  if (error) {
    return { success: false, message: `Erro ao cadastrar serviço: ${error.message}` }
  }

  revalidatePath('/services')
  return { success: true, message: 'Serviço cadastrado com sucesso!', serviceId: data.id }
}

/**
 * Altera o status (ativo/inativo) do serviço.
 */
export async function toggleServiceStatus(serviceId: string, currentStatus: boolean): Promise<ServiceActionResult> {
  const supabase = await createClient()

  const { error } = await supabase
    .from('services')
    .update({ is_active: !currentStatus, updated_at: new Date().toISOString() })
    .eq('id', serviceId)

  if (error) {
    return { success: false, message: `Erro ao atualizar status: ${error.message}` }
  }

  revalidatePath('/services')
  return { success: true, message: 'Status do serviço atualizado!' }
}
