'use strict';

var setup = document.querySelector('.setup');
var setupClose = document.querySelector('.setup-close');
document.querySelector('.setup-similar').classList.remove('hidden');

window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 69) {
    evt.preventDefault();
    setup.classList.toggle('hidden');
  }

  if (!setup.classList.contains('hidden') && evt.keyCode === 27) {
    evt.preventDefault();
    setup.classList.add('hidden');
  }
});

setupClose.addEventListener('click', function (evt) {
  evt.preventDefault();
  setup.classList.add('hidden');
});

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

var fragment = document.createDocumentFragment();

for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}

similarWizardElement.appendChild(fragment);
