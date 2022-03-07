import {
  OptionBuilder,
  ActionBuilder,
  Commandline,
  Help,
} from "@kcinternal/runners";

export const help = Help.initial("Help for kc-general").newParagraph(
  `Show general data of kc-core`
);

export const option = OptionBuilder.empty().build();

export const action = ActionBuilder.initial(option, async (_, context) => {
  try {
    const pkg = require("../../../package.json");
    context.log.print(`Commandline`, pkg.version);
  } catch (e) {
    context.log.print(`Commandline`, "__dev__");
  }

  return [];
})
  .help(help)
  .build();

export const commandline = Commandline.initial(action);
