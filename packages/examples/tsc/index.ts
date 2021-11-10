/**
 * @public
 * Returns the average of two numbers.
 *
 * @remarks
 * This method is part of the {@link core-library#Statistics | Statistics subsystem}.
 *
 */
class Example {
  static HelloWorld(): Example {
    return new Example("hello world");
  }

  private _name: string;

  /**
   * Create new example object
   * @param name - with name
   */
  constructor(name: string) {
    this._name = name;
  }

  get customName(): string {
    return this._name;
  }

  updateName(name: string) {
    this._name = name;
  }

  toString(): string {
    return this._name;
  }
}

export { Example };
