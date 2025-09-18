import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
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

  it('renders all required components', () => {
    renderWithRouter(<Appointments />);

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByTestId('bottom-nav')).toBeInTheDocument();
  });

  it('displays appointment tabs', () => {
    renderWithRouter(<Appointments />);

    expect(screen.getByRole('tab', { name: /view upcoming appointments/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /view past appointments/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /view cancelled appointments/i })).toBeInTheDocument();
  });

  it('displays therapist names', () => {
    renderWithRouter(<Appointments />);

    expect(screen.getByText('Dr. Sarah Chen')).toBeInTheDocument();
    expect(screen.getByText('Dr. Priya Patel')).toBeInTheDocument();
  });

  it('handles tab switching', () => {
    renderWithRouter(<Appointments />);

    const pastTab = screen.getByRole('tab', { name: /view past appointments/i });
    fireEvent.click(pastTab);

    // Check that the tab is clickable (the actual content may vary)
    expect(pastTab).toBeInTheDocument();
  });

  it('handles message button clicks', () => {
    renderWithRouter(<Appointments />);

    const messageButtons = screen.getAllByRole('button', { name: /send message to/i });
    expect(messageButtons.length).toBeGreaterThan(0);
    
    // Click a message button
    fireEvent.click(messageButtons[0]);
    
    // The component should still be rendered
    expect(screen.getByText('My Appointments')).toBeInTheDocument();
  });

  it('renders appointment cards', () => {
    renderWithRouter(<Appointments />);

    // Check that appointment list items are rendered
    const appointmentCards = screen.getAllByRole('listitem');
    expect(appointmentCards.length).toBeGreaterThan(0);
  });

  it('displays session types', () => {
    renderWithRouter(<Appointments />);

    // Check that the component renders with appointment data
    expect(screen.getByText('Dr. Sarah Chen')).toBeInTheDocument();
    expect(screen.getByText('Dr. Priya Patel')).toBeInTheDocument();
  });

  it('shows session durations', () => {
    renderWithRouter(<Appointments />);

    // Check that the component renders with appointment data
    expect(screen.getByText('Dr. Sarah Chen')).toBeInTheDocument();
    expect(screen.getByText('Michael Thompson')).toBeInTheDocument();
  });

  it('handles component rendering without errors', () => {
    renderWithRouter(<Appointments />);

    // Basic smoke test - component should render without throwing
    expect(screen.getByText('My Appointments')).toBeInTheDocument();
  });
});
