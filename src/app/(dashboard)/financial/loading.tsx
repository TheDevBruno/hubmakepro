import { CardSkeleton, TableSkeleton } from '@/components/ui/skeletons'

export default function FinancialLoading() {
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-4 animate-pulse">
        <div className="h-6 w-56 bg-slate-800 rounded mb-2"></div>
        <div className="h-3 w-80 bg-slate-800/60 rounded"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>

      <TableSkeleton rows={5} />
    </div>
  )
}
