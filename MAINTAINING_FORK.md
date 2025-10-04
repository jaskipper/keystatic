Keystatic Fork — FiveQ
Purpose
- Keep a small, well‑documented delta on top of upstream Keystatic so we can ship features we need (e.g., defaultSort for collection tables) without waiting on upstream merges.

Current Customizations
- Feature: Collection `defaultSort` option used by Admin UI list view.
  - Type: `defaultSort?: { column: 'slug' | 'status' | <field>, direction?: 'ascending' | 'descending' }`
  - UI: the collection table initializes sorting from this value.
  - Code:
    - packages/keystatic/src/config.tsx
    - packages/keystatic/src/app/CollectionPage.tsx

How Consumers Use This Fork
- Local development (fastest):
  - `pnpm add @keystatic/core@link:/absolute/path/to/keystatic/packages/keystatic`
- Pin to a Git commit (CI/prod friendly):
  - `"@keystatic/core": "github:<your-gh-username>/keystatic#<commit-sha>"`
  - Optional: force this across the app with pnpm overrides:
    ```json
    {
      "overrides": {
        "@keystatic/core": "github:<you>/keystatic#<sha>"
      }
    }
    ```
- Note: The package has a `prepare` script so Git installs automatically build dist.

Branching Model
- `upstream/main`: mirror of Thinkmill/keystatic main (no edits).
- `feat/*` branches: develop features.
- `fiveq/main` (or your primary branch in use): rebased regularly onto `upstream/main`.

Syncing With Upstream
1) Ensure upstream remote exists:
   - `git remote add upstream https://github.com/Thinkmill/keystatic.git`
2) Update and rebase:
   - `git fetch upstream`
   - `git checkout fiveq/main` (or your active branch)
   - `git rebase upstream/main`
3) Build and verify:
   - `pnpm -w i`
   - `pnpm -w build`
4) Push:
   - `git push --force-with-lease`

Release Guidance
- Prefer pinning consumers to commit SHAs.
- If you want tags, create annotated tags on this repo (e.g., `fiveq-v0.5.48+fiveq.1`).

Coding Guidelines For Delta
- Keep changes minimal and config‑driven.
- One feature/change per commit; clear messages.
- Avoid refactors outside the diff’s purpose.
- If code touches public types or UI, prefer adding options over changing defaults.

Contributing Upstream
- When a feature is broadly useful, open a PR to upstream. Keep using this fork in the meantime; remove the delta when merged upstream.

Troubleshooting
- Git install fails to load built files: ensure `prepare` ran. Run `pnpm -w build` in this repo and re‑install.
- Admin list doesn’t reflect default sort: confirm your collection sets `defaultSort` and that the `column` is either `'slug'|'status'` or present in `columns`.

