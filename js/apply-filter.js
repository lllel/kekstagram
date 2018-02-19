'use strict';

(function () {
  var photoEffectUpload = window.modal.formUpload.querySelector('.upload-effect-controls');
  var photoEffectPreviewUpload = window.modal.formUpload.querySelector('.effect-image-preview');

  var FilteredStyle = {
    'effect-none': function () {
      onHiddenSliderClick();

      photoEffectPreviewUpload.style.filter = '';
    },

    'effect-chrome': function () {
      onShowSliderClick();

      photoEffectPreviewUpload.style.filter = 'grayscale(' + (parseInt(getComputedStyle(window.slider.pinUpload).left, 10)) / parseInt(getComputedStyle(window.slider.lineUpload).width, 10).toFixed(2) + ')';
    },

    'effect-sepia': function () {
      onShowSliderClick();

      photoEffectPreviewUpload.style.filter = 'sepia(' + (parseInt(getComputedStyle(window.slider.pinUpload).left, 10)) / parseInt(getComputedStyle(window.slider.lineUpload).width, 10).toFixed(2) + ')';
    },

    'effect-marvin': function () {
      onShowSliderClick();

      photoEffectPreviewUpload.style.filter = 'invert(' + 100 * (parseInt(getComputedStyle(window.slider.pinUpload).left, 10)) / parseInt(getComputedStyle(window.slider.lineUpload).width, 10).toFixed(2) + '%)';
    },

    'effect-phobos': function () {
      onShowSliderClick();

      photoEffectPreviewUpload.style.filter = 'blur(' + 3 * (parseInt(getComputedStyle(window.slider.pinUpload).left, 10)) / parseInt(getComputedStyle(window.slider.lineUpload).width, 10).toFixed(2) + 'px)';
    },

    'effect-heat': function () {
      onShowSliderClick();

      photoEffectPreviewUpload.style.filter = 'brightness(' + 3 * (parseInt(getComputedStyle(window.slider.pinUpload).left, 10)) / parseInt(getComputedStyle(window.slider.lineUpload).width, 10).toFixed(2) + ')';
    }
  };

  var onShowSliderClick = function () {
    window.slider.sliderUpload.style.display = 'block';
  };

  var onHiddenSliderClick = function () {
    window.slider.sliderUpload.style.display = 'none';
  };

  onHiddenSliderClick();

  var onCheckboxEffectChange = function (evt) {
    window.util.getRemoveClass(FilteredStyle, photoEffectPreviewUpload);

    photoEffectPreviewUpload.classList.add((evt.target.id).slice(7));
    FilteredStyle[(evt.target.id).slice(7)]();
  };

  photoEffectUpload.addEventListener('change', function (evt) {
    window.slider.pinUpload.style.left = '100%';
    window.slider.valueUpload.style.width = '100%';

    onCheckboxEffectChange(evt);
  });

  window.slider.pinUpload.addEventListener('mouseup', function () {
    window.slider.valueUpload.style.width = (parseInt(getComputedStyle(window.slider.pinUpload).left, 10) * 100 / parseInt(getComputedStyle(window.slider.lineUpload).width, 10)).toFixed(0) + '%';

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
