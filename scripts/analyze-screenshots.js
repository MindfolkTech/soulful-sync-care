#!/usr/bin/env node

import { ScreenshotAnalyzer } from '../src/utils/screenshot-analyzer.ts';
import { MIND_FOLK_ROUTES } from '../src/utils/screenshot-capture.ts';
import { getBaseUrl } from '../src/utils/port-detector.ts';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { writeFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function main() {
  const args = process.argv.slice(2);
  const manualBaseUrl = args[0];
  const outputDir = args[1] || join(__dirname, '../analysis-results');
  
  // Use smart port detection unless manually specified
  const baseUrl = manualBaseUrl || await getBaseUrl('http://localhost:5173', { verbose: true });

  console.log(`🔍 Starting screenshot analysis...`);
  console.log(`Base URL: ${baseUrl}`);
  console.log(`Output: ${outputDir}`);

  const analyzer = new ScreenshotAnalyzer();
  
  try {
    await analyzer.setBaseUrl(baseUrl);
    await analyzer.initialize();
    console.log('✅ Browser initialized');

    // Analyze all routes
    console.log(`📊 Analyzing ${MIND_FOLK_ROUTES.length} routes...`);
    const analyses = await analyzer.analyzeAllRoutes(MIND_FOLK_ROUTES);
    
    // Generate comprehensive report
    console.log('📝 Generating analysis report...');
    const report = analyzer.generateReport(analyses);
    
    // Save report
    const reportPath = join(outputDir, 'analysis-report.md');
    writeFileSync(reportPath, report);
    console.log(`💾 Report saved: ${reportPath}`);

    // Save detailed JSON data
    const jsonPath = join(outputDir, 'analysis-data.json');
    const jsonData = {
      timestamp: new Date().toISOString(),
      totalRoutes: analyses.length,
      analyses: analyses.map(a => ({
        route: a.route,
        name: a.name,
        timestamp: a.timestamp,
        viewport: a.viewport,
        analysis: a.analysis
      }))
    };
    writeFileSync(jsonPath, JSON.stringify(jsonData, null, 2));
    console.log(`💾 Data saved: ${jsonPath}`);

    // Generate summary insights
    console.log('\n🎯 Key Insights:');
    
    const avgAccessibilityScore = analyses.reduce((sum, a) => sum + a.analysis.accessibility.score, 0) / analyses.length;
    const avgLoadTime = analyses.reduce((sum, a) => sum + a.analysis.performance.loadTime, 0) / analyses.length;
    
    console.log(`📊 Average Accessibility Score: ${avgAccessibilityScore.toFixed(1)}/100`);
    console.log(`⚡ Average Load Time: ${avgLoadTime.toFixed(0)}ms`);
    
    const lowAccessibilityRoutes = analyses.filter(a => a.analysis.accessibility.score < 80);
    if (lowAccessibilityRoutes.length > 0) {
      console.log(`🚨 ${lowAccessibilityRoutes.length} routes need accessibility improvements:`);
      lowAccessibilityRoutes.forEach(route => {
        console.log(`   - ${route.name} (${route.analysis.accessibility.score}/100)`);
      });
    }

    const slowRoutes = analyses.filter(a => a.analysis.performance.loadTime > 3000);
    if (slowRoutes.length > 0) {
      console.log(`🐌 ${slowRoutes.length} routes are slow to load:`);
      slowRoutes.forEach(route => {
        console.log(`   - ${route.name} (${route.analysis.performance.loadTime}ms)`);
      });
    }

    const routesWithLayoutIssues = analyses.filter(a => a.analysis.visual.layoutIssues.length > 0);
    if (routesWithLayoutIssues.length > 0) {
      console.log(`🎨 ${routesWithLayoutIssues.length} routes have layout issues:`);
      routesWithLayoutIssues.forEach(route => {
        console.log(`   - ${route.name}: ${route.analysis.visual.layoutIssues.join(', ')}`);
      });
    }

    console.log('\n🎉 Analysis complete! Check the report for detailed insights.');

  } catch (error) {
    console.error('❌ Error during analysis:', error);
    process.exit(1);
  } finally {
    await analyzer.close();
  }
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

main();
