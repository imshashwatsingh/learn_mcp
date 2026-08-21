# learn_mcp — Express API + OpenCode Skills

A small Node.js/Express project used to learn **AI-native software engineering** with
[OpenCode](https://opencode.ai). It contains a minimal Express server (`server.js`) and a set
of **OpenCode skills** that teach an AI coding assistant how to extend the server safely and
consistently.

This README walks through:

1. What the project is and how it is structured.
2. The Express API endpoints.
3. The OpenCode skills that were implemented and how they work.
4. How OpenCode discovers and runs those skills.
5. How to use and test everything.

---

## 1. Project Overview

The repository serves two related learning goals:

- **A learning Express server** — a single `server.js` file that exposes a few JSON endpoints.
  It is intentionally tiny and uses no routers, controllers, databases, or TypeScript so the
  code stays beginner-friendly.
- **Reusable OpenCode skills** — instructions stored in `.opencode/skills/` that let an AI
  assistant (OpenCode) perform repetitive tasks *in the project's own style*. Two skills exist:
  - `express-endpoint` — generate a new Express route that matches `server.js`'s conventions.
  - `pr-description` — generate a pull request description from the current Git diff.

The guiding idea is **style consistency**: instead of an AI assistant inventing its own
architecture, the skills describe the existing code so generated output looks like it was
written by a developer who already knows this project.

### Repository layout

```text
.
├── server.js                  # Express entry point (health, me, greeting)
├── package.json               # Node/Express deps and scripts
├── opencode.json              # OpenCode configuration (skill permissions)
├── .opencode/
│   └── skills/
│       ├── express-endpoint/
│       │   └── SKILL.md       # Skill: create Express endpoints
│       └── pr-description/
│           └── SKILLS.md      # Skill: generate PR descriptions from git diff
└── README.md                  # This file
```

> Note: `node_modules/` and `.opencode/node_modules/` are dependency folders and are ignored
> by `.gitignore`.

---

## 2. The Express API

The server uses **Node.js**, **Express (v5)**, and **ES module** syntax (`"type"` is implied by
the `import express from "express";` style in `server.js`). A single `app` object is created
and routes are registered with `app.<method>(path, handler)`.

Run it with:

```bash
npm install      # install express
npm start        # node server.js  → listens on PORT 5000
```

### Endpoints

| Method | Path        | Status | Response (JSON) | Purpose |
|--------|-------------|--------|-----------------|---------|
| GET    | `/health`   | 200    | `{ success, message, timestamp }` | Liveness check |
| GET    | `/me`       | 200    | `{ name, role }` | Test-only identity endpoint |
| GET    | `/greeting` | 200    | `{ success, message }` | Example greeting endpoint |

Example request:

```bash
curl http://localhost:5000/greeting
# → {"success":true,"message":"Hello from the API"}
```

### Shared coding style (the "source of truth")

Every route in `server.js` follows these rules, and the skills are written to enforce them:

- ES module import: `import express from "express";`
- App creation: `const app = express();`
- Route handlers use inline arrow functions: `app.get("/path",(req,res)=>{ ... })`
- Responses use `res.status(200).json({ ... })`
- JSON with `success`/`message` style where applicable
- Double quotes, semicolons, and **4-space indentation**
- No extra architecture (no Router, controllers, services, or classes)

---

## 3. OpenCode Skills

OpenCode **skills** are Markdown files that contain instructions ("prompts") plus metadata.
OpenCode reads them and, when their described situation matches, follows the instructions to
perform a task. They are the recommended mechanism for packaging repeatable, project-specific
AI workflows.

Skills live in:

```text
.opencode/skills/<skill-name>/SKILL.md
```

Each skill file has two parts:

1. **Frontmatter** (YAML between `---` lines) — at minimum a `description` (and a `name` for
   some setups) used by OpenCode to decide when the skill applies.
2. **Body** — the natural-language instructions the assistant follows.

OpenCode discovers skills automatically from `.opencode/skills/` (project-local) and from
`~/.config/opencode/` (user-global). No extra registration is required beyond placing the file
in the right folder and restarting/refreshing the session.

The repository's `opencode.json` also configures skill permissions so skills run without
prompting:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "permission": {
    "skill": {
      "*": "allow",
      "pr-review": "allow",
      "internal-*": "deny",
      "experimental-*": "ask"
    }
  }
}
```

> Tip: If you are unsure whether a skill is loaded, ask OpenCode something like "what skills do
> you have available?" — it should list `express-endpoint` and `pr-description`.

---

### 3.1 Skill: `express-endpoint`

**File:** `.opencode/skills/express-endpoint/SKILL.md`

**Purpose:** Generate a new Express API endpoint that matches the existing `server.js` style,
without introducing unnecessary architecture.

**When it applies:** When you ask OpenCode to *create*, *add*, or *generate* a new API endpoint
for this Express app.

**How it works (what the skill tells the assistant to do):**

1. **Understand the request** — determine HTTP method, path, params, body, response status,
   response JSON, and any validation. It explicitly says *do not invent missing requirements*;
   the assistant should ask if something critical is missing.
2. **Inspect the existing server** — read `server.js` first and treat it as the style reference.
3. **Generate the endpoint** — produce the smallest implementation that satisfies the request,
   following the exact conventions (double quotes, semicolons, 4-space indent, inline handlers,
   `res.status(200).json(...)`).
4. **Preserve existing behavior** — do not modify or remove `/health` or `/me` unless asked.
5. **Verify** — check the file, check JS syntax, and test the endpoint when practical. The skill
   mandates *honest* reporting: never claim an endpoint was tested when it was not.

**Simplicity rules enforced by the skill:** no TypeScript, no Express Router, no controllers,
no services, no repositories, no classes, no database layers, no auth, and no validation
libraries — unless explicitly requested.

**Example usage (what the user types in OpenCode):**

```text
Create GET /greeting that returns "Hello World"
```

The skill guides OpenCode to append something like this to `server.js`:

```js
app.get("/greeting",(req,res)=>{
    res.status(200).json({
        success : true,
        message : "Hello World"
    })
})
```

This is exactly how the existing `/greeting` endpoint in this repository was produced.

---

### 3.2 Skill: `pr-description`

**File:** `.opencode/skills/pr-description/SKILLS.md`

**Purpose:** Generate a concise, copy-paste-ready pull request description from the current Git
state — without inventing changes, tests, or behavior.

**When it applies:** When you ask OpenCode to write or generate a PR description / changelog
from the repository's Git changes.

**How it works (what the skill tells the assistant to do):**

1. **Inspect the repository** — run `git status`, `git diff`, and review the relevant changed
   files before writing anything.
2. **Do not fabricate** — the skill explicitly forbids inventing changes, tests, or behavior.
   If something cannot be determined from the repo, the assistant must say so.
3. **Return a fixed structure** ready to paste into GitHub/GitLab:

   ```markdown
   ## Summary
   A concise summary of the change.

   ## Changes
   Bullet points describing what changed.

   ## Why
   Explain the motivation based only on available repository evidence.

   ## Testing
   List tests that were actually run, or state that testing could not be determined.

   ## Notes
   Important implementation details, risks, or follow-up items.
   ```

**Why this skill is useful:** writing PR descriptions is repetitive and benefits from consistent
judgment. Because the skill forces evidence-based output, the generated description stays
truthful even when tests or intent are unclear.

**Example usage (what the user types in OpenCode):**

```text
Generate a pull request description from the current repository state.
```

OpenCode inspects the diff and returns the structured Markdown above. (In practice the
description for the `/greeting` addition looked like: *Summary* — added a GET /greeting endpoint;
*Changes* — new route returning a JSON greeting; *Testing* — endpoint verified via curl;
*Notes* — none.)

---

## 4. How OpenCode Discovers and Runs a Skill

```text
   You (in OpenCode chat)
          │  "Create GET /greeting that returns Hello World"
          ▼
   OpenCode matches the request to a skill
   by reading each skill's frontmatter `description`
          │
          ▼
   Loads .opencode/skills/express-endpoint/SKILL.md
          │
          ▼
   Follows the instructions in the skill body
   (read server.js → match style → append route → verify)
          │
          ▼
   Edits server.js  →  you review/accept  →  endpoint is live
```

Key points:

- **Discovery is automatic.** OpenCode scans `.opencode/skills/<name>/SKILL.md` at session
  start. No `opencode.json` entry is needed to register a skill (the config above only sets
  *permissions*).
- **Matching is by description.** The frontmatter `description` is what OpenCode uses to decide
  whether a skill is relevant to your prompt.
- **Permissions.** `opencode.json` currently allows all skills (`"*": "allow"`), so they run
  without an extra confirmation step. Skills matching `internal-*` are denied and
  `experimental-*` require a prompt.

---

## 5. Verification & Testing

### Run the server

```bash
npm install
npm start
```

In another terminal:

```bash
curl -s http://localhost:5000/health
curl -s http://localhost:5000/me
curl -s http://localhost:5000/greeting
```

Expected:

```json
{"success":true,"message":"working","timestamp":<ms>}
{"name":"Shashwat Singh","role":"AI Native Software Engineer"}
{"success":true,"message":"Hello from the API"}
```

### Verify skill-driven edits

After letting OpenCode create an endpoint via the `express-endpoint` skill:

1. `node --check server.js` — confirms the file is syntactically valid.
2. Start the server and `curl` the new path (as above).
3. Confirm existing endpoints (`/health`, `/me`) still respond unchanged.

### Verify a PR description

Run the `pr-description` skill, then review the generated Markdown. Confirm it references only
changes that actually appear in `git status` / `git diff` and does not claim tests ran unless
they did.

---

## 6. Security & Safety Notes

- **Skills do not execute shell commands by themselves** — OpenCode performs the edits and you
  review/accept them. The `express-endpoint` skill explicitly forbids deleting existing routes
  or changing unrelated code.
- **No secrets** are stored in `server.js`, the skills, or `opencode.json`.
- **Evidence-based output** — the `pr-description` skill is designed to avoid hallucinating
  features, fixes, or test results.
- **Style boundaries** — both skills intentionally keep the implementation small and avoid
  adding frameworks, databases, or auth unless you ask.

---

## 7. Quick Reference

| Goal                                      | What to do in OpenCode                              |
|-------------------------------------------|-----------------------------------------------------|
| Add a new API route                       | `Create GET /users that returns a user list`        |
| Keep it consistent with `server.js`       | (automatically handled by `express-endpoint`)       |
| Write a PR description from the diff      | `Generate a pull request description`                |
| Confirm skills are loaded                 | `What skills are available?`                         |

---

## 8. Limitations / Future Work

- The `pr-description` skill file is named `SKILLS.md` in this repo; OpenCode conventionally
  expects `SKILL.md`. If it is not discovered, rename the file to `SKILL.md`.
- There are currently no automated unit tests for `server.js`; verification is done manually via
  `curl` and `node --check`.
- The skills are project-local; to reuse them across projects, move them to your global OpenCode
  skills directory.
