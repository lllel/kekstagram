'use strict';

var QUANTITY_PHOTOS = 25;
var PHOTOS = [];
var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var photoTemplate = document.querySelector('#picture-template').content;
var photoContainer = document.querySelector('.pictures');
var indexPhoto = document.querySelector('.gallery-overlay-image');
var indexPhotoContainer = document.querySelector('.gallery-overlay');
var indexLikePhoto = document.querySelector('.likes-count');
var indexPhotoComment = document.querySelector('.comments-count');
var photoFragment = document.createDocumentFragment();

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getPhoto = function (i) {
  return {
    url: 'photos/' + (i + 1) + '.jpg',
    likes: getRandomNumber(15, 200),
    comments: COMMENTS[getRandomNumber(0, COMMENTS.length - 1)]
  };
};

var getRenderPhoto = function (photo) {
  var templateElement = photoTemplate.querySelector('.picture').cloneNode(true);

  templateElement.querySelector('img').src = photo.url;
  templateElement.querySelector('.picture-comments').textContent = photo.likes;
  templateElement.querySelector('.picture-likes').textContent = photo.comments;

  templateElement.addEventListener('click', function () {
    openedFullSizePhoto(photo);
  });

  return templateElement;
};

var addPhotoInArray = function () {
  for (var i = 0; i < QUANTITY_PHOTOS; i++) {
    PHOTOS.push(getPhoto(i));
  }
};
addPhotoInArray();

var addPhoto = function (field) {
  PHOTOS.forEach(function (el) {
    photoFragment.appendChild(getRenderPhoto(el));
  });
  field.appendChild(photoFragment);
};
addPhoto(photoContainer);

var openedFullSizePhoto = function (photo) {
  indexPhoto.src = photo.url;
  indexLikePhoto.textContent = photo.comments;
  indexPhotoComment.textContent = photo.likes;
  indexPhotoContainer.classList.remove('hidden');
};
