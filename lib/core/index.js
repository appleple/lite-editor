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

var template = '<div class="\\{classNames.SimpleWysiwyg\\}" data-action-click="onPutCaret" data-selector="simple-wysiwyg" contenteditable data-action-input="onInput" data-action-paste="onPaste"<!-- BEGIN showSource:exist --> style="display:none;"<!-- END showSource:exist --><!-- BEGIN hideEditor:exist --> style="display:none;"<!-- END hideEditor:exist -->>{value}</div>\n<textarea class="\\{classNames.SimpleWysiwygSource\\}" data-selector="simple-wysiwyg-source" <!-- BEGIN showSource:empty --> style="display:none;"<!-- END showSource:empty -->{attr} data-action="directInput">{value}[format]</textarea>\n\n<!-- BEGIN selectOptions.0:exist -->\n<div class="\\{classNames.SimpleWysiwygSelectWrap\\}">\n    <select class="\\{classNames.SimpleWysiwygSelect\\}"<!-- BEGIN selectName:exist --> name="{selectName}"<!-- END selectName:exist --> data-action-change="changeOption" data-bind="selectedOption">\n      <!-- BEGIN selectOptions:loop -->\n      <option value="{value}" data-tag_extend>{label}</option>\n      <!-- END selectOptions:loop -->\n    </select>\n</div>\n<!-- END selectOptions.0:exist -->\n\n<div class="\\{classNames.SimpleWysiwygBtnGroupWrap\\}" <!-- BEGIN hideBtns:exist --> style="display:none;"<!-- END hideBtns:exist -->>\n    <div class="\\{classNames.SimpleWysiwygBtnGroup\\}">\n      <button class="\\{classNames.SimpleWysiwygBtn\\}<!-- BEGIN showSource:exist --> \\{classNames.SimpleWysiwygBtnActive\\}<!-- END showSource:exist -->" data-action-click="toggleSource" type="button">\\{message.sourceBtn\\}</button>\n      <button class="\\{classNames.SimpleWysiwygBtn\\}" data-action-click="redo"<!-- BEGIN showSource:exist --> disabled<!-- END showSource:exist --> type="button">\\{message.redoBtn\\}</button>\n      <button class="\\{classNames.SimpleWysiwygBtn\\}" data-action-click="undo"<!-- BEGIN showSource:exist --> disabled<!-- END showSource:exist --> type="button">\\{message.undoBtn\\}</button>\n      <button class="\\{classNames.SimpleWysiwygBtn\\}" data-action-click="resetStyle"<!-- BEGIN showSource:exist --> disabled<!-- END showSource:exist --> type="button">\\{message.resetStyleBtn\\}</button>\n    </div>\n    \n    <div class="\\{classNames.SimpleWysiwygBtnGroup\\}">\n      <!-- BEGIN btnOptions:loop -->\n      <button class="\\\\{classNames.SimpleWysiwygBtn\\\\}<!-- BEGIN selfClassName:exist --> {selfClassName}<!-- END selfClassName:exist -->"<!-- BEGIN tag:exist --> data-action-click="insertTag({tag},{className})"<!-- END tag:exist --><!-- BEGIN tag:empty --> data-action-click="onClick({i})"<!-- END tag:empty --><!-- \\BEGIN showSource:exist --> disabled<!-- \\END showSource:exist --> type="button">{label}</button>\n      <!-- END btnOptions:loop -->\n    </div>\n</div>';


var Entities = require('html-entities').XmlEntities;
var upndown = require('upndown');
var showdown = require('showdown');

var entities = new Entities();
var converter = new showdown.Converter();
var und = new upndown({ decodeEntities: false });

var defaults = {
  mode: 'html',
  classNames: {
    SimpleWysiwyg: 'simple-wysiwyg',
    SimpleWysiwygSource: 'simple-wysiwyg-source',
    SimpleWysiwygBtn: 'simple-wysiwyg-btn',
    SimpleWysiwygBtnActive: 'simple-wysiwyg-btn-active',
    SimpleWysiwygBtnGroup: 'simple-wysiwyg-btn-group',
    SimpleWysiwygBtnGroupWrap: 'simple-wysiwyg-btn-group-wrap',
    SimpleWysiwygSelect: 'simple-wysiwyg-select',
    SimpleWysiwygSelectWrap: 'simple-wysiwyg-select-wrap'
  },
  message: {
    addLinkTitle: 'Add Link',
    addLinkBtn: 'add link',
    sourceBtn: 'source',
    resetStyleBtn: 'reset',
    noRangeSelected: 'please select the range',
    redoBtn: 'redo',
    undoBtn: 'undo'
  },
  selectOptions: [],
  btnOptions: [],
  selectName: '',
  useLink: true,
  showSource: false,
  hideEditor: false
};

var SimpleWysiwyg = function (_aTemplate) {
  _inherits(SimpleWysiwyg, _aTemplate);

  function SimpleWysiwyg(ele, settings) {
    _classCallCheck(this, SimpleWysiwyg);

    var _this = _possibleConstructorReturn(this, (SimpleWysiwyg.__proto__ || Object.getPrototypeOf(SimpleWysiwyg)).call(this));

    _this.data = (0, _deepExtend2.default)({}, defaults, settings);
    _this.id = _this._getUniqId();
    _this.addTemplate(_this.id, template);
    var selector = typeof ele === 'string' ? document.querySelector(ele) : ele;
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
    _this.selector = _this._getElementByQuery('[data-selector="simple-wysiwyg-source"]');
    var item = _this.data.selectOptions.find(function (item) {
      return item.value === _this.data.selectedOption;
    });
    if (item && item.onSelect) {
      item.onSelect.apply(_this);
    }
    if (_this.data.afterInit) {
      _this.data.afterInit.apply(_this);
    }
    return _this;
  }

  _createClass(SimpleWysiwyg, [{
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
    key: 'encodeValue',
    value: function encodeValue() {
      this.data.value = entities.encode(this.data.value);
      this.update();
    }
  }, {
    key: 'decodeValue',
    value: function decodeValue() {
      this.data.value = entities.decode(this.data.value);
      this.update();
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
    key: 'resetStyle',
    value: function resetStyle() {
      var data = this.data;
      var mode = data.mode;
      var selection = util.getSelection();
      var insertText = ('' + selection).replace(/<[^>]*>/g, "");
      if (this._isFocused()) {
        document.execCommand('insertText', false, insertText);
      }
    }
  }, {
    key: 'insertHtml',
    value: function insertHtml(html) {
      if (this._isFocused()) {
        document.execCommand('insertHtml', false, html);
      }
    }
  }, {
    key: 'saveSelection',
    value: function saveSelection() {
      this.selection = util.saveSelection();
    }
  }, {
    key: 'restoreSelection',
    value: function restoreSelection() {
      if (!this.selection) {
        return;
      }
      util.restoreSelection(this.selection);
    }
  }, {
    key: '_isFocused',
    value: function _isFocused() {
      var selector = this._getElementByQuery('[data-selector="simple-wysiwyg"]');
      return selector !== document.activeElement;
    }
  }, {
    key: 'insertTag',
    value: function insertTag(tag, className) {
      var data = this.data;
      var mode = data.mode;
      var classAttr = '';
      var link = '';
      if (className) {
        classAttr = ' class="' + className + '"';
      }
      if (tag === 'a') {
        link = ' href="' + prompt(data.message.addLinkTitle, 'http://') + '"';
      }
      if (!this._isFocused()) {
        return;
      }
      var selection = util.getSelection();
      if (!selection) {
        alert(data.message.noRangeSelected);
        return;
      }
      var insertHtml = '<' + tag + link + classAttr + '>' + selection + '</' + tag + '>';
      if (this.data.mode === 'markdown') {
        und.convert(insertHtml, function (err, markdown) {
          document.execCommand('insertHtml', false, markdown.replace(/\r\n|\r|\n/g, '<br/>'));
        });
      } else {
        document.execCommand('insertHtml', false, insertHtml.replace(/\r\n|\r|\n/g, '<br/>'));
      }
    }
  }, {
    key: 'onClick',
    value: function onClick(i) {
      var number = parseInt(i, 10);
      if (this.data.btnOptions[number].onClick) {
        this.data.btnOptions[number].onClick.apply(this);
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
      var editor = this._getElementByQuery('[data-selector="simple-wysiwyg"]');
      this.data.value = editor.innerHTML;
      if (this.selector) {
        this.selector.value = this.format(this.data.value);
      }
    }
  }, {
    key: 'onPaste',
    value: function onPaste() {
      var e = this.e;
      e.preventDefault();
      var insertText = e.clipboardData.getData('text/plain');
      if (this._isFocused()) {
        document.execCommand('insertText', false, insertText);
      }
    }
  }, {
    key: 'onPutCaret',
    value: function onPutCaret() {}
  }, {
    key: 'redo',
    value: function redo() {
      document.execCommand('redo', false);
    }
  }, {
    key: 'undo',
    value: function undo() {
      document.execCommand('undo', false);
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
      this.data.value = this.e.target.value;
    }
  }, {
    key: 'format',
    value: function format(txt) {
      var decoded = entities.decode(txt);
      return decoded.replace(/<br>/g, '\n').replace(/^([\t ])*\n/gm, "");
    }
  }, {
    key: 'toMarkdown',
    value: function toMarkdown() {
      var _this2 = this;

      this.data.mode = 'markdown';
      und.convert(this.data.value, function (err, markdown) {
        _this2.data.value = markdown;
        _this2.update();
      });
    }
  }, {
    key: 'toHtml',
    value: function toHtml() {
      this.data.mode = 'html';
      this.data.value = converter.makeHtml(this.data.value);
      this.data.value = this.data.value.replace(/^<p>|<\/p>$/g, '');
      this.update();
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
      if (item && item.onSelect) {
        item.onSelect.apply(this);
      }
    }
  }]);

  return SimpleWysiwyg;
}(_aTemplate3.default);

exports.default = SimpleWysiwyg;
module.exports = exports['default'];