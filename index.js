const puppeteer = require('puppeteer');

const scrapper = async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://www.instagram.com');
    await page.screenshot({ path: 'google.png' });
    await browser.close();
}

scrapper();