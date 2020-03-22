const puppeteer = require('puppeteer');
const CircularJSON = require('circular-json');
exports.getBingData = getBingData

async function getGovData(req, res, next) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.mohfw.gov.in/', {"waitUntil" : "networkidle0"});
  const totalCaseScanned = await page.evaluate(() => 
document.querySelector('.icount').innerText);
res.send(totalCaseScanned);
  browser.close();
  
  
}

