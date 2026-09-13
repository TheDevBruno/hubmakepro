'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export type SpecialistActionResult = {
  success: boolean
  message: string
  specialistId?: string
}

/**
 * Cria um novo especialista/profissional.
 */
export async function createSpecialist(formData: FormData): Promise<void> {
  const name = formData.get('name')?.toString().trim()
  const phone = formData.get('phone')?.toString().trim() || null
  const commissionRate = parseInt(formData.get('commissionRate')?.toString() || '50', 10)
  const specialtiesRaw = formData.getAll('specialties').map((s) => s.toString())

  if (!name || name.length < 2) {
    return
  }

  if (isNaN(commissionRate) || commissionRate < 0 || commissionRate > 100) {
    return
  }

  const supabase = await createClient()
  const cookieStore = await cookies()
  const currentOrgId = cookieStore.get('current_org_id')?.value

  if (!currentOrgId) {
    return
  }

  const { error } = await supabase
    .from('specialists')
    .insert({
      organization_id: currentOrgId,
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
