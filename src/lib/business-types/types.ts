/**
 * BusinessType é a taxonomia fundamental dos nichos atendidos pelo Lab Beauty SaaS.
 * Fonte única de verdade tipada para toda a aplicação.
 */
export type BusinessType =
  | 'beauty_salon'
  | 'lash_designer'
  | 'makeup_artist'
  | 'nail_designer'
  | 'esthetics_clinic'
  | 'barbershop'

export interface ClientTerminology {
  singular: string
  plural: string
}

export interface BusinessTypeDefinition {
  id: BusinessType
  name: string
  tagline: string
  description: string
  iconName: string
  badgeVariant: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'success' | 'danger'
  clientTerminology: ClientTerminology
  defaultCategories: string[]
  suggestedBufferMinutes: number
}

export const VALID_BUSINESS_TYPES: readonly BusinessType[] = [
  'beauty_salon',
  'lash_designer',
  'makeup_artist',
  'nail_designer',
  'esthetics_clinic',
  'barbershop',
] as const

export function isValidBusinessType(type: unknown): type is BusinessType {
  if (typeof type !== 'string') return false
  return VALID_BUSINESS_TYPES.includes(type as BusinessType)
}
