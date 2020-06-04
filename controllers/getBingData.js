const axios = require("axios");
const NodeCache = require("node-cache");
const request = require("request");

const myCache = new NodeCache({ stdTTL: 100, checkperiod: 600 });
exports.getBingData = getBingData;
exports.getNews = getNews;

async function getBingData(req, res, next) {
  const cache = myCache.get("bingData");
  if (cache) {
    res.send(JSON.parse(cache).areas);
  } else {
    try {
      let data = await axios(
        "https://www.bing.com/covid/data?IG=3FBCD20593A54108A6F62BA0E4BF2FA5"
      );
      data = data.data;
      myCache.set("bingData", JSON.stringify(data), 7200);
      res.send(data.areas);
    } catch (error) {
      console.log(error.message);
      res.status(error.response.status).send(error.message);
    }
  }
}

async function getNews(req, res, next) {
  var options = {
    method: "GET",
    url: "https://api.cognitive.microsoft.com/bing/v7.0/news/search",
    qs: {
      q: "corona virus",
      count: "10",
      offset: "0",
      mkt: "en-IN",
      safeSearch: "Moderate",
    },
    headers: {
      "Ocp-Apim-Subscription-Key": "******@**",
    },
  };

  // try {
  //   let data = await axios(options);
  //   data = data.data;
  //   myCache.set("bingData", JSON.stringify(data), 7200);
  //   res.send(data.areas);
  // } catch (error) {
  //   console.log(error.message);
  //   res.status(error.response.status).send(error.message);
  // }

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    res.send(JSON.parse(body).value);
  });
}
