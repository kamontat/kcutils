import {
  OptionBuilder,
  ActionBuilder,
  Commandline,
  Help,
} from "@kcinternal/runners";

export const help = Help.initial("Help for kc-test").newParagraph(
  `test application follow kcmono setup guideline.
run jest with pre configure for kcmono repository. guideline`
);

export const option = OptionBuilder.empty().build();

export const action = ActionBuilder.initial(option, async (option, context) => {
  const jestConfig = await context.location.findExist("jest.config.js");
  const args = [];
  if (jestConfig) {
    if (context.env.isCI()) {
      args.push(
        "--runInBand",
        "--reporters",
        "jest-junit",
        "--coverageReporters",
        "text-summary",
        "lcov"
      );
    }

    return context.command.jest(jestConfig, ...args);
  }

  throw new Error("Cannot find jest.config.js file to run");
})
  .help(help)
  .build();

export const commandline = Commandline.initial(action);
