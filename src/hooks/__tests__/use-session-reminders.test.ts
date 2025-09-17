import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSessionReminders } from '../use-session-reminders';

// Mock the current time for consistent testing
const mockDate = new Date('2024-01-15T10:00:00.000Z');

const createMockSession = (id: string, minutesFromNow: number, sessionType: 'chemistry' | 'therapy' = 'chemistry') => ({
  id,
  therapistName: `Dr. Test ${id}`,
  sessionTime: new Date(mockDate.getTime() + minutesFromNow * 60 * 1000),
  sessionType,
  status: 'confirmed' as const,
});

describe('useSessionReminders', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(mockDate);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns empty reminders for no sessions', () => {
    const { result } = renderHook(() => useSessionReminders([]));

    expect(result.current.activeReminders).toEqual([]);
    expect(result.current.mostUrgentReminder).toBeNull();
    expect(result.current.hasUrgentReminders).toBe(false);
    expect(result.current.hasImmediateReminders).toBe(false);
    expect(result.current.totalReminders).toBe(0);
  });

  it('filters out sessions more than 1 hour away', () => {
    const sessions = [
      createMockSession('1', 30), // 30 minutes - should show
      createMockSession('2', 90), // 90 minutes - should not show
    ];

    const { result } = renderHook(() => useSessionReminders(sessions));

    expect(result.current.activeReminders).toHaveLength(1);
    expect(result.current.activeReminders[0].sessionId).toBe('1');
    expect(result.current.totalReminders).toBe(1);
  });

  it('filters out completed and cancelled sessions', () => {
    const sessions = [
      { ...createMockSession('1', 30), status: 'completed' as const },
      { ...createMockSession('2', 30), status: 'cancelled' as const },
      createMockSession('3', 30), // confirmed - should show
    ];

    const { result } = renderHook(() => useSessionReminders(sessions));

    expect(result.current.activeReminders).toHaveLength(1);
    expect(result.current.activeReminders[0].sessionId).toBe('3');
  });

  it('identifies urgent reminders (within 10 minutes)', () => {
    const sessions = [
      createMockSession('1', 8), // 8 minutes - urgent
      createMockSession('2', 30), // 30 minutes - not urgent
    ];

    const { result } = renderHook(() => useSessionReminders(sessions));

    expect(result.current.hasUrgentReminders).toBe(true);
    expect(result.current.hasImmediateReminders).toBe(false);
    expect(result.current.activeReminders[0].isUrgent).toBe(true);
    expect(result.current.activeReminders[1].isUrgent).toBe(false);
  });

  it('identifies immediate reminders (within 5 minutes)', () => {
    const sessions = [
      createMockSession('1', 3), // 3 minutes - immediate
      createMockSession('2', 8), // 8 minutes - urgent but not immediate
    ];

    const { result } = renderHook(() => useSessionReminders(sessions));

    expect(result.current.hasUrgentReminders).toBe(true);
    expect(result.current.hasImmediateReminders).toBe(true);
    expect(result.current.activeReminders[0].isImmediate).toBe(true);
    expect(result.current.activeReminders[0].isUrgent).toBe(true);
    expect(result.current.activeReminders[1].isImmediate).toBe(false);
    expect(result.current.activeReminders[1].isUrgent).toBe(true);
  });

  it('sorts reminders by urgency (soonest first)', () => {
    const sessions = [
      createMockSession('1', 30), // 30 minutes
      createMockSession('2', 5), // 5 minutes - most urgent
      createMockSession('3', 15), // 15 minutes
    ];

    const { result } = renderHook(() => useSessionReminders(sessions));

    expect(result.current.activeReminders[0].sessionId).toBe('2'); // 5 minutes
    expect(result.current.activeReminders[1].sessionId).toBe('3'); // 15 minutes
    expect(result.current.activeReminders[2].sessionId).toBe('1'); // 30 minutes
    expect(result.current.mostUrgentReminder?.sessionId).toBe('2');
  });

  it('updates reminders in real-time', async () => {
    const sessions = [
      createMockSession('1', 11), // 11 minutes - not urgent initially
    ];

    const { result } = renderHook(() => useSessionReminders(sessions));

    expect(result.current.hasUrgentReminders).toBe(false);

    // Advance time by 2 minutes (now 9 minutes away)
    act(() => {
      vi.advanceTimersByTime(2 * 60 * 1000);
    });

    expect(result.current.hasUrgentReminders).toBe(true);
    expect(result.current.activeReminders[0].isUrgent).toBe(true);
  });

  it('allows dismissing reminders', () => {
    const sessions = [
      createMockSession('1', 30),
      createMockSession('2', 15),
    ];

    const { result } = renderHook(() => useSessionReminders(sessions));

    expect(result.current.totalReminders).toBe(2);

    act(() => {
      result.current.dismissReminder('1');
    });

    expect(result.current.totalReminders).toBe(1);
    expect(result.current.activeReminders[0].sessionId).toBe('2');
  });

  it('can clear all dismissed reminders', () => {
    const sessions = [
      createMockSession('1', 30),
      createMockSession('2', 15),
    ];

    const { result } = renderHook(() => useSessionReminders(sessions));

    // Dismiss both reminders
    act(() => {
      result.current.dismissReminder('1');
      result.current.dismissReminder('2');
    });

    expect(result.current.totalReminders).toBe(0);

    // Clear dismissed reminders
    act(() => {
      result.current.clearDismissedReminders();
    });

    expect(result.current.totalReminders).toBe(2);
  });

  it('calculates time remaining correctly', () => {
    const sessions = [
      createMockSession('1', 30), // 30 minutes
    ];

    const { result } = renderHook(() => useSessionReminders(sessions));

    expect(result.current.activeReminders[0].timeUntilSession).toBe(30 * 60 * 1000);
  });

  it('handles different session types', () => {
    const sessions = [
      createMockSession('1', 30, 'chemistry'),
      createMockSession('2', 15, 'therapy'),
    ];

    const { result } = renderHook(() => useSessionReminders(sessions));

    expect(result.current.activeReminders[0].sessionType).toBe('therapy'); // sorted by urgency
    expect(result.current.activeReminders[1].sessionType).toBe('chemistry');
  });

  it('filters out past sessions', () => {
    const sessions = [
      createMockSession('1', -10), // 10 minutes ago - should not show
      createMockSession('2', 30), // 30 minutes from now - should show
    ];

    const { result } = renderHook(() => useSessionReminders(sessions));

    expect(result.current.totalReminders).toBe(1);
    expect(result.current.activeReminders[0].sessionId).toBe('2');
  });

  it('handles edge case of session starting exactly now', () => {
    const sessions = [
      createMockSession('1', 0), // exactly now
    ];

    const { result } = renderHook(() => useSessionReminders(sessions));

    expect(result.current.totalReminders).toBe(0); // should not show reminders for current/past sessions
  });
});
