import type { SeedGenerator } from "../interfaces/Seed";
import { Seed } from "../models/Seed";

/**
 * This implementation will return timestamp as seed number
 *
 * @param input input number in string datatype
 */
export const timestamp: SeedGenerator = () => {
  return () => {
    return Date.now();
  };
};

/**
 * Timestamp seed will always return Date.now().
 */
export class Timestamp extends Seed {
  constructor() {
    super("", timestamp);
  }
}
