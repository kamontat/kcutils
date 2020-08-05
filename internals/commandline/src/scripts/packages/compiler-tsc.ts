import { AsyncRunner, Commandline, Option } from "../..";

const option = new Option({ dirname: process.cwd(), input: process.argv.slice(2), transform: Option.transform });
const transformer = new AsyncRunner(option, async ({ helper, data }) => {
  const tsc = helper.path.nodeCommand("tsc");

  if (tsc) {
    return [tsc, "--project", helper.on("current").path("includes"), ...data.raw];
  } else {
    return ["echo", "[skip] tsc command not found"];
  }
});

const cli = new Commandline(transformer);
cli.start();
