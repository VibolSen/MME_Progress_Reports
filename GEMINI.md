<!--
Author: Antigravity AI Agent
Date: 2026-11-11
Task: Project Harness Initialization
-->

# GEMINI.md · Agent Operating Directives

**Author:** Antigravity AI Agent  
**Date:** 2026-11-11  
**Task:** Project Harness Initialization  

> [!IMPORTANT]
> **Primary Guidelines Reference:**  
> This file is linked to the primary project rules defined in [**AGENTS.md**](./AGENTS.md). All guidelines, tech stack conventions, and project details in `AGENTS.md` are binding for this workspace.

---

## 🛡️ Critical Safety & Operating Directives

1. **Allow Tests Freely:**
   * You may run `npm run lint`, `npm run format`, `npm run build`, and test suites at any time without asking.

2. **Ask Before `git push` or Package Installations:**
   * **Do NOT** execute `git push` without prior explicit confirmation from the user.
   * **Do NOT** install new packages or dependencies (`npm install`, `yarn add`, `pnpm add`, `npx`) without asking the user first.

3. **Confidentiality / Secret Protection:**
   * **Strictly Prohibited:** Never view, read, print, parse, or expose `.env`, `.env*`, `.pem`, secrets, credentials, API keys, or private tokens. Document sanctioned paths only.

4. **Post-Edit Formatting:**
   * After **every** file edit, run the project formatter:
     ```bash
     npm run format
     ```

5. **Mandatory File Header:**
   * Newly authored source or documentation documents should start with:
     ```markdown
     **Author:** [Role / Agent / Name]  
     **Date:** YYYY-MM-DD  
     **Task:** [Task ID / Title]  
     ```

6. **Ask When Uncertain:**
   * If any requirement, architectural choice, or data point is unclear, **always ask the user first** before making assumptions.

