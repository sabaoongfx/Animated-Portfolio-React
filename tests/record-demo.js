/**
 * Portfolio Demo Video Recorder
 * Uses Playwright to record a video while showcasing the portfolio features
 */

import { chromium } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config = {
  baseUrl: process.env.TEST_URL || 'http://localhost:5173',
  outputDir: path.join(__dirname, '..', 'public'),
  videoName: 'demo.webm',
};

// Languages to showcase
const languagesToShow = ['en', 'ja', 'ar', 'de'];

async function recordDemo() {
  console.log('🎬 Starting Portfolio Demo Recording\n');
  console.log(`📍 URL: ${config.baseUrl}`);
  console.log(`📁 Output: ${config.outputDir}/${config.videoName}\n`);

  const browser = await chromium.launch({
    headless: false, // Show browser for better recording
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    recordVideo: {
      dir: config.outputDir,
      size: { width: 1280, height: 720 },
    },
  });

  const page = await context.newPage();

  try {
    // 1. Load the page
    console.log('📄 Loading portfolio...');
    await page.goto(config.baseUrl);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000); // Let 3D animations load

    // 2. Scroll through hero section
    console.log('🌐 Showcasing hero section with 3D globe...');
    await page.waitForTimeout(2000);

    // 3. Scroll to Services
    console.log('📋 Scrolling to Services...');
    await page.evaluate(() => {
      document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
    });
    await page.waitForTimeout(2500);

    // 4. Scroll to Technologies
    console.log('💻 Scrolling to Technologies...');
    await page.evaluate(() => {
      document.querySelector('#technologies')?.scrollIntoView({ behavior: 'smooth' });
    });
    await page.waitForTimeout(2500);

    // 5. Scroll to About
    console.log('👤 Scrolling to About...');
    await page.evaluate(() => {
      document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
    });
    await page.waitForTimeout(2500);

    // 6. Scroll to Clients/Portfolio
    console.log('🏢 Scrolling to Clients...');
    await page.evaluate(() => {
      document.querySelector('#clients')?.scrollIntoView({ behavior: 'smooth' });
    });
    await page.waitForTimeout(2000);

    // 7. Scroll to Contact
    console.log('📧 Scrolling to Contact...');
    await page.evaluate(() => {
      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
    });
    await page.waitForTimeout(2000);

    // 8. Back to top
    console.log('⬆️ Back to top...');
    await page.evaluate(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    await page.waitForTimeout(2000);

    // 9. Toggle theme
    console.log('🌓 Toggling theme...');
    const themeToggle = await page.locator('button').filter({ has: page.locator('svg') }).first();
    if (themeToggle) {
      await themeToggle.click();
      await page.waitForTimeout(1500);
      await themeToggle.click();
      await page.waitForTimeout(1500);
    }

    // 10. Switch languages
    console.log('🌍 Switching languages...');
    for (const lang of languagesToShow) {
      // Find and click language selector
      const langButton = await page.locator('button').filter({ hasText: /English|Deutsch|日本語|العربية|中文|Indonesia|Español|Français|Русский/ }).first();
      if (langButton) {
        await langButton.click();
        await page.waitForTimeout(500);

        // Click the language option
        const langOption = await page.locator('button').filter({ hasText: new RegExp(lang === 'en' ? 'English' : lang === 'de' ? 'Deutsch' : lang === 'ja' ? '日本語' : lang === 'ar' ? 'العربية' : lang) });
        if (langOption) {
          await langOption.first().click();
          await page.waitForTimeout(1500);
        }
      }
    }

    // 11. Final pause on English
    console.log('✨ Final showcase...');
    await page.waitForTimeout(2000);

    console.log('\n✅ Recording complete!');

  } catch (error) {
    console.error('❌ Error during recording:', error.message);
  } finally {
    await page.close();
    await context.close();
    await browser.close();
  }

  console.log(`\n📹 Video saved to: ${config.outputDir}/`);
  console.log('   (Playwright saves with a unique filename, rename to demo.webm)');
}

// Run the recording
recordDemo().catch(console.error);
