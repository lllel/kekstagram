'use strict';

(function () {
  var hashtagInput = window.modal.formUpload.querySelector('.upload-form-hashtags');
  var commentTextarea = window.modal.formUpload.querySelector('.upload-form-description');
  var submitForm = window.modal.formUpload.querySelector('.upload-form-submit');

  var ValidityCount = {
    MAX_HASHTAG_COUNT: 5,
    MAX_HASHTAG_LENGTH: 20,
    MAX_COMMENT_LENGTH: 5
  };

  var validityError = {
    hashtagMaxLength: 'Максимальная длина одного хэштега не более ' + ValidityCount.MAX_COMMENT_LENGTH + ' символов',
    hashtagCount: 'Нельзя использовать больше ' + ValidityCount.MAX_HASHTAG_COUNT + ' хэштегов',
    hashtagCopy: 'Хэштеги повторяются',
    hashtagType: 'Хэштег начинается с символа #',
    commentMaxLength: 'Максимальная длина комментария не более ' + ValidityCount.MAX_COMMENT_LENGTH + ' символов'
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

  var addMaxLengthComment = function () {
    if (commentTextarea.value.length > ValidityCount.MAX_COMMENT_LENGTH) {
      commentTextarea.setCustomValidity(validityError.commentMaxLength);
    }
  };

  var onSuccessSendPictureSetting = function () {
    window.modal.formImages.classList.add('hidden');
    window.applyFilter.photoEffectPreviewUpload.style.filter = '';
    window.applyFilter.photoEffectPreviewUpload.style.transform = 'scale(1)';
    window.applyFilter.filteredStyle['effect-none']();
    window.util.getRemoveClass(window.applyFilter.filteredStyle, window.applyFilter.photoEffectPreviewUpload);
  };

  var onErrorSendPictureSetting = function (errorMessage) {
    window.util.addErrorMessage(errorMessage);
  };

  hashtagInput.addEventListener('input', function () {
    onBtnCheckValidityHashtagClick();
  });

  commentTextarea.addEventListener('keydown', onPreventDefaultCommentEscPress);

  submitForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    addMaxLengthComment();

    window.backend.save(new FormData(window.modal.formUpload), onSuccessSendPictureSetting, onErrorSendPictureSetting);
  });
})();
