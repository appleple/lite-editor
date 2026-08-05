// vite.config.js
import { defineConfig } from 'vite';
import string from 'vite-plugin-string';
import path from 'path';

export default defineConfig(({ mode }) => {
  // `vite build --mode minify` は `.min.js` / `.min.css` を出力する
  const suffix = mode === 'minify' ? '.min' : '';

  return {
    server: {
      open: '/examples/', // ← 起動時に /examples/ を開く
    },
    build: {
      outDir: 'js', // JS 出力先
      emptyOutDir: false, // js/ を消さない
      lib: {
        entry: path.resolve(import.meta.dirname, 'src/index.js'),
        name: 'LiteEditor',
        fileName: (format) => `lite-editor.${format}${suffix}.js`,
        formats: ['es', 'iife'],
      },
      minify: true,
      rollupOptions: {
        output: {
          assetFileNames: `lite-editor${suffix}.[ext]`,
        },
      },
    },
    css: {
      devSourcemap: true,
    },
    plugins: [
      string({
        include: ['**/*.html'], // .html を文字列としてインポート
      }),
    ],
    test: {
      environment: 'jsdom',
      coverage: {
        provider: 'v8',
        reporter: ['text', 'html'],
        include: ['src/**/*.js'],
        exclude: ['src/**/*.test.js'],
      },
    },
  };
});
