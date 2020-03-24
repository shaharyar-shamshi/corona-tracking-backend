const axios = require("axios");
const redis = require("redis");
const request = require("request");

exports.getBingData = getBingData
exports.getNews = getNews

const port_redis = process.env.PORT || 6379;

//Configure redis client on port 6379
const redis_client = redis.createClient(port_redis);

async function getBingData(req, res, next) {
  let data = await axios("https://www.bing.com/covid/data?IG=3FBCD20593A54108A6F62BA0E4BF2FA5")
  data = data.data
  redis_client.setex("bingData", 7200, JSON.stringify(data));
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
     'Ocp-Apim-Subscription-Key': '******@**' 
    } 
  };

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  res.send(JSON.parse(body).value)
});

}

