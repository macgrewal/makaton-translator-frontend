var http = require('http');

module.exports = (function () {
  var serviceDetails = {
    host: '35.164.223.189',
    port: 80,
    path: '/translate/',
    method: 'POST'
  };

  function callService(data, options, callback) {
    var result = '',
      req;

    req = http.request(options, function (res) {
      //   console.log('STATUS: ' + res.statusCode);
      //   console.log('HEADERS: ' + JSON.stringify(res.headers));
      res.on('data', function (chunk) {
        result += chunk;
        var data = JSON.parse(result);
        callback(data);
      });
    });

    req.on('error', (e) => {
      console.log(`problem with request: ${e.message}`);
    });

    req.write(data);

    req.end();
  }

  function wordsToCards(words, success) {
    var data = JSON.stringify({
        englishsentence: words
      }),
      headers = {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
        'Accept': 'application/json'
      },
      options = serviceDetails;

    options.headers = headers;

    var getData = function (data) {
      success(data.imagesentence);
    }

    callService(data, options, getData);
  }

  function cardsToWords(cards, success) {
    var data = JSON.stringify({
        imagesentence: cards
      }),
      headers = {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
        'Accept': 'application/json'
      },
      options = serviceDetails;

    options.headers = headers;

    var getData = function (data) {
      success(data.englishsentence);
    }

    callService(data, options, getData);
  }

  return {
    getWords: cardsToWords,
    getCards: wordsToCards
  }
})();
