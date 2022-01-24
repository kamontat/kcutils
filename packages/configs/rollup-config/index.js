const rollup = require("rollup");
const constants = require("./src/constants");
const { buildUnscopedName, buildFormat, buildPlugins } = require("./src/utils");

/**
 * @argument {{
 *    pkg: any
 *    formats: ("umd" | "cjs" | "es")[]
 *    map?: boolean
 *    compact?: boolean
 *    overrided?: import("rollup").OutputOptions
 * }} opt
 * @return {import("rollup").RollupOptions}
 */
function build(opt) {
  const name = buildUnscopedName(opt.pkg.name);
  const sourcemap = opt.map ? opt.map : true;
  const compact = opt.compact ? opt.compact : true;
  const input = opt.pkg.typedocMain;
  if (opt.formats.length < 1) {
    throw new Error(`Format cannot be undefined`);
  } else if (!input) {
    throw new Error(`Input cannot be undefined`);
  }

  /**
   * @type {import("rollup").OutputOptions[]}
   */
  const output = [];

  /** @type {{[key: string]: boolean}} */
  const checkDuplicate = {};
  for (const format of opt.formats) {
    if (!checkDuplicate[format]) {
      checkDuplicate[format] = true;
    }

    const formatObject = buildFormat(opt.pkg, format);
    const baseObject = {
      name,
      file: formatObject.outfile,
      format: formatObject.id,
      sourcemap,
      compact,
    };
    if (opt.overrided) {
      output.push(Object.assign(baseObject, opt.overrided));
    } else {
      output.push(baseObject);
    }
  }

  const plugins = buildPlugins(opt.formats[0]);
  return {
    input,
    output,
    plugins,
  };
}

/**
 * @param {any} pkg package.json content
 * @param {import("rollup").OutputOptions[]} overrided custom rollup config
 */
function buildBrowser(pkg, overrided) {
  return build({ pkg, formats: ["umd"], map: true, compact: true, overrided });
}

/**
 * @param {any} pkg package.json content
 * @param {import("rollup").OutputOptions[]} overrided custom rollup config
 */
function buildCommonJS(pkg, overrided) {
  return build({
    pkg,
    formats: ["cjs"],
    map: true,
    compact: true,
    overrided,
  });
}

/**
 * @param {any} pkg package.json content
 * @param {import("rollup").OutputOptions[]} overrided custom rollup config
 */
function buildModuleJS(pkg, overrided) {
  return build({
    pkg,
    formats: ["es"],
    map: true,
    compact: true,
    overrided,
  });
}

/**
 * @param {any} pkg package.json content
 * @param {import("rollup").OutputOptions[]} overrided custom rollup config
 */
function buildCommonJSModuleJS(pkg, overrided) {
  return build({
    pkg,
    formats: ["cjs", "es"],
    map: true,
    compact: true,
    overrided,
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

/**
 *
 * @param {import("rollup").RollupOptions} overrided
 * @param {import("rollup").RollupOptions[]} options
 * @returns {import("rollup").RollupOptions[]}
 */
function dinitial(overrided, ...options) {
  const results = options.map((opt) => {
    return Object.assign(opt, overrided);
  });

  return initial(...results);
}

module.exports = {
  buildBrowser,
  buildCommonJS,
  buildModuleJS,
  buildCommonJSModuleJS,
  initial,
  dinitial,
};
