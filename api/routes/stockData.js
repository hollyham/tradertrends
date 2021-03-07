var express = require('express');
var router = express.Router();
const config = require('../../config.js');
const axios = require('axios')
// Finnhub setup
const finnhub = require('finnhub');
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = config.FINNHUB_API_KEY;
const finnhubClient = new finnhub.DefaultApi();

// GET stock data
router.get('/', function(req, res, next) {
  finnhubClient.quote('AAPL', (error, data, _) => { 
    !error ? res.send({'AAPL': data.c }) : res.send({'AAPL': -1});
  }
)});

// GET batch stock data

router.get('/batch', async function(req, res, next) {
  var tickerList = ["AAPL", "MSFT"]; // temp - CHANGE LATER
  var dictionary = {};
  var i;

  for (i = 0; i < tickerList.length; i++){
    var ticker = tickerList[i];
    try {      
      const res = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${config.FINNHUB_API_KEY}`);
      dictionary[ticker] = res.data.c;
    } catch (err) {
      console.log(err)
    }
    
  } 
  res.send(dictionary); 
}); 

module.exports = router;