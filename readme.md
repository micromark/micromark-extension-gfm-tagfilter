# micromark-extension-gfm-tagfilter

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[micromark][] extension to support GFM [tag filter][].

## Contents

*   [What is this?](#what-is-this)
*   [When to use this](#when-to-use-this)
*   [Install](#install)
*   [Use](#use)
*   [API](#api)
    *   [`gfmTagfilterHtml`](#gfmtagfilterhtml)
*   [HTML](#html)
*   [CSS](#css)
*   [Syntax](#syntax)
*   [Types](#types)
*   [Compatibility](#compatibility)
*   [Security](#security)
*   [Related](#related)
*   [Contribute](#contribute)
*   [License](#license)

## What is this?

This package contains extensions that add support for the tagfilter enabled by
GFM to [`micromark`][micromark].
The tagfilter is kinda weird and kinda useless.
This package exists for completeness.
The tag filter is a naïve attempt at XSS protection.
You should use a proper HTML sanitizing algorithm.

## When to use this

These tools are all low-level.
In many cases, you want to use [`remark-gfm`][plugin] with remark instead.
It doesn’t use this extension, as with remark (and rehype) there’s a better
alternative: [`rehype-sanitize`][rehype-sanitize].

Even when you want to use `micromark`, you likely want to use
[`micromark-extension-gfm`][micromark-extension-gfm] to support all GFM
features.
That extension includes this extension.

When working with syntax trees (mdast), you should turn it into hast and then
use [`hast-util-sanitize`][hast-util-sanitize].

## Install

This package is [ESM only][esm].
In Node.js (version 12.20+, 14.14+, 16.0+, or 18.0+), install with [npm][]:

```sh
npm install micromark-extension-gfm-tagfilter
```

In Deno with [`esm.sh`][esmsh]:

```js
import {gfmTagfilterHtml} from 'https://esm.sh/micromark-extension-gfm-tagfilter@1'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import {gfmTagfilterHtml} from 'https://esm.sh/micromark-extension-gfm-tagfilter@1?bundle'
</script>
```

## Use

```js
import {micromark} from 'micromark'
import {gfmTagfilterHtml} from 'micromark-extension-gfm-tagfilter'

const output = micromark('XSS! <script>alert(1)</script>', {
  allowDangerousHtml: true,
  htmlExtensions: [gfmTagfilterHtml]
})

console.log(output)
```

Yields:

```html
<p>XSS! &lt;script>alert(1)&lt;/script></p>
```

## API

This package exports the identifier `gfmTagfilterHtml`.
There is no default export.

### `gfmTagfilterHtml`

HTML extension for micromark (passed in `htmlExtensions`).

## HTML

GFM tagfilter removes certain dangerous HTML tags: `iframe`, `noembed`,
`noframes`, `plaintext`, `script`, `style`, `title`, `textarea`, and `xmp`.

## CSS

This package does not relate to CSS.

## Syntax

This package does not change how markdown is parsed.

## Types

This package is fully typed with [TypeScript][].
It exports no additional types.

## Compatibility

This package is at least compatible with all maintained versions of Node.js.
As of now, that is Node.js 12.20+, 14.14+, 16.0+, and 18.0+.
It also works in Deno and modern browsers.

## Security

While micromark is safe by default, this extension only does something when
`allowDangerousHtml: true` is passed, which is an unsafe option.
This package is **not safe**.

## Related

*   [`syntax-tree/mdast-util-gfm`][mdast-util-gfm]
    — support GFM in mdast
*   [`remarkjs/remark-gfm`][plugin]
    — support GFM in remark
*   [`rehypejs/rehype-sanitize`][rehype-sanitize]
    — sanitize HTML in rehype

## Contribute

See [`contributing.md` in `micromark/.github`][contributing] for ways to get
started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://github.com/micromark/micromark-extension-gfm-tagfilter/workflows/main/badge.svg

[build]: https://github.com/micromark/micromark-extension-gfm-tagfilter/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/micromark/micromark-extension-gfm-tagfilter.svg

[coverage]: https://codecov.io/github/micromark/micromark-extension-gfm-tagfilter

[downloads-badge]: https://img.shields.io/npm/dm/micromark-extension-gfm-tagfilter.svg

[downloads]: https://www.npmjs.com/package/micromark-extension-gfm-tagfilter

[size-badge]: https://img.shields.io/bundlephobia/minzip/micromark-extension-gfm-tagfilter.svg

[size]: https://bundlephobia.com/result?p=micromark-extension-gfm-tagfilter

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/micromark/micromark/discussions

[npm]: https://docs.npmjs.com/cli/install

[esmsh]: https://esm.sh

[license]: license

[author]: https://wooorm.com

[contributing]: https://github.com/micromark/.github/blob/main/contributing.md

[support]: https://github.com/micromark/.github/blob/main/support.md

[coc]: https://github.com/micromark/.github/blob/main/code-of-conduct.md

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[typescript]: https://www.typescriptlang.org

[micromark]: https://github.com/micromark/micromark

[micromark-extension-gfm]: https://github.com/micromark/micromark-extension-gfm

[mdast-util-gfm]: https://github.com/syntax-tree/mdast-util-gfm

[plugin]: https://github.com/remarkjs/remark-gfm

[rehype-sanitize]: https://github.com/rehypejs/rehype-sanitize

[hast-util-sanitize]: https://github.com/syntax-tree/hast-util-sanitize

[tag filter]: https://github.github.com/gfm/#disallowed-raw-html-extension-
