import { Helper } from "./Helper";

export interface InputWrapper<D, H extends string> {
  data: D;
  helper: Helper<H>;
}

export const toInputWrapper = <I, R, H extends string>(proc: DataProcess<I, R, H>): InputWrapper<I, H> => {
  return {
    data: proc.getData(),
    helper: proc.getHelper(),
  };
};

export type TransformFn<I, R> = (input: I) => R;

export type DataTransformFn<I, R, H extends string> = TransformFn<InputWrapper<I, H>, R>;

export interface DataProcess<I, R, H extends string> {
  getData(): I;

  getHelper(): Helper<H>;

  build(): R;
}
