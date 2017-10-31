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

var editorHtml = '<div class="\\{classNames.SimpleWysiwyg\\}" data-action-mouseup="onPutCaret" data-action-keydown="onKeyDown" data-selector="simple-wysiwyg" contenteditable data-action-input="onInput" data-action-paste="onPaste" style="<!-- BEGIN showSource:exist -->display:none;<!-- END showSource:exist --><!-- BEGIN hideEditor:exist -->display:none;"<!-- END hideEditor:exist --><!-- BEGIN minHeight:exist -->min-height: {minHeight}px;<!-- END minHeight:exist --><!-- BEGIN maxHeight:exist -->max-height:{maxHeight}px;<!-- END maxHeight:exist -->">{value}</div>\n<textarea class="\\{classNames.SimpleWysiwygSource\\}" data-selector="simple-wysiwyg-source" style="<!-- BEGIN showSource:empty -->display:none;<!-- END showSource:empty --><!-- BEGIN sourceHeight:exist -->height:{sourceHeight}px;<!-- END sourceHeight:exist -->"{attr} data-bind="formatedValue"></textarea>';
var btnHtml = '<div class="\\{classNames.SimpleWysiwygToolBox\\}" data-selector="simple-wysiwyg-toolbox">\n    <!-- BEGIN selectOptions.0:exist -->\n    <div class="\\{classNames.SimpleWysiwygSelectWrap\\}">\n        <select class="\\{classNames.SimpleWysiwygSelect\\}"<!-- BEGIN selectName:exist --> name="{selectName}"<!-- END selectName:exist --> data-action-change="changeOption" data-bind="selectedOption">\n        <!-- BEGIN selectOptions:loop -->\n        <option value="{value}">{label}</option>\n        <!-- END selectOptions:loop -->\n        </select>\n        <!-- BEGIN extendLabel:exist -->\n        <label>{extendLabel}</label>\n        <input type="text" name="{selectName}[insertExtend]" class="\\{classNames.SimpleWysiwygExtendInput\\}" data-bind="extendValue"/>\n        <!-- END extendLabel:exist -->\n    </div>\n    <!-- END selectOptions.0:exist -->\n\n    <div class="\\{classNames.SimpleWysiwygBtnGroupWrap\\}" <!-- BEGIN hideBtns:exist --> style="display:none;"<!-- END hideBtns:exist -->>        \n        <!-- BEGIN groups:loop -->\n        <div class="\\\\{classNames.SimpleWysiwygBtnGroup\\\\}">\n            <!-- \\BEGIN groups.{i}.items:loop -->\n\n            <!-- \\BEGIN action:touch#preview -->\n            <button class="\\\\\\{classNames.SimpleWysiwygBtn\\\\\\}<!-- \\\\BEGIN showSource:exist --> \\\\\\{classNames.SimpleWysiwygBtnActive\\\\\\}<!-- \\\\END showSource:exist -->" data-action-click="toggleSource" type="button">\\{label\\}</button>\n            <!-- \\END action:touch#preview -->\n\n            <!-- \\BEGIN action:touch#redo -->\n            <button class="\\\\\\{classNames.SimpleWysiwygBtn\\\\\\}" data-action-click="redo"<!-- \\\\BEGIN canRedo:empty --> disabled<!-- \\\\END canRedo:empty --> type="button">\\{label\\}</button>\n            <!-- \\END action:touch#redo -->\n\n            <!-- \\BEGIN action:touch#undo -->\n            <button class="\\\\\\{classNames.SimpleWysiwygBtn\\\\\\}" data-action-click="undo"<!-- \\\\BEGIN canUndo:empty --> disabled<!-- \\\\END canUndo:empty --> type="button">\\{label\\}</button>\n            <!-- \\END action:touch#undo -->\n\n            <!-- \\BEGIN action:touch#extra -->\n            <button class="\\\\\\{classNames.SimpleWysiwygBtn\\\\\\}<!-- \\BEGIN selfClassName:exist --> \\{selfClassName\\}<!-- \\END selfClassName:exist -->" data-action-click="onClick(\\{index\\})" type="button">\\{label\\}</button>\n            <!-- \\END action:touch#extra -->\n\n            <!-- \\BEGIN action:empty -->\n            <button class="\\\\\\{classNames.SimpleWysiwygBtn\\\\\\}<!-- \\BEGIN selfClassName:exist --> \\{selfClassName\\}<!-- \\END selfClassName:exist --><!-- \\BEGIN selected:exist --> \\\\\\{classNames.SimpleWysiwygBtnActive\\\\\\}<!-- \\END selected:exist -->"\n            <!-- \\BEGIN tag:exist -->\n            <!-- \\BEGIN selected:empty --> data-action-click="insertTag(\\{tag\\},\\{className\\},\\{sampleText\\})"<!-- \\END selected:empty -->\n            <!-- \\BEGIN selected:exist --> data-action-click="unwrapTag(\\{tag\\},\\{className\\},\\{sampleText\\})"<!-- \\END selected:exist -->\n            <!-- \\END tag:exist -->\n            <!-- \\BEGIN tag:empty --> data-action-click="insertTag(span,\\{className\\},\\{sampleText\\})"<!-- \\END tag:empty -->\n            <!-- \\\\BEGIN showSource:exist --> disabled<!-- \\\\END showSource:exist --> \n            type="button">\\{label\\}</button>\n            <!-- \\END action:empty -->\n            <!-- \\END groups.{i}.items:loop -->\n        </div>\n        <!-- END groups:loop -->\n    </div>\n</div>';
var tooltipHtml = '<div data-selector="simple-wysiwyg-tooltip">\n<!-- BEGIN tooltipLabel:exist -->\n<div class="\\{classNames.SimpleWysiwygTooltipWrap\\}">\n    <div class="\\{classNames.SimpleWysiwygTooltipOuter\\}">\n        <div class="\\{classNames.SimpleWysiwygTooltipInner\\}">\n            <div class="\\{classNames.SimpleWysiwygTooltip\\}">\n                <button type="button" data-action-click="closeTooltip()" class="\\{classNames.SimpleWysiwygBtn\\} \\{classNames.SimpleWysiwygBtnClose\\}">x</button>\n                <!-- BEGIN linkNew:exist -->\n                <h2 class="\\{classNames.SimpleWysiwygTooltipTitle\\}">\u30EA\u30F3\u30AF\u306E\u633F\u5165</h2>\n                <!-- END linkNew:exist -->\n                <!-- BEGIN linkNew:empty -->\n                <h2 class="\\{classNames.SimpleWysiwygTooltipTitle\\}">\u30EA\u30F3\u30AF\u306E\u7DE8\u96C6</h2>\n                <!-- END linkNew:empty -->\n                <div class="\\{classNames.SimpleWysiwygTooltipBody\\}">\n                    <table class="\\{classNames.SimpleWysiwygTooltipTable\\}">\n                        <tr>\n                            <th>\u30E9\u30D9\u30EB\u540D</th>\n                            <td><input type="text" data-bind="tooltipLabel"></td>\n                        </tr>\n                        <tr>\n                            <th>URL</th>\n                            <td><input type="text" data-bind="tooltipUrl"></td>\n                        </tr>\n                        <tr>\n                            <td></td>\n                            <td>\n                                <!-- BEGIN linkNew:exist -->\n                                <button type="button" data-action-click="insertAtag()" class="\\{classNames.SimpleWysiwygBtn\\}">\u633F\u5165</button> \n                                <!-- END linkNew:exist -->\n\n                                <!-- BEGIN linkNew:empty -->\n                                <button type="button" data-action-click="removeLink()" class="\\{classNames.SimpleWysiwygBtn\\}">\u30EA\u30F3\u30AF\u3092\u524A\u9664</button>\n                                <button type="button" data-action-click="updateLink()" class="\\{classNames.SimpleWysiwygBtn\\}">\u5909\u66F4</button>\n                                <!-- END linkNew:empty -->\n                            </td>\n                        </tr>\n                    </table>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n<!-- END tooltipLabel:exist -->\n</div>';


var Entities = require('html-entities').XmlEntities;
var Upndown = require('upndown');
var Showdown = require('showdown');

var entities = new Entities();
var converter = new Showdown.Converter();
var und = new Upndown({ decodeEntities: false });

var defaultbtnOptions = [{
  label: '<i class="fa fa-code"></i>',
  action: 'preview',
  group: 'action'
}, {
  label: '<i class="fa fa-rotate-left"></i>',
  action: 'undo',
  group: 'action'
}, {
  label: '<i class="fa fa-rotate-right"></i>',
  action: 'redo',
  group: 'action'
}, {
  label: '<i class="fa fa-link"></i>',
  tag: 'a',
  className: '',
  group: 'mark',
  sampleText: 'link text'
}, {
  label: '<i class="fa fa-bold"></i>',
  tag: 'strong',
  className: '',
  group: 'mark',
  sampleText: 'strong text'
}, {
  label: '<i class="fa fa-italic"></i>',
  tag: 'i',
  className: '',
  group: 'mark',
  sampleText: 'italic text'
}, {
  label: '<i class="fa fa-align-left"></i>',
  tag: 'div',
  className: 'left',
  group: 'align'
}, {
  label: '<i class="fa fa-align-center"></i>',
  tag: 'div',
  className: 'center',
  group: 'align'
}, {
  label: '<i class="fa fa-align-right"></i>',
  tag: 'div',
  className: 'right',
  group: 'align'
}];

var defaults = {
  mode: 'html',
  classNames: {
    SimpleWysiwyg: 'simple-wysiwyg',
    SimpleWysiwygSource: 'simple-wysiwyg-source',
    SimpleWysiwygBtn: 'simple-wysiwyg-btn',
    SimpleWysiwygBtnClose: 'simple-wysiwyg-btn-close',
    SimpleWysiwygBtnActive: 'simple-wysiwyg-btn-active',
    SimpleWysiwygBtnGroup: 'simple-wysiwyg-btn-group',
    SimpleWysiwygBtnGroupWrap: 'simple-wysiwyg-btn-group-wrap',
    SimpleWysiwygSelect: 'simple-wysiwyg-select',
    SimpleWysiwygSelectWrap: 'simple-wysiwyg-select-wrap',
    SimpleWysiwygToolBox: 'simple-wysiwyg-toolbox',
    SimpleWysiwygTooltip: 'simple-wysiwyg-tooltip',
    SimpleWysiwygTooltipWrap: 'simple-wysiwyg-tooltip-wrap',
    SimpleWysiwygTooltipOuter: 'simple-wysiwyg-tooltip-outer',
    SimpleWysiwygTooltipInner: 'simple-wysiwyg-tooltip-inner',
    SimpleWysiwygTooltipTable: 'simple-wysiwyg-tooltip-table',
    SimpleWysiwygTooltipTitle: 'simple-wysiwyg-tooltip-title',
    SimpleWysiwygTooltipBody: 'simple-wysiwyg-tooltip-body',
    SimpleWysiwygExtendInput: 'simple-wysiwyg-extend-input'
  },
  message: {
    addLinkTitle: 'Add Link',
    noRangeSelected: 'please select the range'
  },
  maxHeight: null,
  minHeight: null,
  escapeNotRegisteredTags: false,
  selectOptions: [],
  selectedOption: '',
  btnOptions: defaultbtnOptions,
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
    _this.data.groups = _this.makeBtnGroups();
    _this.id = _this._getUniqId();
    var template = '';
    if (_this.data.btnPosition === 'bottom') {
      template = '' + editorHtml + btnHtml;
    } else {
      template = '' + btnHtml + editorHtml;
    }
    template += '' + tooltipHtml;
    _this.addTemplate(_this.id, template);
    var selector = typeof ele === 'string' ? document.querySelector(ele) : ele;
    _this.convert = {
      format: _this.format,
      insertExtend: _this.insertExtend
    };
    if (selector.value) {
      _this.data.value = selector.value.replace(/\r\n|\r|\n/g, '<br/>');
      if (_this.data.escapeNotRegisteredTags) {
        _this.escapeNotRegisteredTags();
      }
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
    _this.data.tooltipLabel = '';
    _this.data.tooltipUrl = '';
    _this.data.tooltipClassName = '';
    _this.data.linkNew = true;
    _this.stack = [];
    _this.stackPosition = 0;
    var html = '<div data-id=\'' + _this.id + '\'></div>';
    selector.style.display = 'none';
    util.before(selector, html);
    util.removeElement(selector);
    _this.update();
    _this.selector = _this._getElementByQuery('[data-selector="simple-wysiwyg-source"]');
    var item = _this.data.selectOptions.find(function (option) {
      return option.value === _this.data.selectedOption;
    });
    if (item) {
      _this.data.extendLabel = item.extendLabel;
      if (item.onSelect) {
        item.onSelect(_this);
      }
    }
    if (_this.data.afterInit) {
      _this.data.afterInit(_this);
    }
    return _this;
  }

  _createClass(SimpleWysiwyg, [{
    key: 'makeBtnGroups',
    value: function makeBtnGroups() {
      var btns = this.data.btnOptions;
      var groups = [];
      btns.forEach(function (btn, index) {
        btn.index = index;
        var flag = true;
        if (!btn.group) {
          btn.group = 'none';
        }
        groups.forEach(function (group) {
          if (group.name === btn.group) {
            group.items.push(btn);
            flag = false;
          }
        });
        if (flag) {
          var group = {
            name: btn.group,
            items: [btn]
          };
          groups.push(group);
        }
      });
      return groups;
    }
  }, {
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
    key: '_escapeTagExceptRegisteredTags',
    value: function _escapeTagExceptRegisteredTags(value) {
      var _this2 = this;

      var btns = this.data.btnOptions;
      return value.replace(/<([a-zA-Z0-9._-]+)\s?(.*?)>(([\n\r\t]|.)*?)<\/\1>/g, function (component, tag, attr, content) {
        var className = (attr.match(/class=["|'](.*?)["|']/i) || [null, ''])[1];
        var flag = false;
        if (attr) {
          attr = ' ' + attr;
        }
        btns.forEach(function (btn) {
          if (btn.className === className && btn.tag === tag) {
            flag = true;
          }
        });
        if (flag) {
          return component;
        }
        if (/<([a-zA-Z0-9._-]+)\s?(.*?)>(([\n\r\t]|.)*?)<\/\1>/.exec(content)) {
          content = _this2._escapeTagExceptRegisteredTags(content);
        }
        return '&lt;' + tag + attr + '&gt;' + content + '&lt;/' + tag + '&gt;';
      });
    }
  }, {
    key: 'escapeNotRegisteredTags',
    value: function escapeNotRegisteredTags() {
      this.data.value = this._escapeTagExceptRegisteredTags(this.data.value);
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
      var selection = util.getSelection();
      var insertText = ('' + selection).replace(/<[^>]*>/g, '');
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
      return selector === document.activeElement;
    }
  }, {
    key: 'insertTag',
    value: function insertTag(tag, className, sampleText) {
      var _this3 = this;

      var data = this.data;
      var link = '';
      var selection = util.getSelection();
      if (!selection) {
        selection = sampleText;
      }
      if (tag === 'a') {
        this.saveSelection();
        this.showLinkDialog('' + selection, className);
        return;
      }

      var classAttr = '';
      if (className) {
        classAttr = ' class="' + className + '"';
      }
      var insertHtml = '<a' + classAttr + '>' + selection + '</a>';
      if (this.data.mode === 'markdown') {
        und.convert(insertHtml, function (err, markdown) {
          _this3.insertHtml(markdown.replace(/\r\n|\r|\n/g, '<br/>'));
        });
      } else {
        this.insertHtml(insertHtml.replace(/\r\n|\r|\n/g, '<br/>'));
      }
      this.updateToolBox();
    }
  }, {
    key: 'showLinkDialog',
    value: function showLinkDialog(text, className) {
      this.data.tooltipLabel = text;
      this.data.linkNew = true;
      this.data.tooltipClassName = className;
      this.update('html', '[data-selector="simple-wysiwyg-tooltip"]');
    }
  }, {
    key: 'insertAtag',
    value: function insertAtag() {
      var _this4 = this;

      this.restoreSelection();
      var label = this.data.tooltipLabel;
      var link = this.data.tooltipUrl;
      var className = this.data.tooltipClassName;
      var classAttr = '';
      if (className) {
        classAttr = ' class="' + className + '"';
      }
      var insertHtml = '<a href="' + link + '"' + classAttr + '>' + this.data.tooltipLabel + '</a>';
      if (this.data.mode === 'markdown') {
        und.convert(insertHtml, function (err, markdown) {
          _this4.insertHtml(markdown.replace(/\r\n|\r|\n/g, '<br/>'));
        });
      } else {
        this.insertHtml(insertHtml.replace(/\r\n|\r|\n/g, '<br/>'));
      }
      this.updateToolBox();
      this.closeTooltip();
    }
  }, {
    key: 'onClick',
    value: function onClick(i) {
      var number = parseInt(i, 10);
      if (this.data.btnOptions[number].onClick) {
        this.data.btnOptions[number].onClick(this);
      }
    }
  }, {
    key: 'beforeUpdated',
    value: function beforeUpdated() {
      var data = this.data;
      var editor = this._getElementByQuery('[data-selector="simple-wysiwyg"]');
      data.canUndo = this.canUndo();
      data.canRedo = this.canRedo();
      data.formatedValue = this.format(data.value);
      if (!data.showSource && editor && editor.offsetHeight) {
        data.sourceHeight = editor.offsetHeight;
      }
    }
  }, {
    key: 'onUpdated',
    value: function onUpdated() {
      var editor = this._getElementByQuery('[data-selector="simple-wysiwyg"]');
      if (!editor) {
        return;
      }
      this.saveSelection();
      this.data.value = editor.innerHTML;
      if (this.stopStack) {
        this.stopStack = false;
      } else if ('' + this.stack[this.stackPosition - 1] !== '' + this.data.value) {
        this.stack = this.stack.slice(0, this.stackPosition + 1);
        this.stack.push(this.data.value);
        this.stackPosition += 1;
        if (this.selector) {
          this.selector.value = this.format(this.data.value);
        }
      }
    }
  }, {
    key: 'redo',
    value: function redo() {
      if (!this.canRedo()) {
        return;
      }
      this.stackPosition += 1;
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
      this.stackPosition -= 1;
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
      var editor = this._getElementByQuery('[data-selector="simple-wysiwyg"]');
      var textarea = this._getElementByQuery('[data-selector="simple-wysiwyg-source"]');
      this.data.value = editor.innerHTML;
      this.data.formatedValue = this.format(this.data.value);
      textarea.value = this.data.formatedValue;
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
      if (this._isFocused() && insertText) {
        document.execCommand('insertText', false, insertText.replace(/<div>/g, '').replace(/<\div>/g, '<br>'));
      }
    }
  }, {
    key: 'onKeyDown',
    value: function onKeyDown() {
      var editor = this._getElementByQuery('[data-selector="simple-wysiwyg"]');
      var e = this.e;

      if (e.ctrlKey || e.metaKey) {
        if (e.which === 90 || e.keyCode === 90) {
          e.preventDefault();
          if (e.shiftKey) {
            this.redo();
          } else {
            this.undo();
          }
        }
        return;
      }

      if (e.keyCode !== 13) {
        this.data.value = editor.innerHTML;
        this.onPutCaret();
        return;
      }

      var pos = util.getCaretPos(editor);
      // on purpose
      this.insertHtml('<br> ');
      editor.innerHTML = editor.innerHTML.replace(/<br> <\/(.*?)>/g, '</$1><br> ');
      this.data.value = editor.innerHTML;
      editor.scrollTop = editor.scrollHeight;
      editor.focus();
      util.setCaretPos(editor, pos + 1);
      e.preventDefault();
    }
  }, {
    key: 'onPutCaret',
    value: function onPutCaret() {
      var _this5 = this;

      setTimeout(function () {
        var target = _this5.getSelectionNode();
        var tags = [];
        var editor = _this5._getElementByQuery('[data-selector="simple-wysiwyg"]');
        if (target && target !== editor) {
          tags.push({ tagName: target.tagName.toLowerCase(), className: target.getAttribute('class') || '' });
          var parent = target.parentElement;
          while (parent !== editor) {
            var tagName = parent.tagName.toLowerCase();
            tags.push({
              tagName: tagName,
              className: parent.getAttribute('class') || ''
            });
            parent = parent.parentElement;
          }
        }
        _this5.updateToolBox(tags);
      }, 1);
    }
  }, {
    key: 'updateToolBox',
    value: function updateToolBox() {
      var tags = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      var groups = this.data.groups;
      groups.forEach(function (group) {
        group.items.forEach(function (btn) {
          btn.selected = false;
          tags.forEach(function (tag) {
            if (btn.tag === tag.tagName && btn.className === tag.className) {
              btn.selected = true;
            }
          });
        });
      });
      this.saveSelection();
      this.update('html', '[data-selector="simple-wysiwyg-toolbox"]');
    }
  }, {
    key: 'updateTooltip',
    value: function updateTooltip(item) {
      if (item === null) {
        this.data.linkNew = true;
        this.data.tooltipLabel = '';
        this.data.tooltipUrl = '';
      } else {
        this.data.linkNew = false;
        this.data.tooltipLabel = item.innerHTML;
        this.data.tooltipUrl = item.getAttribute('href');
        this.savedLinkNode = item;
      }
      this.update('html', '[data-selector="simple-wysiwyg-tooltip"]');
    }
  }, {
    key: 'closeTooltip',
    value: function closeTooltip() {
      this.data.tooltipLabel = '';
      this.data.tooltipUrl = '';
      this.data.tooltipClassName = '';
      this.update('html', '[data-selector="simple-wysiwyg-tooltip"]');
    }
  }, {
    key: 'updateLink',
    value: function updateLink() {
      var editor = this._getElementByQuery('[data-selector="simple-wysiwyg"]');
      var pos = util.getCaretPos(editor);
      var label = this.data.tooltipLabel;
      var url = this.data.tooltipUrl;
      var node = this.savedLinkNode;
      node.setAttribute('href', url);
      node.innerHTML = label;
      this.data.value = editor.innerHTML;
      editor.focus();
      util.setCaretPos(editor, pos);
      this.onPutCaret();
      this.closeTooltip();
    }
  }, {
    key: 'removeLink',
    value: function removeLink() {
      var editor = this._getElementByQuery('[data-selector="simple-wysiwyg"]');
      var pos = util.getCaretPos(editor);
      var node = this.savedLinkNode;
      util.unwrapTag(node);
      editor.focus();
      util.setCaretPos(editor, pos);
      this.onPutCaret();
      this.closeTooltip();
    }
  }, {
    key: 'getSelectionNode',
    value: function getSelectionNode() {
      var node = document.getSelection().anchorNode;
      return node.nodeType === 3 ? node.parentNode : node;
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
          if (tag === 'a') {
            this.updateTooltip(node);
          } else {
            util.unwrapTag(node);
          }
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
    key: 'insertExtend',
    value: function insertExtend(txt) {
      return txt.replace(/text_tag/g, 'text_extend_tag');
    }
  }, {
    key: 'format',
    value: function format(txt) {
      if (!txt) {
        return '';
      }
      var replaced = txt.replace(/<p[^<]*?>(([\n\r\t]|.)*?)<\/p>/g, '$1\n').replace(/<br>(\s*)/g, '\n').replace(/<br>/g, '\n').replace(/&nbsp;/g, ' ');
      if (replaced.slice(-1) === '\n') {
        replaced = replaced.slice(0, -1);
      }
      return entities.decode(replaced);
    }
  }, {
    key: 'toMarkdown',
    value: function toMarkdown() {
      var _this6 = this;

      this.data.mode = 'markdown';
      und.convert(this.data.value, function (err, markdown) {
        _this6.data.value = markdown;
        _this6.data.value = _this6.data.value.replace(/\n/g, '<br>');
        _this6.update();
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
      var item = this.data.selectOptions.find(function (option) {
        return option.value === value;
      });
      if (item) {
        this.data.extendLabel = item.extendLabel;
        this.update('html', '[data-selector="simple-wysiwyg-toolbox"]');
        if (item.onSelect) {
          this.data.selectedOption = item.value;
          item.onSelect(this);
        }
      }
    }
  }]);

  return SimpleWysiwyg;
}(_aTemplate3.default);

exports.default = SimpleWysiwyg;
module.exports = exports['default'];