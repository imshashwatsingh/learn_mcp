---
name: express-endpoint
description: Generate simple Express API endpoints that match the project's existing server.js coding style
---

# Express API Endpoint Skill

Use this skill when the user asks to create, add, or generate a new API endpoint for the Express application.

The project is intentionally simple and is being used to learn custom AI coding skills.

## Project Context

The application uses:

- Node.js
- Express
- JavaScript
- ES modules
- `server.js` as the main server file

The existing style should be treated as the source of truth.

Before making changes, read `server.js`.

## Existing Coding Style

Match these conventions:

- `import express from "express";`
- `const app = express();`
- `app.get()` / appropriate Express HTTP method
- `(req,res)` formatting
- `res.status(200).json(...)`
- JSON response objects
- Double quotes
- Semicolons
- 4-space indentation
- Simple inline route handlers
- No unnecessary abstractions

Example existing style:

```js
app.get("/health",(req,res)=>{
    res.status(200).json({
        success : true,
        message : "working",
        timestamp : new Date().getTime()
    });
})
```

Another example:

```js
app.get("/me",(req,res)=>{
    // This is for test purpose only
    res.status(200).json({
        name : "Shashwat Singh",
        role : "AI Native Software Engineer"
    })
})
```

## Workflow

When creating an endpoint:

### Step 1 — Understand the request

Determine:

- HTTP method
- URL path
- Request parameters
- Request body
- Response status
- Response JSON
- Validation requirements

Do not invent missing requirements.

Ask the user if critical information is missing.

### Step 2 — Inspect the existing server

Read `server.js`.

Use the existing implementation as the style reference.

Do not introduce unnecessary architecture.

For this learning project, prefer modifying `server.js` directly.

### Step 3 — Generate the endpoint

Create the smallest implementation that satisfies the request.

Example:

User:

```text
Create GET /greeting that returns "Hello World"
```

Implementation:

```js
app.get("/greeting",(req,res)=>{
    res.status(200).json({
        success : true,
        message : "Hello World"
    })
})
```

### Step 4 — Preserve existing behavior

Do not modify or remove existing routes unless the user explicitly asks.

Existing endpoints such as `/health` and `/me` should continue working.

### Step 5 — Verify

After implementing the endpoint:

- Check the resulting file.
- Check JavaScript syntax.
- Test the endpoint when practical.
- Report honestly whether testing was performed.

Never claim that an endpoint was tested when it was not.

## Simplicity Rules

Do not introduce:

- TypeScript
- Express Router
- Controllers
- Services
- Repositories
- Classes
- Database layers
- Authentication
- Validation libraries
- New frameworks

unless explicitly requested.

The goal is to demonstrate a small, understandable AI coding skill.

## Safety Rules

Do not:

- Delete existing endpoints
- Change unrelated code
- Add dependencies unnecessarily
- Hard-code secrets
- Invent API requirements
- Claim tests passed without running them

## Expected Result

The final implementation should look like something a developer familiar with the existing `server.js` would naturally have written.

The goal is not to produce the most sophisticated Express architecture.

The goal is to produce the correct endpoint while consistently following the existing project's style.