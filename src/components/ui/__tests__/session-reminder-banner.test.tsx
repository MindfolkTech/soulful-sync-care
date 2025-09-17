import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SessionReminderBanner } from '../session-reminder-banner';

// Mock the current time for consistent testing
const mockDate = new Date('2024-01-15T10:00:00.000Z');

describe('SessionReminderBanner', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(mockDate);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('does not render for sessions more than 1 hour away', () => {
    const sessionTime = new Date('2024-01-15T12:00:00.000Z'); // 2 hours from now
    
    const { container } = render(
      <SessionReminderBanner
        sessionTime={sessionTime}
        sessionId="test-session"
        therapistName="Dr. Test"
        sessionType="chemistry"
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it('renders reminder for session within 1 hour', () => {
    const sessionTime = new Date('2024-01-15T10:30:00.000Z'); // 30 minutes from now
    
    render(
      <SessionReminderBanner
        sessionTime={sessionTime}
        sessionId="test-session"
        therapistName="Dr. Test"
        sessionType="chemistry"
      />
    );

    expect(screen.getByText(/upcoming: chemistry call with dr\. test in 30 minutes/i)).toBeInTheDocument();
    expect(screen.getByText('10:30 AM')).toBeInTheDocument();
  });

  it('shows urgent styling for sessions within 10 minutes', () => {
    const sessionTime = new Date('2024-01-15T10:08:00.000Z'); // 8 minutes from now
    
    render(
      <SessionReminderBanner
        sessionTime={sessionTime}
        sessionId="test-session"
        therapistName="Dr. Test"
        sessionType="therapy"
      />
    );

    expect(screen.getByText(/reminder: therapy session with dr\. test in 8 minutes/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /join early/i })).toBeInTheDocument();
  });

  it('shows immediate styling and JOIN NOW for sessions within 5 minutes', () => {
    const sessionTime = new Date('2024-01-15T10:03:00.000Z'); // 3 minutes from now
    
    render(
      <SessionReminderBanner
        sessionTime={sessionTime}
        sessionId="test-session"
        therapistName="Dr. Test"
        sessionType="chemistry"
      />
    );

    expect(screen.getByText(/chemistry call with dr\. test starts in 3 minutes!/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /JOIN NOW/i })).toBeInTheDocument();
    expect(screen.getByText(/make sure you're in a quiet, private space/i)).toBeInTheDocument();
  });

  it('dismisses banner when close button is clicked', () => {
    const mockOnDismiss = vi.fn();
    const sessionTime = new Date('2024-01-15T10:30:00.000Z'); // 30 minutes from now
    
    render(
      <SessionReminderBanner
        sessionTime={sessionTime}
        sessionId="test-session"
        therapistName="Dr. Test"
        sessionType="chemistry"
        onDismiss={mockOnDismiss}
      />
    );

    const dismissButton = screen.getByRole('button', { name: /dismiss reminder/i });
    fireEvent.click(dismissButton);

    expect(mockOnDismiss).toHaveBeenCalled();
  });

  it('calls onJoinSession when join button is clicked', () => {
    const mockOnJoinSession = vi.fn();
    const sessionTime = new Date('2024-01-15T10:08:00.000Z'); // 8 minutes from now
    
    render(
      <SessionReminderBanner
        sessionTime={sessionTime}
        sessionId="test-session"
        therapistName="Dr. Test"
        sessionType="therapy"
        onJoinSession={mockOnJoinSession}
      />
    );

    const joinButton = screen.getByRole('button', { name: /join early/i });
    fireEvent.click(joinButton);

    expect(mockOnJoinSession).toHaveBeenCalledWith('test-session');
  });

  it('navigates to session room when no onJoinSession provided', () => {
    // Mock window.location.href
    delete (window as any).location;
    window.location = { href: '' } as any;

    const sessionTime = new Date('2024-01-15T10:08:00.000Z'); // 8 minutes from now
    
    render(
      <SessionReminderBanner
        sessionTime={sessionTime}
        sessionId="test-session"
        therapistName="Dr. Test"
        sessionType="therapy"
      />
    );

    const joinButton = screen.getByRole('button', { name: /join early/i });
    fireEvent.click(joinButton);

    expect(window.location.href).toBe('/session/test-session');
  });

  it('updates time remaining in real-time', async () => {
    const sessionTime = new Date('2024-01-15T10:02:00.000Z'); // 2 minutes from now
    
    render(
      <SessionReminderBanner
        sessionTime={sessionTime}
        sessionId="test-session"
        therapistName="Dr. Test"
        sessionType="chemistry"
      />
    );

    expect(screen.getByText(/in 2 minutes/i)).toBeInTheDocument();

    // Advance time by 30 seconds
    vi.advanceTimersByTime(30 * 1000);

    await waitFor(() => {
      expect(screen.getByText(/in 1 minute/i)).toBeInTheDocument();
    });
  });

  it('does not render for past sessions', () => {
    const sessionTime = new Date('2024-01-15T09:00:00.000Z'); // 1 hour ago
    
    const { container } = render(
      <SessionReminderBanner
        sessionTime={sessionTime}
        sessionId="test-session"
        therapistName="Dr. Test"
        sessionType="chemistry"
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it('handles different session types correctly', () => {
    const sessionTime = new Date('2024-01-15T10:30:00.000Z'); // 30 minutes from now
    
    const { rerender } = render(
      <SessionReminderBanner
        sessionTime={sessionTime}
        sessionId="test-session"
        therapistName="Dr. Test"
        sessionType="chemistry"
      />
    );

    expect(screen.getByText(/chemistry call/i)).toBeInTheDocument();

    rerender(
      <SessionReminderBanner
        sessionTime={sessionTime}
        sessionId="test-session"
        therapistName="Dr. Test"
        sessionType="therapy"
      />
    );

    expect(screen.getByText(/therapy session/i)).toBeInTheDocument();
  });

  it('applies correct CSS classes for different urgency levels', () => {
    const immediateSessionTime = new Date('2024-01-15T10:03:00.000Z'); // 3 minutes from now
    
    const { container, rerender } = render(
      <SessionReminderBanner
        sessionTime={immediateSessionTime}
        sessionId="test-session"
        therapistName="Dr. Test"
        sessionType="chemistry"
      />
    );

    // Check immediate styling (should have animate-pulse)
    expect(container.querySelector('.animate-pulse')).toBeInTheDocument();

    const urgentSessionTime = new Date('2024-01-15T10:08:00.000Z'); // 8 minutes from now
    
    rerender(
      <SessionReminderBanner
        sessionTime={urgentSessionTime}
        sessionId="test-session"
        therapistName="Dr. Test"
        sessionType="chemistry"
      />
    );

    // Check urgent styling (no animate-pulse)
    expect(container.querySelector('.animate-pulse')).not.toBeInTheDocument();
  });
});
