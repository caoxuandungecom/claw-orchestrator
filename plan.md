# Plan — Text Helper Utility Module

## Goal
Implement a TypeScript utility module at `src/utils/text-helper.ts` providing three text manipulation functions (`slugify`, `truncateWords`, `toCamelCase`) along with comprehensive unit tests using Vitest.

## Scope
- In:
  - `src/utils/text-helper.ts` exporting `slugify`, `truncateWords`, and `toCamelCase` with full TypeScript type definitions.
  - Unit tests in `src/utils/text-helper.test.ts` covering standard inputs, edge cases (empty strings, whitespace, special characters, accents/unicode), and boundaries.
  - Project setup (`package.json`, `tsconfig.json`, `vitest`) if not already initialized.
- Out:
  - Any additional utility functions outside the 3 requested.
  - Heavy third-party utility dependencies.

## Success criteria
- Scalar: null (gates only)
- Gates:
  - [ ] G1: TypeScript compilation succeeds without errors — eval: `npx tsc --noEmit`
  - [ ] G2: All Vitest unit tests pass — eval: `npx vitest run`
  - [ ] G3: `src/utils/text-helper.ts` exports all 3 functions with appropriate type signatures — eval: module inspection

## Constraints
- Files not to touch: none (workspace is empty)
- Banned: external string manipulation packages (lodash, change-case) — use native TypeScript and regex

## Approach (Coder hint)
Initialize the project with TypeScript and Vitest. Implement `slugify` (normalizing unicode/diacritics, lowercase, replacing special characters with hyphens), `truncateWords` (splitting on whitespace, preserving word boundaries, customizable ellipsis), and `toCamelCase` (converting kebab, snake, and space-separated strings). Provide comprehensive Vitest test coverage for all functions.

## Reviewer rubric (extra)
- Verify test assertions are non-tautological (no `expect(true).toBe(true)`).
- Verify handling of diacritics / Vietnamese accents in `slugify`.
- Confirm zero typecheck errors on `npx tsc --noEmit` and clean pass on `npx vitest run`.