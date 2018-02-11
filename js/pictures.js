'use strict';

var QUANTITY_PHOTOS = 25;
var PHOTOS = [];
var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var photoTemplate = document.querySelector('#picture-template').content;
var photoContainer = document.querySelector('.pictures');
var formUpload = document.querySelector('.upload-form');
var buttonFormClose = formUpload.querySelector('.upload-form-cancel');

var ButtonKeyCode = {
  ESC: 27,
  ENTER: 13
};

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var isEscPressEvent = function (evt, cb) {
  if (evt.keyCode === ButtonKeyCode.ESC) {

    cb();
  }
};

var isEnterPressEvent = function (evt, cb) {
  if (evt.keyCode === ButtonKeyCode.ENTER) {

    cb();
  }
};

var getPhoto = function (i) {
  return {
    url: 'photos/' + (i + 1) + '.jpg',
    likes: getRandomNumber(15, 200) + '',
    comments: getRandomNumber(0, COMMENTS.length - 1)
  };
};

var getRenderPhoto = function (photo) {
  var templateElement = photoTemplate.querySelector('.picture').cloneNode(true);

  templateElement.querySelector('img').src = photo.url;
  templateElement.querySelector('.picture-comments').textContent = photo.comments;
  templateElement.querySelector('.picture-likes').textContent = photo.likes;

  templateElement.addEventListener('click', function (evt) {
    evt.preventDefault();

    onOpenFullSizePhotoClick(photo);
  });

  return templateElement;
};

var addPhotoInArray = function () {
  for (var i = 0; i < QUANTITY_PHOTOS; i++) {
    PHOTOS.push(getPhoto(i));
  }
};
addPhotoInArray();

var createElemsFragment = function (arr, cb) {
  var elemsFragment = document.createDocumentFragment();

  [].forEach.call(arr, function (el, i) {
    elemsFragment.appendChild(cb(el, i));
  });

  return elemsFragment;
};

photoContainer.appendChild(createElemsFragment(PHOTOS, getRenderPhoto));

// ОТКРЫТИЕ ПОЛНОРАЗМЕРНОГО ФОТО
var indexPhoto = document.querySelector('.gallery-overlay-image');
var indexLikePhoto = document.querySelector('.likes-count');
var indexPhotoComment = document.querySelector('.comments-count');

var onOpenFullSizePhotoClick = function (photo) {
  indexPhoto.src = photo.url;
  indexLikePhoto.textContent = photo.likes;
  indexPhotoComment.textContent = photo.comments;
  indexPhotoContainer.classList.remove('hidden');

  indexPhotoClose.addEventListener('click', onCloseFullSizePhotoClick);
  indexPhotoClose.addEventListener('keydown', onCloseFullSizePhotoEnterPress);
  document.addEventListener('keydown', onCloseFullSizePhotoEscPress);
};

// ЗАКРЫТИЕ ПОЛНОРАЗМЕРНОГО ФОТО
var indexPhotoContainer = document.querySelector('.gallery-overlay');
var indexPhotoClose = document.querySelector('.gallery-overlay-close');

var onCloseFullSizePhotoClick = function () {
  indexPhotoContainer.classList.add('hidden');
};

var onCloseFullSizePhotoEnterPress = function (evt) {
  isEnterPressEvent(evt, function () {
    indexPhotoContainer.classList.add('hidden');
  });
};

var onCloseFullSizePhotoEscPress = function (evt) {
  isEscPressEvent(evt, function () {
    indexPhotoContainer.classList.add('hidden');
  });
  document.removeEventListener('keydown', onCloseFullSizePhotoEscPress);
};

indexPhotoClose.removeEventListener('keydown', onCloseFullSizePhotoEnterPress);

// ОТКРЫТИЕ МЕНЮ ФОРМЫ
var formImages = formUpload.querySelector('.upload-overlay');
var uploadInput = formUpload.querySelector('.upload-input');
var buttonUploadPhoto = formUpload.querySelector('.upload-file.upload-control');

var onButtonInputChange = function () {
  formImages.classList.remove('hidden');
  document.addEventListener('keydown', onButtonCloseFormEscPress);
};

var onButtonInputEnterPress = function (evt) {
  isEnterPressEvent(evt, function () {
    formImages.classList.remove('hidden');
  });
  document.addEventListener('keydown', onButtonCloseFormEscPress);
  buttonUploadPhoto.removeEventListener('keydown', onButtonInputEnterPress);
};

uploadInput.addEventListener('click', function (evt) {
  evt.preventDefault();

  onButtonInputChange();
});
buttonUploadPhoto.addEventListener('keydown', onButtonInputEnterPress);

// ЗАКРЫТИЕ МЕНЮ ФОРМЫ
var onButtonCloseFormClick = function () {
  uploadInput.value = '';

  formImages.classList.add('hidden');
  document.removeEventListener('keydown', onButtonCloseFormEscPress);
  buttonUploadPhoto.addEventListener('keydown', onButtonInputEnterPress);
};

var onButtonCloseFormEscPress = function (evt) {
  isEscPressEvent(evt, function () {
    formImages.classList.add('hidden');
  });

  uploadInput.value = '';
  buttonUploadPhoto.addEventListener('keydown', onButtonInputEnterPress);
};

buttonFormClose.addEventListener('click', onButtonCloseFormClick);
document.removeEventListener('keydown', onButtonCloseFormEscPress);

// ИЗМЕНЕНИЕ ЭФФЕКТА ПРЕВЬЮ-ФОТО
var photoEffectUpload = formUpload.querySelector('.upload-effect-controls');
var photoEffectPreviewUpload = formUpload.querySelector('.effect-image-preview');
var valueUpload = formUpload.querySelector('.upload-effect-level-val');
var pinUpload = formUpload.querySelector('.upload-effect-level-pin');
var lineUpload = formUpload.querySelector('.upload-effect-level-line');
var sliderUpload = formUpload.querySelector('.upload-effect-level');

var FilteredStyle = {
  'effect-none': function () {
    onHiddenSliderClick();

    photoEffectPreviewUpload.style.filter = '';
  },

  'effect-chrome': function () {
    onShowSliderClick();

    photoEffectPreviewUpload.style.filter = 'grayscale(0..1)';
  },

  'effect-sepia': function () {
    onShowSliderClick();

    photoEffectPreviewUpload.style.filter = 'sepia(0..1)';
  },

  'effect-marvin': function () {
    onShowSliderClick();

    photoEffectPreviewUpload.style.filter = 'invert(0..100%)';
  },

  'effect-phobos': function () {
    onShowSliderClick();

    photoEffectPreviewUpload.style.filter = 'blur(0..3px)';
  },

  'effect-heat': function () {
    onShowSliderClick();

    photoEffectPreviewUpload.style.filter = 'brightness(0..3)';
  }
};

var onShowSliderClick = function () {
  sliderUpload.style.display = 'block';
};

var onHiddenSliderClick = function () {
  sliderUpload.style.display = 'none';
};
onHiddenSliderClick();

var onCheckboxEffectChange = function (evt) {
  if (photoEffectPreviewUpload.classList[1]) {
    photoEffectPreviewUpload.classList.remove(photoEffectPreviewUpload.classList[1]);
  }
  photoEffectPreviewUpload.classList.add((evt.target.id).slice(7));
  FilteredStyle[(evt.target.id).slice(7)]();

  pinUpload.style.left = '100%';
  valueUpload.style.width = '100%';
};

pinUpload.style.left = '100%';
valueUpload.style.width = '100%';

photoEffectUpload.addEventListener('change', function (evt) {
  onCheckboxEffectChange(evt);
});

pinUpload.addEventListener('mouseup', function () {
  valueUpload.style.width = (parseInt(getComputedStyle(pinUpload).left, 10) * 100 / parseInt(getComputedStyle(lineUpload).width, 10)).toFixed(0) + '%';
});

// ИЗМЕНЕНИЕ РЕСАЙЗА ПРЕВЬЮ-ФОТО
var uploadResizeValue = formUpload.querySelector('.upload-resize-controls-value');
var uploadResizeContainer = formUpload.querySelector('.upload-resize-controls');

uploadResizeValue.value = '100%';

var onButtonResizeValueClick = function (evt) {
  if (evt.target.classList.contains('upload-resize-controls-button-inc')) {

    if (parseInt(uploadResizeValue.value, 10) === 100) {
      uploadResizeValue.value = '100%';

    } else {
      uploadResizeValue.value = parseInt(uploadResizeValue.value, 10) + 25 + '%';
    }
  }

  if (evt.target.classList.contains('upload-resize-controls-button-dec')) {

    if (parseInt(uploadResizeValue.value, 10) === 25) {
      uploadResizeValue.value = '25%';

    } else {
      uploadResizeValue.value = parseInt(uploadResizeValue.value, 10) - 25 + '%';
    }
  }

  if (parseInt(uploadResizeValue.value, 10) === 100) {
    photoEffectPreviewUpload.style.transform = 'scale(1)';

  } else {
    photoEffectPreviewUpload.style.transform = 'scale(0.' + parseInt(uploadResizeValue.value, 10) + ')';
  }
};

uploadResizeContainer.addEventListener('click', function (evt) {
  onButtonResizeValueClick(evt);
});
