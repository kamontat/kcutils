#!/usr/bin/env bash

echo '##### Config (Before change) #####'
git config --local --list

if test -n "$GIT_USERNAME"; then
  git config --local user.name "$GIT_USERNAME"
else
  echo "[error] Require git username to set" >&2
  exit 1
fi

if test -n "$GIT_EMAIL"; then
  git config --local user.email "$GIT_EMAIL"
else
  echo "[error] Require git email to set" >&2
  exit 1
fi

# Update remote url to support gh-page
if test -n "$GITHUB_TOKEN"; then
  git remote set-url origin "https://git:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git"
fi

echo '##### Config (After change) #####'
git config --local --list
