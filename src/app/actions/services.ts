'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { requireOrgMembership } from '@/lib/auth/authorization'

export type ServiceActionResult = {
  success: boolean
  message: string
  serviceId?: string
}

export type BeautyCategory = 'makeup' | 'lash' | 'nails' | 'hair' | 'esthetics' | 'other'

/**
 * Cria um novo serviço associado à organização ativa com autorização server-side (services:manage).
 */
export async function createService(formData: FormData): Promise<void> {
  const name = formData.get('name')?.toString().trim()
  const category = (formData.get('category')?.toString() || 'makeup') as BeautyCategory
  const durationMinutes = parseInt(formData.get('durationMinutes')?.toString() || '60', 10)
  const priceInput = formData.get('price')?.toString().replace(',', '.') || '0'
  const priceCents = Math.round(parseFloat(priceInput) * 100)
  const description = formData.get('description')?.toString().trim() || null

  if (!name || name.length < 2) return
  if (isNaN(durationMinutes) || durationMinutes <= 0) return
  if (isNaN(priceCents) || priceCents < 0) return

  const supabase = await createClient()

  // 1. Validação estrita server-side de organização ativa e permissão RBAC
  const { orgId } = await requireOrgMembership(supabase, null, 'services:manage')

  const { error } = await supabase
    .from('services')
    .insert({
      organization_id: orgId,
      name,
      category,
      duration_minutes: durationMinutes,
      price_cents: priceCents,
      description,
      is_active: true,
    })

  if (error) {
    console.error('Erro ao cadastrar serviço:', error.message)
    return
  }

  revalidatePath('/services')
}

/**
 * Altera o status (ativo/inativo) do serviço com autorização server-side.
 */
export async function toggleServiceStatus(serviceId: string, currentStatus: boolean): Promise<ServiceActionResult> {
  const supabase = await createClient()

  // 1. Validação estrita server-side
  const { orgId } = await requireOrgMembership(supabase, null, 'services:manage')

  const { error } = await supabase
    .from('services')
    .update({ is_active: !currentStatus, updated_at: new Date().toISOString() })
    .eq('id', serviceId)
    .eq('organization_id', orgId) // Garante isolamento de tenant

  if (error) {
    return { success: false, message: `Erro ao atualizar status: ${error.message}` }
  }

  revalidatePath('/services')
  return { success: true, message: 'Status do serviço atualizado!' }
}
