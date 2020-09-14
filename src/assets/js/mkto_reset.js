// JavaScript Document

MktoForms2.whenReady(function (form) {

  (function () {

    var
      reset;

    reset = function () {

      var
        _target = ['mktoHasWidth', 'mktoFormCol', 'mktoOffset'],
        target = [];
      for (var i = 0; i < _target.length; i++) {

        _target[i] = [].slice.call(document.getElementsByClassName(_target[i]));
        target = target.concat(_target[i]);

      }

      for (var i = 0; i < target.length; i++) {

        target[i].setAttribute('style', '');
      }

    };

    reset();

    window.addEventListener('resize', reset);

  }());
});
