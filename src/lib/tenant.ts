import { cookies } from 'next/headers'
import { SupabaseClient, User } from '@supabase/supabase-js'
import { UserRole } from '@/lib/rbac'

export interface ActiveOrganizationContext {
  orgId: string
  orgName: string
  orgSlug: string
  role: UserRole
  user: User
}

/**
 * Obtém o ID da organização ativa no contexto da requisição atual com proteção contra spoofing de cookie.
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

  // 1. Se tem cookie, valida no banco se o usuário realmente faz parte dessa org (Prevenção de Spoofing)
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

  // 2. Se não tem cookie ou cookie é de uma org inválida/forjada, busca a primeira org válida do usuário
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

/**
 * Retorna o contexto completo da organização ativa (ID, Dados da Org, Papel do Usuário e Sessão).
 */
export async function getActiveOrganizationContext(supabase: SupabaseClient): Promise<ActiveOrganizationContext | null> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const orgId = await getActiveOrganizationId(supabase)
  if (!orgId) return null

  const { data: membership } = await supabase
    .from('organization_members')
    .select('role, organizations(id, name, slug)')
    .eq('organization_id', orgId)
    .eq('user_id', user.id)
    .single()

  if (!membership || !membership.organizations) return null

  const org = Array.isArray(membership.organizations) ? membership.organizations[0] : membership.organizations

  return {
    orgId: org.id,
    orgName: org.name,
    orgSlug: org.slug,
    role: (membership.role as UserRole) || 'specialist',
    user,
  }
}
