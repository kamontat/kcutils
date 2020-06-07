import { AsyncRunner, Commandline, Option } from ".";

const option = new Option({ dirname: process.cwd(), input: process.argv.slice(2), transform: Option.transform });
const transformer = new AsyncRunner(option, async ({ helper, data }) => {
  return [helper.root.nodeCommand("tsc"), "--project", helper.current.path("includes"), ...data];
});

const cli = new Commandline(transformer);
cli.start();
