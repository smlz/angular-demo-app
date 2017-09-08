"use strict"

var app = angular.module('app', []);

app.controller('controller', function ($scope) {
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
  // FIXME: irgendwo muss noch die vm.plot-Funktion aufgerufen werden
  vm.go = function() {
    vm.f = generateLinearFunction(vm.m, vm.b);
  };

  vm.calculateColor = function(y) {
    // Deckungsgrad (Zahl zwischen 0.0 und 1.0)
    // Ab einem Funktionswert von 100 gibt es den vollen Deckungsgrad
    var val = Math.min(1.0, Math.abs(y) / 100);

    if (y < 0) {
      // Negative Zahlen werden blau
      return "rgba(0, 0, 255, " + val + ")";
    } else if (y > 0) {
      // Positive Zahlen werden rot
      return "rgba(255, 0, 0, " + val + ")";
    } else {
      // Null ist weiss
      return "white";
    }
  };

  vm.canvasWidth = 400;
  vm.canvasHeight = 300;
  vm.xMin = -4;
  vm.xMax = 4;
  vm.yMin = -3;
  vm.yMax = 3;

  vm.plot = function() {
    var width = vm.canvasWidth,
        height = vm.canvasHeight,
        xMin = vm.xMin,
        xMax = vm.xMax,
        yMin = vm.yMin,
        yMax = vm.yMax,
        canvas = document.getElementById("canvas"),
        ctx = canvas.getContext("2d");

      // Hintergrund zeichnen
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, vm.canvasWidth, vm.canvasWidth);

      // Koordinatensystem zeichnen
      ctx.strokeStyle = 'black';
      ctx.beginPath();
      ctx.moveTo(0, height/2);
      ctx.lineTo(width, height/2);
      // FIXME: y-Achse zeichnen
      ctx.stroke();

      // Graph der Funktion Zeichnen
      ctx.strokeStyle = "blue";
      ctx.beginPath();

      for (var i = 0; i < width; i++) {
          var x = i / width * (xMax - xMin)  + xMin;
          var y = x; // FIXME: hier sollte der y-Wert mit der Funktion berechete werden
          ctx.lineTo(i, ((-y) - yMin) / (yMax - yMin) * height);
      }
      ctx.stroke();
  };
  var zoom = function(a) {
    var a = Math.pow(1.5, a/3);
    vm.xMin *= a;
    vm.xMax *= a;
    vm.yMin *= a;
    vm.yMax *= a;
    vm.plot();
    $scope.$digest();
  }
  document.getElementById('canvas').addEventListener('wheel', function(e) {
    zoom(e.deltaY);
    e.preventDefault();
    return false;
  }, false);
});
