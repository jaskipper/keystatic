#!/usr/bin/env bash
set -euo pipefail

# Sync this fork with upstream Thinkmill/keystatic main
# Usage: ./scripts/sync-upstream.sh [branch]
# Default branch is fiveq/main if present, else current branch.

BRANCH="${1:-}"
if [[ -z "$BRANCH" ]]; then
  if git show-ref --verify --quiet refs/heads/fiveq/main; then
    BRANCH="fiveq/main"
  else
    BRANCH="$(git rev-parse --abbrev-ref HEAD)"
  fi
fi

echo "Syncing branch: $BRANCH"

if ! git remote get-url upstream >/dev/null 2>&1; then
  echo "Adding upstream remote..."
  git remote add upstream https://github.com/Thinkmill/keystatic.git
fi

git fetch upstream
git checkout "$BRANCH"
git rebase upstream/main

echo "Installing and building workspace..."
pnpm -w i
pnpm -w build

echo "Done. Push with: git push --force-with-lease origin $BRANCH"

