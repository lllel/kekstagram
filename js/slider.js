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

    this.onMouseDown = function (evt) {
      self.dragStart(evt);

      document.addEventListener('mousemove', self.onMouseMove);
      document.addEventListener('mouseup', self.onMouseUp);
    };

    this.onMouseMove = function (evtMove) {
      self.moveTo(evtMove);
    };

    this.onMoveToForKey = function (evtKey) {
      self.moveToForKey(evtKey);
    };

    this.onMouseUp = function () {
      document.removeEventListener('mousemove', self.onMouseMove);
      document.removeEventListener('mouseup', self.onMouseUp);
    };
  };

  Slider.prototype.dragStart = function (evt) {
    this.startCoords = {
      x: evt.clientX - this._thumb.getBoundingClientRect().left - (this._thumb.offsetWidth / 2)
    };
  };

  Slider.prototype.moveTo = function (evtMove) {
    var maxWidthLine = this._emptyLine.offsetWidth - (this._thumb.offsetWidth / 2);

    var shift = {
      x: evtMove.clientX - this.startCoords.x - this._emptyLine.getBoundingClientRect().left
    };

    shift.x = Math.max(shift.x, this._thumb.offsetWidth / 2);
    shift.x = Math.min(shift.x, maxWidthLine);

    this._thumb.style.left = shift.x + 'px';
    this._fillLine.style.width = this._thumb.style.left;

    this.cb();
  };

  Slider.prototype.moveToForKey = function (evtKey) {
    switch (evtKey.keyCode) {
      case window.util.ButtonKeyCode.ARROW_LEFT:
        if (this._thumb.offsetLeft < this.step || this._thumb.offsetLeft < this._thumb.offsetWidth) {
          this._thumb.style.left = (this._thumb.offsetWidth / 2) + 'px';

        } else {
          this._thumb.style.left = this._thumb.offsetLeft - this.step + 'px';
          this._fillLine.style.width = this._thumb.style.left;
        }

        this.cb();
        break;

      case window.util.ButtonKeyCode.ARROW_RIGHT:
        if (this._thumb.offsetLeft > this._emptyLine.offsetWidth - this.step) {
          this._thumb.style.left = this._emptyLine.offsetWidth - (this._thumb.offsetWidth / 2) + 'px';

        } else {
          this._thumb.style.left = this._thumb.offsetLeft + this.step + 'px';
          this._fillLine.style.width = this._thumb.offsetLeft + 'px';
        }

        this.cb();
        break;
    }
  };

  Slider.prototype.init = function () {
    this._thumb.addEventListener('mousedown', this.onMouseDown);
    this._thumb.addEventListener('keydown', this.onMoveToForKey);
  };

  var slider = new Slider({elem: document.querySelector('.upload-effect-level')}, window.applyFilter.applyFilter);
  slider.init();
})();
