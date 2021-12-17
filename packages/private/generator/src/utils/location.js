const path = require("path");

const url = {
  GITHUB: "https://github.com/kamontat",
  GITHUB_REPO: "https://github.com/kamontat/kcutils",
};

/**
 *
 * @param {string} type package type
 * @param {string} name package name
 * @param  {...string[]} args filepath from package location
 * @returns {string} relative path from generator to input filepath
 */
const buildPath = (type, name, ...args) =>
  path.join("..", "..", type, name, ...args);

/**
 * build package path from root directory
 * @param {string} type package type
 * @param {string} name package name
 * @returns {string} packages path
 */
const buildPackagePath = (type, name) => `packages/${type}/${name}`;

/**
 * build homepage url
 * @param {string} type package type
 * @param {string} name package name
 * @returns {string} github homepage
 */
const buildHomepage = (type, name) =>
  `${url.GITHUB}/tree/main/${buildPackagePath(type, name)}`;

module.exports = { url, buildPath, buildPackagePath, buildHomepage };
