# 📸 Screenshot Capture System

A comprehensive screenshot capture system for the MindFolk app that can capture screenshots of every screen across different device types.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- The app running on `http://localhost:5173`

### Command Line Usage

```bash
# Capture desktop screenshots (default)
npm run screenshots

# Capture mobile screenshots (375x667)
npm run screenshots:mobile

# Capture tablet screenshots (768x1024)
npm run screenshots:tablet

# Capture all device types
npm run screenshots:all
```

### Web Interface Usage

1. Start the app: `npm run dev`
2. Navigate to: `http://localhost:5173/dev/screenshots`
3. Use the web interface to capture screenshots interactively

## 📁 Output Structure

```
screenshots/
├── desktop/
│   ├── landing-page.png
│   ├── therapist-landing.png
│   ├── client-assessment.png
│   └── ...
├── mobile/
│   ├── landing-page-mobile.png
│   ├── therapist-landing-mobile.png
│   └── ...
└── tablet/
    ├── landing-page-tablet.png
    ├── therapist-landing-tablet.png
    └── ...
```

## 🎯 What Gets Captured

### Public Routes
- Landing Page (`/`)
- Therapist Landing (`/therapist`)
- Sign In (`/sign-in`)
- Sign Up (`/sign-up`)

### Client Routes
- Assessment (`/assessment`)
- Discover Therapists (`/discover`)
- Favorites (`/favorites`)
- Appointments (`/appointments`)
- Messages (`/messages`)
- Account (`/account`)
- Billing (`/billing`)

### Therapist Routes
- Onboarding (`/t/onboarding`)
- Dashboard (`/t/dashboard`)
- Clients (`/t/clients`)
- Bookings (`/t/bookings`)
- Messages (`/t/messages`)
- Analytics (`/t/analytics`)
- Earnings (`/t/earnings`)
- Profile (`/t/profile`)
- Tasks (`/t/tasks`)

### Admin Routes
- Overview (`/admin/overview`)
- Users (`/admin/users`)
- Therapists (`/admin/therapists`)

## ⚙️ Configuration

### Device Configurations

| Device | Resolution | Full Page | Quality |
|--------|------------|-----------|---------|
| Desktop | 1280x720 | Yes | 90% |
| Tablet | 768x1024 | Yes | 90% |
| Mobile | 375x667 | No | 90% |

### Custom Configuration

You can customize the capture process by modifying `src/utils/screenshot-capture.ts`:

```typescript
// Custom route configuration
const customRoutes: RouteConfig[] = [
  {
    path: '/custom-page',
    name: 'Custom Page',
    waitFor: '.custom-element', // Wait for specific element
    delay: 1000, // Additional delay in ms
    viewport: { width: 1920, height: 1080 } // Custom viewport
  }
];

// Custom screenshot configuration
const customConfig: ScreenshotConfig = {
  fullPage: true,
  quality: 95,
  format: 'jpeg'
};
```

## 🔧 Advanced Usage

### Programmatic Usage

```typescript
import { ScreenshotCapture, MIND_FOLK_ROUTES } from '@/utils/screenshot-capture';

const capture = new ScreenshotCapture('http://localhost:5173');
await capture.initialize();

// Capture single route
const screenshot = await capture.captureRoute({
  path: '/dashboard',
  name: 'Dashboard',
  waitFor: 'main'
});

// Capture all routes
const screenshots = await capture.captureAllRoutes(MIND_FOLK_ROUTES);
await capture.saveScreenshots(screenshots, './output');

await capture.close();
```

### Web Component Usage

```tsx
import { ScreenshotCapture } from '@/components/dev/screenshot-capture';

function MyComponent() {
  return (
    <div>
      <ScreenshotCapture />
    </div>
  );
}
```

## 🛠️ Troubleshooting

### Common Issues

1. **App not running**: Make sure the app is running on `http://localhost:5173`
2. **Permission errors**: Ensure the output directory is writable
3. **Timeout errors**: Some pages might take longer to load, increase timeout in configuration
4. **Missing elements**: Check if the `waitFor` selector exists on the page

### Debug Mode

Enable debug mode by setting environment variable:

```bash
DEBUG=true npm run screenshots
```

### Manual Testing

Test individual routes manually:

```bash
# Test specific route
node scripts/capture-screenshots.js desktop http://localhost:5173 ./test-output
```

## 📊 Use Cases

### Documentation
- Create visual documentation of all app screens
- Generate screenshots for user guides
- Document UI changes over time

### Testing
- Visual regression testing
- Cross-browser compatibility testing
- Responsive design validation

### Design Review
- Present designs to stakeholders
- Compare different design iterations
- Create design system documentation

### Marketing
- Generate screenshots for app store listings
- Create promotional materials
- Social media content

## 🔄 Automation

### CI/CD Integration

Add to your CI pipeline:

```yaml
# GitHub Actions example
- name: Capture Screenshots
  run: |
    npm run dev &
    sleep 10
    npm run screenshots:all
  env:
    CI: true
```

### Scheduled Captures

Set up automated captures:

```bash
# Daily screenshot capture
0 9 * * * cd /path/to/app && npm run screenshots:all
```

## 📝 Notes

- Screenshots are captured in PNG format by default
- Mobile screenshots use viewport height (not full page)
- The system waits for network idle before capturing
- Failed captures are logged but don't stop the process
- All routes are captured sequentially to avoid overwhelming the server

## 🤝 Contributing

To add new routes or modify existing ones:

1. Update `MIND_FOLK_ROUTES` in `src/utils/screenshot-capture.ts`
2. Add appropriate `waitFor` selectors
3. Test the new routes
4. Update this documentation
