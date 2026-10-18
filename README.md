# sunsup-me

Suns' Up portfolio (https://www.sunsup.me/), migrated from Framer to a static site for Cloudflare Pages.

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
