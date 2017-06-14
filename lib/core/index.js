'use strict';

var _aTemplate2 = require('a-template');

var _aTemplate3 = _interopRequireDefault(_aTemplate2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var template = '';


var util = require('../lib/util');

var defaults = {};

var MiniEditor = function (_aTemplate) {
  _inherits(MiniEditor, _aTemplate);

  function MiniEditor(selector, settings) {
    _classCallCheck(this, MiniEditor);

    return _possibleConstructorReturn(this, (MiniEditor.__proto__ || Object.getPrototypeOf(MiniEditor)).call(this));
  }

  return MiniEditor;
}(_aTemplate3.default);

module.exports = MiniEditor;