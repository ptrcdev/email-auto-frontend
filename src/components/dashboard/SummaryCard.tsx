import { cn } from '@/lib/utils';
import { PriorityBadge } from './PriorityBadge';
import type { EmailRecord } from '@/types';

interface SummaryCardProps {
  email: EmailRecord;
  className?: string;
  compact?: boolean;
}

function getVariantForCategory(category: string): 'urgent' | 'needsReview' | 'low' {
  switch (category) {
    case 'urgent':
      return 'urgent';
    case 'needs_review':
      return 'needsReview';
    default:
      return 'low';
  }
}

function formatTimeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function SummaryCard({ email, className, compact = false }: SummaryCardProps) {
  return (
    <div
      className={cn(
        'bg-card border border-border rounded-xl p-4 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-200 cursor-pointer',
        compact && 'p-3',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-foreground truncate">
            {email.sender}
          </p>
          <p className={cn(
            'font-medium text-foreground mt-0.5',
            compact ? 'text-sm' : 'text-base',
          )}>
            {email.subject}
          </p>
        </div>
        <PriorityBadge variant={getVariantForCategory(email.category)} />
      </div>

      {email.summary && (
        <p className={cn(
          'text-muted-foreground leading-relaxed',
          compact ? 'text-xs line-clamp-2' : 'text-sm line-clamp-3',
        )}>
          {email.summary}
        </p>
      )}

      <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
        <span>{formatTimeAgo(email.receivedAt)}</span>
        {email.extractedFields?.amount && (
          <>
            <span className="text-border">·</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">
              {email.extractedFields.amount}
            </span>
          </>
        )}
        {email.extractedFields?.deadline && (
          <>
            <span className="text-border">·</span>
            <span className="text-blue-600 dark:text-blue-400 font-medium">
              {email.extractedFields.deadline}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
