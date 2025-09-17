import { test, expect } from '@playwright/test';

test.describe('Therapist Flow Visual Tests', () => {
  // Test that the dev server is running
  test('Dev server is accessible', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/MindFolk|Soulful Sync Care/);
  });
  test('Onboarding flow - all steps', async ({ page }) => {
    await page.goto('/therapist/onboarding');
    
    // Test step 1 - Welcome
    await expect(page).toHaveScreenshot('onboarding-step1-welcome.png');
    
    // Navigate through steps and capture screenshots
    for (let step = 2; step <= 6; step++) {
      await page.click('button:has-text("Continue")');
      await page.waitForTimeout(300); // Wait for animations
      await expect(page).toHaveScreenshot(`onboarding-step${step}.png`);
    }
  });

  test('Onboarding with live preview', async ({ page }) => {
    await page.goto('/therapist/onboarding');
    
    // Enable preview toggle
    const previewButton = page.locator('button[aria-label*="preview"], button:has-text("Preview")').first();
    if (await previewButton.isVisible()) {
      await previewButton.click();
      await page.waitForTimeout(500);
    }
    
    await expect(page).toHaveScreenshot('onboarding-with-preview.png');
  });

  test('Onboarding with form data', async ({ page }) => {
    await page.goto('/therapist/onboarding');
    
    // Navigate to step 2
    await page.click('button:has-text("Continue")');
    await page.waitForTimeout(300);
    
    // Fill form fields
    await page.fill('input[id="firstName"]', 'Dr. Sarah');
    await page.fill('input[id="lastName"]', 'Chen');
    await page.fill('input[id="title"]', 'Clinical Psychologist');
    
    await expect(page).toHaveScreenshot('onboarding-with-form-data.png');
  });

  test('Dashboard responsive breakpoints', async ({ page }) => {
    await page.goto('/therapist/dashboard');
    
    // Desktop
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(300);
    await expect(page).toHaveScreenshot('dashboard-desktop.png');
    
    // Tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(300);
    await expect(page).toHaveScreenshot('dashboard-tablet.png');
    
    // Mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(300);
    await expect(page).toHaveScreenshot('dashboard-mobile.png');
  });

  test('Dashboard with urgent notifications', async ({ page }) => {
    await page.goto('/therapist/dashboard');
    
    // Simulate urgent notification state
    await page.evaluate(() => {
      // Add urgent notification to DOM for testing
      const notification = document.createElement('div');
      notification.className = 'bg-[var(--error-bg)] text-[var(--error-text)] p-4 rounded-lg mb-4';
      notification.innerHTML = '🚨 Urgent: Client J.D. needs immediate attention';
      document.querySelector('main')?.prepend(notification);
    });
    
    await expect(page).toHaveScreenshot('dashboard-with-urgent-notifications.png');
  });

  test('Dashboard with high traffic', async ({ page }) => {
    await page.goto('/therapist/dashboard');
    
    // Simulate high traffic day
    await page.evaluate(() => {
      // Add multiple appointments
      const appointments = document.querySelector('[data-testid="appointments"]') || 
                          document.querySelector('.space-y-4');
      if (appointments) {
        appointments.innerHTML = `
          <div class="space-y-2">
            <div class="flex justify-between items-center p-3 bg-[var(--surface)] rounded-lg">
              <span class="font-secondary text-[var(--text-primary)]">9:00 AM - J.D.</span>
              <span class="text-[var(--garden-green)] text-sm">Chemistry Call</span>
            </div>
            <div class="flex justify-between items-center p-3 bg-[var(--surface)] rounded-lg">
              <span class="font-secondary text-[var(--text-primary)]">10:00 AM - M.S.</span>
              <span class="text-[var(--garden-green)] text-sm">Therapy Session</span>
            </div>
            <div class="flex justify-between items-center p-3 bg-[var(--surface)] rounded-lg">
              <span class="font-secondary text-[var(--text-primary)]">2:00 PM - A.R.</span>
              <span class="text-[var(--garden-green)] text-sm">Therapy Session</span>
            </div>
            <div class="flex justify-between items-center p-3 bg-[var(--surface)] rounded-lg">
              <span class="font-secondary text-[var(--text-primary)]">4:00 PM - K.L.</span>
              <span class="text-[var(--garden-green)] text-sm">Chemistry Call</span>
            </div>
          </div>
        `;
      }
    });
    
    await expect(page).toHaveScreenshot('dashboard-high-traffic.png');
  });

  test('Style guide components', async ({ page }) => {
    await page.goto('/storybook');
    
    // Navigate to style guide
    await page.click('text=Style Guide 2.3');
    await page.waitForTimeout(300);
    
    // Test button variants
    await page.click('text=Button Variants');
    await page.waitForTimeout(300);
    await expect(page).toHaveScreenshot('style-guide-buttons.png');
    
    // Test tag categories
    await page.click('text=Tag Categories');
    await page.waitForTimeout(300);
    await expect(page).toHaveScreenshot('style-guide-tags.png');
    
    // Test form components
    await page.click('text=Form Components');
    await page.waitForTimeout(300);
    await expect(page).toHaveScreenshot('style-guide-forms.png');
  });

  test('Accessibility compliance', async ({ page }) => {
    await page.goto('/therapist/onboarding');
    
    // Test keyboard navigation
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Check focus indicators are visible
    await expect(page).toHaveScreenshot('accessibility-focus-indicators.png');
    
    // Test color contrast
    await page.goto('/therapist/dashboard');
    await expect(page).toHaveScreenshot('accessibility-color-contrast.png');
  });

  test('Cross-browser compatibility', async ({ page, browserName }) => {
    await page.goto('/therapist/dashboard');
    
    // Test basic functionality across browsers
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('button')).toBeVisible();
    
    // Capture browser-specific screenshots
    await expect(page).toHaveScreenshot(`dashboard-${browserName}.png`);
  });
});
