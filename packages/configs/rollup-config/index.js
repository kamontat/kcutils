const constants = require("./constants");
const { buildUnscopedName } = require("./utils");

/**
 * @argument {{
 *    pkg: any
 *    format: "umd" | "cjs" | "es"
 *    input?: string
 *    map?: boolean
 * }} opt
 * @return {import("rollup").RollupOptions}
 */
function build(opt) {
  const name = buildUnscopedName(opt.pkg.name);
  const filename = opt.pkg.browser
    ? opt.pkg.browser
    : `lib/index.${opt.format}.js`;
  const sourcemap = opt.map ? opt.map : true;

  const input = opt.input ? opt.input : "input.ts";

  /**
   * @type {import("rollup").OutputOptions}
   */
  const output = {
    name,
    file: filename,
    format: opt.format,
    sourcemap,
  };
  const plugins =
    opt.format === "umd"
      ? constants.pluginsDefaultMinify
      : opt.format === "cjs"
      ? constants.pluginsDefault
      : constants.pluginsTsOnly;

  return {
    input,
    output,
    plugins,
  };
}

/**
 * @param {any} pkg package.json content
 */
function buildBrowser(pkg) {
  return build({ pkg, format: "umd", input: pkg.browser, map: true });
}

/**
 * @param {any} pkg package.json content
 */
function buildCommonJS(pkg) {
  return build({ pkg, format: "cjs", input: pkg.main, map: true });
}

/**
 * @param {any} pkg package.json content
 */
function buildModuleJS(pkg) {
  return build({ pkg, format: "es", input: pkg.module, map: true });
}

module.exports = { buildBrowser, buildCommonJS, buildModuleJS };
