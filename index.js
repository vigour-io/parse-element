'use strict'
// also be able to parse document
module.exports = function parseElement (element) {
  const name = this.nodeName
  const attr = this.attributes
  const children = this.childNodes
  var html = '<' + name
  for (let i = 0, len = attr.length; i < len; i++) {
    let val = attr[i].value
    if (typeof val === 'string') {
      val = escapeAttribute(attr[i].value)
    }
    html += ' ' + attr[i].name + '="' + val + '"'
  }
  if (this.id) {
    html += ` id="${this.id}"`
  }
  if (this.className) {
    html += ` class="${this.className}"`
  }
  if (this.value) {
    html += ` value="${escapeHTML(this.value)}"`
  }
  html += '>'
  for (let i = 0, len = children.length; i < len; i++) {
    html += children[i].html()
  }
  html += `</${name}>`
  return html
}

// this piece can be geatly optmized
function escapeHTML (s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function escapeAttribute (s) {
  return escapeHTML(s).replace(/"/g, '&quot;')
}
