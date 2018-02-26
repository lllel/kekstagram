'use strict';

(function () {
  var uploadResizeValue = window.modal.formUpload.querySelector('.upload-resize-controls-value');
  var uploadResizeContainer = window.modal.formUpload.querySelector('.upload-resize-controls');

  var Percent = {
    step: 25,
    max: 100
  };

  var incPercent = function (percent) {
    percent += Percent.step;

    if (percent > Percent.max) {
      percent = Percent.max;
    }

    return percent;
  };

  var decPercent = function (percent) {
    percent -= Percent.step;

    if (percent < Percent.step) {
      percent = Percent.step;
    }

    return percent;
  };

  var onButtonResizeValueClick = function (evt) {
    var percent = '';

    if (evt.target.classList.contains('upload-resize-controls-button-inc')) {
      percent = incPercent(parseInt(uploadResizeValue.value, 10));
    }

    if (evt.target.classList.contains('upload-resize-controls-button-dec')) {
      percent = decPercent(parseInt(uploadResizeValue.value, 10));
    }

    if (evt.target.classList.contains('upload-resize-controls-value')) {
      return;
    }

    uploadResizeValue.value = percent + '%';
    window.applyFilter.photoEffectPreviewUpload.style.transform = 'scale(' + (percent / 100) + ')';
  };

  uploadResizeValue.value = '100%';

  uploadResizeContainer.addEventListener('click', function (evt) {
    onButtonResizeValueClick(evt);
  });
})();
