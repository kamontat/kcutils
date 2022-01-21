import { version } from "../../package.json";
import {
  OptionBuilder,
  ActionBuilder,
  Commandline,
  Help,
  _version,
} from "@kcinternal/runners";

export const help = Help.initial("Help for kc-general").newParagraph(
  `Show general data of kc-core`
);

export const option = OptionBuilder.empty().build();

export const action = ActionBuilder.initial(option, async (_, context) => {
  context.log.print(`Runner`, _version);
  context.log.print("Commandline", version);
  return [];
})
  .help(help)
  .build();

export const commandline = Commandline.initial(action);
