import { SupabaseClient, User } from '@supabase/supabase-js'
import { getActiveOrganizationId } from '@/lib/tenant'
import { UserRole, Permission, hasPermission } from '@/lib/rbac'

export interface OrgAuthContext {
  user: User
  orgId: string
  role: UserRole
  permissions: Permission[]
}

export class AuthorizationError extends Error {
  public statusCode: number
  constructor(message: string, statusCode: number = 403) {
    super(message)
    this.name = 'AuthorizationError'
    this.statusCode = statusCode
  }
}

/**
 * Validação mandatória server-side de autenticação, pertinência à organização e permissões RBAC.
 * 
 * Regras:
 * 1. Usuário deve estar autenticado no Supabase Auth.
 * 2. Se `targetOrgId` for fornecido, valida se o usuário pertence a ela. Se não fornecido, resolve a organização ativa.
 * 3. Valida a associação em `organization_members`.
 * 4. Se `requiredPermission` for exigida, valida contra a matriz RBAC.
 */
export async function requireOrgMembership(
  supabase: SupabaseClient,
  targetOrgId?: string | null,
  requiredPermission?: Permission
): Promise<OrgAuthContext> {
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    throw new AuthorizationError('Sessão expirada ou usuário não autenticado.', 401)
  }

  // 1. Resolve o ID da organização alvo (ou organização ativa legítima)
  let resolvedOrgId = targetOrgId
  if (!resolvedOrgId) {
    resolvedOrgId = await getActiveOrganizationId(supabase)
  }

  if (!resolvedOrgId) {
    throw new AuthorizationError('Nenhuma organização ativa encontrada para este usuário.', 404)
  }

  // 2. Valida se o usuário autenticado é de fato membro desta organização no banco de dados
  const { data: membership, error: memberError } = await supabase
    .from('organization_members')
    .select('role')
    .eq('organization_id', resolvedOrgId)
    .eq('user_id', user.id)
    .maybeSingle()

  if (memberError || !membership) {
    throw new AuthorizationError('Acesso negado: você não pertence a esta organização.', 403)
  }

  const role = (membership.role as UserRole) || 'specialist'

  // 3. Valida permissão requerida (se aplicável)
  if (requiredPermission) {
    const isAllowed = hasPermission(role, requiredPermission)
    if (!isAllowed) {
      throw new AuthorizationError(
        `Permissão insuficiente: seu papel (${role}) não possui a permissão '${requiredPermission}'.`,
        403
      )
    }
  }

  return {
    user,
    orgId: resolvedOrgId,
    role,
    permissions: [],
  }
}
