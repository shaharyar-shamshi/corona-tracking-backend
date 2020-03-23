const express = require("express");
const app = express();
var router = express.Router();
const getBingData = require('./getBingData')
const getHistoricalData = require('./getHistoricalData')
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({limit: '50mb', extended: true})); 
app.use(bodyParser.json({limit: '50mb'}));


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



//get call
  app.get('/getData', getBingData.getBingData);
  app.get('/getHistoricalData', getHistoricalData.getHistoricaldata )
  app.get('/getNews', getBingData.getNews)

app.listen(port, () => console.log("listening"));