# Selenium Tests

Automated tests for verifying language switching functionality.

## Prerequisites

1. **Chrome Browser** - Tests use Chrome WebDriver by default
2. **ChromeDriver** - Must be installed and in PATH
   - Download from: https://chromedriver.chromium.org/downloads
   - Or install via npm: `npm install -g chromedriver`

## Running Tests

### Start the dev server first:
```bash
npm run dev
```

### Run tests (in a new terminal):
```bash
npm test
```

### Run tests in headless mode:
```bash
npm run test:headless
```

### Custom configuration:
```bash
# Custom URL
TEST_URL=http://localhost:3000 npm test

# Different browser (firefox, edge)
TEST_BROWSER=firefox npm test

# Headless mode
HEADLESS=true npm test
```

## Test Coverage

The tests verify:

1. **Language Selector Exists** - Checks the language dropdown is present
2. **All Languages Available** - Verifies all 9 languages appear in dropdown
3. **Language Switching** - Tests switching to each language:
   - English (en)
   - German (de)
   - Arabic (ar)
   - Japanese (ja)
   - Chinese (zh)
   - Indonesian (id)
   - Spanish (es)
   - French (fr)
   - Russian (ru)
4. **Language Persistence** - Verifies language preference survives page reload
5. **Navigation Translations** - Checks navigation items are visible in each language

## Test Output

```
🧪 Starting Selenium Language Tests

📍 Testing URL: http://localhost:5173
🌐 Browser: chrome
👓 Headless: false

📋 Basic Tests:
  ✓ Language selector button exists
  ✓ All 9 languages available in selector
  ✓ Language preference persists after reload

📋 Language Switching Tests:
  ✓ Language switch to English (en)
  ✓ Language switch to Deutsch (de)
  ✓ Language switch to العربية (ar)
  ...

==================================================
📊 Test Results Summary
==================================================
✅ Passed: 16
❌ Failed: 0
📝 Total:  16
==================================================
```

## Troubleshooting

### ChromeDriver version mismatch
If you see version mismatch errors, download the matching ChromeDriver version for your Chrome browser.

### Tests timing out
Increase timeouts in `tests/selenium/config.js`:
```javascript
timeouts: {
  implicit: 15000,  // Increase from 10000
  pageLoad: 60000,  // Increase from 30000
}
```

### Element not found
Make sure the dev server is running before starting tests.
