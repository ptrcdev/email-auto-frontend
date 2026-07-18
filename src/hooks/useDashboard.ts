import { useState, useEffect, useCallback } from 'react';
import { getDashboardStats, getDailyBrief, getAnalytics } from '@/lib/api';
import type { DashboardStats, DailyBrief, Analytics } from '@/types';

interface UseDashboardReturn {
  stats: DashboardStats | null;
  dailyBrief: DailyBrief | null;
  analytics: Analytics | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useDashboard(email: string): UseDashboardReturn {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [dailyBrief, setDailyBrief] = useState<DailyBrief | null>(null);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!email) return;

    setLoading(true);
    setError(null);

    try {
      const [statsData, briefData, analyticsData] = await Promise.all([
        getDashboardStats(email),
        getDailyBrief(email),
        getAnalytics(email),
      ]);

      setStats(statsData);
      setDailyBrief(briefData);
      setAnalytics(analyticsData);
    } catch (e) {
      console.error('Failed to load dashboard data:', e);
      setError(e instanceof Error ? e.message : 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  }, [email]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { stats, dailyBrief, analytics, loading, error, refresh: fetchData };
}
