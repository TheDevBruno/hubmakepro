import React from 'react'

/**
 * Skeleton para Cards de Métricas e Resumos
 */
export function CardSkeleton() {
  return (
    <div className="rounded-xl border border-slate-800 bg-[#0f172a] p-5 shadow-sm animate-pulse">
      <div className="flex items-center justify-between mb-3">
        <div className="h-3 w-28 bg-slate-800 rounded"></div>
        <div className="h-8 w-8 bg-slate-800 rounded-lg"></div>
      </div>
      <div className="h-7 w-36 bg-slate-800 rounded mb-2"></div>
      <div className="h-2.5 w-44 bg-slate-800/60 rounded"></div>
    </div>
  )
}

/**
 * Skeleton para Formulários Laterais
 */
export function FormSkeleton() {
  return (
    <div className="rounded-xl border border-slate-800 bg-[#0f172a] p-6 shadow-md h-fit animate-pulse space-y-4">
      <div className="h-4 w-32 bg-slate-800 rounded mb-4"></div>
      <div className="space-y-2">
        <div className="h-3 w-20 bg-slate-800 rounded"></div>
        <div className="h-9 w-full bg-slate-900 border border-slate-800 rounded-lg"></div>
      </div>
      <div className="space-y-2">
        <div className="h-3 w-24 bg-slate-800 rounded"></div>
        <div className="h-9 w-full bg-slate-900 border border-slate-800 rounded-lg"></div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <div className="h-3 w-16 bg-slate-800 rounded"></div>
          <div className="h-9 w-full bg-slate-900 border border-slate-800 rounded-lg"></div>
        </div>
        <div className="space-y-2">
          <div className="h-3 w-16 bg-slate-800 rounded"></div>
          <div className="h-9 w-full bg-slate-900 border border-slate-800 rounded-lg"></div>
        </div>
      </div>
      <div className="h-9 w-full bg-slate-800 rounded-lg pt-2"></div>
    </div>
  )
}

/**
 * Skeleton para Listas e Tabelas (Clientes, Especialistas, Serviços, Agenda)
 */
export function ListSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl border border-slate-800 bg-[#0f172a] p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-pulse"
        >
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2">
              <div className="h-4 w-36 bg-slate-800 rounded"></div>
              <div className="h-4 w-16 bg-slate-800/80 rounded"></div>
            </div>
            <div className="h-3 w-48 bg-slate-800/60 rounded"></div>
            <div className="h-3 w-28 bg-slate-800/40 rounded"></div>
          </div>
          <div className="h-8 w-24 bg-slate-800 rounded-lg self-end sm:self-center"></div>
        </div>
      ))}
    </div>
  )
}

/**
 * Skeleton para Extratos e Tabelas Financeiras
 */
export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-[#0f172a] p-6 shadow-md animate-pulse">
      <div className="h-4 w-40 bg-slate-800 rounded mb-4"></div>
      <div className="space-y-3">
        <div className="h-6 w-full bg-slate-800/50 rounded"></div>
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="h-10 w-full bg-slate-900/60 rounded border border-slate-800/40"></div>
        ))}
      </div>
    </div>
  )
}

/**
 * Skeleton para Dashboard Home
 */
export function DashboardHomeSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Banner */}
      <div className="rounded-2xl border border-slate-800 bg-[#0f172a] p-8 shadow-xl">
        <div className="h-4 w-36 bg-slate-800 rounded mb-3"></div>
        <div className="h-8 w-64 bg-slate-800 rounded mb-2"></div>
        <div className="h-3.5 w-96 bg-slate-800/60 rounded"></div>
      </div>

      {/* Grid de Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>

      {/* Grid Inferior */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ListSkeleton count={3} />
        </div>
        <div>
          <div className="rounded-xl border border-slate-800 bg-[#0f172a] p-6 space-y-3">
            <div className="h-4 w-28 bg-slate-800 rounded mb-4"></div>
            <div className="h-12 w-full bg-slate-900 rounded-lg"></div>
            <div className="h-12 w-full bg-slate-900 rounded-lg"></div>
            <div className="h-12 w-full bg-slate-900 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
