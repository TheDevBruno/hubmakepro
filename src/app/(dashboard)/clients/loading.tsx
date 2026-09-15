import { FormSkeleton, ListSkeleton } from '@/components/ui/skeletons'

export default function ClientsLoading() {
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-4 animate-pulse">
        <div className="h-6 w-44 bg-slate-800 rounded mb-2"></div>
        <div className="h-3 w-80 bg-slate-800/60 rounded"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          <FormSkeleton />
        </div>
        <div className="lg:col-span-2">
          <ListSkeleton count={4} />
        </div>
      </div>
    </div>
  )
}
