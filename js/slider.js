'use strict';

(function () {
  var Slider = function (options, cb) {
    var self = this;

    this.elem = options.elem;
    this.cb = cb;
    this._thumb = this.elem.querySelector('.upload-effect-level-pin');
    this._fillLine = this.elem.querySelector('.upload-effect-level-val');
    this._emptyLine = this.elem.querySelector('.upload-effect-level-line');
    this.step = 10;

    Slider.prototype.startDrag = function (evt) {
      evt.preventDefault();

      self.startCoords = {
        x: evt.clientX - self._thumb.getBoundingClientRect().left - (self._thumb.offsetWidth / 2)
      };
    };

    Slider.prototype.moveTo = function (evtMove) {
      var maxWidthLine = self._emptyLine.offsetWidth - (self._thumb.offsetWidth / 2);

      var shift = {
        x: evtMove.clientX - self.startCoords.x - self._emptyLine.getBoundingClientRect().left
      };

      shift.x = Math.max(shift.x, self._thumb.offsetWidth / 2);
      shift.x = Math.min(shift.x, maxWidthLine);

      self._thumb.style.left = shift.x + 'px';
      self._fillLine.style.width = self._thumb.style.left;

      self.cb();
    };

    Slider.prototype.moveToForKey = function (evtKey) {
      switch (evtKey.keyCode) {
        case window.util.ButtonKeyCode.ARROW_LEFT:
          if (self._thumb.offsetLeft < self.step || self._thumb.offsetLeft < self._thumb.offsetWidth) {
            self._thumb.style.left = (self._thumb.offsetWidth / 2) + 'px';

          } else {
            self._thumb.style.left = self._thumb.offsetLeft - self.step + 'px';
            self._fillLine.style.width = self._thumb.style.left;
          }

          cb();
          break;

        case window.util.ButtonKeyCode.ARROW_RIGHT:
          if (self._thumb.offsetLeft > self._emptyLine.offsetWidth - self.step) {
            self._thumb.style.left = self._emptyLine.offsetWidth - (self._thumb.offsetWidth / 2) + 'px';

          } else {
            self._thumb.style.left = self._thumb.offsetLeft + self.step + 'px';
            self._fillLine.style.width = self._thumb.offsetLeft + 'px';
          }

          cb();
          break;
      }
    };

    Slider.prototype.dragEnd = function () {
      document.removeEventListener('mousemove', self.onMouseMove);
      document.removeEventListener('mouseup', self.onMouseUp);
    };

    Slider.prototype.onMouseDown = function (evtUp) {
      self.startDrag(evtUp);

      document.addEventListener('mousemove', self.onMouseMove);
      document.addEventListener('mouseup', self.onMouseUp);
    };

    Slider.prototype.onMouseMove = function (evtMove) {
      evtMove.preventDefault();

      self.moveTo(evtMove);
    };

    Slider.prototype.onMoveToForKey = function (evtKey) {
      self.moveToForKey(evtKey);
    };

    Slider.prototype.onMouseUp = function () {
      self.dragEnd();
    };
  };

  Slider.prototype.init = function () {
    var self = this;

    this._thumb.addEventListener('mousedown', self.onMouseDown);
    this._thumb.addEventListener('keydown', self.onMoveToForKey);
  };

  var slider = new Slider({elem: document.querySelector('.upload-effect-level')}, window.applyFilter.applyFilter);
  slider.init();
})();
