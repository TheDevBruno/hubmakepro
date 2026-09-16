import { UserRole } from './roles'

export type Permission =
  | 'org:manage'
  | 'members:manage'
  | 'services:manage'
  | 'specialists:manage'
  | 'appointments:view'
  | 'appointments:manage'
  | 'clients:view'
  | 'clients:manage'
  | 'financial:view'
  | 'financial:manage'

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  owner: [
    'org:manage',
    'members:manage',
    'services:manage',
    'specialists:manage',
    'appointments:view',
    'appointments:manage',
    'clients:view',
    'clients:manage',
    'financial:view',
    'financial:manage',
  ],
  admin: [
    'org:manage',
    'members:manage',
    'services:manage',
    'specialists:manage',
    'appointments:view',
    'appointments:manage',
    'clients:view',
    'clients:manage',
    'financial:view',
    'financial:manage',
  ],
  specialist: [
    'appointments:view',
    'appointments:manage',
    'clients:view',
    'clients:manage',
  ],
  receptionist: [
    'appointments:view',
    'appointments:manage',
    'clients:view',
    'clients:manage',
  ],
  financial: [
    'appointments:view',
    'clients:view',
    'clients:manage',
    'financial:view',
    'financial:manage',
  ],
}

export function hasPermission(role: UserRole | string | undefined | null, permission: Permission): boolean {
  if (!role) return false
  const validRole = role as UserRole
  const permissions = ROLE_PERMISSIONS[validRole]
  return permissions ? permissions.includes(permission) : false
}

export function hasAnyPermission(role: UserRole | string | undefined | null, permissions: Permission[]): boolean {
  return permissions.some((perm) => hasPermission(role, perm))
}

export function hasAllPermissions(role: UserRole | string | undefined | null, permissions: Permission[]): boolean {
  return permissions.every((perm) => hasPermission(role, perm))
}
