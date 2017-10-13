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

var editorHtml = '<div class="\\{classNames.SimpleWysiwyg\\}" data-action-mouseup="onPutCaret" data-action-keydown="onKeyDown" data-selector="simple-wysiwyg" contenteditable data-action-input="onInput" data-action-paste="onPaste"<!-- BEGIN showSource:exist --> style="display:none;"<!-- END showSource:exist --><!-- BEGIN hideEditor:exist --> style="display:none;"<!-- END hideEditor:exist -->>{value}</div>\n<textarea class="\\{classNames.SimpleWysiwygSource\\}" data-selector="simple-wysiwyg-source" <!-- BEGIN showSource:empty --> style="display:none;"<!-- END showSource:empty -->{attr} data-bind="formatedValue" disabled></textarea>';
var btnHtml = '<div class="\\{classNames.SimpleWysiwygToolBox\\}" data-selector="simple-wysiwyg-toolbox">\n    <!-- BEGIN selectOptions.0:exist -->\n    <div class="\\{classNames.SimpleWysiwygSelectWrap\\}">\n        <select class="\\{classNames.SimpleWysiwygSelect\\}"<!-- BEGIN selectName:exist --> name="{selectName}"<!-- END selectName:exist --> data-action-change="changeOption" data-bind="selectedOption">\n        <!-- BEGIN selectOptions:loop -->\n        <option value="{value}" data-tag_extend>{label}</option>\n        <!-- END selectOptions:loop -->\n        </select>\n    </div>\n    <!-- END selectOptions.0:exist -->\n\n    <div class="\\{classNames.SimpleWysiwygBtnGroupWrap\\}" <!-- BEGIN hideBtns:exist --> style="display:none;"<!-- END hideBtns:exist -->>\n        <div class="\\{classNames.SimpleWysiwygBtnGroup\\}"><!-- BEGIN allowPreview:exist --><button class="\\{classNames.SimpleWysiwygBtn\\}<!-- BEGIN showSource:exist --> \\{classNames.SimpleWysiwygBtnActive\\}<!-- END showSource:exist -->" data-action-click="toggleSource" type="button">\\{message.sourceBtn\\}</button><!-- END allowPreview:exist --><button class="\\{classNames.SimpleWysiwygBtn\\}" data-action-click="redo"<!-- BEGIN canRedo:empty --> disabled<!-- END canRedo:empty --> type="button">\\{message.redoBtn\\}</button><button class="\\{classNames.SimpleWysiwygBtn\\}" data-action-click="undo"<!-- BEGIN canUndo:empty --> disabled<!-- END canUndo:empty --> type="button">\\{message.undoBtn\\}</button></div>\n        \n        <div class="\\{classNames.SimpleWysiwygBtnGroup\\}" data-selector="btn-group">\n        <!-- BEGIN btnOptions:loop --><button class="\\\\{classNames.SimpleWysiwygBtn\\\\}<!-- BEGIN selfClassName:exist --> {selfClassName}<!-- END selfClassName:exist --><!-- BEGIN selected:exist --> \\\\{classNames.SimpleWysiwygBtnActive\\\\}<!-- END selected:exist -->" data-tag="{tag}" data-class="{className}"<!-- BEGIN tag:exist --><!-- BEGIN selected:empty --> data-action-click="insertTag({tag},{className})"<!-- END selected:empty --><!-- BEGIN selected:exist --> data-action-click="unwrapTag({tag},{className})"<!-- END selected:exist --><!-- END tag:exist --><!-- BEGIN tag:empty --> data-action-click="onClick({i})"<!-- END tag:empty --><!-- \\BEGIN showSource:exist --> disabled<!-- \\END showSource:exist --> type="button">{label}</button><!-- END btnOptions:loop -->\n        </div>\n    </div>\n</div>';


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
    SimpleWysiwygSelectWrap: 'simple-wysiwyg-select-wrap',
    SimpleWysiwygToolBox: 'simple-wysiwyg-toolbox'
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
  maxHeight: 100,
  minHeight: 100,
  selectOptions: [],
  btnOptions: [],
  selectName: '',
  useLink: true,
  allowPreview: false,
  btnPosition: 'top'
};

var SimpleWysiwyg = function (_aTemplate) {
  _inherits(SimpleWysiwyg, _aTemplate);

  function SimpleWysiwyg(ele, settings) {
    _classCallCheck(this, SimpleWysiwyg);

    var _this = _possibleConstructorReturn(this, (SimpleWysiwyg.__proto__ || Object.getPrototypeOf(SimpleWysiwyg)).call(this));

    _this.data = (0, _deepExtend2.default)({}, defaults, settings);
    _this.data.showSource = false;
    _this.data.hideEditor = false;
    _this.id = _this._getUniqId();
    var template = '';
    if (_this.data.btnPosition === 'bottom') {
      template = '' + editorHtml + btnHtml;
    } else {
      template = '' + btnHtml + editorHtml;
    }
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
    _this.stack = [];
    _this.stackPosition = 0;
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
      util.replaceSelectionWithHtml(html);
      var editor = this._getElementByQuery('[data-selector="simple-wysiwyg"]');
      this.data.value = editor.innerHTML;
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
      var _this2 = this;

      var data = this.data;
      var mode = data.mode;
      var link = '';

      if (tag === 'a') {
        link = ' href="' + prompt(data.message.addLinkTitle, 'http://') + '"';
      }

      var selection = util.getSelection();
      if (!selection) {
        alert(data.message.noRangeSelected);
        return;
      }
      var classAttr = '';
      if (className) {
        classAttr = ' class="' + className + '"';
      }
      var insertHtml = '<' + tag + link + classAttr + '>' + selection + '</' + tag + '>';
      if (this.data.mode === 'markdown') {
        und.convert(insertHtml, function (err, markdown) {
          _this2.insertHtml(markdown.replace(/\r\n|\r|\n/g, '<br/>'));
        });
      } else {
        this.insertHtml(insertHtml.replace(/\r\n|\r|\n/g, '<br/>'));
      }
      this.updateToolBox();
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
    key: 'beforeUpdated',
    value: function beforeUpdated() {
      this.data.canUndo = this.canUndo();
      this.data.canRedo = this.canRedo();
      this.data.formatedValue = this.format(this.data.value);
    }
  }, {
    key: 'onUpdated',
    value: function onUpdated() {
      var textarea = this._getElementByQuery('[data-selector="simple-wysiwyg-source"]');
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
      var editor = this._getElementByQuery('[data-selector="simple-wysiwyg"]');
      if (!editor) {
        return;
      }
      this.saveSelection();
      this.data.value = editor.innerHTML;
      if (this.stopStack) {
        this.stopStack = false;
      } else {
        if ('' + this.stack[this.stackPosition - 1] !== '' + this.data.value) {
          this.stack = this.stack.slice(0, this.stackPosition + 1);
          this.stack.push(this.data.value);
          this.stackPosition++;
          if (this.selector) {
            this.selector.value = this.format(this.data.value);
          }
        }
      }
    }
  }, {
    key: 'redo',
    value: function redo() {
      if (!this.canRedo()) {
        return;
      }
      this.stackPosition++;
      this.data.value = this.stack[this.stackPosition];
      this.stopStack = true;
      this.update();
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
      this.data.value = this.stack[this.stackPosition];
      this.stopStack = true;
      this.update();
    }
  }, {
    key: 'canUndo',
    value: function canUndo() {
      if (this.stackPosition > 0) {
        return true;
      }
      return false;
    }
  }, {
    key: 'onInput',
    value: function onInput() {
      this.update('html', '[data-selector="simple-wysiwyg-source"]');
    }
  }, {
    key: 'onDirectInput',
    value: function onDirectInput() {
      var textarea = this._getElementByQuery('[data-selector="simple-wysiwyg-source"]');
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
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
    key: 'onKeyDown',
    value: function onKeyDown() {
      var e = this.e;
      if (e.keyCode !== 13) {
        this.onPutCaret();
        return;
      }
      var editor = this._getElementByQuery('[data-selector="simple-wysiwyg"]');
      var pos = util.getCaretPos(editor);
      // on purpose
      this.insertHtml('<br> ');
      editor.innerHTML = editor.innerHTML.replace(/<br> <\/(.*?)>/g, '</$1><br> ');
      this.data.value = editor.innerHTML;
      editor.focus();
      util.setCaretPos(editor, pos + 1);
      this.updateToolBox();
      e.preventDefault();
    }
  }, {
    key: 'onPutCaret',
    value: function onPutCaret() {
      var _this3 = this;

      setTimeout(function () {
        var target = _this3.getSelectionNode();
        var tags = [];
        var editor = _this3._getElementByQuery('[data-selector="simple-wysiwyg"]');
        if (target && target !== editor) {
          tags.push({ tagName: target.tagName.toLowerCase(), className: target.getAttribute('class') || '' });
          var parent = target.parentElement;
          while (parent !== editor) {
            tags.push({
              tagName: parent.tagName.toLowerCase(),
              className: parent.getAttribute('class') || ''
            });
            parent = parent.parentElement;
          }
        }
        _this3.updateToolBox(tags);
      }, 1);
    }
  }, {
    key: 'updateToolBox',
    value: function updateToolBox() {
      var tags = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      var btnOptions = this.data.btnOptions;
      btnOptions.forEach(function (btn) {
        btn.selected = false;
        tags.forEach(function (tag) {
          if (btn.tag === tag.tagName && btn.className === tag.className) {
            btn.selected = true;
          }
        });
      });
      this.saveSelection();
      this.update('html', '[data-selector="simple-wysiwyg-toolbox"]');
    }
  }, {
    key: 'getSelectionNode',
    value: function getSelectionNode() {
      var node = document.getSelection().anchorNode;
      return node.nodeType == 3 ? node.parentNode : node;
    }
  }, {
    key: 'unwrapTag',
    value: function unwrapTag(tag, className) {
      var editor = this._getElementByQuery('[data-selector="simple-wysiwyg"]');
      var pos = util.getCaretPos(editor);
      var node = this.getSelectionNode();
      while (true) {
        var nodeClassName = node.getAttribute('class') || '';
        if (node.tagName.toLowerCase() === tag && nodeClassName === className) {
          util.unwrapTag(node);
          break;
        }
        node = node.parentElement;
      }
      this.data.value = editor.innerHTML;
      editor.focus();
      util.setCaretPos(editor, pos);
      this.onPutCaret();
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
    key: 'format',
    value: function format(txt) {
      var replaced = txt.replace(/<p[^<]*?>(([\n\r\t]|.)*?)<\/p>/g, '$1\n').replace(/<br>(\s*)/g, '\n').replace(/<br>/g, '\n').replace(/&nbsp;/g, ' ');
      if (replaced.slice(-1) === '\n') {
        replaced = replaced.slice(0, -1);
      }
      return replaced;
    }
  }, {
    key: 'toMarkdown',
    value: function toMarkdown() {
      var _this4 = this;

      this.data.mode = 'markdown';
      und.convert(this.data.value, function (err, markdown) {
        _this4.data.value = markdown;
        _this4.data.value = _this4.data.value.replace(/\n/g, '<br>');
        _this4.update();
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
        this.data.selectedOption = item.value;
        item.onSelect.apply(this);
      }
    }
  }]);

  return SimpleWysiwyg;
}(_aTemplate3.default);

exports.default = SimpleWysiwyg;
module.exports = exports['default'];