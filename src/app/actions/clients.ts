'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { getActiveOrganizationId } from '@/lib/tenant'

export type ClientActionResult = {
  success: boolean
  message: string
  clientId?: string
}

/**
 * Cria um novo cliente associado à organização ativa.
 */
export async function createClientRecord(formData: FormData): Promise<void> {
  const name = formData.get('name')?.toString().trim()
  const phone = formData.get('phone')?.toString().trim()
  const email = formData.get('email')?.toString().trim() || null
  const birthDate = formData.get('birthDate')?.toString() || null
  const notes = formData.get('notes')?.toString().trim() || null

  // Anamnese
  const lashCurl = formData.get('lashCurl')?.toString() || null
  const lashMapping = formData.get('lashMapping')?.toString() || null
  const skinType = formData.get('skinType')?.toString() || null
  const allergies = formData.get('allergies')?.toString() || null
  const nailTechnique = formData.get('nailTechnique')?.toString() || null

  const anamnesisData = {
    ...(lashCurl && { lashCurl }),
    ...(lashMapping && { lashMapping }),
    ...(skinType && { skinType }),
    ...(allergies && { allergies }),
    ...(nailTechnique && { nailTechnique }),
  }

  if (!name || name.length < 2) {
    return
  }

  if (!phone || phone.length < 8) {
    return
  }

  const supabase = await createClient()
  const currentOrgId = await getActiveOrganizationId(supabase)

  if (!currentOrgId) {
    console.error('Nenhuma organização ativa identificada ao cadastrar cliente.')
    return
  }

  const { error } = await supabase
    .from('clients')
    .insert({
      organization_id: currentOrgId,
      name,
      phone,
      email,
      birth_date: birthDate,
      notes,
      anamnesis_data: anamnesisData,
    })

  if (error) {
    console.error('Erro ao cadastrar cliente:', error.message)
    return
  }

  revalidatePath('/clients')
  revalidatePath('/appointments')
}

/**
 * Atualiza os dados cadastrais e a ficha de anamnese do cliente.
 */
export async function updateClientRecord(formData: FormData): Promise<void> {
  const clientId = formData.get('clientId')?.toString()
  const name = formData.get('name')?.toString().trim()
  const phone = formData.get('phone')?.toString().trim()
  const email = formData.get('email')?.toString().trim() || null
  const birthDate = formData.get('birthDate')?.toString() || null
  const notes = formData.get('notes')?.toString().trim() || null

  // Anamnese
  const lashCurl = formData.get('lashCurl')?.toString() || null
  const lashMapping = formData.get('lashMapping')?.toString() || null
  const skinType = formData.get('skinType')?.toString() || null
  const allergies = formData.get('allergies')?.toString() || null
  const nailTechnique = formData.get('nailTechnique')?.toString() || null

  const anamnesisData = {
    ...(lashCurl && { lashCurl }),
    ...(lashMapping && { lashMapping }),
    ...(skinType && { skinType }),
    ...(allergies && { allergies }),
    ...(nailTechnique && { nailTechnique }),
  }

  if (!clientId || !name || name.length < 2) return
  if (!phone || phone.length < 8) return

  const supabase = await createClient()

  await supabase
    .from('clients')
    .update({
      name,
      phone,
      email,
      birth_date: birthDate,
      notes,
      anamnesis_data: anamnesisData,
      updated_at: new Date().toISOString(),
    })
    .eq('id', clientId)

  revalidatePath('/clients')
  revalidatePath('/appointments')
}
