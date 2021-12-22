const { categories } = require("../constants/name");

/**
 * return true if package is private category
 *
 * @param {string} category package category
 * @returns true if category is private
 */
const isPrivate = (category) => categories.PRIVATE === category;

module.exports = { isPrivate };
