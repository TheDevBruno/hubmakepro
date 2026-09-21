import { BusinessType, BusinessTypeDefinition, isValidBusinessType } from './types'

export const BUSINESS_TYPE_CATALOG: Record<BusinessType, BusinessTypeDefinition> = {
  beauty_salon: {
    id: 'beauty_salon',
    name: 'Salão de Beleza Multidisciplinar',
    tagline: 'Gestão completa para salões com múltiplos serviços e profissionais',
    description: 'Ideal para espaços que combinam cabelo, maquiagem, manicure, estética e cuidados gerais em um só ambiente.',
    iconName: 'Building2',
    badgeVariant: 'primary',
    clientTerminology: {
      singular: 'Cliente',
      plural: 'Clientes',
    },
    defaultCategories: ['hair', 'makeup', 'nails', 'esthetics', 'other'],
    suggestedBufferMinutes: 15,
  },
  lash_designer: {
    id: 'lash_designer',
    name: 'Lash Designer & Cílios',
    tagline: 'Especializado em extensão de cílios, volume russo e lash lifting',
    description: 'Estruturado para designers de cílios que precisam de fichas de anamnese detalhadas e controle de manutenção.',
    iconName: 'Sparkles',
    badgeVariant: 'accent',
    clientTerminology: {
      singular: 'Cliente',
      plural: 'Clientes',
    },
    defaultCategories: ['lash_extension', 'lash_lifting', 'brow_lamination'],
    suggestedBufferMinutes: 15,
  },
  makeup_artist: {
    id: 'makeup_artist',
    name: 'Maquiadora Profissional',
    tagline: 'Focado em produções sociais, noivas, formandas e eventos',
    description: 'Gestão de contratos de noivas, prévia de maquiagem, cronograma de atendimento e ficha de tom de pele.',
    iconName: 'Palette',
    badgeVariant: 'secondary',
    clientTerminology: {
      singular: 'Cliente / Noiva',
      plural: 'Clientes & Noivas',
    },
    defaultCategories: ['social_makeup', 'bridal', 'express_makeup', 'hair_styling'],
    suggestedBufferMinutes: 20,
  },
  nail_designer: {
    id: 'nail_designer',
    name: 'Nail Designer & Manicure',
    tagline: 'Especializado em alongamento de fibra, gel, blindagem e manicure russa',
    description: 'Controle de tempo de mesa, lembretes automáticos de manutenção e histórico de formatos e esmaltações.',
    iconName: 'Gem',
    badgeVariant: 'success',
    clientTerminology: {
      singular: 'Cliente',
      plural: 'Clientes',
    },
    defaultCategories: ['fiber_nails', 'gel_nails', 'manicure', 'nail_art'],
    suggestedBufferMinutes: 15,
  },
  esthetics_clinic: {
    id: 'esthetics_clinic',
    name: 'Clínica de Estética & Sobrancelhas',
    tagline: 'Focado em tratamentos faciais, corporais, peeling e micropigmentação',
    description: 'Atendimento clínico com prontuário de anamnese profunda, fotos de evolução e acompanhamento de sessões.',
    iconName: 'HeartPulse',
    badgeVariant: 'primary',
    clientTerminology: {
      singular: 'Paciente',
      plural: 'Pacientes',
    },
    defaultCategories: ['facial_treatment', 'body_treatment', 'micropigmentation', 'cleaning'],
    suggestedBufferMinutes: 30,
  },
  barbershop: {
    id: 'barbershop',
    name: 'Barbearia & Grooming',
    tagline: 'Cortes clássicos, barba na toalha quente e cuidados masculinos',
    description: 'Atendimento dinâmico com comanda rápida, combos de corte + barba e escala ágil de barbeiros.',
    iconName: 'Scissors',
    badgeVariant: 'outline',
    clientTerminology: {
      singular: 'Cliente',
      plural: 'Clientes',
    },
    defaultCategories: ['haircut', 'beard', 'combo', 'treatments'],
    suggestedBufferMinutes: 10,
  },
}

/**
 * Retorna a definição completa de um BusinessType a partir de uma string ou enum.
 * Caso o tipo seja inválido ou não informado, retorna o fallback seguro ('beauty_salon').
 */
export function getBusinessType(type: unknown): BusinessTypeDefinition {
  if (isValidBusinessType(type)) {
    return BUSINESS_TYPE_CATALOG[type]
  }
  return BUSINESS_TYPE_CATALOG.beauty_salon
}

/**
 * Retorna a lista de todos os tipos de negócio disponíveis no catálogo.
 */
export function listBusinessTypes(): BusinessTypeDefinition[] {
  return Object.values(BUSINESS_TYPE_CATALOG)
}
