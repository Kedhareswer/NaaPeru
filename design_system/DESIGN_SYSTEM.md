# NaaPeru Design System

This document describes how this portfolio is actually designed and built. It’s not a moodboard. It’s the rules the code already follows.

Use this as the single source of truth when you:
- Add new sections/pages
- Refactor components
- Hand this to another dev/designer

Everything here is grounded in `tailwind.config.ts`, `src/index.css`, and existing components.

---

## 1. Color System

### 1.1 Core Tokens (CSS Variables)
Defined in `src/index.css` under `:root`.

All colors are HSL, then wired into Tailwind via `tailwind.config.ts`.

**Core surfaces**
- `--background: 220 26% 7%`
  - Very dark blue-gray. Used for page background.
- `--foreground: 0 0% 100%`
  - Pure white. Primary text color.
- `--surface-subtle: 220 22% 10%`
- `--surface-elevated: 220 20% 14%`
  - Use for cards/panels when you need separation from the main background.
- `--card` / `--card-foreground`
  - Mirrors background/foreground but via the `card` Tailwind color.
- `--popover`, `--popover-foreground`
  - Overlays and popovers.

**Primary (brand red)**
- `--primary: 0 100% 50%`
- `--primary-hover: 0 100% 45%`
- `--primary-glow: 0 100% 50%`

Usage:
- Call-to-action text, highlights, hero accents.
- Borders for active states and key UI chrome.

When in doubt:
- **Text emphasis**: `text-primary`
- **CTA button**: `bg-primary text-background` (or via shadcn button variants).

**Secondary and neutrals**
- `--secondary: 0 0% 100%` (white)
- `--secondary-foreground: 0 0% 0%`
- `--muted: 0 0% 20%`
- `--muted-foreground: 0 0% 54%`
- `--gray-light: 0 0% 54%`
- `--gray-dark: 0 0% 20%`

Practical rule:
- Body text: `text-foreground`.
- De-emphasized text: `text-foreground/60` or `text-gray-light`.
- Thin dividers: `border-border`.

**Feedback / functional**
- `--accent`: mirrors primary red (used rarely).
- `--destructive`: defined but not heavily used in current UI.
- `--border`: `0 0% 20%` → subtle lines.
- `--input`: same as border.
- `--ring`: red; for focus states.

### 1.2 Tailwind Color Mapping
In `tailwind.config.ts` under `theme.extend.colors`:

- `background: hsl(var(--background))`
- `foreground: hsl(var(--foreground))`
- `primary.DEFAULT`: `hsl(var(--primary))`
- `primary.foreground`: `hsl(var(--primary-foreground))`
- `primary.hover`: `hsl(var(--primary-hover))`
- `primary.glow`: `hsl(var(--primary-glow))`
- Same pattern for `secondary`, `muted`, `accent`, `popover`, `card`.

**How to use in components**
- Panels: `bg-card/40 border border-border/25`.
- Hero strips: `bg-primary/5 border-y border-primary/30`.
- Overlays: `from-background/80 via-background/30 to-transparent` gradients.

### 1.3 Background Texture
In `index.css`:

- `body` background:
  - Multiple radial gradients + diagonal linear gradient.
  - `background-attachment: fixed` → subtle parallax feel.
- `body::before` adds SVG noise overlay at very low opacity.

**Rule**: don’t re-implement random noisy backgrounds per-section. Use the global background and design cards/strips on top.

---

## 2. Typography

### 2.1 Fonts
Configured in `tailwind.config.ts` and loaded in `index.html`.

- **Heading font**: `Space Grotesk`
  - Tailwind: `font-heading`.
  - Usage: all headings, large labels, hero copy.
- **Body font**: `Inter`
  - Tailwind: `font-body`.
  - Usage: paragraphs, meta text, labels.

### 2.2 Type Scales (Utilities)
From `index.css` `@layer utilities`:

- `.text-hero`
  - `text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight`
  - Use for the absolute largest hero lines when needed.
- `.text-section`
  - `text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight`
  - Section headings like "WORK", "ABOUT" when used as main page titles.
- `.text-project`
  - `text-3xl md:text-4xl lg:text-5xl font-bold`
  - Major project titles.
- `.text-body-lg`
  - `text-xl md:text-2xl font-medium`
  - For important supporting paragraphs.

### 2.3 Practical Rules

- **Page hero**
  - Headline: `font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl`
  - Supporting line: `font-body text-base sm:text-lg md:text-xl text-foreground/70`.

- **Section titles (e.g. Education, Key Features)**
  - Label: `font-body text-xs uppercase tracking-[0.3–0.4em] text-primary/70`.
  - Title: `font-heading text-3xl md:text-4xl`.

- **Metadata / labels**
  - Use tiny uppercase with heavy letter-spacing:
    - Example: `font-body text-[10px] uppercase tracking-[0.35em] text-foreground/50`.

- **Body copy**
  - `font-body text-sm md:text-base text-foreground/70`.

### 2.4 Ghost Typography Pattern
Used in `Hero`, `About`, `ErrorTemplate`, etc.

Pattern:
- Large background word:
  - `font-heading text-[5–14rem] leading-none tracking-tighter text-foreground/5 select-none`.
- Foreground content layered on top using `absolute inset-0 flex items-center`.

Use this when you want a strong but subtle background word (e.g. `FUN`, `ABOUT`, status codes).

---

## 3. Layout & Spacing

### 3.1 Container

Utility: `.container-portfolio` in `index.css`:
- `max-w-[1440px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20`.

Rule: **Every major page section should be inside `container-portfolio`** so the horizontal rhythm stays consistent.

### 3.2 Grid System

Utility: `.grid-12`:
- `grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4 md:gap-6 lg:gap-8`.

Used for:
- Hero layout (text vs portrait).
- Complex sections where you need finer control.

For simpler layouts:
- Use straightforward Tailwind grids: `grid grid-cols-1 lg:grid-cols-2 gap-12`.

### 3.3 Vertical Rhythm

Rough conventions:
- Section top/bottom padding: `py-16`, `py-20`, or `py-32` for hero-weight.
- Spacing between blocks inside sections: `space-y-6`, `space-y-8`, `space-y-10`.

Use:
- `mb-16` or `mb-20` between major stacked sections.

### 3.4 Navigation & Footer

- `Navigation`:
  - Fixed top, uses `container-portfolio` inside.
  - Height changes on scroll (`h-24` → `h-20`).
  - Desktop: brand left, nav items center, chat trigger right.
  - Mobile / scrolled: compact menu button + chat trigger.

- `Footer`:
  - Always uses `container-portfolio` and a single-line layout: quote left, `సంచారి?` wordmark right.

Rule: **don’t introduce new standalone nav/footer variants** unless you have a good reason; reuse these.

---

## 4. Motion & Interaction

### 4.1 Global Motion Tokens
From `tailwind.config.ts`:

- Durations
  - `fast`: 150ms
  - `normal`: 300ms
  - `slow`: 500ms
  - `slower`: 800ms

- Easing
  - `smooth`: `cubic-bezier(0.4, 0.0, 0.2, 1)`
  - `bounce`: `cubic-bezier(0.68, -0.55, 0.265, 1.55)`
  - `confident`: `cubic-bezier(0.25, 0.46, 0.45, 0.94)`

### 4.2 Key Animations

From `tailwind.config.ts` keyframes/animation:

- `slide-up`
  - Used on hero text to enter from below.
- `fade-in` / `fade-out`
  - For subtle appearance/disappearance.
- `scale-in`
  - For badges/overlays.
- `glow-pulse`
  - For attention on interactive text like `సంచారి?`.
- `float`
  - For background blobs or accent shapes.
- `ticker`
  - For continuous horizontal movement (ticker strips).

From inline CSS in some components:
- `marquee-infinite` for infinite text scrolling in `InfiniteMarquee`.

### 4.3 Hover & Focus

Common patterns:

- Cards
  - Slight scale and/or translate on hover: `hover:-translate-y-1` or `hover:-translate-y-2`.
  - Border shift from `border-border/25` to `border-primary/40`.

- Links / CTAs
  - Underline or border expansion on hover.
  - For navigation items: bottom border animates from `w-0` to `w-full`.

- Buttons
  - Use shadcn button or custom classes:
    - `bg-primary text-background hover:bg-primary/90`.

Rule: **avoid stacking too many simultaneous animations** on the same element. The “medium” energy you want should feel confident, not chaotic.

---

## 5. Components & Patterns

This section focuses on patterns you actually reuse (not every shadcn primitive).

### 5.1 Navigation

File: `src/components/Navigation.tsx`

Key behaviors:
- Detects scroll to toggle `isScrolled`.
- Detects viewport width to handle `isMobile`.
- Uses `react-router-dom` `Link` for SPA navigation.

Visual rules:
- Brand:
  - `KEDHAR` in red, `AI Engineer + Developer` in tiny uppercase.
- Nav items:
  - Uppercase, medium weight, small tracking.
  - Active item: red text + full-width bottom border.
  - Hover: border grows from 0 → full.

When adding routes:
- Update `menuItems` array.
- Keep labels uppercase short words (WORK / FUN / ABOUT / RESUME).

### 5.2 Hero Pattern (Home/About)

Files:
- `src/components/Hero.tsx`
- `src/components/WorkHero.tsx`

Common traits:
- Left: strong, sentence-based hero line in Space Grotesk.
- Right: visual or timeline.
- Background ghost word or radial gradient.

Use this pattern when you introduce a new top-level section (e.g. a future “Writing” or “Notes” page):
- One sentence that clearly states what the section is.
- One supporting sentence that explains what kind of work lives there.

### 5.3 Project Showcase Patterns

**Work page** – `src/components/WorkProjects.tsx`
- Hero projects, visually heavy.
- Large image, custom cursor, overlay CTA.
- Title/subtitle below, metadata to the right.

**Fun page** – `src/pages/Fun.tsx` (new version)
- Medium-energy, editorial style.
- Grouped by `category`.
- Each experiment:
  - Text card (left/right) with title, year, description, tags, “View project” CTA.
  - Media card on opposite side with zoom-on-hover.
- No random rotation; only staggered order per row.

**Experimentos index** – `src/pages/Experimentos.tsx` (index-style grid)
- Overall feel: calm, library/index view. Low motion, lots of negative space.
- Layout (desktop):
  - Left column: narrow, fixed-width index.
    - Section label on top: `Index` in tiny uppercase meta style.
    - Title below: `Projects` (or "Experimentos") in heading style.
    - Vertical list of experiment names with line numbers on the left.
      - Numbers: tiny, low-contrast (`text-foreground/40`).
      - Project labels: body size, aligned in a single column.
  - Right area: 4x3 grid of experiment tiles.
    - Equal-size cards with a neutral placeholder thumbnail (no busy UI inside).
    - Caption under each tile: experiment name in small text, center-aligned.
- Layout (mobile/tablet):
  - Index stacks on top of the grid.
  - Keep list and tile order the same; reduce columns to 2 or 3 depending on width.
- Spacing:
  - Large padding around the whole canvas to keep the white panel floating inside the dark background.
  - Comfortable gaps between tiles so the grid never feels cramped.
- Behavior:
  - Hover state: subtle border + elevation change only (no scale explosions).
  - Click opens the detailed experiment view (case study or Fun-style layout).

Rule: 
- Use **Work pattern** for flagship / case-study projects.
- Use **Fun pattern** for smaller, fast experiments and side projects.
- Use **Experimentos index** when you need a calm overview of many experiments at once.

### 5.4 Case Study Layout

Files:
- `CaseStudyQuantumPDF.tsx`
- `CaseStudyThesisFlow.tsx`
- `CaseStudyDataNotebook.tsx`

Traits:
- Sticky sidebar navigation on large screens.
- Main content split into sections: overview, story, problem, solution, technical, features, challenges, results, learnings.
- Each section has:
  - Label (uppercase microcopy).
  - Heading.
  - Body in paragraphs, grids, or lists.
- Uses the same `container-portfolio` and a maximum width of ~5xl.

When adding a new case study:
- Reuse this structure.
- Stick to the same section ordering or a subset, for consistency.

### 5.5 ChatBot

Files:
- `src/components/ChatBot.tsx`
- `src/contexts/ChatContext.tsx`
- `src/lib/chatbot*`

Pattern:
- Fixed right-side panel.
- Header with `సంచారి?`, close button.
- Scrollable message area, speaking as “Kedhar” in first person.
- Input row at bottom.

Tone:
- Sarcastic, friendly, self-aware.
- Uses emoji and Markdown-like bolding.

If you change the brand voice, **this is where it will be most visible**. Update `chatbotResponses.ts` and `chatbotKnowledge.ts` accordingly.

### 5.6 Error Template

Files:
- `src/pages/errors/ErrorTemplate.tsx`
- `ErrorTemplate.module.css`

Pattern:
- Uses Navigation and background gradients.
- Huge ghost status code in background.
- Foreground error title and description.
- Sliding marquee of status words at the bottom of the block.

Use `ErrorTemplate` for any future non-200 views (maintenance, custom error states), passing:
- `statusCode`, `statusLabel`, `title`.
- Optional `description` or `renderDescription`.

---

## 6. Practical Examples

### 6.1 New Section Skeleton

Use this as a starting point for any new page-level section:

```tsx
<section className="relative bg-background py-20">
  <div className="container-portfolio">
    <div className="mb-8 space-y-3">
      <p className="font-body text-xs uppercase tracking-[0.35em] text-primary/70">
        Section Label
      </p>
      <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-foreground">
        Section Title
      </h2>
      <p className="max-w-2xl font-body text-sm sm:text-base text-foreground/70">
        Short explanation of what lives here.
      </p>
    </div>

    {/* Content grid */}
    <div className="grid gap-8 md:grid-cols-2">
      {/* Cards or content here */}
    </div>
  </div>
</section>
```

### 6.2 On-Brand Card

```tsx
<div className="border border-border/25 bg-card/40 p-6 transition-colors hover:border-primary/40 hover:bg-card/60">
  <p className="font-body text-[11px] uppercase tracking-[0.35em] text-foreground/40 mb-2">
    Meta Label
  </p>
  <h3 className="font-heading text-xl sm:text-2xl text-foreground mb-2">
    Card Title
  </h3>
  <p className="font-body text-sm text-foreground/70">
    Supporting copy goes here. Keep it short and clear.
  </p>
</div>
```

### 6.3 CTA Button

Use shadcn’s `Button` or a simple custom pattern:

```tsx
<button className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-background font-body text-sm font-bold uppercase tracking-[0.3em] rounded-lg hover:bg-primary/90 transition-colors">
  Label
</button>
```

---

## 7. Design Principles (Short, Honest)

1. **One red, one dark, everything else supports**  
   Don’t introduce arbitrary new brand colors.

2. **Big type, tiny labels**  
   Headlines are bold and large; metadata is very small, uppercase, and widely tracked.

3. **Gradient + noise = base, not decoration**  
   The background is already complex. Keep foreground shapes clean.

4. **Motion with intent**  
   Animations should signal importance (hero, stripe, key interactions), not be everywhere.

5. **Consistency over cleverness**  
   New layouts should reuse existing patterns (hero, card, case-study layout) instead of inventing one-offs.

6. **Experiments first as an index, then as stories**  
   The Experimentos page is a calm index: left-side list, right-side grid of tiles. Use it to browse; use Fun or case-study layouts to go deep.

If you stick to these constraints, anything you add will feel like it’s from the same universe as the current site.
