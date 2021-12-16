import path from "path";
import { plus } from "../utils/string";

/**
 * @public
 * Returns the average of two numbers.
 *
 * @remarks
 * This method is part of the {@link core-library#Statistic | Statistics subsystem}.
 *
 */
export class AString {
  static HelloWorld(): AString {
    return new AString("hello world");
  }

  private _str: string;

  /**
   * Create new example object
   * @param name - with name
   */
  constructor(input: string) {
    this._str = input;
  }

  get raw(): string {
    return this._str;
  }

  updateString(input: string) {
    this._str = input;
  }

  join(...input: string[]) {
    this._str = plus(this._str, path.join(...input));
  }

  size(): number {
    return this._str.length;
  }

  isEmpty(): boolean {
    return this._str === "";
  }

  toString(): string {
    return this._str;
  }
}
