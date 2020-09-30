import { AsyncRunner, Commandline, CommandlineOption, Option } from "../..";

interface Settings extends CommandlineOption {
  auto: boolean;
}

const option = new Option({
  dirname: process.cwd(),
  input: process.argv.slice(2),
  transform: async ({ data, helper }) => {
    const argument = helper.argument.parse(data, {
      boolean: "auto",
      default: {
        auto: false,
      },
    });

    return {
      auto: argument.auto ?? false,
    } as Settings;
  },
});

const transformer = new AsyncRunner(option, async ({ helper, data }) => {
  const packagePath = await helper.on("parent").pwd;
  const eslint = await helper.path.nodeCommand("eslint");

  if (eslint !== undefined) {
    const cmd = [eslint, packagePath];
    return data.auto ? cmd.concat("--fix") : cmd;
  } else {
    return ["echo", `[skip] eslint command not found`];
  }
});

const cli = new Commandline(transformer);
cli.start();
