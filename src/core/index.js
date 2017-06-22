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
		const url = prompt(this.data.message.addLinkTitle, 'http://');
		document.execCommand('createlink', true, url);
	}

	addItalic() {
		document.execCommand('italic');
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
		if (this.data.mode === 'markdown') {
			this.selector.value = toMarkdown(this.data.value);
		} else {
			this.selector.value = this.data.value;
		}
	}

	changeMode(mode) {
		this.data.mode = mode;
	}
}

module.exports = MiniEditor;
