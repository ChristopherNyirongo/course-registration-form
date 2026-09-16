# Course Registration Form

A course registration form built as university coursework, focused on correct
HTML form semantics, client-side validation, and a professional Git workflow
(feature branches, pull requests, and documentation of design decisions).

## Features

- Course registration form with Full Name, Student ID, Programme, and Course
  fields, plus a submit button.
- Every field has a properly associated `<label>` (via matching `for`/`id`).
- Correct HTML input types: text with a `pattern` for Student ID (not
  `type="number"` — see `docs/adr/0001-student-id-as-text-input.md`), and
  `<select>` dropdowns for Programme and Course.
- Programme and Course are dependent dropdowns: choosing a Programme
  populates Course with only the courses that belong to it.
- Custom client-side validation with per-field error messages (empty fields,
  and an invalid Student ID format), shown without page reload.
- Basic responsive styling separated into its own `styles.css`.

## How to Run

This is a static HTML/CSS/JS project with no build step and no backend.

1. Clone the repository.
2. Open `index.html` directly in a browser (double-click it, or
   right-click → Open With → your browser).

## How to Test

Manual test checklist (no automated tests yet — this is a static frontend
exercise):

1. Submit the form empty — all four fields should show an error message.
2. Type a Student ID that is not exactly 9 digits (e.g. `123`) — should show
   "Student ID must be exactly 9 digits."
3. Select a Programme — the Course dropdown should repopulate with only the
   courses belonging to that Programme.
4. Fill in all fields correctly and submit — should show a success alert and
   reset the form.

## Project Structure

```
.
├── index.html              # Form markup, labels, error message containers
├── styles.css               # Layout and error message styling
├── script.js                 # Programme→Course dependency + validation logic
├── API.md                    # Planned server-side contract and validation rules
├── docs/
│   └── adr/                  # Architecture Decision Records
│       ├── 0001-student-id-as-text-input.md
│       └── 0002-custom-js-validation-over-native.md
└── README.md
```

## Tech Stack

- HTML
- CSS
- Vanilla JavaScript (no frameworks)

## Server-Side Validation (Not Yet Implemented)

This project is client-side only. See `API.md` for the full specification of
what a server would need to validate independently — client-side validation
alone is a UX convenience, not a security measure, since it can be bypassed
by disabling JavaScript or sending requests directly to an endpoint.