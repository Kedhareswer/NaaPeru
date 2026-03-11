# Design Handoff: NaaPeru Portfolio

**Source:** Live codebase — `src/` + `design_system/`
**Date:** 2026-03-10
**Stack:** React 18 + Vite + TypeScript + Tailwind CSS 3 + Framer Motion

---

## 1. Design Tokens

### 1.1 Colors

All CSS variables defined in `src/index.css :root`. Tailwind wiring in `tailwind.config.ts`.

| Token | HSL | Hex | Usage |
|-------|-----|-----|-------|
| `--background` | `220 26% 7%` | `#0E1017` | Page background |
| `--foreground` | `0 0% 100%` | `#FFFFFF` | Primary text |
| `--surface-subtle` | `220 22% 10%` | `#151922` | Hover areas, subtle panels |
| `--surface-elevated` | `220 20% 14%` | `#1D2230` | Cards, floating panels |
| `--card` | `220 26% 7%` | `#0E1017` | Card base (same as bg) |
| `--primary` | `0 100% 50%` | `#FF0000` | Brand red — CTA, accents, borders |
| `--primary-hover` | `0 100% 45%` | `#E60000` | Hover state on brand red |
| `--primary-glow` | `0 100% 50%` | `#FF0000` | Glow fx source |
| `--secondary` | `0 0% 100%` | `#FFFFFF` | White secondary |
| `--muted` | `0 0% 20%` | `#333333` | Muted surfaces |
| `--muted-foreground` | `0 0% 54%` | `#8A8A8A` | De-emphasized text |
| `--border` | `0 0% 20%` | `#333333` | Dividers, card edges |
| `--ring` | `0 100% 50%` | `#FF0000` | Focus rings |
| `--destructive` | `0 84.2% 60.2%` | `#EF4444` | Error states |

> **Note:** Logo color is `hsl(5, 78%, 42%)` = `#C0261A` — a deeper crimson. The CSS `--primary` is intentionally vivid/display-weight. See `design_system/brand-tokens.css` for the logo-extracted full palette.

**Common opacity modifiers used in components:**
```
text-foreground/70   → rgba(255,255,255, 0.70)
text-foreground/60   → rgba(255,255,255, 0.60)
text-foreground/50   → rgba(255,255,255, 0.50)
text-foreground/40   → rgba(255,255,255, 0.40)
border-border/25     → rgba(51,51,51, 0.25)
border-primary/40    → rgba(255,0,0, 0.40)
bg-primary/5         → rgba(255,0,0, 0.05)
bg-card/40           → rgba(14,16,23, 0.40)
```

---

### 1.2 Typography

Fonts loaded from Google Fonts in `index.html`. Custom font `DhurjatiItalic` served from `/public/fonts/`.

| Role | Font | Tailwind class | Usage |
|------|------|---------------|-------|
| Heading | Space Grotesk | `font-heading` | All headings, labels, hero copy |
| Body | Inter | `font-body` | Paragraphs, meta, UI labels |
| Mark | DhurjatiItalic → Space Grotesk fallback | `font-sanchari` | `సంచారి?` brand word only |

**Type scale utilities** (`src/index.css @layer utilities`):

| Class | Tailwind | Pixel equivalent | Usage |
|-------|---------|-----------------|-------|
| `.text-hero` | `text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight` | 60→72→96px | Largest hero lines |
| `.text-section` | `text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight` | 48→60→72px | Page section titles |
| `.text-project` | `text-3xl md:text-4xl lg:text-5xl font-bold` | 30→36→48px | Major project titles |
| `.text-body-lg` | `text-xl md:text-2xl font-medium` | 20→24px | Important supporting paragraphs |

**Micro-label pattern** (used for section labels throughout):
```css
font-family: Inter;
font-size: 10–11px;
text-transform: uppercase;
letter-spacing: 0.35em;
color: hsl(0 100% 50% / 0.7);   /* text-primary/70 */
```

**Body copy pattern:**
```css
font-family: Inter;
font-size: 14–16px;
color: rgba(255,255,255,0.70);   /* text-foreground/70 */
line-height: 1.6;
```

---

### 1.3 Spacing

8px base grid. Semantic tokens in `src/index.css :root`, Tailwind extensions in `tailwind.config.ts`.

| Token | Value | Tailwind key |
|-------|-------|-------------|
| `--spacing-xs` | 8px | `spacing-xs` |
| `--spacing-sm` | 16px | `spacing-sm` |
| `--spacing-md` | 24px | `spacing-md` |
| `--spacing-lg` | 32px | `spacing-lg` |
| `--spacing-xl` | 48px | `spacing-xl` |
| `--spacing-2xl` | 64px | `spacing-2xl` |
| `--spacing-3xl` | 96px | `spacing-3xl` |
| `--spacing-4xl` | 128px | `spacing-4xl` |

**Section vertical rhythm:**
- Default sections: `py-20` (80px)
- Heavy/hero sections: `py-32` (128px)
- Gaps between stacked sections: `mb-16` or `mb-20`

---

### 1.4 Border Radius

Design rule: **no rounded corners on cards or panels** (`rounded-none`).

| Variable | Value | Usage |
|----------|-------|-------|
| `--radius` | `0.25rem` (4px) | shadcn components only |
| `--radius-md` | `0.125rem` (2px) | Rarely used |
| Cards / panels | `0` | Enforced by design rule |
| Nav dropdown | `rounded-lg` (8px) | Exception — floating overlay |
| Social icon buttons | `rounded-full` | Circle icon wrappers |
| Chatbot send button | `rounded-full` | Circle button |

---

### 1.5 Shadows

```css
--shadow-sm:   0 2px  8px rgba(0,0,0,0.40)
--shadow-md:   0 8px  32px rgba(0,0,0,0.60)   /* default shadow */
--shadow-lg:   0 16px 48px rgba(0,0,0,0.80)
--shadow-glow: 0 0   40px rgba(255,0,0,0.30)
```

---

### 1.6 Motion Tokens

```css
--transition-fast:   150ms   ease-smooth    (cubic-bezier 0.4 0.0 0.2 1)
--transition-normal: 300ms   ease-smooth
--transition-slow:   500ms   ease-confident (cubic-bezier 0.25 0.46 0.45 0.94)
--transition-slower: 800ms   ease-confident
--ease-bounce:       400ms   cubic-bezier(0.68,-0.55,0.265,1.55)
```

Tailwind duration keys: `duration-fast` / `duration-normal` / `duration-slow` / `duration-slower`

---

## 2. Layout System

### 2.1 Container

```css
.container-portfolio {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 24px;          /* px-6  — mobile */
  padding: 0 32px;          /* px-8  — sm  */
  padding: 0 48px;          /* px-12 — md  */
  padding: 0 64px;          /* px-16 — lg  */
  padding: 0 80px;          /* px-20 — xl  */
}
```

**Rule:** every major page section must be inside `.container-portfolio`.

### 2.2 Grid

```css
.grid-12 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);     /* mobile */
  grid-template-columns: repeat(8, 1fr);     /* md     */
  grid-template-columns: repeat(12, 1fr);    /* lg     */
  gap: 16px;   /* mobile */
  gap: 24px;   /* md     */
  gap: 32px;   /* lg     */
}
```

### 2.3 Breakpoints (Tailwind defaults)

| Name | Min-width | Primary use |
|------|-----------|------------|
| `sm` | 640px | Typography step-up, ticker font |
| `md` | 768px | 2-col layouts, nav collapse threshold |
| `lg` | 1024px | 3-col grid, full hero layout |
| `xl` | 1280px | Max container padding |
| `2xl` | 1400px | shadcn container max |

---

## 3. Components

### 3.1 Navigation (`src/components/Navigation.tsx`)

**Variants:** Expanded (default) · Compact (scrolled, `window.scrollY > 100`) · Mobile (< 768px)

| Property | Expanded | Compact / Mobile |
|----------|----------|-----------------|
| Height | `h-24` (96px) | `h-20` (80px) |
| Position | `fixed top-0` | same |
| Background | transparent | transparent |
| Brand | left — "KEDHAR" red + subtitle | hidden |
| Nav items | center (hidden on mobile) | hidden |
| Chat trigger | right — `సంచారి?` | right |
| Menu button | hidden | `MoreHorizontal` icon, `rounded-full`, `border-border/30 bg-background/60` |

**Nav item states:**
```
Default: text-foreground/70  + w-0 bottom border
Hover:   text-primary        + w-full bottom border (300ms)
Active:  text-primary        + w-full bottom border
```

**Dropdown (mobile/scrolled):**
- Width: `w-56` (224px)
- Padding: `py-3`
- Background: `bg-background/95 backdrop-blur-md`
- Border: `border-border/20`
- Shadow: `shadow-xl`
- Items: `px-4 py-3`, font-body, `text-sm font-semibold uppercase tracking-wider`
- Active indicator: `h-1 w-6 rounded-full bg-primary`

---

### 3.2 Hero (`src/components/Hero.tsx`)

**Layout:** `min-h-screen`, flex column on mobile → `lg:flex-row lg:items-center`

**Left column** (`lg:col-span-7`):
- Headline: `font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-primary` (the "I" initial) + `text-lg md:text-2xl font-normal` body of sentence
- Sub-copy: `font-normal italic text-sm sm:text-base` Inter, color `#8A8A8A`
- Social icons: `rounded-full border border-foreground/20 p-2`, hover `border-primary/60`, icon 20×20px
- Animation delays: headline 200ms, sub 600ms, socials 800ms (all `animate-slide-up`)

**Right column** (`lg:col-span-5`):
- Portrait: `aspect-[3/4]` mobile/desktop, `aspect-[4/3]` sm only, `overflow-hidden rounded`
- Image treatment: `grayscale(100%) contrast(1.2)`, `radial-gradient` mask, `opacity: 0.9`
- Overlay: `bg-gradient-to-br from-primary/40 via-transparent` `mix-blend-multiply`
- Stats overlay: `HEIGHT 175 CM` top-right, `AGE 21 YRS` bottom-left — `font-heading text-xs uppercase tracking-widest text-primary/70`
- Circular badge: `h-20 w-20 sm:h-24` → `md:h-28`, `rotate-[-8deg]`, `border-primary/60 bg-background/60`, `shadow-[0_18px_40px_rgba(255,0,0,0.25)] backdrop-blur`
- Floating glow blob: `h-24 w-24 sm:h-32 sm:w-32 animate-float rounded-full bg-primary/20 blur-3xl`

**Ticker Strip:**
- Position: `absolute inset-x-0 top-[32%]` (adjusts per breakpoint)
- Rotation: `sm:-rotate-1 lg:-rotate-3`
- Background: `ticker-content` class — dark red `hsl(1 90% 24%)` with crosshatch overlays
- Text: `text-[0.6rem] sm:text-xs md:text-sm font-semibold uppercase tracking-[0.25em] sm:tracking-[0.35em] text-black`
- Animation: `animate-ticker` → `55s linear infinite` translate-X loop

**Scroll indicator:** `absolute bottom-12 sm:bottom-14 md:bottom-16 left-1/2`, `ChevronDown animate-bounce h-4→h-5`

---

### 3.3 Work Projects (`src/components/WorkProjects.tsx`)

**Layout:** `space-y-16 md:space-y-24` vertical stack inside `container-portfolio`

**Each project card (`<article>`):**

| Element | Spec |
|---------|------|
| Media container | `w-full aspect-[16/9] overflow-hidden`, gradient bg `from-primary/10` |
| Image | `w-full h-full object-cover`, hover `scale-105` over `700ms` |
| Hover overlay | `bg-gradient-to-t from-background/60`, opacity 0→1 over `500ms` |
| Title | `font-heading text-2xl md:text-3xl lg:text-4xl font-normal text-foreground` |
| Subtitle | `font-body text-sm md:text-base text-foreground/60` |
| Metadata | `font-body text-xs md:text-sm uppercase tracking-[0.15em] text-foreground/50` |
| Title/meta layout | `flex flex-col md:flex-row md:items-end md:justify-between gap-3 md:gap-6` |

---

### 3.4 Standard Card Pattern

Used across case studies, about, etc.

```tsx
<div className="border border-border/25 bg-card/40 p-6
  transition-colors hover:border-primary/40 hover:bg-card/60">
```

| Property | Value |
|----------|-------|
| Background | `hsl(220 26% 7% / 0.4)` |
| Border | `hsl(0 0% 20% / 0.25)` |
| Hover border | `hsl(0 100% 50% / 0.4)` |
| Hover background | `hsl(220 26% 7% / 0.6)` |
| Padding | `p-6` (24px) |
| Border radius | `0` (no rounding) |
| Transition | `border-color 300ms ease-smooth`, `background 300ms ease-smooth` |

**Card label:**
```css
font-family: Inter;
font-size: 10–11px;
text-transform: uppercase;
letter-spacing: 0.35em;
color: rgba(255,255,255,0.35–0.40);
margin-bottom: 8px;
```

**Card title:**
```css
font-family: Space Grotesk;
font-size: 18–24px;
font-weight: 600–700;
color: #ffffff;
margin-bottom: 8px;
```

---

### 3.5 Footer (`src/components/Footer.tsx`)

| Property | Value |
|----------|-------|
| Border top | `border-t border-border/10` |
| Background | `bg-background` |
| Padding | `py-8` (32px) |
| Layout | flex col → `md:flex-row md:items-center`, `gap-6` |
| Quote text | `font-body text-sm italic text-foreground/60 md:text-base`, `max-w-3xl` |
| Brand mark | `font-sanchari text-2xl font-bold text-primary hover:animate-glow-pulse` |
| Background overlay | `gradient-to-t from-primary/5 to-transparent` absolute behind content |

---

### 3.6 ChatBot (`src/components/ChatBot.tsx`)

Fixed right-side slide-in panel.

| Property | Value |
|----------|-------|
| Trigger | `సంచారి?` button in Nav + Footer |
| Animation | `AnimatePresence` from `motion/react`, slide in from right |
| Panel width | ~384px (`w-96`) on desktop, full-width on mobile |
| Z-index | above nav (z > 40) |
| Header | `సంచారి?` in `font-sanchari`, close `X` button |
| Message area | Scrollable, `ReactMarkdown` with GFM + sanitize |
| Input row | `textarea` + send button |
| Messages | User right-aligned, assistant left-aligned |
| Max input | 500 characters |

Initial greeting: *"Hey, I am Kedhar. Ask me anything about my work, projects, skills, or career journey."*

---

### 3.7 Section Skeleton

Use as the starting point for any new section:

```tsx
<section className="relative bg-background py-20">
  <div className="container-portfolio">
    <div className="mb-8 space-y-3">
      {/* Section label */}
      <p className="font-body text-xs uppercase tracking-[0.35em] text-primary/70">
        Section Label
      </p>
      {/* Section heading */}
      <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-foreground">
        Section Title
      </h2>
      {/* Supporting copy */}
      <p className="max-w-2xl font-body text-sm sm:text-base text-foreground/70">
        Short explanation of what lives here.
      </p>
    </div>
    {/* Content grid */}
    <div className="grid gap-8 md:grid-cols-2">
      {/* Cards or content */}
    </div>
  </div>
</section>
```

---

## 4. Interactive States

| Element | Default | Hover | Active / Focus |
|---------|---------|-------|---------------|
| Nav link | `text-foreground/70`, border `w-0` | `text-primary`, border `w-full` | `text-primary`, border `w-full` (persistent) |
| Nav menu button | `border-border/30 bg-background/60` | `border-primary text-primary` | — |
| `సంచారి?` button | `text-primary` | `animate-glow-pulse` | — |
| Card | `border-border/25 bg-card/40` | `border-primary/40 bg-card/60` | — |
| Social icon | `border-foreground/20`, icon `text-foreground/60 fill-transparent` | `border-primary/60`, icon `text-primary fill-primary` | — |
| Project image | `scale-100` | `scale-105` (700ms) | — |
| Primary button | `bg-primary text-background` | `bg-primary/90` | `bg-primary/80` |
| Ghost button | `transparent border-border` | `border-primary text-primary` | — |
| Input | `border-input` | — | `border-ring` (red) |
| Footer brand mark | `text-primary` | `animate-glow-pulse` (text-shadow oscillation 2s) | — |

---

## 5. Pages & Screens

### 5.1 Route Map

| URL | Component | Description |
|-----|-----------|-------------|
| `/` | `Work.tsx` | Hero + WorkProjects (3 featured) |
| `/fun` | `Fun.tsx` | Experimentos — ShiftCard grid |
| `/about` | `About.tsx` | Timeline, skills, bio |
| `/resume` | `Resume.tsx` | Resume viewer / download |
| `/case-study/thesisflow` | `CaseStudyThesisFlow.tsx` | Sticky sidebar + sections |
| `/case-study/quantumpdf` | `CaseStudyQuantumPDF.tsx` | Same structure |
| `/case-study/data-notebook` | `CaseStudyDataNotebook.tsx` | Same structure |
| `*` | `NotFound.tsx` | 404 with space game |

### 5.2 Case Study Layout

Structure used across all three case study pages:

```
Sticky sidebar (lg: fixed left, ~280px)
  └── Section nav links (overview, story, problem, solution,
                         technical, features, challenges, results, learnings)
Main content (max-w-5xl)
  └── Sections in order:
      ├── [Hero / Overview]
      ├── Story
      ├── Problem
      ├── Solution
      ├── Technical Architecture
      ├── Features
      ├── Challenges
      ├── Results
      └── Learnings
```

Each section follows the skeleton from §3.7 with a label + heading + body.

### 5.3 Fun / Experimentos Page

Uses `ShiftCard` from `src/components/ui/shift-card.tsx` (cult-ui).

**Desktop layout:**
- Left: fixed `280px` index panel (section label + vertical project list)
- Right: 4-column `ShiftCard` grid

**Card slots:**
| Slot | Content |
|------|---------|
| `topContent` | Category chip (always visible) |
| `topAnimateContent` | Small thumbnail — appears top-right on hover |
| `middleContent` | Large thumbnail — visible at rest, morphs to corner on hover |
| `bottomContent` | Title + description + tags + "View" link — slides up on hover |

**Touch:** `onTap` toggles hover for mobile.

---

## 6. Responsive Breakpoints

| Breakpoint | Width | Key changes |
|------------|-------|-------------|
| Default (mobile) | < 640px | Single column, nav collapses, ticker small text |
| `sm` | 640px | Typography step-up, portrait aspect changes |
| `md` | 768px | 2-col grids, nav mobile threshold (< 768px = mobile) |
| `lg` | 1024px | Hero becomes horizontal, full 12-col grid, sidebar shows |
| `xl` | 1280px | Container reaches max horizontal padding |

---

## 7. Assets

| Asset | Path | Format | Notes |
|-------|------|--------|-------|
| Logo mark | `/public/logo.png` | PNG 500×500 | Telugu-inspired glyph, crimson on white |
| Portrait | `/src/assets/me.webp` | WebP | Grayscale + mask applied in CSS |
| Portrait fallback | `/src/assets/me.png` | PNG | Same image, PNG format |
| Projects | `/public/projects/*.png` | PNG | ThesisFlow, QuantumPDF, DataNotebook screenshots |
| Custom font | `/public/fonts/dhurjati-italic.otf` | OTF | Used for `font-sanchari` class only |
| Brand kit | `/design_system/brand-kit.html` | HTML | Visual reference page |
| Design tokens | `/design_system/brand-tokens.css` | CSS | Full 3-tier token system |

---

## 8. Background Treatment

The page background is complex by design — **do not reproduce per-section**.

```css
body {
  background-color: hsl(220 26% 7%);
  background-image:
    radial-gradient(circle at 20% 20%, hsla(0 0% 100% / 0.04), transparent 45%),
    radial-gradient(circle at 80% 0%,  hsla(0 0% 100% / 0.03), transparent 40%),
    linear-gradient(135deg, hsl(220 28% 10%), hsl(215 32% 6%), hsl(210 40% 2%));
  background-attachment: fixed;
}

body::before {
  /* SVG noise overlay — fractalNoise baseFrequency=0.9 */
  opacity: 0.03;
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
}
```

Cards and content panels sit on top of this base. Use semi-transparent backgrounds (`bg-card/40`) to let the texture breathe through.

---

## 9. Animation Reference

| Name | Keyframes | Default duration | Tailwind class | Usage |
|------|-----------|-----------------|---------------|-------|
| `fade-in` | opacity 0→1, translateY 10→0 | 300ms | `animate-fade-in` | Nav items, chatbot |
| `slide-up` | opacity 0→1, translateY 40→0 | 800ms confident | `animate-slide-up` | Hero headline/copy |
| `scale-in` | scale 0.95→1, opacity 0→1 | 500ms confident | `animate-scale-in` | Badges, overlays |
| `glow-pulse` | text-shadow oscillation | 2s infinite | `animate-glow-pulse` | `సంచారి?` |
| `float` | translateY 0→-20→0 | 3s infinite | `animate-float` | Hero glow blob |
| `ticker` | translateX 0→-50% | 55s linear infinite | `animate-ticker` | Hero strip |
| `progress` | width 0→100% | 2.5s confident | `animate-progress` | Loading bar |

---

## 10. Key Constraints (Design Rules)

1. **No rounded corners on cards/panels** — `rounded-none`. Exceptions: nav dropdown `rounded-lg`, circular elements `rounded-full`.
2. **One red, one dark** — Don't introduce new brand colors. The only accent is `--primary` red.
3. **container-portfolio always** — Never build a section without wrapping in `.container-portfolio`.
4. **Font imports** — Use `font-heading` (Space Grotesk) for all headings. Use `font-body` (Inter) for all body/meta text. `font-sanchari` only for the `సంచారి?` mark.
5. **Background is global** — Don't re-implement the noisy background per section.
6. **Motion intent** — Animations signal importance. Don't stack too many on one element.
7. **Data source** — `public/projects.json` is the single source of truth for project cards.

---

## 11. Implementation Quickstart

### New page
```tsx
// src/pages/NewPage.tsx
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export default function NewPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <section className="relative bg-background py-20">
          <div className="container-portfolio">
            <p className="font-body text-xs uppercase tracking-[0.35em] text-primary/70">
              Label
            </p>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-foreground mt-2">
              Page Title
            </h1>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
```

### New card
```tsx
<div className="border border-border/25 bg-card/40 p-6
  transition-colors hover:border-primary/40 hover:bg-card/60">
  <p className="font-body text-[11px] uppercase tracking-[0.35em] text-foreground/40 mb-2">
    Meta Label
  </p>
  <h3 className="font-heading text-xl sm:text-2xl text-foreground mb-2">
    Card Title
  </h3>
  <p className="font-body text-sm text-foreground/70">
    Supporting copy.
  </p>
</div>
```

### Primary CTA button
```tsx
<button className="inline-flex items-center gap-2 px-6 py-3
  bg-primary text-background font-body text-sm font-bold
  uppercase tracking-[0.3em] hover:bg-primary/90 transition-colors">
  Label
</button>
```

### Ghost button
```tsx
<button className="inline-flex items-center gap-2 px-6 py-3
  border border-border/25 text-foreground font-body text-sm
  uppercase tracking-[0.2em] hover:border-primary hover:text-primary
  transition-colors">
  Label
</button>
```
