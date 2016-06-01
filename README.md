# parse-element
<!-- VDOC.badges travis; standard; npm; coveralls -->
<!-- DON'T EDIT THIS SECTION (including comments), INSTEAD RE-RUN `vdoc` TO UPDATE -->
[![Build Status](https://travis-ci.org/vigour-io/parse-element.svg?branch=master)](https://travis-ci.org/vigour-io/parse-element)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![npm version](https://badge.fury.io/js/parse-element.svg)](https://badge.fury.io/js/parse-element)
[![Coverage Status](https://coveralls.io/repos/github/vigour-io/parse-element/badge.svg?branch=master)](https://coveralls.io/github/vigour-io/parse-element?branch=master)

<!-- VDOC END -->
Fast html parser for dom-elements - works with [html-element](https://www.npmjs.com/package/html-element)
& in the browser (where it uses outerHTML)

- Around [30x faster](https://github.com/vigour-io/parse-element/tree/master/test/perf.js) then element.outerHTML from html-element
- Does not parse fields on elements set without setAttribute

```javascript
const parseElement = require('parse-element')
const div = global.document.createElement('div')
div.appendchild(global.document.createTextNode('text!'))
console.log(parseElement(div)) //<div>text!</div>
```