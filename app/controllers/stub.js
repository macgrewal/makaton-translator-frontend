var service = require('../services/translation'),
  express = require('express'),
  router = express.Router();

module.exports = function (app) {
  app.use('/api/', router);
};

router.get('/words', function (req, res, next) {
  service.getWords(req.query.cards, function (data) {
    res.send({
      words: data,
      cards: req.query.cards
    });
  });
});

router.get('/cards', function (req, res, next) {
  service.getCards(req.query.words, function (data) {
    res.send({
      words: req.query.words,
      cards: data
    });
  });
});
