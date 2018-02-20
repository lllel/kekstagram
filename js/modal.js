'use strict';

(function () {
  var formUpload = document.querySelector('.upload-form');
  var buttonFormClose = formUpload.querySelector('.upload-form-cancel');
  var formImages = formUpload.querySelector('.upload-overlay');
  var uploadInput = formUpload.querySelector('.upload-input');
  var buttonUploadPhoto = formUpload.querySelector('.upload-file.upload-control');

  var onButtonInputChange = function () {
    formImages.classList.remove('hidden');
    document.addEventListener('keydown', onButtonCloseFormEscPress);

    window.applyFilter.photoEffectPreviewUpload.style.filter = '';
    window.applyFilter.photoEffectPreviewUpload.style.transform = 'scale(1)';

    window.applyFilter.FilteredStyle['effect-none']();

    window.util.getRemoveClass(window.applyFilter.FilteredStyle, window.applyFilter.photoEffectPreviewUpload);
  };

  var onButtonInputEnterPress = function (evt) {
    window.util.isEnterPressEvent(evt, function () {
      onButtonInputChange();
    });

    document.addEventListener('keydown', onButtonCloseFormEscPress);
    buttonUploadPhoto.removeEventListener('keydown', onButtonInputEnterPress);
  };

  var onButtonCloseFormClick = function () {
    uploadInput.value = '';

    formUpload.reset();

    formImages.classList.add('hidden');
    document.removeEventListener('keydown', onButtonCloseFormEscPress);
    buttonUploadPhoto.addEventListener('keydown', onButtonInputEnterPress);
  };

  var onButtonCloseFormEscPress = function (evt) {
    window.util.isEscPressEvent(evt, function () {
      formImages.classList.add('hidden');
      uploadInput.value = '';

      formUpload.reset();
    });

    buttonUploadPhoto.addEventListener('keydown', onButtonInputEnterPress);
  };

  uploadInput.addEventListener('change', function (evt) {
    evt.preventDefault();

    onButtonInputChange();
  });

  buttonUploadPhoto.addEventListener('keydown', onButtonInputEnterPress);
  buttonFormClose.addEventListener('click', onButtonCloseFormClick);
  document.removeEventListener('keydown', onButtonCloseFormEscPress);

  window.modal = {
    formUpload: formUpload,
    formImages: formImages
  };
})();
