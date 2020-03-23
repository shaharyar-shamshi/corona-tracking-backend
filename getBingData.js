const puppeteer = require('puppeteer');
const CircularJSON = require('circular-json');
const request = require("request");

exports.getBingData = getBingData
exports.getNews = getNews

async function getBingData(req, res, next) {
  const browser = await puppeteer.launch({
    'args' : [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  });
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
  await browser.close();
  
  
}

async function getNews(req, res, next) {
var options = { method: 'GET',
  url: 'https://api.cognitive.microsoft.com/bing/v7.0/news/search',
  qs: 
   { q: 'corona virus',
     count: '10',
     offset: '0',
     mkt: 'en-IN',
     safeSearch: 'Moderate' 
    },
  headers: 
   {
     'Ocp-Apim-Subscription-Key': '12cef95241784b3b868b1111b9af4625' 
    } 
  };

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  res.send(JSON.parse(body).value)
});

}

