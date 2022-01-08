import del from "del";
import {
  OptionBuilder,
  Option,
  ActionBuilder,
  Commandline,
  Help,
} from "@kcinternal/runners";

export const help = Help.initial("Help for kc-clean").newParagraph(
  `help clean all caches and tmp files, add '--all' to also remove node_module and yarn.lock file`
);

export const option = OptionBuilder.initial({
  all: {
    defaultValue: false,
    fn: Option.toBoolean,
    alias: ["A"],
  },
}).build();

export const action = ActionBuilder.initial(option, async (option) => {
  const removeRegex = [
    "**/*.tsbuildinfo",
    "**/*.log",
    "dist",
    "lib",
    "temp",
    "tmp",
    "reports",
    "coverage",
    "junit.xml",
    ".stryker-tmp",
    ".rollup.cache",
  ];
  if (option.all) {
    removeRegex.push("yarn.lock", "node_modules");
  }
  return removeRegex;
})
  .help(help)
  .build();

export const commandline = Commandline.initial(
  action,
  async (context, data) => {
    const results = await del(data.commands, {
      dryRun: data.option?.dryrun ?? false,
    });

    results.forEach((v, i) => {
      context.log.debug(
        `${i + 1}) ${data.option?.dryrun ? "Removing" : "Removed"} ${v}`
      );
    });
  }
);
