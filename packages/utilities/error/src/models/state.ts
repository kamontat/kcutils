import { isExist, toOptional } from "@kcutils/helper";

export enum ThrowStateType {
  WARN,
  ERROR,
}

export interface ThrowStateInput {
  type: ThrowStateType;
  code: number;
  name: string;
}

const randomCode = () => {
  const digit = 8;
  const rand = Math.random();
  const multiply = 10 ** digit;

  return Math.ceil(rand * multiply);
};

export default class ThrowState {
  private static counter: number = 0;
  private static increase() {
    ThrowState.counter++;
  }

  private readonly id: number;

  readonly type: ThrowStateType;
  readonly code: number;
  readonly name: string;

  constructor(type?: ThrowStateType, code?: number, name?: string) {
    this.id = ThrowState.counter;
    ThrowState.increase();

    if (isExist(type)) this.type = type;
    else this.type = ThrowStateType.ERROR;

    if (isExist(code)) this.code = code;
    else this.code = randomCode();

    if (isExist(name)) this.name = name;
    else this.name = "";
  }

  copy(input?: Partial<ThrowStateInput>): ThrowState {
    const type = toOptional(input?.type).getOrElse(this.type);
    const code = toOptional(input?.code).getOrElse(this.code);
    const name = toOptional(input?.name).getOrElse(this.name);

    return new ThrowState(type, code, name);
  }

  getId(): number {
    return this.id;
  }

  next(name?: string): ThrowState {
    const code = this.code + 1;
    return this.copy({ code, name });
  }

  /**
   * check identical object id
   * @param s any throw status object
   */
  equals(s: ThrowState): boolean {
    return this.id === s.id;
  }
}
