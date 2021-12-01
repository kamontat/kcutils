import type { ParsedArgs } from "minimist";
import { Builder } from "../models/Builder";
import { Transformer } from "../models/Transformer";

export type OptionData = {
  dryrun: boolean;
  debug: boolean;
  raw: string[];
};

export type OptionTransformer<T> = {
  defaultValue: T;
  fn: (value: string, def: T) => T;
};

export type OptionMapper<O> = {
  [key in keyof O]: OptionTransformer<O[key]>;
};

export class OptionBuilder<O>
  implements Builder<Transformer<string[], OptionData & O>>
{
  static build<O>(def: OptionMapper<O>): OptionBuilder<O> {
    return new OptionBuilder(def);
  }

  private constructor(private _valueMapper: OptionMapper<O>) {}

  build(): Transformer<string[], OptionData & O> {
    return {
      name: "option",
      transform: (_args, context) => {
        const args = context.argument.parse<ParsedArgs>(_args, {
          alias: {
            dryrun: ["dry", "dr", "dry-run"],
          },
        });
        const mapper = context.general.byDefault<OptionMapper<OptionData>>(
          {
            dryrun: {
              defaultValue: false,
              fn: (value) => value !== "false",
            },
            debug: {
              defaultValue: false,
              fn: (value) => value !== "false",
            },
            raw: {
              defaultValue: args._,
              fn: () => args._,
            },
          },
          this._valueMapper
        );

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
  static toBoolean(value: string) {
    return value !== "false";
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
