import { AsyncRunner, Commandline, Option } from ".";

const option = new Option({ dirname: process.cwd(), input: process.argv.slice(2), transform: Option.transform });
const transformer = new AsyncRunner(option, async ({ helper }) => {
  const config = await helper.parent.pathEnsure("webpack.config.js");
  if (config !== undefined) {
    return [helper.root.nodeCommand("webpack"), "--config", config];
  } else {
    return ["echo", `[skip] webpack config not found (${config})`];
  }
});

const cli = new Commandline(transformer);
cli.start();
