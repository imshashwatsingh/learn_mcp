---
description: Generate an Express API endpoint matching the existing server.js style
---

# Create Express API Endpoint

Create a new Express API endpoint in the existing project.

The user will provide the endpoint details through `$ARGUMENTS`.

First inspect the existing server implementation:

@server.js

Also inspect the project structure if necessary.

## User Request

$ARGUMENTS

## Instructions

Follow the coding style already used in `server.js`.

The existing application uses:

- Node.js
- Express
- ES module imports
- `express()`
- A single `server.js` entry point
- `app.get()` style route definitions
- `req` and `res` parameters
- `res.status(...).json(...)` responses
- JSON response objects
- Semicolons
- Double quotes
- 4-space indentation

Do not introduce a router, controller, service, database, middleware, TypeScript, or additional architecture unless the user explicitly asks for it.

Keep the implementation beginner-friendly.

## Endpoint Requirements

From the user's request, determine:

1. HTTP method
2. Endpoint path
3. Expected request parameters/body if applicable
4. Response status code
5. JSON response structure
6. Any simple validation required

If the user has not provided enough information, ask a concise clarification question instead of guessing.

## Implementation

Modify `server.js` directly.

Add the new endpoint near the other `app.get()` routes.

Match the existing style.

For example, if the user asks:

`Create GET /greeting that returns a greeting message`

the implementation should follow the existing style:

```js
app.get("/greeting",(req,res)=>{
    res.status(200).json({
        success : true,
        message : "Hello from the API"
    })
})
```

Do not unnecessarily reformat existing code.

Do not modify existing `/health` or `/me` behavior.

## Verification

After modifying the file:

1. Inspect the resulting `server.js`.
2. Check that the endpoint is syntactically valid.
3. If practical, start or test the server.
4. Verify the new route with an appropriate request.
5. Do not claim that an endpoint works unless it was actually verified.

If the server is already running, do not unnecessarily start a second server on the same port.

## Final Response

Tell the user:

- Endpoint created
- HTTP method and path
- What the endpoint returns
- Whether it was tested

Keep the response concise.