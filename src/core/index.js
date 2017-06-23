import aTemplate from 'a-template';
import template from './viwer.html';

const util = require('../lib/util');
const Entities = require('html-entities').XmlEntities;
const entities = new Entities();
const toMarkdown = require('to-markdown');

const defaults = {
	mode: 'html',
	classNames: {
		MiniEditor: 'minieditor'
	},
	message: {
		addLinkBtn: 'add link',
		addLinkTitle: 'Add Link',
		addItalicBtn: 'add italic',
	}
}

class MiniEditor extends aTemplate {

  constructor(ele, settings) {
    super();
		this.data = util.extend({}, defaults, settings);
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

	addItalic() {
		document.execCommand('italic');
	}

	addBold() {
		document.execCommand('bold');
	}

	unlink() {
		document.execCommand('unlink');
	}

	onUpdated() {
		this.onInput();
	}

	onInput() {
		const editor = this._getElementByQuery(`.${this.data.classNames.MiniEditor}`);
		this.data.value = entities.decode(editor.innerHTML);
		this.selector.value = this.data.value;
	}

	changeMode(mode) {
		this.data.mode = mode;
	}
}

module.exports = MiniEditor;
