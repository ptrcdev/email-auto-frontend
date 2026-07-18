import { Brain } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/shared/EmptyState';
import type { DailyBrief } from '@/types';

interface DailyBriefCardProps {
  brief: DailyBrief | null;
  loading?: boolean;
}

export function DailyBriefCard({ brief, loading }: DailyBriefCardProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-40" />
        </CardHeader>
        <CardContent className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-blue-200 dark:border-blue-900 bg-gradient-to-br from-blue-50/50 to-transparent dark:from-blue-950/20 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-800 transition-all duration-200">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <Brain className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          Daily Brief
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!brief?.summary || brief.summary.length === 0 ? (
          <EmptyState
            title="No updates today"
            description="Check back tomorrow for your daily briefing."
            className="py-6"
          />
        ) : (
          <ul className="space-y-3">
            {brief.summary.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                <span className="text-sm text-foreground leading-relaxed">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
