'use strict';

(function () {
  var sliderUpload = window.modal.formUpload.querySelector('.upload-effect-level');
  var valueUpload = window.modal.formUpload.querySelector('.upload-effect-level-val');
  var pinUpload = window.modal.formUpload.querySelector('.upload-effect-level-pin');
  var lineUpload = window.modal.formUpload.querySelector('.upload-effect-level-line');

  pinUpload.addEventListener('mousedown', function (evt) {
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

      if (pinUpload.offsetLeft < 0) {
        pinUpload.style.left = '0px';
      }

      if (pinUpload.offsetLeft > parseInt(getComputedStyle(lineUpload).width, 10)) {
        pinUpload.style.left = parseInt(getComputedStyle(lineUpload).width, 10) + 'px';
      }

      pinUpload.style.left = pinUpload.offsetLeft - shift.x + 'px';
      valueUpload.style.width = (parseInt(getComputedStyle(pinUpload).left, 10) * 100 / parseInt(getComputedStyle(lineUpload).width, 10)).toFixed(0) + '%';

      [].forEach.call(Object.keys(window.applyFilter.FilteredStyle), function (it) {
        if (window.applyFilter.photoEffectPreviewUpload.classList.contains(it)) {
          window.applyFilter.FilteredStyle[it]();
        }
      });
    };

    var onMouseUp = function (evtUp) {
      evtUp.preventDefault();

      document.removeEventListener('mousemove', onMouseMoveClick);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMoveClick);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.slider = {
    sliderUpload: sliderUpload,
    valueUpload: valueUpload,
    pinUpload: pinUpload,
    lineUpload: lineUpload
  };
})();
