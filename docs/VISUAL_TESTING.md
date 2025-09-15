# Visual Testing Documentation

This document explains how to use the visual testing setup for MindFolk's therapist components.

## Overview

We use three main tools for visual testing:

1. **Storybook** - Component development and documentation
2. **Chromatic** - Visual regression testing
3. **Playwright** - E2E testing with screenshots

## Getting Started

### 1. Run Storybook Locally

```bash
npm run storybook
```

This starts Storybook on `http://localhost:6006` where you can:
- View all component stories
- Test different states and props
- Check accessibility compliance
- Test responsive breakpoints

### 2. Run Visual Tests

```bash
# Run Playwright visual tests
npm run test:visual

# Update visual snapshots
npm run test:visual:update

# Run tests with UI
npm run test:visual:ui
```

### 3. Run Chromatic Tests

```bash
# Run Chromatic visual regression tests
npm run chromatic
```

## Story Organization

### Therapist Stories

- **TherapistOnboarding.stories.tsx** - Tests all 6 onboarding steps
- **TherapistDashboard.stories.tsx** - Tests dashboard states and responsive breakpoints
- **StyleGuide.stories.tsx** - Tests design system components

### Story Types

Each story tests different scenarios:

- **Default** - Basic component state
- **With Data** - Component with sample data
- **Responsive** - Different viewport sizes
- **Error States** - Error handling and edge cases
- **Accessibility** - WCAG 2.1 AA compliance

## Visual Testing Features

### 1. Responsive Testing

All stories test three breakpoints:
- **Mobile**: 375px × 667px
- **Tablet**: 768px × 1024px  
- **Desktop**: 1440px × 900px

### 2. Style Guide Compliance

Stories validate:
- Color tokens from Style Guide 2.3
- Typography hierarchy
- Touch target sizes (44px min, 56px comfort)
- Border radius consistency
- Spacing tokens

### 3. Accessibility Testing

Automatic checks for:
- Color contrast ratios (WCAG 2.1 AA)
- Keyboard navigation
- Focus indicators
- Screen reader compatibility

### 4. Visual Regression Detection

Chromatic automatically:
- Captures screenshots of all stories
- Compares against baseline images
- Flags any visual changes
- Provides diff visualization

## Writing New Stories

### Basic Story Structure

```typescript
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof YourComponent> = {
  title: 'Category/ComponentName',
  component: YourComponent,
  parameters: {
    layout: 'fullscreen',
    chromatic: {
      viewports: [375, 768, 1440],
      delay: 300
    }
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof YourComponent>;

export const Default: Story = {};

export const WithData: Story = {
  args: {
    // Component props
  }
};
```

### Testing Different States

```typescript
export const Loading: Story = {
  args: {
    loading: true
  }
};

export const Error: Story = {
  args: {
    error: 'Something went wrong'
  }
};

export const Empty: Story = {
  args: {
    items: []
  }
};
```

### Testing Interactions

```typescript
export const WithInteraction: Story = {
  play: async ({ canvasElement }) => {
    const button = canvasElement.querySelector('button');
    if (button) button.click();
    
    // Wait for animations
    await new Promise(resolve => setTimeout(resolve, 300));
  }
};
```

## CI/CD Integration

### GitHub Actions

The visual testing workflow runs on:
- Push to main/develop branches
- Pull requests

It includes:
- Chromatic visual regression tests
- Playwright E2E tests
- Accessibility compliance checks

### Chromatic Integration

1. Get your project token from Chromatic
2. Add it to GitHub Secrets as `CHROMATIC_PROJECT_TOKEN`
3. Push to trigger visual tests

### Review Process

1. **Visual Changes Detected**: Chromatic flags differences
2. **Review Diff**: Check if changes are intentional
3. **Approve Changes**: Accept new baseline images
4. **Merge PR**: Changes are approved and merged

## Best Practices

### 1. Story Naming

- Use descriptive names: `WithUrgentNotifications`
- Include state: `Loading`, `Error`, `Empty`
- Include viewport: `Mobile`, `Tablet`, `Desktop`

### 2. Visual Testing

- Test all component states
- Include error and loading states
- Test responsive breakpoints
- Validate accessibility

### 3. Performance

- Use `delay` parameter for animations
- Avoid unnecessary re-renders
- Keep stories focused and fast

### 4. Maintenance

- Update snapshots when designs change
- Review Chromatic diffs carefully
- Keep stories up to date with components

## Troubleshooting

### Common Issues

1. **Screenshots don't match**: Check for animations or dynamic content
2. **Tests fail**: Ensure dev server is running
3. **Chromatic fails**: Check project token and network

### Debug Commands

```bash
# Debug Playwright tests
npx playwright test --debug

# Debug Storybook
npm run storybook -- --debug

# Check Chromatic status
npx chromatic --dry-run
```

## Resources

- [Storybook Documentation](https://storybook.js.org/docs)
- [Chromatic Documentation](https://www.chromatic.com/docs)
- [Playwright Documentation](https://playwright.dev/docs)
- [Style Guide 2.3](./STYLE_GUIDE.md)
