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
  // FIXME: irgendwo muss noch die vm.plot-Funktion aufgerufen werden
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

  vm.canvasWidth = 300;
  vm.canvasHeight = 300;

  vm.plot = function() {
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");

        // Hintergrund zeichnen
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, vm.canvasWidth, vm.canvasWidth);

        // Koordinatensystem zeichnen
        ctx.strokeStyle = 'black';
        ctx.beginPath();
        ctx.moveTo(0, vm.canvasWidth/2);
        ctx.lineTo(vm.canvasWidth, vm.canvasWidth/2);
        // FIXME: y-Achse zeichnen
        ctx.stroke();

        // Graph der Funktion Zeichnen
        ctx.strokeStyle = "blue";
        ctx.beginPath();
        var xWidth = vm.canvasWidth,
            yWidth = vm.canvasHeight,
            xMin = -2,
            xMax = 2,
            yMin = -2,
            yMax = 2;

        for (var i = 0; i < xWidth; i++) {
            var x = i / xWidth * (xMax - xMin)  + xMin;
            var y = x; // FIXME: hier sollte der y-Wert mit der Funktion berechete werden
            ctx.lineTo(i, ((-y) - yMin) / (yMax - yMin) * yWidth);
        }
        ctx.stroke();
    };

});
