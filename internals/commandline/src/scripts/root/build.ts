import { AsyncRunner, Commandline, Option } from "../..";

type Settings = {
  all: boolean;
  scopes: string[];
  ignores: string[];
  arguments: string[];
};

const option = new Option({
  dirname: process.cwd(),
  input: process.argv.slice(2),
  transform: async ({ data, helper }) => {
    const argument = helper.parser(data, { default: { all: true } });

    const args: string[] = ["--stream"];
    if (helper.isEnv("CI", "true")) args.push("--concurrency", "1");

    return {
      all: argument.all,
      scopes: argument.scopes,
      ignores: argument.ignores,
      arguments: args,
    } as Settings;
  },
});

const transformer = new AsyncRunner(option, async ({ data, helper }) => {
  const config = await helper.root.pathEnsure("lerna.json");
  const lerna = helper.root.nodeCommand("lerna");

  if (config !== undefined) {
    return [lerna, "build", ...data.arguments];
  } else {
    return ["echo", `[skip] webpack config not found (${config})`];
  }
});

const cli = new Commandline(transformer);
cli.start();
