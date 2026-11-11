---
name: dev
description: Activate the Dev desk to implement new features, update presentation slides, or fix code issues.
---

<!--
Author: Dev Specialist
Date: 2026-11-11
Task: Slash Command Setup - dev
-->

# /dev · Software Development Workflow

**Author:** Dev Specialist  
**Date:** 2026-11-11  
**Task:** Slash Command Setup - dev  

Use this command when implementing features, updating slides, modifying components, or fixing bugs in the MME Progress Reports codebase.

## Workflow Instructions
1. **Context Alignment:**
   - Review [`team/dev/README.md`](../../team/dev/README.md) and [`AGENTS.md`](../../AGENTS.md).
   - Check the active task in `tasks/`.
2. **Implementation Guidelines:**
   - Adhere strictly to Next.js 16, React 19, and Tailwind CSS 4 standards.
   - For all user-facing content, update bilingual definitions in [`app/slidesData.ts`](../../app/slidesData.ts).
   - **Safety Rules:**
     - Tests and builds are pre-approved.
     - **NEVER** run `git push` or install packages without asking first.
     - **NEVER** read `.env` or secret files.
3. **Mandatory Post-Edit Step:**
   - After editing files, run the formatter:
     ```bash
     npm run format
     ```
4. **Verification:**
   - Run `npm run lint` (ensure 0 errors, 0 warnings).
   - Run `npm run build` to confirm production compilation.
