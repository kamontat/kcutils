/**
 * join array with comma
 * @param {string[]} arr input array
 * @returns {string} joined string with comma-separator
 */
const join = (arr) => {
  const output = arr.reduce((p, c) => {
    if (!p) return `"${c}"`;
    else return `${p},"${c}"`;
  }, "");

  console.log(output);
  return output;
};

module.exports = { join };
