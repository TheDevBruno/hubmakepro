'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export type ProfileActionResult = {
  success: boolean
  message: string
}

/**
 * Atualiza os dados do perfil do usuário atual.
 */
export async function updateProfile(formData: FormData): Promise<ProfileActionResult> {
  const fullName = formData.get('fullName')?.toString().trim()

  if (!fullName || fullName.length < 2) {
    return { success: false, message: 'O nome completo deve ter no mínimo 2 caracteres.' }
  }

  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return { success: false, message: 'Sessão expirada. Faça login novamente.' }
  }

  const { error } = await supabase
    .from('profiles')
    .update({
      full_name: fullName,
      updated_at: new Date().toISOString(),
    })
    .eq('id', user.id)

  if (error) {
    return { success: false, message: `Erro ao atualizar perfil: ${error.message}` }
  }

  revalidatePath('/dashboard')
  revalidatePath('/settings/profile')
  return { success: true, message: 'Perfil atualizado com sucesso!' }
}
