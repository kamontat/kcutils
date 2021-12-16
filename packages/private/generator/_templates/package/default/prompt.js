// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples

const { toSafeName } = require("../../../src/constants/name");
const { mustNotEmpty } = require("../../../src/utils/validate");

module.exports = [
  {
    type: "autocomplete",
    name: "type",
    message: "What's new package type?",
    choices: ["public", "internal", "private", "configs", "typings"],
  },
  {
    type: "input",
    name: "name",
    message: "What's new package name?",
    format: toSafeName,
    result: toSafeName,
    validate: mustNotEmpty,
  },{
    type: "input",
    name: "description",
    message: "What's new package description?"
  },
  {
    type: "input",
    name: "version",
    message: "What's new package initial version?",
    initial: "1.0.0-alpha.1",
  },
];
