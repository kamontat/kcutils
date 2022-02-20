import { mergeObject } from "@kcutils/helper";

import Exception from "../models/Exception";
import type StateTypes from "../models/StateTypes";
import type { StateInput } from "../models/StateInput";
import type { StackBuilder } from "../models/StackBuilder";

export interface ExceptionBuilderOptions {
  type: StateTypes;
  name: string;
  code: number;
  template: string;
  buildStack?: StackBuilder;
}

class ExceptionBuilder {
  static fn(option: ExceptionBuilderOptions): ExceptionBuilder {
    return new ExceptionBuilder(option);
  }

  private _input: StateInput;
  private _template: string;
  private _buildStack?: StackBuilder;
  private constructor(option: ExceptionBuilderOptions) {
    this._input = {
      code: option.code,
      name: option.name,
      type: option.type,
    };
    this._template = option.template;
    this._buildStack = option.buildStack;
  }

  throw(data?: Record<string, string>): Exception {
    return new Exception(this._input, this._template, data, this._buildStack);
  }

  custom(state: Partial<StateInput>, data?: Record<string, string>): Exception {
    return new Exception(
      mergeObject(this._input, state),
      this._template,
      data,
      this._buildStack
    );
  }
}

export default ExceptionBuilder;
