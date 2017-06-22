'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _aTemplate2 = require('a-template');

var _aTemplate3 = _interopRequireDefault(_aTemplate2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var template = '<div class="\\{classNames.MiniEditorBtnGroup\\}">\n    <button class="\\{classNames.MiniEditorBtn\\}" data-action-click="addLink">\\{message.addLinkBtn\\}</button>\n    <button class="\\{classNames.MiniEditorBtn\\}" data-action-click="addItalic">\\{message.addItalicBtn\\}</button>\n</div>\n<div class="\\{classNames.MiniEditor\\}" contenteditable data-action-input="onInput">\n</div>\n';


var util = require('../lib/util');
var Entities = require('html-entities').XmlEntities;
var entities = new Entities();
var toMarkdown = require('to-markdown');

var defaults = {
	mode: 'html',
	classNames: {
		MiniEditor: 'minieditor'
	},
	message: {
		addLinkBtn: 'add link',
		addLinkTitle: 'Add Link',
		addItalicBtn: 'add italic'
	}
};

var MiniEditor = function (_aTemplate) {
	_inherits(MiniEditor, _aTemplate);

	function MiniEditor(ele, settings) {
		_classCallCheck(this, MiniEditor);

		var _this = _possibleConstructorReturn(this, (MiniEditor.__proto__ || Object.getPrototypeOf(MiniEditor)).call(this));

		_this.data = util.extend({}, defaults, settings);
		_this.id = _this._getUniqId();
		_this.addTemplate(_this.id, template);
		var selector = typeof ele === 'string' ? document.querySelector(ele) : ele;
		_this.selector = selector;
		var html = '<div data-id=\'' + _this.id + '\'></div>';
		selector.style.display = 'none';
		util.before(selector, html);
		_this.update();
		return _this;
	}

	_createClass(MiniEditor, [{
		key: '_getUniqId',
		value: function _getUniqId() {
			return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
		}
	}, {
		key: '_getElementByQuery',
		value: function _getElementByQuery(query) {
			return document.querySelector('[data-id=\'' + this.id + '\'] ' + query);
		}
	}, {
		key: 'addLink',
		value: function addLink() {
			var url = prompt(this.data.message.addLinkTitle, 'http://');
			document.execCommand('createlink', true, url);
		}
	}, {
		key: 'addItalic',
		value: function addItalic() {
			document.execCommand('italic');
		}
	}, {
		key: 'unlink',
		value: function unlink() {
			document.execCommand('unlink');
		}
	}, {
		key: 'onUpdated',
		value: function onUpdated() {
			this.onInput();
		}
	}, {
		key: 'onInput',
		value: function onInput() {
			var editor = this._getElementByQuery('.' + this.data.classNames.MiniEditor);
			this.data.value = entities.decode(editor.innerHTML);
			if (this.data.mode === 'markdown') {
				this.selector.value = toMarkdown(this.data.value);
			} else {
				this.selector.value = this.data.value;
			}
		}
	}, {
		key: 'changeMode',
		value: function changeMode(mode) {
			this.data.mode = mode;
		}
	}]);

	return MiniEditor;
}(_aTemplate3.default);

module.exports = MiniEditor;