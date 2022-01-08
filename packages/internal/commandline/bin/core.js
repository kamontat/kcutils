#!/usr/bin/env node

const cmd = process.argv[2];
if (cmd) {
  const args = process.argv.slice(3);
  require("../lib/index.js")[cmd](args);
}
