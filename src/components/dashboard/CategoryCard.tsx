import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SummaryCard } from './SummaryCard';
import { EmptyState } from '@/components/shared/EmptyState';
import { Skeleton } from '@/components/ui/skeleton';
import type { LucideIcon } from 'lucide-react';
import type { EmailRecord } from '@/types';

interface CategoryCardProps {
  title: string;
  icon: LucideIcon;
  count: number;
  emails: EmailRecord[];
  color: string;
  onViewAll?: () => void;
  loading?: boolean;
}

export function CategoryCard({
  title,
  icon: Icon,
  count,
  emails,
  color,
  onViewAll,
  loading,
}: CategoryCardProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-5 w-8 rounded-full" />
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-20 rounded-lg" />
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <div
              className={cn(
                'w-8 h-8 rounded-lg flex items-center justify-center',
                color,
              )}
            >
              <Icon className="w-4 h-4" />
            </div>
            {title}
          </CardTitle>
          <span className="text-sm font-semibold text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
            {count}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        {emails.length === 0 ? (
          <EmptyState
            title={`No ${title.toLowerCase()} emails`}
            description="All clear!"
            className="py-4"
          />
        ) : (
          <div className="space-y-3">
            {emails.map((email) => (
              <SummaryCard key={email.id} email={email} compact />
            ))}
          </div>
        )}
        {count > 3 && onViewAll && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onViewAll}
            className="w-full mt-3 text-muted-foreground"
          >
            View All ({count})
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
