'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { requireOrgMembership } from '@/lib/auth/authorization'

export type SpecialistActionResult = {
  success: boolean
  message: string
  specialistId?: string
}

/**
 * Cria um novo especialista/profissional com validação server-side (specialists:manage).
 */
export async function createSpecialist(formData: FormData): Promise<void> {
  const name = formData.get('name')?.toString().trim()
  const phone = formData.get('phone')?.toString().trim() || null
  const commissionRate = parseInt(formData.get('commissionRate')?.toString() || '50', 10)
  const specialtiesRaw = formData.getAll('specialties').map((s) => s.toString())

  if (!name || name.length < 2) return
  if (isNaN(commissionRate) || commissionRate < 0 || commissionRate > 100) return

  const supabase = await createClient()

  // 1. Validação estrita server-side
  const { orgId } = await requireOrgMembership(supabase, null, 'specialists:manage')

  const { error } = await supabase
    .from('specialists')
    .insert({
      organization_id: orgId,
      name,
      phone,
      commission_rate: commissionRate,
      specialties: specialtiesRaw,
      is_active: true,
    })

  if (error) {
    console.error('Erro ao cadastrar profissional:', error.message)
    return
  }

  revalidatePath('/specialists')
}

/**
 * Atualiza os dados de um especialista existente com validação server-side.
 */
export async function updateSpecialist(formData: FormData): Promise<void> {
  const specialistId = formData.get('specialistId')?.toString()
  const name = formData.get('name')?.toString().trim()
  const phone = formData.get('phone')?.toString().trim() || null
  const commissionRate = parseInt(formData.get('commissionRate')?.toString() || '50', 10)
  const specialtiesRaw = formData.getAll('specialties').map((s) => s.toString())
  const isActive = formData.get('isActive')?.toString() === 'true'

  if (!specialistId || !name || name.length < 2) return
  if (isNaN(commissionRate) || commissionRate < 0 || commissionRate > 100) return

  const supabase = await createClient()

  // 1. Validação estrita server-side
  const { orgId } = await requireOrgMembership(supabase, null, 'specialists:manage')

  await supabase
    .from('specialists')
    .update({
      name,
      phone,
      commission_rate: commissionRate,
      specialties: specialtiesRaw,
      is_active: isActive,
      updated_at: new Date().toISOString(),
    })
    .eq('id', specialistId)
    .eq('organization_id', orgId) // Garante isolamento de tenant

  revalidatePath('/specialists')
  revalidatePath('/appointments')
}
