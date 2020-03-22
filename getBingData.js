const puppeteer = require('puppeteer');
const CircularJSON = require('circular-json');
exports.getBingData = getBingData

async function getBingData(req, res, next) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
//   page
//     .on('console', message => {
//     console.log(message.text());
//     //const str = CircularJSON.stringify(message.text());
//     //print(str);
//      res.send(message.text());
//     })
page.on('console', async msg => console[msg._type](
  ...await Promise.all(msg.args().map(async arg => {
     let data = await arg.jsonValue()
     res.send(data.world.areas)
  }
    ),
)));
  await page.goto('https://www.bing.com/covid', {"waitUntil" : "networkidle0"});
  browser.close();
  
  
}

