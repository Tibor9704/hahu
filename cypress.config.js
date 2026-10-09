const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    supportFile: false,
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.family === 'chromium') {
          launchOptions.args = launchOptions.args.filter(
            (arg) => arg !== '--enable-automation'
          );
          
          launchOptions.args.push('--disable-blink-features=AutomationControlled');
          
          launchOptions.args.push('--no-sandbox');
          launchOptions.args.push('--disable-dev-shm-usage');
        }
        return launchOptions;
      });
    },
  },
});