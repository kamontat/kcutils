import { resolve } from "path";

import { AsyncRunner, Commandline, Option } from "../..";
import { CommandlineOption } from "../../commands/Commandline";

interface BabelCliOption extends CommandlineOption {
  root: string; // default is src
  output: string; // default is lib
  dev: boolean; // default is false
  onlyJS: boolean; // default is false
}

const option = new Option<Promise<BabelCliOption>>({
  dirname: process.cwd(),
  input: process.argv.slice(2),
  transform: async ({ data, helper }) => {
    const defaultOption = await Option.transform({ data, helper });

    const root = defaultOption.arguments["root"] ?? "src";
    const output = defaultOption.arguments["output"] ?? "lib";
    const dev = defaultOption.arguments["dev"] ?? "false";
    const onlyJS = defaultOption.arguments["onlyJS"] ?? "false";

    const option: BabelCliOption = Object.assign(
      {},
      { root, output, dev: `${dev}` === "true", onlyJS: `${onlyJS}` === "true" },
      defaultOption
    );
    return option;
  },
});

const babelTransformer = new AsyncRunner(option, async ({ helper, data }) => {
  // yarn babel src --out-dir lib --extensions ".ts,.tsx" --source-maps inline
  const babel = helper.path.nodeCommand("babel");

  const project = helper.on("parent").pwd;
  const babelconfig = helper.path.add(project).ensure(".babelrc.js"); // support only .babelrc.js files

  const args: string[] = [];

  if (babelconfig === undefined) return ["echo", `[skip] .babelrc.js not exist in ${project}`];
  else if (!babel) return ["echo", "[skip] babel command not found; please install @babel/cli"];

  args.push(babel, data.root, "--out-dir", data.output, "--extensions", ".ts,.tsx,.js,.jsx");

  if (data.dev) args.push("--source-maps", "inline");

  // pass other arguments to commandline
  args.push(...(data.arguments._ ?? []));

  return args;
});

const tscTransformer = new AsyncRunner(option, async ({ helper, data }) => {
  if (data.onlyJS) return ["echo", "[skip] not generate types declaration for typescript"];

  const tsc = helper.path.nodeCommand("tsc");
  const project = helper.on("parent").pwd;
  const tsconfig = helper.path.add(project).ensure("tsconfig.json");

  if (tsconfig === undefined) return ["echo", `[skip] tsconfig.json not exist in ${project}`];
  else if (!tsc) return ["echo", "[skip] tsc command not found"];

  const args = [tsc, "--project", project, "--outDir", resolve(project, "lib"), "--emitDeclarationOnly"];
  if (data.dev) args.push("--declarationMap");

  return args;
});

const babel = new Commandline(babelTransformer);
const tsc = new Commandline(tscTransformer);

babel.start().then(() => tsc.start());
