---
name: OFTALMO HORUS Center
description: Clean, luminous ophthalmology clinic landing built around a violet iris with a gold ring.
colors:
  horus: "#7c3aed"
  horus-deep: "#6425d6"
  horus-soft: "#ede7fd"
  horus-mist: "#f6f3fc"
  gold: "#d4a853"
  gold-ink: "#8a6414"
  ink: "#1d1433"
  ink-soft: "#4b4363"
  paper: "#ffffff"
  line: "#e7e2f1"
  input-stroke: "#d9d2e8"
  destructive: "oklch(0.577 0.245 27.325)"
typography:
  display:
    fontFamily: "Sora, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 5.4vw, 4.4rem)"
    fontWeight: 700
    lineHeight: 1.04
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Sora, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2.5rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  figure:
    fontFamily: "Sora, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2.5rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Sora, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "-0.025em"
  body-lead:
    fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  body:
    fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.25
rounded:
  control: "10px"
  tile: "14px"
  card: "18px"
  band: "22px"
  pill: "9999px"
spacing:
  card-gap: "20px"
  card-pad: "28px"
  heading-to-grid: "56px"
  section-y: "96px"
  section-y-md: "112px"
  gutter: "16px"
  gutter-md: "24px"
  container: "1280px"
components:
  button-primary:
    backgroundColor: "{colors.horus}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0 24px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.horus-deep}"
  button-outline:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.horus}"
    rounded: "{rounded.control}"
    padding: "0 24px"
    height: "48px"
  button-outline-hover:
    backgroundColor: "{colors.horus-mist}"
  button-small:
    backgroundColor: "{colors.horus}"
    textColor: "{colors.paper}"
    rounded: "{rounded.control}"
    padding: "0 16px"
    height: "40px"
  input-field:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "0 16px"
    height: "48px"
  service-card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "36px 28px 28px"
  icon-tile:
    backgroundColor: "{colors.horus-soft}"
    textColor: "{colors.horus}"
    rounded: "{rounded.card}"
    size: "68px"
  icon-tile-hover:
    backgroundColor: "{colors.horus}"
    textColor: "{colors.paper}"
  promo-card:
    backgroundColor: "{colors.horus-mist}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "28px"
  promo-card-night:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.card}"
    padding: "28px"
  float-card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "20px 16px"
  nav-link:
    textColor: "{colors.ink}"
    padding: "8px 12px"
  nav-link-active:
    textColor: "{colors.horus}"
---

# Design System: OFTALMO HORUS Center

## Overview

**Creative North Star: "The Iris"**

The brand is an eye. Everything in this system orbits a single object: a violet disc with fine radial fibers and a thin gold ring, the iris of Horus, set behind the real doctor in the hero. The rest of the page is a clean, luminous clinic: white and lavender surfaces, violet-night ink, generous air, bordered cards, and one confident violet for every action. It reads as a serious medical practice in Quito with a real specialist, not a wellness brand and not a tech startup.

Density is calm and reference-faithful: a thin info bar, a white sticky nav with one call to action, a split hero, centered section headings, card grids of four, and sections that alternate white, lavender mist and deep ink. Color is flat. Depth appears only on what floats (hero proof cards, the specialist badge, the scrolled header). Motion is slow and quiet: the iris fibers turn over 140 seconds, the iris drifts toward the cursor, content rises once on load.

Confirmed rejections: the previous stock hero built on gradients and glass. No gradient fills, no glassmorphism, no decorative blur.

**Key Characteristics:**
- One violet (#7c3aed) for every action, focus ring, selection and form caret.
- Gold is a ring and a number, never a surface: the iris ring, the 24/7 figure, rating stars, accents on ink.
- Three surface tones in rotation: paper white, horus mist lavender, ink night.
- Flat by default; soft violet-tinted shadow only under floating cards.
- Sora for every heading and figure, Figtree for everything you read.

## Colors

A cool violet world on white and lavender, warmed by a single gold thread.

### Primary
- **Horus Violet** (#7c3aed): buttons, active nav underline, links inside cards, icon discs and tiles, focus outline, text selection, input caret and accent-color, the hero iris disc, the CTA band. The only action color.
- **Deep Iris** (#6425d6): hover state of primary buttons and the iris pupil disc. Never used as a standalone fill.
- **Iris Soft** (#ede7fd): resting background of service icon tiles.

### Secondary
- **Horus Gold** (#d4a853): the iris rings, the logo iris, rating stars, the 24/7 figure and check marks on ink, footer contact icons, and the hover fill of white buttons on dark or violet grounds. Never body text on white.
- **Gold Ink** (#8a6414): gold when it must be read on a light surface (the "30 min" promo figure). The legible gold.

### Neutral
- **Violet Night** (#1d1433): all primary text on light surfaces; background of the Technology section, the footer and the 24/7 promo card.
- **Dusk Gray** (#4b4363): secondary text, paragraphs under headings, captions, info-bar text.
- **Paper** (#ffffff): page background, cards on mist, form panel, nav.
- **Horus Mist** (#f6f3fc): alternating section background (hero, Specialist, Appointment), promo cards, testimonial cards, info bar, ghost hover.
- **Lilac Line** (#e7e2f1): card borders and dividers.
- **Field Stroke** (#d9d2e8): input borders at rest.
- **Destructive** (oklch(0.577 0.245 27.325)): field error border and message only.

### Named Rules
**The One Violet Rule.** Every interactive affordance is Horus Violet or sits on it. No second action color, no gradient between violet and anything.

**The Gold Thread Rule.** Gold is a ring, a star, a figure or an accent on ink. It never fills a card or section, and on light surfaces readable gold text uses Gold Ink (#8a6414), not Horus Gold.

## Typography

**Display Font:** Sora (with ui-sans-serif, system-ui fallback), weights 500/600/700
**Body Font:** Figtree (with ui-sans-serif, system-ui fallback), weights 400/500/600/700

**Character:** Sora is geometric and slightly wide, giving headings and figures a clinical precision; Figtree is warm and round, keeping long reading friendly. All h1–h4 use Sora with -0.025em tracking and balanced wrapping.

### Hierarchy
- **Display** (700, clamp(2.5rem, 5.4vw, 4.4rem), 1.04): hero headline only, two lines, with the key phrase in Horus Violet.
- **Headline** (700, 1.875rem mobile to 2.5rem from md, ~1.2): every section h2.
- **Figure** (700, 1.875rem to 2.5rem, 1): proof numbers (15+, 24/7, 30 min, 4.9, 98%), set in Sora, colored ink, violet or gold by context.
- **Title** (600, 1.125rem to 1.25rem, ~1.4): card and list-item headings.
- **Body Lead** (400, 1.125rem, 1.625): the paragraph under a section heading; max ~34rem in the hero, ~42rem centered.
- **Body** (400, 15px to 17px, 1.625): card copy, testimonials, form text.
- **Label** (600, 0.875rem; info bar and captions at 13px, 500): form labels, small buttons, meta lines. Sentence case; no uppercase tracking.

### Named Rules
**The Figure Rule.** Proof is shown as a Sora numeral above a short Figtree caption, never as a sentence. The numeral carries the color; the caption stays Dusk Gray.

## Layout

A single centered container (max 1280px) with 16px gutters on mobile and 24px from md. Sections stack with 96px vertical padding (112px from md) and alternate backgrounds: mist hero, white services and promos, mist specialist, ink technology, white testimonials, mist appointment, white CTA, ink footer. Never two adjacent sections in the same tone unless one is a direct continuation (services into promo row).

Section heads are either centered (heading, a 48×4px violet bar, lead paragraph, max ~42rem) for catalog sections, or split (heading left, lead or stats right, aligned to the bottom) for narrative sections. Content grids sit 56px below the heading.

Grids: four-up cards at lg (1024px), two-up at sm (640px), one column below, 20px gaps. Two-column features use asymmetric ratios (1.05fr/1fr hero, 1.1fr/1fr technology and appointment) with 48–80px gaps. The hero is a split at lg with min-height 640px; on mobile the copy comes first and the doctor-over-iris image follows at 420px (520px from sm). The info bar hides below md; the nav collapses to a 44px menu button below lg.

## Elevation & Depth

Flat, layered by tone. Cards on white separate with a Lilac Line border; cards on mist are paper white without border or shadow. A shadow appears only on elements that float over imagery or content, and on the header once the page scrolls. All shadows are violet-night tinted with a negative spread so they read as lift, not as a box.

### Shadow Vocabulary
- **Float** (`box-shadow: 0 18px 40px -16px rgba(29,20,51,0.35)`): hero 24/7 card, hero rating card, specialist years badge.
- **Header lift** (`box-shadow: 0 6px 24px -12px rgba(29,20,51,0.18)`): sticky header after 40px of scroll.

### Named Rules
**The Only-What-Floats Rule.** A shadow means the element overlaps something. Grid cards, form panels and section bands stay flat; their hover is a 4px lift plus a border shift, not a shadow.

## Shapes

Soft, consistent rounding derived from a 10px base. Controls (buttons, inputs, menu button, social squares) use 10px. Icon squares in lists use 14px. Every card, photo frame, promo card, form panel, map and float card uses 18px. The CTA band alone uses 22px. Circles are reserved for icon discs in hero stats, avatar initials, and the small heading bar's rounded ends.

The signature form is the iris: concentric circles (outer disc, gold ring at 94% radius, deep pupil at 44%, faint gold pupil ring) with 72 white radial fibers at 8–14% opacity. The logo repeats it in miniature: a violet rounded square holding a white eye outline with a gold iris.

## Components

### Buttons
Confident, compact and solid.
- **Shape:** gently rounded (10px).
- **Primary:** Horus Violet fill, white 15px semibold Figtree, 48px tall, 24px horizontal padding, optional trailing arrow icon at 18px.
- **Hover / Focus:** fills Deep Iris over 200ms; presses down 1px on active; 2px violet outline offset 3px on keyboard focus.
- **Outline:** white fill, violet text, violet border at 40% opacity; on hover the border goes solid and the fill becomes Horus Mist.
- **Small:** same treatments at 40px tall with 16px padding, used in the nav and inside promo cards.
- **On dark or violet grounds:** white fill with ink or violet text, hovering to Horus Gold; secondary is a white/50 bordered ghost.

### Cards / Containers
- **Corner Style:** 18px.
- **Service card (on white):** paper fill, Lilac Line border, centered content, 68px Iris Soft icon tile with a 1.6-stroke violet icon, Sora title, Dusk Gray copy, violet text link with arrow. Hover lifts 4px, border shifts to violet at 50%, tile fills violet with a white icon, arrow nudges 4px right.
- **Promo card:** Horus Mist fill, 28px padding, min-height 260px, title on top, call to action pinned to the bottom-left. One per row can go night (Violet Night fill, white text, gold figure).
- **Panels on mist:** paper fill, no border, no shadow (quote, form, contact list).
- **On ink:** white at 5–6% opacity for list hovers and grouped panels.

### Inputs / Fields
- **Style:** 48px tall, paper fill, 1px Field Stroke border, 10px radius, 16px horizontal padding, 15px ink text, placeholder Dusk Gray at 60%. Label above in 14px semibold ink, optional hint in regular Dusk Gray.
- **Focus:** border turns Horus Violet with a 3px violet ring at 20% opacity.
- **Error:** destructive border and a one-line destructive message below that says what to do.

### Navigation
- White sticky bar, 72px tall, logo left, six links center in 15px medium ink, small primary button right. Hover and active turn the link violet; the active link draws a 2px violet underline that scales in from the left. A 40px Horus Mist info bar sits above from md with 13px Dusk Gray text and violet line icons. Below lg the links collapse into a full-width stacked list with a full-width primary button.

### Iris (signature)
The hero's violet iris disc sits behind the cut-out doctor, partly cropped by the hero edge. Its fibers rotate once every 140 seconds; on fine pointers the whole iris drifts up to 10 units toward the cursor with an eased follow. Both behaviors stop under reduced motion. It is the only rotating or pointer-reactive element in the system.

### Icon discs and tiles
Lucide line icons only, always violet or white. Hero stats use 44px violet circles with white icons; credentials and technology lists use 44–48px violet squares (14px radius); service cards use 68px Iris Soft tiles.

## Do's and Don'ts

### Do:
- **Do** use Horus Violet (#7c3aed) for every button, link, focus ring and active state, with Deep Iris (#6425d6) as its only hover.
- **Do** alternate section grounds between paper, Horus Mist (#f6f3fc) and Violet Night (#1d1433).
- **Do** set every heading and proof figure in Sora with -0.025em tracking, and all reading text in Figtree.
- **Do** use 18px radius for cards and media, 10px for controls.
- **Do** reserve the Float shadow (0 18px 40px -16px rgba(29,20,51,0.35)) for elements that overlap other content.
- **Do** honor prefers-reduced-motion: entrance rise, iris rotation and the testimonial marquee all stop.

### Don't:
- **Don't** use gradient fills or glass/blur panels; the previous gradient-and-glass hero was rejected.
- **Don't** fill a card or section with gold, or set Horus Gold (#d4a853) text on a light surface; use Gold Ink (#8a6414).
- **Don't** introduce a second action color.
- **Don't** put shadows on grid cards or flat panels; use border and tone.
- **Don't** add uppercase tracked labels above headings; the centered violet bar is the only heading ornament.
