import {
  Commandline,
  Option,
  OptionBuilder,
  ActionBuilder,
} from "@kcinternal/runners";

const printHelp = () => {
  console.log(`# Help for kc-start

help start application without specify javascript location.
default application is 'main' key in package.json or 'lib/index.js'.
use --file <file_name> to custom file to run and --build to autobuild mode`);
};

export default async (args: string[]) => {
  const option = OptionBuilder.initial({
    file: {
      defaultValue: "",
      fn: Option.none,
      alias: ["F"],
    },
    build: {
      defaultValue: false,
      fn: Option.toBoolean,
      alias: ["B"],
    },
  }).build();

  const action = ActionBuilder.initial(option, async (option, context) => {
    if (option.help) {
      printHelp();
      return [];
    }

    const file = context.general.getOr(
      "",
      option.file,
      context.package.getMain()
    );

    if (file === "") {
      throw new Error("Cannot find main file to run");
    }
    return context.command.node(file);
  }).build();

  await Commandline.initial(action).start(args);
};
