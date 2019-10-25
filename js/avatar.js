'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var upload = document.querySelector('.upload');
  var avatar = upload.querySelector('.setup-user-pic');
  var fileChooser = upload.querySelector('input[type=file]');

  // обработчик события change инпута аватарки
  var changeAvatar = function () {
    var file = fileChooser.files[0];

    if (file) {
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          avatar.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    }
  };

  // подписка на изменения значения инпута аватарки
  fileChooser.addEventListener('change', changeAvatar);

})();
