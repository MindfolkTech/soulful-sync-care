import { chromium, Browser, Page } from 'playwright';

export interface ScreenshotAnalysis {
  route: string;
  name: string;
  timestamp: string;
  viewport: { width: number; height: number };
  screenshot: Buffer;
  analysis: {
    accessibility: AccessibilityAnalysis;
    performance: PerformanceAnalysis;
    visual: VisualAnalysis;
    content: ContentAnalysis;
  };
}

export interface AccessibilityAnalysis {
  score: number;
  issues: string[];
  colorContrast: {
    passed: boolean;
    ratio: number;
    details: string;
  };
  focusOrder: {
    passed: boolean;
    issues: string[];
  };
  ariaLabels: {
    passed: boolean;
    missing: string[];
  };
}

export interface PerformanceAnalysis {
  loadTime: number;
  domContentLoaded: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
}

export interface VisualAnalysis {
  layoutIssues: string[];
  responsiveIssues: string[];
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
  typography: {
    fontSizes: number[];
    fontFamilies: string[];
    readability: 'good' | 'fair' | 'poor';
  };
}

export interface ContentAnalysis {
  headingStructure: {
    valid: boolean;
    issues: string[];
  };
  contentLength: {
    text: number;
    images: number;
    links: number;
    buttons: number;
  };
  seoElements: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export class ScreenshotAnalyzer {
  private browser: Browser | null = null;
  private baseUrl: string;

  constructor(baseUrl: string = 'http://localhost:5173') {
    this.baseUrl = baseUrl;
  }

  async initialize(): Promise<void> {
    this.browser = await chromium.launch({ 
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
  }

  async analyzeRoute(
    route: string,
    name: string,
    viewport: { width: number; height: number } = { width: 1280, height: 720 }
  ): Promise<ScreenshotAnalysis> {
    if (!this.browser) {
      throw new Error('Browser not initialized. Call initialize() first.');
    }

    const page = await this.browser.newPage();
    const startTime = Date.now();

    try {
      // Set viewport
      await page.setViewportSize(viewport);

      // Navigate to route
      await page.goto(`${this.baseUrl}${route}`, { 
        waitUntil: 'networkidle',
        timeout: 30000
      });

      // Wait for main content
      await page.waitForSelector('main, [role="main"], body', { timeout: 10000 });

      // Capture screenshot
      const screenshot = await page.screenshot({
        fullPage: true,
        quality: 90
      });

      // Perform analysis
      const analysis = await this.performAnalysis(page, route);

      return {
        route,
        name,
        timestamp: new Date().toISOString(),
        viewport,
        screenshot,
        analysis
      };

    } finally {
      await page.close();
    }
  }

  private async performAnalysis(page: Page, route: string): Promise<ScreenshotAnalysis['analysis']> {
    // Run all analysis in parallel
    const [accessibility, performance, visual, content] = await Promise.all([
      this.analyzeAccessibility(page),
      this.analyzePerformance(page),
      this.analyzeVisual(page),
      this.analyzeContent(page)
    ]);

    return {
      accessibility,
      performance,
      visual,
      content
    };
  }

  private async analyzeAccessibility(page: Page): Promise<AccessibilityAnalysis> {
    const issues: string[] = [];
    let score = 100;

    // Check for missing alt text
    const imagesWithoutAlt = await page.locator('img:not([alt])').count();
    if (imagesWithoutAlt > 0) {
      issues.push(`${imagesWithoutAlt} images missing alt text`);
      score -= imagesWithoutAlt * 5;
    }

    // Check for missing aria labels
    const buttonsWithoutAria = await page.locator('button:not([aria-label]):not([aria-labelledby])').count();
    if (buttonsWithoutAria > 0) {
      issues.push(`${buttonsWithoutAria} buttons missing aria labels`);
      score -= buttonsWithoutAria * 3;
    }

    // Check for proper heading structure
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
    const headingStructure = await Promise.all(headings.map(async (h) => {
      const level = await h.evaluate(el => parseInt(el.tagName.substring(1)));
      const text = await h.textContent();
      return { level, text: text?.trim() || '' };
    }));

    const h1Count = headingStructure.filter(h => h.level === 1).length;
    if (h1Count === 0) {
      issues.push('No H1 heading found');
      score -= 10;
    } else if (h1Count > 1) {
      issues.push('Multiple H1 headings found');
      score -= 5;
    }

    // Check color contrast (simplified)
    const textElements = await page.locator('p, span, div, h1, h2, h3, h4, h5, h6').count();
    const colorContrast = {
      passed: textElements > 0, // Simplified check
      ratio: 4.5, // Assume good contrast for now
      details: 'Color contrast analysis requires more complex implementation'
    };

    // Check focus order
    const focusableElements = await page.locator('button, input, select, textarea, a[href]').count();
    const focusOrder = {
      passed: focusableElements > 0,
      issues: focusableElements === 0 ? ['No focusable elements found'] : []
    };

    // Check ARIA labels
    const ariaLabels = {
      passed: buttonsWithoutAria === 0,
      missing: buttonsWithoutAria > 0 ? ['Some buttons missing aria labels'] : []
    };

    return {
      score: Math.max(0, score),
      issues,
      colorContrast,
      focusOrder,
      ariaLabels
    };
  }

  private async analyzePerformance(page: Page): Promise<PerformanceAnalysis> {
    // Get performance metrics
    const metrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paint = performance.getEntriesByType('paint');
      
      return {
        loadTime: navigation.loadEventEnd - navigation.loadEventStart,
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
        largestContentfulPaint: 0, // Would need LCP API
        cumulativeLayoutShift: 0, // Would need CLS API
        firstInputDelay: 0 // Would need FID API
      };
    });

    return metrics;
  }

  private async analyzeVisual(page: Page): Promise<VisualAnalysis> {
    const layoutIssues: string[] = [];
    const responsiveIssues: string[] = [];

    // Check for horizontal scroll
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });

    if (hasHorizontalScroll) {
      layoutIssues.push('Horizontal scroll detected');
    }

    // Check for overflow issues
    const overflowElements = await page.locator('[style*="overflow: hidden"]').count();
    if (overflowElements > 0) {
      layoutIssues.push(`${overflowElements} elements with overflow hidden`);
    }

    // Analyze color scheme
    const colorScheme = await page.evaluate(() => {
      const styles = getComputedStyle(document.body);
      return {
        primary: styles.getPropertyValue('--garden-green') || '#10b981',
        secondary: styles.getPropertyValue('--jovial-jade') || '#059669',
        accent: styles.getPropertyValue('--btn-accent') || '#f59e0b',
        background: styles.getPropertyValue('--warm-white') || '#fefefe'
      };
    });

    // Analyze typography
    const typography = await page.evaluate(() => {
      const elements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div');
      const fontSizes: number[] = [];
      const fontFamilies: string[] = [];
      
      elements.forEach(el => {
        const styles = getComputedStyle(el);
        const fontSize = parseFloat(styles.fontSize);
        if (fontSize && !fontSizes.includes(fontSize)) {
          fontSizes.push(fontSize);
        }
        if (styles.fontFamily && !fontFamilies.includes(styles.fontFamily)) {
          fontFamilies.push(styles.fontFamily);
        }
      });

      return {
        fontSizes: fontSizes.sort((a, b) => a - b),
        fontFamilies: [...new Set(fontFamilies)],
        readability: fontSizes.length > 0 ? 'good' : 'fair'
      };
    });

    return {
      layoutIssues,
      responsiveIssues,
      colorScheme,
      typography
    };
  }

  private async analyzeContent(page: Page): Promise<ContentAnalysis> {
    // Analyze heading structure
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
    const headingStructure = await Promise.all(headings.map(async (h) => {
      const level = await h.evaluate(el => parseInt(el.tagName.substring(1)));
      const text = await h.textContent();
      return { level, text: text?.trim() || '' };
    }));

    const headingIssues: string[] = [];
    let currentLevel = 0;
    
    for (const heading of headingStructure) {
      if (heading.level > currentLevel + 1) {
        headingIssues.push(`Heading level ${heading.level} skipped from ${currentLevel}`);
      }
      currentLevel = heading.level;
    }

    // Count content elements
    const contentLength = await page.evaluate(() => {
      return {
        text: document.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, h6').length,
        images: document.querySelectorAll('img').length,
        links: document.querySelectorAll('a[href]').length,
        buttons: document.querySelectorAll('button').length
      };
    });

    // Extract SEO elements
    const seoElements = await page.evaluate(() => {
      return {
        title: document.title || '',
        description: document.querySelector('meta[name="description"]')?.getAttribute('content') || '',
        keywords: document.querySelector('meta[name="keywords"]')?.getAttribute('content')?.split(',') || []
      };
    });

    return {
      headingStructure: {
        valid: headingIssues.length === 0,
        issues: headingIssues
      },
      contentLength,
      seoElements
    };
  }

  async analyzeAllRoutes(routes: Array<{ path: string; name: string }>): Promise<ScreenshotAnalysis[]> {
    const results: ScreenshotAnalysis[] = [];

    for (const route of routes) {
      try {
        console.log(`Analyzing: ${route.name} (${route.path})`);
        const analysis = await this.analyzeRoute(route.path, route.name);
        results.push(analysis);
        console.log(`✅ Completed: ${route.name}`);
      } catch (error) {
        console.error(`❌ Failed to analyze ${route.name}:`, error);
      }
    }

    return results;
  }

  generateReport(analyses: ScreenshotAnalysis[]): string {
    const report = [];
    
    report.push('# 📊 Screenshot Analysis Report');
    report.push(`Generated: ${new Date().toISOString()}`);
    report.push(`Total Routes Analyzed: ${analyses.length}`);
    report.push('');

    // Overall summary
    const avgAccessibilityScore = analyses.reduce((sum, a) => sum + a.analysis.accessibility.score, 0) / analyses.length;
    const avgLoadTime = analyses.reduce((sum, a) => sum + a.analysis.performance.loadTime, 0) / analyses.length;
    
    report.push('## 📈 Overall Summary');
    report.push(`- Average Accessibility Score: ${avgAccessibilityScore.toFixed(1)}/100`);
    report.push(`- Average Load Time: ${avgLoadTime.toFixed(0)}ms`);
    report.push('');

    // Detailed analysis per route
    report.push('## 🔍 Route Analysis');
    
    analyses.forEach(analysis => {
      report.push(`### ${analysis.name} (${analysis.route})`);
      report.push(`- **Accessibility Score**: ${analysis.analysis.accessibility.score}/100`);
      report.push(`- **Load Time**: ${analysis.analysis.performance.loadTime}ms`);
      report.push(`- **Content Elements**: ${analysis.analysis.content.contentLength.text} text, ${analysis.analysis.content.contentLength.buttons} buttons`);
      
      if (analysis.analysis.accessibility.issues.length > 0) {
        report.push('- **Accessibility Issues**:');
        analysis.analysis.accessibility.issues.forEach(issue => {
          report.push(`  - ${issue}`);
        });
      }
      
      if (analysis.analysis.visual.layoutIssues.length > 0) {
        report.push('- **Layout Issues**:');
        analysis.analysis.visual.layoutIssues.forEach(issue => {
          report.push(`  - ${issue}`);
        });
      }
      
      report.push('');
    });

    // Recommendations
    report.push('## 💡 Recommendations');
    
    const lowAccessibilityRoutes = analyses.filter(a => a.analysis.accessibility.score < 80);
    if (lowAccessibilityRoutes.length > 0) {
      report.push('### Accessibility Improvements');
      lowAccessibilityRoutes.forEach(route => {
        report.push(`- **${route.name}**: Improve accessibility (Score: ${route.analysis.accessibility.score}/100)`);
      });
      report.push('');
    }

    const slowRoutes = analyses.filter(a => a.analysis.performance.loadTime > 3000);
    if (slowRoutes.length > 0) {
      report.push('### Performance Improvements');
      slowRoutes.forEach(route => {
        report.push(`- **${route.name}**: Optimize load time (${route.analysis.performance.loadTime}ms)`);
      });
      report.push('');
    }

    return report.join('\n');
  }

  async close(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }
}
