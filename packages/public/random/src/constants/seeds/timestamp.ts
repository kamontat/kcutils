import { Seed, SeedGenerator } from "../../models/Seed";

/**
 * This is seed generator for Seed class.
 * This implementation will return input instantly without calculate anything
 *
 *
 * @param input input number in string datatype
 */
export const timestamp: SeedGenerator = () => {
  return () => {
    return +new Date();
  };
};

export class Timestamp extends Seed {
  constructor() {
    super("", timestamp);
  }
}
