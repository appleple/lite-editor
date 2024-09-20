import aTemplate from 'a-template';
import extend from 'deep-extend';
import Upndown from 'upndown';
import 'custom-event-polyfill';
import 'ie-array-find-polyfill';
import editorHtml from './editor.html';
import btnHtml from './btn.html';
import tooltipHtml from './tooltip.html';
import * as util from '../lib/util';

const Entities = require('html-entities').XmlEntities;

const entities = new Entities();
const und = new Upndown({ decodeEntities: false });

const defaultbtnOptions = [
  {
    label: '<i class="lite-editor-font-back"></i>',
    action: 'undo',
    group: 'action'
  },
  {
    label: '<i class="lite-editor-font-go"></i>',
    action: 'redo',
    group: 'action'
  },
  {
    label: '<i class="lite-editor-font-link"></i>',
    tag: 'a',
    className: '',
    group: 'link',
    sampleText: 'link text'
  },
  {
    label: '<i class="lite-editor-font-bold"></i>',
    tag: 'strong',
    className: '',
    group: 'mark',
    sampleText: ' '
  },
  {
    label: '<i class="lite-editor-font-italic"></i>',
    tag: 'i',
    className: '',
    group: 'mark',
    sampleText: ' '
  },
  {
    label: '<i class="lite-editor-font-underline"></i>',
    tag: 'u',
    className: '',
    group: 'mark',
    sampleText: ' '
  }
];

const defaults = {
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
  voidElements: [
    'area',
    'base',
    'basefont',
    'bgsound',
    'br',
    'col',
    'command',
    'embed',
    'frame',
    'hr',
    'image',
    'img',
    'input',
    'isindex',
    'keygen',
    'link',
    'menuitem',
    'meta',
    'nextid',
    'param',
    'source',
    'track',
    'wbr'
  ],
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

export default class LiteEditor extends aTemplate {

  constructor(ele, settings) {
    super();
    this.id = this._getUniqId();
    const selector = typeof ele === 'string' ? document.querySelector(ele) : ele;
    const html = `<div data-id='${this.id}'></div>`;
    this.data = extend({}, defaults, settings);
    this.data.showSource = this.data.sourceFirst;
    this.data.disableEditorMode = false;
    this.data.hideEditor = false;
    this.data.tooltipLabel = '';
    this.data.tooltipUrl = '';
    this.data.tooltipClassName = '';
    this.data.attr = '';
    this.data.targetBlank = 'false';
    this.data.linkNew = true;
    if (settings && settings.btnOptions) {
      this.data.btnOptions = settings.btnOptions;
    }
    this.data.groups = this.makeBtnGroups();
    this.stack = [];
    this.stackPosition = 0;
    let template = '';
    let attrStr = '';
    this.convert = {
      format: this.format,
      insertExtend: this.insertExtend
    };

    if (this.data.btnPosition === 'bottom') {
      template = util.removeIndentNewline(`${editorHtml}${btnHtml}${tooltipHtml}`);
    } else {
      template = util.removeIndentNewline(`${btnHtml}${editorHtml}${tooltipHtml}`);
    }

    this.addTemplate(this.id, template);

    if (selector.value) {
      let value = selector.value;
      if (!this.data.sourceFirst) {
        value = this.makeEditableHtml(value);
      } else {
        value = selector.innerHTML;
      }
      if (this.data.escapeNotRegisteredTags) {
        value = this.escapeNotRegisteredTags(value);
      }
      this.data.firstValue = selector.value;
      this.data.value = value;
    }
    if (this.data.value) {
      this.data.value = this.data.value.replace(/([\\]+)/g, '$1\\\\'); // CMS-5637 バックスラッシュが消えてしまう問題に対処
    }

    if (selector.attributes) {
      [].forEach.call(selector.attributes, (attr) => {
        attrStr += ` ${attr.nodeName}="${attr.nodeValue}"`;
      });
      this.data.attr = attrStr;
    }

    if (!this.data.selectedOption && this.data.selectOptions && this.data.selectOptions[0] && this.data.selectOptions[0].value) {
      this.data.selectedOption = this.data.selectOptions[0].value;
    }

    util.before(selector, html);
    util.removeElement(selector);
    this.update();
    this.selector = this._getElementByQuery('[data-selector="lite-editor-source"]');
    const item = this.data.selectOptions.find((option => option.value === this.data.selectedOption));
    if (item) {
      this.data.extendLabel = item.extendLabel;
      if (item.onSelect) {
        item.onSelect(this);
      }
    }

    this._fireEvent('init');
  }

  focus() {
    const { showSource } = this.data;
    if (showSource === true) {
      this._getElementByQuery('[data-selector="lite-editor-source"]').focus();
    } else {
      this._getElementByQuery('[data-selector="lite-editor"]').focus();
    }
  }

  registerButton(btn) {
    this.data.btnOptions.push(btn);
    this.data.groups = this.makeBtnGroups();
    this.update('html', '[data-selector="lite-editor-toolbox"]');
  }

  activateEditorMode() {
    this.data.disableEditorMode = false;
    this.update('html', '[data-selector="lite-editor-toolbox"]');
  }

  deactivateEditorMode() {
    this.data.disableEditorMode = true;
    this.update('html', '[data-selector="lite-editor-toolbox"]');
  }

  makeEditableHtml(value) {
    if (this.data.preserveSpace) {
      const dom = document.createElement('div');
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

  makeBtnGroups() {
    const btns = this.data.btnOptions;
    const groups = [];
    btns.forEach((btn, index) => {
      btn.index = index;
      let flag = true;
      if (!btn.group) {
        btn.group = 'none';
      }
      groups.forEach((group) => {
        if (group.name === btn.group) {
          group.items.push(btn);
          flag = false;
        }
      });
      if (flag) {
        const group = {
          name: btn.group,
          items: [btn]
        };
        groups.push(group);
      }
    });
    return groups;
  }

  _getSelf() {
    return document.querySelector(`[data-id='${this.id}']`);
  }

  _getUniqId() {
    return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
  }

  _getElementByQuery(query) {
    return document.querySelector(`[data-id='${this.id}'] ${query}`);
  }

  _fireEvent(eventName) {
    const source = this._getElementByQuery('[data-selector="lite-editor-source"]');
    if (source) {
      util.triggerEvent(source, eventName);
    }
  }

  on(event, fn) {
    const source = this._getElementByQuery('[data-selector="lite-editor-source"]');
    source.addEventListener(event, (e) => {
      fn.call(this, e);
    });
  }

  escapeNotRegisteredTags(value) {
    const btns = this.data.btnOptions;
    value = value.replace(/<([a-zA-Z0-9._-]+)\s?(.*?)>(([\n\r\t]|.)*?)<\/\1>/g, (component, tag, attr, content) => {
      const className = (attr.match(/class=["|'](.*?)["|']/i) || [null, ''])[1];
      let flag = false;
      if (attr) {
        attr = ` ${attr}`;
      }
      btns.forEach((btn) => {
        if (btn.className === className && btn.tag === tag) {
          flag = true;
        }
      });
      if (flag) {
        return component;
      }
      if (/<([a-zA-Z0-9._-]+)\s?(.*?)>(([\n\r\t]|.)*?)<\/\1>/.exec(content)) {
        content = this.escapeNotRegisteredTags(content);
      }
      return `&lt;${tag}${attr}&gt;${content}&lt;/${tag}&gt;`;
    });

    return value.replace(/<([a-zA-Z0-9._-]+)\s?([^>]*?)\/?>/g, (component, tag, attr) => {
      const className = (attr.match(/class=["|'](.*?)["|']/i) || [null, ''])[1];
      let flag = false;
      if (attr) {
        attr = ` ${attr}`;
      }
      btns.forEach((btn) => {
        if (btn.className === className && btn.tag === tag) {
          flag = true;
        }
      });
      if (flag) {
        return component;
      }
      if (tag !== 'br') {
        return `&lt;${tag}${attr}&gt`;
      }
      return '<br>';
    });
  }

  encodeValue() {
    this.data.value = entities.encode(this.data.value);
    this.update();
  }

  decodeValue() {
    this.data.value = entities.decode(this.data.value);
    this.update();
  }

  hideEditor() {
    this.data.hideEditor = true;
    this.update();
  }

  showEditor() {
    this.data.hideEditor = false;
    this.update();
  }

  hideBtns() {
    this.data.hideBtns = true;
    this.update();
  }

  showBtns() {
    this.data.hideBtns = false;
    this.update();
  }

  resetStyle() {
    const selection = util.getSelection();
    const insertText = `${selection}`.replace(/<[^>]*>/g, '');
    if (this._isFocused()) {
      document.execCommand('insertText', false, insertText);
    }
  }

  insertHtml(html) {
    util.replaceSelectionWithHtml(html);
    const editor = this._getElementByQuery('[data-selector="lite-editor"]');
    this.data.value = editor.innerHTML;
  }

  insertHtmlAtCursor(html) {
    if (this.data.showSource) {
      const source = this._getElementByQuery('[data-selector="lite-editor-source"]');
      util.replaceSelectionWithText(source, html);
      this.data.value = this.makeEditableHtml(source.value);
    } else {
      util.insertHtmlAtCursor(html);
      const editor = this._getElementByQuery('[data-selector="lite-editor"]');
      this.data.value = editor.innerHTML;
    }
  }

  saveSelection() {
    this.selection = util.saveSelection();
  }

  restoreSelection() {
    if (!this.selection) {
      return;
    }
    util.restoreSelection(this.selection);
  }

  _isFocused() {
    const selector = this._getElementByQuery('[data-selector="lite-editor"]');
    return selector === document.activeElement;
  }

  _isVoidElement(tag) {
    return this.data.voidElements.find((item) => {
      if (item === tag) {
        return true;
      }
      return false;
    });
  }

  insertTag(tag, className, sampleText) {
    const groups = this.data.groups;
    const editor = this._getElementByQuery('[data-selector="lite-editor"]');
    const source = this._getElementByQuery('[data-selector="lite-editor-source"]');
    const element = util.getElementBySelection();
    let selection = util.getSelection(source);

    if (!this.data.showSource && !editor.contains(element)) {
      return;
    }
    if (!selection) {
      selection = sampleText;
    }
    if (tag === 'a') {
      this.saveSelection();
      this.showLinkDialog(`${selection}`, className);
      return;
    }

    let classAttr = '';
    if (className) {
      classAttr = ` class="${className}"`;
    }
    let insertHtml = `<${tag}${classAttr}>${selection}</${tag}>`;
    if (this._isVoidElement(tag)) {
      insertHtml = `${selection}<${tag}>`;
    }
    if (this.data.showSource) {
      if (this.data.mode === 'markdown') {
        und.convert(insertHtml, (err, markdown) => {
          util.replaceSelectionWithText(source, markdown);
          this.data.value = this.makeEditableHtml(source.value);
        });
      } else {
        util.replaceSelectionWithText(source, insertHtml);
        this.data.value = this.makeEditableHtml(source.value);
      }
    } else {
      this.insertHtml(insertHtml.replace(/\r\n|\r|\n/g, '<br>'));
      groups.forEach((group) => {
        group.items.forEach((btn) => {
          if (btn.tag === tag && btn.className === className) {
            btn.selected = true;
          }
        });
      });
      this.update('html', '[data-selector="lite-editor-toolbox"]');
    }
    this._fireEvent('insertTag');
  }

  showLinkDialog(text, className) {
    this.data.tooltipLabel = text;
    this.data.tooltipClassName = className;
    this.data.linkNew = true;
    this.update('html', '[data-selector="lite-editor-tooltip"]');
    const urlInput = this._getElementByQuery('[data-bind="tooltipUrl"]');
    urlInput.focus();
  }

  updateTargetBlank() {
    const target = this.e.target;
    if (target.checked) {
      this.data.targetBlank = 'true';
    } else {
      this.data.targetBlank = 'false';
    }
  }

  insertAtag() {
    this.restoreSelection();
    const label = this.data.tooltipLabel;
    const link = this.data.tooltipUrl;
    const className = this.data.tooltipClassName;
    const targetBlank = this.data.targetBlank;
    const relAttrForTargetBlank = this.data.relAttrForTargetBlank;
    let classAttr = '';
    if (className) {
      classAttr = ` class="${className}"`;
    }
    const insertHtml = `<a href="${link}"${classAttr}${targetBlank === 'true' ? `target="_blank" rel="${relAttrForTargetBlank}"` : ''}>${label}</a>`;
    if (this.data.showSource) {
      const source = this._getElementByQuery('[data-selector="lite-editor-source"]');
      if (this.data.mode === 'markdown') {
        und.convert(insertHtml, (err, markdown) => {
          util.replaceSelectionWithText(source, markdown);
          this.data.value = this.makeEditableHtml(source.value);
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

  onClick(i) {
    const number = parseInt(i, 10);
    const btn = this.data.btnOptions[number];
    if (btn.onClick) {
      btn.onClick(this);
    }
  }

  onInit(i) {
    const number = parseInt(i, 10);
    const btn = this.data.btnOptions[number];
    const btnElement = this._getElementByQuery(`[data-selector="btn-group"] [data-index="${i}"]`);
    if (btn.onInit && !btn.init) {
      btn.onInit(this, btnElement);
      btn.init = true;
    }
  }

  onRender(i) {
    const number = parseInt(i, 10);
    const btn = this.data.btnOptions[number];
    const btnElement = this._getElementByQuery(`[data-selector="btn-group"] [data-index="${i}"]`);
    if (btn.onRender) {
      btn.onRender(this, btnElement);
    }
  }

  beforeUpdated() {
    const data = this.data;
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

  onUpdated() {
    const editor = this._getElementByQuery('[data-selector="lite-editor"]');
    const source = this._getElementByQuery('[data-selector="lite-editor-source"]');
    this.data.btnOptions.forEach((btn, index) => {
      this.onInit(index);
      this.onRender(index);
    });
    if (this.data.showSource === true) {
      source.style.height = `${source.scrollHeight}px`;
    } else {
      this.data.value = editor.innerHTML;
    }
    if (!editor) {
      return;
    }
    this.saveSelection();
    if (this.stopStack) {
      this.stopStack = false;
    } else if (`${this.stack[this.stackPosition - 1]}` !== `${this.data.value}`) {
      this.stack = this.stack.slice(0, this.stackPosition + 1);
      this.stack.push(this.data.value);
      this.stackPosition += 1;
      if (this.data.showSource === false && this.selector) {
        this.selector.value = this.format(this.data.value);
      }
    }
    this._fireEvent('render');
  }

  redo() {
    if (!this.canRedo()) {
      return;
    }
    this.stackPosition += 1;
    this.data.value = this.stack[this.stackPosition];
    this.stopStack = true;
    this.update();
    this._fireEvent('redo');
  }

  canRedo() {
    if (this.stackPosition < this.stack.length - 1) {
      return true;
    }
    return false;
  }

  undo() {
    if (!this.canUndo()) {
      return;
    }
    this.stackPosition -= 1;
    this.data.value = this.stack[this.stackPosition];
    this.stopStack = true;
    this.update();
    this._fireEvent('undo');
  }

  canUndo() {
    if (this.stackPosition > 0) {
      return true;
    }
    return false;
  }

  onPaste() {
    const e = this.e;
    const editor = this._getElementByQuery('[data-selector="lite-editor"]');
    const textarea = this._getElementByQuery('[data-selector="lite-editor-source"]');
    e.preventDefault();
    let insertText = '';
    if (e.clipboardData) {
      insertText = e.clipboardData.getData('text/plain');
    } else if (window.clipboardData) {
      insertText = window.clipboardData.getData('Text');
    }
    if (this._isFocused() && insertText) {
      this.insertHtmlAtCursor(insertText
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/(\r\n|\n\r|\n|\r)/g, '<br>')
        .replace(/ /g, '&nbsp;')
        .replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;')
      );
      this.data.value = editor.innerHTML;
      this.data.formatedValue = this.format(this.data.value);
      textarea.value = this.data.formatedValue;
      // ⌘VVVVVVV
      const pos = util.getCaretPos(editor);
      util.clearSelection();
      util.setCaretPos(editor, pos);
    }
    this._fireEvent('paste');
  }

  onKeyDown() {
    const editor = this._getElementByQuery('[data-selector="lite-editor"]');
    const textarea = this._getElementByQuery('[data-selector="lite-editor-source"]');
    const e = this.e;
    const pos = util.getCaretPos(editor);

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
    const oldCoordinate = this.checkCaretCoordinate();
    this.insertHtmlAtCursor('<br> ');
    let innerHTML = editor.innerHTML.replace(/<br> <\/(.*?)>/g, '</$1><br> ');
    if (!util.hasLastBr(editor)) {
      innerHTML += '<br>';
    }
    editor.innerHTML = innerHTML;
    this.data.value = innerHTML;
    this.data.formatedValue = this.format(this.data.value);
    textarea.value = this.data.formatedValue;
    let coordinate = this.checkCaretCoordinate();
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

  checkCaretCoordinate() {
    const editor = this._getElementByQuery('[data-selector="lite-editor"]');
    const id = this._getUniqId();
    this.insertHtmlAtCursor(`<span id="${id}" style="display:inline-block;"></span>`);
    const span = this._getElementByQuery(`#${id}`);
    const rect = span.getBoundingClientRect();
    const editorRect = editor.getBoundingClientRect();
    const coordinate = {
      x: rect.x - editorRect.x,
      y: rect.y - editorRect.y
    };
    util.removeElement(span);
    this.data.value = editor.innerHTML;
    return coordinate;
  }

  onInput() {
    const editor = this._getElementByQuery('[data-selector="lite-editor"]');
    // if (!util.hasLastBr(editor)) {
    //   editor.appendChild(document.createElement('br'));
    // }
    const textarea = this._getElementByQuery('[data-selector="lite-editor-source"]');
    this.data.value = editor.innerHTML;
    this.data.formatedValue = this.format(this.data.value);
    textarea.value = this.data.formatedValue;
  }

  preventSubmit() {
    const e = this.e;
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  }

  onPutCaret() {
    setTimeout(() => {
      const target = this.getSelectionNode();
      const tags = [];
      const editor = this._getElementByQuery('[data-selector="lite-editor"]');
      if (target && target !== editor) {
        tags.push({ tagName: target.tagName.toLowerCase(), className: target.getAttribute('class') || '' });
        let parent = target.parentElement;
        while (parent !== editor) {
          if (!parent) {
            break;
          }
          const tagName = parent.tagName.toLowerCase();
          tags.push({
            tagName,
            className: parent.getAttribute('class') || ''
          });
          parent = parent.parentElement;
        }
      }
      this.updateToolBox(tags);
    }, 1);
  }

  onDirectInput() {
    const source = this._getElementByQuery('[data-selector="lite-editor-source"]');
    const value = this.e.target.value;
    this.data.value = this.makeEditableHtml(value);
    // source.style.height = 'auto';
    source.style.height = `${source.scrollHeight}px`;
  }

  updateToolBox(tags = []) {
    const groups = this.data.groups;
    groups.forEach((group) => {
      group.items.forEach((btn) => {
        btn.selected = false;
        tags.forEach((tag) => {
          if (btn.tag === tag.tagName && btn.className === tag.className) {
            btn.selected = true;
          }
        });
      });
    });
    this.saveSelection();
    this.update('html', '[data-selector="lite-editor-toolbox"]');
  }

  updateTooltip(item) {
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

  closeTooltip() {
    this.data.tooltipLabel = '';
    this.data.tooltipUrl = '';
    this.data.tooltipClassName = '';
    this.data.targetBlank = 'false';
    this.update('html', '[data-selector="lite-editor-tooltip"]');
  }

  updateLink() {
    this.restoreSelection();
    const editor = this._getElementByQuery('[data-selector="lite-editor"]');
    const pos = util.getCaretPos(editor);
    const label = this.data.tooltipLabel;
    const targetBlank = this.data.targetBlank;
    const url = this.data.tooltipUrl;
    const node = this.savedLinkNode;
    const relAttrForTargetBlank = this.data.relAttrForTargetBlank;
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

  removeLink() {
    this.restoreSelection();
    const editor = this._getElementByQuery('[data-selector="lite-editor"]');
    const pos = util.getCaretPos(editor);
    const node = this.savedLinkNode;
    util.unwrapTag(node);
    editor.focus();
    util.setCaretPos(editor, pos);
    this.onPutCaret();
    this.closeTooltip();
  }

  getSelectionNode() {
    const node = document.getSelection().anchorNode;
    return (node.nodeType === 3 ? node.parentNode : node);
  }

  unwrapTag(tag, className) {
    const editor = this._getElementByQuery('[data-selector="lite-editor"]');
    const pos = util.getCaretPos(editor);
    let node = util.getElementBySelection();
    const length = util.getSelectionLength();
    const nodePos = util.getCaretPos(node);
    if (node.parentElement === editor &&
      node.textContent && nodePos === node.textContent.length && length === 0) {
      util.moveCaretAfter(node);
    } else {
      while (true) {
        const nodeClassName = node.getAttribute('class') || '';
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

  changeMode(mode) {
    this.data.mode = mode;
  }

  toggleSource() {
    this.data.showSource = !this.data.showSource;
    if (this.data.showSource) {
      this.data.formatedValue = this.format(this.data.value);
      this.data.groups.forEach((group) => {
        group.items.forEach((btn) => {
          btn.selected = false;
        });
      });
    } else if (this.data.value) {
      this.data.value = this.data.value.replace(/([\\]+)/g, '$1\\'); // CMS-5637 バックスラッシュが消えてしまう問題に対処
    }
    this.update();
  }

  showSource() {
    this.data.showSource = true;
    if (this.data.showSource) {
      this.data.formatedValue = this.format(this.data.value);
      this.data.groups.forEach((group) => {
        group.items.forEach((btn) => {
          btn.selected = false;
        });
      });
    }
    this.update();
  }

  hideSource() {
    this.data.showSource = false;
    this.update();
  }

  insertExtend(txt) {
    return txt.replace(/text_tag/g, 'text_extend_tag');
  }

  format(txt) {
    if (!txt) {
      return '';
    }
    let replaced = txt
      .replace(/<br>( *)/g, '\n')
      .replace(/<br>/g, '\n')
      .replace(/&nbsp;/g, ' ')
      .replace(/<script/g, '&lt;script')
      .replace(/script>/g, 'script&gt;')
      .replace(/( +)/g, (a) => {
        const length = a.length;
        let ret = '';
        for (let i = 0; i < length; i += 1) {
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

  changeOption() {
    const value = this.e.target.value;
    if (!value) {
      return;
    }
    const item = this.data.selectOptions.find((option => option.value === value));
    if (item) {
      this.data.extendLabel = item.extendLabel;
      this.update('html', '[data-selector="lite-editor-toolbox"]');
      if (item.onSelect) {
        this.data.selectedOption = item.value;
        item.onSelect(this);
      }
    }
  }
}
