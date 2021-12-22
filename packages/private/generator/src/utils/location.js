const path = require("path");

const url = {
  GITHUB: "https://github.com/kamontat",
  GITHUB_REPO: "https://github.com/kamontat/kcutils",
};

/**
 * you should use this on this syntax `skipIf(compiler === "tsc", buildPath(category, name, "README.md"))`
 * @param {boolean} checker if true will return null, otherwise, return path out
 * @param {string} path package path to skip
 */
const skipIf = (checker, path) => {
  if (checker) return null;
  return path;
};

/**
 * build file/directory relative path from input package information
 * @param {string} category package category
 * @param {string} name package name
 * @param  {...string[]} args filepath from package location
 * @returns {string} relative path from generator to input filepath
 */
const buildPath = (category, name, ...args) =>
  path.join("..", "..", category, name, ...args);

/**
 * build package relative path from root directory
 * @param {string} category package category
 * @param {string} name package name
 * @returns {string} packages path
 */
const buildPackagePath = (category, name) => `packages/${category}/${name}`;

/**
 * build homepage url (in Github)
 * @param {string} category package category
 * @param {string} name package name
 * @returns {string} github homepage
 */
const buildHomepage = (category, name) =>
  `${url.GITHUB}/tree/main/${buildPackagePath(category, name)}`;

module.exports = { url, skipIf, buildPath, buildPackagePath, buildHomepage };
