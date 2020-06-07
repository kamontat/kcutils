import { Helper } from "./Helper";

export interface InputWrapper<D> {
  data: D;
  helper: Helper;
}

export const toInputWrapper = <I, R>(proc: DataProcess<I, R>): InputWrapper<I> => {
  return {
    data: proc.getData(),
    helper: proc.getHelper(),
  };
};

export type TransformFn<I, R> = (input: I) => R;

export type DataTransformFn<I, R> = TransformFn<InputWrapper<I>, R>;

export interface DataProcess<I, R> {
  getData(): I;

  getHelper(): Helper;

  build(): R;
}
