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
    MiniEditorBtn: 'minieditor-btn',
    MiniEditorBtnGroup: 'minieditor-btn-group'
  },
  message: {
    addLinkTitle: 'Add Link',
    addLinkBtn: 'add link',
  },
  btnOptions: [],
  useLink: true,
  showSource: false
}

class MiniEditor extends aTemplate {

  constructor(ele, settings) {
    super();
    this.data = extend({}, defaults, settings);
    this.id = this._getUniqId();
    this.addTemplate(this.id, template);
    const selector = typeof ele === 'string' ? document.querySelector(ele) : ele;
    this.selector = selector;
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
      const insertText = `[${selection}](${url}]`;
      document.execCommand('insertText', false, insertText);
    }
  }

  unlink() {
    document.execCommand('unlink');
  }

  insertTag(tag, className) {
    const data = this.data;
    const mode = data.mode;
    let classAttr = '';
    if (className) {
      classAttr = ` class="${className}"`;
    }
    if (mode === 'html') {
      const selection = document.getSelection();
      const insertHtml = `<${tag}${classAttr}>${selection}</${tag}>`;
      document.execCommand('insertHtml', false, insertHtml);
    }
  }

  onUpdated() {
    this.onInput();
  }

  onInput() {
    const editor = this._getElementByQuery(`.${this.data.classNames.MiniEditor}`);
    this.data.value = entities.decode(editor.innerHTML);
    this.selector.value = this.data.value;
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
}

module.exports = MiniEditor;
