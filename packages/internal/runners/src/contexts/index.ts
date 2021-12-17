import { ArgumentContext } from "./ArgumentContext";
import { EnvContext } from "./EnvContext";
import { GeneralContext } from "./GeneralContext";
import { LogContext } from "./LogContext";
import { QuestionContext } from "./QuestionContext";
import { HistoryContext } from "./HistoryContext";

export class Context {
  static build(): Context {
    return new Context();
  }

  private _generalContext: GeneralContext;
  private _envContext: EnvContext;
  private _argumentContext: ArgumentContext;
  private _logContext: LogContext;
  private _questionContext: QuestionContext;
  private _historyContext: HistoryContext;

  constructor() {
    this._generalContext = new GeneralContext();
    this._envContext = new EnvContext(process.env);
    this._argumentContext = new ArgumentContext();
    this._logContext = new LogContext(this._envContext);
    this._questionContext = new QuestionContext();
    this._historyContext = new HistoryContext();
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
}

export {
  ArgumentContext,
  EnvContext,
  GeneralContext,
  LogContext,
  QuestionContext,
  HistoryContext,
};
