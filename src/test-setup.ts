import '@testing-library/jest-dom';

// Mock CSS custom properties for tests
Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
    getPropertyValue: (prop: string) => {
      // Mock design token values for tests
      const tokens: Record<string, string> = {
        '--garden-green': '#497557',
        '--text-primary': '#466749',
        '--text-secondary': '#6B7280',
        '--text-muted': '#6B7280',
        '--btn-primary-text': '#FFFFFF',
        '--border': '#E5E7EB',
        '--surface-accent': '#E8F0E9',
        '--error-bg': '#fcbaaa',
        '--error-text': '#20323A',
        '--info-bg': '#3B674D',
        '--info-text': '#FFFFFF',
        '--touch-target-min': '44px',
      };
      return tokens[prop] || '';
    },
  }),
});

// Mock window.location for navigation tests
delete (window as any).location;
window.location = {
  href: '',
  assign: vi.fn(),
  replace: vi.fn(),
  reload: vi.fn(),
} as any;

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));
