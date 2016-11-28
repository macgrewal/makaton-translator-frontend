var express = require('express'),
  router = express.Router(),
  User = require('../models/user');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  var parent = new User({
    username: 'jane.doe',
    displayName: 'Mum',
    language: 'english'
  });

  var child = new User({
    username: 'jon.doe',
    displayName: 'Jon',
    language: 'makaton'
  });

  res.render('home/index', {
    title: 'Makaton Translator',
    englishSpeaker: parent,
    makatonUser: child
  });
});
