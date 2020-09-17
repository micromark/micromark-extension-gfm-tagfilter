exports.enter = {
  htmlFlow: enterHtmlFlowWithTagFilter,
  htmlText: enterHtmlTextWithTagFilter
}
exports.exit = {
  htmlFlow: exitHtml,
  htmlText: exitHtml,
  data: exitData
}

// An opening or closing tag, followed by a case-insensitive specific tag name,
// followed by HTML whitespace, a greater than, or a slash.
var reFlow = /<(\/?)(iframe|noembed|noframes|plaintext|script|style|title|textarea|xmp)(?=[\t\n\f\r />])/gi
// As HTML (text) parses tags separately (and v. strictly), we don’t need to be
// global.
var reText = new RegExp('^' + reFlow.source, 'i')

function enterHtmlFlowWithTagFilter() {
  this.lineEndingIfNeeded()
  this.setData('insideHtmlFlow', true)
  if (this.options.allowDangerousHtml) {
    this.setData('ignoreEncode', true)
  }
}

function enterHtmlTextWithTagFilter() {
  this.setData('insideHtmlText', true)
  if (this.options.allowDangerousHtml) {
    this.setData('ignoreEncode', true)
  }
}

function exitHtml() {
  this.setData('ignoreEncode')
  this.setData('insideHtmlFlow')
  this.setData('insideHtmlText')
}

function exitData(token) {
  var value = this.sliceSerialize(token)
  var filter = this.getData('insideHtmlFlow')
    ? reFlow
    : this.getData('insideHtmlText')
    ? reText
    : undefined

  if (filter && this.options.allowDangerousHtml) {
    value = value.replace(filter, '&lt;$1$2')
  }

  this.raw(this.encode(value))
}
