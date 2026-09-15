# ADR 0001: Use `type="text"` with a pattern for Student ID, not `type="number"`

## Status
Accepted

## Context
The Student ID field (e.g. `202303935`) is a 9-digit value. The obvious first
choice for a numeric-looking field is `<input type="number">`.

## Decision
We used `<input type="text" pattern="[0-9]{9}">` instead of `type="number"`.

## Reasoning
A Student ID is an **identifier**, not a quantity — it is never added,
subtracted, or compared numerically. `type="number"` brings behaviour that is
wrong for identifiers:
- It allows a leading `+` and scientific notation (`1e9`) to be typed.
- Leading zeros can be silently stripped by some browsers, which would
  corrupt an ID like `007303935`.
- It shows spinner arrows, which make no sense for an ID field.

`pattern="[0-9]{9}"` enforces the real constraint we care about — exactly 9
digits, no more, no less — without any of the numeric side effects.

## Consequences
- The value arrives as a string, so no parsing to a number is ever needed.
- The regex must be duplicated on the server, since client-side `pattern`
  can be bypassed entirely (see README's "Server-Side Validation" section).