import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Appointment {
  id: string;
  client_id: string;
  session_type: string;
  session_date: string;
  session_time: string;
  duration_minutes: number;
  status: 'scheduled' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'no_show';
  session_rate: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface AvailabilitySlot {
  id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_available: boolean;
  recurring: boolean;
}

export interface BlockedTime {
  id: string;
  title: string;
  start_date: string;
  end_date: string;
  start_time?: string;
  end_time?: string;
  all_day: boolean;
  recurring: boolean;
  notes?: string;
}

export interface SessionEarning {
  id: string;
  appointment_id: string;
  gross_amount: number;
  platform_fee: number;
  net_amount: number;
  payout_status: 'pending' | 'processing' | 'paid' | 'failed';
  payout_date?: string;
}

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

export function useTherapistAppointments() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const fetchAppointments = async () => {
      try {
        const { data, error } = await supabase
          .from('appointments')
          .select('*')
          .eq('therapist_id', user.id)
          .order('session_date', { ascending: true })
          .order('session_time', { ascending: true });

        if (error) throw error;
        setAppointments((data || []) as Appointment[]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch appointments');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();

    // Subscribe to real-time updates
    const subscription = supabase
      .channel('therapist-appointments')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'appointments',
          filter: `therapist_id=eq.${user.id}`
        },
        () => {
          fetchAppointments();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  return { appointments, loading, error, refetch: () => setLoading(true) };
}

export function useTherapistAvailability() {
  const { user } = useAuth();
  const [availability, setAvailability] = useState<AvailabilitySlot[]>([]);
  const [blockedTimes, setBlockedTimes] = useState<BlockedTime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const fetchAvailability = async () => {
      try {
        const [availabilityResult, blockedResult] = await Promise.all([
          supabase
            .from('therapist_availability')
            .select('*')
            .eq('therapist_id', user.id)
            .order('day_of_week', { ascending: true })
            .order('start_time', { ascending: true }),
          supabase
            .from('therapist_blocked_times')
            .select('*')
            .eq('therapist_id', user.id)
            .order('start_date', { ascending: true })
        ]);

        if (availabilityResult.error) throw availabilityResult.error;
        if (blockedResult.error) throw blockedResult.error;

        setAvailability(availabilityResult.data || []);
        setBlockedTimes(blockedResult.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch availability');
      } finally {
        setLoading(false);
      }
    };

    fetchAvailability();
  }, [user]);

  const saveAvailabilitySlot = async (slot: Omit<AvailabilitySlot, 'id'>) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('therapist_availability')
        .insert({
          ...slot,
          therapist_id: user.id
        });

      if (error) throw error;
      
      // Refetch data
      setLoading(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save availability');
    }
  };

  const addBlockedTime = async (blockedTime: Omit<BlockedTime, 'id'>) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('therapist_blocked_times')
        .insert({
          ...blockedTime,
          therapist_id: user.id
        });

      if (error) throw error;
      
      // Refetch data
      setLoading(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add blocked time');
    }
  };

  return { 
    availability, 
    blockedTimes, 
    loading, 
    error, 
    saveAvailabilitySlot, 
    addBlockedTime 
  };
}

export function useTherapistEarnings() {
  const { user } = useAuth();
  const [earnings, setEarnings] = useState<SessionEarning[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const fetchEarnings = async () => {
      try {
        const { data, error } = await supabase
          .from('session_earnings')
          .select('*')
          .eq('therapist_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setEarnings((data || []) as SessionEarning[]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch earnings');
      } finally {
        setLoading(false);
      }
    };

    fetchEarnings();
  }, [user]);

  const getTotalEarnings = () => {
    return earnings.reduce((sum, earning) => sum + earning.net_amount, 0);
  };

  const getPendingEarnings = () => {
    return earnings
      .filter(earning => earning.payout_status === 'pending')
      .reduce((sum, earning) => sum + earning.net_amount, 0);
  };

  const getAvailableEarnings = () => {
    return earnings
      .filter(earning => earning.payout_status === 'paid')
      .reduce((sum, earning) => sum + earning.net_amount, 0);
  };

  return { 
    earnings, 
    loading, 
    error, 
    getTotalEarnings, 
    getPendingEarnings, 
    getAvailableEarnings 
  };
}

export function useTherapistAnalytics(startDate?: string, endDate?: string) {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState<AnalyticsData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const fetchAnalytics = async () => {
      try {
        let query = supabase
          .from('therapist_analytics')
          .select('*')
          .eq('therapist_id', user.id)
          .order('metric_date', { ascending: false });

        if (startDate) {
          query = query.gte('metric_date', startDate);
        }
        if (endDate) {
          query = query.lte('metric_date', endDate);
        }

        const { data, error } = await query;

        if (error) throw error;
        setAnalytics(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch analytics');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [user, startDate, endDate]);

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

  return { analytics, loading, error, getTotalStats };
}