# sunsup-me

## Foundational description

Suns' Up

Suns' Up は Sun (太陽), Sons(私の子供達), sums up (いいね)の複合した様々な日々の小さな課題を解決するプロダクトを作る個人です。このページはSuns' Upのポートフォリオページです。

Suns' Up portfolio (https://www.sunsup.me/), a static site for Cloudflare Pages. The Japanese text above is the source of truth for what the site means: one person, making products for small everyday problems. The name stacks Sun (the sun), Sons (my children), and sums up (いいね).

## Brand

The header, favicon, and social image are the original logo files.

| File | Role | Pixels |
| --- | --- | --- |
| `public/brand/header-logo.png` | Header logo | 500×200 PNG |
| `public/brand/og-image.png` | Open Graph and Twitter image | 500×200 PNG, byte-identical to the header logo |
| `public/brand/favicon.png` | The only icon (`rel="icon"`) | 500×200 PNG |

Product marks and Deep-GPTL screens live in `public/media/`.

## Cloudflare Pages

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node.js version | 22 (see `.node-version`) |

`npm run build` runs Astro and writes static files to `dist/`. The build fails if a Framer CDN URL remains, or if the home page does not contain exactly one link to `https://stylish.sunsup.me/`.

## Pages

Clean URLs come from directory indexes:

- `/` → `dist/index.html`
- `/about/me` → `dist/about/me/index.html`
- `/work/portfolio` → `dist/work/portfolio/index.html`
- `/work/stylish` → `dist/work/stylish/index.html`
- `/work/easy-ist` → `dist/work/easy-ist/index.html`
- `/work/deep-gptl` → `dist/work/deep-gptl/index.html`
- `/work/trading` → `dist/work/trading/index.html`
- `/work/consulting` → `dist/work/consulting/index.html`
- unknown paths → `dist/404.html`

`dist/sitemap.xml` and `dist/robots.txt` are included.

## Local preview

```sh
npm run build
npm run preview
```
