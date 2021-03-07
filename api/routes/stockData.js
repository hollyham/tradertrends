var express = require('express');
var router = express.Router();
const config = require('../../config.js');

// Finnhub setup
const finnhub = require('finnhub');
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = config.FINNHUB_API_KEY;
const finnhubClient = new finnhub.DefaultApi();

// GET stock data
router.get('/', function(req, res, next) {
  finnhubClient.quote("AAPL", (error, data, _) => {
    response = {
      AAPL: -1 
    };
    if (error) { res.send(response); }

    response.AAPL = data.c;
    res.send(response);
  });
});

module.exports = router;