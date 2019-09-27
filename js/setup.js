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

var FIREBALL_COLORS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

var WIZARDS_COUNT = 4;

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var setupModal = document.querySelector('.setup');
var setupSimilar = setupModal.querySelector('.setup-similar');
var similarList = setupModal.querySelector('.setup-similar-list');
var wizardTemplate = document.querySelector('#similar-wizard-template')
  .content.querySelector('.setup-similar-item');

var setupOpenButton = document.querySelector('.setup-open');
var setupCloseButton = setupModal.querySelector('.setup-close');

var userNameInput = setupModal.querySelector('.setup-user-name');

var userWizard = setupModal.querySelector('.setup-wizard');
var wizardCoat = userWizard.querySelector('.wizard-coat');
var wizardEyes = userWizard.querySelector('.wizard-eyes');
var wizardFireball = setupModal.querySelector('.setup-fireball-wrap');
var wizardCoatColorInput = setupModal.querySelector('input[name="coat-color"]');
var wizardEyesColorInput = setupModal.querySelector('input[name="eyes-color"]');
var wizardFireballColorInput = setupModal.querySelector('input[name="fireball-color"]');

// ------------------------------ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ--------------------------------

// генерирует случайное число
var generateRandomNumber = function (min, max) {
  var randomNumber = Math.floor(min + Math.random() * (max + 1 - min));

  return randomNumber;
};

// удаляет отрисованных волшебников
var clearWizardsList = function () {
  var similarWizard = similarList.querySelectorAll('.setup-similar-item');

  similarWizard.forEach(function (wizard) {
    similarList.removeChild(wizard);
  });
};

// получает последующее значение массива начиная с указанного
var generateNextArrayValue = function (currentValue, array) {
  var index = 0;

  for (var i = 0; i < array.length; i++) {

    if (currentValue === array[i]) {
      index = i + 1;

      if (index === array.length) {
        index = 0;
      }
    }
  }

  var nextValue = array[index];

  return nextValue;
};

// -----------------------------ОТРИСОВКА ВОЛШЕБНИКОВ--------------------------------------

// создает объект волшебника
var generateWizardObject = function (names, surnames, coatColors, eyeColors) {
  var wizardObject = {};

  var flag = generateRandomNumber(0, 1);

  if (flag) {
    wizardObject.name = names[generateRandomNumber(0, names.length - 1)] + ' '
      + surnames[generateRandomNumber(0, surnames.length - 1)];
  } else {
    wizardObject.name = surnames[generateRandomNumber(0, surnames.length - 1)] + ' '
      + names[generateRandomNumber(0, names.length - 1)];
  }

  wizardObject.coatColor = coatColors[generateRandomNumber(0, coatColors.length - 1)];

  wizardObject.eyesColor = eyeColors[generateRandomNumber(0, eyeColors.length - 1)];

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
  var fragment = document.createDocumentFragment();

  wizards.forEach(function (wizard) {
    fragment.appendChild(renderWizard(wizard));
  });

  similarList.appendChild(fragment);
};

// --------------------------ОБРАБОТЧИКИ--------------------------------------------------------

// обработчик события нажатия на клавишу ESC
var onModalEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeSetupModal();
  }
};

// обработчик события focus на поле ввода имени
var onInputNameFocus = function () {
  document.removeEventListener('keydown', onModalEscPress);
};

// обработчик клика по плащу волшебника (меняет цвет плаща)
var onWizardCoatClick = function () {

  var nextCoatColor = generateNextArrayValue(wizardCoatColorInput.value, COAT_COLORS);

  wizardCoat.style.fill = nextCoatColor;
  wizardCoatColorInput.value = nextCoatColor;
};

// обработчик клика по глазам волшебника (меняет цвет глаз)
var onWizardEyesClick = function () {

  var nextEyesColor = generateNextArrayValue(wizardEyesColorInput.value, EYES_COLORS);

  wizardEyes.style.fill = nextEyesColor;
  wizardEyesColorInput.value = nextEyesColor;
};

// обработчик клика по файерболу волшебника (меняет цвет файербола)
var onWizardFireballClick = function () {

  var nextFireballColor = generateNextArrayValue(wizardFireballColorInput.value, FIREBALL_COLORS);

  wizardFireball.style.backgroundColor = nextFireballColor;
  wizardFireballColorInput.value = nextFireballColor;
};

// открывает окно с настройками
var openSetupModal = function () {
  clearWizardsList();
  renderWizardsList(generateWizardsObjectsArray(WIZARDS_COUNT));

  setupModal.classList.remove('hidden');
  setupSimilar.classList.remove('hidden');

  document.addEventListener('keydown', onModalEscPress);

  userNameInput.addEventListener('focus', onInputNameFocus);
  userNameInput.addEventListener('blur', function () {
    document.addEventListener('keydown', onModalEscPress);
  });
};

// закрывает окно с настройками
var closeSetupModal = function () {
  setupModal.classList.add('hidden');

  document.removeEventListener('keydown', onModalEscPress);
};


// ----------------------------------СОБЫТИЯ----------------------------------------


// открытие окна настроек по клику
setupOpenButton.addEventListener('click', openSetupModal);

// открытие окна настроек с клавиатуры
setupOpenButton.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openSetupModal();
  }
});

// закрытие окна настроек по клику
setupCloseButton.addEventListener('click', closeSetupModal);

// закрытие окна настроек с клавиатуры
setupCloseButton.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeSetupModal();
  }
});

// меняет цвет плаща по клику на него
wizardCoat.addEventListener('click', onWizardCoatClick);

// меняет цвет глаз по клику на них
wizardEyes.addEventListener('click', onWizardEyesClick);

// меняет цвет файербола по клику на него
wizardFireball.addEventListener('click', onWizardFireballClick);

// ---------------------------------------------------------------------------------------------
