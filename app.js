"use strict"

var app = angular.module('app', []);

app.controller('namensAnzeigeCtrl', function () {
  var vm = this;
  vm.name = 'Marco';
  vm.eingabe = [-3, -2, -1, 0, 1, 2, 3, 4];
  vm.action = function () {
    vm.name = vm.name.split("").reverse().join("");
  };
  vm.f = function (x) {
    return vm.m * x + vm.b;
  }
});
