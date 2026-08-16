# NaaPeru Preloader — Video Generation Pack

## Brand locks (do not drift)

| Token | Value |
| --- | --- |
| Background | `#0E1017` · `hsl(220 26% 7%)` dark navy |
| Accent / logo ink | `#C0261A` · `hsl(5 78% 42%)` crimson |
| Mark | Telugu-style BoldCraft glyph (dot above + calligraphic curve) |
| Type | Geometric sans (Space Grotesk / Inter feel) |
| Corners | Sharp only — no rounded UI pills |
| Rule | One red, one dark — no blue accents, no cream paper, no purple |

## Assets to upload

1. `public/preloader-refs/logo.png` — primary image reference (the mark)
2. `public/preloader-refs/naaperu-preloader-zine-poster.png` — style / composition reference (still)

Optional: use the poster as **start frame** / **image-to-video** input; use the logo as **character/subject lock** if the tool supports multiple refs.

---

## Master video prompt (image-to-video)

Paste this with the poster as the start frame (preferred):

```text
Vertical 9:16 cinematic but minimal motion graphic of a portfolio preloader. Locked brand look from the reference still: full-frame dark navy #0E1017 textured scanned paper, not cream. Centered NaaPeru crimson #C0261A Telugu-style calligraphic logo mark with a small dot above, exact same glyph as the reference. A thin incomplete circular progress ring in the same #C0261A draws slowly clockwise around the mark from about 20% to about 85%, with soft xerox/risograph grain and slight ink misregistration. Subtle paper grain breathing. Below the mark, white geometric sans text stays sharp: "Crafting your experience." Under it, muted gray monospaced counter ticks upward "047 · initializing" then near the end becomes "100 · Ready". Camera locked orthographic, no parallax, no 3D orbit. Quiet, sparse, bold artisan tech. Negative space stays empty. No cream paper, no wooden stamp, no yellow, no blue, no purple, no neon glow bloom, no glossy UI chrome, no progress bar widget, no spinner icon, no commercial wordmark NAAPERU, no watermark, no extra objects.
```

---

## Alt prompt (text-to-video, if no start frame)

```text
Tall vertical dark navy #0E1017 portfolio preloader animation. Centered textured crimson #C0261A calligraphic Telugu-style logo glyph with a floating dot above. Thin crimson incomplete circle draws around it like a loading ring. White text underneath: Crafting your experience. Small gray line: 047 · initializing counting up. Flat scanned-paper grain, orthographic, minimal motion, huge empty dark space. Sharp edges only. No cream paper, no stamps, no neon, no 3D, no UI mockup, no extra colors.
```

---

## Motion recipe (for tools with motion controls)

| Beat | Time (approx 4–6s) | Action |
| --- | --- | --- |
| 0.0–0.4s | Hold | Still frame: mark + faint ring start |
| 0.4–3.5s | Slow draw | Ring arc fills clockwise; counter climbs |
| 3.5–4.5s | Settle | Ring nearly closed; logo soft pulse once (scale ~1.04) |
| 4.5–5.5s | Ready | Status → Ready / 100; brief hold |
| End | Optional | Fade to black `#0E1017` |

Camera: locked. Motion intensity: low. Prefer “subtle / documentary / graphic” over “cinematic drama.”

---

## Recommended settings

- Aspect: **9:16** (or 3:4 if 9:16 unavailable)
- Duration: **4–6 seconds**
- Mode: **Image-to-video** from the poster still
- Seed: lock if you like a take
- Strength / motion: **low–medium** so the glyph doesn’t morph away

---

## What success looks like

- Background stays `#0E1017`
- Logo stays the same glyph (doesn’t become a random letter)
- Only accent color is `#C0261A`
- Ring motion is the hero; everything else is almost still
- Text stays readable; no hallucinated brand names
