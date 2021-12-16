const rollup = require("rollup");
const constants = require("./src/constants");
const { buildUnscopedName, buildFormat } = require("./src/utils");

/**
 * @argument {{
 *    pkg: any
 *    format: "umd" | "cjs" | "es"
 *    extraFormat?: "umd" | "cjs" | "es"
 *    map?: boolean
 *    compact?: boolean
 * }} opt
 * @return {import("rollup").RollupOptions}
 */
function build(opt) {
  const name = buildUnscopedName(opt.pkg.name);
  const sourcemap = opt.map ? opt.map : true;
  const compact = opt.compact ? opt.compact : true;
  const format = buildFormat(opt.pkg, opt.format);

  const input = opt.pkg.typedocMain;
  if (!input) {
    throw new Error(`Input cannot be undefined (type=${format.id})`);
  }

  /**
   * @type {import("rollup").OutputOptions[]}
   */
  const output = [];
  output.push({
    name,
    file: format.outfile,
    format: format.id,
    sourcemap,
    compact,
  });

  if (opt.extraFormat) {
    const extraFormat = buildFormat(opt.pkg, opt.extraFormat);
    output.push({
      name,
      file: extraFormat.outfile,
      format: extraFormat.id,
      sourcemap,
      compact,
    });
  }

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
  return build({ pkg, format: "umd", map: true, compact: true });
}

/**
 * @param {any} pkg package.json content
 */
function buildCommonJS(pkg) {
  return build({
    pkg,
    format: "cjs",
    map: true,
    compact: true,
  });
}

/**
 * @param {any} pkg package.json content
 */
function buildModuleJS(pkg) {
  return build({
    pkg,
    format: "es",
    map: true,
    compact: true,
  });
}

/**
 * @param {any} pkg package.json content
 */
function buildCommonJSModuleJS(pkg) {
  return build({
    pkg,
    format: "cjs",
    extraFormat: "es",
    map: true,
    compact: true,
  });
}

/**
 *
 * @param {import("rollup").RollupOptions[]} options
 * @returns {import("rollup").RollupOptions[]}
 */
function initial(...options) {
  return rollup.defineConfig(options);
}

module.exports = {
  buildBrowser,
  buildCommonJS,
  buildModuleJS,
  buildCommonJSModuleJS,
  initial,
};
