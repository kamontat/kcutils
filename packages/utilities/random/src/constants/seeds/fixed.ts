import { Seed, SeedGenerator } from "../../models/Seed";

/**
 * This is seed generator for Seed class.
 * This implementation will return input instantly without calculate anything
 *
 *
 * @param input input number in string datatype
 */
export const fixed: SeedGenerator = (input) => {
  return () => {
    return parseFloat(input);
  };
};

/**
 * Fixed seed will always return input number as a seed
 * Warning: This should use for testing only
 *          because output will always be the same sequence
 */
export class Fixed extends Seed {
  constructor(input: number) {
    super(input.toString(), fixed);
  }
}
