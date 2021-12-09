#!/usr/bin/env bash

if test -n "$GPG_IDENTIFY_KEY"; then
  gpg --batch --yes --delete-secret-key "$GPG_IDENTIFY_KEY"
  gpg --batch --yes --delete-key "$GPG_IDENTIFY_KEY"
else
  echo "[error] Require git username to set" >&2
  exit 1
fi

echo '##### Secret key #####'
gpg --keyid-format LONG --list-secret-key
