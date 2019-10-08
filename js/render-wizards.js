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
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  // отрисовывает список волшебников
  var renderWizardsList = function (wizards) {
    var fragment = document.createDocumentFragment();

    wizards.forEach(function (wizard) {
      fragment.appendChild(renderWizard(wizard));
    });

    similarList.appendChild(fragment);
  };

  window.renderWizards = {
    renderWizardsList: renderWizardsList,
    clearWizardsList: clearWizardsList
  };

})();
