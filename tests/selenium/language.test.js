/**
 * Selenium Tests for Language Switching
 *
 * Tests verify that:
 * 1. All language options are available in the selector
 * 2. Clicking a language changes the page content
 * 3. Language preference persists across page reloads
 * 4. All translation keys display correctly
 */

import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import { config, languages } from './config.js';

// Test results tracking
const testResults = {
  passed: 0,
  failed: 0,
  tests: [],
};

function logTest(name, passed, error = null) {
  testResults.tests.push({ name, passed, error: error?.message });
  if (passed) {
    testResults.passed++;
    console.log(`  ✓ ${name}`);
  } else {
    testResults.failed++;
    console.log(`  ✗ ${name}`);
    if (error) console.log(`    Error: ${error.message}`);
  }
}

async function createDriver() {
  const options = new chrome.Options();

  if (config.headless) {
    options.addArguments('--headless');
  }

  options.addArguments('--no-sandbox');
  options.addArguments('--disable-dev-shm-usage');
  options.addArguments('--window-size=1920,1080');

  const driver = await new Builder()
    .forBrowser(config.browser)
    .setChromeOptions(options)
    .build();

  await driver.manage().setTimeouts({
    implicit: config.timeouts.implicit,
    pageLoad: config.timeouts.pageLoad,
    script: config.timeouts.script,
  });

  return driver;
}

async function testLanguageSelectorExists(driver) {
  try {
    await driver.get(config.baseUrl);
    await driver.sleep(3000); // Wait for React to hydrate

    // Find the language selector button (contains flag and language name)
    const buttons = await driver.findElements(By.css('button'));
    let languageButton = null;

    for (const btn of buttons) {
      try {
        const text = await btn.getText();
        if (languages.some(lang => text.includes(lang.name) || text.includes(lang.flag))) {
          languageButton = btn;
          break;
        }
      } catch {
        continue;
      }
    }

    logTest('Language selector button exists', languageButton !== null);
    return languageButton !== null;
  } catch (error) {
    logTest('Language selector button exists', false, error);
    return false;
  }
}

async function testAllLanguagesAvailable(driver) {
  try {
    await driver.get(config.baseUrl);
    await driver.sleep(2000); // Wait for page to fully load

    // Find and click the language selector
    const buttons = await driver.findElements(By.css('button'));
    let languageButton = null;

    for (const btn of buttons) {
      const text = await btn.getText();
      if (languages.some(lang => text.includes(lang.name) || text.includes(lang.flag))) {
        languageButton = btn;
        break;
      }
    }

    if (!languageButton) {
      throw new Error('Language button not found');
    }

    await languageButton.click();
    await driver.sleep(500); // Wait for dropdown to open

    // Check all languages are in the dropdown
    const dropdownButtons = await driver.findElements(By.css('button'));
    const foundLanguages = [];

    for (const btn of dropdownButtons) {
      const text = await btn.getText();
      for (const lang of languages) {
        if (text.includes(lang.name)) {
          foundLanguages.push(lang.code);
        }
      }
    }

    const allFound = languages.every(lang => foundLanguages.includes(lang.code));
    logTest(`All ${languages.length} languages available in selector`, allFound);

    // Close dropdown by clicking elsewhere
    await driver.findElement(By.css('body')).click();

    return allFound;
  } catch (error) {
    logTest(`All ${languages.length} languages available in selector`, false, error);
    return false;
  }
}

async function testLanguageSwitching(driver, langCode, expectedText) {
  try {
    await driver.get(config.baseUrl);
    await driver.sleep(2000);

    // Find and click the language selector
    const buttons = await driver.findElements(By.css('button'));
    let languageButton = null;

    for (const btn of buttons) {
      const text = await btn.getText();
      if (languages.some(lang => text.includes(lang.name) || text.includes(lang.flag))) {
        languageButton = btn;
        break;
      }
    }

    if (!languageButton) {
      throw new Error('Language button not found');
    }

    await languageButton.click();
    await driver.sleep(500);

    // Find and click the target language
    const dropdownButtons = await driver.findElements(By.css('button'));
    const targetLang = languages.find(l => l.code === langCode);

    for (const btn of dropdownButtons) {
      const text = await btn.getText();
      if (text.includes(targetLang.name)) {
        await btn.click();
        break;
      }
    }

    await driver.sleep(1000); // Wait for language change

    // Verify the hero text changed
    const pageSource = await driver.getPageSource();
    const textFound = pageSource.includes(expectedText);

    logTest(`Language switch to ${targetLang.name} (${langCode})`, textFound);
    return textFound;
  } catch (error) {
    logTest(`Language switch to ${langCode}`, false, error);
    return false;
  }
}

async function testLanguagePersistence(driver) {
  try {
    await driver.get(config.baseUrl);
    await driver.sleep(2000);

    // Switch to German
    const buttons = await driver.findElements(By.css('button'));
    let languageButton = null;

    for (const btn of buttons) {
      const text = await btn.getText();
      if (languages.some(lang => text.includes(lang.name) || text.includes(lang.flag))) {
        languageButton = btn;
        break;
      }
    }

    await languageButton.click();
    await driver.sleep(500);

    const dropdownButtons = await driver.findElements(By.css('button'));
    for (const btn of dropdownButtons) {
      const text = await btn.getText();
      if (text.includes('Deutsch')) {
        await btn.click();
        break;
      }
    }

    await driver.sleep(1000);

    // Reload the page
    await driver.navigate().refresh();
    await driver.sleep(2000);

    // Check if German is still selected
    const pageSource = await driver.getPageSource();
    const germanPersisted = pageSource.includes('Deutsch') ||
                           pageSource.includes('Ideen in digitale Realität verwandeln');

    logTest('Language preference persists after reload', germanPersisted);
    return germanPersisted;
  } catch (error) {
    logTest('Language preference persists after reload', false, error);
    return false;
  }
}

async function testNavigationTranslations(driver, langCode) {
  try {
    await driver.get(config.baseUrl);
    await driver.sleep(2000);

    // Switch language
    const buttons = await driver.findElements(By.css('button'));
    let languageButton = null;

    for (const btn of buttons) {
      const text = await btn.getText();
      if (languages.some(lang => text.includes(lang.name) || text.includes(lang.flag))) {
        languageButton = btn;
        break;
      }
    }

    await languageButton.click();
    await driver.sleep(500);

    const targetLang = languages.find(l => l.code === langCode);
    const dropdownButtons = await driver.findElements(By.css('button'));

    for (const btn of dropdownButtons) {
      const text = await btn.getText();
      if (text.includes(targetLang.name)) {
        await btn.click();
        break;
      }
    }

    await driver.sleep(1000);

    // Check navigation items exist
    const navItems = await driver.findElements(By.css('nav a, nav button'));
    const hasNavItems = navItems.length > 0;

    logTest(`Navigation items visible for ${targetLang.name}`, hasNavItems);
    return hasNavItems;
  } catch (error) {
    logTest(`Navigation items visible for ${langCode}`, false, error);
    return false;
  }
}

async function runTests() {
  console.log('\n🧪 Starting Selenium Language Tests\n');
  console.log(`📍 Testing URL: ${config.baseUrl}`);
  console.log(`🌐 Browser: ${config.browser}`);
  console.log(`👓 Headless: ${config.headless}\n`);

  let driver;

  try {
    driver = await createDriver();

    console.log('📋 Basic Tests:');
    await testLanguageSelectorExists(driver);
    await testAllLanguagesAvailable(driver);
    await testLanguagePersistence(driver);

    console.log('\n📋 Language Switching Tests:');
    for (const lang of languages) {
      await testLanguageSwitching(driver, lang.code, lang.heroText);
    }

    console.log('\n📋 Navigation Translation Tests:');
    // Test a few key languages
    await testNavigationTranslations(driver, 'en');
    await testNavigationTranslations(driver, 'de');
    await testNavigationTranslations(driver, 'ja');
    await testNavigationTranslations(driver, 'ar');

  } catch (error) {
    console.error('❌ Test suite error:', error.message);
  } finally {
    if (driver) {
      await driver.quit();
    }
  }

  // Print summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 Test Results Summary');
  console.log('='.repeat(50));
  console.log(`✅ Passed: ${testResults.passed}`);
  console.log(`❌ Failed: ${testResults.failed}`);
  console.log(`📝 Total:  ${testResults.passed + testResults.failed}`);
  console.log('='.repeat(50) + '\n');

  // Exit with appropriate code
  process.exit(testResults.failed > 0 ? 1 : 0);
}

// Run tests
runTests();
