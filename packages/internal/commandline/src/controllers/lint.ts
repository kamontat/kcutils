import {
  Option,
  OptionBuilder,
  ActionBuilder,
  Commandline,
  Help,
} from "@kcinternal/runners";

export const help = Help.initial("Help for kc-lint").newParagraph(
  `lint application follow kcmono setup guideline.
run eslint with auto configure setup. Pass --fix to
auto fix errors if possible.`
);

export const option = OptionBuilder.initial({
  fix: {
    defaultValue: false,
    fn: Option.toBoolean,
    alias: ["F"],
  },
}).build();

export const action = ActionBuilder.initial(option, async (option, context) => {
  const prefixArguments = [];
  try {
    const eslintConfig = await context.location.findExist(
      ".eslintrc",
      ".eslintrc.json",
      ".eslintrc.js"
    );

    if (option.fix) prefixArguments.push("--fix");
    return context.command.eslint(
      eslintConfig,
      ...prefixArguments,
      ".",
      ...option.raw,
      ...option.extraArgs
    );
  } catch (e) {
    throw new Error("Cannot find eslint config file to run");
  }
})
  .help(help)
  .build();

export const commandline = Commandline.initial(action);
