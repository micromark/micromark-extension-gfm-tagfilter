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

var insideHtmlFlow
var insideHtmlText

function enterHtmlFlowWithTagFilter() {
  insideHtmlFlow = true
  this.lineEndingIfNeeded()
  if (this.options.allowDangerousHtml) {
    this.setIgnoreEncode(true)
  }
}

function enterHtmlTextWithTagFilter() {
  insideHtmlText = true
  if (this.options.allowDangerousHtml) {
    this.setIgnoreEncode(true)
  }
}

function exitHtml() {
  this.setIgnoreEncode()
  insideHtmlFlow = undefined
  insideHtmlText = undefined
}

function exitData(token) {
  var value = this.sliceSerialize(token)
  var filter = insideHtmlFlow ? reFlow : insideHtmlText ? reText : undefined

  if (filter && this.options.allowDangerousHtml) {
    value = value.replace(filter, '&lt;$1$2')
  }

  this.raw(this.encode(value))
}
