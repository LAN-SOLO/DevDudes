import { Skeleton } from '@/components/ui/skeleton'

export default function ActivityLoading() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-4 w-64" />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Skeleton className="h-10 flex-1 max-w-sm" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="rounded-lg border bg-card p-6">
        <div className="space-y-6">
          {/* Date group */}
          <div className="space-y-4">
            <Skeleton className="h-5 w-24" />
            <div className="space-y-4 ml-4 border-l-2 border-muted pl-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="relative flex items-start gap-4">
                  <div className="absolute -left-[30px] p-1 rounded-full bg-background border">
                    <Skeleton className="h-4 w-4 rounded-full" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-48" />
                      <Skeleton className="h-5 w-16 rounded-full" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Another date group */}
          <div className="space-y-4">
            <Skeleton className="h-5 w-28" />
            <div className="space-y-4 ml-4 border-l-2 border-muted pl-6">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="relative flex items-start gap-4">
                  <div className="absolute -left-[30px] p-1 rounded-full bg-background border">
                    <Skeleton className="h-4 w-4 rounded-full" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-40" />
                      <Skeleton className="h-5 w-14 rounded-full" />
                    </div>
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Load more */}
      <div className="flex justify-center">
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  )
}
