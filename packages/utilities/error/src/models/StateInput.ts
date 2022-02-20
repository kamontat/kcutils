import type StateTypes from "./StateTypes";

export interface StateInput {
  readonly type: StateTypes;
  readonly code: number;
  readonly name: string;
}
