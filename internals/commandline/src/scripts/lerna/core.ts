import { AsyncRunner, Commandline, CommandlineOption, Option, DataTransformFn } from "../..";
import minimist from "minimist";
import { DataBuilderHelperString } from "../../models/common/DataBuilder";

interface Settings extends CommandlineOption {
  scopes: string[];
  ignores: string[];
  parameters: string[];
  override: string[] | false;
}

type TransformerOption = { arguments: string[]; override?: boolean };

export const lerna = (
  fn: DataTransformFn<minimist.ParsedArgs, TransformerOption | Promise<TransformerOption>, DataBuilderHelperString>
): Commandline<Settings, DataBuilderHelperString> => {
  const option = new Option({
    dirname: process.cwd(),
    input: process.argv.slice(2),
    transform: async i => {
      const baseSettings = await Option.transform(i);
      const args = await Promise.resolve(fn({ data: baseSettings.arguments, helper: i.helper }));

      const scope = baseSettings.arguments.scope ?? [];
      const scopes = Array.isArray(scope) ? scope : [scope];

      const ignore = baseSettings.arguments.ignore ?? [];
      const ignores = Array.isArray(ignore) ? ignore : [ignore];

      return Object.assign({}, baseSettings, {
        scopes,
        ignores,
        override: args.override ? args.arguments : false,
        parameters: args.arguments,
      }) as Settings;
    },
  });

  const transformer = new AsyncRunner(option, async ({ data, helper }) => {
    helper.log.debug("arguments", JSON.stringify(data));
    if (data.override) return data.override;

    const config = await helper.path.ensure("lerna.json");
    const lerna = helper.path.nodeCommand("lerna");

    const args = Array.from(data.parameters).concat(data.arguments._ ?? []);
    if (data.scopes.length > 0)
      args.push(
        ...data.scopes.reduce((p, c) => {
          return p.concat("--scope", c);
        }, [] as string[])
      );

    if (data.ignores.length > 0)
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
