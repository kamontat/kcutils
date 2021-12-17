const { types } = require("../constants/name");

/**
 * return true if package type must be private
 *
 * @param {string} type package type
 * @returns if input type is private package
 */
const isPrivate = (type) => types.PRIVATE === type;

module.exports = { isPrivate };
