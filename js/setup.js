'use strict';

(function () {
  var wizards = [];
  var possibleNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var possibleSurnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var possibleCoatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var possibleEyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
  var chosenNames = [];
  var chosenSurnames = [];
  var similarWizardElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');
  var wizardsFragment = document.createDocumentFragment();

  var getRandomName = function () {
    var randomName = window.util.getRandomNumber(0, possibleNames.length - 1);
    var randomSurname = window.util.getRandomNumber(0, possibleSurnames.length - 1);
    var currentName = possibleNames[randomName] + ' ' + possibleSurnames[randomSurname];
    possibleNames.splice(randomName, 1);
    possibleSurnames.splice(randomSurname, 1);
    chosenNames.push(randomName);
    chosenSurnames.push(randomSurname);
    return currentName;
  };

  var getRandomCoatColor = function () {
    return possibleCoatColors[window.util.getRandomNumber(0, possibleCoatColors.length)];
  };

  var getRandomEyesColor = function () {
    return possibleEyesColors[window.util.getRandomNumber(0, possibleEyesColors.length)];
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

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
    return wizardElement;
  };

  var appendWizards = function () {
    for (var i = 0; i < wizards.length; i++) {
      wizardsFragment.appendChild(renderWizard(wizards[i]));
    }

    similarWizardElement.appendChild(wizardsFragment);
  };
  appendWizards();

})();
