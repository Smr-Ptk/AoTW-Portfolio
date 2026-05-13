# Cursor Prompting Instructions

## Setup

1. Drop `PRD-v2.md` into the repo root of your existing portfolio project (or a fresh Next.js scaffold if starting clean).
2. Drop the `references/` folder into the repo root as well.
3. Drop `references-guide.md` into the repo root.
4. Open Cursor in that directory.
5. Use the prompts below in sequence. Do not paste them all at once. Wait for each step to complete and review before proceeding.

## Critical: attach images with each prompt

Cursor reads images far more precisely than text descriptions. For every prompt
below, **attach the listed reference images** along with the prompt text. Use
Cursor's paperclip / attach button. The model will use the images as visual
ground truth.

Each prompt below lists which images to attach. Skip the image attachment and
the build will drift toward generic — the references are what keep it on target.

---

## Prompt 0 — Context-set (paste once at the start of the Cursor session)

**Attach these images:**
- `references/15-jakub-portfolio-target.png` (the closest target)
- `references/01-emil-kowalski.png` (the minimalism baseline)
- `references/16-pranathi-project-cards-real.png` (project grid target)
- `references/13-current-build-hero-broken.png` (what's being replaced)

```
You are working on a portfolio rebuild for a design engineer. Read PRD-v2.md
and references-guide.md in the repo root before doing anything. The PRD
supersedes any existing code in this project — treat existing components
as drafts to be replaced, not preserved.

I've attached 4 reference images:

1. jakub.kr — the closest visual target. Match this register: narrow column,
   small hero name, prose bio with italicized hyperlinks for company names,
   project cards with hairline borders, calm overall.
2. emilkowal.ski — the minimalism baseline. Note the restraint and the way
   text + linked company names carry the entire identity.
3. pranathiperi.com project grid — the dimensional target for project tiles.
   Note: 2-col, ~16:10 aspect, hairline border, white fill, ~22px corner
   radius, ~24px gap.
4. The current build's broken hero — this is what we're moving AWAY from.
   The towering 64px name in Fraunces, the mono-formatted bio with stats,
   the wrong register entirely.

Critical context:
- The first prototype build read as "student portfolio with nice fonts."
  This rebuild is targeting elite design-engineer register (references in
  references-guide.md).
- Less is more. Three motion events total on the page. No preloader. No
  hover effects. No icon library. Calm chrome, the work supplies saturation.
- Do not add features the PRD doesn't ask for. Do not add libraries the PRD
  doesn't list. The only new dependency is framer-motion, used only for
  overscroll physics.

Before each task, restate the task in your own words and list the exact
files you will modify. Do not modify other files. After each task, stop
and let me review before proceeding to the next.

Acknowledge by listing the 10 "drastic changes" from the PRD's intro
section AND describing in your own words what visual register the attached
references establish. Do not start coding yet.
```

---

## Prompt 1 — Type system swap

**Attach these images:**
- `references/12-stanford-law-typography.jpg` (heading register target)
- `references/15-jakub-portfolio-target.png` (body type in context)
- `references/13-current-build-hero-broken.png` (what's being replaced)

```
Task 1 from the build order: Swap the type system.

The attached images show:
1. Stanford Law typography — the heading register we want. Editorial serif,
   restrained, intellectual. Newsreader is the free Google Fonts analog.
2. jakub.kr — the body type and overall hierarchy in context. Sans body
   is calm and reads like prose, not terminal output.
3. The current broken hero — Fraunces at 64px towering, mono-formatted
   bio. This is what we're moving AWAY from.

Per PRD §3:
- Drop Fraunces entirely. Drop Noto Sans Modi.
- Add Newsreader (Google Fonts) for headings, with opsz axis support.
- Add Geist (Google Fonts) for body.
- Keep Geist Mono (Google Fonts) for footer technical bits only.
- Keep Noto Serif Devanagari for the namaste background.

Update:
- src/app/layout.tsx — swap next/font/google imports
- src/app/globals.css — replace --font-* tokens, remove Fraunces-specific
  variation settings, add the .hero-name spec from PRD §3 exactly:
    font-variation-settings: 'opsz' 36;
    font-weight: 500;
    font-size: 30px;
    letter-spacing: -0.02em;
    line-height: 1.1;
    color: var(--ink);
- Update the body element to use var(--font-sans), 17px, line-height 1.55,
  letter-spacing -0.005em, color var(--ink-soft)
- Update the color tokens in globals.css to match PRD §3 exactly
  (--bg, --ink, --ink-soft, --hairline, --watermark, --tile-fill, --overscroll)
- Update --duration-fade to 700ms (was 1200ms)
- Update --stagger to 70ms (was 100ms)

Do not touch any component files. Do not touch page.tsx.

After this is done, list every value you changed and stop.
```

---

## Prompt 2 — Hero rewrite

**Attach these images:**
- `references/15-jakub-portfolio-target.png` (closest target — italic links inline)
- `references/01-emil-kowalski.png` (minimalism baseline)
- `references/03-pranathi-hero.png` (alternate register)

```
Task 2: Rewrite the Hero component.

The attached images show three reference portfolios with similar bio
treatments. Match the prose register: narrow column, small name, casual
sentences, italic-serif inline hyperlinks for proper noun company names.
Note especially Jakub's treatment of "Interfere" italicized + linked
inline within the prose. That's the pattern.

Per PRD §5.1, replace src/components/Hero.tsx entirely. The current Hero
renders a 51-64px name in a banner-like block with mono-formatted bio
including stats. The new Hero is much smaller and prose-based.

Implementation:
- 30px hero name in Newsreader (use the .hero-name class from globals.css)
- Below name, the role "Design Engineer" in body sans, var(--ink-soft),
  no special class needed
- Then two paragraphs of bio per PRD §5.1, exactly as written, with inline
  italicized hyperlinks for proper noun company names
- Use a small Link component (define inline in this file, not a new file)
  that renders an <a> with className applying Newsreader italic
- Pull all hrefs from BIO_LINKS in lib/constants.ts (update constants.ts
  to match PRD §6 exactly)

Bio paragraph 1 final text (do not modify):
"I'm a designer and developer based in New York. This summer I'm joining
The New York Times as a design engineer. Right now I'm finishing my
master's in integrated product design at Penn. Before this I designed
for HP, Kodak, Saris, and GE at C+A Global. I also founded Creative X
at Rutgers, a design community for student creatives."

Bio paragraph 2 final text (do not modify):
"Outside of work I'm interested in powerlifting, history and learning
languages."

Italicize and link these proper nouns inline: The New York Times, Penn,
HP, Kodak, Saris, GE, Creative X.

Do NOT italicize or link: C+A Global, Rutgers.

Also update src/lib/constants.ts to match PRD §6 (BIO_LINKS, PROJECTS,
SOCIALS, TICKER_STRINGS).

After this, show me the rendered Hero markup and stop.
```

---

## Prompt 3 — Project grid rebuild

**Attach these images:**
- `references/16-pranathi-project-cards-real.png` (dimensional target)
- `references/15-jakub-portfolio-target.png` (similar treatment, project logos)
- `references/17-current-grid-broken.png` (what's being replaced)

```
Task 3: Rebuild ProjectGrid.

The attached Pranathi reference shows the exact dimensions to match: 2-col,
~16:10 aspect, hairline borders, near-white tile fill, ~22px corner radius,
generous gap between tiles. The current broken grid (also attached) is 4:3
saturated cream blocks — wrong on every dimension. Match Pranathi.

Per PRD §5.3, replace src/components/ProjectGrid.tsx. The current grid is
2-col 4:3 with saturated cream tile fills and "Project Video XX" labels in
mono, 10 tiles. The new grid is 2-col 16:10 with hairline borders, white
fills, no labels, 6 tiles.

Spec:
- CSS Grid, grid-template-columns: 1fr 1fr, gap 24px
- 6 tiles total (cut from 10 in constants.ts already)
- Each tile: 16:10 aspect ratio (use aspect-[16/10] in Tailwind, or
  padding-top 62.5% trick)
- border-radius 22px
- 1px solid var(--hairline)
- background var(--tile-fill)
- Each tile renders <video src={p.videoSrc} autoPlay loop muted playsInline
  preload="metadata" /> filling the tile (object-fit: cover)
- Wrap each tile in <a href={p.href}> (no hover state, no scale, no shadow)
- No labels, no titles, no text inside the tile

For development: place 6 placeholder MP4 files (or simple static images)
in /public/videos/. If MP4s aren't available, use <img> with placeholder
images at 16:10 ratio, replace with <video> later. Either way, the
component code should expect a video source path.

After this, show me the rendered grid and stop.
```

---

## Prompt 4 — Footer rebuild

**Attach these images:**
- `references/15-jakub-portfolio-target.png` (text-link socials with arrows)
- `references/07-ryo-footer-language-toggle.png` (language toggle pattern)
- `references/08-ryo-counter.png` (mono technical detail)
- `references/14-current-build-footer-broken.png` (what's being replaced)

```
Task 4: Rebuild Footer.

The attached references establish the footer pattern:
1. Jakub's text-link socials with ↗ arrows — that's our pattern, no icons.
2. Ryo's footer with EN/中/日 language toggle — we'll do EN/हि.
3. Ryo's counter ticker (the long decimal number) — that's the register
   for the mono technical detail. Quiet, in mono, in soft ink color.
4. The current broken footer with letter-circles (M/D/in/X) — that's
   what we're replacing. Don't repeat it.

Per PRD §5.4, replace src/components/Footer.tsx. The current footer has
letter-circle icon treatments (M, D, in, X). The new footer is text-link
socials with arrow indicators, plus a mono technical ticker, plus a
language toggle, plus copyright.

Three rows:

Row 1: Social text links with ↗ arrow
- "Email ↗", "X ↗", "GitHub ↗", "LinkedIn ↗"
- 14px Geist, gap 24px between links
- Hover: underline (no color shift)
- Pulled from SOCIALS in constants.ts

Row 2: Mono technical ticker
- Geist Mono, 13px, color var(--ink-soft)
- Randomize one of two strings per page load:
  - "Rendered in {ms}ms" — for development, hardcode "187ms"; replace
    with real performance.now() value in production
  - "Last deployed {hours}h ago · commit {commit}" — for development,
    hardcode "4h ago · commit a3f2b8c"; replace with build-time env vars
    in production
- Pick one randomly on mount, no rotation animation, just one per visit

Row 3: Language toggle + copyright
- Left: "EN" and "हि" (Hindi character), 13px Geist Mono
- Active language is underlined; clicking just toggles which is underlined
  (visual only, no actual translation logic)
- Right: "© 2026 Samir Patki", 13px Geist
- All var(--ink-soft) color

Spacing between footer and project grid: 128px.

Do NOT add icons. Do NOT use lucide-react or any icon library. Text and
unicode arrows only.

After this, show me the rendered footer and stop.
```

---

## Prompt 5 — Disable Next dev indicator + cleanup

**No images needed** — pure code work.

```
Task 5: Cleanup pass.

1. Add to next.config.ts (or next.config.js):
   devIndicators: false
   (Or for older Next versions: devIndicators: { buildActivity: false })

2. Delete src/components/Preloader.tsx

3. Delete src/components/Writings.tsx

4. In src/app/page.tsx, remove imports and references to Preloader and
   Writings. The page should now render only:
   - <NamasteBackground /> (we'll create this next, leave the import for now
     and create a stub component that returns null)
   - <main> containing
     - <BlurFadeIn><Hero /></BlurFadeIn>
     - <BlurFadeIn><ProjectGrid /></BlurFadeIn>
     - <BlurFadeIn><Footer /></BlurFadeIn>
   - <OverscrollTexture /> (existing)

5. Remove the preloader-done state logic and the pointer-events-none
   className gating. The Hero now mounts and animates in directly via
   BlurFadeIn.

6. Update src/components/BlurFadeIn.tsx to match PRD §7.2 — 14px translateY
   (was 24), 8px blur (was 12), 700ms duration (was 1200ms). The IntersectionObserver
   logic stays.

After this, the page should render and look like a working but unstyled
version of the new design. Stop and let me verify before proceeding to
namaste background.
```

---

## Prompt 6 — नमस्ते background with Perlin noise

**Attach these images:**
- `references/09-ascii-art-fish.png` (concept reference for ambient ASCII)
- `references/18-henry-codes-knight.png` (v2 swap target — eventual replacement)

```
Task 6: Implement NamasteBackground.

The attached images establish two things:
1. ASCII art fish — the concept of ambient text-as-shape in the background.
   Our version is calmer and simpler than this: just the Devanagari word
   नमस्ते large, with subtle per-glyph Perlin noise displacement, off-white
   on off-white at very low contrast.
2. henry.codes knight illustration — this is the v2 target. Eventually
   the नमस्ते watermark gets swapped for a similar dithered Indic figure
   illustration (warrior, deity, dancer — TBD). The component should be
   structured so a future component swap is clean.

Per PRD §7.1, create src/components/NamasteBackground.tsx and
src/lib/perlin.ts.

perlin.ts:
- Implement classic 2D Perlin noise as a self-contained module
- Export function: perlin2(x: number, y: number): number returning -1 to 1
- ~50 lines, no dependencies. Use a permutation table seeded once.

NamasteBackground.tsx:
- Renders a <canvas> element with position: fixed, inset: 0,
  z-index: -1, pointerEvents: none
- On mount, sets canvas dimensions to window.innerWidth * devicePixelRatio
  and window.innerHeight * devicePixelRatio
- Renders the word "नमस्ते" centered horizontally, vertically aligned
  with where the hero text starts (~80–200px from top)
- Word rendered glyph-by-glyph (use Array.from("नमस्ते") which handles
  Devanagari grapheme clusters correctly — verify this; if not, use
  the manual character split)
- Each glyph rendered via ctx.fillText with offset:
    x_offset = perlin2(glyphIndex * 0.3, t) * 6
    y_offset = perlin2(glyphIndex * 0.3 + 100, t + 100) * 6
- t increments by 0.0008 per frame
- 30fps target — use a frame skip if needed
- font: 'normal 280px "Noto Serif Devanagari", serif'
- fillStyle: '#EDE7DC'
- Pause animation when document.visibilityState !== 'visible'
- Disable entirely below 768px (return null)
- Respect prefers-reduced-motion (render once, no animation loop)
- On window resize, re-init canvas dimensions

Add a fade-out behavior:
- Listen to window scroll
- When window.scrollY > 100, fade canvas opacity to 0 over 400ms
- When scrollY <= 100, fade back to 1

Performance critical: profile with DevTools after this is built. If idle
CPU exceeds 5%, reduce fps to 20 or simplify the noise function.

After this, show me the canvas behavior and let me verify the namaste is
visible at 4% color delta and animating subtly. Stop.
```

---

## Prompt 7 — Overscroll physics rewrite

**Attach this image:**
- `references/02-pranathi-overscroll-rainbow.png` (target physics behavior)

```
Task 7: Rewrite OverscrollTexture physics.

The attached Pranathi reference IS the target behavior. Note how the
rainbow band reveals proportionally as the gesture pulls down, then
springs back with a slight bouncy overshoot on release. That's the
physics quality target. The current implementation (which doesn't do
this) snaps to max immediately and fades after an idle timer — completely
wrong.

Per PRD §7.3, replace the body of src/components/OverscrollTexture.tsx.
The current implementation snaps to max instead of tracking gesture, has
no rubber-band, and uses an idle timer for release. All wrong.

First, install framer-motion:
  npm install framer-motion

New implementation:
- Use framer-motion's useMotionValue and useSpring
- Pull motion value tracks gesture 1:1 up to threshold of 60px
- Past 60px, apply rubber-band damping:
    revealed = threshold + (pulled - threshold) * exp(-(pulled - threshold) / 80)
- Max reveal capped at 180px
- On gesture-end (pointerup, touchend, mouseup), spring back to 0 with:
    stiffness: 280, damping: 26, mass: 1
- This should produce a natural ~3-5% overshoot before settling

Inputs to track (only when window.scrollY <= 0):
- wheel events with deltaY < 0
- touchmove with downward delta
- pointermove with active drag

Render:
- <motion.div> styled as a band at top of viewport
- height: useTransform(motionValue, v => v + 'px')
- background: var(--overscroll) — solid #A8322D for now
- No content inside the band yet (just solid color placeholder)
- pointer-events: none

Remove:
- All the existing setTimeout idle timer logic
- All the existing requestAnimationFrame release loop
- The existing CSS .overscroll-overlay and related classes (or keep them
  but don't use them)

This is the highest-risk task in the build. If physics feel wrong, iterate
on stiffness (try 240–320) and damping (22–30) values until release feels
natural. Reference: native iOS overscroll, pranathiperi.com top overscroll.

After this, show me the gesture working and stop.
```

---

## Prompt 8 — Responsive + performance pass

**No images needed** — QA work.

```
Task 8: Responsive QA and performance check.

1. Verify mobile (<768px):
   - Hero scales 0.9x (24px hero name, 15px body)
   - Project grid stays 2-col but tiles smaller
   - Footer rows stack (socials on top, ticker middle, lang+copyright bottom)
   - NamasteBackground returns null
   - Overscroll still works on touch

2. Run Lighthouse Performance audit. Targets:
   - Performance ≥95
   - LCP <1.0s
   - CLS 0
   - INP <200ms

3. If namaste canvas tanks performance (CPU on idle >5%):
   - Reduce fps to 20
   - Reduce noise computation to every other frame
   - Simplify per-glyph displacement

4. Test prefers-reduced-motion:
   - Set OS to reduce motion
   - Verify namaste is static (no animation loop running)
   - Verify blur fade-ins are reduced or removed
   - Verify overscroll still works (gesture is user-initiated, not auto)

5. Test browsers: Chrome, Safari, Firefox. Verify Devanagari renders
   correctly (Noto Serif Devanagari should fall back gracefully on systems
   without it).

Report findings. Don't fix issues yet — just list them with severity.
```

---

## Mid-build prompts you can use anytime

### When something looks off

**Attach the relevant reference image** (usually `15-jakub-portfolio-target.png`
or whatever target the section is going for) along with a screenshot of your
current state.

```
Compare the attached current state of [element] against the attached reference
[which one]. List 3 specific differences in:
- Spacing
- Type size/weight
- Color/contrast
- Border/radius/fill
Then propose a single fix for each. Don't apply any until I pick which to apply.
```

### When motion feels janky

**Attach a screen recording or sequence of screenshots** showing the broken motion.

```
The motion on [element] feels [jerky / too fast / too slow / too dramatic].
The target is [specific reference, e.g. "Pranathi's overscroll rainbow" or
"Linear's blur fade"]. Reduce, don't add. Show me current values for
duration, ease, distance, and propose calmer alternatives.
```

### When tempted to add a feature

```
I'm thinking of adding [feature]. Before writing code, justify it against
the PRD. If it's not in the PRD, push back on whether it earns its place.
The bias is toward less.
```

### When stuck on physics

**Attach `references/02-pranathi-overscroll-rainbow.png`.**

```
The overscroll physics still feel [snappy / sluggish / unnatural]. The
attached reference is the target — bouncy follow-the-gesture spring with
overshoot on release. Show me a side-by-side of current stiffness/damping/mass
vs 3 alternative tunings. Don't apply, propose.
```

### Visual diff against target

When the build looks "almost right but something is off":

**Attach both:**
- A screenshot of your current localhost
- The relevant target reference (usually `15-jakub-portfolio-target.png`)

```
Here's my current state and the target reference. Walk through the page
top to bottom and list every visual difference, ordered by how much each
contributes to the overall "feels off" perception. Be specific: pixel
differences, color hex differences, font weight differences, spacing
differences. Don't fix anything yet.
```

---

## Things to watch Cursor for

Cursor will, by default:

1. **Add libraries you don't need.** It will reach for lucide-react, framer-motion (everywhere), GSAP, react-spring, etc. Reject anything not in the PRD.
2. **Add hover effects, scale transforms, drop shadows.** Especially on cards and buttons. The PRD says no hover states on project tiles — Cursor will add them anyway. Catch and remove.
3. **Use `<Image>` from `next/image` for everything.** Fine for placeholders but switch to `<video>` for project tiles per spec.
4. **Animate every paragraph individually.** The PRD says 3 fade events total. Cursor will want to stagger every link, every word. Reject.
5. **Add accent colors.** Cursor will reach for blue links, green success states, pink hover. The PRD is one accent (madder, on overscroll only). Chrome stays neutral.
6. **Inline emoji or heart icons.** No emoji. No hearts. No "Made with ❤️" footer.
7. **Suggest "let me also add a contact form / newsletter / dark mode toggle."** Reject all of these. Out of scope.

When Cursor adds something not in the PRD, your response is:

```
That's not in the PRD. Remove it. Refer to PRD §[X] which explicitly
[states the constraint]. Confirm the removal and continue.
```

---

## Final pass before launch

After all 8 build prompts are done and the site looks right, run this:

```
Final pre-launch audit. Walk through PRD §11 (pre-launch checklist) and
verify each item. For items that depend on real assets (avatar, MP4s,
favicon, OG image), list them as outstanding. For items that should be
done in code (Next dev indicator disabled, prefers-reduced-motion working,
performance budget met), verify and report status. Do not add new features
during this pass.
```

That's it. Hand the PRD to Cursor in chunks, hold the line on the cuts,
and don't let it pad the spec.
