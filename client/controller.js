angular.module('baccarat', ['baccarat.services'])

//main game engine goes here
.controller('mainController', function($scope, Deck) {
  $scope.remaining;
  $scope.playerHand = [];
  $scope.bankerHand = [];

  $scope.shuffle = function() {
    $scope.playerHand = [];
    $scope.bankerHand = [];
    cardDeck.init();
    $scope.count();
  }

  $scope.count = function() {
    $scope.remaining = Deck.count();
  }

  $scope.deal = function() {
    $scope.playerHand = [];
    $scope.bankerHand = [];
    $scope.dealToPlayer();
    $scope.dealToBanker();
    $scope.count();
    $scope.naturals();
  }

  $scope.dealToPlayer = function() {
    Deck.dealFlop($scope.playerHand);
  };

  $scope.dealToBanker = function() {
    Deck.dealFlop($scope.bankerHand);
  };

  $scope.playerHit = function() {
    Deck.hit($scope.playerHand);
    $scope.count();
    $scope.BankerTurnWith3();
  };

  $scope.BankerTurnWith3 = function() {
    pv = $scope.playerHand[2].rank;
    bb = $scope.score($scope.bankerHand);
    // If Player drew a 2 or 3, Banker draws with 0–4 and stands with 5–7.
    if (pv == 2 || pv == 3) {
      if (bb < 5) {
        Deck.hit($scope.bankerHand);
        $scope.count();
      }
      $scope.evaluate();
    }
    // If Player drew a 4 or 5, Banker draws with 0–5 and stands with 6–7.
    if (pv == 4 || pv == 5) {
      if (bb < 6) {
        Deck.hit($scope.bankerHand);
        $scope.count();
      }
      $scope.evaluate();
    }
    // If Player drew a 6 or 7, Banker draws with 0–6 and stands with 7.
    if (pv == 6 || pv == 7) {
      if (bb < 7) {
        Deck.hit($scope.bankerHand);
        $scope.count();
      }
      $scope.evaluate();
    }
    // If Player drew an 8, Banker draws with 0–2 and stands with 3–7.
    if (pv == 8) {
      if (bb < 3) {
        Deck.hit($scope.bankerHand);
        $scope.count();
      }
      $scope.evaluate();
    }
    // If Player drew an ace, 9, 10, or face-card, the Banker draws with 0–3 and stands with 4–7.
    if (pv == 0 || || pv == 1 || pv == 9) {
      if (bb < 4) {
        Deck.hit($scope.bankerHand);
        $scope.count();
      }
      $scope.evaluate();
    }
  };

  $scope.BankerTurnWith2 = function() {
    bb = $scope.score($scope.bankerHand);
    if (bb < 6) {
      Deck.hit($scope.bankerHand);
      $scope.count();
    }
    $scope.evaluate();
  };

  $scope.naturals() = function() {
    pp = $scope.score($scope.playerHand)
    bb = $scope.score($scope.bankerHand)
    if (pp > 7 || bb > 7) {
      //we have a natural
      $scope.evaluate();
    }
  };

  $scope.evaluate = function() {
    pp = $scope.score($scope.playerHand)
    bb = $scope.score($scope.bankerHand)
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
