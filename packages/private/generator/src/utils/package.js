const { types } = require("../constants/name");

const isPrivate = (type) => types.PRIVATE === type;

module.exports = { isPrivate };
