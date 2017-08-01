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
    event = new CustomEvent(eventName, {cancelable:true});
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
  if(element && element.parentNode) {
    element.parentNode.removeChild(element);
  }
}

export const append = (element,string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(string, 'text/html');
  element.appendChild(doc.querySelector('body').childNodes[0]);
}

export const addClass = (element,className) => {
  if (element.classList) {
    element.classList.add(className);
  } else {
    element.className += ` ${className}`;
  }
}

export const removeClass = (element,className) => {
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
  }
  else if (document.getSelection && document.getSelection().toString()) {
    text = document.getSelection();
    return text;
  }
  else {
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
    while ( (child = div.firstChild) ) {
      frag.appendChild(child);
    }
    range.insertNode(frag);
  } else if (document.selection && document.selection.createRange) {
    range = document.selection.createRange();
    range.pasteHTML(html);
  }
}

export const getSelectionNode = () => {
  let range, sel, container;
  if (document.selection && document.selection.createRange) {
    range = document.selection.createRange();
    return range.parentElement();
  } else if (window.getSelection) {
    sel = window.getSelection();
    if (sel.getRangeAt) {
      if (sel.rangeCount > 0) {
        range = sel.getRangeAt(0);
      }
    } else {
      range = document.createRange();
      range.setStart(sel.anchorNode, sel.anchorOffset);
      range.setEnd(sel.focusNode, sel.focusOffset);
      if (range.collapsed !== sel.isCollapsed) {
          range.setStart(sel.focusNode, sel.focusOffset);
          range.setEnd(sel.anchorNode, sel.anchorOffset);
      }
    }

    if (range) {
      container = range.commonAncestorContainer;
      return container.nodeType === 3 ? container.parentNode : container;
    }   
  }
}

export const unwrapTag = (node) => {
  const html = node.innerHTML;
  node.parentNode.insertBefore(node, document.createTextNode(html));
}

export const setCaretPos = (node, pos) => {
  const range = document.createRange();
  const sel = window.getSelection();
  range.setStart(node, pos);
  range.collapse(true);
  sel.removeAllRanges();
  sel.addRange(range);
  node.focus();
}

export const getCaretPos = (node) => {
  if (window.getSelection && window.getSelection().getRangeAt) {
    const range = window.getSelection().getRangeAt(0);
    const selectedObj = window.getSelection();
    let rangeCount = 0;
    const childNodes = selectedObj.anchorNode.parentNode.childNodes;
    for (let i = 0; i < childNodes.length; i++) {
      if (childNodes[i] == selectedObj.anchorNode) {
        break;
      }
      if (childNodes[i].outerHTML)
        rangeCount += childNodes[i].outerHTML.length;
      else if (childNodes[i].nodeType == 3) {
        rangeCount += childNodes[i].textContent.length;
      }
    }
    return range.startOffset + rangeCount;
  }
  return -1;
}