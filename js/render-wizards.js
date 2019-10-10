'use strict';

(function () {

  var setupModal = document.querySelector('.setup');
  var similarList = setupModal.querySelector('.setup-similar-list');
  var wizardTemplate = document.querySelector('#similar-wizard-template')
    .content.querySelector('.setup-similar-item');

  // удаляет отрисованных волшебников
  var clearWizardsList = function () {
    var similarWizard = similarList.querySelectorAll('.setup-similar-item');

    similarWizard.forEach(function (wizard) {
      similarList.removeChild(wizard);
    });
  };

  // отрисовывает волшебника
  var renderWizard = function (wizard) {
    var wizardElement = wizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  // отрисовывает список волшебников
  var renderWizardsList = function (wizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < window.data.wizardsCount; i++) {
      var index = window.utils.generateRandomNumber(0, wizards.length)
      fragment.appendChild(renderWizard(wizards[index]));
    }

    similarList.appendChild(fragment);
  };

  window.renderWizards = {
    renderWizardsList: renderWizardsList,
    clearWizardsList: clearWizardsList
  };

})();
