import aTemplate from 'a-template';
import template from './viwer.html';
import extend from 'deep-extend';

import * as util from '../lib/util';

const Entities = require('html-entities').XmlEntities;
const entities = new Entities();
const toMarkdown = require('to-markdown');

const defaults = {
  mode: 'html',
  classNames: {
    MiniEditor: 'minieditor',
    MiniEditorSource: 'minieditor-source',
    MiniEditorBtn: 'minieditor-btn',
    MiniEditorBtnActive: 'minieditor-btn-active',
    MiniEditorBtnGroup: 'minieditor-btn-group'
  },
  message: {
    addLinkTitle: 'Add Link',
    addLinkBtn: 'add link',
    sourceBtn: 'source',
    resetStyleBtn: 'reset'
  },
  btnOptions: [],
  useLink: true,
  showSource: false
}

export default class MiniEditor extends aTemplate {

  constructor(ele, settings) {
    super();
    this.data = extend({}, defaults, settings);
    this.id = this._getUniqId();
    this.addTemplate(this.id, template);
    const selector = typeof ele === 'string' ? document.querySelector(ele) : ele;
    this.selector = selector;
    this.convert = {
      format:this.format
    }
    if(selector.value) {
      this.data.value = selector.value.replace(/\r\n|\r|\n/g,'<br/>');
    }
    const html = `<div data-id='${this.id}'></div>`;
    selector.style.display = 'none';
    util.before(selector, html);
    this.update();
  }

  _getUniqId() {
    return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
  }

  _getElementByQuery(query) {
    return document.querySelector(`[data-id='${this.id}'] ${query}`);
  }

  addLink() {
    const data = this.data;
    const mode = data.mode;
    const url = prompt(data.message.addLinkTitle, 'http://');
    if (mode === 'html') {
      document.execCommand('createlink', true, url);
    } else if (mode === 'markdown') {
      const selection = document.getSelection();
      const insertText = `[${selection}](${url})`;
      document.execCommand('insertText', false, insertText);
    }
  }

  resetStyle() {
    const data = this.data;
    const mode = data.mode;
    if (mode === 'html') {
      const selection = util.getSelection();
      const insertText = `${selection}`.replace(/<[^>]*>/g, "");
      document.execCommand('insertText', false, insertText);
    }
  }

  insertTag(tag, className) {
    const data = this.data;
    const mode = data.mode;
    let classAttr = '';
    if (className) {
      classAttr = ` class="${className}"`;
    }
    if (mode === 'html') {
      const selection = util.getSelection();
      const insertHtml = `<${tag}${classAttr}>${selection}</${tag}>`;
      document.execCommand('insertHtml', false, insertHtml.replace(/\r\n|\r|\n/g,'<br/>'));
    }
  }

  onUpdated() {
    this.onInput();
  }

  onInput() {
    const editor = this._getElementByQuery(`.${this.data.classNames.MiniEditor}`);
    this.data.value = editor.innerHTML;
    this.selector.value = this.format(this.data.value);
  }

  onPaste() {
    const e = this.e;
    e.preventDefault();
    const insertText = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, insertText);
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
    const decoded = entities.decode(txt);
    return decoded.replace(/<br>/g,'\n');
  }
}
