var app = angular.module('app', []);

app.controller('namensAnzeigeCtrl', function () {
  var vm = this;
  vm.name = 'Marco';
  vm.action = function () {
    vm.name = vm.name.split("").reverse().join("");
  };
});
