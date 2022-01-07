import { readFileSync } from "fs";

import { DefaultArgument, ArgumentContext } from "./ArgumentContext";
import { EnvContext } from "./EnvContext";
import { GeneralContext } from "./GeneralContext";
import { LogContext } from "./LogContext";
import { QuestionContext } from "./QuestionContext";
import { HistoryData, HistoryContext } from "./HistoryContext";
import { CommandContext } from "./CommandContext";
import { PackageContext } from "./PackageContext";

export class Context {
  // singleton
  private static _context: Context | undefined;
  static get(): Context {
    if (!Context._context) Context._context = new Context();
    return Context._context;
  }

  // To avoid same object reference in history context
  static build(): Context {
    return new Context();
  }

  private readonly _generalContext: GeneralContext;
  private readonly _envContext: EnvContext;
  private readonly _argumentContext: ArgumentContext;
  private readonly _logContext: LogContext;
  private readonly _questionContext: QuestionContext;
  private readonly _historyContext: HistoryContext;
  private readonly _commandContext: CommandContext;
  private readonly _packageContext: PackageContext;

  private constructor() {
    const content = readFileSync("./package.json", { encoding: "utf-8" });

    this._envContext = new EnvContext(process.env);
    this._logContext = new LogContext(this._envContext);
    this._generalContext = new GeneralContext();
    this._packageContext = new PackageContext(content);
    this._argumentContext = new ArgumentContext();
    this._questionContext = new QuestionContext();
    this._historyContext = new HistoryContext();
    this._commandContext = new CommandContext();
  }

  get general(): GeneralContext {
    return this._generalContext;
  }

  get env(): EnvContext {
    return this._envContext;
  }

  get argument(): ArgumentContext {
    return this._argumentContext;
  }

  get log(): LogContext {
    return this._logContext;
  }

  get question(): QuestionContext {
    return this._questionContext;
  }

  get history(): HistoryContext {
    return this._historyContext;
  }

  get command(): CommandContext {
    return this._commandContext;
  }

  get package(): PackageContext {
    return this._packageContext;
  }
}

export {
  ArgumentContext,
  EnvContext,
  GeneralContext,
  LogContext,
  QuestionContext,
  HistoryContext,
  CommandContext,
  PackageContext,
};

export type { DefaultArgument, HistoryData };
