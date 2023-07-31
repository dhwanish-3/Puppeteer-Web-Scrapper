const puppeteer = require('puppeteer');
const fs = require("fs");

const scrapper = async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://www.instagram.com');
    // await page.screenshot({ path: 'google.png' });
    await page.pdf({ path: "example.pdf", format: "A4"});

    const html = await page.content();
    
    const title = await page.evaluate(() => document.title);
    const text = await page.evaluate(() => document.body.innerText);

    const links = await page.evaluate(() => Array.from(document.querySelectorAll('a'), (e) => e.href));

    const courses = await page.evaluate(() =>
        Array.from(document.querySelectorAll('#courses .card'), (e) => ({
            title: e.querySelector(".card-body h3").innerText,
            level: e.querySelector(".card-body .level").innerText,
            url: e.querySelector(".card-footer a").href,
            promo: e.querySelector(".card-footer .promo-code .promo").innerText
        }))
    );
    console.log(courses);

    const courses2 = await page.$$eval('#courses .card', (elements) => 
    elements.map((e) => ({
        title: e.querySelector(".card-body h3").innerText,
        level: e.querySelector(".card-body .level").innerText,
        url: e.querySelector(".card-footer a").href,
        promo: e.querySelector(".card-footer .promo-code .promo").innerText
    })) );

    fs.writeFile("courses.json", JSON.stringify(courses), (err) => {
        if (err) throw err;
        console.log("File Saved");
    });
    
    await browser.close();
}

scrapper();