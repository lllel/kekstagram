'use strict';

(function () {
  var QUANTITY_PHOTOS = 25;
  var PHOTOS = [];
  var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

  var photoTemplate = document.querySelector('#picture-template').content;
  var photoContainer = document.querySelector('.pictures');

  var GetPhoto = function (i) {
    this.url = 'photos/' + (i + 1) + '.jpg';
    this.likes = window.util.getRandomNumber(15, 200) + '';
    this.comments = window.util.getRandomNumber(0, COMMENTS.length - 1);
  };

  var getRenderPhoto = function (photo) {
    var templateElement = photoTemplate.querySelector('.picture').cloneNode(true);

    templateElement.querySelector('img').src = photo.url;
    templateElement.querySelector('.picture-comments').textContent = photo.comments;
    templateElement.querySelector('.picture-likes').textContent = photo.likes;

    templateElement.addEventListener('click', function (evt) {
      evt.preventDefault();

      window.fullSizePicture.onOpenFullSizePhotoClick(photo);
    });

    return templateElement;
  };

  var addPhotoInArray = function () {
    for (var i = 0; i < QUANTITY_PHOTOS; i++) {
      PHOTOS.push(new GetPhoto(i));
    }
  };

  addPhotoInArray();

  photoContainer.appendChild(window.util.createElemsFragment(PHOTOS, getRenderPhoto));
})();
