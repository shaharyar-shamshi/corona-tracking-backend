const express = require("express");
const app = express();
var router = express.Router();
const getBingData = require('./getBingData')
const getHistoricalData = require('./getHistoricalData')
const bodyParser = require('body-parser');
const redis = require("redis");

const port_redis = process.env.PORT || 6379;
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({limit: '50mb', extended: true})); 
app.use(bodyParser.json({limit: '50mb'}));

const redis_client = redis.createClient(port_redis);

app.use(function (req, res, next) { 
// Website you wish to allow to connect 
res.setHeader('Access-Control-Allow-Origin', '*'); 
// Request methods you wish to allow 
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE'); 
// Request headers you wish to allow 
res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,authorization'); 
// Set to true if you need the website to include cookies in the requests sent 
// to the API (e.g. in case you use sessions) 
res.setHeader('Access-Control-Allow-Credentials', true); 
// Pass to next layer of middleware 
next(); 
});

//Middleware Function to Check Cache
checkCache = (req, res, next) => {
  // const { id } = req.params;

  redis_client.get("bingData", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    //if no match found
    if (data != null) {
      res.send(JSON.parse(data));
    } else {
      //proceed to next middleware function
      next();
    }
  });
};

//get call
  app.get('/getData', checkCache, getBingData.getBingData);
  app.get('/getHistoricalData', getHistoricalData.getHistoricaldata )
  app.get('/getNews', getBingData.getNews)

app.listen(port, () => console.log("listening"));