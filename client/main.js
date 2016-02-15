angular.module('baccarat', [])

//main game engine goes here
.controller('mainController', function($scope, Deck, Hand, Bank) {
  $scope.deck;

  $scope.playerHand;

  $scope.dealerHand;



})
.factory('Deck', function(){

})

.factory('Hand', function(){

})

//money will go here
.factory('Bank', function() {

  var winner = function(number) {
  };

  var loser = function(number) {
  };

  return {
    winner: winner,
    loser: loser
  };
});
