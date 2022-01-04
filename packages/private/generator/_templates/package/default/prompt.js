// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples

const { name, validator } = require("../../../lib/src");

module.exports = [
  {
    type: "autocomplete",
    name: "compiler",
    message: "What's new package compiler?",
    choices: ["tsc", "rollup"],
    initial: "rollup",
  },
  {
    type: "autocomplete",
    name: "category",
    message: "What's new package category?",
    choices: ["public", "internal", "private", "configs", "typings"],
  },
  {
    type: "input",
    name: "name",
    message: "What's new package name?",
    format: name.toSafeName,
    result: name.toSafeName,
    validate: validator.mustNotEmpty,
  },
  {
    type: "input",
    name: "description",
    message: "What's new package description?",
  },
  {
    type: "input",
    name: "version",
    message: "What's new package initial version?",
    initial: "1.0.0-alpha.1",
  },
  {
    type: "list",
    name: "keywords",
    message: "What's new package keywords (comma-separated keywords)",
  },
  {
    type: "confirm",
    name: "browser",
    message: "Is browser supported",
    initial: false,
  },
];
