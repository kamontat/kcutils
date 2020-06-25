import { AsyncRunner, Commandline, Option } from "../..";

const option = new Option({ dirname: process.cwd(), input: process.argv.slice(2), transform: Option.transform });
const transformer = new AsyncRunner(option, async ({ helper }) => {
  const config = await helper.on("parent").pathEnsure("jest.config.js");
  const jest = helper.path.nodeCommand("jest");

  if (jest === undefined) {
    return ["echo", "[skip] jest command not found"];
  } else if (config === undefined) {
    const conf = helper.on("parent").path("jest.config.js");
    return ["echo", `[skip] jest config not found (${conf})`];
  } else {
    const args = [jest, "--config", config, "--passWithNoTests"];
    const ci = process.env.CI === "true";
    if (ci) args.push("--ci", "--runInband");

    return args;
  }
});

const cli = new Commandline(transformer);
cli.start();
