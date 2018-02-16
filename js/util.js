'use strict';

(function () {
  var ButtonKeyCode = {
    ESC: 27,
    ENTER: 13
  };

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var createElemsFragment = function (arr, cb) {
    var elemsFragment = document.createDocumentFragment();

    [].forEach.call(arr, function (el, i) {
      elemsFragment.appendChild(cb(el, i));
    });

    return elemsFragment;
  };

  var getRemoveClass = function (keyObj, element) {
    [].forEach.call(Object.keys(keyObj), function (it) {
      if (element.classList.contains(it)) {
        element.classList.remove(it);
      }
    });
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

  window.util = {
    getRandomNumber: getRandomNumber,
    createElemsFragment: createElemsFragment,
    getRemoveClass: getRemoveClass,
    isEscPressEvent: isEscPressEvent,
    isEnterPressEvent: isEnterPressEvent
  };
})();
