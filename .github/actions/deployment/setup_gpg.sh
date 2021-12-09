#!/usr/bin/env bash

if test -n "$GPG_PRIVATE_KEY_BASE64"; then
  echo "$GPG_PRIVATE_KEY_BASE64" | base64 --decode | gpg --batch --allow-secret-key-import --import
else
  echo "[error] Require private key in base64 to set" >&2
  exit 1
fi

if test -n "$GPG_SIGNING_KEY"; then
  git config --local user.signingKey "$GPG_SIGNING_KEY"
else
  echo "[error] Require gpg signing key to set" >&2
  exit 1
fi
