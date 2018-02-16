'use strict';

(function () {
  var photoEffectUpload = window.modal.formUpload.querySelector('.upload-effect-controls');
  var photoEffectPreviewUpload = window.modal.formUpload.querySelector('.effect-image-preview');
  var valueUpload = window.modal.formUpload.querySelector('.upload-effect-level-val');
  var pinUpload = window.modal.formUpload.querySelector('.upload-effect-level-pin');
  var lineUpload = window.modal.formUpload.querySelector('.upload-effect-level-line');
  var sliderUpload = window.modal.formUpload.querySelector('.upload-effect-level');

  var FilteredStyle = {
    'effect-none': function () {
      onHiddenSliderClick();

      photoEffectPreviewUpload.style.filter = '';
    },

    'effect-chrome': function () {
      onShowSliderClick();

      photoEffectPreviewUpload.style.filter = 'grayscale(' + (parseInt(getComputedStyle(pinUpload).left, 10)) / parseInt(getComputedStyle(lineUpload).width, 10).toFixed(2) + ')';
    },

    'effect-sepia': function () {
      onShowSliderClick();

      photoEffectPreviewUpload.style.filter = 'sepia(' + (parseInt(getComputedStyle(pinUpload).left, 10)) / parseInt(getComputedStyle(lineUpload).width, 10).toFixed(2) + ')';
    },

    'effect-marvin': function () {
      onShowSliderClick();

      photoEffectPreviewUpload.style.filter = 'invert(' + 100 * (parseInt(getComputedStyle(pinUpload).left, 10)) / parseInt(getComputedStyle(lineUpload).width, 10).toFixed(2) + '%)';
    },

    'effect-phobos': function () {
      onShowSliderClick();

      photoEffectPreviewUpload.style.filter = 'blur(' + 3 * (parseInt(getComputedStyle(pinUpload).left, 10)) / parseInt(getComputedStyle(lineUpload).width, 10).toFixed(2) + 'px)';
    },

    'effect-heat': function () {
      onShowSliderClick();

      photoEffectPreviewUpload.style.filter = 'brightness(' + 3 * (parseInt(getComputedStyle(pinUpload).left, 10)) / parseInt(getComputedStyle(lineUpload).width, 10).toFixed(2) + ')';
    }
  };

  var onShowSliderClick = function () {
    sliderUpload.style.display = 'block';
  };

  var onHiddenSliderClick = function () {
    sliderUpload.style.display = 'none';
  };

  onHiddenSliderClick();

  var onCheckboxEffectChange = function (evt) {
    window.util.getRemoveClass(FilteredStyle, photoEffectPreviewUpload);

    photoEffectPreviewUpload.classList.add((evt.target.id).slice(7));
    FilteredStyle[(evt.target.id).slice(7)]();
  };

  pinUpload.style.left = '100%';
  valueUpload.style.width = '100%';

  photoEffectUpload.addEventListener('change', function (evt) {
    onCheckboxEffectChange(evt);
  });

  pinUpload.addEventListener('mouseup', function () {
    valueUpload.style.width = (parseInt(getComputedStyle(pinUpload).left, 10) * 100 / parseInt(getComputedStyle(lineUpload).width, 10)).toFixed(0) + '%';

    [].forEach.call(Object.keys(FilteredStyle), function (it) {
      if (photoEffectPreviewUpload.classList.contains(it)) {
        FilteredStyle[it]();
      }
    });
  });

  window.applyFilter = {
    photoEffectPreviewUpload: photoEffectPreviewUpload,
    FilteredStyle: FilteredStyle
  };
})();
