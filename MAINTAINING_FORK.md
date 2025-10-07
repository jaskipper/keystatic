# Keystatic Fork — jaskipper

**Purpose**
- Keep a small, well‑documented delta on top of upstream Keystatic so we can ship features we need (e.g., defaultSort for collection tables) without waiting on upstream merges.

**Current Customizations**
- Feature: Collection `defaultSort` option used by Admin UI list view.
  - Type: `defaultSort?: { column: 'slug' | 'status' | <field>, direction?: 'ascending' | 'descending' }`
  - UI: the collection table initializes sorting from this value.
  - Code:
    - packages/keystatic/src/config.tsx
    - packages/keystatic/src/app/CollectionPage.tsx
- Feature: Custom admin pages rendered inside Keystatic.
  - Config: declare under `ui.pages` and link via `ui.navigation`.
    ```ts
    ui: {
      navigation: { Directory: ['schools', 'import-schools'] },
      pages: {
        'import-schools': {
          label: 'Import Schools',
          description: 'Upload directory data without leaving Keystatic.',
          render: ({ config, basePath }) => <ImportSchools />,
        },
      },
    }
    ```
  - Routes: `/keystatic/page/<pageKey>` renders inside the AppShell.
  - Dashboard: page entries appear as cards (uses optional description/icon metadata).
  - Code:
    - packages/keystatic/src/config.tsx
    - packages/keystatic/src/app/ui.tsx
    - packages/keystatic/src/app/useNavItems.tsx
    - packages/keystatic/src/app/dashboard/DashboardCards.tsx

**How Consumers Use This Fork**
- Local development on your machine (fastest):
  - `pnpm add @keystatic/core@link:/absolute/path/to/keystatic/packages/keystatic`
- Team consumption without cloning (recommended): publish a tarball and reference its URL
  1. Build and pack:
     - `pnpm -w build`
     - `pnpm -F @keystatic/core pack --pack-destination ./dist-packs`
  2. Upload the generated tarball from `dist-packs/` to a GitHub Release on this repo.
  3. In consumer projects, depend on the tarball URL (works with npm/pnpm/yarn):
     ```json
     {
       "dependencies": {
         "@keystatic/core": "https://github.com/jaskipper/keystatic/releases/download/<tag>/<tarball>.tgz"
       }
     }
     ```
  - Optional: add a pnpm `overrides` entry to force transitive deps to the forked tarball.
- Alternative (requires publishing): publish `@jaskipper/keystatic-core` to npm and alias it:
  ```json
  {
    "dependencies": {
      "@keystatic/core": "npm:@jaskipper/keystatic-core@0.5.48-jsk.1"
    },
    "overrides": {
      "@keystatic/core": "npm:@jaskipper/keystatic-core@0.5.48-jsk.1"
    }
  }
  ```
  Use this only if you’re comfortable publishing your fork to a registry.

Branching Model
- `upstream/main`: mirror of Thinkmill/keystatic `main` (no edits).
- `feat/*` branches: develop features (e.g., `feat/default-sort`).
- `jaskipper/main`: your stable integration branch (merge feature branches here). Rebase onto `upstream/main` regularly.

Syncing With Upstream
1) Ensure upstream remote exists:
   - `git remote add upstream https://github.com/Thinkmill/keystatic.git`
2) Update and rebase:
   - `git fetch upstream`
   - `git checkout jaskipper/main` (or your active branch)
   - `git rebase upstream/main`
3) Build and verify:
   - `pnpm -w i`
   - `pnpm -w build`
4) Push:
   - `git push --force-with-lease`

Release Guidance
- Prefer distributing via GitHub Release tarball so consumers don’t need to clone and package.
- Create annotated tags on this repo (e.g., `jsk-2025.01.05-1` or `jsk-v0.5.48.1`). Pushing a tag matching `jsk-*` will trigger the release workflow.

Release Checklist
1) Ensure `jaskipper/main` is up to date and passes a local build:
   - `./scripts/sync-upstream.sh jaskipper/main`
   - Fix conflicts if any, `git rebase --continue`, `pnpm -w build`
2) Tag the commit:
   - `git tag -a jsk-YYYY.MM.DD-N -m "Release jsk-YYYY.MM.DD-N"`
   - `git push origin jsk-YYYY.MM.DD-N`
3) GitHub Actions will:
   - install + build
   - run `pnpm -F @keystatic/core pack` to produce a tarball
   - create a GitHub Release for the tag and attach the tarball
4) Consumers can install from the tarball URL:
   ```json
   {
     "dependencies": {
       "@keystatic/core": "https://github.com/jaskipper/keystatic/releases/download/jsk-YYYY.MM.DD-N/<tarball>.tgz"
     }
   }
   ```

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
- Custom page 404s: confirm the page key exists in `ui.pages`; add it to `ui.navigation` so it appears in the sidebar/dashboard.
