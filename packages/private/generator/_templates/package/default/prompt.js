// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples

const { name, validator } = require("../../../lib/src");

module.exports = [
  {
    type: "autocomplete",
    name: "compiler",
    message: "What's new package compiler?",
    choices: ["rollup", "tsc"],
  },
  {
    type: "autocomplete",
    name: "category",
    message: "What's new package category?",
    choices: name.categoryChoices,
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
    initial: "0.1.0",
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
