<!--
Author: Dev Specialist
Date: 2026-11-11
Task: Team Desk Setup - Dev
-->

# Dev Desk · Software Development & Engineering

**Author:** Dev Specialist  
**Date:** 2026-11-11  
**Task:** Team Desk Setup - Dev  

## 🎯 Role Overview
The **Dev Desk** owns the software architecture, application logic, and UI engineering for the MME Progress Reports platform.

## 🛠️ Tech Stack & Conventions
* **Next.js 16 (App Router & Turbopack)**: Maintain strict compliance with Next.js 16 conventions.
* **React 19**: Use modern React 19 hooks and patterns. Avoid `setState` directly inside effect bodies on mount.
* **Tailwind CSS 4**: Leverage inline theme tokens (`--bg`, `--pri`, `--panel`, etc.) and responsive utility classes.
* **Bilingual Support**: Keep all strings modular and structured inside `app/slidesData.ts`. Never hardcode raw monolingual text without both Khmer and English representations.

## 📋 Standard Workflow
1. Read the active task from `tasks/`.
2. Implement code changes with strict type-safety (`tsconfig.json`).
3. After every file edit, run:
   ```bash
   npm run format
   ```
4. Verify changes locally:
   ```bash
   npm run lint
   npm run build
   ```
5. Hand off to **QA Desk** or **Review Desk** for verification.
