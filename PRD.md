# Portfolio v2 — Prototype PRD

**Status:** v0.1 — prototype for class demo
**Owner:** Samir Patki
**Stack:** Next.js 14 (App Router) + Tailwind, deployed on Vercel from GitHub
**Goal:** Ship a working localhost prototype this week. Polish comes later.

> This PRD covers the prototype only. A second PRD will follow for the production build (real projects, writings content, refined motion, full QA).

---

## 1. Context

Replacing the current Webflow site (`samirpatki.com`). Current version is Spline-heavy, glassmorphism, slow. New version is serif-forward, minimal, Craft + Pedigree as spine, Culture (Marathi/Modi/Devanagari heritage) as the wrapper — not the message.

Reference center of gravity: **Ryo Lu + Pranathi Peri** for structure; **Linear** for motion; **Stanford Law** for typographic register.

---

## 2. Scope

### In for prototype (this week)

- Preloader (Modi → Devanagari → Latin name resolve)
- Home page: hero, projects grid (placeholder tiles), writings (2 items), footer
- Linear-style blur fade-in on scroll
- Overscroll easter egg on top (Modi/Devanagari texture)
- Footer: rotating ticker, socials, language toggle (EN / हि placeholder)
- Responsive down to mobile
- Localhost dev build

### Out for prototype (defer)

- Real project GIFs (placeholder boxes for now)
- Real writings content (placeholder titles + dates)
- About page
- Case study pages
- Actual Hindi translation content (toggle switches visible label only for now)
- Full SEO / OG images
- Analytics
- Form handling
- Dark mode (ship light only, assess later)

---

## 3. Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 14 App Router | Vercel one-click deploy, `next/font` handles Fraunces cleanly |
| Styling | Tailwind CSS | Fast to iterate, no config debates |
| Animation | Vanilla CSS + IntersectionObserver | No GSAP/Framer needed for this scope — the "no dependencies" story is itself a design-engineer flex |
| Fonts | `next/font/google` — Fraunces + Geist Mono + Noto Serif Devanagari + Noto Sans Modi | All free, all Google Fonts |
| Hosting | Vercel (connect GitHub repo) | Production-path from day one |
| Deps | Zero beyond Next + Tailwind | |

### Initial setup

```bash
npx create-next-app@latest samirpatki-v2 --typescript --tailwind --app --src-dir --import-alias "@/*"
cd samirpatki-v2
npm run dev
```

---

## 4. File Structure

```
src/
  app/
    layout.tsx              # Font loading, meta, overscroll container
    page.tsx                # Home (renders all sections)
    globals.css             # Tokens, base styles, overscroll texture
  components/
    Preloader.tsx           # Modi → Devanagari → Latin sequence
    Hero.tsx                # Name + bio + brand line
    ProjectGrid.tsx         # 4 placeholder tiles, Pranathi-style
    Writings.tsx            # 2 placeholder entries
    Footer.tsx              # Ticker + socials + language toggle
    BlurFadeIn.tsx          # Reusable wrapper for scroll-triggered fade
    OverscrollTexture.tsx   # Modi/Devanagari texture on top overscroll
  lib/
    ticker.ts               # Rotating footer string logic
    constants.ts            # All copy, names, URLs in one file for easy editing
public/
  projects/                 # Placeholder images for grid (any 4 PNGs, right dimensions)
```

---

## 5. Design Tokens

### Typography

```css
--font-serif: 'Fraunces', serif;          /* Display + body */
--font-mono: 'Geist Mono', monospace;     /* Technical, footer, timestamps */
--font-devanagari: 'Noto Serif Devanagari', serif;
--font-modi: 'Noto Sans Modi', sans-serif;
```

Fraunces tuning (variable font axes):
- Display headlines: `wght 400, opsz 144, SOFT 30, WONK 0`
- Body: `wght 400, opsz 14, SOFT 50, WONK 0`

### Type scale (desktop)

| Element | Size | Line height | Weight |
|---|---|---|---|
| Name (hero) | 64px | 1.05 | 400 |
| Bio paragraph | 20px | 1.5 | 400 |
| Project title | 16px | 1.4 | 400 |
| Footer ticker | 13px (mono) | 1.4 | 400 |
| Writings title | 18px | 1.4 | 400 |

Mobile: scale everything to ~0.8x.

### Color

Warm, restrained, Stanford-adjacent. No cool blues, no pure black.

```css
--bg: #F8F5F0;           /* Warm off-white */
--bg-overscroll: #E8DFD0; /* Slightly deeper cream, revealed on top overscroll */
--ink: #1A1611;          /* Deep warm ink, not black */
--ink-soft: #6B6358;     /* Muted for secondary text */
--accent: #7B3F00;       /* Madder / deep saffron-brown — use sparingly */
--rule: rgba(26, 22, 17, 0.08); /* Hairlines */
```

### Spacing

Use Tailwind default scale. Page content max-width: `max-w-3xl` (768px), centered, with generous vertical rhythm (128–192px between major sections).

### Animation timing (global constants)

```css
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
--duration-blur: 1200ms;
--duration-quick: 300ms;
--stagger: 100ms;
```

---

## 6. Preloader

### Behavior

1. On mount, full-screen `var(--bg)` overlay covers everything.
2. Centered, three frames show sequentially in the same position:
   - **Frame 1 (0–300ms):** Name in **Modi script** — fades in with blur
   - **Frame 2 (300–600ms):** Name in **Devanagari** (`समीर पतकी`) — crossfade from Modi
   - **Frame 3 (600–900ms):** Name in **Latin** (`Samir Patki`) — crossfade from Devanagari
3. At 900ms, the overlay itself fades out over 400ms, revealing the home page underneath.
4. Total preloader duration: **~1300ms.**

### Implementation notes

- Each frame is the same element, same font size (~48px), different font-family.
- Crossfade = opacity + 8px blur on the outgoing, inverse on the incoming.
- Use `useEffect` with `setTimeout` chain, or a CSS-only keyframe animation if simpler.
- **TODO:** Verify exact Modi string for "Samir Patki" — need to confirm Unicode characters. Placeholder: render `समीर पतकी` in Noto Sans Modi font and see if it maps; if not, hand-author the Modi characters.
- Skip preloader on repeat visits within session (use `sessionStorage.setItem('visited', '1')`).

---

## 7. Home Page Sections (in order)

### 7.1 Hero

Single centered block, vertically ~35% down the viewport.

**Name:** `Samir Patki` — Fraunces 64px, weight 400.

**Bio paragraph** (choose one to start, iterate later):

**Option A (Pranathi-tier, ~50 words):**
> I design and build products. Currently at Penn IPD and the Wharton AGI Collective. Incoming @ NYTimes, Summer 2026. Previously: HP, Kodak, Saris, GE — 95% YoY sales lift, 32% app downloads. Elsewhere: powerlifting, history, English / मराठी / हिन्दी / संस्कृत.

**Option B (Ryo-tier, ~30 words):**
> Designer and engineer. Penn IPD, Wharton AGI. Incoming @ NYTimes. Previously: HP, Kodak, Saris, GE. Elsewhere: powerlifting, history, English / मराठी / हिन्दी / संस्कृत.

Brand names and `NYTimes` should be clickable links (underline on hover, `var(--accent)` on hover).

Languages at the end render in their native scripts — this is a quiet flex and threads directly to the preloader motif.

### 7.2 Projects Grid

Pranathi-style 2-column grid below hero. Generous gap (~32px). Each tile:

- Aspect ratio: **4:3** (~approximately matches Pranathi's dimensions)
- Width: fills column (~370px at max-w-3xl)
- Placeholder: solid `#E8DFD0` block with centered Fraunces-italic text "Project 01" / "Project 02" etc.
- No text below the tile in v1 (Pranathi-style, images speak)
- Hover state: slight scale (1.02) + soft shadow, 300ms ease
- Render **4 tiles** for visual density

**TODO:** Replace placeholder blocks with real project GIFs in v2. Maintain aspect ratio and dimensions.

### 7.3 Writings

Below projects, same max-width column. Simple list, not a grid.

```
Writings

[Essay Title One]                                              2026
A one-line description of what this essay is about.

[Essay Title Two]                                              2026
A one-line description of what this essay is about.
```

- Title in Fraunces 18px, weight 400
- Date right-aligned in Geist Mono 13px, `var(--ink-soft)`
- Description below title in 15px, `var(--ink-soft)`
- Entire row clickable, hover: title → `var(--accent)`
- **TODO:** Real titles + links in v2.

### 7.4 Footer

Bottom of page, same max-width column, separated from Writings by ~128px.

Three-row structure:

**Row 1 — Rotating ticker** (Geist Mono 13px, `var(--ink-soft)`):

One of the following strings shows per page load, randomized:

- `Deployed 4h ago · commit a3f2b8c`
- `Currently reading: [Book Title]`
- `Last lifted 405 at Pottruck · 2 days ago`
- `Rendered in 187ms`

Put strings in `lib/constants.ts` as an array. On mount, pick one at random. Don't animate between them — just pick one per load.

**Row 2 — Socials + contact** (Fraunces 15px):

```
Twitter   Instagram   LinkedIn   Email
```

Simple inline links, ~24px gap, hover → `var(--accent)`.

**Row 3 — Language toggle + copyright** (Geist Mono 13px):

```
EN   हि   𑘦𑘻𑘚𑘲                              © 2026 Samir Patki
```

(Last token is Modi script "मोडी" / "Modi" — placeholder, to verify.)

- Active language underlined
- Clicking does nothing functional in v1 (visual affordance only)
- **TODO:** Actual translation logic in v2

---

## 8. Interactions

### 8.1 Linear-style blur fade-in on scroll

Every section (hero, projects grid, each project tile, writings, footer) fades in as it enters viewport.

```css
.fade-in {
  opacity: 0;
  transform: translateY(24px);
  filter: blur(12px);
  transition:
    opacity var(--duration-blur) var(--ease-out-expo),
    transform var(--duration-blur) var(--ease-out-expo),
    filter var(--duration-blur) var(--ease-out-expo);
}

.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
  filter: blur(0);
}
```

JS: IntersectionObserver watches `.fade-in` elements, adds `.visible` when `isIntersecting` with `threshold: 0.1`. Use `rootMargin: '0px 0px -10% 0px'` to trigger slightly before full entry.

**Stagger:** For sibling `.fade-in` elements (e.g. the 4 project tiles), delay each by `--stagger` × index via inline style `transitionDelay`.

Hero fires on initial mount (after preloader completes).

### 8.2 Overscroll easter egg (top only)

On top overscroll (user drags page down when already at top):

- Reveal `var(--bg-overscroll)` band at top, ~200px tall
- Band contains large Modi or Devanagari text as texture — `समीर पतकी` or a proverb in Marathi, ~120px Fraunces-equivalent weight, `var(--ink)` at 8% opacity, horizontally tiled
- Feels "bouncy" — use `overscroll-behavior: contain` on body and let native overscroll handle the physics on mobile
- On desktop, implement with a fixed element behind main content that becomes visible when `window.scrollY < 0` isn't possible — instead use a wrapper `<div>` with `padding-top` equal to band height, and the main content sits below it. Initial scroll position = band height, so user scrolls "up" to see it.

**Simpler v1 approach:** just place the Modi texture band above the hero as a fixed decorative header that's only visible if the user scrolls to the very top. Doesn't need bouncy physics — just needs to exist and feel intentional. Iterate to true overscroll in v2.

### 8.3 Footer ticker

See 7.4 Row 1. No animation, just random pick on mount.

### 8.4 Language toggle

Visual only for v1. Clicking `EN` / `हि` / Modi just changes which one is underlined. Store choice in React state, no actual translation.

---

## 9. Content Constants (`lib/constants.ts`)

Centralize all copy here for easy edits:

```ts
export const NAME = {
  latin: 'Samir Patki',
  devanagari: 'समीर पतकी',
  modi: '𑘦𑘲𑘨 𑘢𑘰𑘘𑘿𑘎𑘲', // TODO: verify
};

export const BIO = `...`; // Option A or B from §7.1

export const PROJECTS = [
  { id: 1, title: 'Project 01', href: '#' },
  { id: 2, title: 'Project 02', href: '#' },
  { id: 3, title: 'Project 03', href: '#' },
  { id: 4, title: 'Project 04', href: '#' },
];

export const WRITINGS = [
  { title: 'Essay Title One', desc: 'One-line description.', date: '2026', href: '#' },
  { title: 'Essay Title Two', desc: 'One-line description.', date: '2026', href: '#' },
];

export const TICKER_OPTIONS = [
  'Deployed 4h ago · commit a3f2b8c',
  'Currently reading: The Beginning of Infinity',
  'Last lifted 405 at Pottruck · 2 days ago',
  'Rendered in 187ms',
];

export const SOCIALS = [
  { label: 'Twitter', href: 'https://twitter.com/...' },
  { label: 'Instagram', href: 'https://instagram.com/...' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/...' },
  { label: 'Email', href: 'mailto:...' },
];
```

---

## 10. Responsive Behavior

- **Desktop (≥768px):** Layout as specified. `max-w-3xl` centered column.
- **Tablet (640–767px):** Projects grid collapses to single column.
- **Mobile (<640px):** Single column everywhere. Type scales ~0.8x. Footer rows stack. Preloader name scales to ~36px.

Use Tailwind responsive prefixes (`sm:`, `md:`). Don't fight mobile — the site is almost entirely vertical, so reflow is natural.

---

## 11. Out of Scope (Explicitly)

To keep prototype tight:

- No CMS. All content hardcoded in `constants.ts`.
- No blog post pages. Writings links point to `#` or external URLs.
- No case study pages. Projects link to `#` or live deployed URLs if they exist.
- No actual Hindi translations.
- No analytics (Vercel Analytics can be added in 2 lines post-class).
- No custom 404.
- No dark mode.
- No accessibility audit beyond semantic HTML and alt text.

All of the above move into v2.

---

## 12. Success Criteria for Class Demo

- [ ] Loads on localhost in < 200ms after first build
- [ ] Preloader plays the Modi → Devanagari → Latin sequence smoothly
- [ ] Hero, projects (4 tiles), writings (2 rows), footer all render
- [ ] Blur fade-in fires on scroll for each section
- [ ] Overscroll reveals the Modi/Devanagari band at the top
- [ ] Footer ticker picks a random string per page load
- [ ] Language toggle visually updates (no real translation)
- [ ] Responsive — doesn't break on phone
- [ ] Deployed to Vercel with a preview URL to share in class

---

## 13. Known TODOs / Open Questions for v2

- Confirm Modi Unicode characters for "Samir Patki"
- Replace project placeholders with real GIFs (dimensions per §7.2)
- Write 2 real essay posts, publish, link them
- Decide if overscroll band uses a proverb in Marathi vs just name
- Decide if the ticker should rotate on interval or stay on page-load pick
- Add Anthropic / Figma / NYT logos section if brand-logo strip is wanted (not in v1)
- Commercial font license decision (Tiempos / Migra) if Fraunces ends up not right
- Sanskrit quote somewhere? Subtle footer watermark?

---

## Hand-off to Cursor

Drop this file into your repo root as `PRD.md`, then prompt Cursor:

> Read PRD.md. Scaffold the Next.js 14 App Router project as specified in §3–4. Implement §5 design tokens in globals.css. Build components in §4 file structure. Start with Preloader (§6), then Hero (§7.1), then BlurFadeIn wrapper (§8.1). Stop after those three and let me review before continuing.

That keeps Cursor from over-running and gives you checkpoints.
