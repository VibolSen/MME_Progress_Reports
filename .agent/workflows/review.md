---
description: Activate the Review desk to inspect code diffs, verify security boundaries, and audit rule compliance.
---

<!--
Author: Review Specialist
Date: 2026-11-11
Task: Slash Command Setup - review (workflow)
-->

# /review Workflow

**Author:** Review Specialist  
**Date:** 2026-11-11  
**Task:** Slash Command Setup - review (workflow)  

1. Inspect git status and diffs:
   ```bash
   git status
   git diff
   ```
2. Verify safety rules: No secrets, no unapproved packages, no unapproved git push.
3. Verify every file starts with Author, Date, Task.
4. Run `npm run format` and `npm run lint`.

