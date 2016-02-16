angular.module('baccarat', ['baccarat.services'])

//main game engine goes here
.controller('mainController', function($scope, Deck) {
  $scope.remaining;
  $scope.playerHand = [];
  $scope.dealerHand = [];

  $scope.shuffle = function() {
    $scope.playerHand = [];
    $scope.dealerHand = [];
    cardDeck.init();
    $scope.count();
  }

  $scope.count = function() {
    $scope.remaining = Deck.count();
  }

  $scope.deal = function() {
    $scope.playerHand = [];
    $scope.dealerHand = [];
    $scope.dealToPlayer();
    $scope.dealToDealer();
    $scope.count();
  }

  $scope.dealToPlayer = function() {
    Deck.dealFlop($scope.playerHand);
  };

  $scope.dealToDealer = function() {
    Deck.dealFlop($scope.dealerHand);
  };

  $scope.playerHit = function() {
    Deck.hit($scope.playerHand);
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
