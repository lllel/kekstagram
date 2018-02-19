'use strict';

(function () {
  var sliderUpload = window.modal.formUpload.querySelector('.upload-effect-level');
  var valueUpload = window.modal.formUpload.querySelector('.upload-effect-level-val');
  var pinUpload = window.modal.formUpload.querySelector('.upload-effect-level-pin');
  var lineUpload = window.modal.formUpload.querySelector('.upload-effect-level-line');
  var photoEffectUpload = window.modal.formUpload.querySelector('.upload-effect-controls');
  var photoEffectPreviewUpload = window.modal.formUpload.querySelector('.effect-image-preview');

  var getCalculateSaturation = function (saturation) {
    return (saturation * (parseInt(getComputedStyle(pinUpload).left, 10)) / parseInt(getComputedStyle(lineUpload).width, 10).toFixed(2));
  };

  var FilteredStyle = {
    'effect-none': function () {
      onHiddenSliderClick();

      photoEffectPreviewUpload.style.filter = '';
    },

    'effect-chrome': function () {
      onShowSliderClick();

      photoEffectPreviewUpload.style.filter = 'grayscale(' + getCalculateSaturation(1) + ')';
    },

    'effect-sepia': function () {
      onShowSliderClick();

      photoEffectPreviewUpload.style.filter = 'sepia(' + getCalculateSaturation(1) + ')';
    },

    'effect-marvin': function () {
      onShowSliderClick();

      photoEffectPreviewUpload.style.filter = 'invert(' + getCalculateSaturation(100) + '%)';
    },

    'effect-phobos': function () {
      onShowSliderClick();

      photoEffectPreviewUpload.style.filter = 'blur(' + getCalculateSaturation(3) + 'px)';
    },

    'effect-heat': function () {
      onShowSliderClick();

      photoEffectPreviewUpload.style.filter = 'brightness(' + getCalculateSaturation(3) + ')';
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

  var applyFilter = function () {
    [].forEach.call(Object.keys(FilteredStyle), function (it) {
      if (photoEffectPreviewUpload.classList.contains(it)) {
        FilteredStyle[it]();
      }
    });
  };

  photoEffectUpload.addEventListener('change', function (evt) {
    pinUpload.style.left = '100%';
    valueUpload.style.width = '100%';

    onCheckboxEffectChange(evt);
  });

  window.slider.addSlider(pinUpload, lineUpload, valueUpload, applyFilter);

  window.applyFilter = {
    photoEffectPreviewUpload: photoEffectPreviewUpload,
    FilteredStyle: FilteredStyle
  };
})();
