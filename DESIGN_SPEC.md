# Portfolio Redesign — Build Spec

**For:** Antigravity CLI (agent with write access to this repo)
**Goal:** Replace the current basic `index.html` + `style.css` with a polished, editorial "Swiss" portfolio for Amit Chandran — electronics/embedded + mechanical/product-design engineer, student seeking internships/placements.

**Stack:** Keep it vanilla. Plain HTML + CSS, no framework, no build step. One `style.css` shared across pages. A tiny bit of vanilla JS only for the mobile nav toggle (optional). This must still open as static files on GitHub Pages.

---

## 1. Design language (what "good" looks like)

Editorial / Swiss: warm off-white paper, near-black ink, **one** accent (vermillion). Strong grid, generous whitespace, big confident headings, hairline `1px` rules dividing sections, monospace labels for section numbers/metadata. Calm and confident — no gradients, no drop shadows on content, no rounded cards with left-border accents, no emoji.

### Design tokens — put these at the top of `style.css`

```css
:root {
  /* color */
  --paper:      #F4F1EA;   /* page background */
  --ink:        #17150F;   /* primary text / dark blocks */
  --muted:      #4C493F;   /* body copy */
  --faint:      #8A877B;   /* labels, captions */
  --accent:     #D8452B;   /* vermillion — links hover, section kickers */
  --line:       rgba(23, 21, 15, 0.14);  /* hairline dividers */
  --line-strong:rgba(23, 21, 15, 0.24);  /* chip borders */

  /* type */
  --font-sans:  'Archivo', system-ui, sans-serif;   /* everything */
  --font-serif: 'Newsreader', Georgia, serif;        /* italic accents only */
  --font-mono:  'JetBrains Mono', ui-monospace, monospace; /* labels, numbers */

  /* rhythm */
  --pad-x:  clamp(20px, 5vw, 72px);   /* horizontal page padding */
  --pad-y:  clamp(48px, 7vw, 80px);   /* section vertical padding */
  --maxw:   1440px;                    /* content max width, centered */
}
```

### Fonts — add to `<head>` of every page

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800&family=Newsreader:ital,opsz@1,6..72&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
```

### Typographic scale
- **H1 (hero):** `Archivo` 800, `clamp(44px, 9vw, 104px)`, `line-height: .94`, `letter-spacing: -.03em`. One phrase inside set in `Newsreader` italic 400 for contrast (see hero copy).
- **H1 (project):** same family, `clamp(40px, 7vw, 76px)`.
- **Section number / labels:** `JetBrains Mono` 400, `12–13px`, `letter-spacing: .12–.14em`, uppercase, color `--faint` (or `--accent` for kickers).
- **Lead paragraph:** `Archivo` 500, `clamp(20px, 2.6vw, 24px)`, `line-height: 1.5`.
- **Body:** `Archivo` 400, `16px`, `line-height: 1.7`, color `--muted`.

### Global resets
```css
* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { margin: 0; background: var(--paper); color: var(--ink); font-family: var(--font-sans); }
a { color: var(--ink); text-decoration: none; }
a:hover { color: var(--accent); }
img { max-width: 100%; display: block; }
::selection { background: var(--accent); color: var(--paper); }
```

---

## 2. Page structure

Build **4 HTML pages** sharing `style.css`:

1. `index.html` — landing (hero, about, project index, skills, contact, footer)
2. `projects/pet-feeder.html` — case study
3. `projects/mainboard-v7.html` — case study
4. `projects/imeche-challenge.html` — case study

Project pages share one **case-study layout** (section 5). Keep markup identical between them; only content changes.

> Keep the existing repo assets where they are and reference them with correct relative paths (project pages sit one folder deep → prefix with `../`).

---

## 3. Asset mapping (use the files already in the repo)

| Slot | File in repo |
|---|---|
| About photo | `Profile Photo.jpeg` |
| Mainboard hero render | `3D_MainBoardV7_1_2025-03-22.png` |
| Mainboard schematic image | `FinalCircuitSchematic.png` |
| Mainboard extra detail | `Electronics Project 2024.pdf` (link as "Read the full write-up" download) |
| Pet feeder gallery | images in `images_pet_feeder/` |
| Pet feeder research artifact | `Final Scenarios PPT - pet feeder.pdf` (link/download) |
| NEA / coursework imagery | images in `images_NEA/` (use where a project needs a photo) |
| IMechE poster image | `IMechE design Challenge poster.pdf` → **export page 1 to a PNG** for the thumbnail, keep the PDF as a download link |
| IMechE portfolio | `IMechE design portfolio.pdf` (download link) |
| CV / résumé | `main.pdf` *(confirm this is the CV — if not, add the real one and point the "Download CV" buttons at it)* |
| Education / affiliation logos | `UCL_Logo_Landscape_2C_DarkPurple_RGB.png`, `Leonardo-Logo.png` — small, greyscale, in footer or an "Education & experience" strip |

For any PDF used as a **preview image**, render page 1 to PNG (e.g. `pdftoppm -png -r 150 file.pdf out`) and commit the PNG; link the original PDF as a download. Where no real image exists yet, use a placeholder block (section 6).

---

## 4. Landing page (`index.html`) — section by section

Wrap page content so sections are full-bleed with internal padding `var(--pad-x)`. Every section is separated by a `1px solid var(--line)` top/bottom border.

### 4.1 Nav (sticky)
- `position: sticky; top: 0;` translucent paper background with `backdrop-filter: blur(10px)`, bottom hairline.
- Left: `Amit Chandran` (Archivo 800, 19px). Right: `Work` · `About` · `Skills` · `Contact` links (Archivo 500, 15px) + a pill button `CV ↓` (`border: 1px solid var(--line-strong)`, `border-radius: 100px`, `padding: 9px 18px`) linking to the CV PDF.
- Under ~720px, collapse the links into a hamburger toggle (vanilla JS: toggle a class that shows a stacked menu). Keep it minimal.

### 4.2 Hero
- Mono kicker in accent: `ELECTRONICS · EMBEDDED · MECHANICAL DESIGN`
- H1: **I design and build things that *sense, move and think.*** — set "sense, move and think." in `Newsreader` italic.
- Below, a two-column footer row (wraps on mobile): left = lead paragraph; right = two buttons.
  - Lead: *"Engineering student at UCL working across PCB design, embedded firmware and mechanical product design. Currently seeking summer internships and placements."*
  - Buttons: `View projects` (solid ink, paper text, pill) → `#work`; `Download CV ↓` (outline pill) → CV PDF.

### 4.3 About + photo
Two columns (`grid-template-columns: repeat(auto-fit, minmax(320px, 1fr))`), the text column has a right hairline border.
- Label: `01 — ABOUT`
- Lead: *"A multidisciplinary maker who's happiest at the intersection of hardware and software."*
- Body: *"From routing a multi-layer mainboard to modelling an enclosure in CAD and writing the firmware that ties it together — I like owning a product end to end. My work spans competition design challenges, embedded systems and rapid prototyping."*
- Right column: `Profile Photo.jpeg`, `object-fit: cover`, `min-height: 440px`.

### 4.4 Project index (`id="work"`)
Row header: `02 — SELECTED WORK` (mono, left) and `2023 — 2025` (right).
Then a **list** (not cards) of 3 rows. Each row is an `<a href="projects/…​.html">` laid out as a grid `56px 1fr auto`, `padding: clamp(24px,3.5vw,32px) 0`, with a top hairline (last row also a bottom hairline):
- col 1: number in accent mono (`001`)
- col 2: title (Archivo 700, `clamp(26px,4vw,34px)`, `letter-spacing:-.02em`) + a small `--faint` meta line under it
- col 3: `→`

| # | Title | Meta line | Link |
|---|---|---|---|
| 001 | Automatic Pet Feeder | Embedded C · Product design · Scenario research | `projects/pet-feeder.html` |
| 002 | Custom Mainboard V7 | 6-layer PCB · Schematic capture · Bring-up | `projects/mainboard-v7.html` |
| 003 | IMechE Design Challenge | Mechanical design · CAD · Team competition | `projects/imeche-challenge.html` |

Hover: title → `--accent`. Keep whole row clickable.

### 4.5 Skills + contact (split)
Two columns, top hairline. Left = skills, right = dark contact block.
- Left label `03 — SKILLS & TOOLS`; then pill chips (`border: 1px solid var(--line-strong)`, `border-radius: 100px`, `padding: 10px 18px`, gap `12px`, wrap):
  `KiCad / Altium` · `Embedded C` · `Fusion 360 / SolidWorks` · `Python` · `3D printing` · `Soldering & bring-up` · `STM32 / AVR` · `Oscilloscope debug`
- Right block: `background: var(--ink); color: var(--paper);` label `04 — CONTACT` in accent; heading *"Let's build something."* (Archivo 700, `clamp(30px,4.5vw,38px)`); then stacked links (paper color): email (`mailto:`), LinkedIn, `github.com/amitchandran06`. **Replace with real email + LinkedIn URL.**

### 4.6 Footer
Mono, `--faint`, space-between: `© 2025 AMIT CHANDRAN` · `DESIGNED & BUILT IN LONDON`. Optionally a greyscale UCL / Leonardo logo strip above it.

---

## 5. Case-study layout (all 3 project pages)

Same skeleton for each; fill from the content table in section 5.4.

### 5.1 Header
- `← Back to work` (mono link → `../index.html#work`)
- Kicker in accent mono: e.g. `PROJECT 001 · EMBEDDED SYSTEMS`
- H1: project title (`clamp(40px,7vw,76px)`)
- Summary lead paragraph (max-width ~680px)
- A **meta grid** (`repeat(auto-fit, minmax(150px, 1fr))`, top hairline): `ROLE`, `TIMELINE`, `STACK`, `OUTCOME` — each a mono label + a value line.

### 5.2 Media + body
1. Full-width hero image (`min-height: clamp(280px, 45vw, 520px)`, `object-fit: cover`).
2. `01 — THE BRIEF` row: two-column grid `minmax(auto,200px) 1fr` — mono label left, lead + body right.
3. Two-up detail split (`repeat(auto-fit, minmax(320px,1fr))`, middle hairline): each side has a mono label, an H3, and a paragraph (electronics / mechanical, or schematic / layout, etc.).
4. Image pair (`repeat(auto-fit, minmax(300px,1fr))`, `gap: 1px` over a `--line` background so it reads as hairline-separated tiles).
5. `02 — OUTCOME` row (same 2-col label/text grid) + two buttons: `← All projects` (solid) and `Next: <project> →` (outline) linking to the next case study.

### 5.3 Downloads
Where a project has a PDF artifact, add an outline pill link near the outcome: e.g. pet feeder → `Final Scenarios PPT - pet feeder.pdf`; mainboard → `Electronics Project 2024.pdf`; IMechE → `IMechE design portfolio.pdf`.

### 5.4 Case-study content

**001 — Automatic Pet Feeder** · kicker `PROJECT 001 · EMBEDDED SYSTEMS`
- Meta: Role *End-to-end design* · Timeline *2024 · 10 weeks* · Stack *C · KiCad · Fusion 360* · Outcome *Working prototype*
- Summary: *"A connected feeder that dispenses measured portions on schedule — designed, built and programmed end to end, from user research to a custom PCB and firmware."*
- Brief lead: *"Owners forget feeds, overfeed, or can't be home on time. The goal: a reliable feeder that removes the guesswork."*
- Brief body: *"I started with user-scenario research to map real routines and failure modes, then translated those needs into hardware and firmware requirements — portion accuracy, a jam-proof mechanism, and a schedule that is easy to trust."*
- Detail A `// ELECTRONICS` — **Custom PCB & firmware**: *"A microcontroller drives a stepper for dosing, with a real-time clock for scheduling and a load cell to verify each portion. Firmware written in C with a small state machine for feed cycles and error recovery."*
- Detail B `// MECHANICAL` — **Jam-proof dispenser**: *"An auger-based mechanism modelled in CAD and 3D-printed through several iterations to eliminate clogging and deliver consistent portions across kibble sizes."*
- Images: `images_pet_feeder/` (hero + pair). Outcome: *"A working prototype that feeds on schedule and confirms each portion by weight — proving the full loop from research to firmware."* Next → Mainboard V7.

**002 — Custom Mainboard V7** · kicker `PROJECT 002 · HARDWARE DESIGN`
- Meta: Role *PCB design & bring-up* · Timeline *2025* · Stack *KiCad · Altium · C* · Outcome *Board revision V7*
- Summary: *"A compact controller board that integrates power, a microcontroller and I/O onto a single 6-layer PCB — taken from schematic capture all the way through to bench bring-up."*
- Brief lead: *"The system needed one clean board to replace a nest of breakout modules — smaller, more reliable and easier to reproduce."*
- Brief body: *"I consolidated power regulation, the MCU and connectivity into a single design, iterating across seven revisions to resolve signal-integrity and layout issues found on the bench."*
- Detail A `// SCHEMATIC` — **Capture & power design**: *"Hierarchical schematics with dedicated power rails, decoupling and protection. Careful part selection to balance cost, availability and footprint."*
- Detail B `// LAYOUT` — **6-layer routing & bring-up**: *"A controlled-impedance 6-layer stack-up with a solid ground plane, followed by hands-on bring-up: probing rails, flashing firmware and validating each subsystem."*
- Images: hero = `3D_MainBoardV7_1_2025-03-22.png`; pair = `FinalCircuitSchematic.png` + an assembled-board photo. Outcome: *"Seven revisions delivered a stable, compact board that replaced the prototype wiring — a reusable platform for future projects."* Next → IMechE.

**003 — IMechE Design Challenge** · kicker `PROJECT 003 · MECHANICAL DESIGN`
- Meta: Role *Mechanical design · Team* · Timeline *2024 · 6 weeks* · Stack *SolidWorks · 3D printing* · Outcome *Competition entry*
- Summary: *"A mechanism designed and prototyped for a national IMechE design brief — from concept sketches and CAD through to a competition poster and physical build."*
- Brief lead: *"A timed national brief: design a mechanism that solves the set task within tight constraints, then present it convincingly."*
- Brief body: *"Working in a small team, I owned the mechanical concept — turning requirements into sketches, CAD models and a build we could test and demonstrate under competition conditions."*
- Detail A `// CONCEPT` — **Ideation & CAD**: *"Rapid concept sketching narrowed to a single mechanism, then detailed in CAD with attention to tolerances, assembly and manufacturability for 3D printing."*
- Detail B `// DELIVERY` — **Prototype & poster**: *"A 3D-printed prototype validated the motion, alongside a competition poster communicating the design rationale and engineering decisions to judges."*
- Images: hero + pair from the poster PNG / CAD screenshots. Outcome: *"A complete entry — working prototype plus poster — that translated a tight brief into a demonstrable, well-argued design."* Next → Pet Feeder.

---

## 6. Placeholder pattern (when an image doesn't exist yet)

Use a striped block with a mono caption so gaps are obvious but tidy:
```css
.ph {
  display: grid; place-items: center;
  font-family: var(--font-mono); font-size: 13px; color: #a09c8f;
  background: repeating-linear-gradient(135deg, #e7e3d8 0 11px, #efece3 11px 22px);
}
```
```html
<div class="ph" style="min-height:340px">[ assembled board photo ]</div>
```

---

## 7. Responsive rules
- Fluid type via `clamp()` (values above). No fixed pixel headings.
- Multi-column sections use `grid-template-columns: repeat(auto-fit, minmax(320px, 1fr))` so they collapse to one column on narrow screens automatically.
- Center content at `--maxw` with `margin-inline: auto` if you cap width; otherwise let sections be full-bleed with `--pad-x`.
- Nav: hamburger under ~720px. Tap targets ≥ 44px.
- Test at 390px, 768px, 1440px.

## 8. Do / don't
- **Do:** hairline `1px` dividers, mono labels, one accent, lots of whitespace, `text-wrap: balance` on headings.
- **Don't:** gradients, box-shadows on content cards, rounded "card + left accent border" blocks, emoji, more than the one accent color, stock-photo clutter, invented stats.

## 9. Before shipping — replace these placeholders
- Real email + LinkedIn URL in the contact block and nav.
- Confirm `main.pdf` is the CV (or add the real one) and point every "CV ↓" link at it.
- Drop real photos into `images_pet_feeder/` slots and add an assembled-board photo for Mainboard V7.
- Export IMechE poster page 1 → PNG for its thumbnail.
- Verify all relative paths resolve on GitHub Pages (project pages are one folder deep → `../asset.png`).
