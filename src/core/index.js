import aTemplate from 'a-template';
import template from './viwer.html';

const util = require('../lib/util');

const defaults = {
};

class MiniEditor extends aTemplate {

  constructor(selector, settings) {
    super();
		this.data = util.extend({}, defaults, settings);
		this.id = this._getUniqId();
		this.addTemplate(this.id, template);
		const ele = document.querySelector(selector);
		const html = `<div data-id='${this.id}'></div>`;
		util.before(selector, html);
		this.update();
  }

 _getUniqId() {
    return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
  }

}

module.exports = MiniEditor;
