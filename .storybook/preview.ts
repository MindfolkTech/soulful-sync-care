import type { Preview } from '@storybook/react';
import React from 'react';
import '../src/index.css';

const preview: Preview = {
  parameters: {
    // Global parameters
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // Viewport configuration for responsive testing
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1440px',
            height: '900px',
          },
        },
      },
    },
    // Chromatic configuration for visual testing
    chromatic: {
      viewports: [375, 768, 1440],
      delay: 300,
      diffThreshold: 0.2,
      threshold: 0.2,
    },
    // Accessibility testing configuration
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
            options: { level: 'AA' }, // WCAG 2.1 AA compliance
          },
          {
            id: 'focus-order-semantics',
            enabled: true,
          },
          {
            id: 'keyboard-navigation',
            enabled: true,
          },
        ],
      },
    },
    // Background configuration
    backgrounds: {
      default: 'warm-white',
      values: [
        {
          name: 'warm-white',
          value: 'var(--warm-white)',
        },
        {
          name: 'surface',
          value: 'var(--surface)',
        },
        {
          name: 'surface-accent',
          value: 'var(--surface-accent)',
        },
      ],
    },
  },
  // Global decorators
  decorators: [
    (Story) => React.createElement('div', { 
      className: 'min-h-screen bg-[var(--warm-white)]' 
    }, React.createElement(Story)),
  ],
};

export default preview;