export enum ThrowStateType {
  WARN,
  ERROR,
}

export interface ThrowState {
  readonly type: ThrowStateType;
  readonly code: number;
  readonly name: string;
}

export default function ThrowState(type: ThrowStateType, code: number, name: string): ThrowState {
  return {
    type,
    code,
    name,
  };
}
