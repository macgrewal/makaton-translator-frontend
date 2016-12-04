$(document).ready(function () {
  var englishView = $('form[data-language="english"]'),
    back = $('a[href="#makaton-display"]'),
    makatonCardsTranslation = $('#makaton-cards-translation'),
    makatonWordsTranslation = $('#makaton-words-translation'),
    english = $('textarea[name="english"]'),
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

    $('#all-makaton-cards').on('click', 'li', function () {
      makatonSentence.append($(this).clone());
      makatonSentence.animate({
        scrollTop: makatonSentence.prop("scrollHeight")
      }, 200);
    });

    back.click(switchViews);

    reply.click(function () {
      if (english.val().trim() === '') {
        return;
      } else {
        $.ajax({
          url: '/api/cards',
          data: {
            username: makatonView.data('username'),
            words: english.val()
          },
          dataType: 'json',
          success: setCards
        });
      }
    });

    removeLastCard.click(function () {
      $('li:last', makatonSentence).remove();
    });

    translateToEnglish.click(function () {
      var cards = buildMakatonSentence();
      if (cards.length > 0) {
        $.ajax({
          url: '/api/words',
          data: {
            username: makatonView.data('username'),
            cards: cards
          },
          dataType: 'json',
          success: function (data) {
            makatonCardsTranslation.empty();
            var makatonCards = $('li', makatonSentence);
            for (var i = 0; i < makatonCards.length; i++) {
              makatonCardsTranslation.append($(makatonCards[i]).clone());
            }
            makatonWordsTranslation.text(data.words);
            switchViews()
            var words = new SpeechSynthesisUtterance(data.words);
            words.lang = 'en-GB';
            window.speechSynthesis.speak(words);
          }
        });
      } else {
        switchViews();
      }
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
        cardList.append(buildCard(word));
      }

      if (c === 0) {
        cardList.addClass('selected');
      }

      allMakatonCards.append(cardList);
    }
  }

  function buildCard(word) {
    var card = $('<li data-word-id="' + word.id + '"><img src="/img/core/' + word.id + '.png" alt="' + word.word + '" /></li>');
    return card;
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
        if ($(categoryLists[i]).data('category') === $(this).data('category')) {
          $(categoryLists[i]).addClass('selected');
        } else {
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

  function buildMakatonSentence() {
    var cards = $('li', makatonSentence);
    var sentence = [];
    for (var i = 0; i < cards.length; i++) {
      var card = $(cards[i]);
      sentence.push({
        id: card.data('word-id')
      });
    }
    return sentence;
  }

  loadCoreVocabulary();
  setupPage();

  function addCard(data) {
    var card = buildCard(data);
    makatonSentence.append(card);
    makatonSentence.animate({
      scrollTop: makatonSentence.prop("scrollHeight")
    }, 200);
  }

  function setCards(data) {
    makatonSentence.empty();

    var cards = data.cards;
    for (i = 0; i < cards.length; i++) {
      addCard(cards[i]);
    }

    switchViews();
  }
});
