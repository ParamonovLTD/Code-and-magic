'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var setupUpload = setup.querySelector('.upload');


  var Coordinate = function (x, y) {
    this.x = x;
    this.y = y;
  };


  setupUpload.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = new Coordinate(evt.clientX, evt.clientY);
    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;
      var shift = new Coordinate(moveEvt.clientX - startCoords.x, moveEvt.clientY - startCoords.y);
      startCoords = new Coordinate(moveEvt.clientX, moveEvt.clientY);
      setup.style.top = (setup.offsetTop + shift.y) + 'px';
      setup.style.left = (setup.offsetLeft + shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          setupUpload.removeEventListener('click', onClickPreventDefault);
        };
        setupUpload.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
