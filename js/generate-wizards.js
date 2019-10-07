'use strict';

(function () {

  // создает объект волшебника
  var generateWizard = function (names, surnames, coatColors, eyeColors) {
    var wizard = {};

    var flag = window.utils.generateRandomNumber(0, 1);

    if (flag) {
      wizard.name = names[window.utils.generateRandomNumber(0, names.length - 1)] + ' '
        + surnames[window.utils.generateRandomNumber(0, surnames.length - 1)];
    } else {
      wizard.name = surnames[window.utils.generateRandomNumber(0, surnames.length - 1)] + ' '
        + names[window.utils.generateRandomNumber(0, names.length - 1)];
    }

    wizard.coatColor = coatColors[window.utils.generateRandomNumber(0, coatColors.length - 1)];

    wizard.eyesColor = eyeColors[window.utils.generateRandomNumber(0, eyeColors.length - 1)];

    return wizard;
  };

  // создает массив с объектами волшебников
  window.generateWizards = function (wizardsCount) {
    var names = window.data.names;
    var surnames = window.data.surnames;
    var coatColors = window.data.coatColors;
    var eyesColors = window.data.eyesColors;

    var wizards = [];

    for (var i = 0; i < wizardsCount; i++) {
      wizards[i] = generateWizard(names, surnames, coatColors, eyesColors);
    }

    return wizards;
  };

})();
