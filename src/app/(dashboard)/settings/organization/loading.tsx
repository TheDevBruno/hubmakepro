import { TableSkeleton } from '@/components/ui/skeletons'

export default function OrganizationSettingsLoading() {
  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 animate-pulse">
          <div>
            <div className="h-6 w-52 bg-slate-800 rounded mb-2"></div>
            <div className="h-3 w-72 bg-slate-800/60 rounded"></div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-[#0f172a] p-6 shadow-md animate-pulse">
          <div className="h-4 w-36 bg-slate-800 rounded mb-4"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="h-10 bg-slate-900 rounded-lg"></div>
            <div className="h-10 bg-slate-900 rounded-lg"></div>
          </div>
        </div>

        <TableSkeleton rows={3} />
      </div>
    </div>
  )
}
