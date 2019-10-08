'use strict';

(function () {

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  // действие при нажатии на ESC
  var isEscPress = function (evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      action();
    }
  };

  // действие при нажатии на ENTER
  var isEnterPress = function (evt, action) {
    if (evt.keyCode === ENTER_KEYCODE) {
      action();
    }
  };

  // генерирует случайное число
  var generateRandomNumber = function (min, max) {
    var randomNumber = Math.floor(min + Math.random() * (max + 1 - min));

    return randomNumber;
  };

  // получает последующее значение массива начиная с указанного
  var generateNextArrayValue = function (currentValue, array) {
    var index = 0;

    for (var i = 0; i < array.length; i++) {

      if (currentValue === array[i]) {
        index = i + 1;

        if (index === array.length) {
          index = 0;
        }
      }
    }

    var nextValue = array[index];

    return nextValue;
  };

  window.utils = {
    isEscPress: isEscPress,
    isEnterPress: isEnterPress,
    generateRandomNumber: generateRandomNumber,
    generateNextArrayValue: generateNextArrayValue
  };


})();
