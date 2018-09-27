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

var getSelection = exports.getSelection = function getSelection(ele) {
  if (window.getSelection && window.getSelection().toString()) {
    return window.getSelection();
  } else if (document.getSelection && document.getSelection().toString()) {
    return document.getSelection();
  } else if (ele && typeof ele.selectionStart === 'number') {
    return ele.value.substr(ele.selectionStart, ele.selectionEnd - ele.selectionStart);
  }
  return '';
};

var saveSelection = exports.saveSelection = function saveSelection() {
  if (window.getSelection) {
    var sel = window.getSelection();
    if (sel.getRangeAt && sel.rangeCount) {
      return sel.getRangeAt(0);
    }
  } else if (document.selection && document.selection.createRange) {
    return document.selection.createRange();
  }
  return null;
};

var restoreSelection = exports.restoreSelection = function restoreSelection(range) {
  if (window.getSelection) {
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  } else if (document.selection && range.select) {
    range.select();
  }
};

var insertHtmlAtCursor = exports.insertHtmlAtCursor = function insertHtmlAtCursor(html) {
  var range = void 0;
  if (window.getSelection && window.getSelection().getRangeAt) {
    range = window.getSelection().getRangeAt(0);
    range.deleteContents();
    var div = document.createElement("div");
    div.innerHTML = html;
    var frag = document.createDocumentFragment(),
        child = void 0;
    while (child = div.firstChild) {
      frag.appendChild(child);
    }
    range.insertNode(frag);
  } else if (document.selection && document.selection.createRange) {
    range = document.selection.createRange();
    range.pasteHTML(html);
  }
};

var replaceSelectionWithHtml = exports.replaceSelectionWithHtml = function replaceSelectionWithHtml(html) {
  var range = void 0;
  if (window.getSelection && window.getSelection().getRangeAt) {
    var selection = window.getSelection();
    range = selection.getRangeAt(0);
    range.deleteContents();
    var div = document.createElement("div");
    div.innerHTML = html;
    var frag = document.createDocumentFragment();
    var child = void 0;
    while (child = div.firstChild) {
      frag.appendChild(child);
    }
    var temp = getFirstfirstElementChild(frag);
    var newrange = document.createRange();
    range.insertNode(temp);
    newrange.setStart(temp.firstChild, 0);
    newrange.setEnd(temp.lastChild, temp.lastChild.textContent.length);
    clearSelection();
    selection.addRange(newrange);
  } else if (document.selection && document.selection.createRange) {
    range = document.selection.createRange();
    range.pasteHTML(html);
  }
};

var moveCaretAfter = exports.moveCaretAfter = function moveCaretAfter(node) {
  if (window.getSelection && window.getSelection().getRangeAt) {
    var selection = window.getSelection();
    var range = selection.getRangeAt(0);
    var newnode = node.cloneNode(true);
    var frag = document.createDocumentFragment();
    node.remove();
    frag.appendChild(newnode);
    var lastChild = frag.appendChild(document.createTextNode('\u200B'));
    var newrange = document.createRange();
    range.insertNode(frag);
    newrange.setStartAfter(lastChild);
    newrange.setEndAfter(lastChild);
    selection.removeAllRanges();
    selection.addRange(newrange);
  }
};

var unwrapTag = exports.unwrapTag = function unwrapTag(element) {
  var parent = element.parentNode;
  while (element.firstChild) {
    parent.insertBefore(element.firstChild, element);
  }
  parent.removeChild(element);
};

var getElementBySelection = exports.getElementBySelection = function getElementBySelection() {
  if (window.getSelection) {
    var selection = window.getSelection();
    if (selection.rangeCount > 0) {
      return selection.getRangeAt(0).startContainer.parentNode;
    }
  } else if (document.selection) {
    return document.selection.createRange().parentElement();
  }
};

var clearSelection = exports.clearSelection = function clearSelection() {
  if (window.getSelection) {
    if (window.getSelection().empty) {
      // Chrome
      window.getSelection().empty();
    } else if (window.getSelection().removeAllRanges) {
      // Firefox
      window.getSelection().removeAllRanges();
    }
  } else if (document.selection) {
    // IE?
    document.selection.empty();
  }
};

var replaceSelectionWithText = exports.replaceSelectionWithText = function replaceSelectionWithText(ele, text) {
  var selectionStart = ele.selectionStart;
  ele.value = '' + ele.value.substring(0, selectionStart) + text + ele.value.substring(ele.selectionEnd);
  ele.focus();
  ele.setSelectionRange(selectionStart, selectionStart + text.length);
};

var getSelectionLength = exports.getSelectionLength = function getSelectionLength() {
  if (window.getSelection) {
    return window.getSelection().toString().length;
  } else if (document.selection) {
    return document.selection().toString().length;
  }
};

var setCaretPos = exports.setCaretPos = function setCaretPos(el, pos, length) {
  // Loop through all child nodes
  var nodes = [].slice.call(el.childNodes);
  for (var i = 0, n = nodes.length; i < n; i++) {
    var node = nodes[i];
    if (node.nodeType === 3) {
      // we have a text node
      if (node.length >= pos) {
        // finally add our range
        var range = document.createRange();
        var sel = window.getSelection();

        if (length) {
          range.setStart(node, 0);
          range.setEnd(node, length);
        } else {
          range.setStart(node, pos);
          range.collapse(true);
        }
        sel.removeAllRanges();
        sel.addRange(range);
        return -1; // we are done
      } else {
        pos -= node.length;
      }
    } else {
      pos = setCaretPos(node, pos);
      if (pos === -1) {
        return -1; // no need to finish the for loop
      }
    }
  }
  return pos; // needed because of recursion stuff
};

var replaceWhiteSpaceWithNbsp = exports.replaceWhiteSpaceWithNbsp = function replaceWhiteSpaceWithNbsp(el) {
  // Loop through all child nodes
  var nodes = [].slice.call(el.childNodes);
  for (var i = 0, n = nodes.length; i < n; i++) {
    var node = nodes[i];
    if (node.nodeType === 3) {
      // we have a text node
      node.textContent = node.textContent.replace(/ /g, '\xA0');
    }
  }
};

var getCaretPos = exports.getCaretPos = function getCaretPos(element) {
  var caretOffset = 0;
  if (window.getSelection) {
    var range = window.getSelection().getRangeAt(0);
    var preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(element);
    preCaretRange.setEnd(range.endContainer, range.endOffset);
    caretOffset = preCaretRange.toString().length;
  } else if (document.selection && document.selection.createRange) {
    var textRange = document.selection.createRange();
    var preCaretTextRange = document.body.createTextRange();
    preCaretTextRange.moveToElementText(element);
    preCaretTextRange.setEndPoint("EndToEnd", textRange);
    caretOffset = preCaretTextRange.text.length;
  }
  return caretOffset;
};

var hasLastBr = exports.hasLastBr = function hasLastBr(element) {
  var childNodes = element.childNodes;
  var length = childNodes.length;
  var offset = 1;
  if (!childNodes[length - offset]) {
    return false;
  }
  return childNodes[length - offset].tagName === 'BR';
};

var removeIndentNewline = exports.removeIndentNewline = function removeIndentNewline(str) {
  return str.replace(/(\n|\t)/g, '');
};

var getBrowser = exports.getBrowser = function getBrowser() {
  var ua = window.navigator.userAgent.toLowerCase();
  var ver = window.navigator.appVersion.toLowerCase();
  var name = 'unknown';

  if (ua.indexOf('msie') != -1) {
    if (ver.indexOf('msie 6.') != -1) {
      name = 'ie6';
    } else if (ver.indexOf('msie 7.') != -1) {
      name = 'ie7';
    } else if (ver.indexOf('msie 8.') != -1) {
      name = 'ie8';
    } else if (ver.indexOf('msie 9.') != -1) {
      name = 'ie9';
    } else if (ver.indexOf('msie 10.') != -1) {
      name = 'ie10';
    } else {
      name = 'ie';
    }
  } else if (ua.indexOf('trident/7') != -1) {
    name = 'ie11';
  } else if (ua.indexOf('chrome') != -1) {
    name = 'chrome';
  } else if (ua.indexOf('safari') != -1) {
    name = 'safari';
  } else if (ua.indexOf('opera') != -1) {
    name = 'opera';
  } else if (ua.indexOf('firefox') != -1) {
    name = 'firefox';
  }
  return name;
};

var getFirstfirstElementChild = exports.getFirstfirstElementChild = function getFirstfirstElementChild(ele) {
  var node = void 0;
  var nodes = ele.childNodes;
  var i = 0;
  if (nodes && nodes.length) {
    while (node = nodes[i++]) {
      if (node.nodeType === 1) {
        return node;
      }
    }
  }
  return null;
};