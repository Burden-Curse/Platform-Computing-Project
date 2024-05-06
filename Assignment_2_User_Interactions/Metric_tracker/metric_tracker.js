const {By, Builder, Browser} = require('selenium-webdriver');
const fs = require('fs');

async function writeToCSV(filename, metrics) {
    const csvData = metrics.map(metric => Object.values(metric).join(', ')).join('\n');
    fs.writeFileSync(filename, Object.keys(metrics[0]).join(', ') + '\n' + csvData);
}

async function main() {
    // Initialize browser
    let driver; 

    try {
      driver = await new Builder().forBrowser(Browser.CHROME).build();
     // Navigate to your website 
     await driver.get('http://localhost:3000/');

        // Initialize variables
        let metrics = [];
        const SAMPLE_SIZE = 6; //results in 6 entries in metrics.csv about every 2 seconds
        let count = 0;
        const startTime = Date.now();

        while (count < SAMPLE_SIZE) {
            // Track presence time
            const currentTime = Date.now();
            const presenceTime = (currentTime - startTime) / 1000; //Convert milliseconds to seconds since 1 second is equivalent to 1000 miliseconds
            console.log(`Presence time: ${presenceTime} seconds`);

            // Track scrolling
            const scrollHeight = await driver.executeScript("return document.body.scrollHeight");
            const currentScroll = await driver.executeScript("return window.pageYOffset");
            console.log(`Scrolled ${currentScroll}/${scrollHeight} pixels`);

            metrics.push({
                "TIMESTAMP (HH:MM:SS)": new Date().toLocaleTimeString(),
                " Presence time (Seconds)": presenceTime,
                " Scrolling (Pixels)": currentScroll / scrollHeight
            });

            count++;
            await new Promise(resolve => setTimeout(resolve, 2000));
        }

        console.log(metrics);
        await writeToCSV("metrics.csv", metrics);
    } finally {
        await driver.quit();
    }
}

main().catch(console.error);