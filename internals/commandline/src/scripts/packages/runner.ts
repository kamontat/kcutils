import { AsyncRunner, Commandline, CommandlineOption, Option } from "../..";

interface Settings extends CommandlineOption {
  index: string;
}

const option = new Option({
  dirname: process.cwd(),
  input: process.argv.slice(2),
  transform: async ({ data, helper }) => {
    const argument = helper.argument.parse(data);

    return {
      index: argument.index ?? "index.js",
    } as Settings;
  },
});

const transformer = new AsyncRunner(option, async ({ helper, data }) => {
  const runner = await helper.on("parent").pathEnsure("lib", data.index);
  if (runner !== undefined) {
    return ["node", runner];
  } else {
    return ["echo", `[skip] ${data.index} not found`];
  }
});

const cli = new Commandline(transformer);
cli.start();
