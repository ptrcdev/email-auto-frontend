import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface DashboardStatCardProps {
  icon: LucideIcon;
  value: number;
  label: string;
  color?: string;
  className?: string;
}

export function DashboardStatCard({
  icon: Icon,
  value,
  label,
  color = 'text-blue-600',
  className,
}: DashboardStatCardProps) {
  return (
    <div
      className={cn(
        'bg-card border border-border rounded-xl p-4 flex items-center gap-4 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-200',
        className,
      )}
    >
      <div
        className={cn(
          'w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0',
          color.replace('text-', 'bg-').replace('600', '100'),
          'dark:bg-opacity-20',
        )}
      >
        <Icon className={cn('w-6 h-6', color)} />
      </div>
      <div>
        <p className="text-2xl font-bold text-foreground">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}
