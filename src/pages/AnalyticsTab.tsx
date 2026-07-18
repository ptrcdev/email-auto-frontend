import {
  BarChart3,
  Mail,
  TrendingUp,
  AlertTriangle,
  Users,
  Calendar,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/hooks/useAuth';
import { useDashboard } from '@/hooks/useDashboard';

export function AnalyticsTab() {
  const { email } = useAuth();
  const { analytics, loading, error } = useDashboard(email);

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground mt-1">
          Simple insights into your email patterns.
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <OverviewCard
          icon={Mail}
          label="This Week"
          value={analytics?.emailsThisWeek || 0}
          color="text-blue-600"
          loading={loading}
        />
        <OverviewCard
          icon={TrendingUp}
          label="Avg / Day"
          value={analytics?.averagePerDay || 0}
          color="text-emerald-600"
          loading={loading}
        />
        <OverviewCard
          icon={AlertTriangle}
          label="High Priority"
          value={analytics?.highPriorityCount || 0}
          color="text-red-600"
          loading={loading}
        />
        <OverviewCard
          icon={Users}
          label="Top Senders"
          value={analytics?.topSenders?.length || 0}
          color="text-purple-600"
          loading={loading}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Category Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-8 w-full" />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <CategoryBar
                  label="Urgent"
                  count={analytics?.categoryBreakdown.urgent || 0}
                  total={analytics?.emailsThisWeek || 1}
                  color="bg-red-500"
                />
                <CategoryBar
                  label="Needs Review"
                  count={analytics?.categoryBreakdown.needsReview || 0}
                  total={analytics?.emailsThisWeek || 1}
                  color="bg-amber-500"
                />
                <CategoryBar
                  label="Low Priority"
                  count={analytics?.categoryBreakdown.lowPriority || 0}
                  total={analytics?.emailsThisWeek || 1}
                  color="bg-slate-400"
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Daily Volume */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Daily Volume (Last 30 Days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-40 w-full" />
            ) : (
              <DailyVolumeChart data={analytics?.dailyVolume || []} />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Top Senders */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Users className="w-4 h-4" />
            Top Senders
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : analytics?.topSenders && analytics.topSenders.length > 0 ? (
            <div className="space-y-3">
              {analytics.topSenders.map((sender) => {
                const initials = sender.sender
                  .split(/[@.\s]/)
                  .filter(Boolean)
                  .slice(0, 2)
                  .map((w) => w[0])
                  .join('')
                  .toUpperCase();

                return (
                  <div
                    key={sender.sender}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-medium">
                        {initials}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground truncate">
                        {sender.sender}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-muted-foreground bg-background px-2.5 py-1 rounded-full">
                      {sender.count}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              No sender data available.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function OverviewCard({
  icon: Icon,
  label,
  value,
  color,
  loading,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  color: string;
  loading: boolean;
}) {
  if (loading) {
    return (
      <Card>
        <CardContent className="p-4">
          <Skeleton className="h-12 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-4 flex items-center gap-4">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${color.replace('text-', 'bg-').replace('600', '100')} dark:bg-opacity-20`}
        >
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
        <div>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function CategoryBar({
  label,
  count,
  total,
  color,
}: {
  label: string;
  count: number;
  total: number;
  color: string;
}) {
  const percentage = total > 0 ? (count / total) * 100 : 0;

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm text-foreground">{label}</span>
        <span className="text-sm font-medium text-muted-foreground">
          {count} ({Math.round(percentage)}%)
        </span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full ${color} rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function DailyVolumeChart({ data }: { data: { date: string; count: number }[] }) {
  if (data.length === 0) {
    return (
      <p className="text-sm text-muted-foreground text-center py-8">
        No volume data available.
      </p>
    );
  }

  const maxCount = Math.max(...data.map((d) => d.count), 1);

  return (
    <div className="flex items-end gap-1 h-40">
      {data.map((d) => {
        const height = (d.count / maxCount) * 100;
        const day = new Date(d.date + 'T12:00:00').toLocaleDateString('en-US', {
          weekday: 'short',
        });

        return (
          <div
            key={d.date}
            className="flex-1 flex flex-col items-center gap-1"
            title={`${d.date}: ${d.count} emails`}
          >
            <span className="text-xs text-muted-foreground">{d.count}</span>
            <div
              className="w-full bg-blue-500 rounded-t-sm transition-all duration-300 hover:bg-blue-600"
              style={{ height: `${Math.max(height, 4)}%` }}
            />
            <span className="text-[10px] text-muted-foreground">{day}</span>
          </div>
        );
      })}
    </div>
  );
}
