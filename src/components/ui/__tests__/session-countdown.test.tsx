import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SessionCountdown } from '../session-countdown';

// Mock the current time for consistent testing
const mockDate = new Date('2024-01-15T10:00:00.000Z');

describe('SessionCountdown', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(mockDate);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('displays countdown for future session', () => {
    const sessionTime = new Date('2024-01-15T11:00:00.000Z'); // 1 hour from now
    
    render(
      <SessionCountdown
        sessionTime={sessionTime}
        sessionId="test-session"
        therapistName="Dr. Test"
      />
    );

    expect(screen.getByText('in 1 hour')).toBeInTheDocument();
    expect(screen.getByText('Scheduled')).toBeInTheDocument();
    expect(screen.getByText('11:00 AM')).toBeInTheDocument();
  });

  it('displays minutes countdown for near-future session', () => {
    const sessionTime = new Date('2024-01-15T10:30:00.000Z'); // 30 minutes from now
    
    render(
      <SessionCountdown
        sessionTime={sessionTime}
        sessionId="test-session"
        therapistName="Dr. Test"
      />
    );

    expect(screen.getByText('in 30 minutes')).toBeInTheDocument();
    expect(screen.getByText('Scheduled')).toBeInTheDocument();
  });

  it('shows JOIN NOW button within 10 minutes of session start', () => {
    const sessionTime = new Date('2024-01-15T10:05:00.000Z'); // 5 minutes from now
    
    render(
      <SessionCountdown
        sessionTime={sessionTime}
        sessionId="test-session"
        therapistName="Dr. Test"
      />
    );

    expect(screen.getByText('in 5 minutes')).toBeInTheDocument();
    expect(screen.getByText('Starting Soon')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /join therapy session with dr\. test/i })).toBeInTheDocument();
    expect(screen.getByText('JOIN NOW')).toBeInTheDocument();
  });

  it('shows Join Session button when session time has arrived', () => {
    const sessionTime = new Date('2024-01-15T09:55:00.000Z'); // 5 minutes ago
    
    render(
      <SessionCountdown
        sessionTime={sessionTime}
        sessionId="test-session"
        therapistName="Dr. Test"
      />
    );

    expect(screen.getByText('Session time')).toBeInTheDocument();
    expect(screen.getByText('Live Now')).toBeInTheDocument();
    expect(screen.getByText('Join Session')).toBeInTheDocument();
  });

  it('updates countdown in real-time', async () => {
    const sessionTime = new Date('2024-01-15T10:02:00.000Z'); // 2 minutes from now
    
    render(
      <SessionCountdown
        sessionTime={sessionTime}
        sessionId="test-session"
        therapistName="Dr. Test"
      />
    );

    expect(screen.getByText('in 2 minutes')).toBeInTheDocument();

    // Advance time by 1 minute
    vi.advanceTimersByTime(60 * 1000);

    await waitFor(() => {
      expect(screen.getByText('in 1 minute')).toBeInTheDocument();
    });
  });

  it('calls onJoinSession when join button is clicked', () => {
    const mockOnJoinSession = vi.fn();
    const sessionTime = new Date('2024-01-15T10:05:00.000Z'); // 5 minutes from now
    
    render(
      <SessionCountdown
        sessionTime={sessionTime}
        sessionId="test-session"
        therapistName="Dr. Test"
        onJoinSession={mockOnJoinSession}
      />
    );

    const joinButton = screen.getByRole('button', { name: /join therapy session with dr\. test/i });
    fireEvent.click(joinButton);

    expect(mockOnJoinSession).toHaveBeenCalledWith('test-session');
  });

  it('navigates to session room when no onJoinSession provided', () => {
    // Mock window.location.href
    delete (window as any).location;
    window.location = { href: '' } as any;

    const sessionTime = new Date('2024-01-15T10:05:00.000Z'); // 5 minutes from now
    
    render(
      <SessionCountdown
        sessionTime={sessionTime}
        sessionId="test-session"
        therapistName="Dr. Test"
      />
    );

    const joinButton = screen.getByRole('button', { name: /join therapy session with dr\. test/i });
    fireEvent.click(joinButton);

    expect(window.location.href).toBe('/session/test-session');
  });

  it('handles singular vs plural time units correctly', () => {
    const sessionTime = new Date('2024-01-15T10:01:00.000Z'); // 1 minute from now
    
    render(
      <SessionCountdown
        sessionTime={sessionTime}
        sessionId="test-session"
        therapistName="Dr. Test"
      />
    );

    expect(screen.getByText('in 1 minute')).toBeInTheDocument();
  });

  it('displays days countdown for far future sessions', () => {
    const sessionTime = new Date('2024-01-17T10:00:00.000Z'); // 2 days from now
    
    render(
      <SessionCountdown
        sessionTime={sessionTime}
        sessionId="test-session"
        therapistName="Dr. Test"
      />
    );

    expect(screen.getByText('in 2 days')).toBeInTheDocument();
    expect(screen.getByText('Scheduled')).toBeInTheDocument();
  });

  it('applies pulsing animation to urgent JOIN NOW button', () => {
    const sessionTime = new Date('2024-01-15T10:05:00.000Z'); // 5 minutes from now
    
    render(
      <SessionCountdown
        sessionTime={sessionTime}
        sessionId="test-session"
        therapistName="Dr. Test"
      />
    );

    const joinButton = screen.getByRole('button', { name: /join therapy session with dr\. test/i });
    expect(joinButton).toHaveClass('animate-pulse');
  });
});
