// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples
//
module.exports = [{
  type: "autocomplete",
  name: "type",
  message: "What's new module type?",
  choices: ["private", "internal", "public"],
}, {
  type: "input",
  name: "name",
  message: "What's new module name?"
}, {
  type: "input",
  name: "description",
  message: "What's new module description?"
}]
