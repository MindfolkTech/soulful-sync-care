import type { Meta, StoryObj } from '@storybook/react-vite';
import { BrowserRouter } from 'react-router-dom';
import TherapistOnboarding from '../pages/therapist/Onboarding';

const meta: Meta<typeof TherapistOnboarding> = {
  title: 'Therapist/Onboarding Flow',
  component: TherapistOnboarding,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '375px', height: '667px' } },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop', styles: { width: '1440px', height: '900px' } }
      }
    },
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
type Story = StoryObj<typeof TherapistOnboarding>;

// Test each onboarding step with different states
export const Step1_Welcome: Story = {
  parameters: {
    chromatic: { 
      viewports: [375, 768, 1440],
      delay: 300 
    }
  }
};

export const Step2_Credentials: Story = {
  play: async ({ canvasElement }) => {
    // Simulate navigation to step 2
    const buttons = canvasElement.querySelectorAll('button');
    const nextButton = Array.from(buttons).find(btn => btn.textContent?.includes('Continue'));
    if (nextButton) nextButton.click();
  },
  parameters: {
    chromatic: { 
      viewports: [375, 768, 1440],
      delay: 300 
    }
  }
};

export const Step3_TherapeuticApproach: Story = {
  play: async ({ canvasElement }) => {
    // Navigate to step 3
    const buttons = canvasElement.querySelectorAll('button');
    const nextButton = Array.from(buttons).find(btn => btn.textContent?.includes('Continue'));
    if (nextButton) {
      nextButton.click();
      await new Promise(resolve => setTimeout(resolve, 100));
      nextButton.click();
    }
  },
  parameters: {
    chromatic: { 
      viewports: [375, 768, 1440],
      delay: 300 
    }
  }
};

export const Step4_ProfileContent: Story = {
  play: async ({ canvasElement }) => {
    // Navigate to step 4
    for (let i = 0; i < 3; i++) {
      const buttons = canvasElement.querySelectorAll('button');
      const nextButton = Array.from(buttons).find(btn => btn.textContent?.includes('Continue'));
      if (nextButton) nextButton.click();
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  },
  parameters: {
    chromatic: { 
      viewports: [375, 768, 1440],
      delay: 300 
    }
  }
};

export const Step5_VideoIntroduction: Story = {
  play: async ({ canvasElement }) => {
    // Navigate to step 5
    for (let i = 0; i < 4; i++) {
      const buttons = canvasElement.querySelectorAll('button');
      const nextButton = Array.from(buttons).find(btn => btn.textContent?.includes('Continue'));
      if (nextButton) nextButton.click();
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  },
  parameters: {
    chromatic: { 
      viewports: [375, 768, 1440],
      delay: 300 
    }
  }
};

export const Step6_Verification: Story = {
  play: async ({ canvasElement }) => {
    // Navigate to step 6
    for (let i = 0; i < 5; i++) {
      const buttons = canvasElement.querySelectorAll('button');
      const nextButton = Array.from(buttons).find(btn => btn.textContent?.includes('Continue'));
      if (nextButton) nextButton.click();
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  },
  parameters: {
    chromatic: { 
      viewports: [375, 768, 1440],
      delay: 300 
    }
  }
};

// Test with live preview enabled
export const WithLivePreview: Story = {
  play: async ({ canvasElement }) => {
    // Enable preview toggle
    const previewButton = canvasElement.querySelector('button[aria-label*="preview"]');
    if (previewButton) (previewButton as any).click();
  },
  parameters: {
    viewport: { defaultViewport: 'desktop' },
    chromatic: { 
      viewports: [1440],
      delay: 500 
    }
  }
};

// Test with form partially filled
export const WithPartialData: Story = {
  play: async ({ canvasElement }) => {
    // Navigate to step 2 and fill some data
    const buttons = canvasElement.querySelectorAll('button');
    const nextButton = Array.from(buttons).find(btn => btn.textContent?.includes('Continue'));
    if (nextButton) nextButton.click();
    
    // Fill form fields
    const firstNameInput = canvasElement.querySelector('input[id="firstName"]');
    const lastNameInput = canvasElement.querySelector('input[id="lastName"]');
    const titleInput = canvasElement.querySelector('input[id="title"]');
    
    if (firstNameInput) (firstNameInput as any).value = 'Sarah';
    if (lastNameInput) (lastNameInput as any).value = 'Chen';
    if (titleInput) (titleInput as any).value = 'Clinical Psychologist';
    
    // Trigger change events
    [firstNameInput, lastNameInput, titleInput].forEach(input => {
      if (input) (input as any).dispatchEvent(new Event('change', { bubbles: true }));
    });
  },
  parameters: {
    chromatic: { 
      viewports: [375, 768, 1440],
      delay: 500 
    }
  }
};

// Test progress saving indicator
export const WithProgressSaving: Story = {
  play: async ({ canvasElement }) => {
    // Fill form to trigger auto-save
    const buttons = canvasElement.querySelectorAll('button');
    const nextButton = Array.from(buttons).find(btn => btn.textContent?.includes('Continue'));
    if (nextButton) nextButton.click();
    
    const firstNameInput = canvasElement.querySelector('input[id="firstName"]');
    if (firstNameInput) {
      (firstNameInput as any).value = 'Dr. Sarah';
      (firstNameInput as any).dispatchEvent(new Event('change', { bubbles: true }));
    }
    
    // Wait for save indicator
    await new Promise(resolve => setTimeout(resolve, 1500));
  },
  parameters: {
    chromatic: { 
      viewports: [375, 768, 1440],
      delay: 2000 
    }
  }
};
