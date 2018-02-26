'use strict';

(function () {
  var FORMATS_PICTURE = ['gif', 'jpg', 'jpeg', 'png'];

  var previewAvatar = window.modal.formUpload.querySelectorAll('.upload-effect-preview');

  var onInputFileChange = function () {
    var file = window.modal.uploadInput.files[0];
    var fileName = file.name;

    if (file) {
      var matches = FORMATS_PICTURE.some(function (it) {
        var regEx = new RegExp('.+\\.' + it);

        return regEx.test(fileName.toLowerCase());
      });
    }

    if (matches) {
      var fileReader = new FileReader();

      fileReader.addEventListener('load', function () {
        window.applyFilter.photoEffectPreviewUpload.src = fileReader.result;

        [].forEach.call(previewAvatar, function (it) {
          it.style.backgroundImage = 'url(' + fileReader.result + ')';
        });
      });

      fileReader.readAsDataURL(file);
    }
  };
  window.modal.uploadInput.addEventListener('change', function () {
    window.modal.uploadInput.accept = '.gif, .jpg, .jpeg, .png';

    onInputFileChange();
  });
})();
