---
name: qa
description: Activate the QA desk to execute test suites, run lint/build checks, and verify bilingual UI rendering.
---

<!--
Author: QA Specialist
Date: 2026-11-11
Task: Slash Command Setup - qa
-->

# /qa · Quality Assurance & Verification Workflow

**Author:** QA Specialist  
**Date:** 2026-11-11  
**Task:** Slash Command Setup - qa  

Use this command to perform automated verification, lint checks, build inspections, and visual/bilingual audits.

## Workflow Instructions
1. **Automated Verifications:**
   ```bash
   npm run lint
   npm run build
   ```
   * Confirm 0 errors and 0 warnings.
2. **Bilingual Verification (Khmer / English):**
   * Inspect all modified slides in both `km` and `en` modes.
   * Verify font rendering with `Kantumruy Pro` and check that no text cards or buttons clip.
3. **Presenter & Interactive Checks:**
   * Test keyboard navigation (`←`, `→`, `Space`, `Home`, `End`).
   * Test language toggle (`L`), theme toggle (`T`), slide grid (`G`), fullscreen (`F`), and print preview (`P`).
4. **Sign-off:**
   * Record QA test outcomes in the respective `tasks/TASK-XXX.md`.
