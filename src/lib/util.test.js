import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as util from './util';

function setBody(html) {
  document.body.innerHTML = html;
}

function selectTextRange(node, start, end) {
  const range = document.createRange();
  range.setStart(node, start);
  range.setEnd(node, end);
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
  return { range, sel };
}

describe('isSmartPhone', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it.each(['iPhone', 'iPad', 'ipod', 'Android'])('returns true for %s user agent', (token) => {
    vi.stubGlobal('navigator', { userAgent: `Mozilla/5.0 (${token})` });
    expect(util.isSmartPhone()).toBe(true);
  });

  it('returns false for a desktop user agent', () => {
    vi.stubGlobal('navigator', { userAgent: 'Mozilla/5.0 (Macintosh)' });
    expect(util.isSmartPhone()).toBe(false);
  });
});

describe('triggerEvent', () => {
  it('dispatches a CustomEvent when window.CustomEvent is available', () => {
    setBody('<div id="a"></div>');
    const el = document.getElementById('a');
    const handler = vi.fn();
    el.addEventListener('foo', handler);
    util.triggerEvent(el, 'foo');
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('falls back to document.createEvent when window.CustomEvent is unavailable', () => {
    setBody('<div id="a"></div>');
    const el = document.getElementById('a');
    const handler = vi.fn();
    el.addEventListener('bar', handler);
    const original = window.CustomEvent;
    delete window.CustomEvent;
    try {
      util.triggerEvent(el, 'bar', { detail: 1 });
    } finally {
      window.CustomEvent = original;
    }
    expect(handler).toHaveBeenCalledTimes(1);
  });
});

describe('parseQuery', () => {
  it('parses key=value pairs', () => {
    expect(util.parseQuery('a=1&b=2')).toEqual({ a: '1', b: '2' });
  });

  it('uses the key itself as value when there is no "="', () => {
    expect(util.parseQuery('flag')).toEqual({ flag: 'flag' });
  });

  it('rejoins values containing "="', () => {
    expect(util.parseQuery('a=1=2')).toEqual({ a: '1=2' });
  });

  it('decodes URI components', () => {
    expect(util.parseQuery('a=%E3%81%82')).toEqual({ a: 'あ' });
  });
});

describe('getViewPos', () => {
  it('returns left/top from getBoundingClientRect', () => {
    setBody('<div id="a"></div>');
    const el = document.getElementById('a');
    expect(util.getViewPos(el)).toEqual({ left: 0, top: 0 });
  });
});

describe('removeElement', () => {
  it('removes the element from its parent', () => {
    setBody('<div id="parent"><span id="child"></span></div>');
    const child = document.getElementById('child');
    util.removeElement(child);
    expect(document.getElementById('child')).toBeNull();
  });

  it('does nothing when the element has no parent', () => {
    const el = document.createElement('div');
    expect(() => util.removeElement(el)).not.toThrow();
  });

  it('does nothing when the element is falsy', () => {
    expect(() => util.removeElement(null)).not.toThrow();
  });
});

describe('append', () => {
  it('appends the parsed HTML fragment to the element', () => {
    setBody('<div id="a"></div>');
    const el = document.getElementById('a');
    util.append(el, '<span>hi</span>');
    expect(el.innerHTML).toBe('<span>hi</span>');
  });
});

describe('addClass / removeClass', () => {
  it('adds and removes a class using classList when available', () => {
    setBody('<div id="a" class="x"></div>');
    const el = document.getElementById('a');
    util.addClass(el, 'y');
    expect(el.className).toBe('x y');
    util.removeClass(el, 'y');
    expect(el.className).toBe('x');
  });

  it('falls back to string concatenation when classList is unavailable', () => {
    const el = { classList: undefined, className: 'x' };
    util.addClass(el, 'y');
    expect(el.className).toBe('x y');
  });

  it('falls back to a regex replace when classList is unavailable', () => {
    const el = { classList: undefined, className: 'x y' };
    util.removeClass(el, 'y');
    expect(el.className.trim()).toBe('x');
  });
});

describe('before', () => {
  it('inserts HTML before the element', () => {
    setBody('<div id="ref"></div>');
    const ref = document.getElementById('ref');
    util.before(ref, '<span id="new"></span>');
    expect(document.getElementById('new').nextSibling).toBe(ref);
  });
});

describe('getSelection', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns window.getSelection() when it has a non-empty string value', () => {
    setBody('<div id="a">hello</div>');
    const el = document.getElementById('a');
    selectTextRange(el.firstChild, 0, 5);
    const result = util.getSelection();
    expect(`${result}`).toBe('hello');
  });

  it('falls back to document.getSelection() when window.getSelection() is empty', () => {
    setBody('<div id="a">hello</div>');
    const el = document.getElementById('a');
    selectTextRange(el.firstChild, 0, 5);
    vi.spyOn(window, 'getSelection').mockReturnValue({ toString: () => '' });
    const result = util.getSelection();
    expect(`${result}`).toBe('hello');
  });

  it('falls back to the element selection range when neither selection API returns text', () => {
    vi.spyOn(window, 'getSelection').mockReturnValue({ toString: () => '' });
    vi.spyOn(document, 'getSelection').mockReturnValue({ toString: () => '' });
    const ele = { value: 'hello world', selectionStart: 0, selectionEnd: 5 };
    expect(util.getSelection(ele)).toBe('hello');
  });

  it('returns an empty string when nothing matches', () => {
    vi.spyOn(window, 'getSelection').mockReturnValue({ toString: () => '' });
    vi.spyOn(document, 'getSelection').mockReturnValue({ toString: () => '' });
    expect(util.getSelection({})).toBe('');
  });
});

describe('saveSelection / restoreSelection', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    delete document.selection;
  });

  it('saves and restores the current range via window.getSelection', () => {
    setBody('<div id="a">hello</div>');
    const el = document.getElementById('a');
    const { range } = selectTextRange(el.firstChild, 0, 3);
    const saved = util.saveSelection();
    expect(saved.toString()).toBe(range.toString());
    window.getSelection().removeAllRanges();
    util.restoreSelection(saved);
    expect(window.getSelection().toString()).toBe('hel');
  });

  it('returns null when there is no active range', () => {
    setBody('<div id="a">hello</div>');
    window.getSelection().removeAllRanges();
    expect(util.saveSelection()).toBeNull();
  });

  it('uses document.selection.createRange when window.getSelection is unavailable', () => {
    const original = window.getSelection;
    // eslint-disable-next-line no-undef
    window.getSelection = undefined;
    document.selection = { createRange: () => 'legacy-range' };
    try {
      expect(util.saveSelection()).toBe('legacy-range');
    } finally {
      window.getSelection = original;
    }
  });

  it('uses range.select() when window.getSelection is unavailable', () => {
    const original = window.getSelection;
    window.getSelection = undefined;
    document.selection = {};
    const select = vi.fn();
    try {
      util.restoreSelection({ select });
      expect(select).toHaveBeenCalled();
    } finally {
      window.getSelection = original;
    }
  });
});

describe('insertHtmlAtCursor', () => {
  it('replaces the current selection with the parsed HTML nodes', () => {
    setBody('<div id="a" contenteditable>hello</div>');
    const el = document.getElementById('a');
    selectTextRange(el.firstChild, 0, 0);
    util.insertHtmlAtCursor('<b>X</b>');
    expect(el.innerHTML).toBe('<b>X</b>hello');
  });

  it('uses document.selection.createRange().pasteHTML when window.getSelection is unavailable', () => {
    const original = window.getSelection;
    window.getSelection = undefined;
    const pasteHTML = vi.fn();
    document.selection = { createRange: () => ({ pasteHTML }) };
    try {
      util.insertHtmlAtCursor('<b>X</b>');
      expect(pasteHTML).toHaveBeenCalledWith('<b>X</b>');
    } finally {
      window.getSelection = original;
      delete document.selection;
    }
  });
});

describe('replaceSelectionWithHtml', () => {
  it('replaces the selection with the first element child and re-selects its contents', () => {
    setBody('<div id="a" contenteditable>hello</div>');
    const el = document.getElementById('a');
    selectTextRange(el.firstChild, 0, 5);
    util.replaceSelectionWithHtml('<strong>world</strong>');
    expect(el.innerHTML).toBe('<strong>world</strong>');
    expect(window.getSelection().toString()).toBe('world');
  });

  it('uses document.selection.createRange().pasteHTML when window.getSelection is unavailable', () => {
    const original = window.getSelection;
    window.getSelection = undefined;
    const pasteHTML = vi.fn();
    document.selection = { createRange: () => ({ pasteHTML }) };
    try {
      util.replaceSelectionWithHtml('<b>X</b>');
      expect(pasteHTML).toHaveBeenCalledWith('<b>X</b>');
    } finally {
      window.getSelection = original;
      delete document.selection;
    }
  });

  it('keeps leading text and places the caret after a void element', () => {
    setBody('<div id="a" contenteditable>hello</div>');
    const el = document.getElementById('a');
    selectTextRange(el.firstChild, 0, 5);
    util.replaceSelectionWithHtml('hello<br>');
    expect(el.innerHTML).toBe('hello<br>');
    const sel = window.getSelection();
    expect(sel.rangeCount).toBe(1);
    expect(sel.getRangeAt(0).collapsed).toBe(true);
  });
});

describe('moveCaretAfter', () => {
  it('moves the caret to just after the given node', () => {
    setBody('<div id="a" contenteditable><span id="target">x</span>tail</div>');
    const el = document.getElementById('a');
    const target = document.getElementById('target');
    selectTextRange(el, 0, 1);
    util.moveCaretAfter(target);
    expect(el.querySelector('#target')).not.toBeNull();
    expect(el.textContent).toBe('x​tail');
  });

  it('does nothing when window.getSelection is unavailable', () => {
    const original = window.getSelection;
    window.getSelection = undefined;
    try {
      expect(() => util.moveCaretAfter(document.createElement('span'))).not.toThrow();
    } finally {
      window.getSelection = original;
    }
  });
});

describe('unwrapTag', () => {
  it('unwraps the element, keeping its children in place', () => {
    setBody('<div id="a"><span id="s">inner</span></div>');
    const span = document.getElementById('s');
    util.unwrapTag(span);
    expect(document.getElementById('a').innerHTML).toBe('inner');
  });
});

describe('getElementBySelection', () => {
  afterEach(() => {
    delete document.selection;
  });

  it('returns the parent of the selection start container', () => {
    setBody('<div id="a">hello</div>');
    const el = document.getElementById('a');
    selectTextRange(el.firstChild, 0, 2);
    expect(util.getElementBySelection()).toBe(el);
  });

  it('returns undefined when the selection has no ranges', () => {
    window.getSelection().removeAllRanges();
    expect(util.getElementBySelection()).toBeUndefined();
  });

  it('uses document.selection.createRange().parentElement() when window.getSelection is unavailable', () => {
    const original = window.getSelection;
    window.getSelection = undefined;
    const parentElement = vi.fn(() => 'legacy-parent');
    document.selection = { createRange: () => ({ parentElement }) };
    try {
      expect(util.getElementBySelection()).toBe('legacy-parent');
    } finally {
      window.getSelection = original;
    }
  });
});

describe('clearSelection', () => {
  it('empties the selection using selection.empty when available', () => {
    setBody('<div id="a">hello</div>');
    const el = document.getElementById('a');
    selectTextRange(el.firstChild, 0, 2);
    const empty = vi.fn();
    vi.spyOn(window, 'getSelection').mockReturnValue({ empty });
    util.clearSelection();
    expect(empty).toHaveBeenCalled();
    vi.restoreAllMocks();
  });

  it('falls back to removeAllRanges when empty is unavailable', () => {
    const removeAllRanges = vi.fn();
    vi.spyOn(window, 'getSelection').mockReturnValue({ empty: undefined, removeAllRanges });
    util.clearSelection();
    expect(removeAllRanges).toHaveBeenCalled();
    vi.restoreAllMocks();
  });

  it('uses document.selection.empty() when window.getSelection is unavailable', () => {
    const original = window.getSelection;
    window.getSelection = undefined;
    const empty = vi.fn();
    document.selection = { empty };
    try {
      util.clearSelection();
      expect(empty).toHaveBeenCalled();
    } finally {
      window.getSelection = original;
      delete document.selection;
    }
  });
});

describe('replaceSelectionWithText', () => {
  it('replaces the selected range of a textarea value and re-selects the inserted text', () => {
    const textarea = document.createElement('textarea');
    textarea.value = 'hello world';
    document.body.appendChild(textarea);
    textarea.setSelectionRange(0, 5);
    util.replaceSelectionWithText(textarea, 'bye');
    expect(textarea.value).toBe('bye world');
    expect(document.activeElement).toBe(textarea);
    expect(textarea.selectionStart).toBe(0);
    expect(textarea.selectionEnd).toBe(3);
  });
});

describe('getSelectionLength', () => {
  it('returns the length of the current window selection string', () => {
    setBody('<div id="a">hello</div>');
    const el = document.getElementById('a');
    selectTextRange(el.firstChild, 0, 4);
    expect(util.getSelectionLength()).toBe(4);
  });

  it('uses document.selection().toString().length when window.getSelection is unavailable', () => {
    const original = window.getSelection;
    window.getSelection = undefined;
    document.selection = () => ({ toString: () => 'abcde' });
    try {
      expect(util.getSelectionLength()).toBe(5);
    } finally {
      window.getSelection = original;
      delete document.selection;
    }
  });
});

describe('setCaretPos', () => {
  it('places the caret at the given offset within nested text nodes', () => {
    setBody('<div id="a">he<b>ll</b>o</div>');
    const el = document.getElementById('a');
    const result = util.setCaretPos(el, 3);
    expect(result).toBe(-1);
    const sel = window.getSelection();
    expect(sel.rangeCount).toBe(1);
  });

  it('selects a range of the given length when length is provided', () => {
    setBody('<div id="a">hello</div>');
    const el = document.getElementById('a');
    util.setCaretPos(el, 0, 3);
    expect(window.getSelection().toString()).toBe('hel');
  });

  it('returns the remaining offset when the position is beyond all text nodes', () => {
    setBody('<div id="a">hi</div>');
    const el = document.getElementById('a');
    expect(util.setCaretPos(el, 100)).toBe(98);
  });
});

describe('replaceWhiteSpaceWithNbsp', () => {
  it('replaces spaces in direct text-node children with nbsp', () => {
    setBody('<div id="a">a b c</div>');
    const el = document.getElementById('a');
    util.replaceWhiteSpaceWithNbsp(el);
    expect(el.textContent).toBe('a b c');
  });
});

describe('getCaretPos', () => {
  it('returns the caret offset relative to the element', () => {
    setBody('<div id="a">hello</div>');
    const el = document.getElementById('a');
    selectTextRange(el.firstChild, 0, 3);
    expect(util.getCaretPos(el)).toBe(3);
  });

  it('uses document.selection.createRange() when window.getSelection is unavailable', () => {
    const original = window.getSelection;
    window.getSelection = undefined;
    document.selection = { createRange: () => ({}) };
    document.body.createTextRange = () => ({
      moveToElementText: vi.fn(),
      setEndPoint: vi.fn(),
      text: 'abc',
    });
    try {
      expect(util.getCaretPos(document.createElement('div'))).toBe(3);
    } finally {
      window.getSelection = original;
      delete document.selection;
      delete document.body.createTextRange;
    }
  });
});

describe('hasLastBr', () => {
  it('returns true when the last child is a <br>', () => {
    setBody('<div id="a">hi<br></div>');
    expect(util.hasLastBr(document.getElementById('a'))).toBe(true);
  });

  it('returns false when the last child is not a <br>', () => {
    setBody('<div id="a">hi</div>');
    expect(util.hasLastBr(document.getElementById('a'))).toBe(false);
  });

  it('returns false when the element has no children', () => {
    setBody('<div id="a"></div>');
    expect(util.hasLastBr(document.getElementById('a'))).toBe(false);
  });
});

describe('removeIndentNewline', () => {
  it('strips newlines and tabs', () => {
    expect(util.removeIndentNewline('a\n\tb\nc')).toBe('abc');
  });
});

describe('getBrowser', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it.each([
    ['msie 6.0', 'msie 6.', 'ie6'],
    ['msie 7.0', 'msie 7.', 'ie7'],
    ['msie 8.0', 'msie 8.', 'ie8'],
    ['msie 9.0', 'msie 9.', 'ie9'],
    ['msie 10.0', 'msie 10.', 'ie10'],
    ['msie 5.0', 'msie 5.', 'ie'],
    ['mozilla trident/7.0', 'trident/7.0', 'ie11'],
    ['mozilla chrome/1.0', 'chrome', 'chrome'],
    ['mozilla safari/1.0', 'safari', 'safari'],
    ['mozilla opera/1.0', 'opera', 'opera'],
    ['mozilla firefox/1.0', 'firefox', 'firefox'],
    ['something else', 'something else', 'unknown'],
  ])('detects %s as %s', (ua, appVersion, expected) => {
    vi.stubGlobal('navigator', { userAgent: ua, appVersion });
    expect(util.getBrowser()).toBe(expected);
  });
});

describe('getFirstfirstElementChild', () => {
  it('returns the first element node among children', () => {
    setBody('<div id="a">text<span id="s"></span></div>');
    const el = document.getElementById('a');
    expect(util.getFirstfirstElementChild(el)).toBe(document.getElementById('s'));
  });

  it('returns null when there are no element children', () => {
    setBody('<div id="a">text only</div>');
    expect(util.getFirstfirstElementChild(document.getElementById('a'))).toBeNull();
  });

  it('returns null when there are no children at all', () => {
    const el = document.createElement('div');
    expect(util.getFirstfirstElementChild(el)).toBeNull();
  });
});

describe('deepMerge', () => {
  it('merges nested objects recursively', () => {
    const target = { a: { x: 1 } };
    const result = util.deepMerge(target, { a: { y: 2 } }, { b: 3 });
    expect(result).toEqual({ a: { x: 1, y: 2 }, b: 3 });
  });

  it('replaces arrays instead of merging them', () => {
    const result = util.deepMerge({ list: [1, 2] }, { list: [3] });
    expect(result.list).toEqual([3]);
  });

  it('skips falsy sources', () => {
    const result = util.deepMerge({ a: 1 }, null, undefined, { b: 2 });
    expect(result).toEqual({ a: 1, b: 2 });
  });

  it('overwrites a non-object target value when the source value is an object', () => {
    const result = util.deepMerge({ a: 1 }, { a: { nested: true } });
    expect(result).toEqual({ a: { nested: true } });
  });
});
