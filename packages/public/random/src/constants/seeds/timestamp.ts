import { Seed, SeedGenerator } from "../../models/Seed";

/**
 * This is seed generator for Seed class.
 * This implementation will ignore input and always return timestamp out
 */
export const timestamp: SeedGenerator = () => {
  return () => {
    return +new Date();
  };
};

/**
 * Use timestamp as a seed value
 */
export class Timestamp extends Seed {
  constructor() {
    super("", timestamp);
  }
}
