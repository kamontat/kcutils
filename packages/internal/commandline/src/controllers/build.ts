import {
  OptionBuilder,
  ActionBuilder,
  Commandline,
  Help,
} from "@kcinternal/runners";

export const help = Help.initial("Help for kc-build").newParagraph(
  `build application follow kcmono setup guideline.
current we support 2 type of build/compile, tsc and rollup.`
);

export const option = OptionBuilder.empty().build();

export const action = ActionBuilder.initial(option, async (option, context) => {
  const rollupConfig = await context.location.isExist("rollup.config.js");
  if (rollupConfig) {
    context.log.debug("detection", "found rollup config");
    return context.command.rollup();
  } else {
    context.log.debug("detection", "fallback to tsc config");
    const tscConfig = await context.location.findExist(
      "tsconfig.prod.json",
      "tsconfig.json"
    );

    return context.command.tsc(tscConfig);
  }
})
  .help(help)
  .build();

export const commandline = Commandline.initial(action);
