'use strict';

(function () {
  var pictureRecommend = window.renderPicture.filtersForm.querySelector('#filter-recommend');
  var picturePopular = window.renderPicture.filtersForm.querySelector('#filter-popular');
  var pictureDiscussed = window.renderPicture.filtersForm.querySelector('#filter-discussed');
  var pictureRandom = window.renderPicture.filtersForm.querySelector('#filter-random');

  var isFilteredSortByLikes = function (property) {
    return function (pictureLeft, pictureRight) {
      return pictureRight[property] - pictureLeft[property];
    };
  };

  var isFilteredSortByComments = function (property) {
    return function (pictureLeft, pictureRight) {
      return pictureRight[property].length - pictureLeft[property].length;
    };
  };

  var isRandomPictureSort = function () {
    return Math.random() - 0.5;
  };

  var filteredPictures = function (evt) {
    var filteredPics = window.pictures.slice(0);

    var getSortByPropertyByLikes = function (el, property) {
      if (evt.target === el) {
        filteredPics.sort(isFilteredSortByLikes(property));
      }
    };

    var getSortByPropertyByComments = function (el, property) {
      if (evt.target === el) {
        filteredPics.sort(isFilteredSortByComments(property));
      }
    };

    if (evt.target === pictureRecommend) {
      filteredPics = window.pictures.slice(0);
    }

    if (evt.target === pictureRandom) {
      filteredPics.sort(isRandomPictureSort);
    }

    getSortByPropertyByLikes(picturePopular, 'likes');
    getSortByPropertyByComments(pictureDiscussed, 'comments');

    window.renderPicture.addPhotoInPage(filteredPics);
  };

  window.renderPicture.filtersForm.addEventListener('change', function (evt) {
    filteredPictures(evt);
  });

  window.filtered = {
    filteredPictures: filteredPictures
  };
})();
