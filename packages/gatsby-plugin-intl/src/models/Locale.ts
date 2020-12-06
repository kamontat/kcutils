import {} from "@kcutils/error";
import { InvalidInputError } from "../constants/error";

export class Locale {
  private seperator: string = "-";

  private name: string;
  private lang: string;
  private coun?: string;
  private ex?: string;

  constructor(locale: string) {
    this.name = locale.replace(/_/g, this.seperator);
    const arr = this.name.split(this.seperator);

    if (arr.length < 1) {
      throw InvalidInputError("Locale", locale);
    }

    this.lang = arr[0];

    if (arr.length >= 2) {
      this.coun = arr[1];
    }

    if (arr.length >= 3) {
      this.ex = arr[2];
    }
  }

  get fullName(): string {
    return this.name;
  }

  get language(): string {
    return this.lang;
  }

  get country(): string | undefined {
    return this.coun;
  }

  get extra(): string | undefined {
    return this.ex;
  }

  /**
   * check only locale language key (case insensitive)
   *
   * @param other
   */
  equals(other: Locale): boolean {
    return this.language.toLowerCase() === other.language.toLowerCase();
  }

  /**
   * check locale language key and country (case insensitive)
   * @param other
   */
  deepEquals(other: Locale): boolean {
    const language = this.language.toLowerCase() === other.language.toLowerCase();
    const country = (this.country ?? "").toLowerCase() === (other.country ?? "").toLowerCase();

    return language && country;
  }
}
