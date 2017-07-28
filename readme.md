# simple-wysiwyg

inline-only-wysiwyg

## Feature

## Installation

## Usage

```js
window.addEventListener('DOMContentLoaded',function(){
  new SimpleWysiwyg('.js-simple-wysiwyg',{
    mode:'direct',
    message: {
      addLinkTitle: 'リンク先URLを入力してください。',
      addLinkBtn: 'リンクの挿入',
      resetStyleBtn: 'リセット',
      sourceBtn: 'ソース'
    },
    selectOptions: [
      { 
        label: '本文', 
        value: 'p'
      },
      { 
        label: 'マークダウン', 
        value: 'markdown', 
        onSelect: function(){
          this.toMarkdown();
        }
      }
    ],
    selectedOption: 'p',
    btnOptions: [
      { label: 'リンクを挿入', tag: 'a', className: ''},
      { label: '強調1', tag: 'em', className: ''},
      { label: '強調2', tag: 'strong', className: ''},
      { label: '赤', tag: 'span', className: 'red'},
      { label: '青', tag: 'span', className: 'blue'},
      { label: '黄', tag: 'span', className: 'yellow'}
    ]
  });
});
```

## Download
[Download ZIP](https://github.com/appleple/miniedietor/archive/master.zip)

## Github
[https://github.com/appleple/simple-wysiwyg](https://github.com/appleple/simple-wysiwyg)

## Contributor
[@steelydylan](https://github.com/steelydylan)

## License
Code and documentation copyright 2017 by appleple, Inc. Code released under the [MIT License](https://github.com/appleple/simple-wysiwyg/blob/master/LICENSE).
