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


  var onSuccess = function () {
    setup.classList.add('hidden');
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


  var getWizard = function (data) {
    for (var i = 0; i < wizardQuantity; i++) {
      var currentWizard = window.util.getRandomNumber(0, data.length - 1);
      wizards.push(data[currentWizard]);
      data.splice(currentWizard, 1);
    }
    wizards.forEach(function (mage) {
      data.push(mage);
    });
  };


  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  };


  var appendWizards = function () {
    for (var i = 0; i < wizardQuantity; i++) {
      wizardsFragment.appendChild(renderWizard(wizards[i]));
    }
    similarWizardElement.appendChild(wizardsFragment);
  };


  var wizardAssembly = {
    getWizard: getWizard,
    appendWizards: appendWizards
  };
  window.backend.load(wizardAssembly, onError);

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), onSuccess, onError);
    evt.preventDefault();
  });
})();
