angular.module('baccarat.services', [])

.factory('Deck', function() {

  var shuffle = function() {
    cardDeck.shuffle();
  }

  var dealFlop = function(hand) {
    hand.push(cardDeck.draw());
    hand.push(cardDeck.draw());
  };

  var hit = function(hand) {
    if (hand.length < 3) {
      hand.push(cardDeck.draw());
    }
  }

  var count = function() {
    return cardDeck.count();
  }

  return {
    shuffle: shuffle,
    dealFlop: dealFlop,
    hit: hit,
    count: count
  }

});
