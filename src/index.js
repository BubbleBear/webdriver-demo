const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');

const chromeService = new chrome.ServiceBuilder(chromedriver.path).build();
chrome.setDefaultService(chromeService);

const driver = new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .build();

(async () => {
    await driver.get('http://localhost:7777');

    await new Promise((resolve) => {
        setTimeout(resolve, 3000);
    });

    await driver.close();
    await driver.quit();
})();
