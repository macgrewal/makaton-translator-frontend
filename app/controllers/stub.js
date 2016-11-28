var express = require('express'),
  router = express.Router();

module.exports = function (app) {
  app.use('/api/', router);
};

router.get('/words', function (req, res, next) {
  res.send({
    cards: req.query.cards,
    words: "hello, I am the makaton translator!"
  });
});

router.get('/cards', function (req, res, next) {
  res.send({
    words: req.query.words,
    cards: [1, 2, 3, 5, 6, 7, 8, 9, 10]
  });
});
