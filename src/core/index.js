import aTemplate from 'a-template';
import extend from 'deep-extend';
import editorHtml from './editor.html';
import btnHtml from './btn.html';
import tooltipHtml from './tooltip.html';
import * as util from '../lib/util';

const Entities = require('html-entities').XmlEntities;
const Upndown = require('upndown');
const Showdown = require('showdown');

const entities = new Entities();
const converter = new Showdown.Converter();
const und = new Upndown({ decodeEntities: false });

const defaultbtnOptions = [
  {
    label: '<i class="fa fa-code"></i>',
    action: 'preview',
    group: 'action'
  },
  {
    label: '<i class="fa fa-rotate-left"></i>',
    action: 'undo',
    group: 'action'
  },
  {
    label: '<i class="fa fa-rotate-right"></i>',
    action: 'redo',
    group: 'action'
  },
  {
    label: '<i class="fa fa-link"></i>',
    tag: 'a',
    className: '',
    group: 'mark',
    sampleText: 'link text'
  },
  {
    label: '<i class="fa fa-bold"></i>',
    tag: 'strong',
    className: '',
    group: 'mark',
    sampleText: 'strong text'
  },
  {
    label: '<i class="fa fa-italic"></i>',
    tag: 'i',
    className: '',
    group: 'mark',
    sampleText: 'italic text'
  },
  {
    label: '<i class="fa fa-underline"></i>',
    tag: 'u',
    className: '',
    group: 'mark',
    sampleText: 'underline'
  },
  {
    label: '<i class="fa fa-align-left"></i>',
    tag: 'div',
    className: 'left',
    group: 'align'
  },
  {
    label: '<i class="fa fa-align-center"></i>',
    tag: 'div',
    className: 'center',
    group: 'align'
  },
  {
    label: '<i class="fa fa-align-right"></i>',
    tag: 'div',
    className: 'right',
    group: 'align'
  },
];

const defaults = {
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
    SimpleWysiwygTooltipInput: 'simple-wysiwyg-tooltip-input',
    SimpleWysiwygExtendInput: 'simple-wysiwyg-extend-input',
  },
  message: {
    addLinkTitle: 'Add Link',
    updateLinkTitle: 'Update Link',
    addLink: 'add',
    updateLink: 'update',
    removeLink: 'remove',
    linkUrl: 'URL',
    linkLabel: 'label'
  },
  maxHeight: null,
  minHeight: null,
  escapeNotRegisteredTags: false,
  selectOptions: [],
  selectedOption: '',
  btnOptions: defaultbtnOptions,
  btnPosition: 'top'
};

export default class SimpleWysiwyg extends aTemplate {

  constructor(ele, settings) {
    super();
    this.data = extend({}, defaults, settings);
    this.data.showSource = false;
    this.data.hideEditor = false;
    this.data.groups = this.makeBtnGroups();
    this.id = this._getUniqId();
    let template = '';
    if (this.data.btnPosition === 'bottom') {
      template = `${editorHtml}${btnHtml}`;
    } else {
      template = `${btnHtml}${editorHtml}`;
    }
    template += `${tooltipHtml}`;
    this.addTemplate(this.id, template);
    const selector = typeof ele === 'string' ? document.querySelector(ele) : ele;
    this.convert = {
      format: this.format,
      insertExtend: this.insertExtend
    };
    if (selector.value) {
      this.data.value = selector.value.replace(/\r\n|\r|\n/g, '<br>');
      if (this.data.escapeNotRegisteredTags) {
        this.escapeNotRegisteredTags();
      }
    }
    let attrStr = '';
    if (selector.attributes) {
      [].forEach.call(selector.attributes, (attr) => {
        attrStr += ` ${attr.nodeName}="${attr.nodeValue}"`;
      });
    }
    if (!this.data.selectedOption && this.data.selectOptions && this.data.selectOptions[0] && this.data.selectOptions[0].value) {
      this.data.selectedOption = this.data.selectOptions[0].value;
    }
    this.data.attr = attrStr;
    this.data.tooltipLabel = '';
    this.data.tooltipUrl = '';
    this.data.tooltipClassName = '';
    this.data.linkNew = true;
    this.stack = [];
    this.stackPosition = 0;
    const html = `<div data-id='${this.id}'></div>`;
    selector.style.display = 'none';
    util.before(selector, html);
    util.removeElement(selector);
    this.update();
    this.selector = this._getElementByQuery('[data-selector="simple-wysiwyg-source"]');
    const item = this.data.selectOptions.find((option => option.value === this.data.selectedOption));
    if (item) {
      this.data.extendLabel = item.extendLabel;
      if (item.onSelect) {
        item.onSelect(this);
      }
    }
    if (this.data.afterInit) {
      this.data.afterInit(this);
    }
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

  _escapeTagExceptRegisteredTags(value) {
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
        content = this._escapeTagExceptRegisteredTags(content);
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

  escapeNotRegisteredTags() {
    this.data.value = this._escapeTagExceptRegisteredTags(this.data.value);
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
    const editor = this._getElementByQuery('[data-selector="simple-wysiwyg"]');
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
    const selector = this._getElementByQuery('[data-selector="simple-wysiwyg"]');
    return selector === document.activeElement;
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
    const insertHtml = `<${tag}${classAttr}>${selection}</${tag}>`;
    if (this.data.mode === 'markdown') {
      und.convert(insertHtml, (err, markdown) => {
        this.insertHtml(markdown.replace(/\r\n|\r|\n/g, '<br>'));
      });
    } else {
      this.insertHtml(insertHtml.replace(/\r\n|\r|\n/g, '<br>'));
    }
    this.updateToolBox();
  }

  showLinkDialog(text, className) {
    this.data.tooltipLabel = text;
    this.data.tooltipClassName = className;
    this.data.linkNew = true;
    this.update('html', '[data-selector="simple-wysiwyg-tooltip"]');
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
    if (this.data.mode === 'markdown') {
      und.convert(insertHtml, (err, markdown) => {
        this.insertHtml(markdown.replace(/\r\n|\r|\n/g, '<br>'));
      });
    } else {
      this.insertHtml(insertHtml.replace(/\r\n|\r|\n/g, '<br>'));
    }
    this.updateToolBox();
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
    const editor = this._getElementByQuery('[data-selector="simple-wysiwyg"]');
    data.canUndo = this.canUndo();
    data.canRedo = this.canRedo();
    data.formatedValue = this.format(data.value);
    if (data.value) {
      data.value = data.value.replace(/{(.*?)}/g, '&lcub;$1&rcub;');
    }
    if (!data.showSource && editor && editor.offsetHeight) {
      data.sourceHeight = editor.offsetHeight;
    }
  }

  onUpdated() {
    const editor = this._getElementByQuery('[data-selector="simple-wysiwyg"]');
    if (!editor) {
      return;
    }
    this.saveSelection();
    this.data.value = editor.innerHTML;
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
  }

  redo() {
    if (!this.canRedo()) {
      return;
    }
    this.stackPosition += 1;
    this.data.value = this.stack[this.stackPosition];
    this.stopStack = true;
    this.update();
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
  }

  canUndo() {
    if (this.stackPosition > 0) {
      return true;
    }
    return false;
  }

  onInput() {
    const editor = this._getElementByQuery('[data-selector="simple-wysiwyg"]');
    const textarea = this._getElementByQuery('[data-selector="simple-wysiwyg-source"]');
    this.data.value = editor.innerHTML;
    this.data.formatedValue = this.format(this.data.value);
    textarea.value = this.data.formatedValue;
  }

  onDirectInput() {
    const textarea = this._getElementByQuery('[data-selector="simple-wysiwyg-source"]');
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  onPaste() {
    const e = this.e;
    const editor = this._getElementByQuery('[data-selector="simple-wysiwyg"]');
    const textarea = this._getElementByQuery('[data-selector="simple-wysiwyg-source"]');
    e.preventDefault();
    const insertText = e.clipboardData.getData('text/plain');
    if (this._isFocused() && insertText) {
      this.insertHtml(insertText.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>').replace(/\s/g, '&nbsp;'));
      this.data.value = editor.innerHTML;
      this.data.formatedValue = this.format(this.data.value);
      textarea.value = this.data.formatedValue;
    }
  }

  onKeyDown() {
    const editor = this._getElementByQuery('[data-selector="simple-wysiwyg"]');
    const textarea = this._getElementByQuery('[data-selector="simple-wysiwyg-source"]');
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
    if (e.keyCode !== 13) {
      e.preventDefault();
    }
  }

  onPutCaret() {
    setTimeout(() => {
      const target = this.getSelectionNode();
      const tags = [];
      const editor = this._getElementByQuery('[data-selector="simple-wysiwyg"]');
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
    this.update('html', '[data-selector="simple-wysiwyg-toolbox"]');
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
    this.update('html', '[data-selector="simple-wysiwyg-tooltip"]');
  }

  closeTooltip() {
    this.data.tooltipLabel = '';
    this.data.tooltipUrl = '';
    this.data.tooltipClassName = '';
    this.update('html', '[data-selector="simple-wysiwyg-tooltip"]');
  }

  updateLink() {
    const editor = this._getElementByQuery('[data-selector="simple-wysiwyg"]');
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
    const editor = this._getElementByQuery('[data-selector="simple-wysiwyg"]');
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
    const editor = this._getElementByQuery('[data-selector="simple-wysiwyg"]');
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
    .replace(/<p[^<]*?>(([\n\r\t]|.)*?)<\/p>/g, '$1\n')
    .replace(/<br>(\s*)/g, '\n')
    .replace(/<br>/g, '\n')
    .replace(/&nbsp;/g, ' ');
    if (replaced.slice(-1) === '\n') {
      replaced = replaced.slice(0, -1);
    }
    return entities.decode(replaced);
  }

  toMarkdown() {
    this.data.mode = 'markdown';
    und.convert(this.data.value, (err, markdown) => {
      this.data.value = markdown;
      this.data.value = this.data.value.replace(/\n/g, '<br>');
      this.update();
    });
  }

  toHtml() {
    this.data.mode = 'html';
    this.data.value = converter.makeHtml(this.data.value);
    this.data.value = this.data.value.replace(/^<p>|<\/p>$/g, '');
    this.update();
  }

  changeOption() {
    const value = this.e.target.value;
    if (!value) {
      return;
    }
    const item = this.data.selectOptions.find((option => option.value === value));
    if (item) {
      this.data.extendLabel = item.extendLabel;
      this.update('html', '[data-selector="simple-wysiwyg-toolbox"]');
      if (item.onSelect) {
        this.data.selectedOption = item.value;
        item.onSelect(this);
      }
    }
  }
}
