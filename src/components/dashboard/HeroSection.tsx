import { Mail, AlertTriangle, Reply, Info } from 'lucide-react';
import { DashboardStatCard } from './DashboardStatCard';
import { Skeleton } from '@/components/ui/skeleton';
import type { DailyBrief } from '@/types';

interface HeroSectionProps {
  brief: DailyBrief | null;
  loading?: boolean;
}

export function HeroSection({ brief, loading }: HeroSectionProps) {
  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-80" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
        {brief?.greeting || 'Welcome back '}
      </h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardStatCard
          icon={Mail}
          value={brief?.stats.emailsProcessed || 0}
          label="Emails Processed"
          color="text-blue-600"
        />
        <DashboardStatCard
          icon={AlertTriangle}
          value={brief?.stats.highPriority || 0}
          label="High Priority"
          color="text-red-600"
        />
        <DashboardStatCard
          icon={Reply}
          value={brief?.stats.needReply || 0}
          label="Need Reply"
          color="text-amber-600"
        />
        <DashboardStatCard
          icon={Info}
          value={brief?.stats.informational || 0}
          label="Informational"
          color="text-slate-500"
        />
      </div>
    </div>
  );
}
