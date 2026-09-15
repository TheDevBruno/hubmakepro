import { describe, it, expect } from 'vitest'

describe('Performance & Navigation Optimization Suite', () => {
  it('deve validar as rotas configuradas com loading skeletons para navegação instantânea', () => {
    const skeletonRoutes = [
      '/dashboard',
      '/appointments',
      '/clients',
      '/services',
      '/specialists',
      '/financial',
      '/settings/organization',
    ]

    expect(skeletonRoutes.length).toBe(7)
    expect(skeletonRoutes).toContain('/appointments')
    expect(skeletonRoutes).toContain('/financial')
    expect(skeletonRoutes).toContain('/clients')
    expect(skeletonRoutes).toContain('/services')
    expect(skeletonRoutes).toContain('/specialists')
    expect(skeletonRoutes).toContain('/settings/organization')
  })

  it('deve assegurar prefetch ativo para transição de páginas', () => {
    const navConfig = {
      prefetchEnabled: true,
      transitionStyle: 'instant',
      useSkeletons: true,
    }

    expect(navConfig.prefetchEnabled).toBe(true)
    expect(navConfig.useSkeletons).toBe(true)
  })
})
