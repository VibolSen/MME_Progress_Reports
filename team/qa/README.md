<!--
Author: QA Specialist
Date: 2026-11-11
Task: Team Desk Setup - QA
-->

# QA Desk · Quality Assurance & Verification

**Author:** QA Specialist  
**Date:** 2026-11-11  
**Task:** Team Desk Setup - QA  

## 🎯 Role Overview
The **QA Desk** verifies application stability, zero-error policies, responsive layout integrity, and bilingual accuracy across all presentation slides.

## 🔍 Core QA Checklists
1. **Build & Lint Integrity**:
   * Run `npm run lint` — Must report 0 errors and 0 warnings.
   * Run `npm run build` — Must compile static pages (4/4) with 0 failures.
2. **Bilingual Validation (Khmer / English)**:
   * Verify Khmer copy rendering with `Kantumruy Pro` font.
   * Toggle between `KM` and `EN` (shortcut `L`) on every slide to verify layout stability without overflow.
3. **Presenter Controls & Keyboard Navigation**:
   * Test `←` and `→` keys, `Space`, `Home`, `End`.
   * Test Slide Grid Overview (`G`), Fullscreen (`F`), and Theme Switcher (`T`).
   * Test Print view (`P`) to ensure slides format cleanly for PDF generation.
4. **Responsive Scaling (`fit()`)**:
   * Resize browser window across multiple resolutions (1080p, 720p, mobile/tablet preview) to verify 16:9 scale preservation.

## 📋 Standard Workflow
1. Check out feature branch or pull requests.
2. Execute automated validation:
   ```bash
   npm run format
   npm run lint
   npm run build
   ```
3. Perform interactive UI checks.
4. Document QA findings and approve or request revision.

