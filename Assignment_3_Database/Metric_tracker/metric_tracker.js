const {By, Builder, Browser} = require('selenium-webdriver');
const fs = require('fs');

//For Admin SDK configuration from Firebase -> Project settings -> Service accounts
const admin = require('firebase-admin');
//For Admin SDK configuration from Firebase -> Project settings -> Service accounts
const serviceAccount = require("./node_modules/fir-nosql-6192a-firebase-adminsdk-l6fdc-618b5cb849.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fir-nosql-6192a-default-rtdb.firebaseio.com"
}); //For Admin SDK configuration from Firebase -> Project settings -> Service accounts

const db = admin.firestore();

async function writeToCSV(filename, metrics) {
    const csvData = metrics.map(metric => Object.values(metric).join(', ')).join('\n');
    fs.writeFileSync(filename, Object.keys(metrics[0]).join(', ') + '\n' + csvData);
}

async function uploadToFirestore(metrics) {
    const collectionRef = db.collection('metrics'); // Update with your collection name
    for (const metric of metrics) {
      await collectionRef.add(metric);
    }
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
        await uploadToFirestore(metrics);
    } finally {
        await driver.quit();
    }
}

main().catch(console.error);