import { cn } from "@/lib/utils/cn";

export function LoadingSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("animate-pulse rounded-2xl bg-violet-100/60", className)} />
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <LoadingSkeleton className="h-24 w-24 rounded-full" />
        <div className="flex-1 space-y-3">
          <LoadingSkeleton className="h-6 w-48" />
          <LoadingSkeleton className="h-4 w-32" />
          <LoadingSkeleton className="h-4 w-40" />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <LoadingSkeleton key={i} className="h-32" />
        ))}
      </div>
      <LoadingSkeleton className="h-64" />
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <LoadingSkeleton key={i} className="h-48" />
        ))}
      </div>
    </div>
  );
}
