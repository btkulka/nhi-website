# NHI — Design System

> _Non-Human Intelligence._ The recording project of a DJ based in Austin, TX (also majority owner of Force Majeure). This system is built for a **mobile-first** artist site — quiet, alien, and mysterious. Desktop is a respectful afterthought.

The visual DNA is rooted in **The Gamut** — the album art used as the home of the project: a bone-pale figure on near-black, fractured by ember-red and ash-gold organic forms. Painterly. Patient. Cosmic but personal.

---

## Index

| File / Folder | What it is |
|---|---|
| `README.md` | This document — start here. |
| `colors_and_type.css` | Foundational CSS variables: palette, type scale, spacing, motion. Drop into any artifact. |
| `assets/` | Brand assets and image library. `the-gamut.jpg` is the primary art. `inspiration/` holds the Mosquera reference sheet (do **not** ship — directional only). |
| `preview/` | Card specimens that render in the Design System tab. |
| `ui_kits/site/` | Mobile artist-site UI kit — JSX components + an interactive `index.html` mocking the live experience. |
| `SKILL.md` | Cross-compatible skill manifest — usable as an Agent Skill. |

---

## Brand Context

**NHI** is a recording / DJ project by an Austin-based artist. Adjacent to (and stylistically informed by) acts like ODESZA, RÜFÜS DU SOL, and the live electronic / alternative-dance space — emotional, atmospheric, often instrumental. The brand is **NOT** a club brand. It is closer to a film score project: ritualistic, slow-burning, image-led.

The most recent single is supported visually by a **burning-tree video loop**. (Note: the referenced `uploads/burning_tree_30s_60fps.mp4` was not present in the upload set — see Caveats.)

### Resources provided
- `uploads/The Gamut.jpg` — primary brand artwork (used).
- `uploads/Breathe.jpg.jpg`, `Dissolve.jpg.jpg`, `Fated.jpg.jpg`, `GEMINIIgram.jpg.jpg`, `Sundara_Final.jpg`, `Innerbloom_2020.jpg.jpg`, `LOYAL_head003.jpg.jpg`, `RH_web.jpg.jpg`, `KC_001…003.jpg`, `HH_Victormosquera.jpg.jpg` — peer / reference work in the alt-electronic poster space.
- `uploads/ODESZA_*.jpg` — concert / poster reference (atmosphere, not visual copy).
- `uploads/victor-mosquera-*.jpg` — **directional mood**, NOT to ship. Bone/ink minimalism, painterly grit, surreal staging.
- `uploads/burning_tree_30s_60fps.mp4` — _missing from the actual filesystem; please re-upload._

### One-line positioning
> An audio-visual project from the edge of the signal. Patient music for patient listeners.

---

## CONTENT FUNDAMENTALS

The voice is **terse, lower-stakes, and allusive**. Words behave like negative space — the imagery does the heavy lifting. We never sell. We rarely explain.

### Voice rules

- **Lowercase by default.** Sentence case for proper nouns and the artist mark `NHI` only. Headlines, nav items, and buttons all lowercase.
  - ✅ `listen` ✅ `austin · tx` ✅ `new — burning tree, out now`
  - ❌ `LISTEN NOW!` ❌ `Welcome To NHI`
- **Mono is for data.** Anything that's a fact (date, runtime, catalog #, venue, BPM) goes in `JetBrains Mono`, uppercase, wide-tracked.
  - ✅ `04 · 18 · 26  ·  AUSTIN, TX  ·  21:00`
- **Serif is for feeling.** Track titles, lyric pulls, and hero headlines use the display serif — often italic, often a single phrase on a black field.
- **No "we." No "you." Mostly no pronouns at all.** The project speaks in the third person or the second-half-of-a-thought.
  - ✅ `the signal precedes the song.`
  - ❌ `We're so excited to share our new track with you!`
- **Punctuation is sparse.** A period or em-dash, never an exclamation point. A `·` (middle dot) is the preferred separator for inline metadata. `—` for breath.
- **No emoji. Ever.** No unicode flourishes (no ✦ ☾ ✺ etc) — they cheapen the silence.
- **Numerals stay tabular.** Track numbers as `01 / 02 / 03`, not "one, two, three."
- **Track titles are quiet.** Short, often one word: _Breathe. Dissolve. Fated. The Gamut._ Follow that pattern.

### Tone examples

| Moment | Copy |
|---|---|
| Hero / arrival | `nhi` / italic display: _the signal precedes the song._ |
| Release card | eyebrow: `NEW · 04.26` — display: _burning tree_ — meta: `single · 4:32` |
| Show announcement | `04 · 18 · 26 — AUSTIN, TX` / display: _at the rosewood_ |
| Newsletter prompt | `transmissions, occasional` / button: `subscribe` |
| 404 | _signal lost._ / `return — home` |
| Footer | `nhi · austin, tx · ©2026` |

### Don'ts
- No marketing voice ("don't miss", "limited time", "discover").
- No corporate edge ("crafted", "curated", "elevated").
- No genre-tagging in body copy ("melodic house producer NHI…"). Genre is for press releases, not the site.

---

## VISUAL FOUNDATIONS

The site should feel like a **dimmed room** with a **single lit object**. Black field, bone type, one moving image at a time. Most pages are **80% empty**.

### Color
- **Ink** `#0a0908` — the entire site's bedrock. Not pure black; warmed slightly, like cinema black. Backgrounds are this color or a full-bleed image; never gradients.
- **Bone** `#f1ece1` — primary text and the rare line element. Warm off-white; never `#fff`.
- **Ember** `#c93829` — the red from The Gamut. Used as a **single mark** per screen — a track's "now playing" dot, a CTA underline, an active nav indicator. Never as fill on a large area.
- **Ash-gold** `#b78f54` — used even more rarely than ember; outline marks, subtle hairlines on featured cards, vinyl-sleeve spines.
- Gray scale (`bone-2/3/4`) for secondary, tertiary, and hairlines.
- **No gradients on chrome.** Atmospheric gradients (image protection scrims) are allowed and only at the bottom of full-bleed images.
- **No semantic green/yellow/red.** If we ever need an error state, it's bone on ember.

### Typography
- **Cormorant Garamond** — display serif, **light weights only** (300/400). Heavy use of italic. Classical, mystical, single-letter "N" / "G" can carry an entire screen.
- **JetBrains Mono** — labels, eyebrows, dates, catalog numbers, navigation. **Always uppercase, always wide-tracked (`0.18em`)** for eyebrows; `0.08em` for inline. The "data" voice.
- **Manrope** — body text. Light (300) at small sizes; never bold above a single semibold (600) for buttons.
- **Pairing rule:** never put serif and mono on the same line at similar sizes. Serif headlines + mono eyebrows is the canonical pair, separated by stack/space, never inlined.

### Spacing & rhythm
- **4px base.** Mobile gutters are **20px**. Section breaks are 64–96px of vertical air.
- **Center column on mobile.** Ragged left-aligned text inside a tight column. Right alignment is reserved for metadata pairs (date right, place left).
- **Generous leading** (`1.55–1.75`) on body, **tight** (`0.95–1.1`) on display. Never widow a single word in a headline.

### Backgrounds
- **Default:** ink (`#0a0908`).
- **Full-bleed image** for release / show / about hero panels. Images are placed without crop variation — preserve the painterly composition. Always paired with a **bottom protection gradient** (ink → transparent, ~30% of the panel height) so type stays legible without a card.
- **Never:** repeating patterns, brand textures, abstract SVG shapes, dot grids as decoration.
- **Optional:** very subtle **film grain** overlay (the `.atmos` utility in CSS) on dark surfaces.

### Imagery treatment
- All photo / illustration is **warm**, **saturated in narrow ways** (red/gold/bone), **never cool blue**. If a press photo arrives looking digital-blue, color-grade it before publishing.
- Painterly > photographic. When stuck, lean toward illustration (Gamut-style).
- B&W is permitted as a tonal break (a portrait, a venue photo) — but graded warm, never neutral.
- **Grain on, sharpening off.** Soft edges. The screen should feel like 35mm.

### Motion
- **Slow.** Default duration `240ms`; image reveals up to `900ms`. Nothing under `140ms`.
- **Easing:** `cubic-bezier(0.2, 0.7, 0.2, 1)` (sleepy out-curve). No bounce, no spring, no overshoot.
- **Veil reveals** — large images appear via opacity-only crossfade or a slow black-to-transparent veil, never slide-in.
- **Audio is the choreographer.** When a player is active, subtle bone-on-ink waveform pulses at the playback rate (1Hz → 4Hz at the kick). When paused, nothing moves.
- **Page transitions** are full-bleed black wipes, ~400ms.

### Hover & press states
- **Hover:** opacity drop only (`1 → 0.6`) for text links; ember underline grows from 0 → 100% for primary CTAs (`240ms`).
- **Press:** `scale(0.98)` on tappable surfaces, no color shift. Buttons _do not_ change background color on press.
- **Focus:** 1px ember outline at 2px offset. Never a glow, never a halo.

### Borders & dividers
- **Hairlines only** — `1px solid rgba(241, 236, 225, 0.10)` between rows and at section ends. Borders never wrap a card.
- Borders go _between_ elements, not _around_ them.

### Radii
- **Sharp by default.** `0px` corners on cards, panels, and buttons.
- `2px` is permitted on inline pills (catalog tags, genre tags if forced).
- `999px` (pill) only on the audio scrub handle and tiny status dots.

### Shadows
- The system **almost never uses cast shadows.** Lighting is emissive (the screen glows) or atmospheric (grain).
- The exceptions: a soft inner-shadow at the bottom of full-bleed images (the protection gradient counts), and a single ambient `0 12px 32px -12px rgba(0,0,0,0.6)` for modal sheets.

### Cards
- "Cards" are mostly **invisible**. A release card is a full-bleed image with type stacked at the bottom — no border, no rounded corner, no shadow, no chrome. The image _is_ the card.
- When chrome is needed (a setlist row, a credit row), it's a hairline _underneath_ the row, not around it.

### Transparency & blur
- Used sparingly on **fixed UI** only — the bottom audio bar, top nav on scroll, modal sheets. `backdrop-filter: blur(20px) saturate(120%)` over a `rgba(10,9,8,0.72)` scrim.
- Never blur background images for "frosted glass" decoration.

### Layout rules
- **Fixed top nav**: appears only on scroll; fades in at scrollY > 80; height `52px`; logo left, single CTA right (typically `LISTEN`).
- **Fixed audio bar**: when a track is loaded, the bar pins to the bottom. `64px` tall. `bone` on `ink-2`.
- **Safe areas** respected on iOS (`env(safe-area-inset-*)`).
- **Mobile design width** is `390px`. Desktop never exceeds `720px` reading width — content stays narrow even on a 4K screen, with full-bleed imagery the only thing that grows.

### Iconography
See `ICONOGRAPHY` below.

---

## ICONOGRAPHY

The system is **icon-light**. Most surfaces have **zero icons**. When iconography appears it is functional, not decorative — play / pause, external-link arrow, social platform marks at the footer, a single chevron for navigation.

### Approach
- **Style**: thin outline, **1px stroke**, `bone` color, no fill. Sharp endpoints (no rounded caps). Ember stroke for active/playing state only.
- **Sizes**: `16px` inline, `20px` UI default, `24px` for primary affordances (audio play). Never larger than `32px`.
- **Source**: we use **[Lucide](https://lucide.dev)** via CDN as the substitute set — its 1.5px stroke is the closest open-source match to the project's restraint. _(Substitution flag: this is a substitution; if you have a custom icon kit, replace.)_
- **Brand mark**: `NHI` typeset in Cormorant Garamond italic. There is no logomark / symbol — the wordmark is the entire identity. (Optional secondary: a single ember dot `·` placed before the mark on small chrome, `· nhi`.)
- **Emoji**: never.
- **Unicode glyphs**: only `·` (middle dot) and `—` (em-dash) as separators. No arrows, hearts, stars, sparkles.
- **Platform icons** in the footer (Spotify, Apple Music, Bandcamp, Instagram) use the platforms' official monoline SVGs — **always bone, never brand-colored**.

### When to skip an icon
If a label and an icon say the same thing, drop the icon. The site should feel under-instructed.

---

## CAVEATS

- **Missing video**: `uploads/burning_tree_30s_60fps.mp4` was referenced but is not in the project filesystem. The hero on the homepage references this file path so it'll work once re-uploaded; an image fallback is in place.
- **Font substitutions**: Cormorant Garamond, JetBrains Mono, and Manrope are Google Fonts stand-ins. If NHI has licensed alternatives (a custom cut, or commercial faces like Lyon, Söhne, or PP Editorial New), drop them into `fonts/` and update `colors_and_type.css`.
- **Logo**: there is no supplied logomark — the brand is the wordmark. If a mark exists, attach it.
- **Burning tree** is treated as a temporary, single-release surface — visuals lean back to The Gamut for everything that isn't that release. Confirm intent.

---

## How to use

In any artifact, link `colors_and_type.css` and you're set:

```html
<link rel="stylesheet" href="../colors_and_type.css">
```

Then use the semantic CSS variables (`--fg`, `--bg`, `--accent`) and type classes (`.t-mega`, `.t-display`, `.t-eyebrow`, `.t-meta`).
