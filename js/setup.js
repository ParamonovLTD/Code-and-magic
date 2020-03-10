'use strict';

(function () {
  var wizards = [];
  var wizardQuantity = 4;
  var similarWizardElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');
  var wizardsFragment = document.createDocumentFragment();
  var setup = document.querySelector('.setup');
  var form = setup.querySelector('.setup-wizard-form');
  var allWizards = [];


  var onSuccess = function (data) {
    allWizards = data;
    setup.classList.add('hidden');
    return allWizards;
  };
  var onError = function (message) {
    var elem = document.createElement('div');
    elem.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: #ff0000';
    elem.style.position = 'fixed';
    elem.style.bottom = '0';
    elem.style.width = '100%';
    elem.style.padding = '3px';

    elem.textContent = message;
    document.body.insertAdjacentElement('afterbegin', elem);
  };


  var getWizards = function () {
    wizards = [];
    var setupWizard = document.querySelector('.setup-wizard');
    var playerWizardCoat = setupWizard.querySelector('.wizard-coat');
    var playerWizardEyes = setupWizard.querySelector('.wizard-eyes');

    var wizardsPoints = allWizards.
      map(function (wizard) {
        var points = 0;
        if (wizard.colorCoat === playerWizardCoat.style.fill) {
          points += 2;
        }
        if (wizard.colorEyes === playerWizardEyes.style.fill) {
          points += 1;
        }
        return {points: points, wizard: wizard};
      }).
      sort(function (a, b) {
        if (a.points > b.points) {
          return -1;
        }
        if (a.points < b.points) {
          return 1;
        }
        return 0;
      });
    wizardsPoints.forEach(function (wiz) {
      wizards.push(wiz.wizard);
    });
    return wizards;
  };


  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  };


  var appendWizards = function () {
    getWizards();
    for (var i = 0; i < wizardQuantity; i++) {
      wizardsFragment.appendChild(renderWizard(wizards[i]));
    }
    similarWizardElement.appendChild(wizardsFragment);
  };


  var wizardAssembly = {
    onSuccess: onSuccess,
    appendWizards: appendWizards
  };
  window.backend.load(wizardAssembly, onError);


  var wizardsChange = function () {
    var renderedWizards = similarWizardElement.querySelectorAll('.setup-similar-item');
    renderedWizards.forEach(function (wizard) {
      wizard.remove();
    });
    appendWizards();
  };


  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), onSuccess, onError);
    evt.preventDefault();
  });


  window.setup = {
    appendWizards: appendWizards,
    wizardsChange: wizardsChange
  };
})();
