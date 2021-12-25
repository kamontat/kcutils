import del from "del";

import { Commandline, OptionBuilder, ActionBuilder } from "@kcinternal/runners";

const printHelp = () => {
  console.log(`# Help for kc-clean

help clean all caches and tmp files, add --all to also remove node_module and yarn.lock file`);
};

export default (args: string[]) => {
  const option = OptionBuilder.empty().build();

  const action = ActionBuilder.initial(option, async (option) => {
    if (option.help) {
      printHelp();
      return [];
    }

    const removeRegex = ["**/*.log"];
    return removeRegex;
  }).build();

  Commandline.initial(action, (_context, data) => {
    del(data.commands, {
      dryRun: data.option?.dryrun ?? false,
    });
  }).start(args);
};
