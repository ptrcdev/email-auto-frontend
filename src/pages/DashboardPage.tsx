import { useMemo } from 'react';
import { Flame, Reply, CalendarDays, DollarSign, Newspaper } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useDashboard } from '@/hooks/useDashboard';
import { HeroSection } from '@/components/dashboard/HeroSection';
import { DailyBriefCard } from '@/components/dashboard/DailyBriefCard';
import { CategoryCard } from '@/components/dashboard/CategoryCard';
import { SkeletonLoader } from '@/components/shared/SkeletonLoader';

export function DashboardPage() {
  const { email } = useAuth();
  const { dailyBrief, loading, error } = useDashboard(email);

  const categories = useMemo(() => {
    if (!dailyBrief) return [];

    const { categories: cats } = dailyBrief;

    return [
      {
        title: 'High Priority',
        icon: Flame,
        count: cats.highPriority.count,
        emails: cats.highPriority.emails,
        color: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
      },
      {
        title: 'Needs Reply',
        icon: Reply,
        count: cats.needsReply.count,
        emails: cats.needsReply.emails,
        color: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
      },
      {
        title: 'Meetings',
        icon: CalendarDays,
        count: cats.meetings.count,
        emails: cats.meetings.emails,
        color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
      },
      {
        title: 'Finance',
        icon: DollarSign,
        count: cats.finance.count,
        emails: cats.finance.emails,
        color: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
      },
      {
        title: 'Updates',
        icon: Newspaper,
        count: cats.updates.count,
        emails: cats.updates.emails,
        color: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
      },
    ];
  }, [dailyBrief]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="animate-fade-in">
        <HeroSection brief={dailyBrief} loading={loading} />
      </div>

      <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <DailyBriefCard brief={dailyBrief} loading={loading} />
      </div>

      <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <h2 className="text-lg font-semibold text-foreground mb-4">Categories</h2>
        {loading ? (
          <SkeletonLoader count={2} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {categories.map((cat, index) => (
              <div
                key={cat.title}
                className="animate-scale-in"
                style={{ animationDelay: `${0.3 + index * 0.05}s` }}
              >
                <CategoryCard
                  title={cat.title}
                  icon={cat.icon}
                  count={cat.count}
                  emails={cat.emails}
                  color={cat.color}
                  onViewAll={cat.onViewAll}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
