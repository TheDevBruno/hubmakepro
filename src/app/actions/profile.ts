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
export async function updateProfile(formData: FormData): Promise<void> {
  const fullName = formData.get('fullName')?.toString().trim()

  if (!fullName || fullName.length < 2) {
    return
  }

  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return
  }

  const { error } = await supabase
    .from('profiles')
    .update({
      full_name: fullName,
      updated_at: new Date().toISOString(),
    })
    .eq('id', user.id)

  if (error) {
    console.error('Erro ao atualizar perfil:', error.message)
    return
  }

  revalidatePath('/dashboard')
  revalidatePath('/settings/profile')
}
