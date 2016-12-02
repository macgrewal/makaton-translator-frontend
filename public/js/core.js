// common code
$(document).ready(function () {
  var englishForm = $('form[data-language="english"]'),
    makatonForm = $('form[data-language="makaton"]'),
    toEnglishButton = $('button', makatonForm),
    toMakatonButton = $('button', englishForm),
    words = $('[name="words"]', englishForm),
    cards = '',
    makaton = $('#makaton'),
    currentCard = $('select'),
    add = $('#add-card'),
    displayArea = $('#card-display'),
    categoryCard = $('.category-card'),
    makatonCard = $('.makaton-card'),
    makatonInput = $('#makaton-input'),
    makatonInputDisplay = $('#makaton-input-display');

  // stop the buttons from posting back to the server
  $('form[data-language] > button').click(function (e) {
    e.preventDefault();
  });

  toEnglishButton.click(function () {
    $.ajax({
      url: '/api/words',
      data: {
        cards: cards.trim()
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
    var image = $('<img>'); // TODO:
    image.attr('src', "/img/core/" + currentCard.val());
    makaton.append(image);
    var symbol = currentCard.val().substring(0, currentCard.val().indexOf('.png')).trim()
    cards += ' ' + symbol
  });

  function setCards(data) {
    console.log(data.cards);
    var images = data.cards.split(' ');
    makaton.empty();
    for (var i = 0; i < images.length; i++) {
      var image = $('<span class="card"></span>'); // TODO:
      image.text(images[i]);
      makaton.append(image);
    }
    cards = data.cards;
  }

  categoryCard.click(function() {
    displayArea.empty();
    var cardNames = $( this ).attr("subCards").split(",");
    for (i = 0; i < cardNames.length; i++) {
      var image = $('<img id="'+cardNames[i]+'">');
      image.attr('src', "/img/core/" + cardNames[i] + ".png");
      image.attr('id', cardNames[i]);
      image.attr('class', 'makaton-card')
      displayArea.append(image);
    }
  });

  makatonCard.click(function() {
    console.log("here");
    addMakatonCard($( this ).attr('id'));
  });

  function addMakatonCard(id) {
    var inputValues = makatonInput.attr('value');
    makatonInput.attr('value', inputValues+','+id);
    var img = $('<img>');
    img.attr('src', "/img/core/" + id + ".png");
    makatonInputDisplay.append(img);
  }

});
