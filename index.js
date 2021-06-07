// An opening or closing tag, followed by a case-insensitive specific tag name,
// followed by HTML whitespace, a greater than, or a slash.
var reFlow =
  /<(\/?)(iframe|noembed|noframes|plaintext|script|style|title|textarea|xmp)(?=[\t\n\f\r />])/gi
// As HTML (text) parses tags separately (and v. strictly), we don’t need to be
// global.
var reText = new RegExp('^' + reFlow.source, 'i')

export const gfmTagfilterHtml = {
  exit: {
    htmlFlowData(token) {
      exitHtmlData.call(this, token, reFlow)
    },
    htmlTextData(token) {
      exitHtmlData.call(this, token, reText)
    }
  }
}

function exitHtmlData(token, filter) {
  var value = this.sliceSerialize(token)

  if (this.options.allowDangerousHtml) {
    value = value.replace(filter, '&lt;$1$2')
  }

  this.raw(this.encode(value))
}
