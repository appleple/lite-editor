export const isSmartPhone = () => {
  const agent = navigator.userAgent
  if (agent.indexOf('iPhone') > 0 || agent.indexOf('iPad') > 0
    || agent.indexOf('ipod') > 0 || agent.indexOf('Android') > 0) {
    return true
  } else {
    return false
  }
}

export const triggerEvent = (el, eventName, options) => {
  let event;
  if (window.CustomEvent) {
    event = new CustomEvent(eventName, { cancelable: true });
  } else {
    event = document.createEvent('CustomEvent');
    event.initCustomEvent(eventName, false, false, options);
  }
  el.dispatchEvent(event);
}

export const parseQuery = (query) => {
  var s = query.split('&'),
    data = {},
    i = 0,
    iz = s.length,
    param, key, value;
  for (; i < iz; i++) {
    param = s[i].split('=');
    if (param[0] !== void 0) {
      key = param[0];
      value = (param[1] !== void 0) ? param.slice(1).join('=') : key;
      data[key] = decodeURIComponent(value);
    }
  }
  return data;
}

export const getViewPos = (element) => {
  return {
    left: element.getBoundingClientRect().left,
    top: element.getBoundingClientRect().top,
  }
}

export const removeElement = (element) => {
  if (element && element.parentNode) {
    element.parentNode.removeChild(element);
  }
}

export const append = (element, string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(string, 'text/html');
  element.appendChild(doc.querySelector('body').childNodes[0]);
}

export const addClass = (element, className) => {
  if (element.classList) {
    element.classList.add(className);
  } else {
    element.className += ` ${className}`;
  }
}

export const removeClass = (element, className) => {
  if (element.classList) {
    element.classList.remove(className);
  } else {
    element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  }
}

export const before = (el, html) => {
  el.insertAdjacentHTML('beforebegin', html);
}

export const getSelection = () => {
  let text = "";
  if (window.getSelection && window.getSelection().toString()) {
    text = window.getSelection();
    return text;
  } else if (document.getSelection && document.getSelection().toString()) {
    text = document.getSelection();
    return text;
  } else {
    const selection = document.selection && document.selection.createRange();

    if (!(typeof selection === "undefined")
      && selection.text
      && selection.text.toString()) {
      text = selection.text;
      return text;
    }
  }
  return false;
}


export const saveSelection = () => {
  if (window.getSelection) {
    const sel = window.getSelection();
    if (sel.getRangeAt && sel.rangeCount) {
      return sel.getRangeAt(0);
    }
  } else if (document.selection && document.selection.createRange) {
    return document.selection.createRange();
  }
  return null;
}

export const restoreSelection = (range) => {
  if (window.getSelection) {
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  } else if (document.selection && range.select) {
    range.select();
  }
}

export const replaceSelectionWithHtml = (html) => {
  let range;
  if (window.getSelection && window.getSelection().getRangeAt) {
    range = window.getSelection().getRangeAt(0);
    range.deleteContents();
    const div = document.createElement("div");
    div.innerHTML = html;
    let frag = document.createDocumentFragment(), child;
    while ((child = div.firstChild)) {
      frag.appendChild(child);
    }
    range.insertNode(frag);
  } else if (document.selection && document.selection.createRange) {
    range = document.selection.createRange();
    range.pasteHTML(html);
  }
}

export const unwrapTag = (element) => {
  const parent = element.parentNode;
  while (element.firstChild) {
    parent.insertBefore(element.firstChild, element);
  }
  parent.removeChild(element);
}

export const setCaretPos = (el, pos) => {
  // Loop through all child nodes
  for (const node of el.childNodes) {
    if (node.nodeType === 3) { // we have a text node
      if (node.length >= pos) {
        // finally add our range
        const range = document.createRange();
        const sel = window.getSelection();
        range.setStart(node, pos);
        range.collapse(true);
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
}

export const getCaretPos = (element) => {
  let caretOffset = 0;
  if (window.getSelection) {
    const range = window.getSelection().getRangeAt(0);
    const preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(element);
    preCaretRange.setEnd(range.endContainer, range.endOffset);
    caretOffset = preCaretRange.toString().length;
  } else if (document.selection && document.selection.createRange) {
    const textRange = document.selection.createRange();
    const preCaretTextRange = document.body.createTextRange();
    preCaretTextRange.moveToElementText(element);
    preCaretTextRange.setEndPoint("EndToEnd", textRange);
    caretOffset = preCaretTextRange.text.length;
  }
  return caretOffset;
}