'use strict';

(function () {
  var timerId = null;
  var timerForTripple = null;

  var TimerDelay = {
    DEBOUNCE: 500,
    TRIPPLE: 5000
  };

  var ButtonKeyCode = {
    ESC: 27,
    ENTER: 13
  };

  var typeError = {
    'URIError': function (err) {
      throw new ReadError('Ошибка в URI', err);
    },

    'RangeError': function (err) {
      throw new ReadError('Переданный параметр недосягаем', err);
    },

    'ReferenceError': function (err) {
      throw new ReadError('Ошибка разименовании неверной ссылки', err);
    },

    'SyntaxError': function (err) {
      throw new ReadError('Синтаксическая ошибка', err);
    },

    'TypeError': function (err) {
      throw new ReadError('Переменная или параметр неправильного типа', err);
    },

    'default': function (err) {
      throw err;
    }
  };

  var ReadError = function (message, cause) {
    this.name = 'ReadError';
    this.message = message;
    this.cause = cause;
    this.stack = cause.stack;
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

  var debounce = function (func) {
    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(func, TimerDelay.DEBOUNCE);
  };

  var tripple = function (func) {
    if (timerForTripple) {
      timerForTripple = true;

    } else {
      func();

      timerForTripple = setTimeout(function () {
        func();

        timerForTripple = null;
      }, TimerDelay.TRIPPLE);
    }


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
    isEnterPressEvent: isEnterPressEvent,
    ReadError: ReadError,
    debounce: debounce,
    tripple: tripple,
    typeError: typeError
  };
})();
