"use strict"

var app = angular.module('app', []);

app.controller('namensAnzeigeCtrl', function () {
  var vm = this;
  console.log(vm);
  vm.eingabe = [-3, -2, -1, 0, 1, 2, 3, 4];
  vm.m = 1;
  vm.b = 0;

  for (var x of vm.eingabe){
    console.log(x)
  }

  vm.f = function (x) { return x; };

  var generateLinearFunction = function(m, b) {
    var f = function(x) {
      return m * x + b;
    };
    return f;
  }
  vm.go = function() {
    vm.f = generateLinearFunction(vm.m, vm.b);
  };
});
