import fs from 'node:fs'
import path from 'node:path'
import test from 'tape'
import {micromark} from 'micromark'
import {gfmTagfilterHtml as html} from '../index.js'

const input = fs.readFileSync(path.join('test', 'input.md'))
const output = fs.readFileSync(path.join('test', 'output.html'), 'utf8')

test('markdown -> html (micromark)', (t) => {
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
