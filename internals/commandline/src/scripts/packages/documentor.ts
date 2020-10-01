import { AsyncRunner, Commandline, Option } from "../..";

const option = new Option({ dirname: process.cwd(), input: process.argv.slice(2), transform: Option.transform });
const transformer = new AsyncRunner(option, async ({ helper, data }) => {
  if (data.arguments.preversion) {
    return ["git", "add", "--all"];
  }

  const typedoc = helper.path.nodeCommand("typedoc");

  const project = helper.on("parent");

  const tsconfig = project.pathEnsureSync("tsconfig.json");
  const sourcecode = project.pathEnsureSync("src");
  const readme = project.pathEnsureSync("README.md") ?? "none";
  const result = project.path("docs");

  const args: string[] = [];

  if (typedoc === undefined) return ["echo", `[skip] typedoc command not exist`];
  else if (tsconfig === undefined) return ["echo", `[skip] tsconfig.json file is missing from ${project.pwd}`];
  else if (sourcecode === undefined) return ["echo", `[skip] ${project.path("src")} is missing`];
  args.push(
    typedoc,
    "--toc",
    "--mode",
    "modules",
    "--out",
    result,
    "--tsconfig",
    tsconfig,
    "--readme",
    readme,
    sourcecode
  );

  // pass other arguments to commandline
  args.push(...(data.arguments._ ?? []));

  return args;
});

const cli = new Commandline(transformer);
cli.start();
