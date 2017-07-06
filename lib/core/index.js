'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var template = '\n<div class="\\{classNames.MiniEditor\\}" contenteditable data-action-input="onInput" data-action-paste="onPaste"<!-- BEGIN showSource:exist --> style="display:none;"<!-- END showSource:exist --><!-- BEGIN hideEditor:exist --> style="display:none;"<!-- END hideEditor:exist -->>{value}</div>\n<textarea class="\\{classNames.MiniEditorSource\\}"<!-- BEGIN showSource:empty --> style="display:none;"<!-- END showSource:empty -->{attr} data-action="directInput">{value}[format]</textarea>\n\n\n<!-- BEGIN selectOptions.0:exist -->\n<div class="\\{classNames.MiniEditorSelectWrap\\}">\n    <select class="\\{classNames.MiniEditorSelect\\}"<!-- BEGIN selectName:exist --> name="{selectName}"<!-- END selectName:exist --> data-action-change="changeOption" data-bind="selectedOption">\n        <!-- BEGIN selectOptions:loop -->\n        <option value="{value}" data-tag_extend>{label}</option>\n        <!-- END selectOptions:loop -->\n    </select>\n</div>\n<!-- END selectOptions.0:exist -->\n\n\n<div class="\\{classNames.MiniEditorBtnGroupWrap\\}" <!-- BEGIN hideBtns:exist --> style="display:none;"<!-- END hideBtns:exist -->>\n    <div class="\\{classNames.MiniEditorBtnGroup\\}">\n        <button class="\\{classNames.MiniEditorBtn\\}<!-- BEGIN showSource:exist --> \\{classNames.MiniEditorBtnActive\\}<!-- END showSource:exist -->" data-action-click="toggleSource" type="button">\\{message.sourceBtn\\}</button>\n        <button class="\\{classNames.MiniEditorBtn\\}" data-action-click="resetStyle"<!-- BEGIN showSource:exist --> disabled<!-- END showSource:exist --> type="button">\\{message.resetStyleBtn\\}</button>\n        <!-- BEGIN useLink:exist -->\n        <button class="\\{classNames.MiniEditorBtn\\}" data-action-click="addLink"<!-- BEGIN showSource:exist --> disabled<!-- END showSource:exist --> type="button">\\{message.addLinkBtn\\}</button>\n        <!-- END useLink:exist --> \n        <!-- BEGIN btnOptions:loop -->\n        <button class="\\\\{classNames.MiniEditorBtn\\\\}" data-action-click="insertTag({tag},{className})" <!-- \\BEGIN showSource:exist --> disabled<!-- \\END showSource:exist --> type="button">{label}</button>\n        <!-- END btnOptions:loop -->\n    </div>\n</div>';


var Entities = require('html-entities').XmlEntities;
var entities = new Entities();
var toMarkdown = require('to-markdown');

var defaults = {
  mode: 'html',
  classNames: {
    MiniEditor: 'minieditor',
    MiniEditorSource: 'minieditor-source',
    MiniEditorBtn: 'minieditor-btn',
    MiniEditorBtnActive: 'minieditor-btn-active',
    MiniEditorBtnGroup: 'minieditor-btn-group',
    MiniEditorBtnGroupWrap: 'minieditor-btn-group-wrap',
    MiniEditorSelect: 'minieditor-select',
    MiniEditorSelectWrap: 'minieditor-select-wrap'
  },
  message: {
    addLinkTitle: 'Add Link',
    addLinkBtn: 'add link',
    sourceBtn: 'source',
    resetStyleBtn: 'reset'
  },
  selectOptions: [],
  btnOptions: [],
  selectName: '',
  useLink: true,
  showSource: false,
  hideEditor: false
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
    _this.convert = {
      format: _this.format
    };
    if (selector.value) {
      _this.data.value = selector.value.replace(/\r\n|\r|\n/g, '<br/>');
    }
    var attrStr = '';
    if (selector.attributes) {
      [].forEach.call(selector.attributes, function (attr) {
        attrStr += ' ' + attr.nodeName + '="' + attr.nodeValue + '"';
      });
    }
    if (!_this.data.selectedOption && _this.data.selectOptions && _this.data.selectOptions[0] && _this.data.selectOptions[0].value) {
      _this.data.selectedOption = _this.data.selectOptions[0].value;
    }
    _this.data.attr = attrStr;
    var html = '<div data-id=\'' + _this.id + '\'></div>';
    selector.style.display = 'none';
    util.before(selector, html);
    util.removeElement(selector);
    _this.update();
    return _this;
  }

  _createClass(MiniEditor, [{
    key: '_getSelf',
    value: function _getSelf() {
      return document.querySelector('[data-id=\'' + this.id + '\']');
    }
  }, {
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
    key: 'hideEditor',
    value: function hideEditor() {
      this.data.hideEditor = true;
      this.update();
    }
  }, {
    key: 'showEditor',
    value: function showEditor() {
      this.data.hideEditor = false;
      this.update();
    }
  }, {
    key: 'hideBtns',
    value: function hideBtns() {
      this.data.hideBtns = true;
      this.update();
    }
  }, {
    key: 'showBtns',
    value: function showBtns() {
      this.data.hideBtns = false;
      this.update();
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
        var insertText = '[' + selection + '](' + url + ')';
        document.execCommand('insertText', false, insertText);
      }
    }
  }, {
    key: 'resetStyle',
    value: function resetStyle() {
      var data = this.data;
      var mode = data.mode;
      if (mode === 'html') {
        var selection = util.getSelection();
        var insertText = ('' + selection).replace(/<[^>]*>/g, "");
        document.execCommand('insertText', false, insertText);
      }
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
        var selection = util.getSelection();
        var insertHtml = '<' + tag + classAttr + '>' + selection + '</' + tag + '>';
        document.execCommand('insertHtml', false, insertHtml.replace(/\r\n|\r|\n/g, '<br/>'));
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
      this.data.value = editor.innerHTML;
      this.selector.value = this.format(this.data.value);
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
  }, {
    key: 'toggleSource',
    value: function toggleSource() {
      var source = this.data.showSource;
      this.data.showSource = !source;
      this.update();
    }
  }, {
    key: 'directInput',
    value: function directInput() {
      this.data.value = this.e.value;
    }
  }, {
    key: 'format',
    value: function format(txt) {
      var decoded = entities.decode(txt);
      return decoded.replace(/<br>/g, '\n').replace(/^([\t ])*\n/gm, "");
    }
  }, {
    key: 'changeOption',
    value: function changeOption() {
      var value = this.e.target.value;
      if (!value) {
        return;
      }
      var item = this.data.selectOptions.find(function (item) {
        return item.value === value;
      });
      if (item.onSelect) {
        item.onSelect.apply(this);
      }
    }
  }]);

  return MiniEditor;
}(_aTemplate3.default);

exports.default = MiniEditor;
module.exports = exports['default'];