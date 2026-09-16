# ADR 0002: Use `novalidate` + custom JS validation instead of native browser validation

## Status
Accepted

## Context
HTML5 already provides built-in validation (`required`, `pattern`, etc.),
which triggers small browser-native error bubbles on submit. This requires
no JavaScript at all.

## Decision
We disabled native validation with `novalidate` on the `<form>` and wrote
our own validation in `script.js`, driven by the same `required`/`pattern`
attributes.

## Reasoning
- Native browser bubbles differ in wording and styling across browsers,
  which is inconsistent and outside our control.
- The assignment specifically calls for custom client-side validation
  messages, which implies messages we control, placed where we want them
  (a `<span class="error">` under each field), not default browser UI.
- Keeping the `required`/`pattern` attributes in the HTML means the same
  constraints are declared in one place and read by our own JS
  (`element.checkValidity()`-style patterns, or direct regex tests), rather
  than duplicating the rules with no connection to the markup.

## Consequences
- We are responsible for correctly re-implementing what the browser would
  have done for free (empty checks, pattern checks).
- Error messages are fully customisable and consistently styled.
- If JavaScript fails to load, the form has no validation at all client-side
  (though server-side validation remains the real safety net regardless).