"use strict"

var app = angular.module('app', []);

app.controller('controller', function () {
  var vm = this;
  vm.eingabe = [-10, -9, -8, -7, -6, -5, -4, -3, -2, -1,
                  0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10];
  vm.m = 1;
  vm.b = 0;

  vm.f = function (x) { return ''; };

  var generateLinearFunction = function(m, b) {
    var f = function(x) {
      return m * x + b;
    };
    return f;
  }
  vm.go = function() {
    vm.f = generateLinearFunction(vm.m, vm.b);
  };
  vm.calculateColor = function(y) {
    // Deckungsgrad (Zahl zwischen 0.0 und 1.0)
    // Ab einem Funktionswert von 100 gibt es den vollen Deckungsgrad
    var val = Math.min(1.0, Math.abs(y) / 100);

    if (y < 0) {
      // Negative Zahlen werden rot
      return "rgba(255, 0, 0, " + val + ")";
    } else if (y > 0) {
      // Positive Zahlen werden blau
      return "rgba(0, 0, 255, " + val + ")";
    } else {
      // Null ist weiss
      return "white";
    }
  };
});
