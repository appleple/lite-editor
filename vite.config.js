// vite.config.js
import { defineConfig } from 'vite';
import string from 'vite-plugin-string';
import path from 'path';

export default defineConfig({
  server: {
    open: '/examples/', // ← 起動時に /examples/ を開く
  },
  build: {
    outDir: 'js', // JS 出力先
    emptyOutDir: false, // js/ を消さない
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      name: 'LiteEditor',
      fileName: (format) => `lite-editor.${format}.js`,
      formats: ['es', 'iife'],
    },
    minify: true,
  },
  css: {
    devSourcemap: true,
  },
  plugins: [
    string({
      include: ['**/*.html'], // .html を文字列としてインポート
    }),
  ],
  resolve: {
    alias: {
      buffer: 'buffer',
    },
  },
});
