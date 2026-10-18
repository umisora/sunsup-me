# Design review

Run this before calling a visual change done. Check every page at 1280 and 390, including 404. Screenshot the full page after motion has settled: the title has finished resolving, typed lines are complete, and every reveal is at opacity 1. Then look at the hero, each logo at 100% zoom, and the text on top of it.

`frontend-design` and `design-review` are not installed in this environment. This file is the review. Use it with the page in a browser. If `modern-web-guidance` is available, check contrast and `color-scheme` against it.

## Checklist

- The page is a light lab surface: off-white or cool grey, thin lines, a blueprint grid. Sunrise orange and cyan are accents. Body text is dark and stays readable.
- The hero is a light scene. The sun and grid do not force a dark panel behind the title.
- Every image/logo sits naturally in its container: no unintended white box, matched background or transparent cutout, consistent scale and padding, grounded with shadow/border consistent with the system.
- Corner brackets, ticks, and the scan line stay inside the plate and do not cover the mark.
- Type contrast is at least 4.5:1 for text and 3:1 for large type and controls. Accent orange and cyan are not used for long paragraphs.
- `prefers-reduced-motion` leaves a still frame. Tap targets stay at least 44px. Nothing scrolls sideways.
- Copy on the site does not explain the Sun / Sons / sums up name. Facts stay the ones already published.
- Stylish! links only to https://stylish.sunsup.me/. No Framer URL.
- Faded or disabled-looking content fails. Cards, logos, and body text are fully opaque on first paint. A scroll reveal must not set opacity below 1, and it must not leave content faded when JavaScript is slow or the reader does not scroll.
- Bleached logos fail. The plate frames the mark. It does not knock the colour out, fade the edges, or lay a scan, shadow, or tint across the artwork. At 100% zoom the mark keeps the original file's saturation and edge crispness.
- An orphaned CTA fails. The button sits in the same stack as the title it belongs to. It does not float alone in empty space.
- Dead whitespace fails. A pale empty band is not a layout. Space in the hero is the sun, the floor grid, or the next section.

## How to look at a logo

1. Find each `img` and the Deep-GPTL graphic.
2. Sample the corners of the image box. A near-white rectangle that does not match the plate is a white box.
3. Compare padding with the other plates. A mark that touches the frame, or one that floats with no shadow, fails.
4. Fix the asset or the plate, then look again at both widths.
