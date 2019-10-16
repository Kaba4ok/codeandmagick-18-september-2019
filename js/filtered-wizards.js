'use strict';

(function () {

  var setupModal = document.querySelector('.setup');
  var wizardCoatColorInput = setupModal.querySelector('input[name="coat-color"]');
  var wizardEyesColorInput = setupModal.querySelector('input[name="eyes-color"]');

  // формирует показатель уровня похожести волшебников
  var getRank = function (wizard) {
    var rank = 0;

    var coatColor = wizardCoatColorInput.value;
    var eyesColor = wizardEyesColorInput.value;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  // отрисовывает обновленный список похожих волшебников
  window.updateWizards = function (wizards) {
    window.renderWizards.renderWizardsList(wizards
      .slice()
      .sort(function (left, right) {
        var rankDiff = getRank(right) - getRank(left);
        if (rankDiff === 0) {
          rankDiff = wizards.indexOf(left) - wizards.indexOf(right);
        }
        return rankDiff;
      })
    );
  };

})();
