import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import test from 'node:test'
import {micromark} from 'micromark'
// . import {gfmTagfilterHtml} from 'micromark-extension-gfm-tagfilter'
import {gfmTagfilterHtml} from '../index.js'

const input = await fs.readFile(new URL('input.md', import.meta.url))
const output = String(
  await fs.readFile(new URL('output.html', import.meta.url))
)

test('markdown -> html (micromark)', async function (t) {
  await t.test('should expose the public api', async function () {
    assert.deepEqual(Object.keys(await import('../index.js')).sort(), [
      'gfmTagfilterHtml'
    ])
  })

  await t.test(
    'should support a tag filter just like how GH does it',
    async function () {
      assert.equal(
        micromark(input, {
          allowDangerousHtml: true,
          htmlExtensions: [gfmTagfilterHtml()]
        }),
        output
      )
    }
  )

  await t.test('should not turn `allowDangerousHtml` on', async function () {
    assert.equal(
      micromark('a <i>\n<script>', {htmlExtensions: [gfmTagfilterHtml()]}),
      '<p>a &lt;i&gt;</p>\n&lt;script&gt;'
    )
  })
})
