angular.module('baccarat', ['baccarat.services'])

//main game engine goes here
.controller('mainController', function($scope, Deck) {
  $scope.remaining;
  $scope.playerHand;
  $scope.dealerHand;

  $scope.shuffle = function() {
    Deck.clear();
    $scope.playerHand = [];
    $scope.dealerHand = [];
    cardDeck.init();
    $scope.count();
  }
  $scope.count = function() {
    $scope.remaining = Deck.count();
  }

  $scope.deal = function() {
    Deck.clear();
    $scope.dealToPlayer();
    $scope.dealToDealer();
    $scope.count();
  }
  $scope.dealToPlayer = function() {
    $scope.playerHand = Deck.dealPlayer();
  };

  $scope.dealToDealer = function() {
    $scope.dealerHand = Deck.dealDealer();
  };

  $scope.playerHit = function() {
    Deck.hit();
    $scope.count();
  };

  $scope.score = function(hand) {
    var total = 0;
    if (hand) {
      hand.forEach(function(x) {
        total = total + parseInt(x.rank);
      })
      total = total + '';
      return total.slice(total.length - 1, total.length);
    }
    return 0;
  }

  $scope.count();

})
