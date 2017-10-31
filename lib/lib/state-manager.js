'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _clone = require('clone');

var _clone2 = _interopRequireDefault(_clone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StateManager = function () {
  function StateManager() {
    _classCallCheck(this, StateManager);

    this.stackPosition = 0;
    this.stack = [];
  }

  _createClass(StateManager, [{
    key: 'pushState',
    value: function pushState(state) {
      this.stack = this.stack.slice(0, this.stackPosition + 1);
      this.stack.push((0, _clone2.default)(state));
      this.stackPosition++;
    }
  }, {
    key: 'redo',
    value: function redo() {
      if (!this.canRedo()) {
        return;
      }
      this.stackPosition++;
      return (0, _clone2.default)(this.stack[this.stackPosition]);
    }
  }, {
    key: 'canRedo',
    value: function canRedo() {
      if (this.stackPosition < this.stack.length - 1) {
        return true;
      }
      return false;
    }
  }, {
    key: 'undo',
    value: function undo() {
      if (!this.canUndo()) {
        return;
      }
      this.stackPosition--;
      return (0, _clone2.default)(this.stack[this.stackPosition]);
    }
  }, {
    key: 'canUndo',
    value: function canUndo() {
      if (this.stackPosition > 0) {
        return true;
      }
      return false;
    }
  }]);

  return StateManager;
}();

exports.default = StateManager;
module.exports = exports['default'];