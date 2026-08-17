# Grupo Gobecon

Static marketing site for Grupo Gobecon, built with plain HTML, CSS, and JavaScript — no build step required.

## Structure

```
.
├── index.html          Page markup (header, hero, services, sections, footer)
├── style.css           All styling
├── script.js           Mobile nav toggle, scrolled-header state, scroll-reveal
├── fonts/
│   └── CalSansVF.woff2  Self-hosted Cal Sans variable font
└── images/
    ├── logo-black.png / logo-whiter.png
    ├── asesoria.avif, construccion.avif, planeamiento.avif   Service card backgrounds
    ├── icons/           SVG icons (services, social, UI)
    └── rt-3/, rt-4/, rt-5/   Image sets (rt-4/image-01.avif is the hero background)
```

## Fonts

- **Roboto** — loaded via Google Fonts (`<link>` in `index.html`), used for body copy and nav.
- **Cal Sans** — self-hosted (`fonts/CalSansVF.woff2`, from [calcom/sans](https://github.com/calcom/sans)) via `@font-face` in `style.css`, used for headings.

## Colors

Defined as CSS custom properties in `style.css`:

```css
--color-black: #333333;
--color-white: #ffffff;
--color-gray:  #f5f5f5;
```

## Sections

- **Header** — fixed, transparent until scrolled (`.scrolled` class added by `script.js`), logo + nav, hamburger menu on mobile (≤768px).
- **Hero** (`#hero`) — full-viewport (`100vh`), background image, fade-in-up copy, primary + outline CTA buttons.
- **Servicios** (`#servicios`) — 3 cards (Planeamiento, Construcción, Asesoría), each with a background image, gradient overlay, icon, and title. Fades in on scroll via `.reveal` + `IntersectionObserver`.
- **Proyectos** / **Sobre Nosotros** / **Contactos** — placeholder content, pending copy and layout.
- **Footer** — copyright line.

## Running locally

No build tools needed — open `index.html` directly in a browser, or serve the folder:

```sh
python3 -m http.server
```

## Notes / TODO

- Proyectos, Sobre Nosotros, and Contactos sections still have placeholder copy.
- Social icons (`icon-facebook.svg`, `icon-instagram.svg`, `icon-tiktok.svg`, `icon-x.svg`) exist in `images/icons/` but aren't wired into the footer yet.
