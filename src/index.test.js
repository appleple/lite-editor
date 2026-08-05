import { describe, it, expect } from 'vitest';
import LiteEditorFromEntry from './index';
import LiteEditorFromCore from './core';

describe('package entry point', () => {
  it('re-exports the LiteEditor class as the default export', () => {
    expect(LiteEditorFromEntry).toBe(LiteEditorFromCore);
  });
});
