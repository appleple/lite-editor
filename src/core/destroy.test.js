import { describe, it, expect, beforeEach } from 'vitest';
import LiteEditor from './index';

function createEditor(settings = {}, initialValue) {
  document.body.innerHTML = '';
  const textarea = document.createElement('textarea');
  textarea.className = 'js-lite-editor';
  textarea.setAttribute('name', 'entry_body');
  if (initialValue !== undefined) {
    textarea.textContent = initialValue;
  }
  document.body.appendChild(textarea);
  return new LiteEditor('.js-lite-editor', settings);
}

describe('destroy', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('エディタのルート要素を DOM から撤去する', () => {
    const editor = createEditor();
    expect(document.querySelector(`[data-id='${editor.id}']`)).not.toBeNull();
    editor.destroy();
    expect(document.querySelector(`[data-id='${editor.id}']`)).toBeNull();
  });

  // コンストラクタが元の textarea を DOM から外して置き換えるため、
  // 撤去しただけではページに入力欄が何も残らない
  it('コンストラクタが差し替えた元要素を復帰させる', () => {
    const editor = createEditor({}, '<p>hello</p>');
    expect(document.querySelector('textarea.js-lite-editor')).toBeNull();
    editor.destroy();
    const restored = document.querySelector('textarea.js-lite-editor');
    expect(restored).not.toBeNull();
    expect(restored.getAttribute('name')).toBe('entry_body');
  });

  it('復帰させた元要素に編集内容を書き戻す', () => {
    const editor = createEditor({}, '<p>hello</p>');
    editor.destroy();
    expect(document.querySelector('textarea.js-lite-editor').value).toContain('hello');
  });

  it('元要素はエディタがあった位置に復帰させる', () => {
    document.body.innerHTML = '';
    const before = document.createElement('div');
    before.id = 'before';
    const textarea = document.createElement('textarea');
    textarea.className = 'js-lite-editor';
    const after = document.createElement('div');
    after.id = 'after';
    document.body.append(before, textarea, after);
    const editor = new LiteEditor('.js-lite-editor');
    editor.destroy();
    const children = [...document.body.children].map(el => el.id || el.tagName.toLowerCase());
    expect(children).toEqual(['before', 'textarea', 'after']);
  });

  it('on() で登録したリスナーを解除する', () => {
    const editor = createEditor();
    const calls = [];
    editor.on('change', () => calls.push(1));
    const source = editor._getElementByQuery('[data-selector="lite-editor-source"]');
    editor.destroy();
    source.dispatchEvent(new window.Event('change', { bubbles: true }));
    expect(calls).toEqual([]);
  });

  it('data-action 系のイベントを解除する', () => {
    const editor = createEditor();
    const btn = editor._getElementByQuery('[data-action-click]');
    editor.destroy();
    expect(() => btn.dispatchEvent(new window.Event('click', { bubbles: true }))).not.toThrow();
  });

  // open のまま撤去すると top-layer に取り残され、ページ全体が inert なまま
  // クリックを吸い続ける
  it('open 状態のリンクダイアログを閉じてから撤去する', () => {
    const editor = createEditor();
    const dialog = editor._getElementByQuery('[data-selector="lite-editor-link-dialog"]');
    dialog.setAttribute('open', '');
    expect(dialog.open).toBe(true);
    editor.destroy();
    expect(dialog.open).toBe(false);
  });

  it('undo 履歴への参照を手放す', () => {
    const editor = createEditor({}, '<p>hello</p>');
    editor.destroy();
    expect(editor.stack).toEqual([]);
    expect(editor.selector).toBeNull();
  });

  it('2回呼んでも例外を投げない (冪等)', () => {
    const editor = createEditor();
    editor.destroy();
    expect(() => editor.destroy()).not.toThrow();
  });

  it('2回呼んでも元要素を二重に挿入しない', () => {
    const editor = createEditor();
    editor.destroy();
    editor.destroy();
    expect(document.querySelectorAll('textarea.js-lite-editor')).toHaveLength(1);
  });

  it('メソッドチェーンできる', () => {
    const editor = createEditor();
    expect(editor.destroy()).toBe(editor);
  });
});
