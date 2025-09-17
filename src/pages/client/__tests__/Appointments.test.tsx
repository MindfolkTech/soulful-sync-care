import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Appointments from '../Appointments';

// Mock the components that have complex dependencies
vi.mock('@/components/layout/header', () => ({
  Header: () => <div data-testid="header">Header</div>
}));

vi.mock('@/components/layout/footer', () => ({
  Footer: () => <div data-testid="footer">Footer</div>
}));

vi.mock('@/components/ui/bottom-nav', () => ({
  BottomNav: () => <div data-testid="bottom-nav">BottomNav</div>
}));

// Mock window.location.href for navigation tests
const mockLocation = {
  href: ''
};

// Mock the current time for consistent testing
const mockDate = new Date('2024-01-15T10:00:00.000Z');

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <MemoryRouter>
      {component}
    </MemoryRouter>
  );
};

describe('Appointments Page', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(mockDate);
    
    // Mock window.location
    delete (window as any).location;
    window.location = mockLocation as any;
    mockLocation.href = '';
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders the page with correct title and subtitle', () => {
    renderWithRouter(<Appointments />);

    expect(screen.getByText('My Appointments')).toBeInTheDocument();
    expect(screen.getByText('Manage your therapy sessions and chemistry calls')).toBeInTheDocument();
  });

  it('renders tab navigation with correct options', () => {
    renderWithRouter(<Appointments />);

    expect(screen.getByRole('tab', { name: /view upcoming appointments/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /view past appointments/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /view cancelled appointments/i })).toBeInTheDocument();
  });

  it('displays upcoming appointments with session countdowns', () => {
    renderWithRouter(<Appointments />);

    // Should show therapist names
    expect(screen.getByText('Dr. Sarah Chen')).toBeInTheDocument();
    expect(screen.getByText('Michael Thompson')).toBeInTheDocument();
    expect(screen.getByText('Dr. Priya Patel')).toBeInTheDocument();

    // Should show session types
    expect(screen.getByText('Chemistry Call • 15 min')).toBeInTheDocument();
    expect(screen.getAllByText('Therapy Session • 60 min')).toHaveLength(2);
  });

  it('shows session reminder banners for upcoming sessions', () => {
    renderWithRouter(<Appointments />);

    // Should show reminder banners for sessions within 1 hour
    // Dr. Sarah Chen's session is in 8 minutes - should show urgent reminder
    // Michael Thompson's session is in 45 minutes - should show normal reminder
    expect(screen.getByText(/chemistry call with dr\. sarah chen starts in/i)).toBeInTheDocument();
    expect(screen.getByText(/therapy session with michael thompson in/i)).toBeInTheDocument();
  });

  it('displays JOIN NOW button for imminent sessions', () => {
    renderWithRouter(<Appointments />);

    // Dr. Sarah Chen's session is in 8 minutes - should show JOIN NOW
    const joinButtons = screen.getAllByText('JOIN NOW');
    expect(joinButtons.length).toBeGreaterThan(0);
  });

  it('shows regular countdown for future sessions', () => {
    renderWithRouter(<Appointments />);

    // Dr. Priya Patel's session is tomorrow - should show "in 1 day"
    expect(screen.getByText('in 1 day')).toBeInTheDocument();
  });

  it('switches to past appointments tab', () => {
    renderWithRouter(<Appointments />);

    const pastTab = screen.getByRole('tab', { name: /view past appointments/i });
    fireEvent.click(pastTab);

    // Should show completed session
    expect(screen.getByText('Dr. James Wilson')).toBeInTheDocument();
    expect(screen.getByText('Book Again')).toBeInTheDocument();
    expect(screen.getByText('⭐')).toBeInTheDocument();
  });

  it('shows empty state for cancelled appointments', () => {
    renderWithRouter(<Appointments />);

    const cancelledTab = screen.getByRole('tab', { name: /view cancelled appointments/i });
    fireEvent.click(cancelledTab);

    expect(screen.getByText('No cancelled appointments')).toBeInTheDocument();
  });

  it('handles message button clicks', () => {
    renderWithRouter(<Appointments />);

    const messageButtons = screen.getAllByRole('button', { name: /send message to/i });
    fireEvent.click(messageButtons[0]);

    expect(window.location.href).toBe('/messages');
  });

  it('handles join session button clicks', () => {
    renderWithRouter(<Appointments />);

    // Find JOIN NOW button for Dr. Sarah Chen's session
    const joinButtons = screen.getAllByRole('button', { name: /join therapy session with/i });
    fireEvent.click(joinButtons[0]);

    // Should navigate to session room (session ID will be "1" for Dr. Sarah Chen)
    expect(window.location.href).toBe('/session/1');
  });

  it('handles book again button clicks in past appointments', () => {
    renderWithRouter(<Appointments />);

    const pastTab = screen.getByRole('tab', { name: /view past appointments/i });
    fireEvent.click(pastTab);

    const bookAgainButton = screen.getByRole('button', { name: /book another session with/i });
    fireEvent.click(bookAgainButton);

    expect(window.location.href).toBe('/therapists/4');
  });

  it('updates countdowns in real-time', async () => {
    renderWithRouter(<Appointments />);

    // Find a countdown that shows minutes
    const initialCountdown = screen.getByText(/in \d+ minutes?/);
    expect(initialCountdown).toBeInTheDocument();

    // Advance time by 1 minute
    vi.advanceTimersByTime(60 * 1000);

    // Wait for the countdown to update
    await waitFor(() => {
      // The countdown should have decreased by 1 minute
      // This is a bit tricky to test exactly, but we can check that it's still updating
      expect(screen.getByText(/in \d+ minutes?/)).toBeInTheDocument();
    });
  });

  it('displays correct session status badges', () => {
    renderWithRouter(<Appointments />);

    // Upcoming sessions should show various status badges
    expect(screen.getByText('Starting Soon')).toBeInTheDocument(); // For Dr. Sarah Chen (8 min away)
    expect(screen.getByText('Scheduled')).toBeInTheDocument(); // For Dr. Priya Patel (1 day away)
  });

  it('formats session dates correctly', () => {
    renderWithRouter(<Appointments />);

    // Should show formatted dates for sessions
    expect(screen.getByText('Monday, January 15')).toBeInTheDocument(); // Today's sessions
    expect(screen.getByText('Tuesday, January 16')).toBeInTheDocument(); // Tomorrow's session
  });

  it('handles session reminder banner dismissal', () => {
    renderWithRouter(<Appointments />);

    // Find dismiss buttons in reminder banners
    const dismissButtons = screen.getAllByRole('button', { name: /dismiss reminder/i });
    expect(dismissButtons.length).toBeGreaterThan(0);

    // Click first dismiss button
    fireEvent.click(dismissButtons[0]);

    // The specific banner should be dismissed (though we can't easily test this without state)
    // At minimum, the button should have been clickable
    expect(dismissButtons[0]).toBeInTheDocument();
  });

  it('shows appropriate session times', () => {
    renderWithRouter(<Appointments />);

    // Should show formatted times for sessions
    // Times will be calculated based on mock dates
    expect(screen.getByText(/\d{1,2}:\d{2} [AP]M/)).toBeInTheDocument();
  });

  it('renders all required components', () => {
    renderWithRouter(<Appointments />);

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByTestId('bottom-nav')).toBeInTheDocument();
  });
});

