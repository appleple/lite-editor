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
  hideEditor: false,
  btnPosition: 'top'
}

export default class SimpleWysiwyg extends aTemplate {

  constructor(ele, settings) {
    super();
    this.data = extend({}, defaults, settings);
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
    if (this._isFocused()) {
      util.replaceSelectionWithHtml(html);
      const editor = this._getElementByQuery(`[data-selector="simple-wysiwyg"]`);
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
    const selector = this._getElementByQuery(`[data-selector="simple-wysiwyg"]`);
    return selector !== document.activeElement;
  }

  insertTag(tag, className) {
    const data = this.data;
    const mode = data.mode;
    let classAttr = '';
    let link = '';
    if (className) {
      classAttr = ` class="${className}"`;
    }
    if (tag === 'a') {
      link = ` href="${prompt(data.message.addLinkTitle, 'http://')}"`;
    }
    if (!this._isFocused()) {
      return;
    }
    const selection = util.getSelection();
    if (!selection) {
      alert(data.message.noRangeSelected);
      return;
    }
    const insertHtml = `<${tag}${link}${classAttr}>${selection}</${tag}>`;
    if(this.data.mode === 'markdown') {
      und.convert(insertHtml, (err, markdown) => {
        this.insertHtml(markdown.replace(/\r\n|\r|\n/g,'<br/>'));
      });
    } else {
      this.insertHtml(insertHtml.replace(/\r\n|\r|\n/g,'<br/>'));
    }
  }

  onClick(i) {
    const number = parseInt(i, 10);
    if(this.data.btnOptions[number].onClick) {
      this.data.btnOptions[number].onClick.apply(this);
    }
  }

  onUpdated() {
    this.onInput();
  }

  onInput() {
    const editor = this._getElementByQuery(`[data-selector="simple-wysiwyg"]`);
    this.data.value = editor.innerHTML;
    if(this.selector) {
      this.selector.value = this.format(this.data.value);
    }
  }

  onPaste() {
    const e = this.e;
    e.preventDefault();
    const insertText = e.clipboardData.getData('text/plain');
    if (this._isFocused()) {
      document.execCommand('insertText', false, insertText);
    }
  }

  onPutCaret() {
    const btnOptions = this.data.btnOptions;
    btnOptions.forEach(btn => {
      
    });
  }

  redo() {
    document.execCommand('redo', false);
  }

  undo() {
    document.execCommand('undo', false);
  }

  changeMode(mode) {
    this.data.mode = mode;
  }

  toggleSource() {
    const source = this.data.showSource;
    this.data.showSource = !source;
    this.update();
  }

  directInput() {
    this.data.value = this.e.target.value;
  }

  format(txt) {
    const decoded = entities.decode(txt);
    return decoded.replace(/<br>/g,'\n').replace(/^([\t ])*\n/gm,"");
  }

  toMarkdown() {
    this.data.mode = 'markdown';
    und.convert(this.data.value, (err, markdown) => {
      this.data.value = markdown;
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
      item.onSelect.apply(this);
    }
  }
}
