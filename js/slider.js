'use strict';

(function () {
  var addSlider = function (pin, emptyLine, fillLine, cb) {
    var STEP = 10;

    pin.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX
      };

      var onMouseMoveClick = function (evtMove) {
        evtMove.preventDefault();

        var shift = {
          x: startCoords.x - evtMove.clientX
        };

        startCoords = {
          x: evtMove.clientX
        };

        if (pin.offsetLeft < 0) {
          pin.style.left = '0px';
        }

        if (pin.offsetLeft > parseInt(getComputedStyle(emptyLine).width, 10)) {
          pin.style.left = parseInt(getComputedStyle(emptyLine).width, 10) + 'px';
        }

        pin.style.left = pin.offsetLeft - shift.x + 'px';
        fillLine.style.width = (parseInt(getComputedStyle(pin).left, 10)) + 'px';

        cb();
      };

      var onMouseUp = function (evtUp) {
        evtUp.preventDefault();

        document.removeEventListener('mousemove', onMouseMoveClick);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMoveClick);
      document.addEventListener('mouseup', onMouseUp);
    });

    pin.addEventListener('keydown', function (evt) {
      switch (evt.keyCode) {
        case window.util.ButtonKeyCode.ARROW_LEFT:
          if (pin.offsetLeft < STEP) {
            pin.style.left = '0px';

          } else {
            pin.style.left = pin.offsetLeft - STEP + 'px';
            fillLine.style.width = (parseInt(getComputedStyle(pin).left, 10)) + 'px';
          }

          cb();
          break;

        case window.util.ButtonKeyCode.ARROW_RIGHT:
          if (pin.offsetLeft > parseInt(getComputedStyle(emptyLine).width, 10) - STEP) {
            pin.style.left = parseInt(getComputedStyle(emptyLine).width, 10) + 'px';

          } else {
            pin.style.left = pin.offsetLeft + STEP + 'px';
            fillLine.style.width = (parseInt(getComputedStyle(pin).left, 10)) + 'px';
          }

          cb();
          break;
      }
    });
  };

  window.slider = {
    addSlider: addSlider
  };
})();
