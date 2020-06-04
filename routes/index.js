var router = require("express").Router();
const getBingData = require("../controllers/getBingData");
const getHistoricalData = require("../controllers/getHistoricalData");

router.get("/getData", getBingData.getBingData);
router.get("/getHistoricalData", getHistoricalData.getHistoricaldata);
router.get("/getNews", getBingData.getNews);

module.exports = router;
