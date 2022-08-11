import type { SeedGenerator } from "../interfaces/Seed";
import { Seed } from "../models/Seed";

/**
 * This implementation will return input instantly without calculate anything
 *
 * @param input input number in string datatype
 */
export const fixed: SeedGenerator = (input) => {
  return () => {
    return parseFloat(input);
  };
};

/**
 * Fixed seed will always return same value.
 */
export class Fixed extends Seed {
  constructor(input: number) {
    super(input.toString(), fixed);
  }
}
