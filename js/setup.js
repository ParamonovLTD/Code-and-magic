'use strict';

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = document.querySelector('.setup-close');
document.querySelector('.setup-similar').classList.remove('hidden');
var userNameInput = document.querySelector('.setup-user-name');

var onSetupEscapePress = function (evt) {
  if (evt.keyCode === 27 && document.activeElement !== userNameInput) {
    evt.preventDefault();
    setup.classList.add('hidden');
  }
};

var onSetupOpenEnterPress = function (evt) {
  if (evt.keyCode === 13) {
    evt.preventDefault();
    setup.classList.remove('hidden');
  }
  window.addEventListener('keydown', onSetupEscapePress);
};

var onSetupCloseEnterPress = function (evt) {
  if (evt.keyCode === 13) {
    evt.preventDefault();
    setup.classList.add('hidden');
  }
};

var onSetupOpen = function () {
  setup.classList.remove('hidden');
  window.addEventListener('keydown', onSetupEscapePress);
};

var onSetupClose = function () {
  setup.classList.add('hidden');
  window.removeEventListener('keydown', onSetupEscapePress);
};

setupOpen.addEventListener('click', onSetupOpen);
setupOpen.addEventListener('keydown', onSetupOpenEnterPress);
setupClose.addEventListener('click', onSetupClose);
setupClose.addEventListener('keydown', onSetupCloseEnterPress);

var wizards = [];
var possibleNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var possibleSurnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var possibleCoatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var possibleEyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
var chosenNames = [];
var chosenSurnames = [];

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomName = function () {
  var randomName = getRandomNumber(0, possibleNames.length - 1);
  var randomSurname = getRandomNumber(0, possibleSurnames.length - 1);
  var currentName = possibleNames[randomName] + ' ' + possibleSurnames[randomSurname];

  possibleNames.splice(randomName, 1);
  possibleSurnames.splice(randomSurname, 1);

  chosenNames.push(randomName);
  chosenSurnames.push(randomSurname);

  return currentName;
};

var getRandomCoatColor = function () {
  return possibleCoatColors[getRandomNumber(0, possibleCoatColors.length)];
};

var getRandomEyesColor = function () {
  return possibleEyesColors[getRandomNumber(0, possibleEyesColors.length)];
};

var getWizard = function () {
  for (var i = 0; i < 4; i++) {
    var wizard = {
      name: getRandomName(),
      coatColor: getRandomCoatColor(),
      eyesColor: getRandomEyesColor()
    };

    wizards.push(wizard);
  }

  chosenNames.forEach(function (name) {
    possibleNames.push(name);
  });

  chosenSurnames.forEach(function (surname) {
    possibleSurnames.push(surname);
  });
};

getWizard();

var similarWizardElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var wizardsFragment = document.createDocumentFragment();

for (var i = 0; i < wizards.length; i++) {
  wizardsFragment.appendChild(renderWizard(wizards[i]));
}

similarWizardElement.appendChild(wizardsFragment);

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

var getHexComponent = function (c) {
  var hex = parseInt(c, 10).toString(16);
  return hex.length === 1 ? '0' + hex : hex;
};

var rgbToHex = function (r, g, b) {
  return '#' + getHexComponent(r) + getHexComponent(g) + getHexComponent(b);
};

var getRandomWizardCoatColor = function () {
  var currentCoatColor = playerWizardCoat.style.fill;
  var randomCoatColor = availableCoatColors[getRandomNumber(0, availableCoatColors.length - 1)];
  while (currentCoatColor === randomCoatColor) {
    randomCoatColor = availableCoatColors[getRandomNumber(0, availableCoatColors.length - 1)];
  }
  playerWizardCoat.style.fill = randomCoatColor;
  wizardCoatValue.value = randomCoatColor;
};

var getRandomWizardEyesColor = function () {
  var currentEyesColor = playerWizardEyes.style.fill;
  var randomEyesColor = availableEyesColors[getRandomNumber(0, availableEyesColors.length - 1)];
  while (currentEyesColor === randomEyesColor) {
    randomEyesColor = availableEyesColors[getRandomNumber(0, availableEyesColors.length - 1)];
  }
  playerWizardEyes.style.fill = randomEyesColor;
  wizardEyesValue.value = randomEyesColor;
};

playerWizardFireball.style.backgroundColor = '#ee4830';
var getRandomWizardFireballColor = function () {
  var currentFireballColorInRgb = playerWizardFireball.style.backgroundColor;
  var currentFireballColorInHex = currentFireballColorInRgb.split('(')[1].split(')')[0].split(',');
  var randomFireballColor = availableFireballColors[getRandomNumber(0, availableFireballColors.length - 1)];
  while (randomFireballColor === rgbToHex(currentFireballColorInHex[0], currentFireballColorInHex[1], currentFireballColorInHex[2])) {
    randomFireballColor = availableFireballColors[getRandomNumber(0, availableFireballColors.length - 1)];
  }
  playerWizardFireball.style.backgroundColor = randomFireballColor;
  wizardFireballValue.value = randomFireballColor;
};

playerWizardCoat.addEventListener('click', getRandomWizardCoatColor);
playerWizardEyes.addEventListener('click', getRandomWizardEyesColor);
playerWizardFireball.addEventListener('click', getRandomWizardFireballColor);
