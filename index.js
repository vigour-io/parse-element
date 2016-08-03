'use strict'

module.exports = function parseElement (e) {
  const name = e.nodeName
  if (name === '#text') {
    return escapeAttribute(e.value) || ''
  }
  const attr = e.attributes
  const styles = e.style
  const children = e.childNodes
  var html = `<${name}`
  var haschildren

  if (e.className) {
    html += ` class="${e.className}"`
  }

  if (attr) {
    for (let i = 0, len = attr.length; i < len; i++) {
      let val = attr[i].value
      if (attr[i].name === 'value') {
        val = escapeValue(attr[i].value)
      } else {
        val = escapeAttribute(attr[i].value)
      }
      html += ` ${attr[i].name}="${val}"`
    }
  }

  if (styles) {
    let keys = Object.keys(styles)
    if (keys.length > 2) {
      html += ' style="'
      for (let i = 2, len = keys.length; i < len; i++) {
        let key = keys[i]
        html += (i > 2 ? ' ' : '') + `${key}: ${styles[key]};`
      }
      html += '"'
    }
  }

  if (e.id) {
    html += ` id="${e.id}"`
  }

  html += '>'

  for (let i in children) {
    let val
    if (typeof children[i] === 'string') {
      val = children[i]
    } else {
      val = parseElement(children[i])
    }
    if (val || (val === 0)) {
      if (!haschildren) {
        haschildren = true
      }
      html += val
    }
  }

  if (name !== 'input' || haschildren) {
    html += `</${name}>`
  }
  return html
}

function escapeValue (s) {
  return typeof s === 'string' ? s.replace(/&/g, '&amp;') : s
}

function escapeAttribute (s) {
  return typeof s === 'string'
    ? s.replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
    : s
}
