import del from "del";

import {
  Commandline,
  Option,
  OptionBuilder,
  ActionBuilder,
} from "@kcinternal/runners";

const printHelp = () => {
  console.log(`# Help for kc-clean

help clean all caches and tmp files, add --all to also remove node_module and yarn.lock file`);
};

export default (args: string[]) => {
  const option = OptionBuilder.initial({
    all: {
      defaultValue: false,
      fn: Option.toBoolean,
      alias: ["A"],
    },
  }).build();

  const action = ActionBuilder.initial(option, async (option) => {
    if (option.help) {
      printHelp();
      return [];
    }

    const removeRegex = ["**/*.log", "lib", "coverage", "dist", "reports"];
    if (option.all) {
      removeRegex.push("yarn.lock", "node_modules");
    }
    return removeRegex;
  }).build();

  Commandline.initial(action, async (_context, data) => {
    const results = await del(data.commands, {
      dryRun: data.option?.dryrun ?? false,
    });

    results.forEach((v, i) => {
      console.log(`${i + 1}) remove ${v}`);
    });
  }).start(args);
};
