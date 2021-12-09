#!/usr/bin/env bash

echo '##### Global config #####'
git config --global --list
echo '##### Local config (Before change) #####'
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

echo '##### Local config (After change) #####'
git config --local --list
