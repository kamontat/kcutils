import { AsyncRunner, Commandline, Option } from "../..";

const option = new Option({ dirname: process.cwd(), input: process.argv.slice(2), transform: Option.transform });
const transformer = new AsyncRunner(option, async ({ helper, data }) => {
  const auto: boolean = data.arguments.auto === true ?? false;
  const tsc = helper.path.nodeCommand("tsc");

  const project = auto ? helper.on("current").path("includes") : helper.on("parent").pwd;

  const tsconfig = helper.path.add(project).ensure("tsconfig.json");

  const args: string[] = [];

  if (tsconfig === undefined) return ["echo", `[skip] tsconfig.json not exist in ${project}`];
  else if (!tsc) return ["echo", "[skip] tsc command not found"];

  // add --project <path>
  args.push(tsc, "--project", project);

  // pass other arguments to commandline
  args.push(...(data.arguments._ ?? []));

  return args;
});

const cli = new Commandline(transformer);
cli.start();
