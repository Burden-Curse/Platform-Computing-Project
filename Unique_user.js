const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function detectElementPresence() {
    const options = new chrome.Options();
    options.addArguments('--headless');
    const driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();
    try {
        const url = 'file:///C:/Users/Santiago%20Perez/Desktop/Assingment4/Helldiver.html';
        await driver.get(url);
        const elementSelector = '#name';
        let formElement;
        try {
            formElement = await driver.wait(until.elementLocated(By.css(elementSelector)), 10000); 
        } catch (error) {
            console.log("Helldivers enlistment application form not found");
        }
        if (formElement) {
            const presenceStartTime = new Date();
            const presenceEndTime = new Date();
            const presenceTimeInSeconds = (presenceEndTime - presenceStartTime) / 1000;
            console.log(`Helldivers enlistment application form found and appeared for ${presenceTimeInSeconds} seconds`);
        }
    } finally {
        await driver.quit();
    }
}

detectElementPresence();
