import type { Meta, StoryObj } from '@storybook/react-vite';
import { BrowserRouter } from 'react-router-dom';
import TherapistDashboard from '../pages/therapist/Dashboard';

const meta: Meta<typeof TherapistDashboard> = {
  title: 'Therapist/Dashboard',
  component: TherapistDashboard,
  parameters: {
    layout: 'fullscreen',
    chromatic: {
      viewports: [375, 768, 1440],
      delay: 300
    }
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <div className="min-h-screen bg-[var(--warm-white)]">
          <Story />
        </div>
      </BrowserRouter>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TherapistDashboard>;

// Test default dashboard state
export const Default: Story = {
  parameters: {
    chromatic: { 
      viewports: [375, 768, 1440],
      delay: 300 
    }
  }
};

// Test with urgent notifications
export const WithUrgentNotifications: Story = {
  parameters: {
    mockData: {
      notifications: [
        { 
          type: 'urgent', 
          message: 'Client J.D. needs immediate attention - crisis situation',
          priority: 'high',
          timestamp: '2 minutes ago'
        },
        { 
          type: 'payment', 
          message: 'Payment failed for session with M.S.',
          priority: 'medium',
          timestamp: '15 minutes ago'
        }
      ]
    },
    chromatic: { 
      viewports: [375, 768, 1440],
      delay: 300 
    }
  }
};

// Test high traffic day with many appointments
export const HighTrafficDay: Story = {
  parameters: {
    mockData: {
      appointments: [
        { 
          id: "1",
          clientName: "J.D.", 
          type: "Chemistry Call", 
          time: "9:00 AM", 
          duration: "15 min", 
          status: "confirmed", 
          priority: "high", 
          clientProgress: 75 
        },
        { 
          id: "2", 
          clientName: "M.S.", 
          type: "Therapy Session", 
          time: "10:00 AM", 
          duration: "60 min", 
          status: "confirmed", 
          priority: "medium", 
          clientProgress: 60 
        },
        { 
          id: "3", 
          clientName: "A.R.", 
          type: "Therapy Session", 
          time: "2:00 PM", 
          duration: "60 min", 
          status: "confirmed", 
          priority: "medium", 
          clientProgress: 45 
        },
        { 
          id: "4", 
          clientName: "K.L.", 
          type: "Chemistry Call", 
          time: "4:00 PM", 
          duration: "15 min", 
          status: "confirmed", 
          priority: "low", 
          clientProgress: 30 
        }
      ],
      stats: {
        totalClients: 25,
        activeClients: 18,
        monthlyEarnings: 2850,
        sessionCount: 45,
        rating: 4.8
      }
    },
    chromatic: { 
      viewports: [375, 768, 1440],
      delay: 300 
    }
  }
};

// Test responsive breakpoints
export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile' },
    chromatic: { 
      viewports: [375],
      delay: 300 
    }
  }
};

export const Tablet: Story = {
  parameters: {
    viewport: { defaultViewport: 'tablet' },
    chromatic: { 
      viewports: [768],
      delay: 300 
    }
  }
};

export const Desktop: Story = {
  parameters: {
    viewport: { defaultViewport: 'desktop' },
    chromatic: { 
      viewports: [1440],
      delay: 300 
    }
  }
};

// Test with empty state
export const EmptyState: Story = {
  parameters: {
    mockData: {
      appointments: [],
      notifications: [],
      stats: {
        totalClients: 0,
        activeClients: 0,
        monthlyEarnings: 0,
        sessionCount: 0,
        rating: 0
      }
    },
    chromatic: { 
      viewports: [375, 768, 1440],
      delay: 300 
    }
  }
};

// Test with mixed appointment statuses
export const MixedAppointmentStatuses: Story = {
  parameters: {
    mockData: {
      appointments: [
        { 
          id: "1",
          clientName: "J.D.", 
          type: "Chemistry Call", 
          time: "9:00 AM", 
          duration: "15 min", 
          status: "confirmed", 
          priority: "high", 
          clientProgress: 75 
        },
        { 
          id: "2", 
          clientName: "M.S.", 
          type: "Therapy Session", 
          time: "10:00 AM", 
          duration: "60 min", 
          status: "cancelled", 
          priority: "medium", 
          clientProgress: 60 
        },
        { 
          id: "3", 
          clientName: "A.R.", 
          type: "Therapy Session", 
          time: "2:00 PM", 
          duration: "60 min", 
          status: "rescheduled", 
          priority: "medium", 
          clientProgress: 45 
        },
        { 
          id: "4", 
          clientName: "K.L.", 
          type: "Chemistry Call", 
          time: "4:00 PM", 
          duration: "15 min", 
          status: "completed", 
          priority: "low", 
          clientProgress: 30 
        }
      ]
    },
    chromatic: { 
      viewports: [375, 768, 1440],
      delay: 300 
    }
  }
};
