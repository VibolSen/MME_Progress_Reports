---
name: doc
description: Activate the Docs desk to create, update, or maintain documentation, bilingual slides, and presentation guides.
---

<!--
Author: Docs Specialist
Date: 2026-11-11
Task: Slash Command Setup - doc
-->

# /doc · Documentation & Presentation Manuals Workflow

**Author:** Docs Specialist  
**Date:** 2026-11-11  
**Task:** Slash Command Setup - doc  

Use this command when generating technical documentation, updating slide deck content, maintaining bilingual dictionaries, or writing user manuals.

## Workflow Instructions
1. **Target Identification:**
   * Determine whether documentation applies to project rules ([`AGENTS.md`](../../AGENTS.md), [`GEMINI.md`](../../GEMINI.md)), team desks ([`team/`](../../team/)), tasks ([`tasks/`](../../tasks/)), or slide copy ([`app/slidesData.ts`](../../app/slidesData.ts)).
2. **Mandatory Header Enforcement:**
   * Ensure every markdown or task document starts with:
     ```markdown
     **Author:** [Author / Role]  
     **Date:** YYYY-MM-DD  
     **Task:** [Task ID / Title]  
     ```
3. **Bilingual Standards:**
   * For presentation slides, ensure both formal Khmer and professional English versions are synchronized.
4. **Post-Edit Formatting:**
   ```bash
   npm run format
   ```
5. **Verification:**
   ```bash
   npm run lint
   ```
