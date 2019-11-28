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

    try {
        const transitionBox = await driver.findElement(webdriver.By.css('.transition'));

        const Emitter = require('./event-emitter');
        const Timer = require('./timer');

        const result = await driver.executeAsyncScript(`
            const callback = arguments[arguments.length];
            console.log(${Emitter});
            callback(1);
        `);

        console.log(result);

        await new Promise((resolve) => {
            setTimeout(resolve, 10000);
        });
    } catch (e) {
        console.log(e);
    }

    await driver.close();
    await driver.quit();
})();
