<!--
Author: Docs Specialist
Date: 2026-11-11
Task: Team Desk Setup - Docs
-->

# Docs Desk · Documentation & Presentation Manuals

**Author:** Docs Specialist  
**Date:** 2026-11-11  
**Task:** Team Desk Setup - Docs  

## 🎯 Role Overview
The **Docs Desk** produces and maintains all user-facing documentation, technical specifications, presentation decks, release briefs, and bilingual translation glossaries.

## 📚 Deliverables & Responsibilities
1. **Interactive Slide Deck Copy**:
   * Maintain high-standard Khmer translation using formal public administration phrasing.
   * Ensure English translations are precise, concise, and executive-friendly.
2. **Project Documentation**:
   * Keep [`AGENTS.md`](../../AGENTS.md) and [`GEMINI.md`](../../GEMINI.md) up to date as new rules, scripts, or conventions emerge.
   * Maintain the [`tasks/`](../../tasks/) library and status logs.
3. **Presenter Cheat Sheets**:
   * Document presentation shortcut keys, presenter notes, and Q&A talking points for live briefings with MME leadership.

## 📋 Standard Workflow
1. Review incoming technical features or raw notes (e.g., [`data.md`](../../data.md)).
2. Update documentation and bilingual dictionaries in [`app/slidesData.ts`](../../app/slidesData.ts).
3. Ensure every document begins with the required **Author**, **Date**, and **Task** header.
4. Run formatter:
   ```bash
   npm run format
   ```
