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

module.exports = {
  buildUnscopedName,
};
