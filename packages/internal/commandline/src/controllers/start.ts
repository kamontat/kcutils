import {
  OptionBuilder,
  Option,
  ActionBuilder,
  Commandline,
  Help,
} from "@kcinternal/runners";

export const help = Help.initial("Help for kc-start").newParagraph(
  `help start application without specify javascript location.
default application is 'main' key in package.json or 'lib/index.js'.
use --file <file_name> to custom file to run and --build to autobuild mode`
);

export const option = OptionBuilder.initial({
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

export const action = ActionBuilder.initial(option, async (option, context) => {
  const isFileExist = await context.location.isExist(option.file);
  context.log.print(`file`, option.file);
  context.log.print(`isFileExist`, isFileExist);

  const file = context.general.getOr(
    "",
    option.file,
    context.package.getMain()
  );

  if (file === "") {
    throw new Error("Cannot find main file to run");
  }
  return context.command.node(file);
})
  .help(help)
  .build();

export const commandline = Commandline.initial(action);
