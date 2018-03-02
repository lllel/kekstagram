'use strict';

(function () {
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

  var filteredPictures = function () {
    var checkedFilter = window.renderPicture.filtersForm.querySelector('input[type=radio]:checked');
    var filteredPics = window.pictures.slice(0);

    var getSortByPropertyByLikes = function (property) {
      filteredPics.sort(isFilteredSortByLikes(property));
    };

    var getSortByPropertyByComments = function (property) {
      filteredPics.sort(isFilteredSortByComments(property));
    };

    switch (checkedFilter.id) {
      case 'filter-popular':
        getSortByPropertyByLikes('likes');
        break;

      case 'filter-discussed':
        getSortByPropertyByComments('comments');
        break;

      case 'filter-random':
        filteredPics.sort(isRandomPictureSort);
        break;
    }

    window.renderPicture.addPhotoInPage(filteredPics);
  };

  window.renderPicture.filtersForm.addEventListener('keydown', function (evt) {
    window.util.isEnterPressEvent(evt, function () {
      if (evt.target.previousElementSibling) {
        evt.target.previousElementSibling.click();

      } else {
        evt.target.parentElement.lastElementChild.click();
      }
    });
  });

  window.renderPicture.filtersForm.addEventListener('change', function () {
    window.util.debounce(filteredPictures);
  });

  window.filtered = {
    filteredPictures: filteredPictures
  };
})();
