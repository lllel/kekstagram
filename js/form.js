'use strict';

(function () {
  var hashtagInput = window.modal.formUpload.querySelector('.upload-form-hashtags');
  var commentTextarea = window.modal.formUpload.querySelector('.upload-form-description');

  var ValidityCount = {
    MAX_HASHTAG_COUNT: 5,
    MAX_HASHTAG_LENGTH: 20
  };

  var validityError = {
    hashtagMaxLength: 'Максимальная длина одного хэштега не более ' + ValidityCount.MAX_HASHTAG_LENGTH + ' символов',
    hashtagCount: 'Нельзя использовать больше ' + ValidityCount.MAX_HASHTAG_COUNT + ' хэштегов',
    hashtagCopy: 'Хэштеги повторяются',
    hashtagType: 'Хэштег начинается с символа #'
  };

  var onBtnCheckValidityHashtagClick = function () {
    var value = hashtagInput.value.toLowerCase().trim();
    var parts = value.split(' ');

    if (parts.length > ValidityCount.MAX_HASHTAG_COUNT) {
      hashtagInput.setCustomValidity(validityError.hashtagCount);

      return false;
    }

    for (var i = 0; i < parts.length; i++) {
      if (parts[i].length > ValidityCount.MAX_HASHTAG_LENGTH) {
        hashtagInput.setCustomValidity(validityError.hashtagMaxLength);

        return false;
      }

      if (value !== '' && parts[i].charAt(0) !== '#') {
        hashtagInput.setCustomValidity(validityError.hashtagType);

        return false;
      }

      var repeated = parts.filter(function (item) {
        return item === parts[i];
      });

      if (repeated.length > 1) {
        hashtagInput.setCustomValidity(validityError.hashtagCopy);

        return false;
      }

      hashtagInput.setCustomValidity('');
    }

    return true;
  };

  var onPreventDefaultCommentEscPress = function (evt) {
    window.util.isEscPressEvent(evt, function () {

      evt.stopPropagation();
    });
  };

  var onSuccessSendPictureSetting = function () {
    window.modal.onButtonCloseFormClick();
  };

  var onErrorSendPictureSetting = function (errorMessage) {
    window.util.addErrorMessage(errorMessage);
  };

  hashtagInput.addEventListener('input', function () {
    onBtnCheckValidityHashtagClick();
  });

  commentTextarea.addEventListener('keydown', onPreventDefaultCommentEscPress);

  window.modal.formUpload.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(window.modal.formUpload), onSuccessSendPictureSetting, onErrorSendPictureSetting);

    evt.preventDefault();
  });

  window.form = {
    hashtagInput: hashtagInput
  };
})();
