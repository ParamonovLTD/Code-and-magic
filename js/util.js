'use strict';

(function () {
  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };


  var getRandomBlueColor = function () {
    var randomBlueColor;
    var randomBlueSaturation = Math.random() * 100 + '%';
    randomBlueColor = 'hsl(230, ' + randomBlueSaturation + ', 50%)';

    return randomBlueColor;
  };


  var getMaxTime = function (times) {
    var maxTime = Math.max.apply(null, times);
    return maxTime;
  };


  var isEscapeEvent = function (evt, action) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      action();
    }
  };
  var isEnterEvent = function (evt, action) {
    if (evt.keyCode === 13) {
      evt.preventDefault();
      action();
    }
  };


  var getHexComponent = function (c) {
    var hex = parseInt(c, 10).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  var rgbToHex = function (r, g, b) {
    return '#' + getHexComponent(r) + getHexComponent(g) + getHexComponent(b);
  };


  var DEBOUNCE_INTERVAL = 500;
  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };


  window.util = {
    getRandomNumber: getRandomNumber,
    getRandomBlueColor: getRandomBlueColor,
    getMaxTime: getMaxTime,
    isEscapeEvent: isEscapeEvent,
    isEnterEvent: isEnterEvent,
    rgbToHex: rgbToHex,
    debounce: debounce
  };

})();
