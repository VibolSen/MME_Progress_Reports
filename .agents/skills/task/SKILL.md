---
name: task
description: Create, assign, update, or inspect project tasks using the standardized template in tasks/.
---

<!--
Author: Antigravity AI Agent
Date: 2026-11-11
Task: Slash Command Setup - task
-->

# /task · Task Management Workflow

**Author:** Antigravity AI Agent  
**Date:** 2026-11-11  
**Task:** Slash Command Setup - task  

Use this command to create, track, or manage tasks in the MME Progress Reports project.

## Workflow Instructions
1. **To Create a New Task:**
   - Copy [`tasks/template.md`](../../tasks/template.md) to `tasks/TASK-XXX-<name>.md`.
   - Ensure the required header (**Author**, **Date**, **Task**) is present at the very top.
   - Define the objective, department/component scope, implementation plan, and verification criteria.
2. **To Update an Existing Task:**
   - Locate the target task in `tasks/`.
   - Update its checklist, progress status, and review notes.
3. **Post-Task Execution:**
   - Run the project formatter:
     ```bash
     npm run format
     ```
   - Verify lint and build status (`npm run lint`, `npm run build`).
