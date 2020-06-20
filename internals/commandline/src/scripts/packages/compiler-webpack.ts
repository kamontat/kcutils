import { AsyncRunner, Commandline, Option } from "../..";

const option = new Option({ dirname: process.cwd(), input: process.argv.slice(2), transform: Option.transform });
const transformer = new AsyncRunner(option, async ({ helper }) => {
  const config = await helper.parent.pathEnsure("webpack.config.js");
  const webpack = helper.path.nodeCommand("webpack");

  if (webpack === undefined) {
    return ["echo", "[skip] webpack command not found"];
  } else if (config === undefined) {
    const conf = helper.parent.path("webpack.config.js");
    return ["echo", `[skip] webpack config not found (${conf})`];
  } else {
    return [webpack, "--config", config];
  }
});

const cli = new Commandline(transformer);
cli.start();
