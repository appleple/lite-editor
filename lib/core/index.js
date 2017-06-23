'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _aTemplate2 = require('a-template');

var _aTemplate3 = _interopRequireDefault(_aTemplate2);

var _deepExtend = require('deep-extend');

var _deepExtend2 = _interopRequireDefault(_deepExtend);

var _util = require('../lib/util');

var util = _interopRequireWildcard(_util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var template = '<div class="\\{classNames.MiniEditor\\}" contenteditable data-action-input="onInput" data-action-paste="onPaste">\n</div>\n<!-- BEGIN showSource:exist -->\n<textarea class="\\{classNames.MiniEditor\\}"></textarea>\n<!-- END showSource:exist -->\n<div class="\\{classNames.MiniEditorBtnGroup\\}">\n    <button class="\\{classNames.MiniEditorBtn\\}<!-- BEGIN showSource:exist -->\\{classNames.MiniEditorBtnActive\\}<!-- END showSource:exist -->" data-action-click="toggleSource">\\{message.sourceBtn\\}</button>\n    <!-- BEGIN useLink:exist -->\n    <button class="\\{classNames.MiniEditorBtn\\}" data-action-click="addLink">\\{message.addLinkBtn\\}</button>\n    <!-- END useLink:exist --> \n    <!-- BEGIN btnOptions:loop -->\n    <button class="\\\\{classNames.MiniEditorBtn\\\\}" data-action-click="insertTag({tag},{className})">{label}</button>\n    <!-- END btnOptions:loop -->\n</div>';


var Entities = require('html-entities').XmlEntities;
var entities = new Entities();
var toMarkdown = require('to-markdown');

var defaults = {
  mode: 'html',
  classNames: {
    MiniEditor: 'minieditor',
    MiniEditorBtn: 'minieditor-btn',
    MiniEditorBtnGroup: 'minieditor-btn-group'
  },
  message: {
    addLinkTitle: 'Add Link',
    addLinkBtn: 'add link'
  },
  btnOptions: [],
  useLink: true,
  showSource: false
};

var MiniEditor = function (_aTemplate) {
  _inherits(MiniEditor, _aTemplate);

  function MiniEditor(ele, settings) {
    _classCallCheck(this, MiniEditor);

    var _this = _possibleConstructorReturn(this, (MiniEditor.__proto__ || Object.getPrototypeOf(MiniEditor)).call(this));

    _this.data = (0, _deepExtend2.default)({}, defaults, settings);
    _this.id = _this._getUniqId();
    _this.addTemplate(_this.id, template);
    var selector = typeof ele === 'string' ? document.querySelector(ele) : ele;
    _this.selector = selector;
    var html = '<div data-id=\'' + _this.id + '\'></div>';
    selector.style.display = 'none';
    util.before(selector, html);
    _this.update();
    return _this;
  }

  _createClass(MiniEditor, [{
    key: '_getUniqId',
    value: function _getUniqId() {
      return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
    }
  }, {
    key: '_getElementByQuery',
    value: function _getElementByQuery(query) {
      return document.querySelector('[data-id=\'' + this.id + '\'] ' + query);
    }
  }, {
    key: 'addLink',
    value: function addLink() {
      var data = this.data;
      var mode = data.mode;
      var url = prompt(data.message.addLinkTitle, 'http://');
      if (mode === 'html') {
        document.execCommand('createlink', true, url);
      } else if (mode === 'markdown') {
        var selection = document.getSelection();
        var insertText = '[' + selection + '](' + url + ']';
        document.execCommand('insertText', false, insertText);
      }
    }
  }, {
    key: 'unlink',
    value: function unlink() {
      document.execCommand('unlink');
    }
  }, {
    key: 'insertTag',
    value: function insertTag(tag, className) {
      var data = this.data;
      var mode = data.mode;
      var classAttr = '';
      if (className) {
        classAttr = ' class="' + className + '"';
      }
      if (mode === 'html') {
        var selection = document.getSelection();
        var insertHtml = '<' + tag + classAttr + '>' + selection + '</' + tag + '>';
        document.execCommand('insertHtml', false, insertHtml);
      }
    }
  }, {
    key: 'onUpdated',
    value: function onUpdated() {
      this.onInput();
    }
  }, {
    key: 'onInput',
    value: function onInput() {
      var editor = this._getElementByQuery('.' + this.data.classNames.MiniEditor);
      this.data.value = entities.decode(editor.innerHTML);
      this.selector.value = this.data.value;
    }
  }, {
    key: 'onPaste',
    value: function onPaste() {
      var e = this.e;
      e.preventDefault();
      var insertText = e.clipboardData.getData('text/plain');
      document.execCommand('insertText', false, insertText);
    }
  }, {
    key: 'changeMode',
    value: function changeMode(mode) {
      this.data.mode = mode;
    }
  }]);

  return MiniEditor;
}(_aTemplate3.default);

module.exports = MiniEditor;