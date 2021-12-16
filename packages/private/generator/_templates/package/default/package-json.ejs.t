---
to: <%= h.location.buildPath(type, name, "package.json") %>
---

{
  "name": "<%= h.name.toPackageName(type, name) %>",
  "description": "<%= description %>",
  "version": "<%= version %>",
  "private": "<%= h.package.isPrivate(type) %>",
  "typedocMain": "index.ts",
  "main": "lib/index.cjs.js",
  "module": "lib/index.esm.js",
  "browser": "lib/index.umd.js",
  "types": "lib/index.d.ts",
  "license": "SEE LICENSE IN LICENSE",
  "homepage": "<%= h.location.buildHomepage(type, name) %>",
  "repository": {
    "type": "git",
    "url": "<%= h.location.url.GITHUB %>",
    "directory": "<%= h.location.buildPackagePath(type, name) %>"
  }
}
