import { AsyncRunner, Commandline, CommandlineOption, Option, DataTransformFn } from "../..";
import minimist from "minimist";
import { DataBuilderHelperString } from "../../models/common/DataBuilder";

interface Settings extends CommandlineOption {
  scopes: string[];
  ignores: string[];
  arguments: string[];
  override: string[] | false;
}

type TransformerOption = { arguments: string[]; override?: boolean };

export const lerna = (
  fn: DataTransformFn<minimist.ParsedArgs, TransformerOption | Promise<TransformerOption>, DataBuilderHelperString>
): Commandline<Settings, DataBuilderHelperString> => {
  const option = new Option({
    dirname: process.cwd(),
    input: process.argv.slice(2),
    transform: async ({ data, helper }) => {
      const argument = helper.argument.parse(data, {
        boolean: ["dry", "dryrun", "dry-run"],
        default: { dry: false, dryrun: false, ["dry-run"]: false, scope: [], ignore: [] },
      });
      const args = await Promise.resolve(fn({ data: argument, helper }));

      const settings = {
        dryrun: argument.dry || argument.dryrun || argument["dry-run"],
        scopes: Array.isArray(argument.scope) ? argument.scope : [argument.scope],
        ignores: Array.isArray(argument.ignore) ? argument.ignore : [argument.ignore],
        arguments: args.arguments,
        override: args.override ? args.arguments : false,
      } as Settings;

      return settings;
    },
  });

  const transformer = new AsyncRunner(option, async ({ data, helper }) => {
    helper.log.debug("arguments", JSON.stringify(data));
    if (data.override) return data.override;

    const config = await helper.path.ensure("lerna.json");
    const lerna = helper.path.nodeCommand("lerna");

    const args = Array.from(data.arguments);
    if (data.scopes)
      args.push(
        ...data.scopes.reduce((p, c) => {
          return p.concat("--scope", c);
        }, [] as string[])
      );

    if (data.ignores)
      args.push(
        ...data.ignores.reduce((p, c) => {
          return p.concat("--ignore", c);
        }, [] as string[])
      );

    if (config === undefined) {
      const config = helper.on("root").path("lerna.json");
      return ["echo", `[skip] lerna config not found (${config})`];
    } else if (lerna === undefined) {
      return ["echo", `[skip] lerna command not found`];
    } else {
      return [lerna, ...args];
    }
  });

  return new Commandline(transformer);
};
