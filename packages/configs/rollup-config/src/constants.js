const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const typescript = require("@rollup/plugin-typescript");
const terser = require("rollup-plugin-terser");

const ts = typescript({ outputToFilesystem: true, tsconfig: "./tsconfig.json" }); // so Rollup can convert typescript
const rs = resolve.default(); // so Rollup can find `library`
const cjs = commonjs(); // so Rollup can convert `library` to an ES module
const tsr = terser.terser(); // so Rollup can minify code via terser algorithm

/**
 * default typescript only plugins for rollup
 */
const pluginsTsOnly = [ts];

/**
 * default plugins for rollup
 */
const pluginsDefault = [rs, cjs, ts];

/**
 * default plugins for rollup + minify code with terser
 */
const pluginsDefaultMinify = [rs, cjs, ts, tsr];

const output = {
  pluginsTsOnly,
  pluginsDefault,
  pluginsDefaultMinify,
};

module.exports = output;
