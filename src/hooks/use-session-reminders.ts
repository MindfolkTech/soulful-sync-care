import { useState, useEffect, useMemo } from "react";

interface SessionData {
  id: string;
  therapistName: string;
  sessionTime: Date;
  sessionType: "chemistry" | "therapy";
  status: "confirmed" | "completed" | "cancelled";
}

interface SessionReminder {
  sessionId: string;
  therapistName: string;
  sessionTime: Date;
  sessionType: "chemistry" | "therapy";
  timeUntilSession: number;
  isUrgent: boolean;
  isImmediate: boolean;
}

export function useSessionReminders(sessions: SessionData[] = []) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [dismissedReminders, setDismissedReminders] = useState<Set<string>>(new Set());

  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Calculate active reminders
  const activeReminders = useMemo(() => {
    const now = currentTime.getTime();
    
    return sessions
      .filter(session => {
        // Only show reminders for confirmed sessions
        if (session.status !== "confirmed") return false;
        
        // Don't show dismissed reminders
        if (dismissedReminders.has(session.id)) return false;
        
        const sessionTime = new Date(session.sessionTime).getTime();
        const timeUntilSession = sessionTime - now;
        
        // Only show reminders for sessions within the next hour
        return timeUntilSession > 0 && timeUntilSession <= 60 * 60 * 1000;
      })
      .map(session => {
        const sessionTime = new Date(session.sessionTime).getTime();
        const timeUntilSession = sessionTime - now;
        
        return {
          sessionId: session.id,
          therapistName: session.therapistName,
          sessionTime: session.sessionTime,
          sessionType: session.sessionType,
          timeUntilSession,
          isUrgent: timeUntilSession <= 10 * 60 * 1000, // 10 minutes
          isImmediate: timeUntilSession <= 5 * 60 * 1000, // 5 minutes
        };
      })
      .sort((a, b) => a.timeUntilSession - b.timeUntilSession); // Sort by urgency
  }, [sessions, currentTime, dismissedReminders]);

  const dismissReminder = (sessionId: string) => {
    setDismissedReminders(prev => new Set([...prev, sessionId]));
  };

  const clearDismissedReminders = () => {
    setDismissedReminders(new Set());
  };

  // Get the most urgent reminder
  const mostUrgentReminder = activeReminders[0] || null;

  // Check if there are any urgent reminders
  const hasUrgentReminders = activeReminders.some(reminder => reminder.isUrgent);
  const hasImmediateReminders = activeReminders.some(reminder => reminder.isImmediate);

  return {
    activeReminders,
    mostUrgentReminder,
    hasUrgentReminders,
    hasImmediateReminders,
    dismissReminder,
    clearDismissedReminders,
    totalReminders: activeReminders.length,
  };
}
