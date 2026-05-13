# AoTW Portfolio — Class Variant PRD

**Status:** v1.0
**Owner:** Samir Patki
**Course:** Art of the Web (AoTW)
**Stack:** Next.js 14 + Tailwind + Framer Motion (existing portfolio code)
**Repo:** github.com/Smr-Ptk/AoTW-Portfolio
**Dev workflow:** VS Code + Claude Code extension
**Hosting:** Vercel (simpler than GitHub Pages for Next.js)

---

## Read this first — context

This is a class submission, not the real portfolio. It branches off the
real portfolio's Next.js codebase, swaps content to demonstrate class
work, and adds p5.js to hit rubric requirements.

The real portfolio (with Hindi toggle, Tools section, Devanagari payload,
etc.) lives in a separate folder and repo. Changes here do not affect it.

**Rubric this addresses:**
- 3 pts: creative implementation of HTML/CSS/p5.js, consistent styling,
  deliberate UX
- 4 pts: imaginative documentation/archive/display of class assignments
  and reading responses
- 3 pts: check-in critique progress (handled separately, not in this build)

---

## What changes from the current portfolio code

### Removed
- X/Twitter from `SOCIALS` constant (and therefore from both top-of-bio
  socials and footer socials)
- Tools section entirely (component, import in page.tsx, constants entry)
- Hindi (हि) language toggle in footer and all `lang === 'हि'` branching
  throughout
- BioHi component in Hero (only BioEn remains)
- Devanagari name rendering (since toggle is gone)

### Replaced
- Project grid: 4 static images + 1 p5.js link card → 5 cards total
- Writing section: 3 placeholder entries → 10 real Reading Responses
  with expand-on-click bodies

### Added
- p5.js demonstrated via one project card that links to an existing AoTW
  project: smr-ptk.github.io/aotw-s3a3 (watercolor Bharat sketch)
- Reading Response component with click-to-expand inline accordion
  behavior

### Kept (no change)
- Existing typography (Newsreader serif headings, Geist sans body)
- Color tokens (warm cream bg, warm ink, hairline borders)
- Page layout (max-w-960px centered column, padding rhythm)
- Hero name + role + bio prose structure
- Footer with mono ticker (Rendered in / Last deployed)
- Overscroll physics with madder color reveal
- BlurFadeIn entry animations and cascade timing
- Email, GitHub, LinkedIn socials (top and footer)
- prefers-reduced-motion handling
- :focus-visible styles
- Bio paragraph fixes (line-height, font-size-adjust)

---

## Project Grid — 5 cards

### Structure

2-column grid, 16:10 tiles, hairline border, sharp corners, white fill,
24px gap. Section heading "Projects" above the grid. Each card has a
title below the tile in Geist 14px var(--ink), margin-top 12px.

### Cards

| # | Title | Image | Click behavior |
|---|---|---|---|
| 1 | Saris MHS Configurator | `/projects/saris.png` | Hover-only, "Coming soon" overlay |
| 2 | Ascend Hiring Website | `/projects/ascend.png` | Hover-only, "Coming soon" overlay |
| 3 | HP Filmscan Interface | `/projects/hp.png` | Hover-only, "Coming soon" overlay |
| 4 | Kodak Smile App | `/projects/kodak.png` | Hover-only, "Coming soon" overlay |
| 5 | Watercolor Bharat (p5.js) | `/projects/p5-thumb.png` | Links to https://smr-ptk.github.io/aotw-s3a3/ in new tab |

### Hover overlay (cards 1–4)

- Background: `rgba(26, 22, 17, 0.65)` covering full tile on hover
- Text: "Coming soon" centered, Geist 14px, color white
- Fade in 200ms ease-out on hover-in, fade out 120ms ease-in on hover-out
- Cursor stays default (not pointer) — these are not clickable

### p5.js card (card 5)

- Real link to smr-ptk.github.io/aotw-s3a3 in new tab (`target="_blank" rel="noopener"`)
- Title below: "Watercolor Bharat" (or whatever the sketch is titled)
- Hover overlay: same fade but text reads "Open sketch ↗" with the same
  arrow treatment as social links
- Cursor: pointer (it IS clickable)
- Thumbnail image: a static screenshot of the watercolor Bharat sketch
  saved to `/public/projects/p5-thumb.png`

### Files to update

- `src/lib/constants.ts`: replace PROJECTS array per above table
- `src/components/ProjectGrid.tsx`: render `<img>` instead of `<video>`,
  handle conditional href (only card 5 wraps in `<a>`), add hover overlay
  for cards 1–4, add title below each tile

### Images required in `/public/projects/`
- `saris.png` (provided)
- `ascend.png` (provided)
- `hp.png` (provided)
- `kodak.png` (provided)
- `p5-thumb.png` (needs to be captured from the live AoTW site or
  generated)

---

## Reading Responses — 10 entries

### Structure

Section heading "Reading Responses" (in place of "Writing"). 10 entries,
chronological order matching the source document. Each row collapsed by
default, click to expand inline, click again to collapse.

### Row (collapsed state)

- Single full-width row
- Left: title in Newsreader 17px weight 400, color var(--ink)
- Right: nothing (no date — responses don't have dates in the source)
- Button (not anchor), full width, text-aligned-left
- 12px vertical padding
- 1px solid var(--hairline) bottom border on each row except the last
- On hover: title underlines, no color shift
- Cursor: pointer

### Row (expanded state)

- Title row stays at top, with a small indicator showing expanded state
  (no chevron icon — use a hairline-thin caret or a "—" character to
  match the minimalist register, or even just style change on the title)
- Body content appears below the title, smooth max-height transition
  300ms ease-out
- Body styled as:
  - Paragraph text: 15px Geist, var(--ink), line-height 1.6
  - Max-width: keep within column (no overflow)
  - Padding: 16px top, 24px bottom, no left/right padding (text aligns
    with title)
  - Paragraphs separated by 16px margin
- Discussion Questions block at the end of each response:
  - Small heading "Questions" in Geist 13px, weight 500, var(--ink-soft),
    margin-top 24px
  - Questions in italic Newsreader 14px, var(--ink-soft), numbered list
    (or as the source has them)
  - Indent slightly from the response body

### Reading response titles (use these exact strings)

Pull title from the reading the response is *about*, formatted as:
`"[Reading title]" — [Author]`

| # | Display title |
|---|---|
| 1 | "My Website is a Shifting House Next to a River of Knowledge" — Laurel Schwulst |
| 2 | "Ruins and Templates of Geocities" — Olia Lialina |
| 3 | "POSTINTERNET: Art After the Internet" — Marisa Olson |
| 4 | "Alt-Text as Poetry Workbook" — Bojana Coklyat & Shannon Finnegan |
| 5 | "A Personal Computer for Children of All Cultures" — Ramsey Nasser |
| 6 | "What Design Can't Do" — Silvio Lorusso |
| 7 | "Beyond the New Media Frame: The Poetics of Absence in Vera Frenkel's String Games" — Dot Tuer |
| 8 | "Performing The Feed" — Paul Soulellis |
| 9 | "A Website To End All Websites" |
| 10 | "Art on the Internet, Chapter 12" — Boris Groys |

### Response body content

**Use the exact text from the source document. Do not adjust the response
text in any way.** Each response includes:
- Main body paragraphs (everything before "Discussion Questions:" or
  "Questions:")
- Discussion Questions block (everything after that heading)

### Files to update

- `src/lib/constants.ts`: add RESPONSES array with `{ id, title, body, questions }`
  for each of the 10 entries
- `src/components/Writing.tsx`: rename to `ReadingResponses.tsx` (or keep
  filename, rename component export and update page.tsx import). Rewrite
  to handle expand-on-click and render body + questions
- `src/app/page.tsx`: update component import name if file renamed

### Section heading

"Reading Responses" — no Hindi variant since toggle is removed.

---

## p5.js integration

Two p5.js demonstrations in this portfolio:

### 1. Card 5 — link to existing AoTW p5 work

Card 5 in the project grid links externally to the watercolor Bharat
project at smr-ptk.github.io/aotw-s3a3. Demonstrates substantial p5
work the grader can click through to see in full.

### 2. Animated section divider — p5 sketch in this repo

A thin animated p5.js canvas serves as a divider between major sections.
This puts a live p5 sketch directly in the portfolio code, not just a
link.

**Placement:** Two instances of the divider component on the page:
- Between Projects section and Reading Responses section
- Between Reading Responses section and Footer

(No divider between Hero and Projects — visual rhythm doesn't need one
there.)

**Visual spec:**
- Container: full column width (matches max-w-960px), ~40px tall
- Renders a single thin horizontal line, modulated by Perlin noise so
  it gently waves
- Line color: `rgba(107, 99, 88, 0.4)` — `var(--ink-soft)` with 40% alpha.
  Tunable to 0.3–0.5 if it reads too prominent or too faint
- Line stroke width: 1px
- Wave amplitude: max 8px deviation from center (so the line travels
  within a 16px band inside the 40px container)
- Wave frequency: low — the line should look like a slow undulation,
  not a busy oscillation
- Background: transparent (sits on top of page bg)
- Pure 2D rendering, no fills, just a single thin stroked line

**Animation:**
- `t` increments by 0.003 per frame (slow drift)
- 30fps target via `requestAnimationFrame`
- Perlin noise: `perlin(x * 0.01, t)` mapped to y-displacement
- Compute and draw across ~40 segments along the line width
- Pause when `document.visibilityState !== 'visible'`
- Respect `prefers-reduced-motion: reduce` — render a single static
  straight line, no animation

**Implementation notes:**
- New component: `src/components/P5Divider.tsx`
- Use `dynamic` import of p5 with `ssr: false` per Next.js client-side
  pattern
- DPR scaling for sharpness on retina
- Resize handler re-inits canvas dimensions on `window.resize`
- Disable on viewport <640px (too narrow to read as a divider — let
  margins handle section separation on mobile)

**Why this works for the rubric:**
- Demonstrates p5.js running live in the portfolio (not just linked)
- Subtle, doesn't compete with content
- Uses consistent styling (existing color tokens, no new palette)
- Shows "deliberate UX consideration" — divider is functional (section
  separator) AND decorative (live sketch)
- Pairs with card 5 link to show p5 capability at two levels (ambient
  decoration + substantial standalone project)

**Files added:**
- `src/components/P5Divider.tsx`
- `src/lib/perlin.ts` (small Perlin noise implementation, ~50 lines, no
  dependency). If this file was deleted in earlier cleanup, recreate it.

---

## Cuts from existing code

### `src/lib/constants.ts`
- Remove `X` entry from SOCIALS array
- Remove TOOLS array entirely
- Remove WRITING array (replaced by RESPONSES)
- Remove any Devanagari name strings if present

### `src/components/Hero.tsx`
- Remove BioHi component entirely
- Remove conditional rendering on lang
- Remove any Devanagari fallback in name display
- Bio renders English only, always

### `src/components/Footer.tsx`
- Remove EN / हि toggle entirely (both the buttons and the state)
- Copyright always reads "© 2026 Samir Patki" (Latin)
- Remove any Hindi conditional rendering
- X/Twitter link removed (driven by SOCIALS constant update)

### `src/app/page.tsx`
- Remove Tools import and component render
- Remove lang state if it was managed at page level (no longer needed
  with toggle gone)
- Remove `document.documentElement.lang` syncing useEffect

### Files to delete
- `src/components/Tools.tsx`

---

## Things to verify after changes

Self-check list, no auto-verification:

1. `npm run build` succeeds with no TypeScript errors
2. No leftover references to `lang === 'हि'`, `BioHi`, `TOOLS`,
   `WRITING`, `X` (as social), Tools component, or Hindi strings
3. Project grid renders 5 cards in 2-col layout (4 hover-overlay + 1
   real link)
4. Reading Responses section renders 10 collapsed rows, each opens
   inline on click, body + questions visible when expanded
5. Hover on Coming Soon cards shows the overlay
6. Hover on p5 card shows "Open sketch ↗" overlay
7. Click on p5 card opens https://smr-ptk.github.io/aotw-s3a3/ in new tab
8. Footer no longer has language toggle, no X link
9. Bio no longer has Hindi paragraph
10. P5Divider renders between Projects and Reading Responses
11. P5Divider renders between Reading Responses and Footer
12. Divider line color is muted (var(--ink-soft) at low alpha), waves
    subtly, does not pull focus
13. Divider hidden on viewports <640px
14. Divider renders static line under prefers-reduced-motion
15. All existing motion (BlurFadeIn cascade, overscroll spring, hover
    arrows) still works
16. prefers-reduced-motion still respected globally

---

## Out of scope

- More elaborate p5.js sketches beyond the divider (the watercolor
  Bharat is the substantial p5 work, linked from card 5)
- Dates on reading responses (source doesn't have them)
- Search/filter on reading responses
- Individual project case study pages
- Analytics
- OG image / favicon (carry over from real portfolio if applicable)
- Accessibility audit beyond what's already there
- Mobile-specific tweaks beyond what's already in place

---

## Build order

1. Push current Cursor state to a new real-portfolio backup repo first
   (safety, optional but recommended)
2. Cuts: remove X social, Tools, Hindi toggle, BioHi (Item 1 of prompt)
3. Project grid swap to 5 cards with images and hover (Item 2)
4. Reading Responses component build + content paste (Item 3)
5. P5Divider component build + insert between sections (Item 4)
6. Verify build, deploy to Vercel
7. Replace placeholder p5-thumb.png with real screenshot from the AoTW
   site

---

## Cursor / Claude Code handoff

Open this PRD in the new VS Code window. Use Claude Code extension to
work through it. Prompts will be drafted as four sequential tasks
matching the build order above. No image attachments needed for this
build since references already established in earlier portfolio work
and most changes are content-substitution rather than new design.
