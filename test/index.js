'use strict'
require('html-element')
const test = require('tape')
const parseElement = require('../')

test('parse element', (t) => {
  const div = global.document.createElement('div')
  div.className = 'hello'
  const input = global.document.createElement('input')
  input.setAttribute('value', '<hello & goodbye>')
  div.appendChild(input)
  t.equal(
    parseElement(div),
    '<div class="hello"><input value="<hello &amp; goodbye>"></div>',
    'div + input'
  )

  const textarea = global.document.createElement('textarea')
  textarea.appendChild(document.createTextNode('some text'))
  t.equal(
    parseElement(textarea),
    '<textarea>some text</textarea>',
    'textarea'
  )

  const emptyTextarea = global.document.createElement('textarea')
  t.equal(
    parseElement(emptyTextarea),
    '<textarea></textarea>',
    'empty textarea'
  )

  const span = global.document.createElement('span')
  span.appendChild(document.createTextNode('<ha & ha>'))
  span.setAttribute('special', 100)
  span.id = 'hello'
  t.equal(
    parseElement(span),
    '<span special="100" id="hello">&lt;ha &amp; ha&gt;</span>',
    'span'
  )

  const html = global.document.createElement('span')
  html.innerHTML = '<p>hey</p>'
  t.equal(
    parseElement(html),
    '<span><p>hey</p></span>',
    'innerHTML'
  )

  const emptyHtml = global.document.createElement('span')
  emptyHtml.innerHTML = ''
  t.equal(
    parseElement(emptyHtml),
    '<span></span>',
    'empty innerHTML'
  )

  t.end()
})
