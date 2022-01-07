export type HistoryData<I, O> = {
  input: I | undefined;
  output: O | undefined;
};

export class HistoryContext {
  constructor(
    private readonly _mapper: Map<
      string,
      HistoryData<unknown, unknown>
    > = new Map()
  ) {}

  setInput<T>(name: string, input: T) {
    const oldData = this._mapper.get(name) ?? {
      input: undefined,
      output: undefined,
    };

    oldData.input = input;
    this._mapper.set(name, oldData);
  }

  getInput<T>(name: string): T | undefined {
    return this._mapper.get(name)?.input as T;
  }

  getInputOrElse<T>(name: string, def: T): T {
    return (this._mapper.get(name)?.input as T) ?? def;
  }

  setOutput<T>(name: string, output: T) {
    const oldData = this._mapper.get(name) ?? {
      input: undefined,
      output: undefined,
    };

    oldData.output = output;
    this._mapper.set(name, oldData);
  }

  getOutput<T>(name: string): T | undefined {
    return this._mapper.get(name)?.output as T;
  }

  getOutputOrElse<T>(name: string, def: T): T {
    return (this._mapper.get(name)?.output as T) ?? def;
  }
}
