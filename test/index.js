var fs = require('fs')
var path = require('path')
var test = require('tape')
var micromark = require('micromark')
var html = require('../html')

var input = fs.readFileSync(path.join(__dirname, 'input.md'))
var output = fs.readFileSync(path.join(__dirname, 'output.html'), 'utf8')

test('markdown -> html (micromark)', function (t) {
  t.deepEqual(
    micromark(input, {allowDangerousHtml: true, htmlExtensions: [html]}),
    output,
    'should support a tag filter just like how GH does it'
  )

  t.deepEqual(
    micromark('a <i>\n<script>', {htmlExtensions: [html]}),
    '<p>a &lt;i&gt;</p>\n&lt;script&gt;',
    'should not turn `allowDangerousHtml` on'
  )

  t.end()
})
