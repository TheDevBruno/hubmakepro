export type UserRole = 'owner' | 'admin' | 'specialist' | 'receptionist' | 'financial'

export const ROLES: Record<UserRole, { label: string; description: string; hierarchy: number }> = {
  owner: {
    label: 'Proprietário(a)',
    description: 'Acesso total a todas as configurações, financeiro, equipe e agendamentos.',
    hierarchy: 1,
  },
  admin: {
    label: 'Administrador(a)',
    description: 'Gestão operacional completa, configurações de serviços, equipe e relatórios.',
    hierarchy: 2,
  },
  financial: {
    label: 'Financeiro',
    description: 'Acesso a faturamento, conciliação de caixa, comissões e relatórios.',
    hierarchy: 3,
  },
  receptionist: {
    label: 'Recepcionista',
    description: 'Gestão da agenda diária, cadastro de clientes, confirmações e comanda rápida.',
    hierarchy: 4,
  },
  specialist: {
    label: 'Especialista / Profissional',
    description: 'Visualização da própria agenda, clientes atribuídos e fichas de anamnese.',
    hierarchy: 5,
  },
}

export function isValidRole(role: string): role is UserRole {
  return Object.keys(ROLES).includes(role as UserRole)
}
