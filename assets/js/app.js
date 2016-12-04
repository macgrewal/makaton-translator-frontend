$(document).ready(function () {
  var englishView = $('form[data-language="english"]'),
    back = $('a[href="#makaton-display"]'),
    // makatonCardsTranslation = $('#'),
    // makatonWordsTranslation = $('#'),
    // english = $('#'),
    reply = $('#translate-to-makaton'),

    makatonView = $('form[data-language="makaton"]'),
    makatonSentence = $('#makaton-sentence'),
    removeLastCard = $('#remove-last-card'),
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
    
    $(makatonCardCategories[0]).addClass('selected');

    $('#all-makaton-cards').on('click','li', function() {
      makatonSentence.append($(this).clone());
      makatonSentence.animate({ scrollTop: makatonSentence.prop("scrollHeight")}, 200);
    });
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
  }

  function buildCards() {
    var allMakatonCards = $('#all-makaton-cards');

    for (var c = 0; c < categories.length; c++) {
      var category = categories[c];

      var cardList = $('<ul data-category="' + category.name + '"></ul>');
      for (var w = 0; w < category.words.length; w++) {
        var word = category.words[w];
        cardList.append($('<li data-word-id="' + word.id + '"><img src="/img/core/' + word.id + '.png" alt="' + word.word + '" /></li>'));
      }

      if (c === 0) {
        cardList.addClass('selected');
      }

      allMakatonCards.append(cardList);
    }
  }

  function addVisibilityToggleToCards() {
    makatonCardCategories.click(function () {
      for (var i = 0; i < makatonCardCategories.length; i++) {
        $(makatonCardCategories[i]).removeClass('selected');
      }

      $(this).addClass('selected');
      var category = $(this).data('category');
      var categoryLists = $('#all-makaton-cards > ul[data-category]')
      for (var i = 0; i < categoryLists.length; i++) {
        if($(categoryLists[i]).data('category') === $(this).data('category')) { 
          $(categoryLists[i]).addClass('selected');
        }
        else {
          $(categoryLists[i]).removeClass('selected');
        }
      }
    });
  }

  function loadCoreVocabulary() {
    $.getJSON('/js/core-vocab.json', function (words) {
      coreVocab = words;
      assignWordsToCategories();
      buildCards();
      addVisibilityToggleToCards();
    });
  }

  back.click(switchViews);
  reply.click(switchViews);
  removeLastCard.click(function() {
    $('li:last', makatonSentence).remove();
  });
  translateToEnglish.click(switchViews);

  loadCoreVocabulary();
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
});
