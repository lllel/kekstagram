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

var GetPhoto = function (i) {
  this.url = 'photos/' + (i + 1) + '.jpg';
  this.likes = getRandomNumber(15, 200) + '';
  this.comments = getRandomNumber(0, COMMENTS.length - 1);
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
    PHOTOS.push(new GetPhoto(i));
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

  photoEffectPreviewUpload.style.filter = '';
  photoEffectPreviewUpload.style.transform = 'scale(1)';
  getRemoveClass(FilteredStyle, photoEffectPreviewUpload);
};

var onButtonInputEnterPress = function (evt) {
  isEnterPressEvent(evt, function () {
    formImages.classList.remove('hidden');
  });
  document.addEventListener('keydown', onButtonCloseFormEscPress);
  buttonUploadPhoto.removeEventListener('keydown', onButtonInputEnterPress);
};

uploadInput.addEventListener('change', function (evt) {
  evt.preventDefault();

  onButtonInputChange();
});
buttonUploadPhoto.addEventListener('keydown', onButtonInputEnterPress);

// ЗАКРЫТИЕ МЕНЮ ФОРМЫ
var onButtonCloseFormClick = function () {
  uploadInput.value = '';
  formUpload.reset();

  formImages.classList.add('hidden');
  document.removeEventListener('keydown', onButtonCloseFormEscPress);
  buttonUploadPhoto.addEventListener('keydown', onButtonInputEnterPress);
};

var onButtonCloseFormEscPress = function (evt) {
  isEscPressEvent(evt, function () {
    formImages.classList.add('hidden');
    uploadInput.value = '';
    formUpload.reset();
  });

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

var getRemoveClass = function (keyObj, element) {
  [].forEach.call(Object.keys(keyObj), function (it) {
    if (element.classList.contains(it)) {
      element.classList.remove(it);
    }
  });
};

var FilteredStyle = {
  'effect-none': function () {
    onHiddenSliderClick();

    photoEffectPreviewUpload.style.filter = '';
  },

  'effect-chrome': function () {
    onShowSliderClick();

    photoEffectPreviewUpload.style.filter = 'grayscale(' + (parseInt(getComputedStyle(pinUpload).left, 10)) / parseInt(getComputedStyle(lineUpload).width, 10).toFixed(2) + ')';
  },

  'effect-sepia': function () {
    onShowSliderClick();

    photoEffectPreviewUpload.style.filter = 'sepia(' + (parseInt(getComputedStyle(pinUpload).left, 10)) / parseInt(getComputedStyle(lineUpload).width, 10).toFixed(2) + ')';
  },

  'effect-marvin': function () {
    onShowSliderClick();

    photoEffectPreviewUpload.style.filter = 'invert(' + 100 * (parseInt(getComputedStyle(pinUpload).left, 10)) / parseInt(getComputedStyle(lineUpload).width, 10).toFixed(2) + '%)';
  },

  'effect-phobos': function () {
    onShowSliderClick();

    photoEffectPreviewUpload.style.filter = 'blur(' + 3 * (parseInt(getComputedStyle(pinUpload).left, 10)) / parseInt(getComputedStyle(lineUpload).width, 10).toFixed(2) + 'px)';
  },

  'effect-heat': function () {
    onShowSliderClick();

    photoEffectPreviewUpload.style.filter = 'brightness(' + 3 * (parseInt(getComputedStyle(pinUpload).left, 10)) / parseInt(getComputedStyle(lineUpload).width, 10).toFixed(2) + ')';
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
  getRemoveClass(FilteredStyle, photoEffectPreviewUpload);

  photoEffectPreviewUpload.classList.add((evt.target.id).slice(7));
  FilteredStyle[(evt.target.id).slice(7)]();
};

pinUpload.style.left = '100%';
valueUpload.style.width = '100%';

photoEffectUpload.addEventListener('change', function (evt) {
  onCheckboxEffectChange(evt);
});

pinUpload.addEventListener('mouseup', function () {
  valueUpload.style.width = (parseInt(getComputedStyle(pinUpload).left, 10) * 100 / parseInt(getComputedStyle(lineUpload).width, 10)).toFixed(0) + '%';

  [].forEach.call(Object.keys(FilteredStyle), function (it) {
    if (photoEffectPreviewUpload.classList.contains(it)) {
      FilteredStyle[it]();
    }
  });
});

// ИЗМЕНЕНИЕ РЕСАЙЗА ПРЕВЬЮ-ФОТО
var uploadResizeValue = formUpload.querySelector('.upload-resize-controls-value');
var uploadResizeContainer = formUpload.querySelector('.upload-resize-controls');

uploadResizeValue.value = '100%';

var PERCENT = {
  step: 25,
  max: 100
};

var incPercent = function (percent) {
  percent += PERCENT.step;

  if (percent > PERCENT.max) {
    percent = PERCENT.max;
  }
  return percent;
};

var decPercent = function (percent) {
  percent -= PERCENT.step;

  if (percent < PERCENT.step) {
    percent = PERCENT.step;
  }
  return percent;
};

var onButtonResizeValueClick = function (evt) {
  var percent = '';

  if (evt.target.classList.contains('upload-resize-controls-button-inc')) {
    percent = incPercent(parseInt(uploadResizeValue.value, 10));
  }

  if (evt.target.classList.contains('upload-resize-controls-button-dec')) {
    percent = decPercent(parseInt(uploadResizeValue.value, 10));
  }

  if (evt.target.classList.contains('upload-resize-controls-value')) {
    return;
  }

  uploadResizeValue.value = percent + '%';
  photoEffectPreviewUpload.style.transform = 'scale(' + (percent / 100) + ')';
};

uploadResizeContainer.addEventListener('click', function (evt) {
  onButtonResizeValueClick(evt);
});

// ХЭШТЕГ
var hashTagInput = document.querySelector('.upload-form-hashtags');

var HashtagError = {
  maxLength: 'Максимальная длина одного хэштега не более 20-ти символов',
  count: 'Нельзя использовать больше 5ти хэштегов',
  copy: 'Хэштеги повторяются',
  type: 'Хэштег начинается с символа #',
  hyphen: 'Нельзя более одного дефиса подряд'
};

var HashtagValidity = {
  MAX_COUNT: 5,
  MAX_LENGTH: 20
};

var onBtnCheckValidityHashtagClick = function () {
  var value = hashTagInput.value.trim();
  var parts = value.split(' ').map(function (item) {
    return item.toLowerCase();
  });

  if (parts.length > HashtagValidity.MAX_COUNT) {
    hashTagInput.setCustomValidity(HashtagError.count);

    return false;
  }

  parts.forEach(function (it) {
    if (it.length > HashtagValidity.MAX_LENGTH) {
      hashTagInput.setCustomValidity(HashtagError.maxLength);

      return false;
    }

    if (value !== '' && it.charAt(0) !== '#') {
      hashTagInput.setCustomValidity(HashtagError.type);

      return false;
    }

    var repeated = parts.filter(function (item) {
      return item === it;
    });

    if (repeated.length > 1) {
      hashTagInput.setCustomValidity(HashtagError.copy);

      return false;

    } else {
      return true;
    }
  });

  hashTagInput.setCustomValidity('');

  return true;
};

hashTagInput.addEventListener('input', function () {
  onBtnCheckValidityHashtagClick();
});

// // КОММЕНТАРИИ
var commentTextarea = formUpload.querySelector('.upload-form-description');

commentTextarea.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ButtonKeyCode.ESC) {
    evt.stopPropagation();
  }
});
