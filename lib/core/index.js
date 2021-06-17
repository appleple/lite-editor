'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _aTemplate2 = require('a-template');

var _aTemplate3 = _interopRequireDefault(_aTemplate2);

var _deepExtend = require('deep-extend');

var _deepExtend2 = _interopRequireDefault(_deepExtend);

var _upndown = require('upndown');

var _upndown2 = _interopRequireDefault(_upndown);

require('custom-event-polyfill');

require('ie-array-find-polyfill');

var _util = require('../lib/util');

var util = _interopRequireWildcard(_util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var editorHtml = '<div class="\\{classNames.LiteEditor\\}" data-action-mouseup="onPutCaret" data-action-keydown="onKeyDown" data-action-input="onInput" data-selector="lite-editor" contenteditable data-action-paste="onPaste" style="<!-- BEGIN showSource:exist -->display:none;<!-- END showSource:exist --><!-- BEGIN hideEditor:exist -->display:none;"<!-- END hideEditor:exist --><!-- BEGIN minHeight:exist -->min-height: {minHeight}px;<!-- END minHeight:exist --><!-- BEGIN maxHeight:exist -->max-height:{maxHeight}px;<!-- END maxHeight:exist -->">{value}</div>\n<textarea class="\\{classNames.LiteEditorSource\\}" data-selector="lite-editor-source" style="<!-- BEGIN showSource:empty -->display:none;<!-- END showSource:empty --><!-- BEGIN minHeight:exist -->min-height: {minHeight}px;<!-- END minHeight:exist --><!-- BEGIN maxHeight:exist -->max-height:{maxHeight}px;<!-- END maxHeight:exist -->" {attr} data-bind-oneway="formatedValue" data-action-input="onDirectInput"></textarea>';
var btnHtml = '<div class="\\{classNames.LiteEditorToolBox\\}" data-selector="lite-editor-toolbox">\n\n\t<!-- BEGIN source:exist -->\n\t<div class="\\{classNames.LiteEditorBtnGroupWrapRight\\}">\n\t\t<div class="\\{classNames.LiteEditorBtnGroup\\}">\n\t\t\t<button class="\\{classNames.LiteEditorBtn\\}<!-- BEGIN showSource:empty --> \\{classNames.LiteEditorBtnActive\\}<!-- END showSource:empty -->"\n\t\t\t data-action-click="toggleSource" type="button" <!-- BEGIN showSource:empty --> disabled\n\t\t\t\t<!-- END showSource:empty -->\n\t\t\t\t<!-- BEGIN disableEditorMode:exist -->disabled\n\t\t\t\t<!-- END disableEditorMode:exist -->>\n\t\t\t\t<i class="\\{classNames.LiteEditorFontAbc\\}"></i>\n\t\t\t</button>\n\t\t\t<button class="\\{classNames.LiteEditorBtn\\}<!-- BEGIN showSource:exist --> \\{classNames.LiteEditorBtnActive\\}<!-- END showSource:exist -->"\n\t\t\t data-action-click="toggleSource" type="button" <!-- BEGIN showSource:exist --> disabled\n\t\t\t\t<!-- END showSource:exist -->>\n\t\t\t\t<i class="\\{classNames.LiteEditorFontSource\\}"></i>\n\t\t\t</button>\n\t\t</div>\n\t</div>\n\t<!-- END source:exist -->\n\n\t<!-- BEGIN selectOptions.0:exist -->\n\t<div class="\\{classNames.LiteEditorSelectWrap\\}">\n\t\t<select class="\\{classNames.LiteEditorSelect\\}" <!-- BEGIN selectName:exist --> name="{selectName}"\n\t\t\t<!-- END selectName:exist -->data-action-change="changeOption" data-bind="selectedOption">\n\t\t\t<!-- BEGIN selectOptions:loop -->\n\t\t\t<option value="{value}">{label}</option>\n\t\t\t<!-- END selectOptions:loop -->\n\t\t</select>\n\t\t<!-- BEGIN extendLabel:exist -->\n\t\t<label>{extendLabel}</label>\n\t\t<input type="text" name="{selectName}[insertExtend]" class="\\{classNames.LiteEditorExtendInput\\}" data-bind="extendValue"\n\t\t/>\n\t\t<!-- END extendLabel:exist -->\n\t</div>\n\t<!-- END selectOptions.0:exist -->\n\n\t<div class="\\{classNames.LiteEditorBtnGroupWrap\\}" <!-- BEGIN hideBtns:exist --> style="display:none;"\n\t\t<!-- END hideBtns:exist -->>\n\n\t\t<!-- BEGIN groups:loop -->\n\t\t<div class="\\\\{classNames.LiteEditorBtnGroup\\\\}" data-selector="btn-group">\n\t\t\t<!-- \\BEGIN groups.{i}.items:loop -->\n\n\t\t\t<!-- \\BEGIN action:touch#redo -->\n\t\t\t<button data-index="\\{index\\}" class="\\\\\\{classNames.LiteEditorBtn\\\\\\}" data-action-click="redo" <!-- \\\\BEGIN canRedo:empty\n\t\t\t --> disabled <!-- \\\\END canRedo:empty -->type="button">\\{label\\}</button>\n\t\t\t<!-- \\END action:touch#redo -->\n\n\t\t\t<!-- \\BEGIN action:touch#undo -->\n\t\t\t<button data-index="\\{index\\}" class="\\\\\\{classNames.LiteEditorBtn\\\\\\}" data-action-click="undo" <!-- \\\\BEGIN canUndo:empty\n\t\t\t --> disabled <!-- \\\\END canUndo:empty -->type="button">\\{label\\}</button>\n\t\t\t<!-- \\END action:touch#undo -->\n\n\t\t\t<!-- \\BEGIN action:touch#extra -->\n\t\t\t<button data-index="\\{index\\}" class="\\\\\\{classNames.LiteEditorBtn\\\\\\}<!-- \\BEGIN selfClassName:exist --> \\{selfClassName\\}<!-- \\END selfClassName:exist -->"\n\t\t\t data-action-click="onClick(\\{index\\})" type="button">\\{label\\}</button>\n\t\t\t<!-- \\END action:touch#extra -->\n\n\t\t\t<!-- \\BEGIN action:empty -->\n\t\t\t<button data-index="\\{index\\}" class="\\\\\\{classNames.LiteEditorBtn\\\\\\}<!-- \\BEGIN selfClassName:exist --> \\{selfClassName\\}<!-- \\END selfClassName:exist --><!-- \\BEGIN selected:exist --> \\\\\\{classNames.LiteEditorBtnActive\\\\\\}<!-- \\END selected:exist -->"\n\t\t\t <!-- \\BEGIN tag:exist -->\n\t\t\t\t<!-- \\BEGIN selected:empty -->data-action-click="insertTag(\\{tag\\},\\{className\\},\\{sampleText\\})"\n\t\t\t\t<!-- \\END selected:empty -->\n\t\t\t\t<!-- \\BEGIN selected:exist -->data-action-click="unwrapTag(\\{tag\\},\\{className\\},\\{sampleText\\})"\n\t\t\t\t<!-- \\END selected:exist -->\n\t\t\t\t<!-- \\END tag:exist -->\n\t\t\t\t<!-- \\BEGIN tag:empty -->data-action-click="insertTag(span,\\{className\\},\\{sampleText\\})"\n\t\t\t\t<!-- \\END tag:empty -->\n\t\t\t\ttype="button">\\{label\\}</button>\n\t\t\t<!-- \\END action:empty -->\n\t\t\t<!-- \\END groups.{i}.items:loop -->\n\t\t</div>\n\t\t<!-- END groups:loop -->\n\t</div>\n</div>';
var tooltipHtml = '<div data-selector="lite-editor-tooltip">\n\t<!-- BEGIN tooltipLabel:exist -->\n\t<div class="\\{classNames.LiteEditorTooltipWrap\\}">\n\t\t<div class="\\{classNames.LiteEditorTooltipOuter\\}">\n\t\t\t<div class="\\{classNames.LiteEditorTooltipInner\\}">\n\t\t\t\t<div class="\\{classNames.LiteEditorTooltip\\}">\n\t\t\t\t\t<span class="\\{classNames.LiteEditorBtnCloseWrap\\}">\n\t\t\t\t\t\t<span class="\\{classNames.LiteEditorBtnCloseLabel\\}">\\{message.closeLabel\\}</span>\n\t\t\t\t\t\t<button type="button" data-action-click="closeTooltip()" class="\\{classNames.LiteEditorBtn\\} \\{classNames.LiteEditorBtnClose\\}">\n\t\t\t\t\t\t\t<i class="\\{classNames.LiteEditorFontClose\\}"></i>\n\t\t\t\t\t\t</button>\n\t\t\t\t\t</span>\n\t\t\t\t\t<!-- BEGIN linkNew:exist -->\n\t\t\t\t\t<h2 class="\\{classNames.LiteEditorTooltipTitle\\}">\n\t\t\t\t\t\t<i class="\\{classNames.LiteEditorFontLink\\}"></i>\\{message.addLinkTitle\\}</h2>\n\t\t\t\t\t<!-- END linkNew:exist -->\n\t\t\t\t\t<!-- BEGIN linkNew:empty -->\n\t\t\t\t\t<h2 class="\\{classNames.LiteEditorTooltipTitle\\}">\n\t\t\t\t\t\t<i class="\\{classNames.LiteEditorFontLink\\}"></i>\\{message.updateLinkTitle\\}</h2>\n\t\t\t\t\t<!-- END linkNew:empty -->\n\t\t\t\t\t<div class="\\{classNames.LiteEditorTooltipBody\\}">\n\t\t\t\t\t\t<table class="\\{classNames.LiteEditorTooltipTable\\}">\n\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t<th>\\{message.linkLabel\\}</th>\n\t\t\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t\t\t<input type="text" data-bind="tooltipLabel" class="\\{classNames.LiteEditorTooltipInput\\}" data-action-keydown="preventSubmit()">\n\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t<th>\\{message.linkUrl\\}</th>\n\t\t\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t\t\t<input type="text" data-bind="tooltipUrl" class="\\{classNames.LiteEditorTooltipInput\\}" data-action-keydown="preventSubmit()">\n\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t<th>\\{message.targetBlank\\}</th>\n\t\t\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t\t\t<label>\n\t\t\t\t\t\t\t\t\t<input type="checkbox" data-bind="targetBlank" value="true" data-action-change="updateTargetBlank">\n\t\t\t\t\t\t\t\t\t\\{message.targetBlankLabel\\}\n\t\t\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t</tr>\n\n\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t<td></td>\n\t\t\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t\t\t<!-- BEGIN linkNew:exist -->\n\t\t\t\t\t\t\t\t\t<button type="button" data-action-click="insertAtag()" class="\\{classNames.LiteEditorBtn\\}">\n\t\t\t\t\t\t\t\t\t\t<i class="\\{classNames.LiteEditorFontLink\\}"></i>\n\t\t\t\t\t\t\t\t\t\t\\{message.addLink\\}\n\t\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t\t<!-- END linkNew:exist -->\n\n\t\t\t\t\t\t\t\t\t<!-- BEGIN linkNew:empty -->\n\t\t\t\t\t\t\t\t\t<button type="button" data-action-click="updateLink()" class="\\{classNames.LiteEditorBtn\\}">\n\t\t\t\t\t\t\t\t\t\t<i class="\\{classNames.LiteEditorFontUpdate\\}"></i>\n\t\t\t\t\t\t\t\t\t\t\\{message.updateLink\\}\n\t\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t\t<button type="button" data-action-click="removeLink()" class="\\{classNames.LiteEditorBtn\\}">\n\t\t\t\t\t\t\t\t\t\t<i class="\\{classNames.LiteEditorFontRemove\\}"></i>\n\t\t\t\t\t\t\t\t\t\t\\{message.removeLink\\}\n\t\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t\t<!-- END linkNew:empty -->\n\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t</table>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t<!-- END tooltipLabel:exist -->\n</div>\n';


var Entities = require('html-entities').XmlEntities;

var entities = new Entities();
var und = new _upndown2.default({ decodeEntities: false });

var defaultbtnOptions = [{
  label: '<i class="lite-editor-font-back"></i>',
  action: 'undo',
  group: 'action'
}, {
  label: '<i class="lite-editor-font-go"></i>',
  action: 'redo',
  group: 'action'
}, {
  label: '<i class="lite-editor-font-link"></i>',
  tag: 'a',
  className: '',
  group: 'link',
  sampleText: 'link text'
}, {
  label: '<i class="lite-editor-font-bold"></i>',
  tag: 'strong',
  className: '',
  group: 'mark',
  sampleText: ' '
}, {
  label: '<i class="lite-editor-font-italic"></i>',
  tag: 'i',
  className: '',
  group: 'mark',
  sampleText: ' '
}, {
  label: '<i class="lite-editor-font-underline"></i>',
  tag: 'u',
  className: '',
  group: 'mark',
  sampleText: ' '
}];

var defaults = {
  mode: 'html',
  classNames: {
    LiteEditor: 'lite-editor',
    LiteEditorSource: 'lite-editor-source',
    LiteEditorBtn: 'lite-editor-btn',
    LiteEditorBtnClose: 'lite-editor-btn-close',
    LiteEditorBtnActive: 'lite-editor-btn-active',
    LiteEditorBtnGroup: 'lite-editor-btn-group',
    LiteEditorBtnGroupWrap: 'lite-editor-btn-group-wrap',
    LiteEditorBtnGroupWrapRight: 'lite-editor-btn-group-wrap-right',
    LiteEditorBtnCloseWrap: 'lite-editor-btn-close-wrap',
    LiteEditorBtnCloseLabel: 'lite-editor-btn-close-label',
    LiteEditorSelect: 'lite-editor-select',
    LiteEditorSelectWrap: 'lite-editor-select-wrap',
    LiteEditorToolBox: 'lite-editor-toolbox',
    LiteEditorTooltip: 'lite-editor-tooltip',
    LiteEditorTooltipWrap: 'lite-editor-tooltip-wrap',
    LiteEditorTooltipOuter: 'lite-editor-tooltip-outer',
    LiteEditorTooltipInner: 'lite-editor-tooltip-inner',
    LiteEditorTooltipTable: 'lite-editor-tooltip-table',
    LiteEditorTooltipTitle: 'lite-editor-tooltip-title',
    LiteEditorTooltipBody: 'lite-editor-tooltip-body',
    LiteEditorTooltipInput: 'lite-editor-tooltip-input',
    LiteEditorExtendInput: 'lite-editor-extend-input',
    LiteEditorFontLink: 'lite-editor-font-link',
    LiteEditorFontRemove: 'lite-editor-font-remove',
    LiteEditorFontUpdate: 'lite-editor-font-update',
    LiteEditorFontClose: 'lite-editor-font-close',
    LiteEditorFontSource: 'lite-editor-font-source',
    LiteEditorFontAbc: 'lite-editor-font-abc'
  },
  message: {
    addLinkTitle: 'link',
    updateLinkTitle: 'link',
    addLink: 'add',
    updateLink: 'update',
    removeLink: 'remove',
    linkUrl: 'URL',
    linkLabel: 'label',
    closeLabel: 'close',
    targetBlank: 'target',
    targetBlankLabel: 'Opens the linked page in a new window or tab'
  },
  voidElements: ['area', 'base', 'basefont', 'bgsound', 'br', 'col', 'command', 'embed', 'frame', 'hr', 'image', 'img', 'input', 'isindex', 'keygen', 'link', 'menuitem', 'meta', 'nextid', 'param', 'source', 'track', 'wbr'],
  minHeight: 50,
  maxHeight: 400,
  decodeSource: false,
  sourceFirst: false,
  escapeNotRegisteredTags: false,
  preserveSpace: false,
  nl2br: true,
  source: true,
  selectOptions: [],
  selectedOption: '',
  btnOptions: defaultbtnOptions,
  btnPosition: 'top',
  relAttrForTargetBlank: 'noopener noreferrer'
};

var LiteEditor = function (_aTemplate) {
  _inherits(LiteEditor, _aTemplate);

  function LiteEditor(ele, settings) {
    _classCallCheck(this, LiteEditor);

    var _this = _possibleConstructorReturn(this, (LiteEditor.__proto__ || Object.getPrototypeOf(LiteEditor)).call(this));

    _this.id = _this._getUniqId();
    var selector = typeof ele === 'string' ? document.querySelector(ele) : ele;
    var html = '<div data-id=\'' + _this.id + '\'></div>';
    _this.data = (0, _deepExtend2.default)({}, defaults, settings);
    _this.data.showSource = _this.data.sourceFirst;
    _this.data.disableEditorMode = false;
    _this.data.hideEditor = false;
    _this.data.tooltipLabel = '';
    _this.data.tooltipUrl = '';
    _this.data.tooltipClassName = '';
    _this.data.attr = '';
    _this.data.targetBlank = 'false';
    _this.data.linkNew = true;
    if (settings && settings.btnOptions) {
      _this.data.btnOptions = settings.btnOptions;
    }
    _this.data.groups = _this.makeBtnGroups();
    _this.stack = [];
    _this.stackPosition = 0;
    var template = '';
    var attrStr = '';
    _this.convert = {
      format: _this.format,
      insertExtend: _this.insertExtend
    };

    if (_this.data.btnPosition === 'bottom') {
      template = util.removeIndentNewline('' + editorHtml + btnHtml + tooltipHtml);
    } else {
      template = util.removeIndentNewline('' + btnHtml + editorHtml + tooltipHtml);
    }

    _this.addTemplate(_this.id, template);

    if (selector.value) {
      var value = selector.value;
      if (!_this.data.sourceFirst) {
        value = _this.makeEditableHtml(value);
      } else {
        value = selector.innerHTML;
      }
      if (_this.data.escapeNotRegisteredTags) {
        value = _this.escapeNotRegisteredTags(value);
      }
      _this.data.firstValue = selector.value;
      _this.data.value = value;
    }
    if (_this.data.value) {
      _this.data.value = _this.data.value.replace(/([\\]+)/g, '$1\\\\'); // CMS-5637 バックスラッシュが消えてしまう問題に対処
    }

    if (selector.attributes) {
      [].forEach.call(selector.attributes, function (attr) {
        attrStr += ' ' + attr.nodeName + '="' + attr.nodeValue + '"';
      });
      _this.data.attr = attrStr;
    }

    if (!_this.data.selectedOption && _this.data.selectOptions && _this.data.selectOptions[0] && _this.data.selectOptions[0].value) {
      _this.data.selectedOption = _this.data.selectOptions[0].value;
    }

    util.before(selector, html);
    util.removeElement(selector);
    _this.update();
    _this.selector = _this._getElementByQuery('[data-selector="lite-editor-source"]');
    var item = _this.data.selectOptions.find(function (option) {
      return option.value === _this.data.selectedOption;
    });
    if (item) {
      _this.data.extendLabel = item.extendLabel;
      if (item.onSelect) {
        item.onSelect(_this);
      }
    }

    _this._fireEvent('init');
    return _this;
  }

  _createClass(LiteEditor, [{
    key: 'focus',
    value: function focus() {
      var showSource = this.data.showSource;

      if (showSource === true) {
        this._getElementByQuery('[data-selector="lite-editor-source"]').focus();
      } else {
        this._getElementByQuery('[data-selector="lite-editor"]').focus();
      }
    }
  }, {
    key: 'registerButton',
    value: function registerButton(btn) {
      this.data.btnOptions.push(btn);
      this.data.groups = this.makeBtnGroups();
      this.update('html', '[data-selector="lite-editor-toolbox"]');
    }
  }, {
    key: 'activateEditorMode',
    value: function activateEditorMode() {
      this.data.disableEditorMode = false;
      this.update('html', '[data-selector="lite-editor-toolbox"]');
    }
  }, {
    key: 'deactivateEditorMode',
    value: function deactivateEditorMode() {
      this.data.disableEditorMode = true;
      this.update('html', '[data-selector="lite-editor-toolbox"]');
    }
  }, {
    key: 'makeEditableHtml',
    value: function makeEditableHtml(value) {
      if (this.data.preserveSpace) {
        var dom = document.createElement('div');
        dom.innerHTML = value;
        util.replaceWhiteSpaceWithNbsp(dom);
        value = dom.innerHTML;
      }

      if (this.data.nl2br === false && value.slice(-1) === '\n') {
        value += '<br>';
      }

      value = value.replace(/<br>(\r\n|\r|\n)/g, '<br>');
      value = value.replace(/\r\n|\r|\n/g, '<br>');

      return value;
    }
  }, {
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
    key: '_fireEvent',
    value: function _fireEvent(eventName) {
      var source = this._getElementByQuery('[data-selector="lite-editor-source"]');
      if (source) {
        util.triggerEvent(source, eventName);
      }
    }
  }, {
    key: 'on',
    value: function on(event, fn) {
      var _this2 = this;

      var source = this._getElementByQuery('[data-selector="lite-editor-source"]');
      source.addEventListener(event, function (e) {
        fn.call(_this2, e);
      });
    }
  }, {
    key: 'escapeNotRegisteredTags',
    value: function escapeNotRegisteredTags(value) {
      var _this3 = this;

      var btns = this.data.btnOptions;
      value = value.replace(/<([a-zA-Z0-9._-]+)\s?(.*?)>(([\n\r\t]|.)*?)<\/\1>/g, function (component, tag, attr, content) {
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
          content = _this3.escapeNotRegisteredTags(content);
        }
        return '&lt;' + tag + attr + '&gt;' + content + '&lt;/' + tag + '&gt;';
      });

      return value.replace(/<([a-zA-Z0-9._-]+)\s?([^>]*?)\/?>/g, function (component, tag, attr) {
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
        if (tag !== 'br') {
          return '&lt;' + tag + attr + '&gt';
        }
        return '<br>';
      });
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
      var editor = this._getElementByQuery('[data-selector="lite-editor"]');
      this.data.value = editor.innerHTML;
    }
  }, {
    key: 'insertHtmlAtCursor',
    value: function insertHtmlAtCursor(html) {
      if (this.data.showSource) {
        var source = this._getElementByQuery('[data-selector="lite-editor-source"]');
        util.replaceSelectionWithText(source, html);
        this.data.value = this.makeEditableHtml(source.value);
      } else {
        util.insertHtmlAtCursor(html);
        var editor = this._getElementByQuery('[data-selector="lite-editor"]');
        this.data.value = editor.innerHTML;
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
      var selector = this._getElementByQuery('[data-selector="lite-editor"]');
      return selector === document.activeElement;
    }
  }, {
    key: '_isVoidElement',
    value: function _isVoidElement(tag) {
      return this.data.voidElements.find(function (item) {
        if (item === tag) {
          return true;
        }
        return false;
      });
    }
  }, {
    key: 'insertTag',
    value: function insertTag(tag, className, sampleText) {
      var _this4 = this;

      var groups = this.data.groups;
      var editor = this._getElementByQuery('[data-selector="lite-editor"]');
      var source = this._getElementByQuery('[data-selector="lite-editor-source"]');
      var element = util.getElementBySelection();
      var selection = util.getSelection(source);

      if (!this.data.showSource && !editor.contains(element)) {
        return;
      }
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
      var insertHtml = '<' + tag + classAttr + '>' + selection + '</' + tag + '>';
      if (this._isVoidElement(tag)) {
        insertHtml = selection + '<' + tag + '>';
      }
      if (this.data.showSource) {
        if (this.data.mode === 'markdown') {
          und.convert(insertHtml, function (err, markdown) {
            util.replaceSelectionWithText(source, markdown);
            _this4.data.value = _this4.makeEditableHtml(source.value);
          });
        } else {
          util.replaceSelectionWithText(source, insertHtml);
          this.data.value = this.makeEditableHtml(source.value);
        }
      } else {
        this.insertHtml(insertHtml.replace(/\r\n|\r|\n/g, '<br>'));
        groups.forEach(function (group) {
          group.items.forEach(function (btn) {
            if (btn.tag === tag && btn.className === className) {
              btn.selected = true;
            }
          });
        });
        this.update('html', '[data-selector="lite-editor-toolbox"]');
      }
      this._fireEvent('insertTag');
    }
  }, {
    key: 'showLinkDialog',
    value: function showLinkDialog(text, className) {
      this.data.tooltipLabel = text;
      this.data.tooltipClassName = className;
      this.data.linkNew = true;
      this.update('html', '[data-selector="lite-editor-tooltip"]');
      var urlInput = this._getElementByQuery('[data-bind="tooltipUrl"]');
      urlInput.focus();
    }
  }, {
    key: 'updateTargetBlank',
    value: function updateTargetBlank() {
      var target = this.e.target;
      if (target.checked) {
        this.data.targetBlank = 'true';
      } else {
        this.data.targetBlank = 'false';
      }
    }
  }, {
    key: 'insertAtag',
    value: function insertAtag() {
      var _this5 = this;

      this.restoreSelection();
      var label = this.data.tooltipLabel;
      var link = this.data.tooltipUrl;
      var className = this.data.tooltipClassName;
      var targetBlank = this.data.targetBlank;
      var relAttrForTargetBlank = this.data.relAttrForTargetBlank;
      var classAttr = '';
      if (className) {
        classAttr = ' class="' + className + '"';
      }
      var insertHtml = '<a href="' + link + '"' + classAttr + (targetBlank === 'true' ? 'target="_blank" rel="' + relAttrForTargetBlank + '"' : '') + '>' + label + '</a>';
      if (this.data.showSource) {
        var source = this._getElementByQuery('[data-selector="lite-editor-source"]');
        if (this.data.mode === 'markdown') {
          und.convert(insertHtml, function (err, markdown) {
            util.replaceSelectionWithText(source, markdown);
            _this5.data.value = _this5.makeEditableHtml(source.value);
          });
        } else {
          util.replaceSelectionWithText(source, insertHtml);
          this.data.value = this.makeEditableHtml(source.value);
        }
      } else {
        this.insertHtml(insertHtml.replace(/\r\n|\r|\n/g, '<br>'));
        this.updateToolBox();
      }
      this.closeTooltip();
    }
  }, {
    key: 'onClick',
    value: function onClick(i) {
      var number = parseInt(i, 10);
      var btn = this.data.btnOptions[number];
      if (btn.onClick) {
        btn.onClick(this);
      }
    }
  }, {
    key: 'onInit',
    value: function onInit(i) {
      var number = parseInt(i, 10);
      var btn = this.data.btnOptions[number];
      var btnElement = this._getElementByQuery('[data-selector="btn-group"] [data-index="' + i + '"]');
      if (btn.onInit && !btn.init) {
        btn.onInit(this, btnElement);
        btn.init = true;
      }
    }
  }, {
    key: 'onRender',
    value: function onRender(i) {
      var number = parseInt(i, 10);
      var btn = this.data.btnOptions[number];
      var btnElement = this._getElementByQuery('[data-selector="btn-group"] [data-index="' + i + '"]');
      if (btn.onRender) {
        btn.onRender(this, btnElement);
      }
    }
  }, {
    key: 'beforeUpdated',
    value: function beforeUpdated() {
      var data = this.data;
      data.canUndo = this.canUndo();
      data.canRedo = this.canRedo();
      if (data.firstValue) {
        data.formatedValue = this.data.firstValue;
        data.firstValue = null;
      } else if (!data.showSource) {
        data.formatedValue = this.format(data.value);
      }
      if (data.value) {
        data.value = data.value.replace(/{/g, '&lcub;').replace(/}/g, '&rcub;');
      }
      this._fireEvent('prerender');
    }
  }, {
    key: 'onUpdated',
    value: function onUpdated() {
      var _this6 = this;

      var editor = this._getElementByQuery('[data-selector="lite-editor"]');
      var source = this._getElementByQuery('[data-selector="lite-editor-source"]');
      this.data.btnOptions.forEach(function (btn, index) {
        _this6.onInit(index);
        _this6.onRender(index);
      });
      if (this.data.showSource === true) {
        source.style.height = source.scrollHeight + 'px';
      } else {
        this.data.value = editor.innerHTML;
      }
      if (!editor) {
        return;
      }
      this.saveSelection();
      if (this.stopStack) {
        this.stopStack = false;
      } else if ('' + this.stack[this.stackPosition - 1] !== '' + this.data.value) {
        this.stack = this.stack.slice(0, this.stackPosition + 1);
        this.stack.push(this.data.value);
        this.stackPosition += 1;
        if (this.data.showSource === false && this.selector) {
          this.selector.value = this.format(this.data.value);
        }
      }
      this._fireEvent('render');
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
      this._fireEvent('redo');
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
      this._fireEvent('undo');
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
    key: 'onPaste',
    value: function onPaste() {
      var e = this.e;
      var editor = this._getElementByQuery('[data-selector="lite-editor"]');
      var textarea = this._getElementByQuery('[data-selector="lite-editor-source"]');
      e.preventDefault();
      var insertText = '';
      if (e.clipboardData) {
        insertText = e.clipboardData.getData('text/plain');
      } else if (window.clipboardData) {
        insertText = window.clipboardData.getData('Text');
      }
      if (this._isFocused() && insertText) {
        this.insertHtmlAtCursor(insertText.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/(\r\n|\n\r|\n|\r)/g, '<br>').replace(/ /g, '&nbsp;').replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;'));
        this.data.value = editor.innerHTML;
        this.data.formatedValue = this.format(this.data.value);
        textarea.value = this.data.formatedValue;
        // ⌘VVVVVVV
        var pos = util.getCaretPos(editor);
        util.clearSelection();
        util.setCaretPos(editor, pos);
      }
      this._fireEvent('paste');
    }
  }, {
    key: 'onKeyDown',
    value: function onKeyDown() {
      var editor = this._getElementByQuery('[data-selector="lite-editor"]');
      var textarea = this._getElementByQuery('[data-selector="lite-editor-source"]');
      var e = this.e;
      var pos = util.getCaretPos(editor);

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
      // on purpose
      var oldCoordinate = this.checkCaretCoordinate();
      this.insertHtmlAtCursor('<br> ');
      var innerHTML = editor.innerHTML.replace(/<br> <\/(.*?)>/g, '</$1><br> ');
      if (!util.hasLastBr(editor)) {
        innerHTML += '<br>';
      }
      editor.innerHTML = innerHTML;
      this.data.value = innerHTML;
      this.data.formatedValue = this.format(this.data.value);
      textarea.value = this.data.formatedValue;
      var coordinate = this.checkCaretCoordinate();
      editor.focus();
      util.setCaretPos(editor, pos + 1);
      if (util.getBrowser().indexOf('ie') === -1) {
        coordinate = this.checkCaretCoordinate();
      }
      if (coordinate.y > this.data.maxHeight) {
        editor.scrollTop += coordinate.y - oldCoordinate.y;
      }
      e.preventDefault();
    }
  }, {
    key: 'checkCaretCoordinate',
    value: function checkCaretCoordinate() {
      var editor = this._getElementByQuery('[data-selector="lite-editor"]');
      var id = this._getUniqId();
      this.insertHtmlAtCursor('<span id="' + id + '" style="display:inline-block;"></span>');
      var span = this._getElementByQuery('#' + id);
      var rect = span.getBoundingClientRect();
      var editorRect = editor.getBoundingClientRect();
      var coordinate = {
        x: rect.x - editorRect.x,
        y: rect.y - editorRect.y
      };
      util.removeElement(span);
      this.data.value = editor.innerHTML;
      return coordinate;
    }
  }, {
    key: 'onInput',
    value: function onInput() {
      var editor = this._getElementByQuery('[data-selector="lite-editor"]');
      // if (!util.hasLastBr(editor)) {
      //   editor.appendChild(document.createElement('br'));
      // }
      var textarea = this._getElementByQuery('[data-selector="lite-editor-source"]');
      this.data.value = editor.innerHTML;
      this.data.formatedValue = this.format(this.data.value);
      textarea.value = this.data.formatedValue;
    }
  }, {
    key: 'preventSubmit',
    value: function preventSubmit() {
      var e = this.e;
      if (e.keyCode === 13) {
        e.preventDefault();
      }
    }
  }, {
    key: 'onPutCaret',
    value: function onPutCaret() {
      var _this7 = this;

      setTimeout(function () {
        var target = _this7.getSelectionNode();
        var tags = [];
        var editor = _this7._getElementByQuery('[data-selector="lite-editor"]');
        if (target && target !== editor) {
          tags.push({ tagName: target.tagName.toLowerCase(), className: target.getAttribute('class') || '' });
          var parent = target.parentElement;
          while (parent !== editor) {
            if (!parent) {
              break;
            }
            var tagName = parent.tagName.toLowerCase();
            tags.push({
              tagName: tagName,
              className: parent.getAttribute('class') || ''
            });
            parent = parent.parentElement;
          }
        }
        _this7.updateToolBox(tags);
      }, 1);
    }
  }, {
    key: 'onDirectInput',
    value: function onDirectInput() {
      var source = this._getElementByQuery('[data-selector="lite-editor-source"]');
      var value = this.e.target.value;
      this.data.value = this.makeEditableHtml(value);
      // source.style.height = 'auto';
      source.style.height = source.scrollHeight + 'px';
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
      this.update('html', '[data-selector="lite-editor-toolbox"]');
    }
  }, {
    key: 'updateTooltip',
    value: function updateTooltip(item) {
      if (item === null) {
        this.data.linkNew = true;
        this.data.tooltipLabel = '';
        this.data.tooltipUrl = '';
        this.data.targetBlank = 'false';
      } else {
        this.data.linkNew = false;
        this.data.tooltipLabel = item.innerHTML;
        this.data.tooltipUrl = item.getAttribute('href');
        this.savedLinkNode = item;
        if (item.getAttribute('target') === '_blank') {
          this.data.targetBlank = 'true';
        } else {
          this.data.targetBlank = 'false';
        }
      }
      this.update('html', '[data-selector="lite-editor-tooltip"]');
    }
  }, {
    key: 'closeTooltip',
    value: function closeTooltip() {
      this.data.tooltipLabel = '';
      this.data.tooltipUrl = '';
      this.data.tooltipClassName = '';
      this.data.targetBlank = 'false';
      this.update('html', '[data-selector="lite-editor-tooltip"]');
    }
  }, {
    key: 'updateLink',
    value: function updateLink() {
      this.restoreSelection();
      var editor = this._getElementByQuery('[data-selector="lite-editor"]');
      var pos = util.getCaretPos(editor);
      var label = this.data.tooltipLabel;
      var targetBlank = this.data.targetBlank;
      var url = this.data.tooltipUrl;
      var node = this.savedLinkNode;
      var relAttrForTargetBlank = this.data.relAttrForTargetBlank;
      node.setAttribute('href', url);
      node.innerHTML = label;
      if (targetBlank === 'true') {
        node.setAttribute('target', '_blank');
        node.setAttribute('rel', relAttrForTargetBlank);
      } else {
        node.removeAttribute('target');
        node.removeAttribute('rel');
      }
      this.data.value = editor.innerHTML;
      editor.focus();
      util.setCaretPos(editor, pos);
      this.onPutCaret();
      this.closeTooltip();
    }
  }, {
    key: 'removeLink',
    value: function removeLink() {
      this.restoreSelection();
      var editor = this._getElementByQuery('[data-selector="lite-editor"]');
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
      var editor = this._getElementByQuery('[data-selector="lite-editor"]');
      var pos = util.getCaretPos(editor);
      var node = util.getElementBySelection();
      var length = util.getSelectionLength();
      var nodePos = util.getCaretPos(node);
      if (node.parentElement === editor && node.textContent && nodePos === node.textContent.length && length === 0) {
        util.moveCaretAfter(node);
      } else {
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
        util.setCaretPos(editor, pos, length);
      }
      this.onPutCaret();
      this._fireEvent('unwrapTag');
    }
  }, {
    key: 'changeMode',
    value: function changeMode(mode) {
      this.data.mode = mode;
    }
  }, {
    key: 'toggleSource',
    value: function toggleSource() {
      this.data.showSource = !this.data.showSource;
      if (this.data.showSource) {
        this.data.formatedValue = this.format(this.data.value);
        this.data.groups.forEach(function (group) {
          group.items.forEach(function (btn) {
            btn.selected = false;
          });
        });
      } else if (this.data.value) {
        this.data.value = this.data.value.replace(/([\\]+)/g, '$1\\'); // CMS-5637 バックスラッシュが消えてしまう問題に対処
      }
      this.update();
    }
  }, {
    key: 'showSource',
    value: function showSource() {
      this.data.showSource = true;
      if (this.data.showSource) {
        this.data.formatedValue = this.format(this.data.value);
        this.data.groups.forEach(function (group) {
          group.items.forEach(function (btn) {
            btn.selected = false;
          });
        });
      }
      this.update();
    }
  }, {
    key: 'hideSource',
    value: function hideSource() {
      this.data.showSource = false;
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
      var replaced = txt.replace(/<br>( *)/g, '\n').replace(/<br>/g, '\n').replace(/&nbsp;/g, ' ').replace(/<script/g, '&lt;script').replace(/script>/g, 'script&gt;').replace(/( +)/g, function (a) {
        var length = a.length;
        var ret = '';
        for (var i = 0; i < length; i += 1) {
          if (i % 2 === 0) {
            ret += ' ';
          } else {
            ret += '&nbsp;';
          }
        }
        return ret;
      });
      if (replaced.slice(-1) === '\n') {
        replaced = replaced.slice(0, -1);
        replaced += '<br>';
      }
      if (this.data.nl2br) {
        replaced = replaced.replace(/\n/g, '<br>\n');
      }
      if (replaced.slice(-8) !== '<br><br>' && replaced.slice(-4) === '<br>') {
        replaced = replaced.slice(0, -4);
      }
      if (this.data.decodeSource) {
        return entities.decode(replaced);
      }
      return replaced;
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
        this.update('html', '[data-selector="lite-editor-toolbox"]');
        if (item.onSelect) {
          this.data.selectedOption = item.value;
          item.onSelect(this);
        }
      }
    }
  }]);

  return LiteEditor;
}(_aTemplate3.default);

exports.default = LiteEditor;
module.exports = exports['default'];