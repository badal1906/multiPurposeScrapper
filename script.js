const puppeteer = require('puppeteer');



(async () => {
  const browser = await puppeteer.launch({
      headless:false,
      defaultViewport: null,
      args:["--start-maximized"],
  });
  const page = await browser.newPage();
  await page.goto('https://www.hindustantimes.com/');
  
  // await page.waitForSelector(".hdg3");
  // await page.click(".hdg3");

  // document.querySelectorAll(".hdg3");
  let data =await page.evaluate(function (){
    let allTopics = document.querySelectorAll(".hdg3");
    let topics = [];
    for(let i=0;i<allTopics.length;i++){
      topics[i] = allTopics[i].innerText;
      console.log(topics[i]);
    }
    return topics;
  })
  
  console.log(data);
})();

