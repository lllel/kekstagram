'use strict';

(function () {
  var photoTemplate = document.querySelector('#picture-template').content;
  var photoContainer = document.querySelector('.pictures');

  var getRenderPhoto = function (photo) {
    var templateElement = photoTemplate.querySelector('.picture').cloneNode(true);

    templateElement.querySelector('img').src = photo.url;
    templateElement.querySelector('.picture-comments').textContent = photo.comments.length;
    templateElement.querySelector('.picture-likes').textContent = photo.likes;

    templateElement.addEventListener('click', function (evt) {
      evt.preventDefault();

      window.fullSizePicture.onOpenFullSizePhotoClick(photo);
    });

    return templateElement;
  };

  var addPhotoInPage = function (start, end) {
    end.appendChild(start);
  };

  var onSuccessGetPictures = function (data) {
    try {
      var pictures = JSON.parse(data.slice(0));

    } catch (err) {
      if (err instanceof window.util.typeError[err.name]) {
        window.util.typeError[err.name](err);

      } else {
        window.util.typeError['default'](err);
      }
    }

    var elemsFragment = window.util.createElemsFragment(pictures, getRenderPhoto);

    addPhotoInPage(elemsFragment, photoContainer);
  };

  var onErrorGetPictures = function (error) {
    var node = document.createElement('div');

    node.classList.add('error-text');
    node.textContent = 'Произошла ошибка отправки данных: ' + error;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(onSuccessGetPictures, onErrorGetPictures);
})();
