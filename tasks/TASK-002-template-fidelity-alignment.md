**Author:** Antigravity AI Agent  
**Date:** 2026-11-11  
**Task:** TASK-002: Align Slide Deck with Reference Template Layout & Styling  

# TASK-002: Align Slide Deck with Reference Template Layout & Styling

## 1. Overview & Objective
Align the MME Progress Reports presentation deck with the exact CSS architecture, DOM structure, component layout, and interactive bottom bar of the reference presentation template at `https://loss-management.vercel.app/#1`.

## 2. Requirements Addressed
1. **Container & Viewport Geometry:**
   - Use `.deck` root container with `data-theme` and `data-lang`.
   - Implement `.viewport` with 72px reservation for `#bar`.
   - Embed 1920x1080 fixed `.stage` with responsive `scale` transformation.
   - Ambient background `.bgfx` with radial `.dots` and animated `.blob.b1` / `.blob.b2`.

2. **Typography & Slide Headers:**
   - Exact `.head` layout containing `.eyebrow` (monospace with gradient pill) and `.h` with `.g` gradient clip.
   - Optimized Khmer typography rules under `.deck[data-lang="km"]`.

3. **Slide Structure Alignment:**
   - **Slide 1 (Title):** Split layout with `.t-left` (title, badge, subtext, CTA, OONE metadata) and `.t-photo` with floating status cards.
   - **Slide 2 (Agenda):** 3-pillar interactive card grid (`.ag`) matching user requirements (Progress & Pending, Challenges, Expected Completion).
   - **Slide 3 (Scope):** 3-department comparison cards (`.scope-card`) with Department 1 active and Departments 2 & 3 in the pipeline.
   - **Slides 4, 5, 6 (General Department Components):** Component grid split views (`.comp-split` and `.comp-box`) for all 5 subcomponents.
   - **Slide 7 (Pending Items):** Review cards for 5 critical decision bottlenecks.
   - **Slide 8 (Challenges & Suggestions):** Faithful implementation of Slide 3 template with `.ch`, `.card`, `.num`, `.ic.red.pulse`, and `.shift` timeline track.
   - **Slide 9 (Expected Completion & Timeline):** Phased milestone cards (`.tlg`) with `.ns-stat` counter.
   - **Slide 10 (Action Plan):** Next 30-day tactical execution roadmap.
   - **Slide 11 (Conclusion):** Executive checklist (`.cc2` and `.chk`) summarizing operational value.
   - **Slide 12 (Thank You):** Power line animated SVG towers (`.pl`), `.ty` gradient heading, OONE logo, and QR code / contact chips.

4. **Interactive Bottom Bar (`#bar`):**
   - Progress bar (`.prog`) tracking presentation completion percentage.
   - Brand indicator (`.brand`) with OONE logo and slide counter.
   - Numbered slide selector pills (`.dots-nav`) with current active indicator.
   - Bilingual language selector dropdown (`.langsw` for `KH` / `EN`).
   - Theme toggle (`.nb` for Dark / Light mode).
   - Print & Fullscreen buttons.

## 3. Verification & Compliance
- **Formatting:** `npm run format` passed.
- **Linting:** `npm run lint` passed with 0 errors and 0 warnings.
- **Build:** `npm run build` completed successfully with full static generation.
- **Safety Rules:** No `git push` without permission, no unauthorized package installations, no access to `.env` or secrets.
