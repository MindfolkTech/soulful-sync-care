#!/usr/bin/env node

/**
 * Test script to demonstrate smart port detection
 * Run this to see how the port detection works
 */

import { detectDevServerPort, getBaseUrl } from '../src/utils/port-detector.ts';

async function testPortDetection() {
  console.log('🧪 Testing Smart Port Detection\n');

  try {
    console.log('1. Detecting dev server port...');
    const detectedUrl = await detectDevServerPort({ verbose: true });
    console.log(`✅ Successfully detected: ${detectedUrl}\n`);

    console.log('2. Testing with fallback...');
    const fallbackUrl = await getBaseUrl('http://localhost:9999', { verbose: true });
    console.log(`✅ Fallback result: ${fallbackUrl}\n`);

    console.log('3. Testing verbose mode...');
    await detectDevServerPort({ verbose: true });

  } catch (error) {
    console.log(`❌ Error: ${error.message}\n`);
    console.log('💡 Make sure to run "npm run dev" first!');
  }
}

testPortDetection();
