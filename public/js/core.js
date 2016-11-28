// common code
$(document).ready(function () {
  var englishForm = $('form[data-language="english"]'),
    makatonForm = $('form[data-language="makaton"]'),
    toEnglishButton = $('button', makatonForm),
    toMakatonButton = $('button', englishForm),
    words = $('[name="words"]', englishForm),
    cards = $('[name="cards"]', makatonForm),
    makaton = $('#makaton'),
    currentCard = $('select'),
    add = $('#add-card');

  // stop the buttons from posting back to the server
  $('form[data-language] > button').click(function (e) {
    e.preventDefault();
  });

  toEnglishButton.click(function () {
    $.ajax({
      url: '/api/words',
      data: {
        cards: cards.val().split(' ')
      },
      dataType: 'json',
      success: function (data) {
        words.val(data.words);
      }
    });
  });

  toMakatonButton.click(function () {
    $.ajax({
      url: '/api/cards',
      data: {
        words: words.val()
      },
      dataType: 'json',
      success: setCards
    });
  });

  add.click(function() {
    var image = $('<img></img>'); // TODO: 
    image.attr('src', "/img/core/" + currentCard.val());
    makaton.append(image);
  });

  function setCards(data) {
    console.log(data.cards);
    makaton.empty();
    for (var i = 0; i < data.cards.length; i++) {
      var image = $('<span class="card"></span>'); // TODO: 
      image.text(data.cards[i]);
      makaton.append(image);
    }
    cards.text(data.cards);
  }

});
