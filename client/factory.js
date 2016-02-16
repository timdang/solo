angular.module('baccarat.services', [])

.factory('Deck', function() {
  var playerHand = [];
  var dealerHand = [];

  var shuffle = function() {
    cardDeck.shuffle();
  }

  var dealPlayer = function() {

    playerHand.push(cardDeck.draw());
    playerHand.push(cardDeck.draw());
    return playerHand;
  };

  var dealDealer = function() {

    dealerHand.push(cardDeck.draw());
    return dealerHand;
  };

  var hit = function() {
    if (playerHand.length < 3) {
      playerHand.push(cardDeck.draw());
    }
    //call for annimation
    //run dealer logic
  }

  var clear = function() {
    playerHand = [];
    dealerHand = [];
  }

  var count = function() {
    return cardDeck.count();
  }

  return {
    cardDeck: cardDeck,
    shuffle: shuffle,
    dealPlayer: dealPlayer,
    dealDealer: dealDealer,
    hit: hit,
    clear: clear,
    count: count
  }

})
