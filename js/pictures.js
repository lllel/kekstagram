'use strict';

var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var photoTemplate = document.querySelector('#picture-template').content;
var photoContainer = document.querySelector('.pictures');
var indexPhoto = document.querySelector('.gallery-overlay-image');
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
  var templateElement = photoTemplate.cloneNode(true).querySelector('.picture');

  templateElement.querySelector('img').src = photo.url;
  templateElement.querySelector('.picture-comments').textContent = photo.likes;
  templateElement.querySelector('.picture-likes').textContent = photo.comments;

  return templateElement;
};

var addPhoto = function (field) {
  for (var i = 0; i <= 25; i++) {
    photoFragment.appendChild(getRenderPhoto(getPhoto(i)));
  }
  field.appendChild(photoFragment);
};
addPhoto(photoContainer);

indexPhoto.src = 'photos/1.jpg';
indexLikePhoto.textContent = '15';
indexPhotoComment.textContent = COMMENTS.length;
document.querySelector('.gallery-overlay').classList.remove('hidden');
