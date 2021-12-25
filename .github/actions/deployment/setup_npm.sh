#!/usr/bin/env bash

npm set https://registry.npmjs.org/:_authToken "$NPM_TOKEN"
npm whoami
