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
  };

  var onButtonInputEnterPress = function (evt) {
    window.util.isEnterPressEvent(evt, function () {
      uploadInput.click();
    });

    document.addEventListener('keydown', onButtonCloseFormEscPress);
    buttonUploadPhoto.removeEventListener('keydown', onButtonInputEnterPress);
  };

  var onButtonCloseFormClick = function () {
    formImages.classList.add('hidden');
    uploadInput.value = '';
    window.applyFilter.photoEffectPreviewUpload.style.filter = '';
    window.applyFilter.photoEffectPreviewUpload.style.transform = 'scale(1)';
    window.applyFilter.filteredStyle['effect-none']();
    window.form.hashtagInput.setCustomValidity('');
    window.util.getRemoveClass(window.applyFilter.filteredStyle, window.applyFilter.photoEffectPreviewUpload);

    formUpload.reset();

    document.removeEventListener('keydown', onButtonCloseFormEscPress);
    buttonUploadPhoto.addEventListener('keydown', onButtonInputEnterPress);
  };

  var onButtonCloseFormEscPress = function (evt) {
    window.util.isEscPressEvent(evt, function () {
      buttonFormClose.click();
    });

    buttonUploadPhoto.addEventListener('keydown', onButtonInputEnterPress);
  };

  uploadInput.addEventListener('change', function (evt) {
    evt.preventDefault();
    formImages.classList.remove('hidden');

    onButtonInputChange();
  });

  buttonUploadPhoto.addEventListener('keydown', onButtonInputEnterPress);
  buttonFormClose.addEventListener('click', onButtonCloseFormClick);
  document.removeEventListener('keydown', onButtonCloseFormEscPress);

  window.modal = {
    onButtonCloseFormClick: onButtonCloseFormClick,
    formUpload: formUpload,
    formImages: formImages,
    uploadInput: uploadInput
  };
})();
