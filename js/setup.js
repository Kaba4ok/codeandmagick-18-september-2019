'use strict';

var NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var SURNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var WIZARDS_COUNT = 4;

var setupModal = document.querySelector('.setup');
var setupSimilar = setupModal.querySelector('.setup-similar');
var similarList = setupModal.querySelector('.setup-similar-list');
var wizardTemplate = document.querySelector('#similar-wizard-template')
  .content.querySelector('.setup-similar-item');

setupModal.classList.remove('hidden');

// генерирует случайное число
var generateRandomNumber = function (min, max) {
  var randomNumber = Math.floor(min + Math.random() * (max + 1 - min));

  return randomNumber;
};

// создает объект волшебника
var generateWizardObject = function (names, surnames, coatColors, eyeColors) {
  var wizardObject = {};

  var flag = generateRandomNumber(0, 1);

  if (flag) {
    wizardObject.name = names[generateRandomNumber(0, names.length)] + ' ' + surnames[generateRandomNumber(0, surnames.length)];
  } else {
    wizardObject.name = surnames[generateRandomNumber(0, surnames.length)] + ' ' + names[generateRandomNumber(0, names.length)];
  }

  wizardObject.coatColor = coatColors[generateRandomNumber(0, coatColors.length)];

  wizardObject.eyesColor = eyeColors[generateRandomNumber(0, eyeColors.length)];

  return wizardObject;
};

// создает массив с объектами волшебников
var generateWizardsObjectsArray = function (wizardsCount) {
  var wizardsObjectsArray = [];

  for (var i = 0; i < wizardsCount; i++) {
    wizardsObjectsArray[i] = generateWizardObject(NAMES, SURNAMES, COAT_COLORS, EYES_COLORS);
  }

  return wizardsObjectsArray;
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
  setupSimilar.classList.remove('hidden');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }

  similarList.appendChild(fragment);
};

renderWizardsList(generateWizardsObjectsArray(WIZARDS_COUNT));
