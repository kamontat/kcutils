import { AsyncRunner, Commandline, Option } from ".";

const option = new Option({ dirname: process.cwd(), input: process.argv.slice(2), transform: Option.transform });
const transformer = new AsyncRunner(option, async ({ helper }) => {
  const jest = helper.root.nodeCommand("jest");
  const config = await helper.parent.pathEnsure("jest.config.js");

  if (config !== undefined) {
    const args = [jest, "--config", config, "--passWithNoTests"];
    const ci = process.env.CI === "true";
    if (ci) args.push("--ci", "--runInband");

    return args;
  } else {
    return ["echo", `[skip] jest config not found (${config})`];
  }
});

const cli = new Commandline(transformer);
cli.start();
