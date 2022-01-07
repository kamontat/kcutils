const constants = require("./constants");

/**
 * @argument {string} packageName package name from package.json `name`
 * @return {string} unscoped name
 */
const buildUnscopedName = (packageName) => {
  const regex = /@([a-z]+)\/(.*)/;
  const result = regex.exec(packageName);
  if (result && result.length >= 2) {
    const scopeName = result[1].replace(/^kc/, "").replace("-", "_");
    const name = result[2].replace("-", "_");
    return `${scopeName}_${name}`;
  } else {
    // not scoped name, just return without do anything
    return packageName.replace("-", "_");
  }
};

const validOutputFile = (id, outfile) => {
  if (!outfile) {
    throw new Error(`Output cannot be undefined (type=${id})`);
  }

  return outfile;
};

/**
 * convert output format enum to object
 * @param {any} pkg package.json content
 * @param {"es" | "cjs" | "umd"} format output format
 * @return {{
 *    "id": "es" | "cjs" | "umd" | "",
 *    "outfile": string,
 * }}
 */
const buildFormat = (pkg, format) => {
  switch (format) {
    case "cjs":
      return {
        id: "cjs",
        outfile: validOutputFile(format, pkg.main),
      };
    case "es":
      return {
        id: "es",
        outfile: validOutputFile(format, pkg.module),
      };
    case "umd":
      return {
        id: "umd",
        outfile: validOutputFile(format, pkg.browser),
      };
  }

  return {
    id: "",
    outfile: "",
  };
};

/**
 * select plugins base on rollup config
 * @param {"umd" | "cjs" | "es"} format
 */
const buildPlugins = (format) => {
  switch (format) {
    case "umd":
      return constants.pluginsDefaultMinify;
    case "cjs":
      return constants.pluginsDefault;
    default:
      return constants.pluginsTsOnly;
  }
};

module.exports = {
  buildUnscopedName,
  buildFormat,
  buildPlugins,
};
