# NaaPeru — Portfolio Site

Personal portfolio for Kedhar, AI Engineer + Developer. Built with React + Vite + TypeScript + Tailwind CSS.

---

## Dev Commands

```bash
npm run dev      # Start dev server at http://localhost:8080
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # ESLint
```

---

## Stack

| Layer | Tool |
|-------|------|
| Framework | React 18 + Vite 5 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 + shadcn/ui |
| Animation | Framer Motion / `motion/react` |
| Routing | React Router DOM 6 |
| Icons | Lucide React |
| Scroll | Lenis |

---

## Project Structure

```
src/
├── App.tsx                        # Router — all routes defined here
├── index.css                      # CSS variables (HSL tokens), global utilities
├── components/
│   ├── Navigation.tsx             # Fixed top nav, scroll-aware, mobile-responsive
│   ├── Hero.tsx                   # Home hero section
│   ├── WorkHero.tsx               # Work page hero
│   ├── WorkProjects.tsx           # Featured work cards (ThesisFlow, QuantumPDF, DataNotebook)
│   ├── About.tsx                  # About section component
│   ├── Footer.tsx                 # Footer (always uses container-portfolio)
│   ├── ChatBot.tsx                # Sliding chatbot panel (సంచారి?)
│   ├── InfiniteMarquee.tsx        # Horizontal ticker strip
│   ├── LoadingScreen.tsx          # Full-screen loader
│   └── ui/                        # shadcn/ui primitives + custom additions
│       ├── shift-card.tsx         # cult-ui ShiftCard — used on Experimentos page
│       └── [50+ shadcn components]
├── pages/
│   ├── Work.tsx                   # "/" — main work page
│   ├── Fun.tsx                    # "/fun" — Experimentos index (ShiftCard grid)
│   ├── About.tsx                  # "/about"
│   ├── Resume.tsx                 # "/resume"
│   ├── CaseStudyThesisFlow.tsx    # "/case-study/thesisflow"
│   ├── CaseStudyQuantumPDF.tsx    # "/case-study/quantumpdf"
│   ├── CaseStudyDataNotebook.tsx  # "/case-study/data-notebook"
│   └── errors/                    # 400, 401, 403, 404, 500 error pages
├── lib/
│   ├── utils.ts                   # cn() helper (clsx + tailwind-merge)
│   ├── chatbotKnowledge.ts        # Chatbot facts about Kedhar
│   ├── chatbotMatcher.ts          # Intent matching logic
│   └── chatbotResponses.ts        # Response templates (sarcastic, first-person)
├── contexts/
│   └── ChatContext.tsx            # Global chatbot open/close state
└── hooks/
    ├── use-mobile.tsx
    └── useScrollTrigger.tsx
public/
├── projects.json                  # All project data (source of truth for Work + Fun pages)
└── projects/                      # Project screenshot images
design_system/
└── DESIGN_SYSTEM.md               # Full design rules — read this before adding anything
```

---

## Routes

```
/                          → Work.tsx
/fun                       → Fun.tsx  (Experimentos)
/about                     → About.tsx
/resume                    → Resume.tsx
/case-study/thesisflow     → CaseStudyThesisFlow.tsx
/case-study/quantumpdf     → CaseStudyQuantumPDF.tsx
/case-study/data-notebook  → CaseStudyDataNotebook.tsx
*                          → NotFound.tsx
```

---

## Data — `public/projects.json`

Single source of truth for all projects. Fields:

```ts
{
  id: number
  title: string
  description: string
  technologies: string[]
  github: string | null
  demo: string | null
  category: string           // e.g. "Multi-Agent AI", "Web Development", "Deep Learning"
  project_date: string       // e.g. "Jan 2026"
  image: string              // path relative to /public, e.g. "/projects/foo.png"
  featured: boolean          // true = shown on Work page; false = shown on Fun/Experimentos
  created_at: string         // ISO 8601 — used for sort order (newest first)
  objectives: string[]
  outcomes: string[]
}
```

**Work page** (`featured: true`) shows: ThesisFlow AI, QuantumPDF ChatApp VectorDB, Data Notebook.

**Fun/Experimentos page** (`featured: false`, and title not in the ignored list) shows all other projects sorted by `created_at` descending.

To add a new experiment: add an entry to `projects.json` with `featured: false` and drop a screenshot in `public/projects/`.

---

## Experimentos Page — `src/pages/Fun.tsx`

Uses `ShiftCard` from `src/components/ui/shift-card.tsx` (cult-ui component).

**Card anatomy:**
- `topContent` — category label chip (always visible)
- `topAnimateContent` — small thumbnail (`motion.img` with `layoutId`) — appears in top-right on hover
- `middleContent` — large thumbnail (`motion.img` with matching `layoutId`) — visible at rest, morphs to corner on hover
- `bottomContent` — title, description, tags, "View" link — slides up on hover

**Touch behaviour:** `onTap` toggles hover state so mobile users can tap to open/close the detail panel.

**Layout:**
- Desktop: left index panel (fixed 280px) + right 4-col ShiftCard grid
- Tablet: stacked, 3-col grid
- Mobile: stacked, 2-col grid, full index list (no scroll constraint)

---

## Design Rules (summary — full rules in `design_system/DESIGN_SYSTEM.md`)

- **No rounded corners** on cards or panels. Use `rounded-none`.
- **Colors:** primary red (`text-primary`, `border-primary`), dark background, white text.
- **Fonts:** `font-heading` (Space Grotesk) for headings, `font-body` (Inter) for everything else.
- **Container:** always wrap page content in `container-portfolio` (`max-w-[1440px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20`).
- **Cards:** `border border-border/25 bg-card/40 hover:border-primary/40`.
- **Motion:** use existing Tailwind keyframes (`animate-fade-in`, `animate-slide-up`) or Framer Motion. Don't stack too many animations.
- **New page:** follow the section skeleton in `DESIGN_SYSTEM.md §6.1`.

---

## Chatbot (`src/components/ChatBot.tsx`)

- Fixed right-side slide-in panel, triggered via the `సంచారి?` button in the nav.
- Speaks as Kedhar in first person. Tone: sarcastic, friendly, self-aware.
- Knowledge lives in `chatbotKnowledge.ts`. Responses in `chatbotResponses.ts`. Matching in `chatbotMatcher.ts`.
- If you update projects or skills, update `chatbotKnowledge.ts` to match.

---

## Adding a New Case Study

1. Create `src/pages/CaseStudyFoo.tsx` — follow the existing case study structure (sticky sidebar nav, sections: overview → story → problem → solution → technical → features → challenges → results → learnings).
2. Add the route in `src/App.tsx`.
3. Set `featured: true` in `projects.json` and add the title to the `ignoredTitles` array in `Fun.tsx` so it doesn't appear in Experimentos.
4. Add a nav link in `WorkProjects.tsx` to the case study.

---

## Key Conventions

- `cn()` from `@/lib/utils` for all conditional classNames.
- Imports use `@/` path alias (maps to `src/`).
- Animation imports: use `motion/react` (not `framer-motion` directly) — both are installed but `motion/react` is the preferred import.
- No `rounded-*` on new cards/panels — design system forbids it.
- Don't introduce new brand colors. One red, one dark, everything else supports.
