# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repository is

Personal portfolio site for cristhianmenezes.com.br. This directory is **not a git repo and contains no source code**: `site` is the **compiled production build** of a Vite + Vue 3 + Three.js app. There is no `package.json`, no build step, no linter and no tests. The original source (`.vue` components, shaders, Vite config) lives somewhere else.

So:
- `site/assets/main.js` is the whole app in one ES module of about 40k lines (Vue 3.5, vue-router, Three.js, postprocessing, GSAP, OverlayScrollbars, plus the site's own code). It has been pretty-printed with Prettier and split into sections by `// [LIB-n]` / `// [SITE-n]` banner comments. The header at the top of the file indexes them. Only `[SITE-n]` sections are site code. Identifiers are still minified (`n`, `e`, `Oe`, `K_`…), so find things by string literals or CSS class names, not variable names.
- Edit in place and keep the banners. After editing, check syntax by copying the file to a `.mjs` path and running `node --check` on it, since the file is an ES module.
- `site/index.html` loads `/assets/main.js` and `/assets/main.css`. `main.js` lazy-imports `./tweakpane.js` and `./tweakpane-plugin-essentials.js` by those exact names.
- `_backup-minificado/` (project root) holds the original minified build with hashed filenames. It is not served and is kept only as a fallback.
- Any larger change (new sections, layout, shader edits) needs the original source project or a rebuild. Patching the bundle is not a substitute.

## Where the editable content lives in `main.js`

- `[SITE-8]` About section: name, description, LinkedIn, website and e-mail (the `About` component).
- `[SITE-9]` Projects data object: `title`, `description`, `link` and media for each project.
- `[SITE-1]` WebGL texture manifest (paths under `webgl/textures/`).
- `[SITE-3]` Debug panel. Setting `this.isActive = !0` in its constructor turns on the Tweakpane GUI.
- Image and video paths for the media player and CTAs are plain string constants in `[SITE-10]`.

## Links page (`site/links/`)

A hand-written link-in-bio page, separate from the Vue build and served at `/links/`. It has no framework. `index.html` holds the styles and a small renderer, and all content (profile, social icons, link buttons, section titles, footer) comes from `window.LINKS_CONFIG` in `config.js`. Content edits belong in `config.js`, and icons go in `links/icons/`. An empty `icon` renders a dashed placeholder with the item's initial letter.

It reuses the main site's identity: the Comic CAT font, `#0000a0` background, `#1c1c1c` cards with a 2rem radius, `#c9c9c9` secondary text, and elastic easing. Comic CAT has no accented glyphs, so its `@font-face` is limited to ASCII with `unicode-range`, Comic Neue (Google Fonts) fills in accents, and `text-transform: uppercase` keeps the fallback letters matching.

## App / home-screen icons

- **Image files:** `site/icons-app/` holds PNGs made from `links/icons/avatar.png` on a `#0000a0` background (iOS fills transparent areas with black, so the background must be opaque). There are 32, 192 and 512 px versions, plus a maskable 512 version with extra padding. `site/apple-touch-icon.png` (180 px) sits at the web root because iOS also requests that exact path.
- **Manifests:** `site/site.webmanifest` (start URL `/`) is for the main site, and `site/links/manifest.webmanifest` (start URL `/links/`) is for the links page.
- **Head tags:** both `index.html` files link their manifest and the touch icon.

## Running locally

Asset paths are root-absolute (`/assets/...`, `/images/...`, `/fonts/...`), so serve `site/` as the web root. Opening `index.html` via `file://` won't work:

```sh
cd site && python3 -m http.server 8000   # or: npx serve .
```

## Structure of the build

- `index.html`: mounts the Vue app on `#app` and holds all SEO/OG/Twitter meta tags.
- `assets/`: `main.js` and `main.css` (pretty-printed), plus the Tweakpane chunks used only by the debug panel.
- `webgl/textures/`: textures loaded by the Three.js scene (head parts sprite sheets, hand, scribbles, noise, placeholders). The bundle references these **without** a leading slash (`webgl/textures/...`), unlike every other asset.
- `images/`, `videos/`, `fonts/`: DOM/UI media; the custom font is `Comic_CAT` (woff/woff2, referenced from the CSS).

## Known issues in the current build

- `/images/ctas/tex-ui-switch-fe-off.webp` is referenced by the bundle but the file is at `videos/tex-ui-switch-fe-off.webp`, so it 404s.
- The site was adapted from Adrien Lamy's portfolio, and almost all of its content is still his. That includes the Twitter meta tags in `index.html`, the About text and contacts in `[SITE-8]` ("Sup, I'm Adrien Lamy", his LinkedIn, adrienlamy.fr, hey@adrienlamy.fr), the whole projects list in `[SITE-9]`, the videos in `videos/` and the illustrated textures. Check with the user before treating any of this as intended content.
