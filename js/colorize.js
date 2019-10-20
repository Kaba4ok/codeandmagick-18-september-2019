'use strict';

(function () {

  var setupModal = document.querySelector('.setup');
  var wizardCoat = setupModal.querySelector('.wizard-coat');
  var wizardEyes = setupModal.querySelector('.wizard-eyes');
  var wizardFireball = setupModal.querySelector('.setup-fireball-wrap');
  var wizardCoatColorInput = setupModal.querySelector('input[name="coat-color"]');
  var wizardEyesColorInput = setupModal.querySelector('input[name="eyes-color"]');
  var wizardFireballColorInput = setupModal.querySelector('input[name="fireball-color"]');

  // обработчик клика по плащу волшебника (меняет цвет плаща)
  var onWizardCoatClick = function () {

    var nextCoatColor = window.utils.generateNextArrayValue(wizardCoatColorInput.value, window.data.coatColors);

    wizardCoat.style.fill = nextCoatColor;
    wizardCoatColorInput.value = nextCoatColor;

    window.debounce(window.updateWizards);
  };

  // обработчик клика по глазам волшебника (меняет цвет глаз)
  var onWizardEyesClick = function () {

    var nextEyesColor = window.utils.generateNextArrayValue(wizardEyesColorInput.value, window.data.eyesColors);

    wizardEyes.style.fill = nextEyesColor;
    wizardEyesColorInput.value = nextEyesColor;

    window.debounce(window.updateWizards);
  };

  // обработчик клика по файерболу волшебника (меняет цвет файербола)
  var onWizardFireballClick = function () {

    var nextFireballColor = window.utils.generateNextArrayValue(wizardFireballColorInput.value, window.data.fireballColors);

    wizardFireball.style.backgroundColor = nextFireballColor;
    wizardFireballColorInput.value = nextFireballColor;
  };

  // навешивает обработчик клика для смены цвета элемента волшебника
  window.colorize = function (element) {
    element.addEventListener('click', function () {
      if (element === wizardCoat) {
        onWizardCoatClick();
      } else if (element === wizardEyes) {
        onWizardEyesClick();
      } else if (element === wizardFireball) {
        onWizardFireballClick();
      }
    });
  };


})();
