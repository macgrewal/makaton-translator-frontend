$(document).ready(function () {
  var englishView = $('form[data-language="english"]'),
    back = $('a[href="#makaton-display"]'),
    // makatonCardsTranslation = $('#'),
    // makatonWordsTranslation = $('#'),
    // english = $('#'),
    reply = $('#translate-to-makaton'),

    makatonView = $('form[data-language="makaton"]'),
    // makatonCardsContainer = $('#'),
    // removeLastCard = $('#'),
    translateToEnglish = $('#translate-to-english'),
    // makatonCardCategories = $('#'),

    coreVocab = [];

  // stop the buttons from posting back to the server
  $('button').click(function (e) {
    e.preventDefault();
  });

  function switchViews() {
    englishView.toggle();
    makatonView.toggle();
  }

  function setupPage() {
    englishView.hide();
    makatonView.show();
  }

  back.click(switchViews);
  reply.click(switchViews);
  translateToEnglish.click(switchViews);

  setupPage();



  // toEnglishButton.click(function () {
  //   $.ajax({
  //     url: '/api/words',
  //     data: {
  //       username: englishUsername,
  //       cards: cards
  //     },
  //     dataType: 'json',
  //     success: function (data) {
  //       words.val(data.words);
  //       var utterance = new SpeechSynthesisUtterance(data.words);
  //       utterance.lang = 'en-GB';
  //       window.speechSynthesis.speak(utterance);
  //     }
  //   });
  // });

  // toMakatonButton.click(function () {
  //   $.ajax({
  //     url: '/api/cards',
  //     data: {
  //       username: englishUsername,
  //       words: words.val()
  //     },
  //     dataType: 'json',
  //     success: setCards
  //   });
  // });

  // add.click(function () {
  //   addCard(currentCard.val());
  // });

  // remove.click(function () {
  //   cards.pop();
  //   $('img:last', makaton).remove();
  // });

  // function addCard(cardId) {
  //   var image = '<img src="/img/core/' + cardId + '.png" />';
  //   makaton.append(image);
  //   cards.push({
  //     id: cardId
  //   });
  // }

  // function clearAllCards() {
  //   cards = [];
  //   makaton.empty();
  // }

  // function setCards(data) {
  //   clearAllCards();
  //   var cards = data.cards;
  //   for (i = 0; i < cards.length; i++) {
  //     addCard(cards[i].id);
  //   }
  // }

  // function loadCoreVocabulary() {
  //   $.getJSON('/js/core-vocab.json', function (words) {
  //     for (var i = 0; i < words.length; i++) {
  //       var word = words[i];
  //       var option = '<option value="' + word.id + '">' + word.word + '</option>';
  //       currentCard.append(option);
  //     }
  //     coreVocab = words;
  //   });
  // }

  // loadCoreVocabulary();
});
