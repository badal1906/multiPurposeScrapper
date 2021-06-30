const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        slowMo: 25,
        args: ["--start-maximized"],
    });
    const page = await browser.newPage();
    await page.goto('https://www.ndtv.com/latest');

    let data = await page.evaluate(function () {
        let latestNews = document.querySelectorAll(".newsHdng");
        let topics = [];
        for (let i = 0; i < latestNews.length; i++) {
            topics[i] = latestNews[i].innerText.trim('\n');
        }
        
        let allAnchors = document.querySelectorAll(
            "[class='newsHdng']>a"
        );

        let links = [];
        for (let i = 0; i < allAnchors.length; i++) {
            links.push(allAnchors[i].getAttribute("href"));
        }

        return {topics,links};

    })
    

    console.log(data);

})();