<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---

# MME Progress Reports · Project Harness & Operating Rules

**Author:** Antigravity AI Agent  
**Date:** 2026-11-11  
**Task:** Project Harness Initialization  

This document defines what this project is, how to run it, how to test it, and the mandatory operating and safety rules for all AI agents and contributors working in this repository.

---

## 1. What This Project Is

* **Project Name:** MME Progress Reports (`mme-progress-reports`)
* **Client / Beneficiary:** Ministry of Mines and Energy (MME), Royal Government of Cambodia
* **Developed by:** OONE Power Technology Co., Ltd
* **Description:** An interactive, bilingual (Khmer & English) executive presentation slide deck and digital tracking platform for MME's ongoing departmental transformation projects.
* **Core Tech Stack:**
  * **Framework:** Next.js 16 (App Router with Turbopack)
  * **UI Library:** React 19
  * **Styling:** Tailwind CSS 4 with custom glassmorphism and ambient dark/light themes
  * **Typography:** `Kantumruy Pro` (Khmer) + `Plus Jakarta Sans` (English)
  * **Icons:** `lucide-react`
  * **Language:** TypeScript 5 (Strict Mode)

---

## 2. How to Run

```bash
# Run local development server (with Turbopack)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Default development address: `http://localhost:3000`

---

## 3. How to Test & Lint

```bash
# Run ESLint validation (0 errors, 0 warnings policy)
npm run lint

# Run code auto-formatting
npm run format

# Full production verification (compilation, type-checking & static pre-rendering)
npm run build
```

---

## 4. Mandatory Safety & Operating Rules

1. **Allow Tests Freely:**
   * You are explicitly allowed and encouraged to run tests, linting, and build checks (`npm run lint`, `npm run format`, `npm run build`, `npm test`) at any time without asking.

2. **Ask Before `git push` or Installing Packages:**
   * **NEVER** run `git push` without prior explicit approval from the user.
   * **NEVER** install new packages (`npm install`, `npm i`, `npx <pkg>`, `yarn add`, `pnpm add`) without asking the user first.

3. **Never Read `.env` or Secrets:**
   * **Strictly Prohibited:** Never view, read, dump, print, or expose `.env`, `.env*`, `.pem`, secrets, credentials, or authentication tokens using any tool or command.

4. **Run Formatter After Every File Edit:**
   * After creating or editing code files, execute the project formatter:
     ```bash
     npm run format
     ```

5. **Mandatory File Header:**
   * Every file created in `team/`, `tasks/`, or newly authored source files MUST begin with the standardized metadata header:
     ```markdown
     **Author:** [Role / Agent / Name]  
     **Date:** YYYY-MM-DD  
     **Task:** [Task ID / Title]  
     ```
     *(or equivalent comment block in code files)*.

6. **Ask When Unsure:**
   * If there is any ambiguity, missing requirement, or breaking architectural decision, **always stop and ask the user** before proceeding.

---

## 5. Team Structure & Workspaces (`team/`)

The repository features dedicated role desks under `team/` to coordinate work across specialties:

* [`team/dev/`](./team/dev/README.md) — Software engineering, component development, Next.js architecture.
* [`team/qa/`](./team/qa/README.md) — Quality assurance, test coverage, bilingual copy validation, regression testing.
* [`team/review/`](./team/review/README.md) — Code reviews, diff auditing, performance analysis, security standards.
* [`team/advisor/`](./team/advisor/README.md) — Project strategy, MME stakeholder alignment, inter-ministerial policy coordination.
* [`team/docs/`](./team/docs/README.md) — Documentation, presentation notes, release briefs, bilingual dictionaries.

---

## 6. Tasks Workflow (`tasks/`)

* All project initiatives, features, and bug fixes must be tracked under `tasks/`.
* New tasks must be created using the standardized template: [`tasks/template.md`](./tasks/template.md).
* Every task document must start with the required **Author**, **Date**, and **Task** header.

---

## 7. Slash Commands Quick Reference

Agents and users can leverage the following standardized commands:

| Command | Role / Target | Purpose |
| :--- | :--- | :--- |
| `/task` | Tasks Manager | Create, inspect, or update task definitions using `tasks/template.md` |
| `/dev` | Dev Desk | Implement features, build components, and resolve code defects |
| `/qa` | QA Desk | Verify builds, linting, responsiveness, and bilingual translation accuracy |
| `/review` | Review Desk | Perform code reviews, security checks, and rule compliance audits |
| `/advisor` | Advisor Desk | Provide strategic advice on MME stakeholder alignment & roadmap planning |
| `/doc` | Docs Desk | Update documentation, technical guides, and presentation decks |
