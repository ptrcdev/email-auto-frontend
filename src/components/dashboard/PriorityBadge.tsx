import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        urgent: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
        needsReview: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
        low: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
        meeting: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
        finance: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
        reply: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
        info: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
      },
    },
    defaultVariants: {
      variant: 'low',
    },
  },
);

interface PriorityBadgeProps extends VariantProps<typeof badgeVariants> {
  label?: string;
}

const variantLabels: Record<string, string> = {
  urgent: 'Urgent',
  needsReview: 'Needs Review',
  low: 'Low',
  meeting: 'Meeting',
  finance: 'Finance',
  reply: 'Reply',
  info: 'Info',
};

export function PriorityBadge({ variant, label }: PriorityBadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }))}>
      {label || variantLabels[variant || 'low']}
    </span>
  );
}
