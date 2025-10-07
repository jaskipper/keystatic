<a href="https://keystatic.thinkmill.com.au/">
  <img src=".github/keystatic-banner.svg" alt="Keystatic">
  </br>
  </br>
</a>
<p>
  <a aria-label="NPM version" href="https://www.npmjs.com/package/@keystatic/core">
    <img alt="" src="https://img.shields.io/npm/v/@keystatic/core.svg?style=for-the-badge&labelColor=0869B8">
  </a>
  <a aria-label="Website" href="https://keystatic.thinkmill.com.au/">
    <img src="https://img.shields.io/badge/Website-2F6BFF.svg?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0iZmVhdGhlciBmZWF0aGVyLWdsb2JlIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCI+PC9jaXJjbGU+PGxpbmUgeDE9IjIiIHkxPSIxMiIgeDI9IjIyIiB5Mj0iMTIiPjwvbGluZT48cGF0aCBkPSJNMTIgMmExNS4zIDE1LjMgMCAwIDEgNCAxMCAxNS4zIDE1LjMgMCAwIDEtNCAxMCAxNS4zIDE1LjMgMCAwIDEtNC0xMCAxNS4zIDE1LjMgMCAwIDEgNC0xMHoiPjwvcGF0aD48L3N2Zz4=&labelColor=0737ad&locoColor=white&logoWidth=0">
  </a>
</p>

---

First‑class, file‑based CMS with a strongly‑typed API for modern frameworks. Content lives in Git (Markdown, YAML, JSON) — no database required.

Built with DNA from Keystone and designed to integrate seamlessly with Next.js, Remix, and Astro.

---

## About This Fork

This repository is a maintained fork of the official Keystatic project by Thinkmill. It keeps a small, well‑documented delta to support features we need ahead of upstream.

- Upstream project (official): https://github.com/Thinkmill/keystatic
- Documentation (official): https://keystatic.com/docs/introduction
- Fork notes and scope: see `MAINTAINING_FORK.md`

What’s included in this fork (high‑level):
- Collection `defaultSort` option used by the Admin UI list view.
- Support for custom admin pages rendered inside Keystatic and linked from navigation/dashboard.

The API surface remains compatible with upstream unless noted in the fork notes.

---

## Install (Fork)

Use this fork as a drop‑in for `@keystatic/core` by depending on a GitHub Release tarball:

```sh
# pnpm
pnpm add @keystatic/core@https://github.com/jaskipper/keystatic/releases/download/<tag>/keystatic-core-<version>.tgz

# npm
npm i @keystatic/core@https://github.com/jaskipper/keystatic/releases/download/<tag>/keystatic-core-<version>.tgz

# yarn
yarn add @keystatic/core@https://github.com/jaskipper/keystatic/releases/download/<tag>/keystatic-core-<version>.tgz
```

Version tags are suffixed for clarity (for example `0.5.48-jsk.1`). See `MAINTAINING_FORK.md` for packaging and release details.

To pin in `package.json`:

```json
{
  "dependencies": {
    "@keystatic/core": "https://github.com/jaskipper/keystatic/releases/download/<tag>/keystatic-core-<version>.tgz"
  }
}
```

If you don’t need the fork‑specific features, use the official package from npm instead: `@keystatic/core`.

---

## Compatibility & Versioning

- Tracks upstream `main` regularly; differences are minimal and documented.
- API compatibility with upstream is maintained where possible.
- Fork builds use a version suffix (for example `-jsk.N`) to distinguish from upstream releases.

---

## Documentation

For general Keystatic concepts, configuration, and guides, refer to the official documentation: https://keystatic.com/docs/introduction

Fork‑specific options and usage notes are documented in `MAINTAINING_FORK.md`.

---

## Local Development (Monorepo)

This repository includes dev projects and examples for working on Keystatic itself.

```sh
pnpm install
cd dev-projects/{example}
pnpm run dev
```

Requirements
- Node.js v18
- pnpm (recommended via Corepack: `corepack enable pnpm`)

Note: the dev projects are for testing and feature development; they are not intended as production project starters. For app‑level getting started guides, see the official docs.

---

## Releases

Fork releases are distributed as GitHub Release tarballs. See `MAINTAINING_FORK.md` for the release workflow and how to generate and consume artifacts.

---

## Acknowledgements

Keystatic is an open‑source project by Thinkmill. This repository is a community‑maintained fork. For the canonical source, issues, and discussions, visit the upstream project:

- Repository: https://github.com/Thinkmill/keystatic
- Discussions: https://github.com/Thinkmill/keystatic/discussions

---

## License

MIT — Copyright (c) Thinkmill Labs Pty Ltd.
