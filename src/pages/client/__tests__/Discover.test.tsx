import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Discover from '@/pages/client/Discover';
import { vi } from 'vitest';
import * as matching from '@/lib/matching';

// Mock the matching function
vi.mock('@/lib/matching', async () => {
    const original = await vi.importActual('@/lib/matching');
    return {
        ...original,
        getRankedTherapistProfiles: vi.fn(() => Promise.resolve([
            {
                id: '1',
                name: 'Dr. Sarah Chen',
                title: 'Licensed Therapist',
                specialties: ['Anxiety'],
                personality: ['Warm'],
                languages: ['English'],
                rate: '£100/session',
                rating: 4.9,
                quote: 'A quote from Dr. Chen.',
                media: [{ type: 'image', url: 'image.jpg' }],
                location: 'London, UK',
                compatibility_score: 95,
                years_experience: 10,
                modalities: ['CBT'],
            }
        ])),
    };
});

describe('Discover Page', () => {
  it('renders the page without crashing', async () => {
    render(
      <MemoryRouter>
        <Discover />
      </MemoryRouter>
    );
    // Check for a stable element that should be present on the page
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('displays the therapist name', async () => {
    render(
      <MemoryRouter>
        <Discover />
      </MemoryRouter>
    );
    await waitFor(() => {
        expect(screen.getByText('Dr. Sarah Chen')).toBeInTheDocument();
    });
  });
});
