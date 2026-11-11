---
name: review
description: Activate the Review desk to inspect code diffs, verify security boundaries, and audit rule compliance.
---

<!--
Author: Review Specialist
Date: 2026-11-11
Task: Slash Command Setup - review
-->

# /review · Code Review & Audit Workflow

**Author:** Review Specialist  
**Date:** 2026-11-11  
**Task:** Slash Command Setup - review  

Use this command to audit git working tree changes, check safety policy compliance, and review code structure.

## Workflow Instructions
1. **Inspect Working Tree & Diffs:**
   ```bash
   git status
   git diff
   ```
2. **Safety & Policy Checklist:**
   * [ ] No secrets, tokens, or `.env` files exposed or read.
   * [ ] No unauthorized dependencies added to `package.json`.
   * [ ] No unapproved `git push` executed.
   * [ ] Every created file begins with the mandatory Author, Date, Task header.
3. **Run Formatter & Lint:**
   ```bash
   npm run format
   npm run lint
   ```
4. **Outcome:**
   * Approve for completion or request revisions with clear actionable feedback.

