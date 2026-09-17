---
detected_at: 5ba3d32
ecosystems: [typescript]
default: typescript
stacks:
  typescript:
    cwd: .
    runner: vitest
    single: 'npx vitest run {file} -t "{name}"'
    file: npx vitest run {file}
    suite: npm test
    watch: npm run test:watch
    coverage: npm run test:coverage
    mutation: null
    acceptance: null
    property: null
    approval: vitest snapshots
    contract: null
    test_glob: "src/__tests__/**/*.test.ts"
    exemplar:
      unit: src/__tests__/budget.test.ts
      acceptance: null
    helpers:
      - src/__tests__/helpers/isolate-home.ts
verified: [single, file, coverage, watch]
suite_baseline: red
suite_seconds: 138
---

# TDD Stack Profile

## Conventions to match

- Test files sit in `src/__tests__/` as `<name>.test.ts`. Subdirectories include `verify/`, `kernel/`, and `ultraapp/`.
- Assertions use `expect` from vitest. Test suites use `describe`, `it`, and `expect` directly imported from `vitest`.
- Doubles use `vi.fn()` and `vi.spyOn()` from vitest; there is no separate mocking library.
- Process and filesystem isolation helper: `src/__tests__/helpers/isolate-home.ts` exports `useIsolatedHome()`. It creates an isolated temporary directory for `$HOME` and `%USERPROFILE%` before tests and cleans it up after. Any test constructing `EmbeddedServer` or touching `~/.openclaw` must call `useIsolatedHome()` at the top level to avoid token / state pollution across parallel workers.
- Test timeout configuration: Defaults in `vitest.config.ts` are 10,000ms test timeout, 30,000ms hook timeout, and 15,000ms teardown timeout to prevent hung processes in CI.
- Exemplars to imitate:
  - Unit: `src/__tests__/budget.test.ts` (pure domain assertions, custom error class testing, boundary condition checks).
  - Acceptance: `null` (no dedicated browser/e2e framework installed; tests are headless Vitest suites).

## Notes and constraints

- **Suite Baseline (Red on Windows Local)**: Full suite execution (`npm test`) runs 50 test files with 1,603 tests in ~138 seconds. In the local Windows environment, 1,535 tests passed and 68 tests failed across 2 test files:
  1. `src/__tests__/verify/runner.test.ts`: Fails due to POSIX shell assumption (`spawn sh ENOENT`) and `spawn npm ENOENT` (requires `npm.cmd` on Windows).
  2. `src/__tests__/ultraapp/ultraapp-docker.test.ts`: Fails because Docker daemon is not running locally.
  In CI (`.github/workflows/ci.yml`), `npm run test` runs on `ubuntu-latest` where POSIX shells and Linux environments are present, and CI runs green.
  *Inner loop recommendation*: For TDD cycles on Windows, run specific test files (`npx vitest run {file}`) or targeted tests (`npx vitest run {file} -t "{name}"`) rather than the full suite.
- **Coverage**: Generated via `@vitest/coverage-v8` using `npm run test:coverage` (or `npx vitest run --coverage {file}`). Verified functioning.
- **Watch mode**: `npm run test:watch` runs interactive `vitest`.
- **Missing Capabilities**:
  - **Mutation Testing (`mutation: null`)**: StrykerJS (`@stryker-mutator/core`) is not installed. To audit test strength, use deliberate manual mutant spot checks during development.
  - **Property-Based Testing (`property: null`)**: `fast-check` is not installed. Invariants should be covered with explicit parameterized boundary example tests.
  - **Acceptance / E2E (`acceptance: null`)**: No end-to-end framework (e.g. Playwright / Cypress) is present.
  - **Contract Testing (`contract: null`)**: No Pact or contract testing framework installed.
