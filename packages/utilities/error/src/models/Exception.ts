import { mergeObject } from "@kcutils/helper";

import type { StateInput } from "./StateInput";
import type { StackBuilder } from "./StackBuilder";

import Err from "./Err";

class Exception extends Err {
  constructor(
    state: StateInput,
    template: string,
    data?: Record<string, string>,
    buildStack?: StackBuilder
  ) {
    let stack: string | undefined;
    if (buildStack) {
      const _stack = [];
      const obj = { stack: [] as NodeJS.CallSite[] };
      const orig = Error.prepareStackTrace; // save original prepare method
      Error.prepareStackTrace = (_, stack) => stack;
      Error.captureStackTrace(obj, Exception);

      for (const stack of obj.stack) {
        _stack.push({
          path: stack.getFileName() ?? "",
          typename: stack.getTypeName(),
          colmnum: stack.getColumnNumber(),
          funcname: stack.getFunctionName(),
          linenum: stack.getLineNumber(),
          method: stack.getMethodName(),
        });
      }

      Error.prepareStackTrace = orig; // revert original method
      stack = buildStack(_stack);
    }

    super(
      state.name,
      template,
      mergeObject<Record<string, any>>(state, { stack }, data)
    );
  }
}

export default Exception;
