#!/usr/bin/env node

import { ScreenshotCapture, MIND_FOLK_ROUTES, MOBILE_ROUTES, TABLET_ROUTES } from '../src/utils/screenshot-capture.js';
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
        console.log('📱 Capturing mobile screenshots...');
        const mobileScreenshots = await capture.captureAllRoutes(MOBILE_ROUTES, { ...config, fullPage: false });
        await capture.saveScreenshots(mobileScreenshots, join(outputDir, 'mobile'));

        console.log('📱 Capturing tablet screenshots...');
        const tabletScreenshots = await capture.captureAllRoutes(TABLET_ROUTES, config);
        await capture.saveScreenshots(tabletScreenshots, join(outputDir, 'tablet'));

        console.log('💻 Capturing desktop screenshots...');
        const desktopScreenshots = await capture.captureAllRoutes(MIND_FOLK_ROUTES, config);
        await capture.saveScreenshots(desktopScreenshots, join(outputDir, 'desktop'));
        
        console.log('🎉 All screenshots captured successfully!');
        return;
      default:
        routes = MIND_FOLK_ROUTES;
    }

    console.log(`📸 Capturing ${routes.length} screenshots...`);
    const screenshots = await capture.captureAllRoutes(routes, config);
    
    console.log(`💾 Saving screenshots to ${outputDir}...`);
    await capture.saveScreenshots(screenshots, outputDir);
    
    console.log('🎉 Screenshots captured successfully!');
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
