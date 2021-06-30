const readline = require('readline');
const puppeteer = require('puppeteer');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: ""
});
rl.prompt();

let a;

rl.on("line", function (input) {
  if (input == "hindustan times") {

    (async () => {
      const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized"],
      });
      const page = await browser.newPage();
      await page.goto('https://www.hindustantimes.com/');

      // await page.waitForSelector(".hdg3");
      // await page.click(".hdg3");

      // document.querySelectorAll(".hdg3");
      let data = await page.evaluate(function () {
        let allTopics = document.querySelectorAll(".hdg3");
        let topics = [];
        for (let i = 0; i < allTopics.length; i++) {
          topics[i] = allTopics[i].innerText;
          console.log(topics[i]);
        }
        return topics;
      })

      console.log(data);
    });

    rl.close();
  }
  else if (input == "shows") {

    (async () => {
      const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized"],
      });
      const page = await browser.newPage();
      await page.goto('https://www.imdb.com/chart/toptv/?ref_=nv_tvv_250');

      // await page.waitForSelector(".hdg3");
      // await page.click(".hdg3");

      // document.querySelectorAll(".hdg3");
      await autoScroll(page);
      
      let data = await page.evaluate(function () {
        let allTopShows = document.querySelectorAll(".titleColumn");
        let topShows = [];
        for (let i = 0; i < allTopShows.length; i++) {
          topShows[i] = allTopShows[i].innerText;
        }
        return topShows;
      })
      
      console.log(data);
    })();

    async function autoScroll(page) {
      await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
          var totalHeight = 0;
          var distance = 200;
          var timer = setInterval(() => {
            var scrollHeight = document.body.scrollHeight;
            window.scrollBy(0, distance);
            totalHeight += distance;
            allTopShows = document.querySelectorAll(".titleColumn");
            if (totalHeight >= scrollHeight) {
              clearInterval(timer);
              resolve();
            }
          }, 100);
        });
      });
    }
    
    rl.close();
  }
  else if(input == "reddit"){
    (async () => {
      const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized"],
      });
      const page = await browser.newPage();
      await page.goto('https://old.reddit.com/');

      
      let allPosts=await page.evaluate(function (){
        let elements = document.querySelectorAll("#siteTable > div[class*=thing]");
        let results = [];

        for(let i=0;i<elements.length;i++){
          let title =  document.querySelector('p[class="title"]').innerText.trim();
          let rank =  document.querySelector('span[class="rank"]').innerText.trim();
          let postTime =  document.querySelector(".tagline .author").getAttribute('title');
          let authorUrl =  document.querySelector(".tagline .author").getAttribute("href");
          let authorName =  document.querySelector(".tagline .author").innerText.trim();
          let score =  document.querySelector('div[class="score likes"]').innerText.trim();
          let comments =  document.querySelector('a[data-event-action="comments"]').innerText.trim();
          
            results.push({
            title,
            rank,
            postTime,
            authorUrl,
            authorName,
            score,
            comments
          })
        }
        return results;
      })
      await allPosts;
      console.log(allPosts);

      

      //   let elements = await page.$$("#siteTable > div[class*=thing]");
      //   let results = [];

      //   for(let element of elements){

      //     let title =  await element.$eval('p[class="title"]').innerText.trim();
      //     let rank =  await element.$eval('span[class="rank"]').innerText.trim();
      //     let postTime =  await element.$eval('p[class="title"] > time').getAttribute('title');
      //     let authorUrl =  ('p[class="tagLine"] > a[class*="author"]').getAttribute('href');
      //     let authorName =  ('p[class="tagLine"] > a[class*="author"]').innerText.trim();
      //     let score =  ('div[class="score likes"]').innerText.trim();
      //     let comments =  ('a[data-event="comments]').innerText.trim();
          
      //     results.push({
      //       title,
      //       rank,
      //       postTime,
      //       authorUrl,
      //       authorName,
      //       score,
      //       comments
      //     })

      //   }
        
      // }
      // return results;
      
    })();
  }

});