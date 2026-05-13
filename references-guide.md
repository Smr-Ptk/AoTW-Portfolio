# Visual Reference Guide — Portfolio v2

This guide pairs each PRD section with specific reference images. Use it
two ways:

1. **In Cursor**: when prompting for a section, attach the relevant reference
   image(s) along with the prompt. Cursor reads images and matches them
   far more precisely than text descriptions alone.

2. **As decision lock-in**: when something looks off during build, return
   to the matching reference image to verify what "right" looks like.

All images are in the `references/` folder shipped alongside this guide.

---

## How to attach images in Cursor

When using the Cursor prompts (from `cursor-instructions.md`):

1. Open Cursor's chat
2. Click the paperclip / attach icon
3. Select the relevant image file from `references/`
4. Paste the prompt text
5. Send

The model gets the image and the text together. Each prompt section below
lists which images to attach.

---

## Reference image index

### Primary direction references (the "yes")

**`15-jakub-portfolio-target.png`** — `jakub.kr` home page
The single most important reference. The narrow column, name + role + avatar at top,
prose with italicized hyperlinks for company names, project cards below with rounded
corners and hairline borders, writings list at bottom. **This is the closest visual
target for the entire build.**

**`01-emil-kowalski.png`** — `emilkowal.ski` home page
The text-only minimalism baseline. Note: top-of-page banner for course enrollment,
tiny name + role, prose bio with linked company names, project list as text + one-liners,
no images at all. Reference for: spacing, restraint, voice register.

**`03-pranathi-hero.png`** — `pranathiperi.com` hero
Note the bead-letter brand treatment for company names (decorative, but lowercase),
centered narrow column, time + last-visitor footer detail, hero name large in serif.
Reference for: hero scale, brand-name treatment as cultural payload.

**`16-pranathi-project-cards-real.png`** — `pranathiperi.com` project grid (real)
The most accurate look at Pranathi's actual project grid: 2-col, ~16:10 aspect tiles,
hairline borders, white tile fill, generous gap. Reference for: project grid dimensions
and treatment.

**`05-ryo-hero.png`** — `ryo.lu` hero
"Ryo is making Cursor." — extreme minimalism, brand name as the entire flex.
Reference for: confidence in saying very little.

**`07-ryo-footer-language-toggle.png`** — `ryo.lu` footer
EN / 中 / 日 language toggle treatment, social links bottom-left, past-work list
bottom-right. Reference for: footer language toggle pattern.

**`08-ryo-counter.png`** — `ryo.lu` ticker
"33.7573948361507..." — the technical detail in mono that runs in the footer.
Reference for: technical mono ticker register.

**`12-stanford-law-typography.jpg`** — Stanford Law School identity
The typographic register target. Editorial serif, calm, intellectual gravitas.
Reference for: hero typeface feel (Newsreader is the free analog).

### Cultural payload references

**`06-ryo-japanese.png`** — `ryo.lu` Japanese version
Same site, different language. Note that the Japanese characters render full-size
in the headline, not as a footer easter egg. Reference for: how to handle multi-script
rendering naturally (relevant to bio's Devanagari languages line).

**`09-ascii-art-fish.png`** — pink ASCII fish
The original reference for ambient ASCII background. Note: this is the *concept*
reference for "characters arranged into a shape." Your version (नमस्ते with Perlin
displacement) is calmer than this. Reference for: ambient texture concept.

**`18-henry-codes-knight.png`** — `henry.codes` knight illustration
The v2 swap target. A 1-bit dithered raster illustration treated as background-
foreground texture, with body text wrapping around. Reference for: how the v2
Indic figure illustration will replace the नमस्ते watermark later.

### Counter-references (the "no")

**`04-ramachandran-counter-reference.png`** — `whyramachandran.design`
Maximalist desi heritage. Hindi text everywhere, bold colors, multiple decorative
elements, dotted typography effects. **This is what NOT to do.** Reference for:
how cultural payload becomes loud and undermines elite positioning. Your culture
lives in restraint; this site does the opposite.

**`10-samir-current-portfolio.png`** — `samirpatki.com` current
The Webflow site being replaced. Off-white glassmorphism, Spline 3D orbs, slow.
Reference for: what's being moved away from. Do not replicate.

### Current build state (the "broken")

**`13-current-build-hero-broken.png`** — first prototype hero
The 64px towering name + Geist Mono terminal-formatted bio with stats. **The wrong
register.** Reference for: what the rebuild fixes. Do NOT match this.

**`14-current-build-footer-broken.png`** — first prototype footer
Letter-circle social treatment (M / D / in / X). Agency-ish, wrong direction.
Reference for: what's being replaced. Do NOT match this.

**`17-current-grid-broken.png`** — first prototype project grid
4:3 saturated cream blocks with mono "Project Video XX" labels, no border, too tall.
**The wrong dimensions.** Reference for: what the rebuild fixes. Do NOT match this.

**`02-pranathi-overscroll-rainbow.png`** — `pranathiperi.com` overscroll
The reference for top overscroll behavior (rainbow appearing when pulling past top).
Note the bouncy spring physics — this is the target feel, not the current build's
broken snap-to-max. Reference for: overscroll gesture quality.

**`11-pranathi-project-grid.png`** — Pranathi project grid (alt angle)
Same content as `16` but different framing. Reference for: project grid alternate
view to triangulate dimensions.

---

## Image-to-section mapping

Use this when prompting Cursor for each PRD section. Attach the listed images.

### Prompt 1 — Type system swap
**Attach:** `12-stanford-law-typography.jpg`, `15-jakub-portfolio-target.png`,
`13-current-build-hero-broken.png`

**Why:** Stanford shows the heading register target (Newsreader-adjacent serif).
Jakub shows body text size and line height in context. Current-broken shows
exactly what the swap is replacing (the towering Fraunces hero).

### Prompt 2 — Hero rewrite
**Attach:** `15-jakub-portfolio-target.png`, `01-emil-kowalski.png`,
`03-pranathi-hero.png`

**Why:** All three show the prose-bio register with inline italic links.
Jakub is the closest match (italic Newsreader on company names). Emil shows
the most minimal version. Pranathi shows brand-name treatment.

### Prompt 3 — Project grid rebuild
**Attach:** `16-pranathi-project-cards-real.png`, `15-jakub-portfolio-target.png`,
`17-current-grid-broken.png`

**Why:** Pranathi-real is the dimensional target (16:10, hairline border, white fill,
~22px radius, 24px gap). Jakub shows similar treatment with project logos. Current-broken
shows exactly what's being replaced (4:3 cream blocks).

### Prompt 4 — Footer rebuild
**Attach:** `15-jakub-portfolio-target.png`, `07-ryo-footer-language-toggle.png`,
`08-ryo-counter.png`, `14-current-build-footer-broken.png`

**Why:** Jakub shows text-link socials with arrows. Ryo shows the language toggle.
Ryo-counter shows the mono technical detail register. Current-broken shows the
letter-circle treatment that's being replaced.

### Prompt 5 — Cleanup pass
**No images needed.** Pure code work (delete files, disable indicator, update imports).

### Prompt 6 — नमस्ते background with Perlin noise
**Attach:** `09-ascii-art-fish.png`, `18-henry-codes-knight.png`

**Why:** ASCII fish is the *concept* reference for ambient text-as-background.
Henry-codes is the v2 target (eventual swap to dithered illustration). Cursor
should understand both that this is the v1 stand-in and what it eventually
gets replaced with.

### Prompt 7 — Overscroll physics rewrite
**Attach:** `02-pranathi-overscroll-rainbow.png`

**Why:** This IS the target physics behavior. The bouncy follow-the-gesture rainbow
is exactly what the spring + rubber-band implementation needs to feel like.

### Prompt 8 — Responsive + performance pass
**No images needed.** QA work.

---

## When in doubt during the build

Three rules:

1. **If something feels off, hold it next to `15-jakub-portfolio-target.png`.**
   That's the closest cluster reference. If yours doesn't read with the same
   calm confidence, something is wrong.

2. **If something feels too loud, check against `04-ramachandran-counter-reference.png`.**
   That's the loudness ceiling — don't approach it.

3. **If something feels too sparse, check against `01-emil-kowalski.png`.**
   That's the floor — Emil's minimalism works because his pedigree carries it.
   Match his spacing and restraint, not necessarily his exact word count.

---

## Reference images you can still gather

The references in this folder cover the build. Two more would help if you can
find them:

1. **Heldane Text in use** — the paid typeface alternative, used by Apple Newsroom.
   A reference would help if you ever revisit the Newsreader vs Heldane choice.

2. **A v2 dithered Indic figure illustration** — for the eventual henry.codes-style
   background swap. Could be sourced from existing open-source dithering tools or
   commissioned.

Neither blocks v1.
