angular.module('baccarat', [])

//main game engine goes here
.controller('mainController', function($scope, Deck) {
  $scope.remaining = 52;
  $scope.playerHand;
  $scope.dealerHand;

  $scope.shuffle = function() {
    Deck.shuffle();
  }
  $scope.count = function() {
    $scope.remaining = Deck.cardsRemaining();
  }

  $scope.dealToPlayer = function() {
    $scope.playerHand = Deck.dealPlayer();
  };

  $scope.dealToDealer = function() {
    $scope.dealerHand = Deck.dealDealer();
  };

  $scope.dealToPlayer();
  $scope.dealToDealer();
  $scope.count();

  $scope.playerHit = function() {
    Deck.hit();
  };

})

.factory('Deck', function() {
  var playerHand = [];
  var dealerHand = [];

  var cardDeck = new playingCards();

  var shuffle = function() {
    var cardDeck = new playingCards();
    cardDeck.shuffle();
    console.log(cardDeck)
  }

  var cardsRemaining = function() {
    return cardDeck.count();
  }

  var dealPlayer = function() {

    playerHand.push(cardDeck.draw());
    playerHand.push(cardDeck.draw());
    return playerHand;
  };

  var dealDealer = function() {

    dealerHand.push(cardDeck.draw());
    dealerHand.push(cardDeck.draw());
    return dealerHand;
  };

  var hit = function() {
    playerHand.push(cardDeck.draw());
  }

  return {
    cardDeck: cardDeck,
    shuffle: shuffle,
    cardsRemaining: cardsRemaining,
    dealPlayer: dealPlayer,
    dealDealer: dealDealer,
    hit: hit
  }

})

.factory('Bank', function() {

  var winner = function(number) {};

  var loser = function(number) {};

  return {
    winner: winner,
    loser: loser
  }
});
