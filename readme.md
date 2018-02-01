# LiteEditor
[![npm version](https://badge.fury.io/js/lite-editor.svg)](https://badge.fury.io/js/lite-editor)
[![CircleCI](https://circleci.com/gh/appleple/lite-editor/tree/master.svg?style=shield)](https://circleci.com/gh/appleple/lite-editor/tree/master)
[![npm download](http://img.shields.io/npm/dm/lite-editor.svg)](https://www.npmjs.com/package/lite-editor)
[![GitHub license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://raw.githubusercontent.com/appleple/lite-editor/master/LICENSE)

A Modern WYSIWYG Editor especially for inline elements

## Feature

- focuses on inline elements such as b, a, i, strong
- Prevent unnecessary tags insertion
- Control how to make newlines
- You can register custom button easily 

## Installation

- [npm](https://www.npmjs.com/package/lite-editor)
- [standalone](https://unpkg.com/lite-editor@1.4.0/js/lite-editor.min.js)

via npm
```shell
npm install lite-editor --save
```

or yarn

```shell
yarn add lite-editor
```

## Usage

require
```js
const LiteEditor = require('lite-editor');
```

```js
window.addEventListener('DOMContentLoaded',function(){
  new LiteEditor('.js-editor');
});
```

## Document
[https://appleple.github.io/lite-editor/about.html](https://appleple.github.io/lite-editor/about.html)

## Download
[Download ZIP](https://github.com/appleple/lite-editor/archive/master.zip)

## Plugins
- [lite-editor-emoji-picker-plugin](https://github.com/appleple/lite-editor-emoji-picker-plugin)

## Github
[https://github.com/appleple/lite-editor](https://github.com/appleple/lite-editor)

## Contributor
[@steelydylan](https://github.com/steelydylan)

## License
Code and documentation copyright 2017 by appleple, Inc. Code released under the [MIT License](https://github.com/appleple/lite-editor/blob/master/LICENSE).
