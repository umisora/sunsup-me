# sunsup-me

## Foundational description

Suns' Up

Suns' Up は Sun (太陽), Sons(私の子供達), sums up (いいね)の複合した様々な日々の小さな課題を解決するプロダクトを作る個人です。このページはSuns' Upのポートフォリオページです。

Suns' Up portfolio (https://www.sunsup.me/), migrated from Framer to a static site for Cloudflare Pages. The English text on the pages is the live site copy. The Japanese text above is the source of truth for what the site means.

## Brand

Original files from the live site, saved at the resolution Framer serves. `header-logo.png` and `og-image.png` are the same PNG (the header also uses it, and so do the Open Graph and Twitter images). The pages still load these bytes from `site/assets/images/`.

| File | Role | Pixels | Live source |
| --- | --- | --- | --- |
| `public/brand/header-logo.png` | Header logo | 500×200 PNG | `o0CZu6Cp6EcAaHbvXjEECggq68k.png` |
| `public/brand/og-image.png` | Open Graph and Twitter image | 500×200 PNG, byte-identical to the header logo | `o0CZu6Cp6EcAaHbvXjEECggq68k.png` |
| `public/brand/favicon.png` | The only icon (`rel="icon"`) | 500×200 PNG | `y6BmvMzbN6R4oWIMBAWSW0K6o4.png` |

The live site does not publish an apple-touch icon, a `favicon.ico`, or an SVG of the logo.

## Cloudflare Pages

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node.js version | 22 (see `.node-version`) |

`npm run build` copies `site/` to `dist/` and fails if any Framer CDN URL remains in the output.

## Pages

Clean URLs come from directory indexes:

- `/` → `dist/index.html`
- `/about/me` → `dist/about/me/index.html`
- `/work/portfolio` → `dist/work/portfolio/index.html` (new)
- `/work/stylish` → `dist/work/stylish/index.html` (new)
- `/work/easy-ist` → `dist/work/easy-ist/index.html` (new)
- `/work/deep-gptl` → `dist/work/deep-gptl/index.html` (migrated from Framer)
- `/work/trading` → `dist/work/trading/index.html` (new)
- `/work/consulting` → `dist/work/consulting/index.html` (new)
- unknown paths → `dist/404.html`

`dist/sitemap.xml` and `dist/robots.txt` are included.

## Local preview

```sh
npm run build
python3 -m http.server 4173 --directory dist
```
