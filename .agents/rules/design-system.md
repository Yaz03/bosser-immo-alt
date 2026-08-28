---
description: Bossert Immobilien Official Design System
---

# Bossert Immobilien Design System

You MUST strictly follow these layout, typography, and styling rules across all pages and components for Bossert Immobilien.

## 1. Color Palette
- **Navy (`--navy: #042433`)**: Primary brand color. Used for text on cream backgrounds, and background for dark sections.
- **Cream (`--cream: #FEFCF6`)**: Primary light background color. Provides the "old-money luxury" feel instead of pure white.
- **Bronze (`--bronze: #AF8C53`)**: Accent color. Used strictly for subtle details like dots and active states.
- **White (`--white: #ffffff`)**: Used for typography on Navy backgrounds.

## 2. Typography Rules
The typography heavily relies on extreme contrast between weights, families, and kerning. Do NOT invent new font sizes or margins.

### A. Tags (Micro-copy)
Use class: `.services-subtitle`
- **Font**: Inter, `0.6rem`, `400` weight, `letter-spacing: 1px`, UPPERCASE, `--bronze`.

### B. Standard Body Copy & Subheads
Use class: `.why-subhead` (or globally enforce inline)
- **Font**: Inter, `1rem`, `300` weight (Strictly Light).
- **Line Height**: `1.8`

### C. Standard Section Titles (The "Explore" Scale)
Use class: `.explore-headline` (Used for standard sections like About, Philosophy, Properties)
- **Line 1 (Sans)**: Inter, `3.5rem`, `300` weight, `letter-spacing: -3px`.
- **Line 2 (Serif)**: Instrument Serif, `5.5rem`, `400` weight, `font-style: italic`, `letter-spacing: 0`.

### D. Massive Section Titles (The "Why" Scale)
Use class: `.why-headline` (Used for giant statement headlines)
- **Line 1 (Sans)**: Inter, `4rem`, `300` weight, `letter-spacing: -1px`.
- **Line 2 (Serif)**: Instrument Serif, `7rem`, `400` weight, `font-style: italic`, `letter-spacing: 0`.

### E. Hero Titles (The "Editorial" Scale)
Use class: `.editorial-headline`
- **Line 1 (Sans)**: Inter, `5rem`, `300` weight.
- **Line 2 (Serif)**: Instrument Serif, `6rem`, `400` weight, `font-style: italic`.

## 3. Structural & Layout Rules
- **Negative Space**: Luxury breathes. Sections must have massive padding (e.g., `padding: 10rem 0;`).
- **Global Page Margins**: All pages must use `.inner-page-container` for horizontal constraint, which STRICTLY matches the homepage layout: `max-width: 1600px`, with horizontal padding of `4rem` (Desktop), `2rem` (Tablet), and `1.5rem` (Mobile).
- **Animations**: Every element must use the scroll reveal classes (`reveal-base`, `reveal-up`, `delay-100`, etc.) to stagger into view.
- **Grids**: Use split, asymmetrical layouts (like `.why-section` or `.services-section`) or strict grids.
- **"Corner Magic" (Image Padding)**: When requested to apply "Corner magic" to an image inside a card, it means wrapping the image in a padded container (e.g., `padding: 1rem`) and applying a slightly smaller concentric `border-radius` (e.g., `6px` or `8px`) directly to the image or its immediate wrapper. This creates a nested, floating "picture frame" effect instead of the image sitting completely flush against the outer card edges.
