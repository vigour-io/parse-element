'use strict'
require('html-element')
const parse = require('../')
const perf = require('vigour-performance')
const element = global.document.createElement('div')
const span = global.document.createElement('span')
span.appendchild(global.document.createTextNode('hello'))
element.appendchild(span)

function outerHTML () {
  for (let i = 0; i < 1e4; i++) {
    element.outerHTML
  }
}

function parseElement () {
  for (let i = 0; i < 1e4; i++) {
    parse(element)
  }
}

perf(parseElement, outerHTML, 1 / 20)
