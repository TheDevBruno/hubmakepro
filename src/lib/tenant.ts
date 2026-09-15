import { cookies } from 'next/headers'
import { SupabaseClient } from '@supabase/supabase-js'

/**
 * Obtém o ID da organização ativa no contexto da requisição atual.
 * Se o cookie 'current_org_id' existir e pertencer ao usuário logado, retorna-o.
 * Caso contrário, busca a primeira organização em que o usuário seja membro e define o cookie.
 */
export async function getActiveOrganizationId(supabase: SupabaseClient): Promise<string | null> {
  const cookieStore = await cookies()
  const cookieOrgId = cookieStore.get('current_org_id')?.value

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return cookieOrgId || null
  }

  // 1. Se tem cookie, valida se o usuário realmente faz parte dessa org
  if (cookieOrgId) {
    const { data: membership } = await supabase
      .from('organization_members')
      .select('organization_id')
      .eq('organization_id', cookieOrgId)
      .eq('user_id', user.id)
      .maybeSingle()

    if (membership) {
      return cookieOrgId
    }
  }

  // 2. Se não tem cookie ou cookie é de uma org inválida/antiga, busca a primeira org válida do usuário
  const { data: userMemberships } = await supabase
    .from('organization_members')
    .select('organization_id')
    .eq('user_id', user.id)
    .order('created_at', { ascending: true })
    .limit(1)

  if (userMemberships && userMemberships.length > 0) {
    const fallbackOrgId = userMemberships[0].organization_id
    try {
      cookieStore.set('current_org_id', fallbackOrgId, {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      })
    } catch {
      // Ignora erro de cookie em Server Component read-only
    }
    return fallbackOrgId
  }

  return null
}
