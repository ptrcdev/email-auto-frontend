import { useState, useEffect, useMemo } from 'react';
import {
  Flame,
  Reply,
  CalendarDays,
  DollarSign,
  Newspaper,
  ChevronLeft,
  ChevronRight,
  History,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SummaryCard } from '@/components/dashboard/SummaryCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/hooks/useAuth';
import { getDailyBriefs } from '@/lib/api';
import type { DailyBrief } from '@/types';

interface SectionConfig {
  key: string;
  title: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
}

const sections: SectionConfig[] = [
  {
    key: 'highPriority',
    title: 'High Priority',
    icon: Flame,
    color: 'text-red-600 dark:text-red-400',
    bgColor: 'bg-red-100 dark:bg-red-900/30',
  },
  {
    key: 'needsReply',
    title: 'Needs Reply',
    icon: Reply,
    color: 'text-amber-600 dark:text-amber-400',
    bgColor: 'bg-amber-100 dark:bg-amber-900/30',
  },
  {
    key: 'meetings',
    title: 'Meetings',
    icon: CalendarDays,
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
  },
  {
    key: 'finance',
    title: 'Finance',
    icon: DollarSign,
    color: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'bg-emerald-100 dark:bg-emerald-900/30',
  },
  {
    key: 'updates',
    title: 'Updates',
    icon: Newspaper,
    color: 'text-slate-600 dark:text-slate-400',
    bgColor: 'bg-slate-100 dark:bg-slate-800',
  },
];

function formatDateLabel(dateStr: string): string {
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  if (dateStr === today) return 'Today';
  if (dateStr === yesterday) return 'Yesterday';
  return new Date(`${dateStr}T12:00:00`).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function DailyBriefTab() {
  const { email } = useAuth();
  const [briefs, setBriefs] = useState<DailyBrief[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!email) return;
    setLoading(true);
    getDailyBriefs(email)
      .then((data) => {
        setBriefs(data);
        setSelectedIndex(0);
      })
      .catch((e) => {
        setError(e instanceof Error ? e.message : 'Failed to load daily briefs');
      })
      .finally(() => setLoading(false));
  }, [email]);

  const currentBrief = briefs[selectedIndex] || null;

  const goBack = () => setSelectedIndex((i) => Math.min(i + 1, briefs.length - 1));
  const goForward = () => setSelectedIndex((i) => Math.max(i - 1, 0));

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
        <h1 className="text-2xl font-bold text-foreground">Daily Briefs</h1>
        <p className="text-muted-foreground mt-1">
          Browse your past briefs. Your complete AI briefing for any day.
        </p>
      </div>

      {/* Date navigator */}
      {loading ? (
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-lg" />
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-10 w-10 rounded-lg" />
        </div>
      ) : briefs.length === 0 ? (
        <Card>
          <CardContent className="py-12">
            <div className="flex flex-col items-center gap-3 text-muted-foreground">
              <History className="w-10 h-10" />
              <p className="text-sm">No daily briefs found.</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={goBack}
            disabled={selectedIndex >= briefs.length - 1}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <div className="flex-1 text-center">
            <span className="text-lg font-semibold text-foreground">
              {currentBrief ? formatDateLabel(currentBrief.date) : ''}
            </span>
            <span className="text-sm text-muted-foreground ml-2">
              {selectedIndex + 1} of {briefs.length}
            </span>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={goForward}
            disabled={selectedIndex <= 0}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Brief content */}
      {loading ? (
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
            </CardContent>
          </Card>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-20 rounded-xl" />
            ))}
          </div>
        </div>
      ) : currentBrief ? (
        <>
          {/* Summary */}
          <Card className="border-blue-200 dark:border-blue-900 bg-gradient-to-br from-blue-50/50 to-transparent dark:from-blue-950/20">
            <CardHeader>
              <CardTitle className="text-lg">{currentBrief.greeting}</CardTitle>
            </CardHeader>
            <CardContent>
              {currentBrief.summary.length > 0 ? (
                <ul className="space-y-3">
                  {currentBrief.summary.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                      <span className="text-sm text-foreground leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">No updates for this day.</p>
              )}
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatCard
              label="Total Emails"
              value={currentBrief.stats.emailsProcessed}
            />
            <StatCard
              label="High Priority"
              value={currentBrief.stats.highPriority}
              className="text-red-600"
            />
            <StatCard
              label="Need Reply"
              value={currentBrief.stats.needReply}
              className="text-amber-600"
            />
            <StatCard
              label="Informational"
              value={currentBrief.stats.informational}
              className="text-slate-500"
            />
          </div>

          {/* Category Sections */}
          <div className="space-y-6">
            {sections.map((section) => {
              const categoryData = currentBrief.categories[section.key as keyof typeof currentBrief.categories];
              const count = categoryData?.count || 0;
              const emails = categoryData?.emails || [];
              const Icon = section.icon;

              return (
                <Card key={section.key}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2 text-base">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center ${section.bgColor}`}
                        >
                          <Icon className={`w-4 h-4 ${section.color}`} />
                        </div>
                        {section.title}
                      </CardTitle>
                      <span className="text-sm font-semibold text-muted-foreground">
                        {count} email{count !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {emails.length === 0 ? (
                      <p className="text-sm text-muted-foreground py-4 text-center">
                        No {section.title.toLowerCase()} emails.
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {emails.map((email) => (
                          <SummaryCard key={email.id} email={email} />
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </>
      ) : null}
    </div>
  );
}

function StatCard({
  label,
  value,
  className,
}: {
  label: string;
  value: number;
  className?: string;
}) {
  return (
    <div className="bg-card border border-border rounded-xl p-4">
      <p className={`text-2xl font-bold ${className || 'text-foreground'}`}>{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
