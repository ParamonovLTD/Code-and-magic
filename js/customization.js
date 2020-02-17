'use strict';

(function () {
  var availableCoatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var availableEyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
  var availableFireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var setupWizard = document.querySelector('.setup-wizard');
  var playerWizardCoat = setupWizard.querySelector('.wizard-coat');
  var playerWizardEyes = setupWizard.querySelector('.wizard-eyes');
  var playerWizardFireball = document.querySelector('.setup-fireball-wrap');
  var wizardCoatValue = document.querySelector('.wizard-coat-value');
  var wizardEyesValue = document.querySelector('.wizard-eyes-value');
  var wizardFireballValue = document.querySelector('.wizard-fireball-value');

  var getRandomWizardCoatColor = function () {
    var currentCoatColor = playerWizardCoat.style.fill;
    var randomCoatColor = availableCoatColors[window.util.getRandomNumber(0, availableCoatColors.length - 1)];
    while (currentCoatColor === randomCoatColor) {
      randomCoatColor = availableCoatColors[window.util.getRandomNumber(0, availableCoatColors.length - 1)];
    }
    playerWizardCoat.style.fill = randomCoatColor;
    wizardCoatValue.value = randomCoatColor;
  };

  var getRandomWizardEyesColor = function () {
    var currentEyesColor = playerWizardEyes.style.fill;
    var randomEyesColor = availableEyesColors[window.util.getRandomNumber(0, availableEyesColors.length - 1)];
    while (currentEyesColor === randomEyesColor) {
      randomEyesColor = availableEyesColors[window.util.getRandomNumber(0, availableEyesColors.length - 1)];
    }
    playerWizardEyes.style.fill = randomEyesColor;
    wizardEyesValue.value = randomEyesColor;
  };

  var setDefaultFireballColor = function () {
    playerWizardFireball.style.backgroundColor = '#ee4830';
  };
  setDefaultFireballColor();

  var getRandomWizardFireballColor = function () {
    var currentFireballColorInRgb = playerWizardFireball.style.backgroundColor;
    var currentFireballColorInHex = currentFireballColorInRgb.split('(')[1].split(')')[0].split(',');
    var randomFireballColor = availableFireballColors[window.util.getRandomNumber(0, availableFireballColors.length - 1)];
    while (randomFireballColor === window.util.rgbToHex(currentFireballColorInHex[0], currentFireballColorInHex[1], currentFireballColorInHex[2])) {
      randomFireballColor = availableFireballColors[window.util.getRandomNumber(0, availableFireballColors.length - 1)];
    }
    playerWizardFireball.style.backgroundColor = randomFireballColor;
    wizardFireballValue.value = randomFireballColor;
  };

  var wizardCustomization = function () {
    playerWizardCoat.addEventListener('click', getRandomWizardCoatColor);
    playerWizardEyes.addEventListener('click', getRandomWizardEyesColor);
    playerWizardFireball.addEventListener('click', getRandomWizardFireballColor);
  };
  wizardCustomization();
})();
