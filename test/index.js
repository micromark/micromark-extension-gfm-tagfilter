import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import test from 'node:test'
import {micromark} from 'micromark'
import {gfmTagfilterHtml as html} from 'micromark-extension-gfm-tagfilter'

const input = await fs.readFile(new URL('input.md', import.meta.url))
const output = String(
  await fs.readFile(new URL('output.html', import.meta.url))
)

test('core', async () => {
  assert.deepEqual(
    Object.keys(await import('micromark-extension-gfm-tagfilter')).sort(),
    ['gfmTagfilterHtml'],
    'should expose the public api'
  )
})

test('markdown -> html (micromark)', () => {
  assert.equal(
    micromark(input, {allowDangerousHtml: true, htmlExtensions: [html]}),
    output,
    'should support a tag filter just like how GH does it'
  )

  assert.equal(
    micromark('a <i>\n<script>', {htmlExtensions: [html]}),
    '<p>a &lt;i&gt;</p>\n&lt;script&gt;',
    'should not turn `allowDangerousHtml` on'
  )
})
