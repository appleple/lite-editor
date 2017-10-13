import aTemplate from 'a-template';
import editorHtml from './editor.html';
import btnHtml from './btn.html';
import extend from 'deep-extend';

import * as util from '../lib/util';

const Entities = require('html-entities').XmlEntities;
const upndown = require('upndown');
const showdown = require('showdown');

const entities = new Entities();
const converter = new showdown.Converter();
const und = new upndown({decodeEntities: false});

const defaults = {
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
  maxHeight:100,
  minHeight:100,
  selectOptions: [],
  btnOptions: [],
  selectName: '',
  useLink: true,
  allowPreview: false,
  btnPosition: 'top'
}

export default class SimpleWysiwyg extends aTemplate {

  constructor(ele, settings) {
    super();
    this.data = extend({}, defaults, settings);
    this.data.showSource = false;
    this.data.hideEditor = false;
    this.id = this._getUniqId();
    let template = ``;
    if (this.data.btnPosition === 'bottom') {
      template = `${editorHtml}${btnHtml}`;
    } else {
      template = `${btnHtml}${editorHtml}`;
    }
    this.addTemplate(this.id, template);
    const selector = typeof ele === 'string' ? document.querySelector(ele) : ele;
    this.convert = {
      format:this.format
    }
    if(selector.value) {
      this.data.value = selector.value.replace(/\r\n|\r|\n/g,'<br/>');
    }
    let attrStr = '';
    if (selector.attributes){
      [].forEach.call(selector.attributes, attr => {
        attrStr += ` ${attr.nodeName}="${attr.nodeValue}"`;
      });
    }
    if (!this.data.selectedOption && this.data.selectOptions && this.data.selectOptions[0] && this.data.selectOptions[0].value) {
      this.data.selectedOption = this.data.selectOptions[0].value;
    }
    this.data.attr = attrStr;
    this.stack = [];
    this.stackPosition = 0;
    const html = `<div data-id='${this.id}'></div>`;
    selector.style.display = 'none';
    util.before(selector, html);
    util.removeElement(selector);
    this.update();
    this.selector = this._getElementByQuery(`[data-selector="simple-wysiwyg-source"]`);
    const item = this.data.selectOptions.find((item => item.value === this.data.selectedOption));
    if (item && item.onSelect) {
      item.onSelect.apply(this);
    }
    if(this.data.afterInit) {
      this.data.afterInit.apply(this);
    }
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
    const data = this.data;
    const mode = data.mode;
    const selection = util.getSelection();
    const insertText = `${selection}`.replace(/<[^>]*>/g, "");
    if (this._isFocused()) {
      document.execCommand('insertText', false, insertText);
    }
  }

  insertHtml(html) {
    util.replaceSelectionWithHtml(html);
    const editor = this._getElementByQuery(`[data-selector="simple-wysiwyg"]`);
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
    const selector = this._getElementByQuery(`[data-selector="simple-wysiwyg"]`);
    return selector !== document.activeElement;
  }

  insertTag(tag, className){
    const data = this.data;
    const mode = data.mode;
    let link = '';
    
    if (tag === 'a') {
      link = ` href="${prompt(data.message.addLinkTitle, 'http://')}"`;
    }

    const selection = util.getSelection();
    if (!selection) {
      alert(data.message.noRangeSelected);
      return;
    }
    let classAttr = '';
    if (className) {
      classAttr = ` class="${className}"`;
    }
    const insertHtml = `<${tag}${link}${classAttr}>${selection}</${tag}>`;
    if(this.data.mode === 'markdown') {
      und.convert(insertHtml, (err, markdown) => {
        this.insertHtml(markdown.replace(/\r\n|\r|\n/g,'<br/>'));
      });
    } else {
      this.insertHtml(insertHtml.replace(/\r\n|\r|\n/g,'<br/>'));
    }
    this.updateToolBox();
  }

  onClick(i) {
    const number = parseInt(i, 10);
    if(this.data.btnOptions[number].onClick) {
      this.data.btnOptions[number].onClick.apply(this);
    }
  }

  beforeUpdated() {
    this.data.canUndo = this.canUndo();
    this.data.canRedo = this.canRedo();
    this.data.formatedValue = this.format(this.data.value);
  }

  onUpdated() {
    const textarea = this._getElementByQuery(`[data-selector="simple-wysiwyg-source"]`);
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
    const editor = this._getElementByQuery(`[data-selector="simple-wysiwyg"]`);
    if(!editor) {
      return;
    }
    this.saveSelection();
    this.data.value = editor.innerHTML;
    if (this.stopStack) {
      this.stopStack = false;
    } else {
      if(`${this.stack[this.stackPosition - 1]}` !== `${this.data.value}`) {
        this.stack = this.stack.slice(0, this.stackPosition + 1);
        this.stack.push(this.data.value); 
        this.stackPosition++;
        if(this.selector) {
          this.selector.value = this.format(this.data.value);
        }
      }
    }
  }

  redo() {
    if (!this.canRedo()) {
      return;
    }
    this.stackPosition++;
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
    this.stackPosition--;
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
    this.update('html',`[data-selector="simple-wysiwyg-source"]`);
  }

  onDirectInput() {
    const textarea = this._getElementByQuery(`[data-selector="simple-wysiwyg-source"]`);
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  onPaste() {
    const e = this.e;
    e.preventDefault();
    const insertText = e.clipboardData.getData('text/plain');
    if (this._isFocused()) {
      document.execCommand('insertText', false, insertText);
    }
  }

  onKeyDown() {
    const e = this.e;
    if (e.keyCode !== 13) {
      this.onPutCaret();
      return;
    }
    const editor = this._getElementByQuery(`[data-selector="simple-wysiwyg"]`);
    const pos = util.getCaretPos(editor);
    this.insertHtml('<br> ');
    editor.focus();
    util.setCaretPos(editor, pos + 1);
    e.preventDefault();
  }

  onPutCaret() {
    setTimeout(() => {
      const target = this.getSelectionNode();
      const tags = [];
      const editor = this._getElementByQuery(`[data-selector="simple-wysiwyg"]`);
      if (target && target !== editor) {
        tags.push({tagName:target.tagName.toLowerCase(),className:target.getAttribute('class') || ''});
        let parent = target.parentElement;
        while (parent !== editor) {
          tags.push({
            tagName:parent.tagName.toLowerCase(),
            className:parent.getAttribute('class') || ''
          });
          parent = parent.parentElement;
        }
      }
      this.updateToolBox(tags);
    },1);
  }

  updateToolBox(tags = []) {
    const btnOptions = this.data.btnOptions;
    btnOptions.forEach(btn => {
      btn.selected = false;
      tags.forEach((tag) => {
        if (btn.tag === tag.tagName && btn.className === tag.className) {
          btn.selected = true;
        }
      });
    });
    this.saveSelection();
    this.update('html',`[data-selector="simple-wysiwyg-toolbox"]`);
  }

  getSelectionNode() {
    const node = document.getSelection().anchorNode;
    return (node.nodeType == 3 ? node.parentNode : node);
  }

  unwrapTag(tag, className) {
    const editor = this._getElementByQuery(`[data-selector="simple-wysiwyg"]`);
    const pos = util.getCaretPos(editor);
    let node = this.getSelectionNode();
    while (true) {
      const nodeClassName = node.getAttribute('class') || '';
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

  changeMode(mode) {
    this.data.mode = mode;
  }

  toggleSource() {
    const source = this.data.showSource;
    this.data.showSource = !source;
    this.update();
  }

  format(txt) {
    return txt
      .replace(/&nbsp;/g, ' ')
      .replace(/<br>/g, '\n');
  }

  toMarkdown() {
    this.data.mode = 'markdown';
    und.convert(this.data.value, (err, markdown) => {
      this.data.value = markdown;
      this.data.value = this.data.value.replace(/\n/g,'<br>');
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
    const item = this.data.selectOptions.find((item => item.value === value));
    if (item && item.onSelect) {
      this.data.selectedOption = item.value;
      item.onSelect.apply(this);
    }
  }
}
