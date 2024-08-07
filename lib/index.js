/**
 * @import {CompileContext, HtmlExtension, Token} from 'micromark-util-types'
 */

// An opening or closing tag start, followed by a case-insensitive specific tag name,
// followed by HTML whitespace, a greater than, or a slash.
const reFlow =
  /<(\/?)(iframe|noembed|noframes|plaintext|script|style|title|textarea|xmp)(?=[\t\n\f\r />])/gi

// As HTML (text) parses tags separately (and very strictly), we don’t need to be
// global.
const reText = new RegExp('^' + reFlow.source, 'i')

/**
 * Create an HTML extension for `micromark` to support GitHubs weird and
 * useless tagfilter when serializing to HTML.
 *
 * @returns {HtmlExtension}
 *   Extension for `micromark` that can be passed in `htmlExtensions` to support
 *   GitHubs weird and useless tagfilter when serializing to HTML.
 */
export function gfmTagfilterHtml() {
  return {
    exit: {
      htmlFlowData(token) {
        exitHtmlData.call(this, token, reFlow)
      },
      htmlTextData(token) {
        exitHtmlData.call(this, token, reText)
      }
    }
  }
}

/**
 * @this {CompileContext}
 * @param {Token} token
 * @param {RegExp} filter
 * @returns {undefined}
 */
function exitHtmlData(token, filter) {
  let value = this.sliceSerialize(token)

  if (this.options.allowDangerousHtml) {
    value = value.replace(filter, '&lt;$1$2')
  }

  this.raw(this.encode(value))
}
