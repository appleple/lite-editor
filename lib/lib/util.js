'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var isSmartPhone = exports.isSmartPhone = function isSmartPhone() {
  var agent = navigator.userAgent;
  if (agent.indexOf('iPhone') > 0 || agent.indexOf('iPad') > 0 || agent.indexOf('ipod') > 0 || agent.indexOf('Android') > 0) {
    return true;
  } else {
    return false;
  }
};

var triggerEvent = exports.triggerEvent = function triggerEvent(el, eventName, options) {
  var event = void 0;
  if (window.CustomEvent) {
    event = new CustomEvent(eventName, { cancelable: true });
  } else {
    event = document.createEvent('CustomEvent');
    event.initCustomEvent(eventName, false, false, options);
  }
  el.dispatchEvent(event);
};

var parseQuery = exports.parseQuery = function parseQuery(query) {
  var s = query.split('&'),
      data = {},
      i = 0,
      iz = s.length,
      param,
      key,
      value;
  for (; i < iz; i++) {
    param = s[i].split('=');
    if (param[0] !== void 0) {
      key = param[0];
      value = param[1] !== void 0 ? param.slice(1).join('=') : key;
      data[key] = decodeURIComponent(value);
    }
  }
  return data;
};

var getViewPos = exports.getViewPos = function getViewPos(element) {
  return {
    left: element.getBoundingClientRect().left,
    top: element.getBoundingClientRect().top
  };
};

var removeElement = exports.removeElement = function removeElement(element) {
  if (element && element.parentNode) {
    element.parentNode.removeChild(element);
  }
};

var append = exports.append = function append(element, string) {
  var parser = new DOMParser();
  var doc = parser.parseFromString(string, 'text/html');
  element.appendChild(doc.querySelector('body').childNodes[0]);
};

var addClass = exports.addClass = function addClass(element, className) {
  if (element.classList) {
    element.classList.add(className);
  } else {
    element.className += ' ' + className;
  }
};

var removeClass = exports.removeClass = function removeClass(element, className) {
  if (element.classList) {
    element.classList.remove(className);
  } else {
    element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  }
};

var before = exports.before = function before(el, html) {
  el.insertAdjacentHTML('beforebegin', html);
};

var getSelection = exports.getSelection = function getSelection() {
  var text = "";
  if (window.getSelection && window.getSelection().toString()) {
    text = window.getSelection();
    return text;
  } else if (document.getSelection && document.getSelection().toString()) {
    text = document.getSelection();
    return text;
  } else {
    var selection = document.selection && document.selection.createRange();

    if (!(typeof selection === "undefined") && selection.text && selection.text.toString()) {
      text = selection.text;
      return text;
    }
  }
  return false;
};