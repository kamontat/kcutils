import type { ParsedArgs } from "minimist";
import { Builder } from "../models/Builder";
import { Transformer } from "../models/Transformer";

export type OptionData = {
  help: boolean;
  dryrun: boolean;
  debug: boolean;
  /** all argument left after parsing option  */
  args: string[];
  /** all argument after -- option */
  extraArgs: string[];
  /** raw input argument */
  raw: string[];
};

export type OptionTransformer<T> = {
  fn?: (value: string, def: T) => T;
  alias?: string[];
  defaultValue: T;
};

export type OptionMapper<O> = {
  [key in keyof O]: OptionTransformer<O[key]>;
};

export class OptionBuilder<O>
  implements Builder<Transformer<string[], OptionData & O>>
{
  static initial<O>(def: OptionMapper<O>): OptionBuilder<O> {
    return new OptionBuilder(def);
  }

  static empty(): OptionBuilder<Record<string, never>> {
    return new OptionBuilder({});
  }

  private constructor(private readonly _valueMapper: OptionMapper<O>) {}

  build(): Transformer<string[], OptionData & O> {
    return {
      name: "option",
      transform: (_args, context) => {
        const mapper = context.general.byDefault<OptionMapper<OptionData>>(
          {
            help: {
              defaultValue: false,
              fn: Option.toBoolean,
              alias: ["h"],
            },
            dryrun: {
              defaultValue: false,
              fn: Option.toBoolean,
              alias: ["d", "dry", "dry-run"],
            },
            debug: {
              defaultValue: false,
              fn: Option.toBoolean,
              alias: ["D"],
            },
            args: {
              defaultValue: [],
            },
            extraArgs: {
              defaultValue: [],
            },
            raw: {
              defaultValue: [],
            },
          },
          this._valueMapper
        );

        const alias = Object.keys(mapper).reduce((obj, key) => {
          const _alias = mapper[key as keyof typeof mapper].alias;
          if (_alias) {
            obj[key] = _alias;
          }

          return obj;
        }, {} as Record<string, string[]>);

        const args = context.argument.parse<ParsedArgs>(_args, {
          "--": true,
          alias,
        });

        mapper.args.fn = () => args._;
        mapper.extraArgs.fn = () => args["--"] ?? [];
        mapper.raw.fn = () => _args;

        const result: Record<string, unknown> = {};

        for (const key in mapper) {
          const mapperValue = mapper[key as keyof typeof mapper];
          const output = args[key];
          if (!mapperValue.fn && output !== undefined && output !== null) {
            result[key] = output; // this should always be string
          } else if (mapperValue.fn) {
            result[key] =
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              mapperValue.fn(output, mapperValue.defaultValue as any) ??
              mapperValue.defaultValue;
          } else {
            result[key] = mapperValue.defaultValue; // fallback if nothing works
          }
        }

        if (result?.debug) {
          context.log.setDebug(true);
        }

        context.log.debug("option", `raw input value: ${_args}`);
        context.log.debug("option", result);
        return result as OptionData & O;
      },
    };
  }
}

export class Option {
  static none(value: string, def: string) {
    // same with general context
    if (
      value === undefined ||
      value === null ||
      (typeof value === "string" && value === "")
    )
      return def;
    return value;
  }

  static toBoolean(value: string | boolean, def: boolean) {
    if (value === true || value === "true") return true;
    else if (value === false || value === "false") return false;
    else return def;
  }

  static toInt(value: string, def: number) {
    const out = Number.parseInt(value);
    if (Number.isFinite(out)) return out;
    else return def;
  }

  static toFloat(value: string, def: number) {
    const out = Number.parseFloat(value);
    if (Number.isFinite(out)) return out;
    else return def;
  }
}
