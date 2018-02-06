import aTemplate from 'a-template';
import extend from 'deep-extend';
import Upndown from 'upndown';
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
    sampleText: 'strong text'
  },
  {
    label: '<i class="lite-editor-font-italic"></i>',
    tag: 'i',
    className: '',
    group: 'mark',
    sampleText: 'italic text'
  },
  {
    label: '<i class="lite-editor-font-underline"></i>',
    tag: 'u',
    className: '',
    group: 'mark',
    sampleText: 'underline'
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
    closeLabel: 'close'
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
  btnPosition: 'top'
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
    this.data.linkNew = true;
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
      template = `${editorHtml}${btnHtml}${tooltipHtml}`;
    } else {
      template = `${btnHtml}${editorHtml}${tooltipHtml}`;
    }

    this.addTemplate(this.id, template);

    if (selector.value) {
      let value = selector.value;
      if (this.data.sourceFirst) {
        value = this.makeEditableHtml(value);
      }
      if (this.data.escapeNotRegisteredTags) {
        value = this.escapeNotRegisteredTags(value);
      }
      this.data.firstValue = selector.value;
      this.data.value = value;
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
    let selection = util.getSelection();
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
    this._fireEvent('insertTag');
  }

  showLinkDialog(text, className) {
    this.data.tooltipLabel = text;
    this.data.tooltipClassName = className;
    this.data.linkNew = true;
    this.update('html', '[data-selector="lite-editor-tooltip"]');
  }

  insertAtag() {
    this.restoreSelection();
    const label = this.data.tooltipLabel;
    const link = this.data.tooltipUrl;
    const className = this.data.tooltipClassName;
    let classAttr = '';
    if (className) {
      classAttr = ` class="${className}"`;
    }
    const insertHtml = `<a href="${link}"${classAttr}>${label}</a>`;
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
    if (this.data.btnOptions[number].onClick) {
      this.data.btnOptions[number].onClick(this);
    }
  }

  beforeUpdated() {
    const data = this.data;
    data.canUndo = this.canUndo();
    data.canRedo = this.canRedo();
    if (data.firstValue) {
      data.formatedValue = this.data.firstValue;
      data.firstValue = '';
    } else {
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
      if (this.selector) {
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

  onInput() {
    const editor = this._getElementByQuery('[data-selector="lite-editor"]');
    const textarea = this._getElementByQuery('[data-selector="lite-editor-source"]');
    this.data.value = editor.innerHTML;
    this.data.formatedValue = this.format(this.data.value);
    textarea.value = this.data.formatedValue;
  }

  onPaste() {
    const e = this.e;
    const editor = this._getElementByQuery('[data-selector="lite-editor"]');
    const textarea = this._getElementByQuery('[data-selector="lite-editor-source"]');
    e.preventDefault();
    const insertText = e.clipboardData.getData('text/plain');
    if (this._isFocused() && insertText) {
      this.insertHtml(insertText.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>').replace(/\s/g, '&nbsp;'));
      this.data.value = editor.innerHTML;
      this.data.formatedValue = this.format(this.data.value);
      textarea.value = this.data.formatedValue;
    }
    this._fireEvent('paste');
  }

  onKeyDown() {
    const editor = this._getElementByQuery('[data-selector="lite-editor"]');
    const textarea = this._getElementByQuery('[data-selector="lite-editor-source"]');
    const e = this.e;

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

    const pos = util.getCaretPos(editor);
    // on purpose
    this.insertHtml('<br> ');
    editor.innerHTML = editor.innerHTML.replace(/<br> <\/(.*?)>/g, '</$1><br> ');
    this.data.value = editor.innerHTML;
    this.data.formatedValue = this.format(this.data.value);
    editor.scrollTop = editor.scrollHeight;
    textarea.value = this.data.formatedValue;
    editor.focus();
    util.setCaretPos(editor, pos + 1);
    e.preventDefault();
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
    } else {
      this.data.linkNew = false;
      this.data.tooltipLabel = item.innerHTML;
      this.data.tooltipUrl = item.getAttribute('href');
      this.savedLinkNode = item;
    }
    this.update('html', '[data-selector="lite-editor-tooltip"]');
  }

  closeTooltip() {
    this.data.tooltipLabel = '';
    this.data.tooltipUrl = '';
    this.data.tooltipClassName = '';
    this.update('html', '[data-selector="lite-editor-tooltip"]');
  }

  updateLink() {
    const editor = this._getElementByQuery('[data-selector="lite-editor"]');
    const pos = util.getCaretPos(editor);
    const label = this.data.tooltipLabel;
    const url = this.data.tooltipUrl;
    const node = this.savedLinkNode;
    node.setAttribute('href', url);
    node.innerHTML = label;
    this.data.value = editor.innerHTML;
    editor.focus();
    util.setCaretPos(editor, pos);
    this.onPutCaret();
    this.closeTooltip();
  }

  removeLink() {
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
    let node = this.getSelectionNode();
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
    util.setCaretPos(editor, pos);
    this.onPutCaret();
    this._fireEvent('unwrapTag');
  }

  changeMode(mode) {
    this.data.mode = mode;
  }

  toggleSource() {
    const source = this.data.showSource;
    this.data.showSource = !source;
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
    .replace(/<br>(\s*)/g, '\n')
    .replace(/<br>/g, '\n')
    .replace(/&nbsp;/g, ' ')
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
    }
    if (this.data.nl2br) {
      replaced = replaced.replace(/\n/g, '<br>\n');
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
