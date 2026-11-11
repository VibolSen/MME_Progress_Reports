<!--
Author: Review Specialist
Date: 2026-11-11
Task: Team Desk Setup - Review
-->

# Review Desk · Code Review & Architectural Auditing

**Author:** Review Specialist  
**Date:** 2026-11-11  
**Task:** Team Desk Setup - Review  

## 🎯 Role Overview
The **Review Desk** inspects code quality, security posture, rule adherence, and alignment with OONE Power design guidelines before changes are finalized.

## 🛡️ Review Criteria
1. **Safety & Policy Adherence**:
   * Confirm no secrets, tokens, or `.env` files are tracked or accessed.
   * Confirm no unauthorized packages were added to `package.json`.
   * Confirm file header requirement (**Author**, **Date**, **Task**) is respected on all project documents.
2. **Architecture & Performance**:
   * Verify clean Next.js 16 App Router paradigms.
   * Ensure components avoid redundant re-renders and cascading effect loops.
   * Ensure assets in `public/` are optimized (SVGs clean, viewBox tight, no redundant background fills).
3. **Design System Consistency**:
   * Adherence to OONE Power theme palette (`--bg: #0B0A1A`, `--pri: #8B74FF`, glass panels, amber/cyan accents).

## 📋 Standard Workflow
1. Review git diff:
   ```bash
   git diff
   git status
   ```
2. Verify formatting and lint status:
   ```bash
   npm run format
   npm run lint
   ```
3. Provide constructive feedback or sign-off on the task.
