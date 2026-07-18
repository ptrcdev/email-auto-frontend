import { Skeleton } from '@/components/ui/skeleton';

export function SkeletonLoader({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-card border border-border rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-3">
            <Skeleton className="h-5 w-16 rounded-md" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-20 ml-auto" />
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      ))}
    </div>
  );
}
