import {
  OptionBuilder,
  ActionBuilder,
  Commandline,
  Help,
} from "@kcinternal/runners";

export const help = Help.initial("Help for kc-lint").newParagraph(
  `lint application follow kcmono setup guideline.
run eslint with auto configure setup.`
);

export const option = OptionBuilder.empty().build();

export const action = ActionBuilder.initial(option, async (option, context) => {
  const eslintConfig = await context.location.findExist(
    ".eslintrc",
    ".eslintrc.json",
    ".eslintrc.js"
  );

  if (eslintConfig) {
    return context.command.eslint(
      eslintConfig,
      ".",
      ...option.raw,
      ...option.extraArgs
    );
  }

  throw new Error("Cannot find eslint config file to run");
})
  .help(help)
  .build();

export const commandline = Commandline.initial(action);
