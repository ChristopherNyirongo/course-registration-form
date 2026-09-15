# API Documentation (Planned Server Contract)

This project currently has no backend — the form runs entirely client-side.
This document specifies what the server endpoint *would* need to do, so a
backend can be implemented later without guessing the contract, and so the
client-side and server-side validation stay in sync.

## Endpoint

```
POST /api/registrations
Content-Type: application/json
```

### Request Body

```json
{
  "name": "Christopher Nyirongo",
  "studentId": "202303935",
  "programme": "cs",
  "course": "Data Structures"
}
```

| Field | Type | Required | Constraints |
|---|---|---|---|
| `name` | string | yes | 1–100 characters, trimmed |
| `studentId` | string | yes | exactly 9 digits, matches `^[0-9]{9}$` |
| `programme` | string | yes | must be one of: `cs`, `af`, `law` |
| `course` | string | yes | must belong to the submitted `programme` (see mapping below) |

### Programme → Course validation mapping

The server must reject any `course` value that does not belong to the
submitted `programme`, even though the client-side dropdown already
restricts this — a request can be sent directly (e.g. via `curl` or
Postman), bypassing the browser UI entirely.

| Programme (`programme`) | Valid `course` values |
|---|---|
| `cs` | Data Structures, Compilers, Java Programming, Cloud Computing |
| `af` | Financial Accounting, Cost Accounting, Business Finance |
| `law` | Introduction to Law, Constitutional Law, Contract Law |

### Responses

**201 Created** — registration accepted
```json
{ "id": "generated-id", "status": "registered" }
```

**400 Bad Request** — validation failed
```json
{
  "errors": {
    "studentId": "Student ID must be exactly 9 digits."
  }
}
```

## Why server-side validation is required even though the client already validates

Client-side JavaScript validation is a user-experience convenience only. It
runs entirely inside a browser the user controls, and can be bypassed by
disabling JavaScript, editing the HTML via DevTools, or sending a request
directly to the endpoint without using the form at all. The server must
independently re-check every constraint above on every request, and must
never assume a request came through the form's JavaScript.

Beyond re-checking the client-side rules, the server is also responsible for
checks the client cannot perform, such as:
- Rejecting a `studentId` that has already registered for the same `course`
  (requires querying existing data — the client has no access to this).
- Sanitising the `name` field before storing or displaying it, to prevent
  injection attacks (SQL injection if stored in a database, XSS if ever
  re-rendered on a page unescaped).
- Enforcing sensible length limits server-side regardless of what the
  client's HTML restricts, since the HTML itself can be bypassed.