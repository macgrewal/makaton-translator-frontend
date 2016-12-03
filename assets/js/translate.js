$(document).ready(function () {
  var englishForm = $('form[data-language="english"]'),
    makatonForm = $('form[data-language="makaton"]'),
    toEnglishButton = $('button', makatonForm),
    toMakatonButton = $('button', englishForm),
    englishUsername = englishForm.data('username'),
    makatonUsername = makatonForm.data('username'),
    toMakatonButton = $('button', englishForm),
    words = $('[name="words"]', englishForm),
    cards = [],
    makaton = $('#makaton'),
    currentCard = $('#coreWords'),
    add = $('#add-card'),
    remove = $('#remove-card'),
    coreVocab = [];

  // stop the buttons from posting back to the server
  $('form[data-language] > button').click(function (e) {
    e.preventDefault();
  });

  toEnglishButton.click(function () {
    $.ajax({
      url: '/api/words',
      data: {
        username: englishUsername,
        cards: cards
      },
      dataType: 'json',
      success: function (data) {
        words.val(data.words);
        var utterance = new SpeechSynthesisUtterance(data.words);
        utterance.lang = 'en-GB';
        window.speechSynthesis.speak(utterance);
      }
    });
  });

  toMakatonButton.click(function () {
    $.ajax({
      url: '/api/cards',
      data: {
        username: englishUsername,
        words: words.val()
      },
      dataType: 'json',
      success: setCards
    });
  });

  add.click(function () {
    addCard(currentCard.val());
  });

  remove.click(function () {
    cards.pop();
    $('img:last', makaton).remove();
  });

  function addCard(cardId) {
    var image = '<img src="/img/core/' + cardId + '.png" />';
    makaton.append(image);
    cards.push({
      id: cardId
    });
  }

  function clearCards() {
    cards = [];
    makaton.empty();
  }

  function setCards(data) {
    clearCards();
    var cards = data.cards;
    for (i = 0; i < cards.length; i++) {
      addCard(cards[i].id);
    }
  }

  function loadCoreVocabulary() {
    $.getJSON('/js/core-vocab.json', function (words) {
      for (var i = 0; i < words.length; i++) {
        var word = words[i];
        var option = '<option value="' + word.id + '">' + word.word + '</option>';
        currentCard.append(option);
      }
      coreVocab = words;
    });
  }

  loadCoreVocabulary();
});
