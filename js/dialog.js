'use strict';

(function () {

  var setupModal = document.querySelector('.setup');
  var setupSimilar = setupModal.querySelector('.setup-similar');
  var userNameInput = setupModal.querySelector('.setup-user-name');
  var setupOpenButton = document.querySelector('.setup-open');
  var setupCloseButton = setupModal.querySelector('.setup-close');

  var modalHandle = setupModal.querySelector('.upload');

  var wizardCoat = setupModal.querySelector('.wizard-coat');
  var wizardEyes = setupModal.querySelector('.wizard-eyes');
  var wizardFireball = setupModal.querySelector('.setup-fireball-wrap');

  //
  var resetDialogPosition = function () {
    setupModal.removeAttribute('style');
  };

  // обработчик события нажатия на клавишу ESC
  var onModalEscPress = function (evt) {
    window.utils.isEscPress(evt, closeSetupModal);
  };

  // закрытие окна настроек с клавиатуры
  var onModalCloseEnterPress = function (evt) {
    window.utils.isEnterPress(evt, closeSetupModal);
  };

  // открытие окна настроек с клавиатуры
  var onModalOpenEnterPress = function (evt) {
    window.utils.isEnterPress(evt, openSetupModal);
  };

  // обработчик события focus на поле ввода имени
  var onInputNameFocus = function () {
    document.removeEventListener('keydown', onModalEscPress);
  };

  // обработчик события blur на поле ввода имени
  var onInputNameBlur = function () {
    document.addEventListener('keydown', onModalEscPress);
  };

  // открывает окно с настройками
  var openSetupModal = function () {
    window.renderWizards.clearWizardsList();
    window.renderWizards.renderWizardsList(window.generateWizards(window.data.wizardsCount));

    setupModal.classList.remove('hidden');
    setupSimilar.classList.remove('hidden');

    document.addEventListener('keydown', onModalEscPress);

    userNameInput.addEventListener('focus', onInputNameFocus);
    userNameInput.addEventListener('blur', onInputNameBlur);

    window.colorize(wizardCoat);
    window.colorize(wizardEyes);
    window.colorize(wizardFireball);

    modalHandle.addEventListener('mousedown', window.onMouseDown);
  };

  // закрывает окно с настройками
  var closeSetupModal = function () {
    setupModal.classList.add('hidden');

    resetDialogPosition();

    document.removeEventListener('keydown', onModalEscPress);
  };

  // открытие окна настроек по клику
  setupOpenButton.addEventListener('click', openSetupModal);

  // открытие окна настроек с клавиатуры
  setupOpenButton.addEventListener('keydown', onModalOpenEnterPress);

  // закрытие окна настроек по клику
  setupCloseButton.addEventListener('click', closeSetupModal);

  // закрытие окна настроек с клавиатуры
  setupCloseButton.addEventListener('keydown', onModalCloseEnterPress);

})();
