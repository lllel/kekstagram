'use strict';

(function () {
  var addSlider = function (pin, emptyLine, fillLine, cb) {
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
        fillLine.style.width = (parseInt(getComputedStyle(pin).left, 10) * 100 / parseInt(getComputedStyle(emptyLine).width, 10)).toFixed(0) + '%';

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
  };

  window.slider = {
    addSlider: addSlider
  };
})();
