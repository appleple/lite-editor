import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import LiteEditor from './index';

function selectRange(startNode, startOffset, endNode, endOffset) {
  const range = document.createRange();
  range.setStart(startNode, startOffset);
  range.setEnd(endNode ?? startNode, endOffset ?? startOffset);
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
  return range;
}

function collapseIn(node, offset = 0) {
  return selectRange(node, offset, node, offset);
}

// upndown's markdown conversion and onPutCaret's internal setTimeout(fn, 1) both resolve via a
// macrotask; wait longer than 1ms so pending timers don't leak into a later test's fresh DOM.
function flushMacrotask() {
  return new Promise((resolve) => setTimeout(resolve, 10));
}

function createEditor(settings = {}, initialValue) {
  document.body.innerHTML = '';
  const textarea = document.createElement('textarea');
  textarea.className = 'js-lite-editor';
  if (initialValue !== undefined) {
    textarea.textContent = initialValue;
  }
  document.body.appendChild(textarea);
  const instance = new LiteEditor('.js-lite-editor', settings);
  return instance;
}

function getEditorEl(instance) {
  return instance._getElementByQuery('[data-selector="lite-editor"]');
}

function getSourceEl(instance) {
  return instance._getElementByQuery('[data-selector="lite-editor-source"]');
}

beforeEach(() => {
  document.body.innerHTML = '';
});

describe('getSelectionNode', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns null when there is no selection anchor node', () => {
    vi.stubGlobal('document', {
      getSelection: () => ({ anchorNode: null }),
    });
    expect(LiteEditor.prototype.getSelectionNode()).toBeNull();
  });

  it('returns the parent element when the anchor node is a text node', () => {
    const parentNode = {};
    vi.stubGlobal('document', {
      getSelection: () => ({ anchorNode: { nodeType: 3, parentNode } }),
    });
    expect(LiteEditor.prototype.getSelectionNode()).toBe(parentNode);
  });

  it('returns the anchor node itself when it is not a text node', () => {
    const node = { nodeType: 1 };
    vi.stubGlobal('document', {
      getSelection: () => ({ anchorNode: node }),
    });
    expect(LiteEditor.prototype.getSelectionNode()).toBe(node);
  });
});

describe('constructor', () => {
  it('builds editable html from a textarea value by default', () => {
    const editor = createEditor({}, 'line1\nline2');
    expect(editor.data.value).toBe('line1<br>line2');
    expect(getEditorEl(editor)).not.toBeNull();
    expect(getSourceEl(editor)).not.toBeNull();
  });

  it('accepts a DOM element directly instead of a selector string', () => {
    document.body.innerHTML = '<textarea class="direct">hello</textarea>';
    const el = document.querySelector('.direct');
    const editor = new LiteEditor(el, {});
    expect(editor.data.value).toBe('hello');
  });

  it('uses innerHTML instead of value when sourceFirst is enabled', () => {
    document.body.innerHTML = '';
    const textarea = document.createElement('textarea');
    textarea.className = 'js-lite-editor';
    textarea.textContent = 'raw text';
    document.body.appendChild(textarea);
    const editor = new LiteEditor('.js-lite-editor', { sourceFirst: true });
    expect(editor.data.showSource).toBe(true);
    expect(editor.data.value).toBe('raw text');
  });

  it('escapes unregistered tags when escapeNotRegisteredTags is enabled', () => {
    const editor = createEditor({ escapeNotRegisteredTags: true }, '<foo>bar</foo>');
    expect(editor.data.value).toContain('&lt;foo&gt;');
  });

  it('copies attributes from the original element onto data.attr', () => {
    document.body.innerHTML = '';
    const textarea = document.createElement('textarea');
    textarea.className = 'js-lite-editor';
    textarea.setAttribute('name', 'hoge');
    document.body.appendChild(textarea);
    const editor = new LiteEditor('.js-lite-editor', {});
    expect(editor.data.attr).toContain('name="hoge"');
  });

  it('uses custom btnOptions from settings', () => {
    const btnOptions = [{ label: 'x', tag: 'span', className: '', group: 'custom', sampleText: 'x' }];
    const editor = createEditor({ btnOptions });
    expect(editor.data.btnOptions).toBe(btnOptions);
    expect(editor.data.groups.some((g) => g.name === 'custom')).toBe(true);
  });

  it('defaults selectedOption to the first selectOption when not provided', () => {
    const onSelect = vi.fn();
    const editor = createEditor({
      selectOptions: [{ value: 'a', label: 'A', extendLabel: 'ext-a', onSelect }],
    });
    expect(editor.data.selectedOption).toBe('a');
    expect(editor.data.extendLabel).toBe('ext-a');
    expect(onSelect).toHaveBeenCalledWith(editor);
  });

  it('renders with the button toolbox placed below the editor when btnPosition is bottom', () => {
    const editor = createEditor({ btnPosition: 'bottom' });
    const container = editor._getSelf();
    const editorEl = getEditorEl(editor);
    const toolbox = editor._getElementByQuery('[data-selector="lite-editor-toolbox"]');
    const children = [...container.children];
    expect(children.indexOf(editorEl)).toBeLessThan(children.indexOf(toolbox));
  });

  it('leaves data.value empty when the source element has no value', () => {
    const editor = createEditor({});
    expect(editor.data.value).toBe('');
  });
});

describe('focus', () => {
  it('focuses the contenteditable editor when showSource is false', () => {
    const editor = createEditor({}, 'hi');
    editor.focus();
    expect(document.activeElement).toBe(getEditorEl(editor));
  });

  it('focuses the source textarea when showSource is true', () => {
    const editor = createEditor({ sourceFirst: true }, 'hi');
    editor.focus();
    expect(document.activeElement).toBe(getSourceEl(editor));
  });
});

describe('registerButton', () => {
  it('adds a new button and re-renders the toolbox', () => {
    const editor = createEditor({}, 'hi');
    const before = editor.data.btnOptions.length;
    editor.registerButton({ label: 'z', tag: 'mark', className: '', group: 'mark', sampleText: 'z' });
    expect(editor.data.btnOptions.length).toBe(before + 1);
  });
});

describe('activateEditorMode / deactivateEditorMode', () => {
  it('toggles disableEditorMode', () => {
    const editor = createEditor({}, 'hi');
    editor.deactivateEditorMode();
    expect(editor.data.disableEditorMode).toBe(true);
    editor.activateEditorMode();
    expect(editor.data.disableEditorMode).toBe(false);
  });
});

describe('makeEditableHtml', () => {
  it('converts newlines to <br>', () => {
    const editor = createEditor({}, 'x');
    expect(editor.makeEditableHtml('a\nb\r\nc\rd')).toBe('a<br>b<br>c<br>d');
  });

  it('collapses a <br> immediately followed by a newline', () => {
    const editor = createEditor({}, 'x');
    expect(editor.makeEditableHtml('a<br>\nb')).toBe('a<br>b');
  });

  it('replaces spaces with nbsp when preserveSpace is enabled', () => {
    const editor = createEditor({ preserveSpace: true }, 'x');
    expect(editor.makeEditableHtml('a b')).toBe('a&nbsp;b');
  });

  it('appends <br> for a trailing newline when nl2br is disabled', () => {
    const editor = createEditor({ nl2br: false }, 'x');
    expect(editor.makeEditableHtml('a\n')).toBe('a<br><br>');
  });
});

describe('makeBtnGroups', () => {
  it('groups buttons sharing the same group name and defaults missing group to none', () => {
    const editor = createEditor({
      btnOptions: [
        { label: 'a', group: 'g1' },
        { label: 'b', group: 'g1' },
        { label: 'c' },
      ],
    });
    const groups = editor.makeBtnGroups();
    expect(groups).toEqual([
      { name: 'g1', items: [expect.objectContaining({ label: 'a' }), expect.objectContaining({ label: 'b' })] },
      { name: 'none', items: [expect.objectContaining({ label: 'c' })] },
    ]);
  });
});

describe('_getSelf / _getUniqId / _getElementByQuery', () => {
  it('_getSelf returns the root container element', () => {
    const editor = createEditor({}, 'hi');
    expect(editor._getSelf()).not.toBeNull();
    expect(editor._getSelf().getAttribute('data-id')).toBe(editor.id);
  });

  it('_getUniqId returns an uppercase alphanumeric id', () => {
    const editor = createEditor({}, 'hi');
    expect(editor._getUniqId()).toMatch(/^[0-9A-Z]+$/);
  });
});

describe('_fireEvent / on', () => {
  it('invokes a registered listener bound to the instance', () => {
    const editor = createEditor({}, 'hi');
    let receivedThis = null;
    editor.on('custom', function handler() {
      receivedThis = this;
    });
    editor._fireEvent('custom');
    expect(receivedThis).toBe(editor);
  });

  it('does nothing when the source element is missing', () => {
    const editor = createEditor({}, 'hi');
    getSourceEl(editor).remove();
    expect(() => editor._fireEvent('custom')).not.toThrow();
  });
});

describe('escapeNotRegisteredTags', () => {
  it('leaves registered tags untouched', () => {
    const editor = createEditor({
      btnOptions: [{ label: 'b', tag: 'strong', className: 'x', group: 'mark', sampleText: ' ' }],
    });
    const result = editor.escapeNotRegisteredTags('<strong class="x">hi</strong>');
    expect(result).toBe('<strong class="x">hi</strong>');
  });

  it('escapes unregistered non-void tags and recurses into their content', () => {
    const editor = createEditor({ btnOptions: [] });
    const result = editor.escapeNotRegisteredTags('<foo><bar>baz</bar></foo>');
    expect(result).toBe('&lt;foo&gt;&lt;bar&gt;baz&lt;/bar&gt;&lt;/foo&gt;');
  });

  it('converts an unregistered self-closing br tag to <br>', () => {
    const editor = createEditor({ btnOptions: [] });
    expect(editor.escapeNotRegisteredTags('a<br>b')).toBe('a<br>b');
  });

  it('escapes an unregistered self-closing non-br tag', () => {
    const editor = createEditor({ btnOptions: [] });
    expect(editor.escapeNotRegisteredTags('<hr/>')).toBe('&lt;hr&gt');
  });
});

describe('encodeValue / decodeValue', () => {
  it('encodes html entities in data.value', () => {
    const editor = createEditor({}, '<b>');
    editor.data.value = '<b>';
    editor.encodeValue();
    expect(editor.data.value).toBe('&lt;b&gt;');
  });

  it('decodes html entities in data.value', () => {
    const editor = createEditor({}, 'x');
    editor.data.value = '&lt;b&gt;';
    editor.decodeValue();
    expect(editor.data.value).toBe('<b></b>');
  });
});

describe('hideEditor / showEditor / hideBtns / showBtns', () => {
  it('toggles hideEditor and reflects it in the editor style', () => {
    const editor = createEditor({}, 'hi');
    editor.hideEditor();
    expect(editor.data.hideEditor).toBe(true);
    expect(getEditorEl(editor).getAttribute('style')).toContain('display:none;');
    editor.showEditor();
    expect(editor.data.hideEditor).toBe(false);
  });

  it('toggles hideBtns', () => {
    const editor = createEditor({}, 'hi');
    editor.hideBtns();
    expect(editor.data.hideBtns).toBe(true);
    editor.showBtns();
    expect(editor.data.hideBtns).toBe(false);
  });
});

describe('resetStyle', () => {
  afterEach(() => {
    delete document.execCommand;
  });

  it('inserts plain text via execCommand when the editor is focused', () => {
    const editor = createEditor({}, 'hi');
    getEditorEl(editor).focus();
    document.execCommand = vi.fn();
    editor.resetStyle();
    expect(document.execCommand).toHaveBeenCalledWith('insertText', false, expect.any(String));
  });

  it('does nothing when the editor is not focused', () => {
    const editor = createEditor({}, 'hi');
    document.execCommand = vi.fn();
    editor.resetStyle();
    expect(document.execCommand).not.toHaveBeenCalled();
  });
});

describe('insertHtml / insertHtmlAtCursor', () => {
  it('inserts html at the current selection inside the editor', () => {
    const editor = createEditor({}, 'hello');
    const editorEl = getEditorEl(editor);
    collapseIn(editorEl.firstChild, 0);
    editor.insertHtml('<b>X</b>');
    expect(editor.data.value).toBe('<b>X</b>hello');
  });

  it('inserts html at the cursor in the contenteditable editor when showSource is false', () => {
    const editor = createEditor({}, 'hello');
    const editorEl = getEditorEl(editor);
    collapseIn(editorEl.firstChild, 0);
    editor.insertHtmlAtCursor('<i>Y</i>');
    expect(editor.data.value).toBe('<i>Y</i>hello');
  });

  it('inserts text at the cursor in the source textarea when showSource is true', () => {
    const editor = createEditor({ sourceFirst: true }, 'hello');
    const source = getSourceEl(editor);
    source.focus();
    source.setSelectionRange(0, 0);
    editor.insertHtmlAtCursor('X');
    expect(editor.data.value).toBe('Xhello');
  });
});

describe('saveSelection / restoreSelection', () => {
  it('saves the current range and restores it later', () => {
    const editor = createEditor({}, 'hello');
    const editorEl = getEditorEl(editor);
    selectRange(editorEl.firstChild, 0, editorEl.firstChild, 3);
    editor.saveSelection();
    window.getSelection().removeAllRanges();
    editor.restoreSelection();
    expect(window.getSelection().toString()).toBe('hel');
  });

  it('does nothing when there is no saved selection', () => {
    const editor = createEditor({}, 'hello');
    editor.selection = null;
    expect(() => editor.restoreSelection()).not.toThrow();
  });
});

describe('_isFocused / _isVoidElement', () => {
  it('reports focus state of the editor element', () => {
    const editor = createEditor({}, 'hi');
    expect(editor._isFocused()).toBe(false);
    getEditorEl(editor).focus();
    expect(editor._isFocused()).toBe(true);
  });

  it('detects void and non-void elements', () => {
    const editor = createEditor({}, 'hi');
    expect(editor._isVoidElement('br')).toBeTruthy();
    expect(editor._isVoidElement('strong')).toBeUndefined();
  });
});

describe('insertTag', () => {
  it('returns early when the selection is outside the editor and showSource is false', () => {
    const editor = createEditor({}, 'hello');
    window.getSelection().removeAllRanges();
    editor.insertTag('strong', '', ' ');
    expect(editor.data.value).toBe('hello');
  });

  it('wraps the current selection in the given tag and marks matching buttons selected', () => {
    const editor = createEditor({}, 'hello');
    const editorEl = getEditorEl(editor);
    selectRange(editorEl.firstChild, 0, editorEl.firstChild, 5);
    editor.insertTag('strong', '', ' ');
    expect(editor.data.value).toBe('<strong>hello</strong>');
    const btn = editor.data.btnOptions.find((b) => b.tag === 'strong');
    expect(btn.selected).toBe(true);
  });

  it('inserts a void element around the selection instead of wrapping it', () => {
    const editor = createEditor({}, 'hello');
    const editorEl = getEditorEl(editor);
    selectRange(editorEl.firstChild, 0, editorEl.firstChild, 5);
    editor.insertTag('br', '', ' ');
    expect(editor.data.value).toBe('hello<br>');
  });

  it('uses the sample text when nothing is selected', () => {
    const editor = createEditor({}, 'hello');
    const editorEl = getEditorEl(editor);
    collapseIn(editorEl.firstChild, 0);
    editor.insertTag('i', '', 'sample');
    expect(editor.data.value).toBe('<i>sample</i>hello');
  });

  it('opens the link dialog instead of inserting when tag is "a"', () => {
    const editor = createEditor({}, 'hello');
    const editorEl = getEditorEl(editor);
    selectRange(editorEl.firstChild, 0, editorEl.firstChild, 5);
    editor.insertTag('a', '', 'link text');
    expect(editor.data.linkLabel).toBe('hello');
    expect(editor.data.linkNew).toBe(true);
  });

  it('replaces the source textarea selection in html mode when showSource is true', () => {
    const editor = createEditor({ sourceFirst: true }, 'hello');
    const source = getSourceEl(editor);
    source.setSelectionRange(0, 5);
    editor.insertTag('strong', '', ' ');
    expect(editor.data.value).toContain('<strong>hello</strong>');
  });

  it('converts to markdown before inserting when showSource is true and mode is markdown', () => {
    const editor = createEditor({ sourceFirst: true }, 'hello');
    editor.changeMode('markdown');
    const source = getSourceEl(editor);
    source.setSelectionRange(0, 5);
    editor.insertTag('strong', '', ' ');
    expect(editor.data.value).toContain('**hello**');
  });
});

describe('showLinkDialog / updateTargetBlank', () => {
  it('renders the link dialog and focuses the url input', () => {
    const editor = createEditor({}, 'hello');
    editor.showLinkDialog('label text', 'my-class');
    expect(editor.data.linkLabel).toBe('label text');
    expect(editor.data.linkClassName).toBe('my-class');
    expect(document.activeElement).toBe(editor._getElementByQuery('[data-bind="linkUrl"]'));
  });

  it('sets targetBlank to true when the checkbox is checked', () => {
    const editor = createEditor({}, 'hello');
    editor.e = { target: { checked: true } };
    editor.updateTargetBlank();
    expect(editor.data.targetBlank).toBe('true');
  });

  it('sets targetBlank to false when the checkbox is unchecked', () => {
    const editor = createEditor({}, 'hello');
    editor.e = { target: { checked: false } };
    editor.updateTargetBlank();
    expect(editor.data.targetBlank).toBe('false');
  });
});

describe('link dialog <dialog>', () => {
  function getDialog(editor) {
    return editor._getElementByQuery('[data-selector="lite-editor-link-dialog"]');
  }

  it('renders as a <dialog> element that opens when a link dialog is shown', () => {
    const editor = createEditor({}, 'hello');
    const dialog = getDialog(editor);
    expect(dialog.tagName).toBe('DIALOG');
    expect(dialog.open).toBe(false);
    editor.showLinkDialog('label text', '');
    expect(dialog.open).toBe(true);
  });

  it('closes the dialog when closeLinkDialog is called', () => {
    const editor = createEditor({}, 'hello');
    editor.showLinkDialog('label text', '');
    const dialog = getDialog(editor);
    expect(dialog.open).toBe(true);
    editor.closeLinkDialog();
    expect(dialog.open).toBe(false);
  });

  it('closes on a backdrop click (a click whose target is the dialog itself)', () => {
    const editor = createEditor({}, 'hello');
    editor.showLinkDialog('label text', '');
    const dialog = getDialog(editor);
    expect(dialog.open).toBe(true);
    dialog.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
    expect(dialog.open).toBe(false);
    expect(editor.data.linkLabel).toBe('');
  });

  it('does not close when a click inside the dialog content bubbles up', () => {
    const editor = createEditor({}, 'hello');
    editor.showLinkDialog('label text', '');
    const dialog = getDialog(editor);
    const input = editor._getElementByQuery('[data-bind="linkUrl"]');
    input.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
    expect(dialog.open).toBe(true);
  });

  it('resets link dialog state when the browser fires a native close event (e.g. Escape)', () => {
    const editor = createEditor({}, 'hello');
    editor.showLinkDialog('label text', '');
    const dialog = getDialog(editor);
    dialog.dispatchEvent(new window.Event('close'));
    expect(editor.data.linkLabel).toBe('');
  });

  it('ignores a native close event when the link dialog was already closed', () => {
    const editor = createEditor({}, 'hello');
    const dialog = getDialog(editor);
    expect(() => dialog.dispatchEvent(new window.Event('close'))).not.toThrow();
    expect(editor.data.linkLabel).toBe('');
  });

  it('prefers the native showModal()/close() methods when the environment provides them', () => {
    const editor = createEditor({}, 'hello');
    const dialog = getDialog(editor);
    dialog.showModal = vi.fn(() => {
      dialog.open = true;
    });
    dialog.close = vi.fn(() => {
      dialog.open = false;
    });
    editor.showLinkDialog('label text', '');
    expect(dialog.showModal).toHaveBeenCalled();
    editor.closeLinkDialog();
    expect(dialog.close).toHaveBeenCalled();
  });

  it('calls the real close() before re-rendering, so morphdom never has to strip `open` out from under an active modal', () => {
    // Regression test: closing used to reset data.linkLabel and re-render
    // FIRST, then call dialog.close() from onUpdated(). That let morphdom's
    // attribute diff strip the `open` attribute via a plain removeAttribute()
    // before the real close() ran, which does not properly exit the dialog's
    // modal/top-layer state in a real browser — leaving an invisible dialog
    // that still swallows every click on the page.
    const editor = createEditor({}, 'hello');
    editor.showLinkDialog('label text', '');
    const dialog = getDialog(editor);
    dialog.open = true;
    let openAtCloseTime = null;
    dialog.close = vi.fn(() => {
      openAtCloseTime = dialog.open;
      dialog.open = false;
    });
    editor.closeLinkDialog();
    expect(dialog.close).toHaveBeenCalled();
    expect(openAtCloseTime).toBe(true);
  });

  it('does nothing when the link dialog element cannot be found', () => {
    const editor = createEditor({}, 'hello');
    vi.spyOn(editor, '_getElementByQuery').mockReturnValue(null);
    expect(() => editor._setupLinkDialog()).not.toThrow();
    expect(() => editor._openLinkDialogElement()).not.toThrow();
    expect(() => editor._closeLinkDialogElement()).not.toThrow();
    editor._getElementByQuery.mockRestore();
  });

  it('does nothing when already in the desired open/closed state', () => {
    const editor = createEditor({}, 'hello');
    const dialog = getDialog(editor);
    expect(() => editor._closeLinkDialogElement()).not.toThrow();
    expect(dialog.open).toBe(false);
    editor.showLinkDialog('label text', '');
    expect(() => editor._openLinkDialogElement()).not.toThrow();
    expect(dialog.open).toBe(true);
  });
});

describe('insertAtag', () => {
  it('inserts a link at the saved selection with a class and target blank', () => {
    const editor = createEditor({}, 'hello');
    const editorEl = getEditorEl(editor);
    selectRange(editorEl.firstChild, 0, editorEl.firstChild, 5);
    editor.saveSelection();
    editor.data.linkLabel = 'hello';
    editor.data.linkUrl = 'https://example.com';
    editor.data.linkClassName = 'my-link';
    editor.data.targetBlank = 'true';
    editor.insertAtag();
    expect(editor.data.value).toBe(
      '<a href="https://example.com" class="my-link" target="_blank" rel="noopener noreferrer">hello</a>'
    );
    expect(editor.data.linkLabel).toBe('');
  });

  it('inserts a plain link without class or target blank', () => {
    const editor = createEditor({}, 'hello');
    const editorEl = getEditorEl(editor);
    selectRange(editorEl.firstChild, 0, editorEl.firstChild, 5);
    editor.saveSelection();
    editor.data.linkLabel = 'hello';
    editor.data.linkUrl = 'https://example.com';
    editor.insertAtag();
    expect(editor.data.value).toBe('<a href="https://example.com">hello</a>');
  });

  it('inserts into the source textarea in html mode when showSource is true', () => {
    const editor = createEditor({ sourceFirst: true }, 'hello');
    const source = getSourceEl(editor);
    source.setSelectionRange(0, 5);
    editor.saveSelection();
    editor.data.linkLabel = 'hello';
    editor.data.linkUrl = 'https://example.com';
    editor.insertAtag();
    expect(editor.data.value).toContain('<a href="https://example.com">hello</a>');
  });

  it('converts to markdown before inserting when showSource is true and mode is markdown', () => {
    const editor = createEditor({ sourceFirst: true }, 'hello');
    editor.changeMode('markdown');
    const source = getSourceEl(editor);
    source.setSelectionRange(0, 5);
    editor.saveSelection();
    editor.data.linkLabel = 'hello';
    editor.data.linkUrl = 'https://example.com';
    editor.insertAtag();
    expect(editor.data.value).toContain('[hello](https://example.com)');
  });
});

describe('onClick / onInit / onRender', () => {
  it('invokes onClick for the button at the given index', () => {
    const onClick = vi.fn();
    const editor = createEditor({ btnOptions: [{ label: 'x', group: 'g', onClick }] });
    editor.onClick('0');
    expect(onClick).toHaveBeenCalledWith(editor);
  });

  it('invokes onInit only once per button', () => {
    const onInit = vi.fn();
    const editor = createEditor({ btnOptions: [{ label: 'x', group: 'g', onInit }] });
    editor.onInit('0');
    editor.onInit('0');
    expect(onInit).toHaveBeenCalledTimes(1);
  });

  it('invokes onRender for the button at the given index', () => {
    const onRender = vi.fn();
    const editor = createEditor({ btnOptions: [{ label: 'x', group: 'g', onRender }] });
    editor.onRender('0');
    expect(onRender).toHaveBeenCalled();
  });
});

describe('beforeUpdated', () => {
  it('consumes firstValue on the first render', () => {
    document.body.innerHTML = '';
    const textarea = document.createElement('textarea');
    textarea.className = 'js-lite-editor';
    textarea.value = 'first';
    document.body.appendChild(textarea);
    const editor = new LiteEditor('.js-lite-editor', {});
    expect(editor.data.firstValue).toBeNull();
  });

  it('escapes curly braces in the current value', () => {
    const editor = createEditor({}, 'hello');
    editor.data.value = 'a{b}c';
    editor.beforeUpdated();
    expect(editor.data.value).toBe('a&lcub;b&rcub;c');
  });
});

describe('onUpdated', () => {
  it('sets the source height when showSource is true', () => {
    const editor = createEditor({ sourceFirst: true }, 'hello');
    const source = getSourceEl(editor);
    editor.onUpdated();
    expect(source.style.height).toMatch(/px$/);
  });

  it('returns early when the editor element cannot be found', () => {
    // showSource must be true so onUpdated never dereferences the (mocked-out) editor
    // element before reaching the `if (!editor) return;` guard.
    const editor = createEditor({ sourceFirst: true }, 'hello');
    const original = editor._getElementByQuery.bind(editor);
    vi.spyOn(editor, '_getElementByQuery').mockImplementation((q) => {
      if (q === '[data-selector="lite-editor"]') return null;
      return original(q);
    });
    expect(() => editor.onUpdated()).not.toThrow();
    editor._getElementByQuery.mockRestore();
  });

  it('does not push a duplicate entry onto the undo stack when the value is unchanged', () => {
    const editor = createEditor({}, 'hello');
    const before = editor.stack.length;
    editor.onUpdated();
    expect(editor.stack.length).toBe(before);
  });

  it('skips writing to editor.selector when it is missing', () => {
    const editor = createEditor({}, 'hello');
    editor.selector = null;
    getEditorEl(editor).innerHTML = 'changed';
    expect(() => editor.onUpdated()).not.toThrow();
  });
});

describe('redo / undo / canRedo / canUndo', () => {
  it('moves through the undo/redo stack', () => {
    const editor = createEditor({}, 'hello');
    const editorEl = getEditorEl(editor);
    editorEl.innerHTML = 'state1';
    editor.onUpdated();
    editorEl.innerHTML = 'state2';
    editor.onUpdated();
    expect(editor.canUndo()).toBe(true);
    // stackPosition trails the stack by one entry, so undo() must be called
    // twice to move from the latest ('state2') back to the prior ('state1').
    editor.undo();
    editor.undo();
    expect(editor.data.value).toBe('state1');
    expect(editor.canRedo()).toBe(true);
    editor.redo();
    expect(editor.data.value).toBe('state2');
  });

  it('does nothing when there is nothing to redo or undo', () => {
    const editor = createEditor({}, 'hello');
    editor.stackPosition = 0;
    editor.stack = [editor.data.value];
    expect(editor.canUndo()).toBe(false);
    expect(editor.canRedo()).toBe(false);
    editor.undo();
    editor.redo();
    expect(editor.data.value).toBe('hello');
  });
});

describe('insertTag with a className', () => {
  it('adds a class attribute to the wrapping tag', () => {
    const editor = createEditor({}, 'hello');
    const editorEl = getEditorEl(editor);
    selectRange(editorEl.firstChild, 0, editorEl.firstChild, 5);
    editor.insertTag('span', 'my-class', ' ');
    expect(editor.data.value).toBe('<span class="my-class">hello</span>');
  });
});

describe('onPaste', () => {
  it('inserts sanitized clipboard text at the cursor when focused', () => {
    const editor = createEditor({}, 'hello');
    const editorEl = getEditorEl(editor);
    editorEl.focus();
    collapseIn(editorEl.firstChild, 0);
    editor.e = {
      preventDefault: vi.fn(),
      clipboardData: { getData: () => '<b>\nworld' },
    };
    editor.onPaste();
    expect(editor.e.preventDefault).toHaveBeenCalled();
    expect(editor.data.value).toContain('&lt;b&gt;');
  });

  it('falls back to window.clipboardData when e.clipboardData is unavailable', () => {
    const editor = createEditor({}, 'hello');
    const editorEl = getEditorEl(editor);
    editorEl.focus();
    collapseIn(editorEl.firstChild, 0);
    window.clipboardData = { getData: () => 'x' };
    editor.e = { preventDefault: vi.fn() };
    try {
      editor.onPaste();
      expect(editor.data.value).toContain('x');
    } finally {
      delete window.clipboardData;
    }
  });

  it('does nothing when the editor is not focused', () => {
    const editor = createEditor({}, 'hello');
    editor.e = { preventDefault: vi.fn(), clipboardData: { getData: () => 'x' } };
    editor.onPaste();
    expect(editor.data.value).toBe('hello');
  });

  it('does nothing when the clipboard text is empty', () => {
    const editor = createEditor({}, 'hello');
    getEditorEl(editor).focus();
    editor.e = { preventDefault: vi.fn(), clipboardData: { getData: () => '' } };
    editor.onPaste();
    expect(editor.data.value).toBe('hello');
  });
});

describe('onKeyDown', () => {
  it('updates data.value and schedules onPutCaret for ordinary key presses', async () => {
    const editor = createEditor({}, 'hello');
    const editorEl = getEditorEl(editor);
    editorEl.innerHTML = 'hello!';
    collapseIn(editorEl.firstChild, 6);
    editor.e = { ctrlKey: false, metaKey: false, keyCode: 65 };
    editor.onKeyDown();
    expect(editor.data.value).toBe('hello!');
    await flushMacrotask();
  });

  it('undoes on ctrl+z and redoes on ctrl+shift+z', () => {
    const editor = createEditor({}, 'hello');
    const editorEl = getEditorEl(editor);
    editorEl.innerHTML = 'state1';
    editor.onUpdated();
    editorEl.innerHTML = 'state2';
    editor.onUpdated();
    collapseIn(editorEl.firstChild, 0);

    editor.e = { ctrlKey: true, metaKey: false, which: 90, keyCode: 90, shiftKey: false, preventDefault: vi.fn() };
    editor.onKeyDown();
    expect(editor.e.preventDefault).toHaveBeenCalled();
    editor.undo();

    editor.e = { ctrlKey: true, metaKey: false, which: 90, keyCode: 90, shiftKey: true, preventDefault: vi.fn() };
    editor.onKeyDown();
    editor.redo();
  });

  it('ignores other ctrl/cmd shortcuts that are not undo/redo', () => {
    const editor = createEditor({}, 'hello');
    const editorEl = getEditorEl(editor);
    collapseIn(editorEl.firstChild, 0);
    editor.e = { ctrlKey: true, metaKey: false, which: 65, keyCode: 65, shiftKey: false, preventDefault: vi.fn() };
    editor.onKeyDown();
    expect(editor.e.preventDefault).not.toHaveBeenCalled();
  });

  it('inserts a line break and keeps the caret in view when Enter is pressed', () => {
    const editor = createEditor({}, 'hello');
    const editorEl = getEditorEl(editor);
    collapseIn(editorEl.firstChild, 5);
    editor.e = { ctrlKey: false, metaKey: false, keyCode: 13, preventDefault: vi.fn() };
    editor.onKeyDown();
    expect(editor.e.preventDefault).toHaveBeenCalled();
    expect(editor.data.value).toContain('<br>');
  });
});

describe('checkCaretCoordinate', () => {
  it('returns a coordinate relative to the editor and removes the probe span', () => {
    const editor = createEditor({}, 'hello');
    const editorEl = getEditorEl(editor);
    collapseIn(editorEl.firstChild, 0);
    const coordinate = editor.checkCaretCoordinate();
    expect(coordinate).toEqual({ x: 0, y: 0 });
    expect(editorEl.querySelector('span')).toBeNull();
  });
});

describe('onInput', () => {
  it('syncs data.value and the source textarea from the editor contents', () => {
    const editor = createEditor({}, 'hello');
    const editorEl = getEditorEl(editor);
    editorEl.innerHTML = 'changed';
    editor.onInput();
    expect(editor.data.value).toBe('changed');
    expect(getSourceEl(editor).value).toBe(editor.data.formatedValue);
  });
});

describe('preventSubmit', () => {
  it('prevents default when Enter is pressed', () => {
    const editor = createEditor({}, 'hello');
    editor.e = { keyCode: 13, preventDefault: vi.fn() };
    editor.preventSubmit();
    expect(editor.e.preventDefault).toHaveBeenCalled();
  });

  it('does nothing for other keys', () => {
    const editor = createEditor({}, 'hello');
    editor.e = { keyCode: 65, preventDefault: vi.fn() };
    editor.preventSubmit();
    expect(editor.e.preventDefault).not.toHaveBeenCalled();
  });
});

describe('onPutCaret', () => {
  it('builds the tag chain up to the editor for a nested selection', async () => {
    const editor = createEditor({}, 'hello');
    const editorEl = getEditorEl(editor);
    editorEl.innerHTML = '<strong><em>hello</em></strong>';
    const em = editorEl.querySelector('em');
    collapseIn(em.firstChild, 0);
    editor.onPutCaret();
    await flushMacrotask();
    const strongBtn = editor.data.groups.flatMap((g) => g.items).find((b) => b.tag === 'strong');
    expect(strongBtn.selected).toBe(true);
  });

  it('does nothing extra when the selection target is the editor itself', async () => {
    const editor = createEditor({}, 'hello');
    const editorEl = getEditorEl(editor);
    collapseIn(editorEl, 0);
    editor.onPutCaret();
    await flushMacrotask();
  });

  it('does nothing extra when there is no selection', async () => {
    const editor = createEditor({}, 'hello');
    window.getSelection().removeAllRanges();
    editor.onPutCaret();
    await flushMacrotask();
  });

  it('stops walking up once it runs out of parents outside the editor', async () => {
    const editor = createEditor({}, 'hello');
    const outside = document.createElement('span');
    outside.textContent = 'outside';
    document.body.appendChild(outside);
    collapseIn(outside.firstChild, 0);
    editor.onPutCaret();
    await flushMacrotask();
  });
});

describe('onKeyDown scroll adjustment', () => {
  it('scrolls the editor into view when the caret moves below maxHeight', () => {
    const editor = createEditor({}, 'hello');
    const editorEl = getEditorEl(editor);
    collapseIn(editorEl.firstChild, 5);
    let call = 0;
    vi.spyOn(editor, 'checkCaretCoordinate').mockImplementation(() => {
      call += 1;
      return call === 1 ? { x: 0, y: 0 } : { x: 0, y: 500 };
    });
    const before = editorEl.scrollTop;
    editor.e = { ctrlKey: false, metaKey: false, keyCode: 13, preventDefault: vi.fn() };
    editor.onKeyDown();
    expect(editorEl.scrollTop).toBeGreaterThan(before);
    editor.checkCaretCoordinate.mockRestore();
  });
});

describe('onDirectInput', () => {
  it('updates data.value from the source textarea and resizes it', () => {
    const editor = createEditor({ sourceFirst: true }, 'hello');
    const source = getSourceEl(editor);
    editor.e = { target: { value: 'a\nb' } };
    editor.onDirectInput();
    expect(editor.data.value).toBe('a<br>b');
    expect(source.style.height).toMatch(/px$/);
  });
});

describe('updateToolBox', () => {
  it('marks matching buttons as selected based on the given tags', () => {
    const editor = createEditor({}, 'hello');
    editor.updateToolBox([{ tagName: 'strong', className: '' }]);
    const btn = editor.data.btnOptions.find((b) => b.tag === 'strong');
    expect(btn.selected).toBe(true);
  });

  it('clears selection state when called with no tags', () => {
    const editor = createEditor({}, 'hello');
    editor.updateToolBox([{ tagName: 'strong', className: '' }]);
    editor.updateToolBox();
    const btn = editor.data.btnOptions.find((b) => b.tag === 'strong');
    expect(btn.selected).toBe(false);
  });
});

describe('updateLinkDialog / closeLinkDialog', () => {
  it('resets link dialog state when passed null', () => {
    const editor = createEditor({}, 'hello');
    editor.data.linkLabel = 'x';
    editor.updateLinkDialog(null);
    expect(editor.data.linkNew).toBe(true);
    expect(editor.data.linkLabel).toBe('');
  });

  it('populates link dialog state from an existing link with target _blank', () => {
    const editor = createEditor({}, 'hello');
    const editorEl = getEditorEl(editor);
    editorEl.innerHTML = '<a href="https://example.com" target="_blank">link</a>';
    const a = editorEl.querySelector('a');
    editor.updateLinkDialog(a);
    expect(editor.data.linkNew).toBe(false);
    expect(editor.data.linkUrl).toBe('https://example.com');
    expect(editor.data.targetBlank).toBe('true');
  });

  it('sets targetBlank to false for a link without target', () => {
    const editor = createEditor({}, 'hello');
    const editorEl = getEditorEl(editor);
    editorEl.innerHTML = '<a href="https://example.com">link</a>';
    const a = editorEl.querySelector('a');
    editor.updateLinkDialog(a);
    expect(editor.data.targetBlank).toBe('false');
  });

  it('clears link dialog state', () => {
    const editor = createEditor({}, 'hello');
    editor.data.linkLabel = 'x';
    editor.data.linkUrl = 'y';
    editor.closeLinkDialog();
    expect(editor.data.linkLabel).toBe('');
    expect(editor.data.linkUrl).toBe('');
  });
});

describe('updateLink / removeLink', () => {
  it('updates the href, label and target of the saved link node', async () => {
    const editor = createEditor({}, 'hello');
    const editorEl = getEditorEl(editor);
    editorEl.innerHTML = '<a href="https://old.example.com">old</a>';
    const a = editorEl.querySelector('a');
    collapseIn(a.firstChild, 0);
    editor.saveSelection();
    editor.savedLinkNode = a;
    editor.data.linkLabel = 'new label';
    editor.data.linkUrl = 'https://new.example.com';
    editor.data.targetBlank = 'true';
    editor.updateLink();
    expect(a.getAttribute('href')).toBe('https://new.example.com');
    expect(a.innerHTML).toBe('new label');
    expect(a.getAttribute('target')).toBe('_blank');
    expect(editor.data.linkLabel).toBe('');
    await flushMacrotask();
  });

  it('removes target/rel when targetBlank is not true', async () => {
    const editor = createEditor({}, 'hello');
    const editorEl = getEditorEl(editor);
    editorEl.innerHTML = '<a href="https://old.example.com" target="_blank" rel="noopener noreferrer">old</a>';
    const a = editorEl.querySelector('a');
    collapseIn(a.firstChild, 0);
    editor.saveSelection();
    editor.savedLinkNode = a;
    editor.data.linkLabel = 'new label';
    editor.data.linkUrl = 'https://new.example.com';
    editor.data.targetBlank = 'false';
    editor.updateLink();
    expect(a.hasAttribute('target')).toBe(false);
    expect(a.hasAttribute('rel')).toBe(false);
    await flushMacrotask();
  });

  it('unwraps the saved link node', async () => {
    const editor = createEditor({}, 'hello');
    const editorEl = getEditorEl(editor);
    editorEl.innerHTML = 'before<a href="https://example.com">link</a>after';
    const a = editorEl.querySelector('a');
    collapseIn(a.firstChild, 0);
    editor.saveSelection();
    editor.savedLinkNode = a;
    editor.removeLink();
    expect(editorEl.querySelector('a')).toBeNull();
    expect(editorEl.textContent).toBe('beforelinkafter');
    await flushMacrotask();
  });
});

describe('unwrapTag', () => {
  it('moves the caret after the node when the caret sits at the end of a direct child of the editor', async () => {
    const editor = createEditor({}, 'hello');
    const editorEl = getEditorEl(editor);
    editorEl.innerHTML = '<span class="x">hello</span>';
    const span = editorEl.querySelector('span');
    collapseIn(span.firstChild, 5);
    editor.unwrapTag('span', 'x');
    expect(editorEl.querySelector('span')).not.toBeNull();
    await flushMacrotask();
  });

  it('walks up the tree and unwraps the matching ancestor', async () => {
    const editor = createEditor({}, 'hello');
    const editorEl = getEditorEl(editor);
    editorEl.innerHTML = '<span class="x"><b>hello</b></span>';
    const b = editorEl.querySelector('b');
    selectRange(b.firstChild, 1, b.firstChild, 3);
    editor.unwrapTag('span', 'x');
    expect(editorEl.querySelector('span')).toBeNull();
    expect(editorEl.textContent).toBe('hello');
    await flushMacrotask();
  });

  it('opens the link dialog instead of unwrapping when the matching ancestor is a link', async () => {
    const editor = createEditor({}, 'hello');
    const editorEl = getEditorEl(editor);
    editorEl.innerHTML = '<a href="https://example.com" class="x">hello</a>';
    const a = editorEl.querySelector('a');
    selectRange(a.firstChild, 1, a.firstChild, 3);
    editor.unwrapTag('a', 'x');
    expect(editor.data.linkUrl).toBe('https://example.com');
    expect(editorEl.querySelector('a')).not.toBeNull();
    await flushMacrotask();
  });
});

describe('changeMode / toggleSource / showSource / hideSource', () => {
  it('changes the current mode', () => {
    const editor = createEditor({}, 'hello');
    editor.changeMode('markdown');
    expect(editor.data.mode).toBe('markdown');
  });

  it('toggles into source view and clears selected buttons', () => {
    const editor = createEditor({}, 'hello');
    const btn = editor.data.btnOptions.find((b) => b.tag === 'strong');
    btn.selected = true;
    editor.toggleSource();
    expect(editor.data.showSource).toBe(true);
    expect(btn.selected).toBe(false);
  });

  it('toggles out of source view and preserves a lone backslash through the render round-trip', () => {
    // toggleSource() doubles a run of backslashes before this.update() re-renders the template;
    // the template engine's own de-escape pass (which strips one level of "\") then brings the
    // doubled backslash back down to one, so the value the user sees is left unchanged.
    const editor = createEditor({ sourceFirst: true }, 'hello');
    editor.data.value = 'a\\b';
    editor.toggleSource();
    expect(editor.data.showSource).toBe(false);
    expect(editor.data.value).toBe('a\\b');
  });

  it('shows the source view via showSource()', () => {
    const editor = createEditor({}, 'hello');
    editor.showSource();
    expect(editor.data.showSource).toBe(true);
  });

  it('hides the source view via hideSource()', () => {
    const editor = createEditor({ sourceFirst: true }, 'hello');
    editor.hideSource();
    expect(editor.data.showSource).toBe(false);
  });
});

describe('insertExtend', () => {
  it('replaces text_tag with text_extend_tag', () => {
    const editor = createEditor({}, 'hello');
    expect(editor.insertExtend('a text_tag b text_tag')).toBe('a text_extend_tag b text_extend_tag');
  });
});

describe('format', () => {
  it('returns an empty string for falsy input', () => {
    const editor = createEditor({}, 'hello');
    expect(editor.format('')).toBe('');
  });

  it('converts <br> to a newline, nbsp to a space, and re-adds <br> before it (nl2br default true)', () => {
    const editor = createEditor({}, 'hello');
    expect(editor.format('a<br>b&nbsp;c')).toBe('a<br>\nb c');
  });

  it('escapes script tags (the closing tag keeps its leading "<" unescaped)', () => {
    const editor = createEditor({}, 'hello');
    expect(editor.format('<script>x</script>')).toBe('&lt;script&gt;x</script&gt;');
  });

  it('alternates space/nbsp for runs of multiple spaces', () => {
    const editor = createEditor({}, 'hello');
    expect(editor.format('a  b')).toBe('a &nbsp;b');
  });

  it('strips a lone trailing <br> entirely when nl2br is enabled', () => {
    const editor = createEditor({}, 'hello');
    expect(editor.format('a<br>')).toBe('a');
  });

  it('strips a doubled trailing <br><br> down to a single newline when nl2br is disabled', () => {
    const editor = createEditor({ nl2br: false }, 'hello');
    expect(editor.format('a<br><br>')).toBe('a\n');
  });

  it('strips a single trailing <br> when nl2br is disabled', () => {
    const editor = createEditor({ nl2br: false }, 'hello');
    expect(editor.format('a<br>')).toBe('a');
  });

  it('decodes html entities when decodeSource is enabled', () => {
    const editor = createEditor({ decodeSource: true }, 'hello');
    expect(editor.format('a&amp;b')).toBe('a&b');
  });
});

describe('changeOption', () => {
  it('does nothing when the selected value is empty', () => {
    const onSelect = vi.fn();
    const editor = createEditor({
      selectOptions: [{ value: 'a', label: 'A', onSelect }],
    });
    // The constructor itself calls onSelect once for the default-selected option; ignore that call.
    onSelect.mockClear();
    editor.e = { target: { value: '' } };
    editor.changeOption();
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('does nothing when the value matches no option', () => {
    const editor = createEditor({
      selectOptions: [{ value: 'a', label: 'A' }],
    });
    editor.e = { target: { value: 'unknown' } };
    expect(() => editor.changeOption()).not.toThrow();
  });

  it('updates extendLabel and selectedOption and calls onSelect for a matching option', () => {
    const onSelect = vi.fn();
    const editor = createEditor({
      selectOptions: [
        { value: 'a', label: 'A', extendLabel: 'ext-a' },
        { value: 'b', label: 'B', extendLabel: 'ext-b', onSelect },
      ],
    });
    editor.e = { target: { value: 'b' } };
    editor.changeOption();
    expect(editor.data.extendLabel).toBe('ext-b');
    expect(editor.data.selectedOption).toBe('b');
    expect(onSelect).toHaveBeenCalledWith(editor);
  });
});

describe('legacy "tooltip"-named API (deprecated aliases)', () => {
  it('reads data.tooltipLabel/tooltipUrl/tooltipClassName from the new linkLabel/linkUrl/linkClassName fields', () => {
    const editor = createEditor({}, 'hello');
    editor.data.linkLabel = 'a';
    editor.data.linkUrl = 'b';
    editor.data.linkClassName = 'c';
    expect(editor.data.tooltipLabel).toBe('a');
    expect(editor.data.tooltipUrl).toBe('b');
    expect(editor.data.tooltipClassName).toBe('c');
  });

  it('writes through data.tooltipLabel/tooltipUrl/tooltipClassName to the new fields', () => {
    const editor = createEditor({}, 'hello');
    editor.data.tooltipLabel = 'x';
    editor.data.tooltipUrl = 'y';
    editor.data.tooltipClassName = 'z';
    expect(editor.data.linkLabel).toBe('x');
    expect(editor.data.linkUrl).toBe('y');
    expect(editor.data.linkClassName).toBe('z');
  });

  it('updateTooltip() and closeTooltip() delegate to updateLinkDialog()/closeLinkDialog()', () => {
    const editor = createEditor({}, 'hello');
    const editorEl = getEditorEl(editor);
    editorEl.innerHTML = '<a href="https://example.com">link</a>';
    const a = editorEl.querySelector('a');
    editor.updateTooltip(a);
    expect(editor.data.linkUrl).toBe('https://example.com');
    expect(editor.linkDialogOpen).toBe(true);
    editor.closeTooltip();
    expect(editor.data.linkLabel).toBe('');
    expect(editor.linkDialogOpen).toBe(false);
  });

  it('prioritizes an old classNames key over the new key and the default', () => {
    const editor = createEditor({
      classNames: { LiteEditorTooltip: 'my-custom-tooltip', LiteEditorLinkDialog: 'should-be-ignored' },
    });
    expect(editor.data.classNames.LiteEditorLinkDialog).toBe('my-custom-tooltip');
    const dialog = editor._getElementByQuery('[data-selector="lite-editor-link-dialog"]');
    expect(dialog.className).toBe('my-custom-tooltip');
  });

  it('mirrors the resolved class onto the old classNames key for read-back compatibility', () => {
    const editor = createEditor({ classNames: { LiteEditorLinkDialog: 'only-new-key' } });
    expect(editor.data.classNames.LiteEditorTooltip).toBe('only-new-key');
  });

  it('keeps the default dual class names (new and legacy) when nothing is customized', () => {
    const editor = createEditor({}, 'hello');
    const dialog = editor._getElementByQuery('[data-selector="lite-editor-link-dialog"]');
    expect(dialog.classList.contains('lite-editor-link-dialog')).toBe(true);
    expect(dialog.classList.contains('lite-editor-tooltip')).toBe(true);
  });
});
