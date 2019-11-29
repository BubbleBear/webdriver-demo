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

        const result = await driver.executeAsyncScript((target, ) => {
            const callback = arguments[arguments.length - 1];
            target.addEventListener('transitionend', () => {
                callback('transitionend');
            }, {
                once: true
            });

            setTimeout(() => {
                callback('timeout');
            }, 1000);
        }, transitionBox);

        console.log(result);
    } catch (e) {
        console.log(e);
    }

    await driver.close();
    await driver.quit();
})();
