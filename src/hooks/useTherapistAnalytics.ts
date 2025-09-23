import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

export interface AnalyticsData {
  metric_date: string;
  total_sessions: number;
  completed_sessions: number;
  cancelled_sessions: number;
  no_show_sessions: number;
  total_earnings: number;
  average_session_rating?: number;
  new_clients: number;
  returning_clients: number;
}

export interface SessionEarning {
  id: string;
  appointment_id: string;
  therapist_id: string;
  gross_amount: number;
  platform_fee: number;
  net_amount: number;
  payout_status: 'pending' | 'processing' | 'paid' | 'failed';
  payout_date?: string;
  created_at: string;
}

export interface TherapistAnalytics {
  analytics: AnalyticsData[];
  earnings: SessionEarning[];
  totalStats: {
    totalSessions: number;
    completedSessions: number;
    cancelledSessions: number;
    noShowSessions: number;
    totalEarnings: number;
    newClients: number;
    returningClients: number;
  };
  totalEarnings: number;
  pendingEarnings: number;
  availableEarnings: number;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Hook to fetch and manage therapist analytics data from the real database tables
 * @param startDate Optional start date for filtering analytics (YYYY-MM-DD)
 * @param endDate Optional end date for filtering analytics (YYYY-MM-DD)
 * @returns TherapistAnalytics object with analytics data, earnings, and statistics
 */
export function useTherapistAnalytics(startDate?: string, endDate?: string): TherapistAnalytics {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState<AnalyticsData[]>([]);
  const [earnings, setEarnings] = useState<SessionEarning[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchTrigger, setFetchTrigger] = useState(0);

  // Fetch analytics and earnings data
  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Fetch analytics data
        let analyticsQuery = supabase
          .from('therapist_analytics')
          .select('*')
          .eq('therapist_id', user.id)
          .order('metric_date', { ascending: false });

        // Apply date filters if provided
        if (startDate) {
          analyticsQuery = analyticsQuery.gte('metric_date', startDate);
        }
        if (endDate) {
          analyticsQuery = analyticsQuery.lte('metric_date', endDate);
        }

        // Fetch earnings data
        const earningsQuery = supabase
          .from('session_earnings')
          .select('*')
          .eq('therapist_id', user.id)
          .order('created_at', { ascending: false });

        // Execute both queries in parallel
        const [analyticsResult, earningsResult] = await Promise.all([
          analyticsQuery,
          earningsQuery
        ]);

        // Handle errors
        if (analyticsResult.error) throw new Error(`Analytics error: ${analyticsResult.error.message}`);
        if (earningsResult.error) throw new Error(`Earnings error: ${earningsResult.error.message}`);

        // Set data
        setAnalytics(analyticsResult.data || []);
        setEarnings(earningsResult.data || []);
      } catch (err) {
        console.error('Failed to fetch therapist analytics:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch analytics data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, startDate, endDate, fetchTrigger]);

  // Calculate total statistics from analytics data
  const getTotalStats = () => {
    return analytics.reduce(
      (totals, day) => ({
        totalSessions: totals.totalSessions + day.total_sessions,
        completedSessions: totals.completedSessions + day.completed_sessions,
        cancelledSessions: totals.cancelledSessions + day.cancelled_sessions,
        noShowSessions: totals.noShowSessions + day.no_show_sessions,
        totalEarnings: totals.totalEarnings + day.total_earnings,
        newClients: totals.newClients + day.new_clients,
        returningClients: totals.returningClients + day.returning_clients
      }),
      {
        totalSessions: 0,
        completedSessions: 0,
        cancelledSessions: 0,
        noShowSessions: 0,
        totalEarnings: 0,
        newClients: 0,
        returningClients: 0
      }
    );
  };

  // Calculate total earnings from session_earnings table
  const getTotalEarnings = () => {
    return earnings.reduce((sum, earning) => sum + earning.net_amount, 0);
  };

  // Calculate pending earnings (not yet paid)
  const getPendingEarnings = () => {
    return earnings
      .filter(earning => earning.payout_status === 'pending' || earning.payout_status === 'processing')
      .reduce((sum, earning) => sum + earning.net_amount, 0);
  };

  // Calculate available earnings (already paid)
  const getAvailableEarnings = () => {
    return earnings
      .filter(earning => earning.payout_status === 'paid')
      .reduce((sum, earning) => sum + earning.net_amount, 0);
  };

  // Trigger a refetch of the data
  const refetch = () => {
    setFetchTrigger(prev => prev + 1);
  };

  return {
    analytics,
    earnings,
    totalStats: getTotalStats(),
    totalEarnings: getTotalEarnings(),
    pendingEarnings: getPendingEarnings(),
    availableEarnings: getAvailableEarnings(),
    loading,
    error,
    refetch
  };
}
