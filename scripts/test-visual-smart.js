#!/usr/bin/env node

/**
 * Smart Visual Testing Script
 * Automatically detects the dev server port and runs Playwright tests
 */

import { getBaseUrl } from '../src/utils/port-detector.ts';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function runVisualTests() {
  console.log('🎭 Starting smart visual tests...');
  
  try {
    // Detect the dev server port
    const baseUrl = await getBaseUrl('http://localhost:5173', { verbose: true });
    console.log(`✅ Detected dev server at: ${baseUrl}`);
    
    // Set environment variable for Playwright
    process.env.BASE_URL = baseUrl;
    
    // Run Playwright tests
    console.log('🚀 Running Playwright tests...');
    const playwright = spawn('npx', ['playwright', 'test', '--config=playwright.config.ts'], {
      stdio: 'inherit',
      env: { ...process.env, BASE_URL: baseUrl }
    });
    
    playwright.on('close', (code) => {
      if (code === 0) {
        console.log('✅ Visual tests completed successfully!');
      } else {
        console.log(`❌ Visual tests failed with code ${code}`);
        process.exit(code);
      }
    });
    
    playwright.on('error', (error) => {
      console.error('❌ Error running Playwright tests:', error);
      process.exit(1);
    });
    
  } catch (error) {
    console.error('❌ Error detecting dev server:', error.message);
    console.log('💡 Make sure to run "npm run dev" first!');
    process.exit(1);
  }
}

runVisualTests();
