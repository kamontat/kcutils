const types = {
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
 * return true if input type is valid
 * @param {string} type package type
 * @returns {boolean} true or false
 */
const validateType = (type) => {
  return Object.keys(types).some((key) => {
    return types[key] === type;
  });
};

/**
 * return true if input namespace is valid
 * @param {string} namespace package scoped
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
  return name.replace(/ /g, "-").toLowerCase()
}

/**
 *
 * @param {string} type package type
 * @returns namespace to input type
 */
const toNamespace = (type) => {
  switch (type) {
    case types.PRIVATE:
      return namespaces.PRIVATE;
    case types.TYPE:
      return namespaces.TYPE;
    case types.CONFIG:
      return namespaces.CONFIG;
    case types.INTERNAL:
      return namespaces.INTERNAL;
    case types.PUBLIC:
      return namespaces.PUBLIC;
  }
};

/**
 * convert package information to name
 * @param {string} type package type
 * @param {string} name package name
 * @returns safe normalize package name
 */
 const toPackageName = (type, name) => `@${toNamespace(type)}/${name}`;

module.exports = {
  types,
  namespaces,
  toSafeName,
  toNamespace,
  toPackageName,
  validateType,
  validateNamespace,
};
