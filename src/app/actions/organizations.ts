'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export type OrgActionResult = {
  success: boolean
  message: string
  orgId?: string
}

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

/**
 * Cria uma nova organização e associa o criador como 'owner'.
 */
export async function createOrganization(formData: FormData): Promise<OrgActionResult> {
  const name = formData.get('name')?.toString().trim()
  if (!name || name.length < 2) {
    return { success: false, message: 'O nome da organização deve ter no mínimo 2 caracteres.' }
  }

  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return { success: false, message: 'Sessão expirada. Faça login novamente.' }
  }

  const baseSlug = slugify(name)
  const uniqueSlug = `${baseSlug}-${Math.random().toString(36).substring(2, 7)}`

  // 1. Criar organização
  const { data: org, error: orgError } = await supabase
    .from('organizations')
    .insert({
      name,
      slug: uniqueSlug,
    })
    .select('id')
    .single()

  if (orgError || !org) {
    return { success: false, message: `Erro ao criar organização: ${orgError?.message || 'Tente novamente.'}` }
  }

  // 2. Garante perfil do usuário em profiles
  await supabase
    .from('profiles')
    .upsert({
      id: user.id,
      full_name: user.user_metadata?.full_name || user.email || 'Usuário',
    }, { onConflict: 'id' })

  // 3. Associar criador como owner
  const { error: memberError } = await supabase
    .from('organization_members')
    .insert({
      organization_id: org.id,
      user_id: user.id,
      role: 'owner',
    })

  if (memberError) {
    return { success: false, message: `Erro ao vincular membro: ${memberError.message}` }
  }

  // 3. Define como organização ativa
  const cookieStore = await cookies()
  cookieStore.set('current_org_id', org.id, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  })

  revalidatePath('/', 'layout')
  return { success: true, message: 'Organização criada com sucesso!', orgId: org.id }
}

/**
 * Alterna a organização ativa armazenada no cookie do usuário.
 */
export async function switchOrganization(orgId: string): Promise<OrgActionResult> {
  if (!orgId) {
    return { success: false, message: 'Identificador de organização inválido.' }
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, message: 'Usuário não autenticado.' }
  }

  // Valida se o usuário é de fato membro desta organização
  const { data: membership, error } = await supabase
    .from('organization_members')
    .select('organization_id')
    .eq('organization_id', orgId)
    .eq('user_id', user.id)
    .maybeSingle()

  if (error || !membership) {
    return { success: false, message: 'Você não tem permissão para acessar esta organização.' }
  }

  const cookieStore = await cookies()
  cookieStore.set('current_org_id', orgId, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  })

  revalidatePath('/', 'layout')
  return { success: true, message: 'Organização alternada com sucesso!' }
}

/**
 * Convida/adiciona um novo membro à organização pelo ID do perfil.
 */
export async function addMemberToOrg(
  orgId: string,
  userId: string,
  role: 'admin' | 'member' = 'member'
): Promise<OrgActionResult> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, message: 'Não autorizado.' }
  }

  const { error } = await supabase
    .from('organization_members')
    .insert({
      organization_id: orgId,
      user_id: userId,
      role,
    })

  if (error) {
    return { success: false, message: `Erro ao adicionar membro: ${error.message}` }
  }

  revalidatePath('/settings/organization')
  return { success: true, message: 'Membro adicionado com sucesso!' }
}

/**
 * Atualiza os detalhes operacionais do salão / espaço de beleza.
 */
export async function updateOrganizationDetails(formData: FormData): Promise<void> {
  const orgId = formData.get('orgId')?.toString()
  const name = formData.get('name')?.toString().trim()
  const phone = formData.get('phone')?.toString().trim() || null
  const secondaryPhone = formData.get('secondaryPhone')?.toString().trim() || null
  const email = formData.get('email')?.toString().trim() || null
  const instagram = formData.get('instagram')?.toString().trim() || null
  const address = formData.get('address')?.toString().trim() || null
  const mapsUrl = formData.get('mapsUrl')?.toString().trim() || null
  const cancellationPolicy = formData.get('cancellationPolicy')?.toString().trim() || null
  const segments = formData.getAll('segments').map((s) => s.toString())

  if (!orgId) return

  const supabase = await createClient()

  // 1. Atualiza nome da organização se alterado
  if (name && name.length >= 2) {
    await supabase.from('organizations').update({ name, updated_at: new Date().toISOString() }).eq('id', orgId)
  }

  // 2. Upsert nas configurações do tenant
  await supabase
    .from('organization_settings')
    .upsert({
      organization_id: orgId,
      phone,
      secondary_phone: secondaryPhone,
      email,
      instagram,
      address,
      maps_url: mapsUrl,
      cancellation_policy: cancellationPolicy,
      business_segments: segments.length > 0 ? segments : ['makeup', 'lash', 'nails', 'hair', 'esthetics'],
      updated_at: new Date().toISOString(),
    }, { onConflict: 'organization_id' })

  revalidatePath('/settings/organization')
  revalidatePath('/dashboard')
  revalidatePath('/', 'layout')
}
