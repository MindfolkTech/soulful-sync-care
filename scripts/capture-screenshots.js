#!/usr/bin/env node

import { ScreenshotCapture, MIND_FOLK_ROUTES, MOBILE_ROUTES, TABLET_ROUTES } from '../src/utils/screenshot-capture.ts';
import { getBaseUrl } from '../src/utils/port-detector.ts';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function main() {
  const args = process.argv.slice(2);
  const device = args[0] || 'desktop'; // desktop, mobile, tablet, all
  const manualBaseUrl = args[1];
  const outputDir = args[2] || join(__dirname, '../screenshots');
  
  // Use smart port detection unless manually specified
  const baseUrl = manualBaseUrl || await getBaseUrl('http://localhost:5173', { verbose: true });

  console.log(`📸 Starting screenshot capture...`);
  console.log(`Device: ${device}`);
  console.log(`Base URL: ${baseUrl}`);
  console.log(`Output: ${outputDir}`);

  const capture = new ScreenshotCapture();
  
  try {
    await capture.setBaseUrl(baseUrl);
    await capture.initialize();
    console.log('✅ Browser initialized');

    let routes = MIND_FOLK_ROUTES;
    let config = { fullPage: true, quality: 90 };

    switch (device) {
      case 'mobile':
        routes = MOBILE_ROUTES;
        config.fullPage = false; // Mobile screenshots are usually viewport height
        break;
      case 'tablet':
        routes = TABLET_ROUTES;
        break;
      case 'all':
        // Capture all device types
        let totalSuccess = 0;
        let totalFailures = 0;
        const allFailures = [];

        console.log('📱 Capturing mobile screenshots...');
        const mobileResult = await capture.captureAllRoutes(MOBILE_ROUTES, { ...config, fullPage: false });
        await capture.saveScreenshots(mobileResult.screenshots, join(outputDir, 'mobile'));
        totalSuccess += mobileResult.successCount;
        totalFailures += mobileResult.failureCount;
        allFailures.push(...mobileResult.failures.map(f => `Mobile: ${f}`));

        console.log('📱 Capturing tablet screenshots...');
        const tabletResult = await capture.captureAllRoutes(TABLET_ROUTES, config);
        await capture.saveScreenshots(tabletResult.screenshots, join(outputDir, 'tablet'));
        totalSuccess += tabletResult.successCount;
        totalFailures += tabletResult.failureCount;
        allFailures.push(...tabletResult.failures.map(f => `Tablet: ${f}`));

        console.log('💻 Capturing desktop screenshots...');
        const desktopResult = await capture.captureAllRoutes(MIND_FOLK_ROUTES, config);
        await capture.saveScreenshots(desktopResult.screenshots, join(outputDir, 'desktop'));
        totalSuccess += desktopResult.successCount;
        totalFailures += desktopResult.failureCount;
        allFailures.push(...desktopResult.failures.map(f => `Desktop: ${f}`));
        
        // Report results
        console.log(`\n📊 Screenshot Summary:`);
        console.log(`✅ Successful: ${totalSuccess}`);
        console.log(`❌ Failed: ${totalFailures}`);
        
        if (totalFailures > 0) {
          console.log(`\n🚨 Failed Screenshots:`);
          allFailures.forEach(failure => console.log(`   - ${failure}`));
          
          if (totalSuccess === 0) {
            console.log(`\n❌ All screenshots failed! Check your dev server is running.`);
            process.exit(1);
          } else if (totalFailures > totalSuccess) {
            console.log(`\n⚠️  More screenshots failed than succeeded. Check for issues.`);
          } else {
            console.log(`\n✅ Most screenshots captured successfully!`);
          }
        } else {
          console.log(`\n🎉 All screenshots captured successfully!`);
        }
        return;
      default:
        routes = MIND_FOLK_ROUTES;
    }

    console.log(`📸 Capturing ${routes.length} screenshots...`);
    const result = await capture.captureAllRoutes(routes, config);
    
    console.log(`💾 Saving screenshots to ${outputDir}...`);
    await capture.saveScreenshots(result.screenshots, outputDir);
    
    // Report results
    console.log(`\n📊 Screenshot Summary:`);
    console.log(`✅ Successful: ${result.successCount}`);
    console.log(`❌ Failed: ${result.failureCount}`);
    
    if (result.failureCount > 0) {
      console.log(`\n🚨 Failed Screenshots:`);
      result.failures.forEach(failure => console.log(`   - ${failure}`));
      
      if (result.successCount === 0) {
        console.log(`\n❌ All screenshots failed! Check your dev server is running.`);
        process.exit(1);
      } else if (result.failureCount > result.successCount) {
        console.log(`\n⚠️  More screenshots failed than succeeded. Check for issues.`);
      } else {
        console.log(`\n✅ Most screenshots captured successfully!`);
      }
    } else {
      console.log(`\n🎉 All screenshots captured successfully!`);
    }
    
    console.log(`📁 Check the ${outputDir} directory for your screenshots.`);

  } catch (error) {
    console.error('❌ Error capturing screenshots:', error);
    process.exit(1);
  } finally {
    await capture.close();
  }
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

main();
