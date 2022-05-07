#!/usr/bin/env node

const cmd = process.argv[2];
if (cmd) {
  const args = process.argv.slice(3);
  const index = require("../lib/index.js");

  if (index[cmd]) {
    index[cmd](args);
  } else {
    const keys = Object.keys(index).join(",");
    throw new Error("expected '" + keys + "' but receive '" + cmd + "'");
  }
}
