import type { ParsedArgs } from "minimist";
import { Builder } from "../models/Builder";
import { Transformer } from "../models/Transformer";

export type OptionData = {
  help: boolean;
  dryrun: boolean;
  debug: boolean;
  raw: string[]; // all argument without option
  extraRaw: string[]; // argument after --
};

export type OptionTransformer<T> = {
  alias?: string[];
  defaultValue: T;
  fn: (value: string, def: T) => T;
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

  private constructor(private _valueMapper: OptionMapper<O>) {}

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
            raw: {
              defaultValue: [],
              fn: () => [],
            },
            extraRaw: {
              defaultValue: [],
              fn: () => [],
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

        mapper.raw.fn = () => args._;
        mapper.extraRaw.fn = () => args["--"] ?? [];

        context.log.debug("Arguments", args);
        const result: Record<string, unknown> = {};

        for (const key in mapper) {
          const value = mapper[key as keyof typeof mapper];
          result[key] =
            value.fn(args[key], value.defaultValue as any) ??
            value.defaultValue;
        }

        return result as OptionData & O;
      },
    };
  }
}

export class Option {
  static none(value: string, def: string) {
    return value ? value : def; // check empty string and undefined/null
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
