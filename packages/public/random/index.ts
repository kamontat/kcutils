export type { SeedGenerator, SeedFn, SeedPatch } from "./src/models/Seed";
export type {
  RandomNumberOption,
  RandomStringOption,
} from "./src/models/Random";
export { Seed } from "./src/models/Seed";
export { Random } from "./src/models/Random";

export {
  numberCharacter,
  englishUpperAlphabetCharacter,
  englishLowerAlphabetCharacter,
} from "./src/constants/randoms/list";

import { Fixed } from "./src/constants/seeds/fixed";
import { Xfnv1a } from "./src/constants/seeds/xfnv1a";
import { Xmur3 } from "./src/constants/seeds/xmur3";
import { Timestamp } from "./src/constants/seeds/timestamp";

const Seeds = {
  Fixed, // eslint-disable-line @typescript-eslint/naming-convention
  Xfnv1a, // eslint-disable-line @typescript-eslint/naming-convention
  Xmur3, // eslint-disable-line @typescript-eslint/naming-convention
  Timestamp, // eslint-disable-line @typescript-eslint/naming-convention
};

import { Alea } from "./src/constants/randoms/Alea";
import { Xoshiro128PP } from "./src/constants/randoms/Xoshiro128PP";
import { Xoshiro128SS } from "./src/constants/randoms/Xoshiro128SS";

const Randoms = {
  Alea, // eslint-disable-line @typescript-eslint/naming-convention
  Xoshiro128PP, // eslint-disable-line @typescript-eslint/naming-convention
  Xoshiro128SS, // eslint-disable-line @typescript-eslint/naming-convention
};

export { Seeds, Randoms };
