const axios = require("axios");

exports.getHistoricaldata = getHistoricaldata;

async function getHistoricaldata(req, res, next) {
  let response = await axios(
    "https://coronavirus-tracker-api.herokuapp.com/v2/locations?country_code=IN&timelines=1"
  );
  response = JSON.stringify(response.data);
  res.send(response);
}
