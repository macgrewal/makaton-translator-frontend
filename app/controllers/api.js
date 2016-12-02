var service = require('../services/translation'),
  express = require('express'),
  router = express.Router();

module.exports = function (app) {
  app.use('/api/', router);
};

router.get('/words', function (req, res, next) {
  service.getWords(req.query.cards, function (data) {
    res.send({
      userid: req.query.username || 'makaton.user',
      words: data,
      cards: req.query.cards.map(function (item) {
        return {
          id: item.id
        }
      })
    });
  });
});

router.get('/cards', function (req, res, next) {
  service.getCards(req.query.words, function (data) {
    res.send({
      userid: req.query.username || 'english.user',
      words: req.query.words,
      cards: data
    });
  });
});
