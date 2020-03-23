
const axios = require("axios");
const request = require("request");

exports.getBingData = getBingData
exports.getNews = getNews

async function getBingData(req, res, next) {
let data = await axios("https://www.bing.com/covid/data?IG=3FBCD20593A54108A6F62BA0E4BF2FA5")
data = data.data
res.send(data.areas)
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

