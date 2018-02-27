'use strict';

(function () {
  var indexPhotoContainer = document.querySelector('.gallery-overlay');
  var indexPhoto = indexPhotoContainer.querySelector('.gallery-overlay-image');
  var indexLikePhoto = indexPhotoContainer.querySelector('.likes-count');
  var indexPhotoComment = indexPhotoContainer.querySelector('.comments-count');
  var indexPhotoClose = indexPhotoContainer.querySelector('.gallery-overlay-close');

  var onOpenFullSizePhotoClick = function (photo) {
    indexPhoto.src = photo.url;
    indexLikePhoto.textContent = photo.likes;
    indexPhotoComment.textContent = photo.comments.length;
    indexPhotoContainer.classList.remove('hidden');

    indexPhotoClose.addEventListener('click', onCloseFullSizePhotoClick);
    indexPhotoClose.addEventListener('keydown', onCloseFullSizePhotoEnterPress);
    document.addEventListener('keydown', onCloseFullSizePhotoEscPress);
  };

  var onCloseFullSizePhotoClick = function () {
    indexPhotoContainer.classList.add('hidden');
  };

  var onCloseFullSizePhotoEnterPress = function (evt) {
    window.util.isEnterPressEvent(evt, function () {
      indexPhotoContainer.classList.add('hidden');
    });
  };

  var onCloseFullSizePhotoEscPress = function (evt) {
    window.util.isEscPressEvent(evt, function () {
      indexPhotoContainer.classList.add('hidden');
    });

    document.removeEventListener('keydown', onCloseFullSizePhotoEscPress);
  };

  indexPhotoClose.removeEventListener('keydown', onCloseFullSizePhotoEnterPress);

  window.fullSizePicture = {
    onOpenFullSizePhotoClick: onOpenFullSizePhotoClick
  };
})();
