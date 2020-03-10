'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = document.querySelector('.setup-close');
  document.querySelector('.setup-similar').classList.remove('hidden');
  var userNameInput = document.querySelector('.setup-user-name');


  var onSetupEscapePress = function (evt) {
    if (document.activeElement !== userNameInput) {
      window.util.isEscapeEvent(evt, onSetupClose);
    }
  };
  var onSetupOpenEnterPress = function (evt) {
    window.util.isEnterEvent(evt, onSetupOpen);
  };
  var onSetupCloseEnterPress = function (evt) {
    window.util.isEnterEvent(evt, onSetupClose);
  };
  var onSetupOpen = function () {
    setup.classList.remove('hidden');
    window.addEventListener('keydown', onSetupEscapePress);
  };
  var onSetupClose = function () {
    setup.classList.add('hidden');
    window.removeEventListener('keydown', onSetupEscapePress);
  };


  var setupInterection = function () {
    setupOpen.addEventListener('click', onSetupOpen);
    setupOpen.addEventListener('keydown', onSetupOpenEnterPress);
    setupClose.addEventListener('click', onSetupClose);
    setupClose.addEventListener('keydown', onSetupCloseEnterPress);
  };
  setupInterection();
})();
