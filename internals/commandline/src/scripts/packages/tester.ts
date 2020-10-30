import { AsyncRunner, Commandline, Option } from "../..";

const option = new Option({ dirname: process.cwd(), input: process.argv.slice(2), transform: Option.transform });
const transformer = new AsyncRunner(option, async ({ helper, data }) => {
  const config = await helper.on("parent").pathEnsure("jest.config.js");
  const jest = helper.path.nodeCommand("jest");

  // support stryker in testkit devDependencies
  if (data.arguments.stryker && helper.on("parent").searchPackageJsonSync("devDependencies", "@kcutils/testkit")) {
    helper.log.debug("stryker", "enable stryker test");
    const testkitPath = helper.on("parent").pathEnsureSync("node_modules", "@kcutils", "testkit");
    const strykerCli = (testkitPath ? helper.path.add(testkitPath) : helper.path).nodeCommand("stryker");
    const strykerConfig = await helper.on("parent").pathEnsure("stryker.conf.js");

    if (strykerCli !== undefined && strykerConfig) {
      return [strykerCli, "run"].concat(data.arguments["--"] ?? []);
    } else {
      strykerCli === undefined && helper.log.debug("stryker", "stryker command is missing");
      strykerConfig === undefined && helper.log.debug("stryker", "stryker configuration is missing");
    }
  }

  if (jest === undefined) {
    return ["echo", "[skip] jest command not found"];
  } else if (config === undefined) {
    const conf = helper.on("parent").path("jest.config.js");
    return ["echo", `[skip] jest config not found (${conf})`];
  } else {
    const args = [jest, "--config", config, "--passWithNoTests"];
    const ci = process.env.CI === "true";
    if (ci) args.push("--ci", "--runInBand");

    args.push(...data.raw);
    return args;
  }
});

const cli = new Commandline(transformer);
cli.start();
