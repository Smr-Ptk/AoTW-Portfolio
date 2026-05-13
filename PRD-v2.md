# Portfolio v2 — Production PRD

**Status:** v1.0 — production build, supersedes prototype PRD
**Owner:** Samir Patki
**Stack:** Next.js 14 (App Router) + Tailwind, deployed on Vercel from GitHub
**Goal:** Ship the elite design-engineer portfolio. Replaces samirpatki.com.

---

## Read this first — what's changing from the first pass

The first prototype shipped with several decisions that read as "student portfolio with nice fonts" rather than elite design engineer. The build works as a foundation; the surface, voice, and motion all need replacement. Treat this PRD as a rewrite of those layers, not a new scaffold.

**Drastic changes from prototype:**

1. **Drop Fraunces entirely. Switch hero to Newsreader.** Fraunces was a class-time experiment with the wrong personality (too warm, too playful for the editorial register). Newsreader is sharper, more restrained, closer to Stanford Law / NYT Magazine.
2. **Drop mono from body. Switch body to Geist.** The current Geist-Mono-formatted bio with stats reads as terminal output, not a person. Body must be Geist sans, prose register.
3. **Cut the preloader entirely.** It was theatrical, fought the calmness of the rest of the site, and the Modi → Devanagari → Latin sequence wasn't well-executed. The cultural payload moves into the bio prose and ambient background instead.
4. **Bio: rewrite from terminal-stats voice to Pranathi/Jakub prose register.** No numbers, no em dashes, proper case for proper nouns, italicized hyperlinks for company names inline.
5. **Hero size cut from 51–64px down to ~30px.** The hero name was towering. Jakub-scale: name + role tucked into the layout, not a banner.
6. **Project grid fixed: 2-col, 16:10 aspect (not 4:3), ~22px radius, hairline border, near-white fill.** The current saturated cream blocks read as marketing panels, not portfolio plates. Cut from 10 placeholder tiles to 6.
7. **Overscroll physics rewritten.** Current implementation snaps to max instead of tracking gesture, has no rubber-band damping, no spring release. Color also wrong (`#ef4444` red reads as error). Gesture-tracked physics with spring release, color TBD pending content decision.
8. **Footer rebuilt.** Letter-circle icon treatment dropped (reads agency-ish). Switch to text-link socials with arrow indicators (`Email ↗`), add mono technical ticker (`Rendered in Xms` / `Last deployed Xh ago · commit X`).
9. **Add ambient नमस्ते background behind hero.** Devanagari watermark with Perlin noise displacement, 4% color delta to page bg, pure subtle texture.
10. **Disable Next dev indicator.** Currently visible in every screencap.

**Carried forward from prototype:**

- Stack (Next 14 + Tailwind + Vercel + GitHub)
- Constants file pattern
- Component file structure (most components stay, internals change)
- Light-mode-only commitment
- IntersectionObserver-based fade-in pattern (tuning changes)
- Overscroll on top only (top, no bottom)

---

## 1. Stack

| Layer | Choice | Rationale |
|---|---|---|
| Framework | Next.js 14 App Router | Vercel-native, `next/font` handles Newsreader + Geist cleanly, App Router is what the cluster uses |
| Styling | Tailwind CSS | Fast iteration, no config debates |
| Animation | Vanilla CSS + IntersectionObserver + Framer Motion (only for overscroll spring physics) | Keep dependencies minimal; spring physics is the one place a library is worth it |
| Fonts | `next/font/google` — Newsreader, Geist, Geist Mono, Noto Serif Devanagari | All free, all Google Fonts |
| Hosting | Vercel | One-click deploy from GitHub |
| Video | Self-hosted MP4 in `/public/videos/` | What Pranathi/Jakub do, no third-party chrome |
| Icons | None — text + arrow socials in footer | Avoid generic icon libraries |

Single dependency added vs prototype: **framer-motion** for overscroll spring physics only. Don't use it elsewhere.

---

## 2. File structure

```
src/
  app/
    layout.tsx                  # Font loading, meta, root
    page.tsx                    # Home, renders sections
    globals.css                 # Tokens, base styles
  components/
    Hero.tsx                    # Name, role, bio prose, inline links
    NamasteBackground.tsx       # Canvas Perlin-noise नमस्ते watermark
    ProjectGrid.tsx             # 2-col 16:10 video tiles
    Footer.tsx                  # Text socials, mono ticker, language toggle, copyright
    BlurFadeIn.tsx              # Reusable scroll-triggered fade wrapper
    OverscrollTexture.tsx       # Top overscroll, gesture-tracked, spring release
  lib/
    constants.ts                # All copy, links, ticker strings
    perlin.ts                   # Perlin noise implementation for namaste bg
public/
  videos/
    project-01.mp4              # Placeholder until real MP4s
    project-02.mp4
    ...
```

**Components no longer needed:**
- `Preloader.tsx` — delete
- `Writings.tsx` — delete (writings now inline in Hero bio prose)

---

## 3. Design tokens (`globals.css`)

```css
:root {
  /* Type */
  --font-serif: 'Newsreader', serif;
  --font-sans: 'Geist', sans-serif;
  --font-mono: 'Geist Mono', monospace;
  --font-devanagari: 'Noto Serif Devanagari', serif;

  /* Color — warm neutral system */
  --bg: #FAFAF7;                     /* Warm off-white page background */
  --ink: #1A1611;                    /* Warm deep ink, not black */
  --ink-soft: #6B6358;               /* Muted warm gray */
  --hairline: rgba(26, 22, 17, 0.08);
  --watermark: #EDE7DC;              /* नमस्ते background, 4% delta */
  --tile-fill: #FFFFFF;              /* Project tile fill, pure white */
  --overscroll: #A8322D;             /* Madder red placeholder, may change */

  /* Motion */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --duration-fade: 700ms;
  --duration-quick: 200ms;
  --stagger: 70ms;
}
```

**Type scale (desktop):**

| Element | Font | Size | Weight | Tracking | Line height |
|---|---|---|---|---|---|
| Hero name | Newsreader | 30px | 500 | -0.02em | 1.1 |
| Bio body | Geist | 17px | 400 | -0.005em | 1.55 |
| Inline link (proper noun) | Newsreader italic | 17px | 400 | -0.01em | 1.55 |
| Footer text links | Geist | 14px | 400 | normal | 1.4 |
| Footer mono ticker | Geist Mono | 13px | 400 | normal | 1.4 |
| Copyright | Geist | 13px | 400 | normal | 1.4 |
| नमस्ते watermark | Noto Serif Devanagari | 280px | 400 | normal | 1.0 |

Newsreader axis tuning for hero name:

```css
.hero-name {
  font-variation-settings: 'opsz' 36;
  font-weight: 500;
  font-size: 30px;
  letter-spacing: -0.02em;
  line-height: 1.1;
  color: var(--ink);
}
```

Mobile: scale heading and body 0.9x, hide नमस्ते watermark below 768px.

---

## 4. Layout

Single centered column, max-width `640px` (narrower than prototype's `768px` to match Jakub-scale). Generous vertical rhythm, ~96–128px between major sections (smaller than prototype's 192px since the column is narrower).

```
┌─────────────────────────────────────────────┐
│  [नमस्ते watermark, behind hero only]     │
│                                             │
│   Samir Patki                               │
│   Design Engineer                           │
│                                             │
│   [Bio paragraph 1, prose with inline       │
│   italic-serif hyperlinks for proper        │
│   nouns]                                    │
│                                             │
│   [Bio paragraph 2 — outside of work line]  │
│                                             │
│   [Project grid — 2 col, 16:10 tiles,       │
│    6 tiles, hairline border]                │
│                                             │
│   [Footer — socials, mono ticker, lang     │
│    toggle, copyright]                       │
└─────────────────────────────────────────────┘
```

Hero starts at ~80px from viewport top, not 35% down.

---

## 5. Sections

### 5.1 Hero

```tsx
<section>
  <h1 className="hero-name">Samir Patki</h1>
  <p className="role">Design Engineer</p>

  <p className="bio">
    I'm a designer and developer based in New York. This summer
    I'm joining <Link italic href="...">The New York Times</Link> as
    a design engineer. Right now I'm finishing my master's in
    integrated product design at <Link italic href="...">Penn</Link>.
    Before this I designed for <Link italic href="...">HP</Link>,
    {' '}<Link italic href="...">Kodak</Link>,
    {' '}<Link italic href="...">Saris</Link>, and
    {' '}<Link italic href="...">GE</Link> at C+A Global. I also
    founded <Link italic href="...">Creative X</Link> at Rutgers, a
    design community for student creatives.
  </p>

  <p className="bio">
    Outside of work I'm interested in powerlifting, history and
    learning languages.
  </p>
</section>
```

**Voice notes:**
- Proper case for all proper nouns
- Italicized Newsreader for hyperlinked proper nouns inline (Jakub pattern)
- No numbers anywhere
- No em dashes
- Casual sentences, not list-of-stuff
- "Outside of work I'm interested in..." — exact phrasing, do not modify

**Linking strategy:**
- The New York Times → nytimes.com
- Penn → upenn.edu (or specific IPD program page)
- HP, Kodak, Saris, GE → respective brand sites or LinkedIn role pages
- Creative X → community URL
- Inline writings will be added later in the same prose; structure must support that without rewrite

### 5.2 नमस्ते background

`<canvas>` element, fixed position behind hero only, `z-index: -1`. Renders the word **नमस्ते** at ~280px in Noto Serif Devanagari with Perlin noise displacement. See §7.1 for full motion spec.

Visible only on the hero section. Fades out (opacity → 0 over 400ms) once user has scrolled `100px` past the hero. Removed from DOM below 768px viewport (mobile).

### 5.3 Project grid

```tsx
<section className="project-grid">
  {PROJECTS.map(p => (
    <a key={p.id} href={p.href} className="project-tile">
      <video
        src={p.videoSrc}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
      />
    </a>
  ))}
</section>
```

**Spec:**
- CSS Grid, `grid-template-columns: 1fr 1fr`, gap `24px`
- 6 tiles total
- Each tile: 16:10 aspect ratio, `border-radius: 22px`, `1px solid var(--hairline)`, `background: var(--tile-fill)`
- Video fills tile (`object-fit: cover`), no padding
- No hover states (video is already animating)
- No labels, no titles
- Video file requirements: 1280×800, H.264, ~1–2 Mbps, no audio, seamless 3–8s loop
- During development, use placeholder static images at 16:10 ratio if MP4s not ready

### 5.4 Footer

```
Email ↗     X ↗     GitHub ↗     LinkedIn ↗

Rendered in 187ms

EN  हि                                 © 2026 Samir Patki
```

- Top row: text links with `↗` arrow, `font-size: 14px`, gap 24px between, hover underlines
- Middle row: mono ticker, `13px` Geist Mono, `color: var(--ink-soft)`. Two strings, randomized one per page load:
  - `Rendered in Xms` (where X is actual page render time, captured via Performance API)
  - `Last deployed Xh ago · commit X` (build-time injected via env var or static)
- Bottom row: language toggle on left (`EN` / `हि`, active is underlined, click is visual-only v1), copyright on right
- Top margin from project grid: `128px`
- All footer text in `var(--ink-soft)`, not full ink

### 5.5 Writings

**Do not create a separate writings section.** Writings are inline links within the bio prose. Once essays exist, they get added as inline mentions in the bio body, in a sentence like:

> Lately I've been writing about [the design of Devanagari typography on the web](#) and [why I rendered Bharat in code](#).

For v1, no writings section exists at all. The bio is pure self-introduction.

---

## 6. Constants (`lib/constants.ts`)

```ts
export const NAME = 'Samir Patki';
export const ROLE = 'Design Engineer';

export const BIO_LINKS = {
  nyt: 'https://nytimes.com',
  penn: 'https://upenn.edu',
  hp: '#',
  kodak: '#',
  saris: '#',
  ge: '#',
  creativeX: '#',
};

export const PROJECTS = [
  { id: 1, videoSrc: '/videos/project-01.mp4', href: '#' },
  { id: 2, videoSrc: '/videos/project-02.mp4', href: '#' },
  { id: 3, videoSrc: '/videos/project-03.mp4', href: '#' },
  { id: 4, videoSrc: '/videos/project-04.mp4', href: '#' },
  { id: 5, videoSrc: '/videos/project-05.mp4', href: '#' },
  { id: 6, videoSrc: '/videos/project-06.mp4', href: '#' },
];

export const SOCIALS = [
  { label: 'Email', href: 'mailto:...' },
  { label: 'X', href: 'https://x.com/...' },
  { label: 'GitHub', href: 'https://github.com/...' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/...' },
];

export const TICKER_STRINGS = [
  'Rendered in {ms}ms',
  'Last deployed {hours}h ago · commit {commit}',
];
```

---

## 7. Motion

### 7.1 नमस्ते background — Perlin noise displacement

**Approach:** `<canvas>` rendering the word **नमस्ते** as text via `ctx.fillText`, displaced character-by-character using a Perlin noise field that evolves over time.

**Spec:**
- Canvas covers viewport, fixed position, `z-index: -1`
- Word: नमस्ते, ~280px Noto Serif Devanagari
- Color: `#EDE7DC` (variable `--watermark`)
- Position: centered horizontally in column area, vertically aligned with hero
- Each glyph offset by `(perlin(x, y, t) * 6, perlin(x+100, y+100, t) * 6)` pixels
- `t` increments by 0.0008 per frame (very slow drift)
- 30fps target via `requestAnimationFrame`
- Pause via `document.visibilityState !== 'visible'`
- Disable below 768px viewport
- Respect `prefers-reduced-motion: reduce` — render static, no animation

**Implementation notes:**
- Use a self-contained Perlin noise function (small, ~50 lines, available as `perlin.ts`). Do not pull in a dependency.
- Render glyph-by-glyph rather than the whole word, to allow per-character displacement
- DPR scaling: `canvas.width = window.innerWidth * window.devicePixelRatio`
- Resize handler: re-init canvas dimensions on `window.resize`

**Fallback:** If canvas fails to mount, render a static `<div>` with the word at the same position and color. Don't break the page.

### 7.2 Linear-style blur fade-in (entry motion)

```css
.fade-in {
  opacity: 0;
  transform: translateY(14px);
  filter: blur(8px);
  transition:
    opacity var(--duration-fade) var(--ease-out-expo),
    transform var(--duration-fade) var(--ease-out-expo),
    filter var(--duration-fade) var(--ease-out-expo);
}

.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
  filter: blur(0);
}
```

**Apply to only 3 elements total:**
1. Hero block — fires on mount
2. Project grid section — fires on viewport entry
3. Footer — fires on viewport entry

Do not animate per-paragraph, per-tile, or per-link. Linear's premium feel comes from animating fewer things, not more.

IntersectionObserver: `threshold: 0.1`, `rootMargin: '0px 0px -10% 0px'`.

### 7.3 Overscroll on top — gesture-tracked spring physics

**Drastic rewrite from prototype.** Current implementation has no proportional tracking, no rubber-band, and uses an idle timer for release. All wrong.

**Spec:**
1. **Gesture tracking, 1:1 up to threshold.** Pull 30px → reveal 30px. Pull 60px → reveal 60px.
2. **Rubber-band damping past 60px.** Beyond threshold, reveal grows but resists exponentially. Roughly: `revealed = threshold + (pulled - threshold) * exp(-(pulled - threshold) / 80)`.
3. **Spring release on gesture-end.** Use Framer Motion's `useSpring` with `stiffness: 280, damping: 26, mass: 1`. Or hand-rolled spring with same params. Snap back to 0 with a small overshoot (~3-5%).
4. **No idle timer.** Release fires on `mouseup`, `touchend`, `pointerup`. Not after a delay.
5. **Inputs:** `wheel` (deltaY < 0 at scrollY ≤ 0), `touchmove` (touch drag down at scrollY ≤ 0), `pointermove` (mouse drag down at scrollY ≤ 0).
6. **Color:** placeholder `#A8322D` solid block during physics development. Content (Devanagari/Modi/proverb texture) decided after physics works.
7. **Max reveal:** 180px. Beyond that, fully resisted.
8. **Disabled on bottom overscroll.** Top only.

**Recommended:** Use Framer Motion's `motion.div` with `style={{ y: useTransform(...) }}` driven by a `useSpring` reading from a `useMotionValue`. Cleanest implementation, well-tested physics.

### 7.4 What's removed

- No preloader
- No per-element stagger animations
- No hover effects on project tiles
- No scroll-linked parallax
- No cursor effects

The site should feel **calm and confident**. Three motion events on entry, one ambient texture, one gesture interaction. That's it.

---

## 8. Responsive behavior

| Viewport | Behavior |
|---|---|
| ≥1024px | Full layout, namaste visible, all motion active |
| 768–1023px | Same as desktop, slight column scaling |
| <768px | Hide नमस्ते watermark, project grid stays 2-col but tiles smaller, footer rows stack, type scales 0.9x, overscroll active |

Use Tailwind responsive prefixes. Don't ship a mobile menu — there's no nav to collapse.

---

## 9. Performance budget

- Total JS bundle: <80KB gzipped
- LCP: <1.0s on 4G
- CLS: 0
- INP: <200ms
- Lighthouse Performance: ≥95

**Critical:** the नमस्ते canvas must not regress these. Profile in Chrome DevTools after implementation. If CPU usage on idle exceeds 5%, downgrade to CSS-only animation.

---

## 10. Out of scope (v1)

- Dark mode
- Avatar (placeholder during dev, real before launch)
- Favicon (will match avatar later)
- Real MP4 videos (placeholder static images during dev, real before launch)
- Real essay content (no writings v1)
- About page
- Case study pages
- CMS
- Analytics (add 2-line Vercel Analytics post-launch)
- OG images / SEO meta beyond title
- Custom 404
- Form handling
- Accessibility audit beyond semantic HTML and reduced-motion respect

---

## 11. Pre-launch checklist (gates the launch, not the build)

- [ ] Real avatar designed, sized, and integrated
- [ ] Favicon matching avatar
- [ ] 6 real seamless-loop MP4s in `/public/videos/`
- [ ] Bio links pointing to real URLs
- [ ] Overscroll content (Devanagari/Modi/proverb texture) decided and implemented
- [ ] Footer ticker pulling real `Rendered in` time and real `Last deployed` commit
- [ ] OG image
- [ ] Lighthouse 95+ verified
- [ ] Tested on Safari, Chrome, Firefox, mobile Safari, mobile Chrome
- [ ] `prefers-reduced-motion` verified
- [ ] Next dev indicator disabled
- [ ] Custom domain pointed at Vercel deployment

---

## 12. Build order (recommended)

Surface things first (visible craft), motion second (uncertain, time-boxed), production assets last.

1. Type system swap: Newsreader hero, Geist body, drop Fraunces and mono-from-body
2. Bio rewrite with inline links
3. Project grid: dimensions, border, fill, gap (placeholder images first)
4. Footer: text-link socials, mono ticker, language toggle, copyright
5. Disable Next dev indicator
6. Linear-style blur fade-in on 3 sections
7. नमस्ते background with Perlin displacement
8. Overscroll physics with Framer Motion spring
9. Responsive QA
10. Performance profiling
11. Real assets (avatar, MP4s, favicon, OG) before launch

Steps 1–5 are certain and quick (~half a day). Steps 6–8 are where the schedule risk lives. Step 11 is the launch gate.

---

## 13. Success criteria

This site reads as elite design engineer to: a NYT engineering manager, a Linear/Vercel/Anthropic recruiter, and a peer in the Emil/Pranathi/Jakub cluster.

Specifically:
- Identity resolves in <8 seconds: name + role + brand validation visible without scroll
- No element reads as "student portfolio with nice fonts"
- No element reads as "trying too hard"
- Page feels calm. The work supplies the saturation; the chrome supplies the silence.
