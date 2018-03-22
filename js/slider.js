'use strict';

(function () {
  var addSlider = function (pin, emptyLine, fillLine, cb) {
    var STEP = 10;

    pin.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX - pin.getBoundingClientRect().left - (pin.offsetWidth / 2)
      };

      var onMouseMoveClick = function (evtMove) {
        evtMove.preventDefault();

        var rightEdge = emptyLine.offsetWidth - (pin.offsetWidth / 2);

        var shift = {
          x: evtMove.clientX - startCoords.x - emptyLine.getBoundingClientRect().left
        };

        if (shift.x < pin.offsetWidth / 2) {
          shift.x = pin.offsetWidth / 2;
        }

        if (shift.x > rightEdge) {
          shift.x = rightEdge;
        }

        pin.style.left = shift.x + 'px';
        fillLine.style.width = pin.style.left;

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

    pin.addEventListener('dragstart', function () {
      return false;
    });

    pin.addEventListener('keydown', function (evt) {
      switch (evt.keyCode) {
        case window.util.ButtonKeyCode.ARROW_LEFT:
          if (pin.offsetLeft < STEP || pin.offsetLeft < pin.offsetWidth) {
            pin.style.left = (pin.offsetWidth / 2) + 'px';

          } else {
            pin.style.left = pin.offsetLeft - STEP + 'px';
            fillLine.style.width = pin.style.left;
          }

          cb();
          break;

        case window.util.ButtonKeyCode.ARROW_RIGHT:
          if (pin.offsetLeft > emptyLine.offsetWidth - STEP) {
            pin.style.left = emptyLine.offsetWidth - (pin.offsetWidth / 2) + 'px';

          } else {
            pin.style.left = pin.offsetLeft + STEP + 'px';
            fillLine.style.width = pin.offsetLeft + 'px';
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
