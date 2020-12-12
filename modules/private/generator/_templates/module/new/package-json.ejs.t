---
to: ../../<%= type %>/<%= h.toSafeName(name) %>/package.json
---

{
  "name": "<%= h.toModuleName(type, name) %>",
  "version": "0.0.1",
  "private": true,
  "description": "<%= description %>",
  "main": "lib/index.js",
  "typings": "lib/index.d.ts",
  "license": "SEE LICENSE IN LICENSE",
  "repository": {
    "type": "git",
    "url": "https://github.com/kamontat/kcutils",
    "directory": "modules/<%= type %>/<%= h.toSafeName(name) %>"
  },
  "author": {
    "name": "Kamontat Chantrachirathumrong",
    "email": "developer@kamontat.net",
    "url": "https://github.com/kamontat"
  },
  "publishConfig": {
    "access": "public"
  },
  "files": [
    "CHANGELOG.md",
    "README.md",
    "lib/**/*.js",
    "lib/**/*.d.ts",
    "**/*.json"
  ],
  "scripts": {
    "build": "",
    "start": "",
    "lint": "",
    "test": "",
    "clean": ""
  },
  "dependencies": {},
  "devDependencies": {}
}
