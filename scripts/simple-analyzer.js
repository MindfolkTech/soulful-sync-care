#!/usr/bin/env node

import { chromium } from 'playwright';
import { writeFileSync } from 'fs';
import { AestheticAnalyzer } from './aesthetic-analyzer.js';

const MIND_FOLK_ROUTES = [
  { path: '/', name: 'Landing Page' },
  { path: '/therapist', name: 'Therapist Landing' },
  { path: '/sign-in', name: 'Sign In' },
  { path: '/sign-up', name: 'Sign Up' },
  { path: '/assessment', name: 'Client Assessment' },
  { path: '/discover', name: 'Discover Therapists' },
  { path: '/favorites', name: 'Client Favorites' },
  { path: '/appointments', name: 'Client Appointments' },
  { path: '/messages', name: 'Client Messages' },
  { path: '/account', name: 'Client Account' },
  { path: '/billing', name: 'Client Billing' },
  { path: '/t/onboarding', name: 'Therapist Onboarding' },
  { path: '/t/dashboard', name: 'Therapist Dashboard' },
  { path: '/t/clients', name: 'Therapist Clients' },
  { path: '/t/bookings', name: 'Therapist Bookings' },
  { path: '/t/messages', name: 'Therapist Messages' },
  { path: '/t/analytics', name: 'Therapist Analytics' },
  { path: '/t/earnings', name: 'Therapist Earnings' },
  { path: '/t/profile', name: 'Therapist Profile' },
  { path: '/t/tasks', name: 'Therapist Tasks' },
];

async function analyzeRoute(page, route) {
  console.log(`🔍 Analyzing: ${route.name} (${route.path})`);
  
  try {
    // Navigate to route
    await page.goto(`http://localhost:8088${route.path}`, { 
      waitUntil: 'networkidle',
      timeout: 30000
    });

    // Wait for main content
    await page.waitForSelector('main, [role="main"], body', { timeout: 10000 });

    // Capture screenshot
    const screenshot = await page.screenshot({
      fullPage: true
    });

    // Analyze accessibility
    const accessibility = await page.evaluate(() => {
      const issues = [];
      let score = 100;

      // Check for missing alt text
      const imagesWithoutAlt = document.querySelectorAll('img:not([alt])').length;
      if (imagesWithoutAlt > 0) {
        issues.push(`${imagesWithoutAlt} images missing alt text`);
        score -= imagesWithoutAlt * 5;
      }

      // Check for missing aria labels on buttons
      const buttonsWithoutAria = document.querySelectorAll('button:not([aria-label]):not([aria-labelledby])').length;
      if (buttonsWithoutAria > 0) {
        issues.push(`${buttonsWithoutAria} buttons missing aria labels`);
        score -= buttonsWithoutAria * 3;
      }

      // Check for proper heading structure
      const h1Count = document.querySelectorAll('h1').length;
      if (h1Count === 0) {
        issues.push('No H1 heading found');
        score -= 10;
      } else if (h1Count > 1) {
        issues.push('Multiple H1 headings found');
        score -= 5;
      }

      return {
        score: Math.max(0, score),
        issues
      };
    });

    // Analyze performance
    const performance = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0];
      return {
        loadTime: navigation ? navigation.loadEventEnd - navigation.loadEventStart : 0,
        domContentLoaded: navigation ? navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart : 0
      };
    });

    // Analyze content
    const content = await page.evaluate(() => {
      return {
        textElements: document.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, h6').length,
        images: document.querySelectorAll('img').length,
        links: document.querySelectorAll('a[href]').length,
        buttons: document.querySelectorAll('button').length,
        title: document.title || '',
        hasDescription: !!document.querySelector('meta[name="description"]')
      };
    });

    // Analyze visual issues
    const visual = await page.evaluate(() => {
      const issues = [];
      
      // Check for horizontal scroll
      const hasHorizontalScroll = document.documentElement.scrollWidth > document.documentElement.clientWidth;
      if (hasHorizontalScroll) {
        issues.push('Horizontal scroll detected');
      }

      // Check for overflow issues
      const overflowElements = document.querySelectorAll('[style*="overflow: hidden"]').length;
      if (overflowElements > 0) {
        issues.push(`${overflowElements} elements with overflow hidden`);
      }

      return { issues };
    });

    // Initialize aesthetic analyzer
    const aestheticAnalyzer = new AestheticAnalyzer();

    // Perform aesthetic analysis
    console.log(`🎨 Running aesthetic analysis for ${route.name}...`);
    const [styleGuide, uiBestPractices, uxBestPractices, layoutPatterns, competitorAnalysis] = await Promise.all([
      aestheticAnalyzer.analyzeStyleGuideCompliance(page),
      aestheticAnalyzer.analyzeUIBestPractices(page),
      aestheticAnalyzer.analyzeUXBestPractices(page),
      aestheticAnalyzer.analyzeLayoutPatterns(page),
      aestheticAnalyzer.analyzeCompetitorComparison(page, route.path)
    ]);

    // Generate aesthetic report
    const aestheticReport = await aestheticAnalyzer.generateAestheticReport(
      styleGuide,
      uiBestPractices,
      uxBestPractices,
      layoutPatterns,
      competitorAnalysis
    );

    console.log(`✅ Completed: ${route.name}`);
    
    return {
      route: route.path,
      name: route.name,
      timestamp: new Date().toISOString(),
      screenshot: screenshot.toString('base64'),
      analysis: {
        accessibility,
        performance,
        content,
        visual,
        aesthetic: {
          styleGuide,
          uiBestPractices,
          uxBestPractices,
          layoutPatterns,
          competitorAnalysis,
          report: aestheticReport
        }
      }
    };

  } catch (error) {
    console.error(`❌ Failed to analyze ${route.name}:`, error.message);
    return {
      route: route.path,
      name: route.name,
      timestamp: new Date().toISOString(),
      error: error.message,
      analysis: null
    };
  }
}

async function main() {
  const args = process.argv.slice(2);
  const baseUrl = args[0] || 'http://localhost:5173';
  const outputDir = args[1] || './analysis-results';

  console.log(`🔍 Starting screenshot analysis...`);
  console.log(`Base URL: ${baseUrl}`);
  console.log(`Output: ${outputDir}`);

  const browser = await chromium.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1280, height: 720 });

    console.log('✅ Browser initialized');

    // Analyze all routes
    console.log(`📊 Analyzing ${MIND_FOLK_ROUTES.length} routes...`);
    const analyses = [];

    for (let i = 0; i < MIND_FOLK_ROUTES.length; i++) {
      const route = MIND_FOLK_ROUTES[i];
      console.log(`Progress: ${i + 1}/${MIND_FOLK_ROUTES.length}`);
      
      const analysis = await analyzeRoute(page, route);
      analyses.push(analysis);
    }

    // Generate comprehensive report
    console.log('📝 Generating analysis report...');
    
    const successfulAnalyses = analyses.filter(a => !a.error);
    const failedAnalyses = analyses.filter(a => a.error);

    const avgAccessibilityScore = successfulAnalyses.length > 0 
      ? successfulAnalyses.reduce((sum, a) => sum + a.analysis.accessibility.score, 0) / successfulAnalyses.length 
      : 0;

    const avgLoadTime = successfulAnalyses.length > 0 
      ? successfulAnalyses.reduce((sum, a) => sum + a.analysis.performance.loadTime, 0) / successfulAnalyses.length 
      : 0;

    // Calculate aesthetic scores
    const aestheticAnalyses = successfulAnalyses.filter(a => a.analysis.aesthetic);
    const avgStyleGuideScore = aestheticAnalyses.length > 0 
      ? aestheticAnalyses.reduce((sum, a) => sum + a.analysis.aesthetic.styleGuide.compliance.score, 0) / aestheticAnalyses.length 
      : 0;

    const avgUIScore = aestheticAnalyses.length > 0 
      ? aestheticAnalyses.reduce((sum, a) => {
          const ui = a.analysis.aesthetic.uiBestPractices;
          return sum + (ui.visualClutter.score + ui.visualHierarchy.score + ui.spacing.score + ui.colorScheme.score + ui.typography.score + ui.layout.score + ui.responsiveDesign.score + ui.microInteractions.score) / 8;
        }, 0) / aestheticAnalyses.length 
      : 0;

    const avgUXScore = aestheticAnalyses.length > 0 
      ? aestheticAnalyses.reduce((sum, a) => {
          const ux = a.analysis.aesthetic.uxBestPractices;
          return sum + (ux.informationArchitecture.score + ux.usability.score + ux.accessibility.score + ux.mobileExperience.score) / 4;
        }, 0) / aestheticAnalyses.length 
      : 0;

    const report = [
      '# 📊 Comprehensive Screenshot Analysis Report',
      `Generated: ${new Date().toISOString()}`,
      `Total Routes Analyzed: ${analyses.length}`,
      `Successful: ${successfulAnalyses.length}`,
      `Failed: ${failedAnalyses.length}`,
      '',
      '## 📈 Overall Summary',
      `- **Average Accessibility Score**: ${avgAccessibilityScore.toFixed(1)}/100`,
      `- **Average Load Time**: ${avgLoadTime.toFixed(0)}ms`,
      `- **Average Style Guide Compliance**: ${avgStyleGuideScore.toFixed(1)}/100`,
      `- **Average UI Best Practices Score**: ${avgUIScore.toFixed(1)}/100`,
      `- **Average UX Best Practices Score**: ${avgUXScore.toFixed(1)}/100`,
      '',
      '## 🎨 Aesthetic Analysis Summary',
      `- **Style Guide Compliance**: ${avgStyleGuideScore.toFixed(1)}/100`,
      `- **UI Best Practices**: ${avgUIScore.toFixed(1)}/100`,
      `- **UX Best Practices**: ${avgUXScore.toFixed(1)}/100`,
      '',
      '### Key Aesthetic Insights:',
      ''
    ];

    // Add aesthetic insights
    if (avgStyleGuideScore < 80) {
      report.push('- ⚠️ **Style Guide Issues**: Some routes not following brand guidelines');
    }
    if (avgUIScore < 80) {
      report.push('- ⚠️ **UI Issues**: Visual hierarchy and spacing need improvement');
    }
    if (avgUXScore < 80) {
      report.push('- ⚠️ **UX Issues**: Navigation and user flow need enhancement');
    }

    report.push('');
    report.push('## 🔍 Detailed Route Analysis',
      ''
    );

    successfulAnalyses.forEach(analysis => {
      report.push(`### ${analysis.name} (${analysis.route})`);
      report.push(`- **Accessibility Score**: ${analysis.analysis.accessibility.score}/100`);
      report.push(`- **Load Time**: ${analysis.analysis.performance.loadTime}ms`);
      report.push(`- **Content Elements**: ${analysis.analysis.content.textElements} text, ${analysis.analysis.content.buttons} buttons`);
      
      // Add aesthetic analysis if available
      if (analysis.analysis.aesthetic) {
        const aesthetic = analysis.analysis.aesthetic;
        report.push(`- **Style Guide Compliance**: ${aesthetic.styleGuide.compliance.score}/100`);
        report.push(`- **UI Best Practices**: ${((aesthetic.uiBestPractices.visualClutter.score + aesthetic.uiBestPractices.visualHierarchy.score + aesthetic.uiBestPractices.spacing.score + aesthetic.uiBestPractices.colorScheme.score + aesthetic.uiBestPractices.typography.score + aesthetic.uiBestPractices.layout.score + aesthetic.uiBestPractices.responsiveDesign.score + aesthetic.uiBestPractices.microInteractions.score) / 8).toFixed(1)}/100`);
        report.push(`- **UX Best Practices**: ${((aesthetic.uxBestPractices.informationArchitecture.score + aesthetic.uxBestPractices.usability.score + aesthetic.uxBestPractices.accessibility.score + aesthetic.uxBestPractices.mobileExperience.score) / 4).toFixed(1)}/100`);
        report.push(`- **Layout Pattern**: ${aesthetic.layoutPatterns.layoutType} (${aesthetic.layoutPatterns.complexity})`);
        report.push(`- **Detected Patterns**: ${aesthetic.layoutPatterns.detectedPatterns.join(', ')}`);
      }
      
      if (analysis.analysis.accessibility.issues.length > 0) {
        report.push('- **Accessibility Issues**:');
        analysis.analysis.accessibility.issues.forEach(issue => {
          report.push(`  - ${issue}`);
        });
      }
      
      if (analysis.analysis.visual.issues.length > 0) {
        report.push('- **Visual Issues**:');
        analysis.analysis.visual.issues.forEach(issue => {
          report.push(`  - ${issue}`);
        });
      }

      // Add aesthetic issues if available
      if (analysis.analysis.aesthetic) {
        const aesthetic = analysis.analysis.aesthetic;
        if (aesthetic.styleGuide.compliance.issues.length > 0) {
          report.push('- **Style Guide Issues**:');
          aesthetic.styleGuide.compliance.issues.forEach(issue => {
            report.push(`  - ${issue}`);
          });
        }
        if (aesthetic.layoutPatterns.recommendations.length > 0) {
          report.push('- **Layout Recommendations**:');
          aesthetic.layoutPatterns.recommendations.forEach(rec => {
            report.push(`  - ${rec}`);
          });
        }
      }
      
      report.push('');
    });

    if (failedAnalyses.length > 0) {
      report.push('## ❌ Failed Analyses');
      failedAnalyses.forEach(analysis => {
        report.push(`- **${analysis.name}**: ${analysis.error}`);
      });
      report.push('');
    }

    // Recommendations
    report.push('## 💡 Recommendations');
    
    const lowAccessibilityRoutes = successfulAnalyses.filter(a => a.analysis.accessibility.score < 80);
    if (lowAccessibilityRoutes.length > 0) {
      report.push('### Accessibility Improvements');
      lowAccessibilityRoutes.forEach(route => {
        report.push(`- **${route.name}**: Improve accessibility (Score: ${route.analysis.accessibility.score}/100)`);
      });
      report.push('');
    }

    const slowRoutes = successfulAnalyses.filter(a => a.analysis.performance.loadTime > 3000);
    if (slowRoutes.length > 0) {
      report.push('### Performance Improvements');
      slowRoutes.forEach(route => {
        report.push(`- **${route.name}**: Optimize load time (${route.analysis.performance.loadTime}ms)`);
      });
      report.push('');
    }

    const routesWithVisualIssues = successfulAnalyses.filter(a => a.analysis.visual.issues.length > 0);
    if (routesWithVisualIssues.length > 0) {
      report.push('### Visual Improvements');
      routesWithVisualIssues.forEach(route => {
        report.push(`- **${route.name}**: Fix visual issues (${route.analysis.visual.issues.join(', ')})`);
      });
      report.push('');
    }

    // Aesthetic recommendations
    const lowStyleGuideRoutes = successfulAnalyses.filter(a => a.analysis.aesthetic && a.analysis.aesthetic.styleGuide.compliance.score < 80);
    if (lowStyleGuideRoutes.length > 0) {
      report.push('### 🎨 Style Guide Improvements');
      report.push('- Ensure consistent use of brand colors (garden green, jovial jade)');
      report.push('- Implement proper typography hierarchy with Crimson Text');
      report.push('- Follow 8px spacing grid system');
      report.push('- Use consistent component styles');
      lowStyleGuideRoutes.forEach(route => {
        report.push(`- **${route.name}**: Style guide compliance (${route.analysis.aesthetic.styleGuide.compliance.score}/100)`);
      });
      report.push('');
    }

    const lowUIRoutes = successfulAnalyses.filter(a => {
      if (!a.analysis.aesthetic) return false;
      const ui = a.analysis.aesthetic.uiBestPractices;
      const avgScore = (ui.visualClutter.score + ui.visualHierarchy.score + ui.spacing.score + ui.colorScheme.score + ui.typography.score + ui.layout.score + ui.responsiveDesign.score + ui.microInteractions.score) / 8;
      return avgScore < 80;
    });
    if (lowUIRoutes.length > 0) {
      report.push('### 🎨 UI Best Practices Improvements');
      report.push('- Reduce visual clutter and competing elements');
      report.push('- Improve visual hierarchy with proper heading structure');
      report.push('- Add more white space for better readability');
      report.push('- Ensure consistent color usage and harmony');
      report.push('- Implement proper typography scale and pairing');
      report.push('- Use grid systems for better layout');
      report.push('- Enhance responsive design with proper breakpoints');
      report.push('- Add micro-interactions (hover effects, transitions, shadows)');
      report.push('');
    }

    const lowUXRoutes = successfulAnalyses.filter(a => {
      if (!a.analysis.aesthetic) return false;
      const ux = a.analysis.aesthetic.uxBestPractices;
      const avgScore = (ux.informationArchitecture.score + ux.usability.score + ux.accessibility.score + ux.mobileExperience.score) / 4;
      return avgScore < 80;
    });
    if (lowUXRoutes.length > 0) {
      report.push('### 🚀 UX Best Practices Improvements');
      report.push('- Enhance navigation clarity');
      report.push('- Improve content organization');
      report.push('- Add clear call-to-actions');
      report.push('- Ensure mobile responsiveness');
      report.push('- Implement proper user flow');
      report.push('');
    }

    // Layout pattern recommendations
    const routesNeedingLayoutImprovements = successfulAnalyses.filter(a => 
      a.analysis.aesthetic && a.analysis.aesthetic.layoutPatterns.recommendations.length > 0
    );
    if (routesNeedingLayoutImprovements.length > 0) {
      report.push('### 📐 Layout Pattern Improvements');
      routesNeedingLayoutImprovements.forEach(route => {
        report.push(`- **${route.name}**:`);
        route.analysis.aesthetic.layoutPatterns.recommendations.forEach(rec => {
          report.push(`  - ${rec}`);
        });
      });
      report.push('');
    }

    // Save report
    const reportPath = `${outputDir}/analysis-report.md`;
    writeFileSync(reportPath, report.join('\n'));
    console.log(`💾 Report saved: ${reportPath}`);

    // Save detailed JSON data
    const jsonPath = `${outputDir}/analysis-data.json`;
    const jsonData = {
      timestamp: new Date().toISOString(),
      totalRoutes: analyses.length,
      successful: successfulAnalyses.length,
      failed: failedAnalyses.length,
      analyses: analyses.map(a => ({
        route: a.route,
        name: a.name,
        timestamp: a.timestamp,
        error: a.error || null,
        analysis: a.analysis ? {
          accessibility: a.analysis.accessibility,
          performance: a.analysis.performance,
          content: a.analysis.content,
          visual: a.analysis.visual
        } : null
      }))
    };
    writeFileSync(jsonPath, JSON.stringify(jsonData, null, 2));
    console.log(`💾 Data saved: ${jsonPath}`);

    // Generate summary insights
    console.log('\n🎯 Key Insights:');
    console.log(`📊 Average Accessibility Score: ${avgAccessibilityScore.toFixed(1)}/100`);
    console.log(`⚡ Average Load Time: ${avgLoadTime.toFixed(0)}ms`);
    console.log(`🎨 Average Style Guide Compliance: ${avgStyleGuideScore.toFixed(1)}/100`);
    console.log(`🎨 Average UI Best Practices: ${avgUIScore.toFixed(1)}/100`);
    console.log(`🚀 Average UX Best Practices: ${avgUXScore.toFixed(1)}/100`);
    
    if (lowAccessibilityRoutes.length > 0) {
      console.log(`🚨 ${lowAccessibilityRoutes.length} routes need accessibility improvements:`);
      lowAccessibilityRoutes.forEach(route => {
        console.log(`   - ${route.name} (${route.analysis.accessibility.score}/100)`);
      });
    }

    if (slowRoutes.length > 0) {
      console.log(`🐌 ${slowRoutes.length} routes are slow to load:`);
      slowRoutes.forEach(route => {
        console.log(`   - ${route.name} (${route.analysis.performance.loadTime}ms)`);
      });
    }

    if (routesWithVisualIssues.length > 0) {
      console.log(`🎨 ${routesWithVisualIssues.length} routes have visual issues:`);
      routesWithVisualIssues.forEach(route => {
        console.log(`   - ${route.name}: ${route.analysis.visual.issues.join(', ')}`);
      });
    }

    if (lowStyleGuideRoutes.length > 0) {
      console.log(`🎯 ${lowStyleGuideRoutes.length} routes need style guide improvements:`);
      lowStyleGuideRoutes.forEach(route => {
        console.log(`   - ${route.name} (${route.analysis.aesthetic.styleGuide.compliance.score}/100)`);
      });
    }

    if (lowUIRoutes.length > 0) {
      console.log(`🎨 ${lowUIRoutes.length} routes need UI best practices improvements:`);
      lowUIRoutes.forEach(route => {
        const ui = route.analysis.aesthetic.uiBestPractices;
        const avgScore = (ui.visualClutter.score + ui.visualHierarchy.score + ui.spacing.score + ui.colorScheme.score + ui.typography.score + ui.layout.score + ui.responsiveDesign.score + ui.microInteractions.score) / 8;
        console.log(`   - ${route.name} (${avgScore.toFixed(1)}/100)`);
      });
    }

    if (lowUXRoutes.length > 0) {
      console.log(`🚀 ${lowUXRoutes.length} routes need UX best practices improvements:`);
      lowUXRoutes.forEach(route => {
        const ux = route.analysis.aesthetic.uxBestPractices;
        const avgScore = (ux.informationArchitecture.score + ux.usability.score + ux.accessibility.score + ux.mobileExperience.score) / 4;
        console.log(`   - ${route.name} (${avgScore.toFixed(1)}/100)`);
      });
    }

    console.log('\n🎉 Analysis complete! Check the report for detailed insights.');

  } catch (error) {
    console.error('❌ Error during analysis:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

main();
