// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples

const { repo } = require("../../../lib/src");

module.exports = [
  {
    type: "autocomplete",
    name: "package",
    message: "What is your's package name?",
    choices: repo.listPackages(),
    limit: 5,
  },
  {
    type: "confirm",
    name: "browser",
    message: (context) => {
      const answers = context.answers;
      const pkg = repo.getPackage(answers.package);
      const mode = pkg.pjson.browser ? "nodejs" : "browser";
      return `Change to '${mode}' mode?`;
    },
    initial: true,
  },
];
