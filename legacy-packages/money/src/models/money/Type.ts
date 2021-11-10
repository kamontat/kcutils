export interface Type<T extends string> {
  readonly type: T;
}

export class TypeChecker {
  static on<T extends string>(t: Type<string>, tt: T): t is Type<T> {
    return t.type === tt;
  }
}
