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
   * Every file created in `team/`, `tasks/`, or newly authored source documents MUST start with:
     ```markdown
     **Author:** [Role / Agent / Name]  
     **Date:** YYYY-MM-DD  
     **Task:** [Task ID / Title]  
     ```

6. **Ask When Uncertain:**
   * If any requirement, architectural choice, or data point is unclear, **always ask the user first** before making assumptions.

---

## 🏢 Team Desks (`team/`)

* [**team/dev/**](./team/dev/README.md) — Feature implementation, component engineering, Next.js / Tailwind logic.
* [**team/qa/**](./team/qa/README.md) — Test verification, linting, build checks, Khmer/English bilingual validation.
* [**team/review/**](./team/review/README.md) — Code review, architectural audits, security and performance inspection.
* [**team/advisor/**](./team/advisor/README.md) — MME strategic alignment, stakeholder roadmap, inter-ministerial advisory.
* [**team/docs/**](./team/docs/README.md) — Technical documentation, slide deck content, presentation manuals.

---

## 📋 Tasks Workflow (`tasks/`)

* Tasks template: [**tasks/template.md**](./tasks/template.md)
* Standardized task creation for all new features, bug fixes, and data ingestion.

---

## ⚡ Slash Commands

Use the following slash commands for specialized workflows:
* `/task` — Create, inspect, or manage project tasks
* `/dev` — Activate the Dev desk for software implementation
* `/qa` — Activate the QA desk for verification, linting, and bilingual review
* `/review` — Activate the Review desk for code audits and diff reviews
* `/advisor` — Activate the Advisor desk for strategic guidance and MME stakeholder coordination
* `/doc` — Activate the Docs desk for updating documentation and slide deck content

