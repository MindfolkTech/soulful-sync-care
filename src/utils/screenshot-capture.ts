import { chromium } from 'playwright';
import type { Page } from 'playwright';

export interface ScreenshotConfig {
  width?: number;
  height?: number;
  fullPage?: boolean;
  quality?: number;
  format?: 'png' | 'jpeg';
}

export interface RouteConfig {
  path: string;
  name: string;
  waitFor?: string; // CSS selector to wait for
  delay?: number; // Additional delay in ms
  viewport?: { width: number; height: number };
}

export class ScreenshotCapture {
  private browser: Browser | null = null;
  private baseUrl: string;

  constructor(baseUrl: string = 'http://localhost:5173') {
    this.baseUrl = baseUrl;
  }

  /**
   * Set the base URL with smart port detection
   * @param baseUrl - The base URL to use
   */
  async setBaseUrl(baseUrl?: string): Promise<void> {
    if (baseUrl) {
      this.baseUrl = baseUrl;
    } else {
      // Import port detector dynamically to avoid circular dependencies
      const { getBaseUrl } = await import('./port-detector');
      this.baseUrl = await getBaseUrl('http://localhost:5173', { verbose: true });
    }
  }

  async initialize(): Promise<void> {
    this.browser = await chromium.launch({ 
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
  }

  async captureRoute(
    route: RouteConfig, 
    config: ScreenshotConfig = {}
  ): Promise<Buffer> {
    if (!this.browser) {
      throw new Error('Browser not initialized. Call initialize() first.');
    }

    const page = await this.browser.newPage();
    
    try {
      // Set viewport if specified
      if (route.viewport) {
        await page.setViewportSize(route.viewport);
      } else {
        await page.setViewportSize({ width: 1280, height: 720 });
      }

      // Navigate to the route
      await page.goto(`${this.baseUrl}${route.path}`, { 
        waitUntil: 'networkidle' 
      });

      // Wait for specific element if specified
      if (route.waitFor) {
        await page.waitForSelector(route.waitFor, { timeout: 10000 });
      }

      // Additional delay if specified
      if (route.delay) {
        await page.waitForTimeout(route.delay);
      }

      // Take screenshot
      const screenshot = await page.screenshot({
        path: undefined, // Return buffer instead of saving to file
        fullPage: config.fullPage ?? true,
        quality: config.quality ?? 90,
        type: config.format ?? 'png'
      });

      return screenshot;
    } finally {
      await page.close();
    }
  }

  async captureAllRoutes(
    routes: RouteConfig[], 
    config: ScreenshotConfig = {}
  ): Promise<Map<string, Buffer>> {
    const screenshots = new Map<string, Buffer>();
    
    for (const route of routes) {
      try {
        console.log(`Capturing screenshot for: ${route.name} (${route.path})`);
        const screenshot = await this.captureRoute(route, config);
        screenshots.set(route.name, screenshot);
        console.log(`✅ Captured: ${route.name}`);
      } catch (error) {
        console.error(`❌ Failed to capture ${route.name}:`, error);
      }
    }

    return screenshots;
  }

  async saveScreenshots(
    screenshots: Map<string, Buffer>, 
    outputDir: string = './screenshots'
  ): Promise<void> {
    const fs = await import('fs/promises');
    const path = await import('path');

    // Create output directory if it doesn't exist
    try {
      await fs.mkdir(outputDir, { recursive: true });
    } catch (error) {
      // Directory might already exist
    }

    // Save each screenshot
    for (const [name, buffer] of screenshots) {
      const filename = `${name.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}.png`;
      const filepath = path.join(outputDir, filename);
      await fs.writeFile(filepath, buffer);
      console.log(`💾 Saved: ${filepath}`);
    }
  }

  async close(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }
}

// Predefined routes for the MindFolk app
export const MIND_FOLK_ROUTES: RouteConfig[] = [
  // Public routes
  { path: '/', name: 'Landing Page', waitFor: 'main' },
  { path: '/therapist', name: 'Therapist Landing', waitFor: 'main' },
  { path: '/sign-in', name: 'Sign In', waitFor: 'form' },
  { path: '/sign-up', name: 'Sign Up', waitFor: 'form' },

  // Client routes
  { path: '/assessment', name: 'Client Assessment', waitFor: '[role="main"]' },
  { path: '/discover', name: 'Discover Therapists', waitFor: '.therapist-card, .empty-state' },
  { path: '/favorites', name: 'Client Favorites', waitFor: 'main' },
  { path: '/appointments', name: 'Client Appointments', waitFor: 'main' },
  { path: '/messages', name: 'Client Messages', waitFor: 'main' },
  { path: '/account', name: 'Client Account', waitFor: 'main' },
  { path: '/billing', name: 'Client Billing', waitFor: 'main' },

  // Therapist routes
  { path: '/t/onboarding', name: 'Therapist Onboarding', waitFor: '[role="main"]' },
  { path: '/t/dashboard', name: 'Therapist Dashboard', waitFor: 'main' },
  { path: '/t/clients', name: 'Therapist Clients', waitFor: 'main' },
  { path: '/t/bookings', name: 'Therapist Bookings', waitFor: 'main' },
  { path: '/t/messages', name: 'Therapist Messages', waitFor: 'main' },
  { path: '/t/analytics', name: 'Therapist Analytics', waitFor: 'main' },
  { path: '/t/earnings', name: 'Therapist Earnings', waitFor: 'main' },
  { path: '/t/profile', name: 'Therapist Profile', waitFor: 'main' },
  { path: '/t/tasks', name: 'Therapist Tasks', waitFor: 'main' },

  // Admin routes
  { path: '/admin/overview', name: 'Admin Overview', waitFor: 'main' },
  { path: '/admin/users', name: 'Admin Users', waitFor: 'main' },
  { path: '/admin/therapists', name: 'Admin Therapists', waitFor: 'main' },
];

// Mobile viewport configurations
export const MOBILE_ROUTES: RouteConfig[] = MIND_FOLK_ROUTES.map(route => ({
  ...route,
  name: `${route.name} (Mobile)`,
  viewport: { width: 375, height: 667 }
}));

// Tablet viewport configurations
export const TABLET_ROUTES: RouteConfig[] = MIND_FOLK_ROUTES.map(route => ({
  ...route,
  name: `${route.name} (Tablet)`,
  viewport: { width: 768, height: 1024 }
}));
