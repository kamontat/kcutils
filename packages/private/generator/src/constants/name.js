const categories = {
  CONFIG: "configs",
  TYPE: "typings",
  PRIVATE: "private",
  INTERNAL: "internal",
  PUBLIC: "public",
};

const namespaces = {
  CONFIG: "kcconfig",
  TYPE: "types",
  PRIVATE: "kcprivate",
  INTERNAL: "kcinternal",
  PUBLIC: "kcutils",
};

/**
 * return true if input category is valid
 * @param {string} category package category
 * @returns {boolean} true or false
 */
const validateCategory = (category) => {
  return Object.keys(categories).some((key) => {
    return categories[key] === category;
  });
};

/**
 * return true if input namespace is valid
 * @param {string} namespace package namespace (scoped name in nodejs)
 * @returns {boolean} true or false
 */
const validateNamespace = (namespace) => {
  return Object.keys(namespaces).some((key) => {
    return namespaces[key] === namespace;
  });
};

/**
 * convert raw name to normalize name that can use everywhere
 * @param {string} name raw name input from user
 * @returns {string} safe name to add in package
 */
const toSafeName = (name) => {
  return name.replace(/ /g, "-").toLowerCase();
};

/**
 *
 * @param {string} category package category
 * @returns package namespace (use in nodejs package)
 */
const toNamespace = (category) => {
  switch (category) {
    case categories.PRIVATE:
      return namespaces.PRIVATE;
    case categories.TYPE:
      return namespaces.TYPE;
    case categories.CONFIG:
      return namespaces.CONFIG;
    case categories.INTERNAL:
      return namespaces.INTERNAL;
    case categories.PUBLIC:
      return namespaces.PUBLIC;
  }
};

/**
 * convert package information to name
 * @param {string} category package categories
 * @param {string} name package name
 * @returns safe normalize package name
 */
const toPackageName = (category, name) => `@${toNamespace(category)}/${name}`;

module.exports = {
  categories,
  namespaces,
  toSafeName,
  toNamespace,
  toPackageName,
  validateCategory,
  validateNamespace,
};
