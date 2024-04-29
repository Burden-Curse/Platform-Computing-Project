const {By, Builder, Browser} = require('selenium-webdriver');

async function findKeyword(driver, keyword) {
    console.log((await driver.getPageSource()).toLowerCase());
    return (await driver.getPageSource()).toLowerCase().includes(keyword.toLowerCase());
}

async function countTagElem(driver, tag_name) {
    let count = 0;
    for (const tagNames of tag_name) {
        const elements = await driver.findElements(By.css(tagNames));
        count += elements.length;
    }
    return count; 
}

async function clickLink(driver, tag_name) {
    const links = await driver.findElements(By.css(tag_name));
    for (const link of links) {
        await link.click();
    }
}

//action is a string which is either keyword, image or link
async function userAction(action, driver, rewardTime, reqList) {
    let totalRewardTime = 0;
    if (action.toUpperCase() === "KEYWORD") {
        for (const keyword of reqList) {
            if (await findKeyword(driver, keyword)) {
                console.log("found", keyword);
                totalRewardTime += rewardTime;
                await driver.sleep(rewardTime * 1000); //Multiply by 1000 milliseconds since 1 second is equivalent to 1000 miliseconds
            } else {
                console.log(keyword, "not found");
            }
        }
    } else if (action.toUpperCase() === "IMAGE") {
        const numImages = await countTagElem(driver, reqList);
        totalRewardTime = rewardTime * numImages;
        await driver.sleep(totalRewardTime * 1000); //Multiply by 1000 milliseconds since 1 second is equivalent to 1000 miliseconds
    } else if (action.toUpperCase() === "LINK") {
        const numLinks = await countTagElem(driver, reqList);
        totalRewardTime += rewardTime * numLinks;
        await driver.sleep(totalRewardTime * 1000); //Multiply by 1000 milliseconds since 1 second is equivalent to 1000 miliseconds
    }
    return totalRewardTime;
}

async function main() {
    //Initialize browser
    let driver = await new Builder().forBrowser(Browser.CHROME).build();
    try {
        //Navigate to your website
        await driver.get("http://localhost:3000/");

        const rewardTime = 10;
        let totalRewardTime = 0;

        //comment out the 3 lines of code below to get empty arrays to simulate a Presence Time of 0
        //const keywords = []; //Empty array to simulate no keywords found;
        //const tagNames = []; //Empty array to simulate no images found
        //const link = []; //Empty array to simulate no links found
        //the website will exit right away because the Presence Time is 0 if keywords, tagNames, and link are ALL empty arrays

        //uncomment the 3 lines of code below so that keywords, tagnames, and link are NOT empty arrays to no longer 
        //output a Presence Time of 0
        //const keywords = ["student", "CSUSB"];
        //const tagNames = ["img"];
        //const link = ["a"];

        //A Unique User's preferences are below
        const keywords = ["active", "workout"];
        const tagNames = ["img"];
        const link = ["h"];
        //This user prefers content related to exercise as hinted by the keywords "active and "workout".
        //This user prefers images of step by step workout tutorials over video tutorials as evidenced by the tagnames = "img".
        //Lastly, the user prefers links that direct to more helpful resources on the topics of working out and nutrition.

        totalRewardTime += await userAction("KEYWORD", driver, rewardTime, keywords);
        totalRewardTime += await userAction("IMAGE", driver, rewardTime, tagNames);
        totalRewardTime += await userAction("LINK", driver, rewardTime, link);

        console.log("Presence Time:", totalRewardTime);
    } finally {
        await driver.quit();
    }
}

main().catch(console.error);