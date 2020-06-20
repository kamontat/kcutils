import { AsyncRunner, Commandline, CommandlineOption, Option, DataTransformFn } from "../..";

interface Settings extends CommandlineOption {
  scopes: string[];
  ignores: string[];
  arguments: string[];
  override: string[];
}

export const lerna = (fn: DataTransformFn<string[], string[] | Promise<string[]>>) => {
  const option = new Option({
    dirname: process.cwd(),
    input: process.argv.slice(2),
    transform: async ({ data, helper }) => {
      const argument = helper.argument.parse(data, { default: { dry: false, scope: [], ignore: [] } });
      const args = await Promise.resolve(fn({ data, helper }));

      const settings = {
        dryrun: argument.dry,
        scopes: Array.isArray(argument.scope) ? argument.scope : [argument.scope],
        ignores: Array.isArray(argument.ignore) ? argument.ignore : [argument.ignore],
        arguments: args,
      } as Settings;

      helper.log.debug("arguments", JSON.stringify(settings));

      return settings;
    },
  });

  const transformer = new AsyncRunner(option, async ({ data, helper }) => {
    const config = await helper.root.pathEnsure("lerna.json");
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
      const config = helper.root.path("lerna.json");
      return ["echo", `[skip] lerna config not found (${config})`];
    } else if (lerna === undefined) {
      return ["echo", `[skip] lerna command not found`];
    } else {
      return [lerna, ...args];
    }
  });

  return new Commandline(transformer);
};
