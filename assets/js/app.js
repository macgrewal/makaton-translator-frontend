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
    makatonCardCategories = $('li[data-category]', '#makaton-card-categories'),

    categories = [{
      name: "Meals",
    }, {
      name: "Activities",
    }, {
      name: "Feelings",
    }, {
      name: "Routine",
    }, {
      name: "All",
    }],
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

  function assignWordsToCategories() {
    var routines = [],
      meals = [],
      activities = [],
      feelings = [],
      common = [],
      all = [];

    for (var i = 1; i < coreVocab.length; i++) {
      var word = coreVocab[i];
      all.push(word);
      if (word.categories) {
        if (word.categories.includes('Routine')) routines.push(word);
        if (word.categories.includes('Activities')) activities.push(word);
        if (word.categories.includes('Common')) common.push(word);
        if (word.categories.includes('Feelings')) feelings.push(word);
        if (word.categories.includes('Food')) meals.push(word);
      }
    }

    for (var i = 0; i < categories.length; i++) {
      var category = categories[i];
      if (category.name === 'Routine') category.words = routines.concat(common);
      if (category.name === 'Activities') category.words = activities.concat(common);
      if (category.name === 'Feelings') category.words = feelings.concat(common);
      if (category.name === 'Meals') category.words = meals.concat(common);
      if (category.name === 'All') category.words = all;
    }

    console.log(categories);
  }

  function loadCoreVocabulary() {
    $.getJSON('/js/core-vocab.json', function (words) {
      coreVocab = words;
      assignWordsToCategories();

    });
  }

  back.click(switchViews);
  reply.click(switchViews);
  translateToEnglish.click(switchViews);

  setupPage();
  loadCoreVocabulary();


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
});
