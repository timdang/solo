angular.module('baccarat', ['baccarat.services'])

//main game engine goes here
.controller('mainController', function($scope, $timeout, Deck) {
  $scope.remaining;
  $scope.playerHand = [];
  $scope.bankerHand = [];
  $scope.annoucement = "Please place your wager s'il vous plaît";

  $scope.balance = 1000000;
  $scope.wager = 0;

  $scope.shuffle = function() {
    $scope.playerHand = [];
    $scope.bankerHand = [];
    cardDeck.init();
    $scope.count();
  };

  $scope.count = function() {
    $scope.remaining = Deck.count();
  };

  $scope.increase = function() {
    $scope.wager += 25000;
    $scope.balance -= 25000;
  };

  $scope.decrease = function() {
    if ($scope.wager > 0) {
      $scope.wager -= 25000;
      $scope.balance += 25000;
    }
  };

  $scope.deal = function() {
    $scope.annoucement = "Dealing";
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
    var pv = $scope.playerHand[2].rank;
    var bb = $scope.score($scope.bankerHand);
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
    if (pv == 0 || pv == 1 || pv == 9) {
      if (bb < 4) {
        Deck.hit($scope.bankerHand);
        $scope.count();
      }
      $scope.evaluate();
    }
  };

  $scope.BankerTurnWith2 = function() {
    var bb = $scope.score($scope.bankerHand);
    if (bb < 6) {
      Deck.hit($scope.bankerHand);
      $scope.count();
    }
    $scope.evaluate();
  };

  $scope.naturals = function() {
    var pp = $scope.score($scope.playerHand);
    var bb = $scope.score($scope.bankerHand);
    if (pp > 7 || bb > 7) {
      $scope.annoucement = 'natural';
      $scope.evaluate();
    }
    if (pp == 6 || pp == 7) {
      $scope.BankerTurnWith2();
    }
  };

  $scope.evaluate = function() {
    $scope.annoucement = 'evaluate';
    var pp = $scope.score($scope.playerHand);
    var bb = $scope.score($scope.bankerHand);
    if (pp > bb) {
      $scope.annoucement = 'player wins with ' + pp;
      $scope.balance += (2 * $scope.wager);
      $scope.wager -= $scope.wager;
      $timeout(function() {
        $scope.clear();
      }, 3000);
    } else if (bb > pp) {
      $scope.annoucement = 'bank wins ' + bb;
      $scope.wager -= $scope.wager;
      $timeout(function() {
        $scope.clear();
      }, 3000);
    } else {
      $scope.annoucement = 'égalité';
      $scope.balance -= $scope.wager;
      $scope.wager -= $scope.wager;
      $timeout(function() {
        $scope.clear();
      }, 3000);
    }
  };

  $scope.clear = function() {
    $scope.annoucement = "Please place your wager s'il vous plaît";
    $scope.playerHand = [];
    $scope.bankerHand = [];
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
